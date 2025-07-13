
import { useState, useEffect } from 'react';
import pokemonServicio from '../api/pokemonServicio';
import { TarjetaPokemon } from '../componentes/viewer/Pokemon/TarjetaPokemon';
import { ModalPokemon } from '../componentes/viewer/ModalPokemon/ModalPokemon';
import { PaginacionPokemon } from '../componentes/viewer/Pokemon/PaginacionPokemon';


function PokedexPagina() {
  const [pokemonesLista, setPokemonesLista] = useState([]);
  const [pokemonesFiltrados, setPokemonesFiltrados] = useState([]);
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Estado para la paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const POKEMON_POR_PAGINA = 20;

  const [busqueda, setBusqueda] = useState('');




  useEffect(() => {
    const cargarListaPokemon = async () => {
      try {
        const offset = (paginaActual - 1) * POKEMON_POR_PAGINA;
        const { datosDetallados, contarTodos } = await pokemonServicio.obtenerPokemonesIniciales(POKEMON_POR_PAGINA, offset);
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



  //se toma los cambios que hace en el input de barra de busqueda
  const manejarCambios = (e) => {
    setBusqueda(e.target.value)
  }

  const seleccionarPokemon = (pokemon) => setPokemonSeleccionado(pokemon);
  const cerrarModal = () => setPokemonSeleccionado(null);

  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 tracking-wider text-center">Pokédex</h1>
      <p className="text-gray-400 mt-2 text-center">Mundo Pokémon</p>
      <div className="my-8 max-w-lg mx-auto">
      </div>
      {/* busqueda */}
      <div className="w-auto flex justify-center">
        <input className='w-md px-2 border-blue-500 border-2 rounded-lg'
          type='text'
          value={busqueda}
          onChange={manejarCambios}
          placeholder='Buscar Pokémon por nombre o ID'
        />
      </div>
      {/* ----------------- */}
      {cargando ? <p>Cargando...</p> : (busqueda ? (<RenderBusqueda busqueda={busqueda} seleccionar={seleccionarPokemon} pokemonesFiltrados={pokemonesFiltrados} setPokemonesFiltrados={setPokemonesFiltrados} />) : (
        <>
          {/* paginacion */}
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
      ))}

      {/* ModalPokemon */}
      {pokemonSeleccionado && (
        <ModalPokemon pokemon={pokemonSeleccionado} cerrar={cerrarModal} />
      )}
    </div>
  );
}

const RenderBusqueda = ({ busqueda, seleccionar, pokemonesFiltrados, setPokemonesFiltrados }) => {

  useEffect(() => {
    const encontrarPokemon = async () => {
      const todosPokemones = await pokemonServicio.obtenerPokemonesBusqueda();
      const resultado = todosPokemones.filter(pokemon =>
        pokemon.name.toLowerCase().includes(busqueda.toLowerCase())
      )

      const promesasDetalles = resultado.map(pokemon =>
        fetch(pokemon.url).then(res => res.json())
      );

      const datosDetalles = await Promise.all(promesasDetalles)

      console.log(datosDetalles)
      setPokemonesFiltrados(datosDetalles)

    };
    encontrarPokemon();
  }, [busqueda])


  return (

    <div className="pt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {pokemonesFiltrados.map(pokemon => (
        <TarjetaPokemon key={pokemon.id} pokemon={pokemon} seleccionar={seleccionar} />
      ))}
    </div>
  )
}


export default PokedexPagina;