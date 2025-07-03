// Convierte la primera letra de un string a mayúscula.
export const capitalizarPrimeraLetra = (texto) => {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}