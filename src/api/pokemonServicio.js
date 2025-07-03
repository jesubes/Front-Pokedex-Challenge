
/**
 * Obtiene los datos detallados de los Pokémon.
 * Esta función se comunica directamente con la PokéAPI pública.
 */
const obtenerPokemonesIniciales = async (pokemonPorPagina = 20, offset) => {
  try {
    const respuestaLista = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonPorPagina}&offset=${offset}`);
    const datosLista = await respuestaLista.json();
    
    const contarTodos = datosLista.count
    const promesasDetalles = datosLista.results.map(pokemon => 
      fetch(pokemon.url).then(res => res.json())
    );
    
    const datosDetallados = await Promise.all(promesasDetalles);
    return {datosDetallados, contarTodos};
  } catch (error) {
    console.error("Error al obtener los datos de los Pokémon:", error);
    throw error;
  }
};

const pokemonServicio = {
    obtenerPokemonesIniciales,
};

export default pokemonServicio;