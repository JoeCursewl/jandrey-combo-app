export function generateBinanceId() {
    const timestamp = Date.now();
    const modificador = Math.floor(Math.random() * 100);
    const idUnico = timestamp + modificador;
    return idUnico
}