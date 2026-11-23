/**
 * Formateo de montos en soles peruanos (PEN) y de porcentajes asociados.
 */
const currencyFormatter = new Intl.NumberFormat('es-PE', {
  style: 'currency',
  currency: 'PEN',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Formatea un número como moneda peruana. Ejemplo: 1234.5 → "S/ 1,234.50".
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
  return currencyFormatter.format(Number.isFinite(amount) ? amount : 0);
}

const percentFormatter = new Intl.NumberFormat('es-PE', {
  style: 'percent',
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

/**
 * Formatea un porcentaje expresado de 0 a 100. Ejemplo: 42.5 → "42.5%".
 * @param {number} percentage
 * @returns {string}
 */
export function formatPercent(percentage) {
  return percentFormatter.format(Number.isFinite(percentage) ? percentage / 100 : 0);
}
