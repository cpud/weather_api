import "../WeatherCard.CSS"

function WeatherCard({ weather }) {


	return <div className="weather-card">
		<div className="weather-info">
		  <h4>Current temp: {weather.temp}</h4>
		  <h4>Max temp: {weather.tempMax}</h4> 
          <h4>Min temp: {weather.tempMin}</h4>
          <h4>Conditions: {weather.conditions}</h4>
          <h4>Humidity: {weather.humidity}</h4>
		</div>
		
	</div>
}

export default WeatherCard