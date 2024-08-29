import React, { useState } from "react";
import { useLoading } from "../context/LoadingContext";

type CitySearchProps = {
  onCitySelected: (city: string) => void;
};

export default function CitySearch({ onCitySelected }: CitySearchProps) {
  const [city, setCity] = useState("");
  const { isLoading } = useLoading();

  const handleSubmit = (e: React.FormEvent) => {
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
        disabled={isLoading} // Disable input while loading
      />
      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? "Loading..." : "Search"}
      </button>
    </form>
  );
}
