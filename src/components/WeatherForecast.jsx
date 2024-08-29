import React from 'react';

export default function WeatherForecast({ weatherData }) {
  if (!weatherData) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
      {weatherData.list.map((day, index) => (
        <div key={index} className="card shadow-md">
          <div className="card-body">
            <h2 className="card-title">{new Date(day.dt_txt).toLocaleDateString()}</h2>
            <p>Min: {day.main.temp_min}°C</p>
            <p>Max: {day.main.temp_max}°C</p>
          </div>
        </div>
      ))}
    </div>
  );
}
