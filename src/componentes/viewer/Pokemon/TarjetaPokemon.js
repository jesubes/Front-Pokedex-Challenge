import { capitalizarPrimeraLetra } from "../../../utilidades/capitalizarPalabra";


export const TarjetaPokemon = ({ pokemon, seleccionar}) => {

  
  return (
     <div
      
      onClick={() => seleccionar(pokemon)}
      className="bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-700 hover:scale-105 transition-transform duration-200 shadow-lg"
    >
      <img
        src={pokemon.sprites.front_default}
        alt={`Imagen de ${pokemon.name}`}
        className="w-24 h-24 md:w-32 md:h-32"
        loading="lazy"
      />
      <span className="text-sm text-gray-400 mt-2">N.º {pokemon.id.toString().padStart(3, '0')}</span>
      <h2 className="text-lg font-bold mt-1">{capitalizarPrimeraLetra(pokemon.name)}</h2>
    </div>
  )
}
