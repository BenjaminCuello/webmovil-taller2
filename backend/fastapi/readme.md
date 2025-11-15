# API de Clima y Feriados (FastAPI)

Este directorio contiene el backend de Python (FastAPI) para el Taller 2 de Web Móvil.

Provee dos endpoints para consultar datos de clima (simulados) y feriados, consumiendo una base de datos de MongoDB.

## 🛠️ Tech Stack

* Python 3.10+
* FastAPI
* Uvicorn
* PyMongo (MongoDB)

---

## 🚀 Comandos para Ejecutar

### 1. Preparar Entorno
Asegúrate de estar en esta carpeta (`backend/fastapi`).

```bash
# 1. Crear el entorno virtual (si no existe)
python -m venv venv

# 2. Activar el entorno
# Windows
.\venv\Scripts\activate
# Mac/Linux
# source venv/bin/activate

# 3. Instalar dependencias
pip install -r requirements.txt
```

### 2. Configurar Variables
Este proyecto requiere una `CONNECTION_STRING` de MongoDB Atlas. Debes pegarla en la variable `CONNECTION_STRING` dentro de `main.py`.

### 3. Ejecutar el Servidor

```bash
uvicorn main:app --reload
```
El servidor estará disponible en `http://127.0.0.1:8000`.

---

## 📚 API Endpoints

La documentación interactiva completa (Swagger) está en `http://127.0.0.1:8000/docs`.

### 1. GET /weather

Obtiene el clima cacheado para una ciudad.

* **URL:** `GET /weather`
* **Query Param:** `city` (string, requerido)
* **Ejemplo:** `GET http://127.0.0.1:8000/weather?city=La%20Serena`
* **Ejemplo JSON de Respuesta (200 OK):**
    ```json
    {
      "ciudad": "La Serena",
      "latitud": -29.9045,
      "longitud": -71.2489,
      "temperatura": 17.8,
      "viento": 14.2
    }
    ```

### 2. GET /holidays

Obtiene los feriados para un país y año.

* **URL:** `GET /holidays/{countryCode}/{year}`
* **Ejemplo:** `GET http://127.0.0.1:8000/holidays/CL/2025`
* **Ejemplo JSON de Respuesta (200 OK):**
    ```json
    {
      "pais": "CL",
      "año": 2025,
      "feriados": [
        {
          "fecha": "2025-01-01",
          "nombre": "Año Nuevo"
        },
        {
          "fecha": "2025-09-18",
          "nombre": "Independencia Nacional"
        },
        {
          "fecha": "2025-12-25",
          "nombre": "Navidad"
        }
      ]
    }
    ```