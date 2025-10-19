from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
from dotenv import load_dotenv
import os


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ['*'],
    allow_credentials=True,
    allow_methods = ['*'],
    allow_headers = ['*'],
)

class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id" : item_id, "q": q}

@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.name, "item_id": item_id}

@app.get("/weather")
def crossing_weather(location = "London,UK"):
    load_dotenv()
    key = os.getenv("CROSSING_KEY")
    date2 = None
    api_url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{location}?key={key}".format(
        location = location, key = key)
    r = requests.get(api_url)
    return r.json()

@app.get("/weather/{location}")
def test(location):
    load_dotenv()
    key = os.getenv("CROSSING_KEY")
    date2 = None
    api_url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{location}?key={key}".format(
        location = location, key = key)
    r = requests.get(api_url)
    return r.json()