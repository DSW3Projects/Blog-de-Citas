import React, { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode'; // ✅ Importación correcta
import api from '../services/api';      // ✅ Tu instancia de Axios

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('access'));
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refresh'));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? { username: savedUser, isAuthenticated: true } : null;
  });
  const [lastActivity, setLastActivity] = useState(Date.now());

  // 🧠 Guardar tokens y usuario en localStorage cuando cambien
  useEffect(() => {
    authTokens
      ? localStorage.setItem('access', authTokens)
      : localStorage.removeItem('access');
  }, [authTokens]);

  useEffect(() => {
    refreshToken
      ? localStorage.setItem('refresh', refreshToken)
      : localStorage.removeItem('refresh');
  }, [refreshToken]);

  useEffect(() => {
    if (user?.username) {
      localStorage.setItem('user', user.username);
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // 🎯 Detectar actividad del usuario para logout automático
  useEffect(() => {
    const updateActivity = () => setLastActivity(Date.now());

    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keydown', updateActivity);
    window.addEventListener('click', updateActivity);
    window.addEventListener('scroll', updateActivity);

    return () => {
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keydown', updateActivity);
      window.removeEventListener('click', updateActivity);
      window.removeEventListener('scroll', updateActivity);
    };
  }, []);

  // 🚪 Logout
  const logoutUser = useCallback(() => {
    setAuthTokens(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
  }, []);

  // 🔄 Refrescar token automáticamente si es necesario
  useEffect(() => {
    const interval = setInterval(() => {
      if (!authTokens || !refreshToken) return;

      try {
        const { exp } = jwtDecode(authTokens);
        const now = Date.now() / 1000;
        const expiresIn = exp - now;
        const inactiveSeconds = (Date.now() - lastActivity) / 1000;

        if (inactiveSeconds >= 300) {
          logoutUser();
        } else if (expiresIn < 60) {
          api
            .post('api/token/refresh/', { refresh: refreshToken })
            .then(res => {
              setAuthTokens(res.data.access);
            })
            .catch(() => {
              logoutUser();
            });
        }
      } catch {
        logoutUser();
      }
    }, 30000); // cada 30 segundos

    return () => clearInterval(interval);
  }, [authTokens, refreshToken, lastActivity, logoutUser]);

  // 🔐 Login
  const loginUser = async (username, password) => {
    try {
      const res = await api.post('login/', { username, password });
      setAuthTokens(res.data.access);
      setRefreshToken(res.data.refresh);
      setUser({ username, isAuthenticated: true });
      setLastActivity(Date.now());
      return true;
    } catch (err) {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ authTokens, user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};


