/**
 * Catálogo de categorías de gasto admitidas por la aplicación.
 * Es la única fuente de verdad para validaciones, filtros y gráficos.
 */
export const CATEGORIES = Object.freeze([
  { id: 'comida', label: 'Comida', color: '#059669' },
  { id: 'transporte', label: 'Transporte', color: '#2563eb' },
  { id: 'ocio', label: 'Ocio', color: '#d97706' },
  { id: 'otros', label: 'Otros', color: '#7c3aed' },
]);

/** Valor del filtro que muestra todos los gastos. */
export const ALL_CATEGORIES = 'todos';

export const CATEGORY_IDS = Object.freeze(CATEGORIES.map((category) => category.id));

/**
 * Devuelve la definición de una categoría a partir de su identificador.
 * @param {string} categoryId
 * @returns {{id: string, label: string, color: string} | undefined}
 */
export function getCategoryById(categoryId) {
  return CATEGORIES.find((category) => category.id === categoryId);
}
