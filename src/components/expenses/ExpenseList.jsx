import { ReceiptText } from 'lucide-react';
import EmptyState from '../common/EmptyState.jsx';
import ExpenseItem from './ExpenseItem.jsx';
import styles from './ExpenseList.module.css';

/**
 * Lista de gastos. En escritorio se presenta como tabla; en móvil, como tarjetas.
 */
function ExpenseList({ expenses, onDelete, emptyTitle, emptyDescription }) {
  if (expenses.length === 0) {
    return <EmptyState icon={ReceiptText} title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div>
      <div className={styles.columns} aria-hidden="true">
        <span>Gasto</span>
        <span>Categoría</span>
        <span>Fecha</span>
        <span className={styles.alignRight}>Monto</span>
        <span />
      </div>
      <ul className={styles.list} aria-label="Gastos registrados">
        {expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
