// Se importa el módulo 'pg' para interactuar con PostgreSQL.
const { Pool } = require('pg');

const pool = new Pool();

// Exporta un objeto con un método 'query' que utiliza el pool de conexiones.
// Esto permite ejecutar consultas a la base de datos desde otras partes de la aplicación.
module.exports = {
  query: (text, params) => pool.query(text, params),
};