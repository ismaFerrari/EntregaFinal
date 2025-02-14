// 1. Obtener tasas de cambio desde API
async function obtenerTasas() {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    return data.rates;
}

// 2. Convertir moneda
async function convertirMoneda() {
    const tasas = await obtenerTasas();
    const monto = parseFloat(document.getElementById('monto').value);
    const monedaOrigen = document.getElementById('moneda-origen').value;
    const monedaDestino = document.getElementById('moneda-destino').value;
    
    if (isNaN(monto) || monto <= 0) {
        Swal.fire('Error', 'Ingrese un monto válido', 'error');
        return;
    }
    
    const tasaConversion = tasas[monedaDestino] / tasas[monedaOrigen];
    const resultado = monto * tasaConversion;
    
    document.getElementById('resultado').innerText = `Resultado: ${resultado.toFixed(2)} ${monedaDestino}`;
}

// 3. Inicializar eventos
document.getElementById('convertir').addEventListener('click', convertirMoneda);

document.addEventListener('DOMContentLoaded', async () => {
    const tasas = await obtenerTasas();
    const selects = document.querySelectorAll('select');
    Object.keys(tasas).forEach(moneda => {
        selects.forEach(select => {
            const option = document.createElement('option');
            option.value = moneda;
            option.textContent = moneda;
            select.appendChild(option);
        });
    });
});
