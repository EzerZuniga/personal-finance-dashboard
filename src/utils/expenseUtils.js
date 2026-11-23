/**
 * Lógica de negocio de la aplicación de control de gastos.
 *
 * JavaScript puro: no importa React, no usa hooks, no accede al DOM
 * ni a APIs del navegador. Todas las funciones son inmutables: nunca
 * modifican los arreglos u objetos recibidos y siempre devuelven valores nuevos.
 */
import { ALL_CATEGORIES, CATEGORY_IDS } from '../constants/categories.js';

/**
 * Convierte un monto a céntimos enteros para evitar errores de coma flotante
 * (por ejemplo, 0.1 + 0.2 !== 0.3).
 * @param {number} amount
 * @returns {number}
 */
function toCents(amount) {
  return Math.round(Number(amount) * 100);
}

/**
 * Convierte céntimos enteros nuevamente a soles con dos decimales.
 * @param {number} cents
 * @returns {number}
 */
function fromCents(cents) {
  return cents / 100;
}

/**
 * Redondea un monto a dos decimales (precisión monetaria).
 * @param {number} amount
 * @returns {number}
 */
export function roundAmount(amount) {
  return fromCents(toCents(amount));
}

/**
 * Genera un identificador único para un gasto.
 * @returns {string}
 */
export function generateExpenseId() {
  const timePart = Date.now().toString(36);
  const randomPart = Math.random().toString(36).slice(2, 10);
  return `exp-${timePart}-${randomPart}`;
}

/**
 * Construye un gasto normalizado a partir de los datos del formulario.
 * @param {{name: string, amount: number|string, category: string, date: string}} data
 * @param {string} [id] Identificador; si no se indica, se genera uno nuevo.
 * @returns {{id: string, name: string, amount: number, category: string, date: string}}
 */
export function createExpense({ name, amount, category, date }, id = generateExpenseId()) {
  return {
    id,
    name: String(name).trim(),
    amount: roundAmount(amount),
    category,
    date,
  };
}

/**
 * Agrega un gasto a la lista sin modificar el arreglo original.
 * El gasto nuevo se coloca al inicio para mostrar primero el más reciente.
 * @param {Array<object>} expenses
 * @param {object} expense
 * @returns {Array<object>}
 */
export function addExpense(expenses, expense) {
  return [expense, ...expenses];
}

/**
 * Elimina el gasto con el identificador indicado sin modificar el arreglo original.
 * @param {Array<object>} expenses
 * @param {string} expenseId
 * @returns {Array<object>}
 */
export function removeExpense(expenses, expenseId) {
  return expenses.filter((expense) => expense.id !== expenseId);
}

/**
 * Calcula el total acumulado de una lista de gastos con precisión de céntimos.
 * @param {Array<{amount: number}>} expenses
 * @returns {number}
 */
export function calculateTotal(expenses) {
  const totalCents = expenses.reduce((sum, expense) => sum + toCents(expense.amount), 0);
  return fromCents(totalCents);
}

/**
 * Filtra los gastos por categoría. Con `ALL_CATEGORIES` devuelve todos.
 * @param {Array<{category: string}>} expenses
 * @param {string} category
 * @returns {Array<object>}
 */
export function filterExpensesByCategory(expenses, category) {
  if (category === ALL_CATEGORIES) {
    return [...expenses];
  }
  return expenses.filter((expense) => expense.category === category);
}

/**
 * Calcula el total gastado en cada categoría.
 * Incluye todas las categorías, aunque su total sea cero.
 * @param {Array<{amount: number, category: string}>} expenses
 * @returns {Record<string, number>}
 */
export function calculateCategoryTotals(expenses) {
  const initialTotals = Object.fromEntries(CATEGORY_IDS.map((id) => [id, 0]));

  const centsByCategory = expenses.reduce((totals, expense) => {
    if (!(expense.category in totals)) {
      return totals;
    }
    return {
      ...totals,
      [expense.category]: totals[expense.category] + toCents(expense.amount),
    };
  }, initialTotals);

  return Object.fromEntries(
    Object.entries(centsByCategory).map(([id, cents]) => [id, fromCents(cents)]),
  );
}

/**
 * Calcula el gasto promedio. Devuelve 0 si no hay gastos.
 * @param {Array<{amount: number}>} expenses
 * @returns {number}
 */
export function calculateAverageExpense(expenses) {
  if (expenses.length === 0) {
    return 0;
  }
  return roundAmount(calculateTotal(expenses) / expenses.length);
}

/**
 * Obtiene la categoría con mayor gasto acumulado.
 * @param {Array<{amount: number, category: string}>} expenses
 * @returns {{category: string, total: number} | null} `null` si no hay gastos.
 */
export function getTopExpenseCategory(expenses) {
  const entries = Object.entries(calculateCategoryTotals(expenses));

  const top = entries.reduce(
    (best, [category, total]) => (total > best.total ? { category, total } : best),
    { category: null, total: 0 },
  );

  return top.category === null ? null : top;
}

/**
 * Ordena los gastos por fecha, del más reciente al más antiguo.
 * Ante fechas iguales conserva el orden de registro (el más nuevo primero).
 * @param {Array<{date: string}>} expenses
 * @returns {Array<object>} Copia ordenada; el arreglo original no cambia.
 */
export function sortExpensesByDate(expenses) {
  return [...expenses].sort((first, second) => second.date.localeCompare(first.date));
}

/**
 * Calcula el porcentaje que representa cada categoría sobre el total.
 * @param {Array<{amount: number, category: string}>} expenses
 * @returns {Array<{category: string, total: number, percentage: number}>}
 */
export function calculateCategoryDistribution(expenses) {
  const total = calculateTotal(expenses);
  const totals = calculateCategoryTotals(expenses);

  return Object.entries(totals).map(([category, categoryTotal]) => ({
    category,
    total: categoryTotal,
    percentage: total === 0 ? 0 : (categoryTotal / total) * 100,
  }));
}
