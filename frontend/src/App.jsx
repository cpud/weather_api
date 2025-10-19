import {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';

const baseUrl = "http://127.0.0.1:8000"

function App() {
  const [location, setLocation] = useState("");
  //const [weather, setWeather] = useState([]);
  const [weather, setWeather] = useState({
    tempMin: '',
    tempMax:'',
    conditions: '',
    humidity: '',
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = await axios.get(`${baseUrl}/weather/${location}`);
    const weatherData = data.data
    const use = {
      tempMin: weatherData.days[0].tempmin,
      tempMax: weatherData.days[0].tempmax,
      conditions: weatherData.days[0].conditions,
      humidity: weatherData.days[0].humidity,
    }
    setWeather(use) 
  }

  const handleChange = e => {
    setLocation(e.target.value);
  }

  return (
    <>
      <div className="App">
        <section>
          <h3>Enter location</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor='location'></label>
            <input
             onChange={handleChange}
             type="text"
             name="location"
             id="location"
             value={location}/>
             <button type="submit">Submit</button>
          </form>
          <WeatherCard weather = {weather} />
        </section>
        <section>
        </section>
      </div>
    </>
  )
}

export default App
/*
          <h4>Max temp</h4> 
            {weather.tempMax}
          <h4>Min temp</h4>
            {weather.tempMin}
          <h4>Conditions</h4>
            {weather.conditions}
          <h4>Humidity</h4>
            {weather.humidity}
*/