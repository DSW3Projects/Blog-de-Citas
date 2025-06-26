import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
  );

  const [user, setUser] = useState(() => authTokens ? JSON.parse(atob(authTokens.access.split('.')[1])) : null);

  const loginUser = async (username, password) => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/token/', {
        username,
        password
      });
      setAuthTokens(res.data);
      setUser(JSON.parse(atob(res.data.access.split('.')[1])));
      localStorage.setItem('authTokens', JSON.stringify(res.data));
      return true;
    } catch {
      return false;
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
  };

  const contextData = { user, authTokens, loginUser, logoutUser };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

