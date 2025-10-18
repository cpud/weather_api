import {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

const baseUrl = "http://127.0.0.1:8000"

function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState([]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = await axios.get(`${baseUrl}/weather/${location}`);
    const weatherData = data.data
    console.log(weatherData)
    //setWeather(weatherData.address) - works!
    //setWeather(weatherData.description) - also works
    setWeather(weatherData.days[0].tempmax) // working!!
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
        </section>
        <section>
          {weather}
        </section>
      </div>
    </>
  )
}

export default App
