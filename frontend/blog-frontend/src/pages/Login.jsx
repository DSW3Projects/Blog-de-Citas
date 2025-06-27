import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(username, password);
    if (!success) {
      setError(true);
    } else {
      navigate('/');
    }
  };

  return (
    <div
      className="min-h-screen font-sans bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/foto-gratis/pareja-besada-sol-abraza-disfrutando-belleza-naturaleza-generada-ia_188544-43212.jpg?semt=ais_hybrid&w=740')",
      }}
    >
      <nav className="glass-effect shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <a href="/" className="flex items-center space-x-3">
              <i className="fas fa-heart text-rose-500 text-3xl animate-heartbeat"></i>
              <span className="text-2xl font-serif font-bold text-white dark:text-rose-200">
                Amor en Línea
              </span>
            </a>
          </div>
        </div>
      </nav>

      <main className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto w-24 h-24 rounded-full glass-effect shadow-lg flex items-center justify-center mb-4">
              <i className="fas fa-heart text-4xl gradient-text"></i>
            </div>
            <h2 className="mt-6 text-3xl font-serif font-bold text-white dark:text-rose-100">
              Encuentra tu <span className="gradient-text">media naranja</span>
            </h2>
            <p className="mt-2 text-sm text-white/80 dark:text-rose-200/80">
              Comparte, conecta y vive el amor
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6 glass-effect p-8 rounded-2xl shadow-xl backdrop-blur-lg"
          >
            {error && (
              <div className="bg-rose-100/30 border-l-4 border-rose-500 p-4 mb-4 dark:bg-rose-900/20 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <i className="fas fa-heart-crack text-rose-500"></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-white dark:text-rose-200">
                      Combinación incorrecta de usuario y contraseña. ¿Quizás es
                      amor a primera vista?
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white dark:text-rose-200"
              >
                Tu nombre de enamorado/a
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-user text-rose-300"></i>
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="pl-10 block w-full rounded-lg border-gray-300/50 dark:border-gray-600/50 bg-white/70 dark:bg-gray-800/50 text-gray-800 dark:text-white focus:ring-rose-500 focus:border-rose-500 shadow-sm"
                  placeholder="Tu nombre especial"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white dark:text-rose-200"
              >
                Tu contraseña secreta
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-rose-300"></i>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 block w-full rounded-lg border-gray-300/50 dark:border-gray-600/50 bg-white/70 dark:bg-gray-800/50 text-gray-800 dark:text-white focus:ring-rose-500 focus:border-rose-500 shadow-sm"
                  placeholder="Tu corazón lo sabe"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
            >
              Iniciar sesión
            </button>

            {/* Botón para ir a registro */}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="w-full py-2 px-4 mt-2 border border-rose-500 text-rose-500 font-semibold rounded-lg shadow-md hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
            >
              ¿No tienes cuenta? Regístrate
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
