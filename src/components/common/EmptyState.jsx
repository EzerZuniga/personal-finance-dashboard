import { Inbox } from 'lucide-react';
import styles from './EmptyState.module.css';

function EmptyState({ icon: Icon = Inbox, title, description, children }) {
  return (
    <div className={styles.emptyState}>
      <span className={styles.icon} aria-hidden="true">
        <Icon size={22} />
      </span>
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </div>
  );
}

export default EmptyState;
