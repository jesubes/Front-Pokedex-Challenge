import { createContext, useState, useContext, useEffect } from 'react';
import authServicio from '../api/authServicio';

const AuthContexto = createContext();

export const useAuth = () => {
  return useContext(AuthContexto);
};

export const AuthProveedor = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Efecto para verificar si hay un usuario en localStorage al cargar la app
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
    setCargando(false);
  }, []);

  const iniciarSesion = async (email, password) => {
    try {
      const data = await authServicio.iniciarSesion({ email, password });
      setUsuario(data);
      localStorage.setItem('usuario', JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      throw error;
    }
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  const valor = {
    usuario,
    iniciarSesion,
    cerrarSesion,
    estaAutenticado: !!usuario, // Convierte el objeto usuario a un booleano
    esAdmin: usuario?.rol === 'admin'
  };

  // No renderizar la app hasta que se haya verificado el localStorage
  return (
    <AuthContexto.Provider value={valor}>
      {!cargando && children}
    </AuthContexto.Provider>
  );
};
