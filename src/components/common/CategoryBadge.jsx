import { Bus, Gamepad2, Package, Utensils } from 'lucide-react';
import { getCategoryById } from '../../constants/categories.js';
import styles from './CategoryBadge.module.css';

const CATEGORY_ICONS = {
  comida: Utensils,
  transporte: Bus,
  ocio: Gamepad2,
  otros: Package,
};

/**
 * Icono de una categoría dentro de un contenedor con su color.
 */
export function CategoryIcon({ categoryId, size = 'md' }) {
  const category = getCategoryById(categoryId);
  const Icon = CATEGORY_ICONS[categoryId] ?? Package;

  return (
    <span
      className={`${styles.icon} ${styles[size]}`}
      style={{ '--category-color': category?.color }}
      aria-hidden="true"
    >
      <Icon size={size === 'sm' ? 14 : 18} />
    </span>
  );
}

/**
 * Etiqueta textual de categoría con punto de color (el color nunca va solo).
 */
function CategoryBadge({ categoryId }) {
  const category = getCategoryById(categoryId);

  return (
    <span className={styles.badge} style={{ '--category-color': category?.color }}>
      <span className={styles.dot} aria-hidden="true" />
      {category?.label ?? categoryId}
    </span>
  );
}

export default CategoryBadge;
