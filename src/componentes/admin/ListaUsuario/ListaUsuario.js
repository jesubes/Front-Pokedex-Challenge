

const ListaUsuario = ({usuarios, manejarEditar, setConfirmarBorrado}) => {

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-900 rounded-lg">
                <thead>
                    <tr className="border-b border-gray-700">
                        <th className="text-left p-4">ID</th>
                        <th className="text-left p-4">Nombre</th>
                        <th className="text-left p-4">Email</th>
                        <th className="text-left p-4">Rol</th>
                        <th className="text-left p-4">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id} className="border-b border-gray-800 hover:bg-gray-700/50">
                            <td className="p-4">{usuario.id}</td>
                            <td className="p-4">{usuario.nombre}</td>
                            <td className="p-4">{usuario.email}</td>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${usuario.rol === 'admin' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>
                                    {usuario.rol}
                                </span>
                            </td>
                            <td className="p-4 flex gap-2">
                                <button onClick={() => manejarEditar(usuario)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Editar</button>
                                <button onClick={() => setConfirmarBorrado(usuario.id)} className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


    )
}

export default ListaUsuario;