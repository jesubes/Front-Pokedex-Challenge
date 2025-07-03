// /cliente/src/paginas/admin/GestionUsuariosPagina.js

import { useState, useEffect } from 'react';
import usuarioServicio from '../../api/usuarioServicio';
import ModalConfirmacion from '../../componentes/admin/Modal/ModalConfirmacion';
import ModalUsuario from '../../componentes/admin/Modal/ModalUsuario';
import ListaUsuario from '../../componentes/admin/ListaUsuario/ListaUsuario';

function GestionUsuariosPagina() {

  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Estados para el modal de edición/creación
  const [modalAbierto, setModalAbierto] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null); //Si es null, es Crear, si tiene datos es Editar

  // Estados para el modal de confirmación de borrado
  const [confirmarBorrado, setConfirmarBorrado] = useState(null); // Almacena el ID del usuario

  // --- EFECTOS ---
  useEffect(() => {
    cargarUsuarios();
  }, []);

  // --- FUNCIONES ---

  //Carga o recarga la lista de usuarios desde el backend.
  
  const cargarUsuarios = async () => {
    setCargando(true);
    setError('');
    try {
      const data = await usuarioServicio.obtenerTodos();
      setUsuarios(data);
    } catch (err) {
      setError('No se pudo cargar la lista de usuarios. ' + (err.response?.data?.mensaje || err.message));
    } finally {
      setCargando(false);
    }
  };

  // Abre el modal para crear un nuevo usuario.
  const manejarCrear = () => {
    setUsuarioActual(null); // Limpiamos el usuario actual para crear
    setModalAbierto(true);
  };

  //Abre el modal para editar un usuario existente.

  const manejarEditar = (usuario) => {
    setUsuarioActual(usuario); // usuario a editar
    setModalAbierto(true);
  };

  // Gestiona el envío del formulario del modal (crear o actualizar).
  const manejarSubmitModal = async (datosFormulario) => {
    try {
      if (usuarioActual) {
        // Actualizar usuario existente
        await usuarioServicio.actualizar(usuarioActual.id, datosFormulario);
      } else {
        // Crear nuevo usuario
        await usuarioServicio.crear(datosFormulario);
      }
      setModalAbierto(false);
      cargarUsuarios(); // Recargamos la lista para ver los cambios
    } catch (err) {
      // mostrar el error
      alert('Error: ' + (err.response?.data?.mensaje || err.message));
    }
  };

  //  confirmación para eliminar un usuario

  const manejarBorrar = async () => {
    if (!confirmarBorrado) return;
    try {
      await usuarioServicio.eliminar(confirmarBorrado);
      setConfirmarBorrado(null); // Cierra el modal de confirmación
      cargarUsuarios(); // Recarga la lista
    } catch (err) {
      setError('No se pudo eliminar el usuario. ' + (err.response?.data?.mensaje || err.message));
    }
  };


  if (cargando) {
    return <div className="text-center mt-10">Cargando usuarios...</div>;
  }

  return (
    <div className="bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-yellow-400">Gestión de Usuarios</h1>
        <button
          onClick={manejarCrear}
          className="bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded hover:bg-yellow-600 transition-colors"
        >
          Crear Usuario
        </button>
      </div>

      {error && <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>}

      <ListaUsuario 
        usuarios = {usuarios}
        manejarEditar = {manejarEditar}
        setConfirmarBorrado ={setConfirmarBorrado}
      />

      {/* Renderizado de los modales */}
      <ModalUsuario
        abierto={modalAbierto}
        alCerrar={() => setModalAbierto(false)}
        alEnviar={manejarSubmitModal}
        datosIniciales={usuarioActual}
      />
      
      <ModalConfirmacion
        abierto={!!confirmarBorrado}
        alCerrar={() => setConfirmarBorrado(null)}
        alConfirmar={manejarBorrar}
        titulo="Confirmar Eliminación"
        mensaje="¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer."
      />
    </div>
  );
}

export default GestionUsuariosPagina;