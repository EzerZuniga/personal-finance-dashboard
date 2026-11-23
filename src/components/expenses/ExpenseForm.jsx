import { useState } from 'react';
import { Plus } from 'lucide-react';
import { CATEGORIES } from '../../constants/categories.js';
import { toISODate } from '../../utils/dateUtils.js';
import { NAME_MAX_LENGTH, validateExpenseInput } from '../../utils/validators.js';
import styles from './ExpenseForm.module.css';

function getInitialValues() {
  return {
    name: '',
    amount: '',
    category: CATEGORIES[0].id,
    date: toISODate(),
  };
}

/**
 * Formulario de registro de gastos. Gestiona el estado de los campos con useState
 * y delega la validación en `validateExpenseInput`.
 */
function ExpenseForm({ onAddExpense, nameInputRef }) {
  const [values, setValues] = useState(getInitialValues);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
    if (errors[name]) {
      setErrors(({ [name]: _removed, ...remainingErrors }) => remainingErrors);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateExpenseInput(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onAddExpense(values);
    setValues(getInitialValues());
    setErrors({});
    nameInputRef?.current?.focus();
  }

  function getFieldProps(fieldName) {
    const hasError = Boolean(errors[fieldName]);
    return {
      id: `expense-${fieldName}`,
      name: fieldName,
      value: values[fieldName],
      onChange: handleChange,
      className: `${styles.control} ${hasError ? styles.invalid : ''}`,
      'aria-invalid': hasError,
      'aria-describedby': hasError ? `expense-${fieldName}-error` : undefined,
    };
  }

  function renderError(fieldName) {
    return errors[fieldName] ? (
      <p id={`expense-${fieldName}-error`} className={styles.error} role="alert">
        {errors[fieldName]}
      </p>
    ) : null;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="expense-name" className={styles.label}>
          Nombre del gasto
        </label>
        <input
          {...getFieldProps('name')}
          ref={nameInputRef}
          type="text"
          placeholder="Ej. Almuerzo en el centro"
          maxLength={NAME_MAX_LENGTH}
          autoComplete="off"
        />
        {renderError('name')}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="expense-amount" className={styles.label}>
            Monto (S/)
          </label>
          <input
            {...getFieldProps('amount')}
            type="number"
            inputMode="decimal"
            min="0.01"
            step="0.01"
            placeholder="0.00"
          />
          {renderError('amount')}
        </div>

        <div className={styles.field}>
          <label htmlFor="expense-date" className={styles.label}>
            Fecha
          </label>
          <input {...getFieldProps('date')} type="date" />
          {renderError('date')}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="expense-category" className={styles.label}>
          Categoría
        </label>
        <select {...getFieldProps('category')}>
          {CATEGORIES.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
        {renderError('category')}
      </div>

      <button type="submit" className={styles.submitButton}>
        <Plus size={18} aria-hidden="true" />
        Registrar gasto
      </button>
    </form>
  );
}

export default ExpenseForm;
