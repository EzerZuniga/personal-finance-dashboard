import { useEffect } from 'react';
import { CircleCheck, X } from 'lucide-react';
import styles from './Toast.module.css';

const TOAST_DURATION_MS = 3000;

/**
 * Notificación breve que se cierra automáticamente.
 * El contenedor siempre está en el DOM para que los lectores de pantalla
 * anuncien los mensajes nuevos (región aria-live).
 */
function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) {
      return undefined;
    }
    const timerId = window.setTimeout(onClose, TOAST_DURATION_MS);
    return () => window.clearTimeout(timerId);
  }, [toast, onClose]);

  return (
    <div className={styles.region} role="status" aria-live="polite">
      {toast && (
        <div className={styles.toast}>
          <CircleCheck size={18} className={styles.icon} aria-hidden="true" />
          <p className={styles.message}>{toast.message}</p>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Cerrar notificación"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Toast;
