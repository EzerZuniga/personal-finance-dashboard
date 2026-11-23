/**
 * Servicio de persistencia local de gastos (localStorage).
 *
 * Aísla el acceso al almacenamiento del resto de la aplicación y tolera:
 * - ausencia de datos guardados,
 * - JSON inválido o con una estructura inesperada,
 * - localStorage no disponible (modo privado, cuotas, entornos sin navegador).
 */
import { isValidExpense } from "../utils/validators.js";

export const STORAGE_KEY = "personal-finance-dashboard:expenses:v1";

/**
 * Obtiene localStorage si está disponible; en caso contrario, devuelve null.
 * @returns {Storage | null}
 */
function getStorage() {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return null;
    }
    return window.localStorage;
  } catch {
    return null;
  }
}

/**
 * Recupera los gastos guardados. Descarta los registros con formato inválido.
 * @returns {Array<object>} Lista de gastos; vacía si no hay datos o si son inválidos.
 */
export function loadExpenses() {
  const storage = getStorage();
  if (!storage) {
    return [];
  }

  try {
    const rawValue = storage.getItem(STORAGE_KEY);
    if (rawValue === null) {
      return [];
    }
    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue) ? parsedValue.filter(isValidExpense) : [];
  } catch {
    return [];
  }
}

/**
 * Guarda la lista completa de gastos.
 * @param {Array<object>} expenses
 * @returns {boolean} `true` si se guardó correctamente.
 */
export function saveExpenses(expenses) {
  const storage = getStorage();
  if (!storage) {
    return false;
  }

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    return true;
  } catch {
    return false;
  }
}

/**
 * Elimina todos los gastos guardados.
 * @returns {boolean} `true` si se eliminaron correctamente.
 */
export function clearExpenses() {
  const storage = getStorage();
  if (!storage) {
    return false;
  }

  try {
    storage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

/**
 * Indica si el navegador permite guardar datos en localStorage.
 * @returns {boolean}
 */
export function isStorageAvailable() {
  const storage = getStorage();
  if (!storage) {
    return false;
  }

  try {
    const probeKey = `${STORAGE_KEY}:probe`;
    storage.setItem(probeKey, "1");
    storage.removeItem(probeKey);
    return true;
  } catch {
    return false;
  }
}
