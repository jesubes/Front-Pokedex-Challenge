
import  { useState } from 'react';
import { useAuth } from '../contexto/AuthContexto';
import { useNavigate } from 'react-router-dom';

function LoginPagina() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await iniciarSesion(email, password);

      navigate('/'); // Redirige al inicio tras el login exitoso
    } catch (err) {
      setError('Credenciales incorrectas. Por favor, intente de nuevo.', err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={manejarSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-yellow-400">Iniciar Sesión</h2>
        {error && <p className="bg-red-500 text-white p-3 rounded mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-400 mb-2" htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>
        <button type="submit" className="w-full bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded hover:bg-yellow-500 transition-colors">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LoginPagina;