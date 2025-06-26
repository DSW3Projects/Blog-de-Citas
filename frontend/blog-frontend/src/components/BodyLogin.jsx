import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const BodyLogin = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const success = await loginUser(username, password);
    if (success) navigate("/blogs");
    else alert("Credenciales incorrectas");
  };

  return(
    <>
      <h2 className="text-2xl font-bold mb-1 text-center text-white">Encuentra tu media naranja</h2>
      <p className="text-2x1 text-white mb-8 text-white">Comparte, conecta y vive el amor</p>
        <form onSubmit={handleSubmit} className="bg-black/50 p-6 rounded-lg shadow-md w-80">
            <input type="text" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} className="w-full mb-3 p-2 border rounded-full focus:outline-none focus:border-pink-600"/>
            <input type="password" placeholder="Contraseña"value={password} onChange={e => setPassword(e.target.value)} className="w-full mb-3 p-2 border rounded-full focus:outline-none focus:border-pink-600"/>
            <button className="bg-pink-500 hover:bg-pink-600 transition text-white p-2 rounded-lg w-full">Iniciar sesión</button>
        </form>
        <p className="pt-8 text-sm">¿Listo para encontrar el amor?{' '}<Link to="/register" className="text-white-400 underline hover:text-purple-500">Regístrate aquí</Link></p>
    </>
  );
};
export default BodyLogin;