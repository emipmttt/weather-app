import React, { useState } from 'react';
import axios from 'axios';
import CitySearch from './components/CitySearch';
import WeatherForecast from './components/WeatherForecast';

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async (city) => {
    try {
      const reservamosResponse = await axios.get(`https://search.reservamos.mx/api/v2/places?q=${city}`);
      const cityData = reservamosResponse.data.find(place => place.result_type === 'city');
      
      if (cityData) {
        const { lat, long } = cityData;
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&appid=0eebd1fcf852d29ca0340c5c451d4c9a`
        );
        setWeatherData(weatherResponse.data);
      } else {
        alert("City not found!");
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching weather data");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Weather Forecast</h1>
      <CitySearch onCitySelected={fetchWeather} />
      <WeatherForecast weatherData={weatherData} />
    </div>
  );
}

export default App;
