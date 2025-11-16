import uvicorn
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pydantic import BaseModel
from typing import List, Optional
import json
import os


app = FastAPI(
    title="API de clima y feriados",
    description="Backend FastAPI con MongoDB para InfoMóvil",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)



MONGODB_URI = os.getenv(
    "MONGODB_URI",
    "mongodb+srv://webmovil:taller123@cluster0.quu5kix.mongodb.net/?appName=Cluster0",
)
if os.getenv("MONGODB_URI"):
    print("Usando MONGODB_URI desde variable de entorno")
else:
    print("Usando MONGODB_URI por defecto embebida en el código")

client = MongoClient(MONGODB_URI)
db = client["infomovil"]
weather_collection = db["weather_data"]
holidays_collection = db["holidays_data"]


class Coordinates(BaseModel):
    name: str
    country_code: Optional[str] = None
    latitude: float
    longitude: float


class WeatherCurrent(BaseModel):
    temperature_2m: float
    wind_speed_10m: float


class WeatherData(BaseModel):
    current: WeatherCurrent


class WeatherResponse(BaseModel):
    coordenadas: Coordinates
    clima: WeatherData


class HolidayItem(BaseModel):
    date: str
    localName: str
    name: str


def load_json_relative(filename: str):
    base_dir = os.path.dirname(__file__)
    path = os.path.join(base_dir, filename)
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


@app.on_event("startup")
def startup_db_event() -> None:
    if weather_collection.count_documents({}) < 30:
        print("INFO: Sembrando datos de clima desde archivo local...")
        weather_collection.delete_many({})
        weather_seed = load_json_relative("weather-seed.json")
        if isinstance(weather_seed, list):
            weather_collection.insert_many(weather_seed)

    if holidays_collection.count_documents({}) < 5:
        print("INFO: Sembrando datos de feriados desde archivo local...")
        holidays_collection.delete_many({})
        holidays_seed = load_json_relative("holidays-seed.json")
        if isinstance(holidays_seed, list):
            holidays_collection.insert_many(holidays_seed)


@app.get("/weather", response_model=WeatherResponse)
def get_weather(city: str) -> WeatherResponse:
    weather_data = weather_collection.find_one(
        {"ciudad": {"$regex": f"^{city}$", "$options": "i"}},
        {"_id": 0},
    )

    if not weather_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No se encontraron datos climáticos para la ciudad: {city}",
        )

    country_code = weather_data.get("country_code") or "CL"

    return WeatherResponse(
        coordenadas=Coordinates(
            name=weather_data.get("ciudad", city),
            country_code=country_code,
            latitude=weather_data["latitud"],
            longitude=weather_data["longitud"],
        ),
        clima=WeatherData(
            current=WeatherCurrent(
                temperature_2m=weather_data["temperatura"],
                wind_speed_10m=weather_data["viento"],
            )
        ),
    )


@app.get("/holidays/{countrycode}/{year}", response_model=List[HolidayItem])
def get_holidays(countrycode: str, year: int) -> List[HolidayItem]:
    holiday_data = holidays_collection.find_one(
        {"pais": countrycode.upper(), "año": year},
        {"_id": 0},
    )

    if not holiday_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No se encontraron feriados para el país: {countrycode} en el año: {year}",
        )

    feriados = holiday_data.get("feriados", [])
    return [
        HolidayItem(
            date=item["fecha"],
            localName=item["nombre"],
            name=item["nombre"],
        )
        for item in feriados
    ]


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
