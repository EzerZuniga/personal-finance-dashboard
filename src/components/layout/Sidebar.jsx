import { ChartPie, LayoutDashboard, ReceiptText, Settings, Wallet, X } from 'lucide-react';
import { NAV_SECTIONS } from '../../constants/navigation.js';
import styles from './Sidebar.module.css';

const NAV_ICONS = {
  dashboard: LayoutDashboard,
  transacciones: ReceiptText,
  categorias: ChartPie,
  configuracion: Settings,
};

function Sidebar({ isOpen, activeSection, onNavigate, onClose }) {
  return (
    <aside
      id="app-sidebar"
      className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
      aria-label="Navegación principal"
    >
      <div className={styles.brand}>
        <span className={styles.logo} aria-hidden="true">
          <Wallet size={20} strokeWidth={2.2} />
        </span>
        <span className={styles.brandName}>
          Personal <strong>Finance</strong>
        </span>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Cerrar menú"
        >
          <X size={20} />
        </button>
      </div>

      <nav>
        <p className={styles.navTitle}>Menú</p>
        <ul className={styles.navList}>
          {NAV_SECTIONS.map(({ id, label }) => {
            const Icon = NAV_ICONS[id];
            const isActive = id === activeSection;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={() => onNavigate(id)}
                >
                  <Icon size={18} aria-hidden="true" />
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <p className={styles.footer}>
        Datos guardados solo en este navegador.
      </p>
    </aside>
  );
}

export default Sidebar;
