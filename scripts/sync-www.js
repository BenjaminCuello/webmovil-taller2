const fs = require('fs')
const path = require('path')

const FRONTEND_WWW = path.resolve(__dirname, '..', 'frontend', 'www')

async function parseArgs() {
  const args = process.argv.slice(2)
  const config = { keep: false }
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '--target' && args[i + 1]) {
      config.target = path.resolve(process.cwd(), args[++i])
    } else if (arg === '--keep') {
      config.keep = true
    }
  }

  if (!config.target) {
    console.error('[sync-www] Debes especificar la ruta destino con --target <ruta/www>')
    process.exit(1)
  }

  return config
}

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true })
}

async function emptyDir(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true })
  await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        await fs.promises.rm(fullPath, { recursive: true, force: true })
      } else {
        await fs.promises.unlink(fullPath)
      }
    })
  )
}

async function copyRecursive(src, dest) {
  const entries = await fs.promises.readdir(src, { withFileTypes: true })
  await Promise.all(
    entries.map(async (entry) => {
      const srcPath = path.join(src, entry.name)
      const destPath = path.join(dest, entry.name)

      if (entry.isDirectory()) {
        await ensureDir(destPath)
        await copyRecursive(srcPath, destPath)
      } else {
        await fs.promises.copyFile(srcPath, destPath)
      }
    })
  )
}

async function main() {
  const { target, keep } = await parseArgs()

  if (!fs.existsSync(FRONTEND_WWW)) {
    console.error(`[sync-www] No se encontró la carpeta fuente: ${FRONTEND_WWW}`)
    process.exit(1)
  }

  console.log(`[sync-www] Copiando ${FRONTEND_WWW} -> ${target}`)
  await ensureDir(target)

  if (!keep) {
    console.log('[sync-www] Limpiando carpeta destino...')
    await emptyDir(target)
  } else {
    console.log('[sync-www] Manteniendo archivos existentes en destino (modo --keep)')
  }

  await copyRecursive(FRONTEND_WWW, target)
  console.log('[sync-www] Copia completada correctamente')
}

main().catch((error) => {
  console.error('[sync-www] Error inesperado:', error)
  process.exit(1)
})
