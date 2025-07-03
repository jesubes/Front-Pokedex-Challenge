
import { useState, useEffect } from 'react';
import pokemonServicio from '../api/pokemonServicio';
import { TarjetaPokemon } from '../componentes/viewer/Pokemon/TarjetaPokemon';
import { ModalPokemon } from '../componentes/viewer/ModalPokemon/ModalPokemon';
import { PaginacionPokemon } from '../componentes/viewer/Pokemon/PaginacionPokemon'; 


function PokedexPagina() {
  const [pokemonesLista, setPokemonesLista] = useState([]);
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Estado para la paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const POKEMON_POR_PAGINA = 20;


  useEffect(() => {
    const cargarListaPokemon = async () => {
      try {
        const offset = (paginaActual - 1) * POKEMON_POR_PAGINA;
        const {datosDetallados, contarTodos} = await pokemonServicio.obtenerPokemonesIniciales(POKEMON_POR_PAGINA, offset);
        setPokemonesLista(datosDetallados);

        setTotalPaginas(Math.ceil(contarTodos / POKEMON_POR_PAGINA))

      } catch (error) {
        console.error("Fallo al cargar los pokemones", error);
      } finally {
        setCargando(false);
      }
    };
    cargarListaPokemon();
  }, [paginaActual]); //se ejecuta cada vez que paginaActual cambia

  const seleccionarPokemon = (pokemon) => setPokemonSeleccionado(pokemon);
  const cerrarModal = () => setPokemonSeleccionado(null);

  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 tracking-wider text-center">Pokédex</h1>
      <p className="text-gray-400 mt-2 text-center">Mundo Pokémon</p>
      <div className="my-8 max-w-lg mx-auto">
      </div>
      {/* ----------------- */}
      {cargando ? <p>Cargando...</p> : (
        <>
          <PaginacionPokemon
            paginaActual={paginaActual}
            totalPaginas={totalPaginas}
            alCambiarPagina={setPaginaActual}
          />
            <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {pokemonesLista.map(pokemon => (
                <TarjetaPokemon key={pokemon.id} pokemon={pokemon} seleccionar={seleccionarPokemon} />
              ))}
            </main>
        </>
      )}

      {/* ModalPokemon */}
      {pokemonSeleccionado && (
        <ModalPokemon pokemon={pokemonSeleccionado} cerrar={cerrarModal} />
      )}
    </div>
  );
}

export default PokedexPagina;