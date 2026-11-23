import { useState } from 'react';
import { CalendarDays, Menu, Plus } from 'lucide-react';
import { formatLongDate } from '../../utils/dateUtils.js';
import styles from './Header.module.css';

function Header({ title, isMenuOpen, onMenuClick, onNewExpenseClick }) {
  const [todayLabel] = useState(() => formatLongDate());

  return (
    <header className={styles.header}>
      <button
        type="button"
        className={styles.menuButton}
        onClick={onMenuClick}
        aria-label="Abrir menú"
        aria-controls="app-sidebar"
        aria-expanded={isMenuOpen}
      >
        <Menu size={22} />
      </button>

      <div className={styles.titleGroup}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.date}>
          <CalendarDays size={14} aria-hidden="true" />
          <span>{todayLabel}</span>
        </p>
      </div>

      <button type="button" className={styles.primaryAction} onClick={onNewExpenseClick}>
        <Plus size={18} aria-hidden="true" />
        <span className={styles.actionLabel}>Nuevo gasto</span>
      </button>
    </header>
  );
}

export default Header;
