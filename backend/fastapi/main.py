import uvicorn
from fastapi import FastAPI, HTTPException, status
from pymongo import MongoClient
from pydantic import BaseModel, Field
from typing import List, Optional

#1 Database setup
app = FastAPI(
    title="API de clima y feriados ",
    description="Bavkend FastApi de MongoDB",
    version="1.0.0"
)

#Conecciom a la base de datos MongoDB
CONNECTION_STRING = "mongodb+srv://<TU_USUARIO>:<TU_PASSWORD>@<TU_CLUSTER>.mongodb.net/?retryWrites=true&w=majority"

#Conectar el Cliente de MongoDB
client = MongoClient(CONNECTION_STRING)
db = client["infomovil"]
weather_collection = db["weather_data"]
holidays_collection = db["holidays_data"]

#2 Modelos de datos (Pydantic)

class WeatherResponse(BaseModel):
    ciudad: str
    latitud: float
    longitud: float
    temperatura: float
    viento: float

class Feriado(BaseModel):
    fecha: str
    nombre: str

class HolidaysResponse(BaseModel):
    pais: str
    anio: int
    feriados: List[Feriado] = Field(alieas="lista_de_feriados")


    class config:
        allow_population_by_field_name = True

#3 Evento de inicio
@app.on_event("startup")
def startup_db_event():

    if weather_collection.count_documents({}) == 0:
        print("INFO: Coleccion 'weather_data' vacia. Insertando datos de ejemplo...")
        weather_collection.insert_one({
            "ciudad": "La Serena",
            "latitud": -29.9045,
            "longitud": -71.2489,
            "temperatura": 17.8,
            "viento": 14.2
        })

    if holidays_collection.count_documents({}) == 0:
        print("INFO: Coleccion 'holidays_data' vacia. Insertando datos de ejemplo...")
        holidays_collection.insert_one({
            "pais": "CL",
            "anio": 2025,
            "feriados": [
                {"fecha": "2025-01-01", "nombre": "Año Nuevo"},
                {"fecha": "2025-09-18", "nombre": "Independencia Nacional"},
                {"fecha": "2025-12-25", "nombre": "Navidad"}
            ]
        })
#4 Rutas de la API
@app.get("/weather", response_model=WeatherResponse)
def get_weather(ciudad: str):
    """
    Obtener datos climáticos para una ciudad específica.
    """
    weather_data = weather_collection.find_one(
        {"ciudad": {"$regex": f"^{ciudad}$", "$options": "i"}},
        {"_id": 0}
        )
    if weather_data:
        return weather_data
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"No se encontraron datos climáticos para la ciudad: {ciudad}"
    )

#Endpoint para obtener feriados
@app.get("/holidays/{countrycode}/{year}", response_model=HolidaysResponse)
def get_holidays(countrycode: str, year: int):
    """
    Obtener feriados para un país y año específicos.
    """
    holiday_data = holidays_collection.find_one(
        {"pais": countrycode.upper(), "año": year},
        {"_id": 0}
    )
    if holiday_data:
        return holiday_data
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"No se encontraron feriados para el país: {countrycode} en el año: {year}"
    )

#5 Ejecutar la aplicación
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
