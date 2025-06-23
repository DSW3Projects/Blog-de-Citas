import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const success = await loginUser(username, password);
    if (success) navigate('/');
    else alert('Credenciales incorrectas');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4">Iniciar sesión</h2>
        <input type="text" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} className="w-full mb-3 p-2 border rounded" />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} className="w-full mb-3 p-2 border rounded" />
        <button className="bg-blue-500 text-white p-2 rounded w-full">Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;
