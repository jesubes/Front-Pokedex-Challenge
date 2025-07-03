
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexto/AuthContexto';

function Cabecera() {
  const { estaAutenticado, esAdmin, usuario, cerrarSesion } = useAuth();
  const navigate = useNavigate();

  const manejarCerrarSesion = () => {
    cerrarSesion();
    navigate('/');
  };

  return (
    <header className="bg-gray-800 shadow-md">
      <nav className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-yellow-400">
          Pokédex
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-300 hover:text-white">Inicio</Link>
          {estaAutenticado ? (
            <>
              {esAdmin && (
                <Link to="/admin/usuarios" className="text-gray-300 hover:text-white">Gestionar Usuarios</Link>
              )}
              <span className="text-gray-400">Hola, {usuario.nombre}</span>
              <button onClick={manejarCerrarSesion} className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition-colors">
                Salir
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded hover:bg-yellow-500 transition-colors">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Cabecera;
