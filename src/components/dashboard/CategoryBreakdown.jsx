import { getCategoryById } from '../../constants/categories.js';
import { formatCurrency, formatPercent } from '../../utils/formatCurrency.js';
import { CategoryIcon } from '../common/CategoryBadge.jsx';
import styles from './CategoryBreakdown.module.css';

/**
 * Detalle por categoría: nombre, monto, porcentaje y barra proporcional.
 * Funciona también como vista tabular del gráfico.
 */
function CategoryBreakdown({ distribution, selectedCategory, showAll }) {
  return (
    <ul className={styles.list}>
      {distribution.map(({ category, total, percentage }) => {
        const { label, color } = getCategoryById(category);
        const isSelected = !showAll && category === selectedCategory;
        const isDimmed = !showAll && !isSelected;

        return (
          <li
            key={category}
            className={`${styles.row} ${isSelected ? styles.selected : ''} ${isDimmed ? styles.dimmed : ''}`}
          >
            <CategoryIcon categoryId={category} size="sm" />
            <div className={styles.info}>
              <div className={styles.labels}>
                <span className={styles.name}>{label}</span>
                <span className={`${styles.amount} tabular`}>{formatCurrency(total)}</span>
              </div>
              <div className={styles.meter}>
                <div className={styles.meterTrack} aria-hidden="true">
                  <div
                    className={styles.meterFill}
                    style={{ width: `${percentage}%`, backgroundColor: color }}
                  />
                </div>
                <span className={`${styles.percentage} tabular`}>{formatPercent(percentage)}</span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CategoryBreakdown;
