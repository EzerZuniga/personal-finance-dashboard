import { useEffect, useMemo, useState } from 'react';
import { ALL_CATEGORIES } from '../constants/categories.js';
import { clearExpenses, loadExpenses, saveExpenses } from '../services/expenseStorage.js';
import {
  addExpense,
  calculateAverageExpense,
  calculateCategoryDistribution,
  calculateTotal,
  createExpense,
  filterExpensesByCategory,
  getTopExpenseCategory,
  removeExpense,
  sortExpensesByDate,
} from '../utils/expenseUtils.js';

/**
 * Hook que conecta el estado de React (useState) con la lógica de negocio
 * y el servicio de persistencia. No contiene cálculos propios: delega en
 * las funciones puras de `expenseUtils.js`.
 */
export function useExpenses() {
  const [expenses, setExpenses] = useState(loadExpenses);
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);

  // Sincroniza cada cambio de la lista con localStorage.
  useEffect(() => {
    if (expenses.length === 0) {
      clearExpenses();
    } else {
      saveExpenses(expenses);
    }
  }, [expenses]);

  const summary = useMemo(
    () => ({
      total: calculateTotal(expenses),
      count: expenses.length,
      average: calculateAverageExpense(expenses),
      topCategory: getTopExpenseCategory(expenses),
      distribution: calculateCategoryDistribution(expenses),
    }),
    [expenses],
  );

  const filteredExpenses = useMemo(
    () => sortExpensesByDate(filterExpensesByCategory(expenses, selectedCategory)),
    [expenses, selectedCategory],
  );

  const filteredTotal = useMemo(() => calculateTotal(filteredExpenses), [filteredExpenses]);

  function addNewExpense(expenseData) {
    const expense = createExpense(expenseData);
    setExpenses((currentExpenses) => addExpense(currentExpenses, expense));
    return expense;
  }

  function deleteExpense(expenseId) {
    setExpenses((currentExpenses) => removeExpense(currentExpenses, expenseId));
  }

  function deleteAllExpenses() {
    setExpenses([]);
  }

  return {
    expenses,
    filteredExpenses,
    filteredTotal,
    selectedCategory,
    setSelectedCategory,
    summary,
    addNewExpense,
    deleteExpense,
    deleteAllExpenses,
  };
}
