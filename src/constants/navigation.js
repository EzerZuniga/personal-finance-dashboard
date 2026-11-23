/**
 * Secciones navegables del dashboard. Cada `id` corresponde al atributo `id`
 * de una sección real de la página, por lo que todas las opciones del menú
 * llevan a contenido existente.
 */
export const NAV_SECTIONS = Object.freeze([
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'transacciones', label: 'Transacciones' },
  { id: 'categorias', label: 'Categorías' },
  { id: 'configuracion', label: 'Configuración' },
]);

export const NAV_SECTION_IDS = Object.freeze(NAV_SECTIONS.map((section) => section.id));
