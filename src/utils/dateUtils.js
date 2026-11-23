/**
 * Utilidades de fecha. Trabajan con fechas locales en formato AAAA-MM-DD
 * para evitar desfases de zona horaria al mostrar los gastos.
 */

/**
 * Devuelve la fecha local indicada en formato AAAA-MM-DD.
 * @param {Date} [date]
 * @returns {string}
 */
export function toISODate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Convierte una fecha AAAA-MM-DD en un objeto Date local (sin desfase UTC).
 * @param {string} isoDate
 * @returns {Date}
 */
function parseISODate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day);
}

const shortDateFormatter = new Intl.DateTimeFormat('es-PE', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const longDateFormatter = new Intl.DateTimeFormat('es-PE', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

/**
 * Formatea una fecha AAAA-MM-DD para listas. Ejemplo: "22 nov. 2026".
 * @param {string} isoDate
 * @returns {string}
 */
export function formatShortDate(isoDate) {
  return shortDateFormatter.format(parseISODate(isoDate));
}

/**
 * Formatea una fecha completa para el encabezado.
 * Ejemplo: "Domingo, 22 de noviembre de 2026".
 * @param {Date} [date]
 * @returns {string}
 */
export function formatLongDate(date = new Date()) {
  const text = longDateFormatter.format(date);
  return text.charAt(0).toUpperCase() + text.slice(1);
}
