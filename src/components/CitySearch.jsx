import React, { useState } from 'react';

export default function CitySearch({ onCitySelected }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onCitySelected(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4 items-center">
      <input 
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="input input-bordered"
      />
      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  );
}
