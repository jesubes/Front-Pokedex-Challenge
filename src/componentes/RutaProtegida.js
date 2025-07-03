
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexto/AuthContexto';

function RutaProtegida({ children, roles }) {
  const { usuario, estaAutenticado } = useAuth(); // se obtiene el objeto usuario completo

  // Si no está autenticado, redirige a la página de login.
  if (!estaAutenticado) {
    return <Navigate to="/login" />;
  }

  //si la ruta requiere roles especificos ('roles') y no esta en la lista de roles permitidos, se redirige inicio
  if(roles && !roles.includes(usuario.rol)){
    return <Navigate to="/" />;
  }
  
  // Si es un admin autenticado, muestra el contenido de la ruta.
  return children;
}

export default RutaProtegida;