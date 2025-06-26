import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const BodyRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { registerUser } = useContext(AuthContext); // Asegúrate de tener esta función en tu contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const success = await registerUser(username, email, password);
    if (success) navigate("/");
    else alert("Error al registrar usuario");
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed bg-gray-100"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1494774157365-9e04c6720e47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      <h2 className="text-2xl font-bold mb-1 text-center text-white">
        Registrate y encuentra tu pareja
      </h2>
      <p className="text-white mb-8">Comienza tu historia de amor</p>

      <form onSubmit={handleSubmit} className="bg-black/50 p-6 rounded-lg shadow-md w-80">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 p-2 border rounded-full focus:outline-none focus:border-pink-600"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded-full focus:outline-none focus:border-pink-600"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded-full focus:outline-none focus:border-pink-600"
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded-full focus:outline-none focus:border-pink-600"
        />
        <button className="bg-pink-500 hover:bg-pink-600 transition text-white p-2 rounded w-full">
          Crear cuenta
        </button>
      </form>
      <p className="pt-8 text-sm">
        ¿Ya tienes una cuenta?{' '}
        <Link to="/" className="text-white-400 underline hover:text-purple-500">
        Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
};
export default BodyRegister;