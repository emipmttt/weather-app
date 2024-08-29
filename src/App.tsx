// src/App.tsx
import React, { useState } from "react";
import CitySearch from "./components/CitySearch";
import WeatherForecast from "./components/WeatherForecast";
import PlacesList from "./components/PlacesList";
import { getCitiesByName } from "./services/reservamos";
import { getWeatherByCoordinates } from "./services/openweathermap";
import { LoadingProvider, useLoading } from "./context/LoadingContext";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [places, setPlaces] = useState([]);

  const { setLoading } = useLoading();

  const fetchWeather = async (city: string) => {
    setLoading(true);
    try {
      const cities = await getCitiesByName(city);
      setPlaces(cities);

      if (cities.length > 0) {
        const { lat, long } = cities[0];
        fetchWeatherByCoordinates(lat, long);
      } else {
        alert("City not found!");
      }
    } catch (error) {
      alert("Error fetching places data");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoordinates = async (lat: string, lon: string) => {
    setLoading(true);
    try {
      const weatherData = await getWeatherByCoordinates(lat, lon);
      setWeatherData(weatherData);
    } catch (error) {
      alert("Error fetching weather data");
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceClick = (place: any) => {
    fetchWeatherByCoordinates(place.lat, place.long);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="text-center">
        <h1 className="text-3xl font-boldmb-8">Weather Forecast</h1>
        <small>Made with {"<3"} by Emiliano Pacheco - emipmttt@gmail.com</small>
      </div>

      <CitySearch onCitySelected={fetchWeather} />
      <PlacesList places={places} onPlaceClick={handlePlaceClick} />
      <WeatherForecast weatherData={weatherData} />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <LoadingProvider>
      <App />
    </LoadingProvider>
  );
}
