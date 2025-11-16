# API de Clima y Feriados (FastAPI)

Este directorio contiene el backend de Python (FastAPI) que expone datos de clima y feriados consumidos desde una base de datos MongoDB (MongoDB Atlas). No se llaman APIs externas en tiempo de ejecución; los datos se cargan desde archivos de seed locales.

## Tech Stack

- Python 3.10+
- FastAPI
- Uvicorn
- PyMongo (MongoDB)

---

## Ejecución con Docker Compose (recomendada)

El servicio `fastapi` está integrado en el `docker-compose.yml` de la raíz.

1. Desde la raíz del repositorio:
   ```bash
   docker compose up --build
   ```
2. La API quedará disponible en `http://localhost:8000`.

---

## Ejecución local

1. Crear y activar entorno virtual (opcional):
   ```bash
   python -m venv venv
   # Windows
   .\venv\Scripts\activate
   # Mac/Linux
   # source venv/bin/activate
   ```
2. Instalar dependencias:
   ```bash
   pip install -r requirements.txt
   ```
3. Configurar la cadena de conexión de MongoDB Atlas:
   - Define la variable de entorno `MONGODB_URI` con tu URI de MongoDB Atlas.
   - Si no defines `MONGODB_URI`, la API usará una cadena de conexión por defecto embebida en `main.py`.
   - En el entorno Docker, `docker-compose.yml` ya define un valor de ejemplo para `MONGODB_URI`.
4. Ejecutar el servidor:
   ```bash
   uvicorn main:app --reload
   ```
   Servirá en `http://127.0.0.1:8000`.

En el evento de `startup` la API sembrará automáticamente datos de `weather-seed.json` y `holidays-seed.json` si las colecciones están vacías o incompletas.

---

## API Endpoints

La documentación interactiva (Swagger) está en `http://localhost:8000/docs`.

### 1. GET /weather

Obtiene el clima cacheado para una ciudad.

- **URL:** `GET /weather`
- **Query param:** `city` (string, requerido)
- **Ejemplo:** `GET http://localhost:8000/weather?city=Coquimbo`
- **Ejemplo de respuesta (200 OK):**
  ```json
  {
    "coordenadas": {
      "name": "Coquimbo",
      "country_code": "CL",
      "latitude": -29.95,
      "longitude": -71.34
    },
    "clima": {
      "current": {
        "temperature_2m": 16.4,
        "wind_speed_10m": 5.1
      }
    }
  }
  ```

### 2. GET /holidays/{countryCode}/{year}

Obtiene los feriados para un país y año.

- **URL:** `GET /holidays/{countryCode}/{year}`
- **Ejemplo:** `GET http://localhost:8000/holidays/CL/2025`
- **Ejemplo de respuesta (200 OK):**
  ```json
  [
    { "date": "2025-01-01", "localName": "Año Nuevo", "name": "Año Nuevo" },
    { "date": "2025-09-18", "localName": "Independencia Nacional", "name": "Independencia Nacional" }
  ]
  ```

Los nombres y fechas concretas dependen de los datos semilla definidos en `holidays-seed.json`.

