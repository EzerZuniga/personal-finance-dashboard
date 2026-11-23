import { ALL_CATEGORIES, CATEGORIES } from '../../constants/categories.js';
import styles from './ExpenseFilter.module.css';

const FILTER_OPTIONS = [{ id: ALL_CATEGORIES, label: 'Todos' }, ...CATEGORIES];

/**
 * Selector de categoría para filtrar la lista de gastos.
 */
function ExpenseFilter({ selectedCategory, onChange }) {
  return (
    <div className={styles.filter} role="group" aria-label="Filtrar gastos por categoría">
      {FILTER_OPTIONS.map(({ id, label, color }) => {
        const isActive = id === selectedCategory;
        return (
          <button
            key={id}
            type="button"
            className={`${styles.chip} ${isActive ? styles.active : ''}`}
            aria-pressed={isActive}
            onClick={() => onChange(id)}
          >
            {color && (
              <span className={styles.dot} style={{ backgroundColor: color }} aria-hidden="true" />
            )}
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default ExpenseFilter;
