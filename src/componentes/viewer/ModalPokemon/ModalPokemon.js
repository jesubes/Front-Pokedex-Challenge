import { capitalizarPrimeraLetra } from "../../../utilidades/capitalizarPalabra";

export const ModalPokemon = ({ pokemon, cerrar }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4" onClick={cerrar}>
            <div className="bg-gray-800 rounded-xl p-6 md:p-8 max-w-lg w-full relative border-4 border-gray-700 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <button onClick={cerrar} className="absolute top-3 right-3 text-white text-3xl hover:text-yellow-400 transition-colors">&times;</button>

                <div className="text-center">
                    <span className="text-xl text-gray-400">N.º {pokemon.id.toString().padStart(3, '0')}</span>
                    <h2 className="text-4xl font-bold text-yellow-400 my-2">{capitalizarPrimeraLetra(pokemon.name)}</h2>
                    <img
                        src={pokemon.sprites.other['official-artwork'].front_default}
                        alt={`Arte oficial de ${pokemon.name}`}
                        className="mx-auto w-48 h-48 md:w-64 md:h-64 my-4"
                    />
                </div>

                <div className="flex justify-center gap-2 mb-6">
                    {pokemon.types.map(tipoInfo => (
                        <span key={tipoInfo.type.name} className={`px-4 py-1 rounded-full text-sm font-bold bg-yellow-400`}>
                            {capitalizarPrimeraLetra(tipoInfo.type.name)}
                        </span>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4 text-center mb-6">
                    <div>
                        <h3 className="text-gray-400 font-bold">Altura</h3>
                        <p className="text-2xl">{pokemon.height / 10} m</p>
                    </div>
                    <div>
                        <h3 className="text-gray-400 font-bold">Peso</h3>
                        <p className="text-2xl">{pokemon.weight / 10} kg</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-3 text-center text-gray-300">Estadísticas Base</h3>
                    {pokemon.stats.map(statInfo => (
                        <div key={statInfo.stat.name} className="flex items-center mb-2">
                            <span className="w-1/3 text-right pr-4 text-gray-400 text-sm">{capitalizarPrimeraLetra(statInfo.stat.name.replace('-', ' '))}</span>
                            <div className="w-2/3 bg-gray-700 rounded-full h-5">
                                <div
                                    className="bg-yellow-400 h-5 rounded-full flex items-center justify-end pr-2 text-black font-bold text-xs"
                                    style={{ width: `${(statInfo.base_stat / 255) * 100}%` }}
                                >
                                    {statInfo.base_stat}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
