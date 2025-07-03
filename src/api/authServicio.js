
import api from './config';

// Envía las credenciales del usuario al endpoint de inicio de sesión de la API.
const iniciarSesion = async (credenciales) => {
  const respuesta = await api.post('/auth/login', credenciales);
  return respuesta.data;
};

// Envía los datos de un nuevo usuario al endpoint de registro de la API.
const registrar = async (datosUsuario) => {
    const respuesta = await api.post('/auth/registrar', datosUsuario);
    return respuesta.data;
}

// Crea un objeto 'authServicio' que agrupa todas las funciones
const authServicio = {
  iniciarSesion,
  registrar,
};

export default authServicio;