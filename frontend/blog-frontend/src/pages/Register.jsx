import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const RegisterPage = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.password2) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await api.post('register/', {
  username: formData.username,
  email: formData.email,
  password: formData.password,
  password2: formData.password2,
});

      const success = await loginUser(formData.username, formData.password);
      if (success) {
        navigate('/');
      } else {
        setError('Registro exitoso, pero error al iniciar sesión');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const data = err.response.data;
        const msg = typeof data === 'string'
          ? data
          : Object.values(data).flat().join(', ');
        setError(msg);
      } else {
        setError('Error desconocido');
      }
    }
  };

  return (
    <div className="min-h-screen font-sans bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://img.freepik.com/foto-gratis/pareja-abraza-sonrie-puesta-sol-romantica-generada-ia_188544-98753.jpg?semt=ais_hybrid')" }}>
      <nav className="glass-effect shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <a href="#" className="flex items-center space-x-3">
              <i className="fas fa-heart text-rose-500 text-3xl animate-heartbeat"></i>
              <span className="text-2xl font-serif font-bold text-white dark:text-rose-200">Amor en Línea</span>
            </a>
          </div>
        </div>
      </nav>

      <main className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto w-24 h-24 rounded-full glass-effect shadow-lg flex items-center justify-center mb-4">
              <i className="fas fa-user-plus text-4xl gradient-text"></i>
            </div>
            <h2 className="mt-6 text-3xl font-serif font-bold text-white dark:text-rose-100">
              Regístrate y <span className="gradient-text">encuentra el amor</span>
            </h2>
            <p className="mt-2 text-sm text-white/80 dark:text-rose-200/80">
              ¡Es momento de abrir tu corazón!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6 glass-effect p-8 rounded-2xl shadow-xl backdrop-blur-lg">
            {error && (
              <div className="bg-rose-100/30 border-l-4 border-rose-500 p-4 mb-4 dark:bg-rose-900/20 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <i className="fas fa-heart-crack text-rose-500"></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-white dark:text-rose-200">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <p className="text-green-500 text-center">{success}</p>
            )}

            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-white dark:text-rose-200">
                Tu nombre de enamorado/a
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-user text-rose-300"></i>
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="pl-10 block w-full rounded-lg border-gray-300/50 dark:border-gray-600/50 bg-white/70 dark:bg-gray-800/50 text-gray-800 dark:text-white focus:ring-rose-500 focus:border-rose-500 shadow-sm"
                  placeholder="Tu nombre especial"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-white dark:text-rose-200">
                Tu correo romántico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-rose-300"></i>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="pl-10 block w-full rounded-lg border-gray-300/50 dark:border-gray-600/50 bg-white/70 dark:bg-gray-800/50 text-gray-800 dark:text-white focus:ring-rose-500 focus:border-rose-500 shadow-sm"
                  placeholder="correo@amor.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-white dark:text-rose-200">
                Tu contraseña secreta
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-rose-300"></i>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pl-10 block w-full rounded-lg border-gray-300/50 dark:border-gray-600/50 bg-white/70 dark:bg-gray-800/50 text-gray-800 dark:text-white focus:ring-rose-500 focus:border-rose-500 shadow-sm"
                  placeholder="Tu corazón lo sabe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password2" className="block text-sm font-medium text-white dark:text-rose-200">
                Confirma tu contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-rose-300"></i>
                </div>
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  required
                  className="pl-10 block w-full rounded-lg border-gray-300/50 dark:border-gray-600/50 bg-white/70 dark:bg-gray-800/50 text-gray-800 dark:text-white focus:ring-rose-500 focus:border-rose-500 shadow-sm"
                  placeholder="Repite tu contraseña"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
            >
              Registrarse
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm text-white/80 dark:text-rose-200/80">
                ¿Ya tienes una cuenta?{" "}
                <span
                  className="text-rose-200 font-medium cursor-pointer hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Inicia sesión
                </span>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;

