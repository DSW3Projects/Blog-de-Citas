import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

export default function Header() {
  const { user, logoutUser } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const userButtonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target)
      ) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-md shadow-lg ${
        darkMode
          ? 'bg-gray-900 bg-opacity-80'
          : 'bg-white bg-opacity-80'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <a
  href="/"
  className={`flex items-center space-x-3 ${
    darkMode ? 'text-pink-400' : 'text-rose-500'
  }`}
>
  <i className="fas fa-heart text-3xl animate-heartbeat text-rose-500"></i>
  <span className="text-2xl font-serif font-bold">
    Amor en Línea
  </span>
</a>



          {/* Barra de búsqueda */}
          <form method="GET" action="/search" className="relative">
            <input
              type="text"
              name="q"
              placeholder="Buscar por tag..."
              className={`rounded-full px-4 py-2 placeholder-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-md ${
                darkMode
                  ? 'bg-gray-800 text-white placeholder-pink-700'
                  : 'bg-white text-rose-500 placeholder-pink-500'
              }`}
            />
            <button
              type="submit"
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-0 m-0 bg-transparent border-none hover:text-pink-700 focus:outline-none ${
                darkMode ? 'text-white' : 'text-rose-500'
              }`}
            >
              <i className="fas fa-search text-lg"></i>
            </button>
          </form>

          {/* Botones derecha */}
          <div className="flex items-center space-x-4">
            {/* Botón modo oscuro */}
            <button
              onClick={toggleDarkMode}
              className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-all duration-300 ${
                darkMode
                  ? 'bg-white bg-opacity-70 text-black'
                  : 'bg-transparent text-rose-500 border border-rose-500'
              }`}
              aria-label="Toggle dark mode"
            >
              <span id="theme-icon">{darkMode ? '🌙' : '✨'}</span>
              <span id="theme-label">{darkMode ? 'Modo Oscuro' : 'Modo Claro'}</span>
            </button>

            {/* Usuario logueado o no */}
            {user && user.isAuthenticated ? (
              <div className="relative">
                <button
                  ref={userButtonRef}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-all duration-300 ${
                    darkMode ? 'bg-white text-black' : 'bg-rose-500 text-white'
                  }`}
                >
                  <i className="fas fa-user-circle text-xl"></i>
                  <span>{user.username}</span>
                  <i className="fas fa-chevron-down ml-1"></i>
                </button>

                {userMenuOpen && (
                  <div
                    ref={userMenuRef}
                    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 ${
                      darkMode ? 'bg-white text-black' : 'bg-rose-500 text-white'
                    }`}
                  >
                    <a
                      href="/perfil"
                      className={`block px-4 py-2 ${
                        darkMode
                          ? 'text-black hover:bg-gray-200'
                          : 'text-white hover:bg-rose-600'
                      }`}
                    >
                      <i className="fas fa-user mr-2"></i> Perfil
                    </a>
                    {user.isSuperuser && (
                      <a
                        href="/admin_dashboard"
                        className={`block px-4 py-2 ${
                          darkMode
                            ? 'text-black hover:bg-gray-200'
                            : 'text-white hover:bg-rose-600'
                        }`}
                      >
                        <i className="fas fa-tachometer-alt mr-2"></i> Dashboard
                      </a>
                    )}
                    <button
                      onClick={() => {
                        logoutUser();
                        setUserMenuOpen(false);
                      }}
                      className={`w-full text-left block px-4 py-2 ${
                        darkMode
                          ? 'text-black hover:bg-gray-200'
                          : 'text-white hover:bg-rose-600'
                      }`}
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i> Salir
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/login"
                className={`font-medium py-2 px-4 rounded-full shadow-lg hover:scale-105 transition-all duration-300 flex items-center ${
                  darkMode ? 'bg-white text-black' : 'bg-rose-500 text-white'
                }`}
              >
                <i className="fas fa-sign-in-alt mr-2"></i> Ingresar
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}







