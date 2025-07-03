export const PaginacionPokemon = ({ paginaActual, totalPaginas, alCambiarPagina }) => {
  const manejarCambioPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      alCambiarPagina(nuevaPagina);
    }
  };

  return (
    <nav className="flex justify-center items-center gap-4 my-8" aria-label="Paginación">
      <button
        onClick={() => manejarCambioPagina(paginaActual - 1)}
        disabled={paginaActual === 1}
        className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-yellow-400 transition-colors"
      >
        Anterior
      </button>
      <span className="text-white font-semibold">
        Página {paginaActual} de {totalPaginas}
      </span>
      <button
        onClick={() => manejarCambioPagina(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
        className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-yellow-400 transition-colors"
      >
        Siguiente
      </button>
    </nav>
  );
};


