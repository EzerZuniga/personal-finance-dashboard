import { useEffect, useState } from 'react';

/** Distancia (px) desde el borde superior que marca la sección activa: justo bajo el header. */
const ACTIVATION_OFFSET = 120;

/**
 * Detecta qué sección de la página está visible para resaltarla en la navegación.
 * La sección activa es la última cuyo inicio ya pasó la línea de activación;
 * al llegar al final de la página se activa la última sección.
 *
 * @param {string[]} sectionIds Identificadores de las secciones, en orden.
 * @returns {[string, (id: string) => void]} Sección activa y función para fijarla.
 */
export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    let frameId = null;

    function updateActiveSection() {
      frameId = null;
      const { scrollY, innerHeight } = window;
      // `scrollY > 0` evita marcar la última sección cuando la página cabe entera en pantalla.
      const isAtBottom =
        scrollY > 0 && scrollY + innerHeight >= document.documentElement.scrollHeight - 2;

      if (isAtBottom) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      const current = sectionIds.reduce((selected, id) => {
        const section = document.getElementById(id);
        return section && section.getBoundingClientRect().top <= ACTIVATION_OFFSET ? id : selected;
      }, sectionIds[0]);

      setActiveSection(current);
    }

    function handleScroll() {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateActiveSection);
      }
    }

    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [sectionIds]);

  return [activeSection, setActiveSection];
}
