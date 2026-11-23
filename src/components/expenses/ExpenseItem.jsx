import { Trash2 } from 'lucide-react';
import { formatShortDate } from '../../utils/dateUtils.js';
import { formatCurrency } from '../../utils/formatCurrency.js';
import CategoryBadge, { CategoryIcon } from '../common/CategoryBadge.jsx';
import styles from './ExpenseItem.module.css';

function ExpenseItem({ expense, onDelete }) {
  const { name, amount, category, date } = expense;

  return (
    <li className={styles.item}>
      <div className={styles.main}>
        <CategoryIcon categoryId={category} />
        <span className={styles.name}>{name}</span>
      </div>
      <span className={styles.category}>
        <CategoryBadge categoryId={category} />
      </span>
      <time className={styles.date} dateTime={date}>
        {formatShortDate(date)}
      </time>
      <span className={`${styles.amount} tabular`}>{formatCurrency(amount)}</span>
      <button
        type="button"
        className={styles.deleteButton}
        onClick={() => onDelete(expense)}
        aria-label={`Eliminar gasto ${name}`}
        title="Eliminar gasto"
      >
        <Trash2 size={16} aria-hidden="true" />
      </button>
    </li>
  );
}

export default ExpenseItem;
