import { useState } from 'react';
import './App.css';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const baseUrl = "http://127.0.0.1:8000"

function App() {
  const [location, setLocation] = useState("");
  //const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [weather, setWeather] = useState({
    tempMin: '',
    tempMax:'',
    conditions: '',
    humidity: '',
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    const startDateAPI = startDate.toLocaleDateString('en-CA'); // english Canada
    const endDateAPI = endDate.toLocaleDateString('en-CA');
    const data = await axios.get(`${baseUrl}/weather/${location}/${startDateAPI}/${endDateAPI}`);
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

  const onDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  }
  return (
    <>
      <div className="App">
        <div>
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
          </div>
        <div>
          <h3>Start Date</h3>
          <DatePicker
            selected={startDate}
            onChange={onDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline  
          />
        </div>
        <div>
          <WeatherCard weather = {weather} />
        </div>
      </div>
    </>
  )
}

export default App