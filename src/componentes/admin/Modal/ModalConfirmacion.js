/**
 * Modal genérico de confirmación.
 */
function ModalConfirmacion({ abierto, alCerrar, alConfirmar, titulo, mensaje }) {
  if (!abierto) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">{titulo}</h2>
        <p className="text-gray-300 mb-6">{mensaje}</p>
        <div className="flex justify-end gap-4">
          <button onClick={alCerrar} className="bg-gray-600 text-white font-bold px-4 py-2 rounded hover:bg-gray-700">Cancelar</button>
          <button onClick={alConfirmar} className="bg-red-600 text-white font-bold px-4 py-2 rounded hover:bg-red-700">Confirmar</button>
        </div>
      </div>
    </div>
  );
}


export default ModalConfirmacion;