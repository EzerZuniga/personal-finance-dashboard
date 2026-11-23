import styles from './SummaryCard.module.css';

/**
 * Tarjeta de indicador. Recibe valores ya calculados y formateados.
 */
function SummaryCard({ icon: Icon, label, value, hint, highlighted = false }) {
  return (
    <article className={`${styles.card} ${highlighted ? styles.highlighted : ''}`}>
      <div className={styles.top}>
        <p className={styles.label}>{label}</p>
        <span className={styles.icon} aria-hidden="true">
          <Icon size={18} />
        </span>
      </div>
      <p className={`${styles.value} tabular`}>{value}</p>
      {hint && <p className={styles.hint}>{hint}</p>}
    </article>
  );
}

export default SummaryCard;
