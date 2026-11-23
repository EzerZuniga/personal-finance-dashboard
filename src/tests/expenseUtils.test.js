import { addExpense, removeExpense, calculateTotal } from '../utils/expenseUtils.js';

const sampleExpenses = [
  { id: 'exp-1', name: 'Almuerzo', amount: 18.5, category: 'comida', date: '2026-11-20' },
  { id: 'exp-2', name: 'Pasaje en bus', amount: 2.8, category: 'transporte', date: '2026-11-21' },
  { id: 'exp-3', name: 'Entrada al cine', amount: 22, category: 'ocio', date: '2026-11-22' },
];

describe('Lógica de negocio de gastos (expenseUtils)', () => {
  test('agrega un gasto correctamente a la lista', () => {
    const newExpense = {
      id: 'exp-4',
      name: 'Útiles de oficina',
      amount: 35.9,
      category: 'otros',
      date: '2026-11-22',
    };

    const result = addExpense(sampleExpenses, newExpense);

    expect(result).toHaveLength(4);
    expect(result).toContainEqual(newExpense);
    expect(sampleExpenses).toHaveLength(3);
  });

  test('elimina un gasto de la lista', () => {
    const result = removeExpense(sampleExpenses, 'exp-2');

    expect(result).toHaveLength(2);
    expect(result.some((expense) => expense.id === 'exp-2')).toBe(false);
    expect(result.map((expense) => expense.id)).toEqual(['exp-1', 'exp-3']);
    expect(sampleExpenses).toHaveLength(3);
  });

  test('calcula correctamente el total de gastos', () => {
    expect(calculateTotal(sampleExpenses)).toBe(43.3);
    expect(calculateTotal([])).toBe(0);
  });
});
