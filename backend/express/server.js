const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 4000;

// Middleware para habilitar CORS (Cross-Origin Resource Sharing)
// Esto permite que el frontend haga peticiones a esta API desde otro origen (dominio/puerto).
app.use(cors());

// Ruta para obtener todos los países
app.get('/countries', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM countries ORDER BY common_name ASC');
    // Transforma la respuesta para que coincida con el contrato esperado por el frontend
    const formattedRows = rows.map(row => ({
      name: {
        common: row.common_name,
        official: row.official_name,
      },
      flags: {
        png: row.flag_png,
        svg: row.flag_svg
      },
      region: row.region,
      capital: [row.capital],
      population: row.population,
      cca2: row.cca2,
    }));
    res.json(formattedRows);
  } catch (err) {
    console.error('Error al obtener países:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Ruta para buscar países por nombre
// Ejemplo: /countries/search?name=chile
app.get('/countries/search', async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: 'El parámetro "name" es requerido' });
  }

  try {
    // Busca coincidencias parciales e insensibles a mayúsculas/minúsculas
    const { rows } = await db.query(
      'SELECT * FROM countries WHERE common_name ILIKE $1 ORDER BY common_name ASC', 
      [`%${name}%`]
    );
     // Formatea la respuesta para que coincida con el contrato del frontend
    const formattedRows = rows.map(row => ({
      name: {
        common: row.common_name,
        official: row.official_name,
      },
      flags: {
        png: row.flag_png,
        svg: row.flag_svg
      },
      region: row.region,
      capital: [row.capital],
      population: row.population,
      cca2: row.cca2,
    }));
    res.json(formattedRows);
  } catch (err) {
    console.error('Error al buscar países:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});