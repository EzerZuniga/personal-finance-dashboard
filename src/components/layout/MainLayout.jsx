import { useEffect, useState } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import styles from './MainLayout.module.css';

function MainLayout({ title, activeSection, onNavigate, onNewExpenseClick, children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Permite cerrar el menú móvil con la tecla Escape.
  useEffect(() => {
    if (!isSidebarOpen) {
      return undefined;
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSidebarOpen]);

  function handleNavigate(sectionId) {
    onNavigate(sectionId);
    setIsSidebarOpen(false);
  }

  function handleNewExpenseClick() {
    setIsSidebarOpen(false);
    onNewExpenseClick();
  }

  return (
    <div className={styles.layout}>
      <Sidebar
        isOpen={isSidebarOpen}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onClose={() => setIsSidebarOpen(false)}
      />

      {isSidebarOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className={styles.content}>
        <Header
          title={title}
          isMenuOpen={isSidebarOpen}
          onMenuClick={() => setIsSidebarOpen(true)}
          onNewExpenseClick={handleNewExpenseClick}
        />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;
