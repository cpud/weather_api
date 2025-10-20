from typing import Union
import json
import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import redis
from pydantic import BaseModel
import requests
from dotenv import load_dotenv
import os


app = FastAPI()

#redis_client = redis.Redis(host='http://127.0.0.1', port=8000, db = 0)
#redis_client = redis.Redis(host='localhost', port=6379)

# get key for external API
load_dotenv()
key = os.getenv("CROSSING_KEY")


redis_client = redis.Redis(
    host=os.getenv("REDIS_HOST"),
    port=17306,
    decode_responses=True,
    username=os.getenv("REDIS_USER"),
    password=os.getenv("REDIS_PW"),
)

app.add_middleware(
    CORSMiddleware,
    allow_origins = ['*'],
    #allow_credentials=True,
    #allow_methods = ['*'],
    #allow_headers = ['*'],
)

@app.get("/weather/{location}/{date1}/{date2}")
def test(location, date1, date2):
    cache_key = f"weather:{location}{date1}{date2}"
    
    # check if data exists in cache
    cached_data = redis_client.get(cache_key)
    if cached_data:
        return {"source": "cache", "data": json.loads(cached_data)}
        #return json.loads(cached_data)
    
    
    today = datetime.datetime.today()
    #date1 = str(today).split()[0]
    #date2 = str(today + datetime.timedelta(days=10))
    #date2 = date2.split()[0]
    api_url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{location}/{date1}/{date2}?key={key}".format(
        location = location, date1 = date1, date2 = date2, key = key)
    r = requests.get(api_url)
    
    # store in redis cache with 10 min expiration
    weather_dict = json.dumps(r.json())
    redis_client.setex(cache_key, 600, weather_dict)
    
    # return weather data
    #return {"soruce": "api", "data": r.json()}
    return r.json()