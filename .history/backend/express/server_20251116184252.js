const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const db = require('./db')

const app = express()
const PORT = process.env.PORT || 4000

// CORS ultra permisivo
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '*',
  })
)

async function seedCountriesFromFile() {
  try {
    const filePath = path.join(__dirname, 'countries-seed.json')
    const raw = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(raw)

    await db.query('DELETE FROM countries')

    const insertText =
      'INSERT INTO countries (common_name, official_name, cca2, region, capital, population, flag_png, flag_svg) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)'

    for (const country of data) {
      await db.query(insertText, [
        country.common_name,
        country.official_name,
        country.cca2,
        country.region,
        country.capital,
        country.population,
        country.flag_png,
        country.flag_svg,
      ])
    }

    console.log('Seed de países completado desde archivo local')
  } catch (error) {
    console.error('Error durante el seed de países desde archivo:', error)
  }
}

async function ensureCountriesSeeded() {
  try {
    const result = await db.query('SELECT COUNT(*)::int AS count FROM countries')
    const count = result.rows[0] ? result.rows[0].count : 0

    if (count < 30) {
      console.log(
        `Se encontraron ${count} países en la base de datos. Sembrando datos desde archivo...`
      )
      await seedCountriesFromFile()
    } else {
      console.log(`La tabla countries ya tiene ${count} registros. No se realiza seed adicional.`)
    }
  } catch (error) {
    console.error('Error al verificar la tabla countries:', error)
  }
}

app.get('/countries', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM countries ORDER BY common_name ASC')
    const formattedRows = rows.map((row) => ({
      name: {
        common: row.common_name,
        official: row.official_name,
      },
      flags: {
        png: row.flag_png,
        svg: row.flag_svg,
      },
      region: row.region,
      capital: row.capital ? [row.capital] : [],
      population: row.population,
      cca2: row.cca2,
    }))
    res.json(formattedRows)
  } catch (err) {
    console.error('Error al obtener países:', err)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
})

app.get('/countries/search', async (req, res) => {
  const { name } = req.query

  if (!name) {
    return res.status(400).json({ message: 'El parámetro "name" es requerido' })
  }

  try {
    const { rows } = await db.query(
      'SELECT * FROM countries WHERE common_name ILIKE $1 ORDER BY common_name ASC',
      [`%${name}%`]
    )
    const formattedRows = rows.map((row) => ({
      name: {
        common: row.common_name,
        official: row.official_name,
      },
      flags: {
        png: row.flag_png,
        svg: row.flag_svg,
      },
      region: row.region,
      capital: row.capital ? [row.capital] : [],
      population: row.population,
      cca2: row.cca2,
    }))
    res.json(formattedRows)
  } catch (err) {
    console.error('Error al buscar países:', err)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
})

async function start() {
  await ensureCountriesSeeded()

  app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en http://localhost:${PORT}`)
  })
}

start().catch((error) => {
  console.error('Error al iniciar el servidor Express:', error)
  process.exit(1)
})
