# Personal Finance Dashboard

Aplicación web de gestión y control de gastos personales desarrollada con React y Vite. Permite registrar, visualizar, eliminar y filtrar gastos por categorías, calcular totales y consultar indicadores financieros.

> Proyecto académico — **Desarrollo de Aplicaciones Web**, Universidad Continental.
> Producto Académico N.º 5 · Prueba de desarrollo (Consolidado 2, Subcomponente 2). Enunciado: [`docs/Consolidado02_SC2.pdf`](docs/Consolidado02_SC2.pdf).

---

## 1. Descripción

**Personal Finance** es un dashboard de una sola página para registrar gastos en soles peruanos (PEN). Cada gasto tiene nombre, monto, categoría (`comida`, `transporte`, `ocio`, `otros`) y fecha. Los datos se guardan en el navegador mediante `localStorage`, por lo que la aplicación funciona sin backend, sin base de datos y sin servicios externos.

## 2. Objetivo

Desarrollar una aplicación de control de gastos con React y Vite que **separe la interfaz de usuario de la lógica de negocio**, implementando los cálculos y operaciones en funciones independientes de JavaScript puro, validadas con **exactamente tres pruebas unitarias en Jest**.

## 3. Características

Funcionalidades obligatorias del enunciado:

| # | Funcionalidad | Dónde se implementa |
|---|---|---|
| 1 | Agregar un gasto (nombre, monto, categoría) | `ExpenseForm.jsx` → `addExpense()` |
| 2 | Mostrar la lista de gastos registrados | `ExpenseList.jsx` / `ExpenseItem.jsx` |
| 3 | Eliminar un gasto | `ExpenseItem.jsx` + `ConfirmDialog.jsx` → `removeExpense()` |
| 4 | Filtrar gastos por categoría | `ExpenseFilter.jsx` → `filterExpensesByCategory()` |
| 5 | Mostrar el total acumulado | `SummaryCard.jsx` → `calculateTotal()` |

Funcionalidades complementarias:

- Indicadores derivados de los gastos: número de transacciones, gasto promedio y categoría con mayor gasto.
- Distribución del gasto por categoría (barra segmentada + detalle con porcentajes) que resalta la categoría filtrada.
- Validación del formulario con mensajes por campo (nombre obligatorio, monto numérico mayor que cero, categoría y fecha válidas).
- Confirmación antes de eliminar y notificaciones de éxito.
- Persistencia en `localStorage` con clave versionada y tolerancia a datos ausentes, JSON inválido o almacenamiento no disponible.
- Sección **Configuración** para ver el estado del almacenamiento y eliminar todos los datos.
- Moneda en soles con `Intl.NumberFormat('es-PE', { currency: 'PEN' })` y cálculos en céntimos para evitar errores de coma flotante.
- Diseño responsive (1440 px, 1024 px, 768 px y 375 px) con menú lateral desplegable en móviles.

## 4. Tecnologías

| Tecnología | Uso |
|---|---|
| React 19 | Interfaz con componentes funcionales y hooks (`useState`, `useEffect`, `useMemo`, `useRef`) |
| Vite 8 | Servidor de desarrollo y compilación de producción |
| JavaScript ES6+ | Lógica de negocio en funciones puras |
| CSS Modules | Estilos por componente + variables de diseño globales |
| Lucide React | Iconos |
| Jest 30 + babel-jest | Pruebas unitarias de la lógica |
| Netlify | Despliegue (configurado en `netlify.toml`) |

No se usa TypeScript, Next.js, Redux, backend ni APIs externas. El gráfico se implementó con HTML/CSS propio para no añadir una librería de gráficos.

## 5. Arquitectura

```
┌──────────────────────────────┐
│  UI (React)                  │  components/, pages/
│  muestra datos y eventos     │
└──────────────┬───────────────┘
               │ invoca
┌──────────────▼───────────────┐
│  Estado (useState)           │  hooks/useExpenses.js
└──────┬───────────────┬───────┘
       │               │
┌──────▼──────────┐ ┌──▼──────────────────┐
│ Lógica (JS puro)│ │ Persistencia        │
│ utils/          │ │ services/           │
│ expenseUtils.js │ │ expenseStorage.js   │
│ validators.js   │ │ (localStorage)      │
└──────▲──────────┘ └─────────────────────┘
       │ valida
┌──────┴──────────┐
│ Tests (Jest)    │  tests/expenseUtils.test.js
└─────────────────┘
```

- **`src/utils/expenseUtils.js`**: `addExpense`, `removeExpense`, `calculateTotal`, `filterExpensesByCategory`, `calculateCategoryTotals`, `calculateAverageExpense`, `getTopExpenseCategory`, entre otras. No importa React, no usa hooks, no accede al DOM y nunca muta los arreglos recibidos.
- **`src/hooks/useExpenses.js`**: guarda la lista y el filtro con `useState`, sincroniza con `localStorage` y expone los valores derivados calculados con las funciones de lógica.
- **Componentes React**: solo presentan información y reciben interacciones; no contienen cálculos de negocio.

## 6. Estructura de carpetas

```
personal-finance-dashboard/
├── public/
│   └── favicon.svg
├── docs/
│   ├── Consolidado02_SC2.pdf          # Enunciado oficial
│   └── informe/
│       └── Informe_Personal_Finance_Dashboard.docx
├── src/
│   ├── components/
│   │   ├── layout/        Sidebar, Header, MainLayout
│   │   ├── dashboard/     SummaryCard, ExpenseChart, CategoryBreakdown
│   │   ├── expenses/      ExpenseForm, ExpenseList, ExpenseItem, ExpenseFilter
│   │   └── common/        Panel, CategoryBadge, EmptyState, ConfirmDialog, Toast
│   ├── constants/         categories.js, navigation.js
│   ├── hooks/             useExpenses.js, useActiveSection.js
│   ├── pages/             Dashboard.jsx
│   ├── services/          expenseStorage.js
│   ├── styles/            variables.css, global.css
│   ├── tests/             expenseUtils.test.js
│   ├── utils/             expenseUtils.js, validators.js, formatCurrency.js, dateUtils.js
│   ├── App.jsx
│   └── main.jsx
├── babel.config.cjs       # Babel solo para Jest
├── jest.config.cjs
├── netlify.toml
├── vite.config.js
├── index.html
└── package.json
```

Cada componente tiene su hoja de estilos `*.module.css` junto al archivo `.jsx`.

## 7. Instalación

Requisitos: **Node.js 22.12 o superior** y npm.

```bash
git clone <URL-del-repositorio>
cd personal-finance-dashboard
npm install
```

## 8. Ejecución local

```bash
npm run dev
```

Abre la URL que muestra la terminal (por defecto `http://localhost:5173`).

## 9. Ejecución de pruebas

```bash
npm test
```

El proyecto contiene **exactamente tres pruebas unitarias** sobre la lógica de negocio (`src/tests/expenseUtils.test.js`):

1. Agregar un gasto correctamente a la lista (`addExpense`).
2. Eliminar un gasto de la lista (`removeExpense`).
3. Calcular correctamente el total de gastos (`calculateTotal`).

Resultado esperado (`verbose` está activado en `jest.config.cjs`):

```
PASS src/tests/expenseUtils.test.js
  Lógica de negocio de gastos (expenseUtils)
    √ agrega un gasto correctamente a la lista
    √ elimina un gasto de la lista
    √ calcula correctamente el total de gastos

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
```

## 10. Compilación de producción

```bash
npm run build     # genera la carpeta dist/
npm run preview   # sirve dist/ localmente para revisarla
```

## 11. Despliegue en Netlify

El repositorio ya incluye `netlify.toml` (comando de build, carpeta de publicación, versión de Node, fallback SPA y cabeceras de seguridad). No se necesitan variables de entorno ni servicios externos.

1. Crea una cuenta gratuita en [netlify.com](https://www.netlify.com/) (puedes registrarte con GitHub).
2. En el panel, elige **Add new site → Import an existing project** y conecta tu cuenta de **GitHub**.
3. Selecciona el repositorio **personal-finance-dashboard**.
4. Verifica que **Build command** sea `npm run build`.
5. Verifica que **Publish directory** sea `dist`.
6. Pulsa **Deploy** y espera a que termine la compilación.
7. Abre la URL asignada (`https://<nombre>.netlify.app`) y comprueba que puedes agregar, filtrar y eliminar gastos, y que los datos se conservan al recargar.

Cada `git push` a la rama principal generará un nuevo despliegue automáticamente.

**Sitio publicado:** _[pendiente — agregar la URL tras el despliegue]_

## 12. Capturas de pantalla

> Agrega aquí las capturas reales de la aplicación (por ejemplo, en `docs/capturas/`) y reemplaza cada fila por la imagen correspondiente.

| Vista | Captura |
|---|---|
| Dashboard en escritorio | _pendiente_ |
| Registro de un gasto (con validaciones) | _pendiente_ |
| Lista filtrada por categoría | _pendiente_ |
| Confirmación de eliminación | _pendiente_ |
| Vista móvil (375 px) | _pendiente_ |
| Resultado de `npm test` | _pendiente_ |

<!-- Ejemplo: ![Dashboard en escritorio](docs/capturas/dashboard-escritorio.png) -->

## 13. Informe académico

El informe del proyecto se encuentra en [`docs/informe/Informe_Personal_Finance_Dashboard.docx`](docs/informe/Informe_Personal_Finance_Dashboard.docx). Sigue el orden del enunciado (portada, descripción, objetivos, funcionamiento, pruebas unitarias y conclusiones) y tiene espacios reservados para las capturas de pantalla.

## 14. Autor

**Ezer Benito Zuñiga Chura** — Desarrollo de Aplicaciones Web, Universidad Continental.

Licencia: [MIT](LICENSE).
