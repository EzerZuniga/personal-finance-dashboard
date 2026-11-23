/**
 * Validaciones de datos de gastos (JavaScript puro).
 */
import { CATEGORY_IDS } from '../constants/categories.js';

export const NAME_MAX_LENGTH = 60;
export const AMOUNT_MAX = 1_000_000;

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Comprueba si un texto es una fecha válida con formato AAAA-MM-DD.
 * @param {string} value
 * @returns {boolean}
 */
export function isValidISODate(value) {
  if (typeof value !== 'string' || !ISO_DATE_PATTERN.test(value)) {
    return false;
  }
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

/**
 * Comprueba si una categoría pertenece al catálogo.
 * @param {string} category
 * @returns {boolean}
 */
export function isValidCategory(category) {
  return CATEGORY_IDS.includes(category);
}

/**
 * Valida los datos del formulario de gastos.
 * @param {{name: string, amount: string|number, category: string, date: string}} values
 * @returns {Record<string, string>} Errores por campo; objeto vacío si todo es válido.
 */
export function validateExpenseInput({ name, amount, category, date }) {
  const errors = {};
  const trimmedName = String(name ?? '').trim();
  const amountText = String(amount ?? '').trim();
  const numericAmount = Number(amountText);

  if (trimmedName === '') {
    errors.name = 'Ingresa el nombre del gasto.';
  } else if (trimmedName.length > NAME_MAX_LENGTH) {
    errors.name = `El nombre no puede superar ${NAME_MAX_LENGTH} caracteres.`;
  }

  if (amountText === '') {
    errors.amount = 'Ingresa el monto del gasto.';
  } else if (!Number.isFinite(numericAmount)) {
    errors.amount = 'El monto debe ser un número.';
  } else if (numericAmount <= 0) {
    errors.amount = 'El monto debe ser mayor que cero.';
  } else if (numericAmount > AMOUNT_MAX) {
    errors.amount = 'El monto supera el máximo permitido.';
  } else if (Math.round(numericAmount * 100) <= 0) {
    errors.amount = 'El monto mínimo es S/ 0.01.';
  }

  if (!isValidCategory(category)) {
    errors.category = 'Selecciona una categoría válida.';
  }

  if (!isValidISODate(date)) {
    errors.date = 'Selecciona una fecha válida.';
  }

  return errors;
}

/**
 * Comprueba si un objeto tiene la forma de un gasto almacenado válido.
 * Se usa al recuperar datos persistidos.
 * @param {unknown} expense
 * @returns {boolean}
 */
export function isValidExpense(expense) {
  return (
    expense !== null &&
    typeof expense === 'object' &&
    typeof expense.id === 'string' &&
    expense.id !== '' &&
    typeof expense.name === 'string' &&
    expense.name.trim() !== '' &&
    typeof expense.amount === 'number' &&
    Number.isFinite(expense.amount) &&
    expense.amount > 0 &&
    isValidCategory(expense.category) &&
    isValidISODate(expense.date)
  );
}
