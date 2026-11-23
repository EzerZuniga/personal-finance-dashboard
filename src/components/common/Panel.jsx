import styles from './Panel.module.css';

/**
 * Contenedor de tarjeta reutilizable con encabezado opcional.
 */
function Panel({ id, title, description, actions, className = '', children }) {
  const headingId = id ? `${id}-title` : undefined;

  return (
    <section
      id={id}
      className={`${styles.panel} ${className}`}
      aria-labelledby={title ? headingId : undefined}
    >
      {title && (
        <div className={styles.header}>
          <div>
            <h2 id={headingId} className={styles.title}>
              {title}
            </h2>
            {description && <p className={styles.description}>{description}</p>}
          </div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

export default Panel;
