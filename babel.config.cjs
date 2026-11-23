// Babel solo se utiliza para que Jest entienda la sintaxis de módulos ES.
// Vite compila la aplicación con su propio pipeline y no usa este archivo.
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
};
