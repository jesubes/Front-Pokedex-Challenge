// Este servicio contiene todas las llamadas al CRUD de usuarios del backend.
import api from './config';

const obtenerTodos = async () => {
    const respuesta = await api.get('/usuarios');
    return respuesta.data;
}

const crear = async (datosUsuario) => {

    const respuesta = await api.post('/usuarios', datosUsuario);
    return respuesta.data;
}

const actualizar = async (id, datosUsuario) => {
    const respuesta = await api.put(`/usuarios/${id}`, datosUsuario);
    return respuesta.data;
}

const eliminar = async (id) => {
    const respuesta = await api.delete(`/usuarios/${id}`);
    return respuesta.data;
}

const usuarioServicio = {
    obtenerTodos,
    crear,
    actualizar,
    eliminar
}

export default usuarioServicio;
