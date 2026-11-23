import { useCallback, useRef, useState } from 'react';
import { Calculator, ChartPie, Database, HardDrive, Hash, Trash2, Trophy, Wallet } from 'lucide-react';
import { ALL_CATEGORIES, getCategoryById } from '../constants/categories.js';
import { NAV_SECTION_IDS, NAV_SECTIONS } from '../constants/navigation.js';
import { useActiveSection } from '../hooks/useActiveSection.js';
import { useExpenses } from '../hooks/useExpenses.js';
import { isStorageAvailable } from '../services/expenseStorage.js';
import { formatCurrency } from '../utils/formatCurrency.js';
import ConfirmDialog from '../components/common/ConfirmDialog.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import Panel from '../components/common/Panel.jsx';
import Toast from '../components/common/Toast.jsx';
import CategoryBreakdown from '../components/dashboard/CategoryBreakdown.jsx';
import ExpenseChart from '../components/dashboard/ExpenseChart.jsx';
import SummaryCard from '../components/dashboard/SummaryCard.jsx';
import ExpenseFilter from '../components/expenses/ExpenseFilter.jsx';
import ExpenseForm from '../components/expenses/ExpenseForm.jsx';
import ExpenseList from '../components/expenses/ExpenseList.jsx';
import MainLayout from '../components/layout/MainLayout.jsx';
import styles from './Dashboard.module.css';

function Dashboard() {
  const {
    expenses,
    filteredExpenses,
    filteredTotal,
    selectedCategory,
    setSelectedCategory,
    summary,
    addNewExpense,
    deleteExpense,
    deleteAllExpenses,
  } = useExpenses();

  const [activeSection, setActiveSection] = useActiveSection(NAV_SECTION_IDS);
  const [toast, setToast] = useState(null);
  const [pendingDeletion, setPendingDeletion] = useState(null);
  const [storageAvailable] = useState(isStorageAvailable);
  const nameInputRef = useRef(null);

  const isFiltered = selectedCategory !== ALL_CATEGORIES;
  const selectedCategoryLabel = getCategoryById(selectedCategory)?.label;
  const topCategoryLabel = summary.topCategory
    ? getCategoryById(summary.topCategory.category).label
    : 'Sin datos';
  const sectionTitle =
    NAV_SECTIONS.find((section) => section.id === activeSection)?.label ?? NAV_SECTIONS[0].label;

  const closeToast = useCallback(() => setToast(null), []);
  const cancelDeletion = useCallback(() => setPendingDeletion(null), []);

  function showToast(message) {
    setToast({ message, key: Date.now() });
  }

  function handleAddExpense(expenseData) {
    const expense = addNewExpense(expenseData);
    showToast(`Gasto "${expense.name}" registrado por ${formatCurrency(expense.amount)}.`);
  }

  function handleConfirmDeletion() {
    if (pendingDeletion?.type === 'single') {
      deleteExpense(pendingDeletion.expense.id);
      showToast(`Gasto "${pendingDeletion.expense.name}" eliminado.`);
    } else if (pendingDeletion?.type === 'all') {
      deleteAllExpenses();
      setSelectedCategory(ALL_CATEGORIES);
      showToast('Se eliminaron todos los gastos.');
    }
    setPendingDeletion(null);
  }

  function handleNewExpenseClick() {
    const input = nameInputRef.current;
    if (!input) {
      return;
    }
    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    input.focus({ preventScroll: true });
  }

  const dialogContent =
    pendingDeletion?.type === 'all'
      ? {
          title: '¿Eliminar todos los gastos?',
          message: `Se borrarán ${summary.count} registros guardados en este navegador. Esta acción no se puede deshacer.`,
          confirmLabel: 'Eliminar todo',
        }
      : {
          title: '¿Eliminar este gasto?',
          message: pendingDeletion
            ? `"${pendingDeletion.expense.name}" por ${formatCurrency(pendingDeletion.expense.amount)} se quitará de la lista.`
            : '',
          confirmLabel: 'Eliminar',
        };

  return (
    <MainLayout
      title={sectionTitle}
      activeSection={activeSection}
      onNavigate={setActiveSection}
      onNewExpenseClick={handleNewExpenseClick}
    >
      <div className={styles.page}>
        {/* A. Resumen financiero */}
        <section id="dashboard" aria-labelledby="summary-title">
          <h2 id="summary-title" className="visually-hidden">
            Resumen financiero
          </h2>
          <div className={styles.summaryGrid}>
            <SummaryCard
              icon={Wallet}
              label="Total de gastos"
              value={formatCurrency(summary.total)}
              hint="Acumulado de todos los registros"
              highlighted
            />
            <SummaryCard
              icon={Hash}
              label="Transacciones"
              value={summary.count}
              hint="Gastos registrados"
            />
            <SummaryCard
              icon={Calculator}
              label="Gasto promedio"
              value={formatCurrency(summary.average)}
              hint="Por transacción"
            />
            <SummaryCard
              icon={Trophy}
              label="Mayor categoría"
              value={topCategoryLabel}
              hint={
                summary.topCategory
                  ? `${formatCurrency(summary.topCategory.total)} acumulados`
                  : 'Registra un gasto para calcularla'
              }
            />
          </div>
        </section>

        {/* B. Registro y distribución */}
        <div className={styles.twoColumns}>
          <Panel title="Registrar gasto" description="Todos los campos son obligatorios.">
            <ExpenseForm onAddExpense={handleAddExpense} nameInputRef={nameInputRef} />
          </Panel>

          <Panel
            id="categorias"
            title="Gastos por categoría"
            description={
              isFiltered
                ? `Resaltando ${selectedCategoryLabel} según el filtro activo.`
                : 'Distribución del total acumulado.'
            }
          >
            {summary.count === 0 ? (
              <EmptyState
                icon={ChartPie}
                title="Aún no hay datos para graficar"
                description="La distribución aparecerá al registrar tu primer gasto."
              />
            ) : (
              <>
                <ExpenseChart
                  distribution={summary.distribution}
                  selectedCategory={selectedCategory}
                  showAll={!isFiltered}
                />
                <CategoryBreakdown
                  distribution={summary.distribution}
                  selectedCategory={selectedCategory}
                  showAll={!isFiltered}
                />
              </>
            )}
          </Panel>
        </div>

        {/* C. Historial de transacciones con filtros */}
        <Panel
          id="transacciones"
          title="Historial de transacciones"
          description="Ordenado por fecha, del más reciente al más antiguo."
        >
          <div className={styles.toolbar}>
            <ExpenseFilter selectedCategory={selectedCategory} onChange={setSelectedCategory} />
            <p className={styles.filteredTotal} aria-live="polite">
              <span>
                {isFiltered ? `Total en ${selectedCategoryLabel}` : 'Total acumulado'} ·{' '}
                {filteredExpenses.length} {filteredExpenses.length === 1 ? 'gasto' : 'gastos'}
              </span>
              <strong className="tabular">{formatCurrency(filteredTotal)}</strong>
            </p>
          </div>

          <ExpenseList
            expenses={filteredExpenses}
            onDelete={(expense) => setPendingDeletion({ type: 'single', expense })}
            emptyTitle={
              isFiltered ? `No hay gastos en ${selectedCategoryLabel}` : 'Todavía no hay gastos'
            }
            emptyDescription={
              isFiltered
                ? 'Prueba con otra categoría o registra un gasto nuevo.'
                : 'Usa el formulario "Registrar gasto" para añadir el primero.'
            }
          />
        </Panel>

        {/* D. Configuración */}
        <Panel
          id="configuracion"
          title="Configuración"
          description="Gestión de los datos guardados en este navegador."
        >
          <div className={styles.settings}>
            <div className={styles.settingInfo}>
              <span className={styles.settingIcon} aria-hidden="true">
                {storageAvailable ? <HardDrive size={18} /> : <Database size={18} />}
              </span>
              <div>
                <p className={styles.settingTitle}>Almacenamiento local</p>
                <p className={styles.settingText}>
                  {storageAvailable
                    ? `Activo · ${summary.count} ${summary.count === 1 ? 'registro guardado' : 'registros guardados'} en localStorage.`
                    : 'No disponible: los gastos se perderán al cerrar la página.'}
                </p>
              </div>
            </div>
            <button
              type="button"
              className={styles.dangerButton}
              onClick={() => setPendingDeletion({ type: 'all' })}
              disabled={expenses.length === 0}
            >
              <Trash2 size={16} aria-hidden="true" />
              Eliminar todos los gastos
            </button>
          </div>
        </Panel>
      </div>

      <ConfirmDialog
        isOpen={pendingDeletion !== null}
        title={dialogContent.title}
        message={dialogContent.message}
        confirmLabel={dialogContent.confirmLabel}
        onConfirm={handleConfirmDeletion}
        onCancel={cancelDeletion}
      />
      <Toast toast={toast} onClose={closeToast} />
    </MainLayout>
  );
}

export default Dashboard;
