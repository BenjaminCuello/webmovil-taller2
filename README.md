# Taller 2 - Introducción al Desarrollo Web Móvil  

---

## Grupo 1 — Equipo: SmartCoders

### Integrantes
- Bastian Salinas — 21.848.994-K  
- Benjamín Cuello — 21.682.135-1  
- Benjamín Salas — 21.758.667-4  
- Tomás Guerra — 21.664.344-5  

---

##  Descripción General

InfoMóvil ahora integra un ecosistema con **3 servicios backend propios** y un **frontend móvil empaquetado como aplicación Android (APK)** usando **Apache Cordova**.  

La app mantiene las mismas funcionalidades del Taller 1 (Pokémon, países, clima y feriados), pero ahora **todos los datos provienen de nuestras propias APIs y bases de datos**.

---

##  Objetivos del Proyecto
- Desarrollar **3 APIs independientes**, cada una en una tecnología distinta.  
- Crear un **frontend móvil responsivo** que consuma dichas APIs.  
- **Empaquetar la app como APK Android** funcional.  
- Mantener el mismo diseño, navegación y estructura modular del Taller 1.  

---

## 🧩 Arquitectura del Sistema
```text
┌────────────────────────┐
│ Frontend (Cordova App) │  ← HTML + JS + Tailwind
└───────────┬────────────┘
            │
   ┌────────┼─────────┐
   │        │         │
┌───────┐ ┌───────┐ ┌──────────┐
│NestJS │ │Express│ │ FastAPI  │
│/pokemon││/countries││/weather+holidays│
└───────┘ └───────┘ └──────────┘
   │         │         │
 PostgreSQL  PostgreSQL MongoDB
```

---

## APIs a usar: 

### API 1 — Pokémon (NestJS + PostgreSQL)
- **Endpoints**
  - `GET /pokemon?limit&offset` → lista de pokemones  
  - `GET /pokemon/:nombreOId` → detalle de un pokemon  
- **Datos almacenados:** id, nombre, sprites, tipos, altura, peso, estadísticas.  
- **Puerto:** `http://localhost:3000`  

---

### API 2 — Países (Express + PostgreSQL)
- **Endpoints**
  - `GET /countries` → lista de todos los países  
  - `GET /countries/search?name=Chile` → búsqueda por nombre  
- **Datos:** nombre común, oficial, bandera, región, capital, población, código ISO.  
- **Puerto:** `http://localhost:4000`  

---

###  API 3 — Clima y Feriados (FastAPI + MongoDB)
- **Endpoints**
  - `GET /weather?city=La%20Serena` → devuelve temperatura y viento actuales  
  - `GET /holidays/{countryCode}/{year}` → devuelve feriados del país y año indicado  
- **Datos:**  
  - Clima → nombre, latitud, longitud, temperatura, viento.  
  - Feriados → fecha, nombre local y nombre oficial.  
- **Puerto:** `http://localhost:8000`  

---

##  Frontend (Cordova + HTML + JS + Tailwind)
- Mantiene el mismo diseño y estructura del Taller 1.  
- Adaptado para consumir nuestras 3 APIs locales.  
- **Archivo `config.js`:** define las URLs base:
  ```js
  const BASE_URL_POKEMON = 'http://localhost:3000'
  const BASE_URL_COUNTRIES = 'http://localhost:4000'
  const BASE_URL_FASTAPI = 'http://localhost:8000'
  ```
- **Empaquetado con Cordova:**
  ```bash
  cordova platform add android
  cordova build android
  ```
- El **APK final** queda en:
  ```
  platforms/android/app/build/outputs/apk/debug/
  ```

---

## Tecnologías a utilizar: 

### Frontend
- HTML5  
- CSS3 + Tailwind CSS (CDN)  
- JavaScript ES6  
- Apache Cordova

### Backend
- NestJS (TypeScript) + PostgreSQL  
- Express (Node.js) + PostgreSQL  
- FastAPI (Python) + MongoDB

---

##  Estructura del Repositorio de momento
```text
infomovil-taller2/
├── frontend/
│   ├── www/
│   │   ├── index.html
│   │   ├── styles.css
│   │   ├── js/
│   │   │   ├── main.js
│   │   │   ├── api.js
│   │   │   ├── config.js
│   │   │   ├── pokemon.js
│   │   │   ├── countries.js
│   │   │   ├── weather.js
│   │   │   └── holidays.js
│   └── README.md
│
├── api-pokemon/      # Backend NestJS
├── api-countries/    # Backend Express
├── api-fastapi/      # Backend FastAPI
└── README.md         # Este documento
```
---
## Organización

División de tareas y organización:  https://docs.google.com/spreadsheets/d/1SS0sQna__lw2i_N7hFHYkcZuJKCjdoBD3aPRTeOkSSM/edit?gid=0#gid=0 


<img width="1024" height="1024" alt="image" src="https://github.com/user-attachments/assets/0925bbb5-e158-4a53-a7a7-44f48cb05083" />

**Proyecto desarrollado para el curso Introducción al Desarrollo Web Móvil - Universidad Católica del Norte (UCN) 2025**
