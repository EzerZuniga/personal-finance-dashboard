import { getCategoryById } from '../../constants/categories.js';
import { formatCurrency, formatPercent } from '../../utils/formatCurrency.js';
import styles from './ExpenseChart.module.css';

/**
 * Barra segmentada con la distribución del gasto por categoría.
 * Cada segmento muestra un tooltip al pasar el cursor o al enfocarlo con teclado.
 * Si hay un filtro activo, se resalta la categoría seleccionada.
 *
 * @param {{distribution: Array<{category: string, total: number, percentage: number}>,
 *          selectedCategory: string, showAll: boolean}} props
 */
function ExpenseChart({ distribution, selectedCategory, showAll }) {
  const visibleSegments = distribution.filter((item) => item.total > 0);

  return (
    <div className={styles.chart}>
      <div className={styles.track} role="list" aria-label="Distribución de gastos por categoría">
        {visibleSegments.map(({ category, total, percentage }) => {
          const { label, color } = getCategoryById(category);
          const isDimmed = !showAll && category !== selectedCategory;
          const description = `${label}: ${formatCurrency(total)} (${formatPercent(percentage)})`;

          return (
            <div
              key={category}
              role="listitem"
              tabIndex={0}
              aria-label={description}
              className={`${styles.segment} ${isDimmed ? styles.dimmed : ''}`}
              style={{ flexGrow: percentage, backgroundColor: color }}
            >
              <span className={styles.tooltip} aria-hidden="true">
                <strong>{label}</strong>
                <span className="tabular">{formatCurrency(total)}</span>
                <span className="tabular">{formatPercent(percentage)}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExpenseChart;
