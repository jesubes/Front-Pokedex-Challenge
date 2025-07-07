/**
 * Modal para crear o editar un usuario.
 */
import { useState, useEffect } from "react";

function ModalUsuario({ abierto, alCerrar, alEnviar, datosIniciales }) {
  const [datos, setDatos] = useState({});
  const esEdicion = !!datosIniciales;

  useEffect(() => {
    // Cuando cambian los datos iniciales (al abrir el modal), reseteamos el formulario
    setDatos({
      nombre: datosIniciales?.nombre || '',
      email: datosIniciales?.email || '',
      password: '',
      rol: datosIniciales?.rol || 'viewer'
    });
  }, [datosIniciales, abierto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const datosFinales = { ...datos };
    // Si estamos editando y no se ingresó nueva contraseña, no la enviamos
    if (esEdicion && !datosFinales.password) {
      delete datosFinales.password;
    }
    alEnviar(datosFinales);
  };

  if (!abierto) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={alCerrar}>
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6 text-yellow-400">{esEdicion ? 'Editar Usuario' : 'Crear Usuario'}</h2>
        <form onSubmit={handleSubmit}>
          {/* Campo Nombre */}
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="nombre">Nombre</label>
            <input type="text" name="nombre" value={datos.nombre} onChange={handleChange} className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600" required />
          </div>
          {/* Campo Email */}
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
            <input type="email" name="email" value={datos.email} onChange={handleChange} className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600" required />
          </div>
          {/* Campo Contraseña */}
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="password">Contraseña</label>
            <input type="password" name="password" value={datos.password} onChange={handleChange} className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600" placeholder={esEdicion ? 'Dejar en blanco para no cambiar' : ''} required={!esEdicion} />
          </div>
          {/* Campo Rol */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2" htmlFor="rol">Rol</label>
            <select name="rol" value={datos.rol} onChange={handleChange} className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600">
              <option value="viewer">Espectador</option>
              <option value="admin">Administrador</option>
              <option value="editor">Editor</option>
            </select>
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={alCerrar} className="text-white px-4 py-2 rounded">Cancelar</button>
            <button type="submit" className="bg-yellow-500 text-gray-900 font-bold px-4 py-2 rounded hover:bg-yellow-600">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalUsuario;