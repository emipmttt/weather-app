import React, { useState } from "react";
import { useLoading } from "../context/LoadingContext";

type Place = {
  id: number;
  city_name: string;
  state: string;
  country: string;
  lat: string;
  long: string;
};

type PlacesListProps = {
  places: Place[];
  onPlaceClick: (place: Place) => void;
};

export default function PlacesList({ places, onPlaceClick }: PlacesListProps) {
  const { isLoading } = useLoading();
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);

  if (!places || places.length === 0) return null;

  const handlePlaceClick = (place: Place) => {
    setSelectedPlaceId(place.id);
    onPlaceClick(place);
  };

  return (
    <div className="overflow-x-auto flex space-x-4 p-4">
      {places.map((place) => (
        <div
          key={place.id}
          className={`card w-60 bg-base-100 shadow-md cursor-pointer ${
            isLoading ? "opacity-50 pointer-events-none" : ""
          } ${selectedPlaceId === place.id ? "border-4 border-blue-500" : ""}`} // Highlight the selected card
          onClick={() => handlePlaceClick(place)}
        >
          <div className="card-body">
            <h2 className="card-title">{place.city_name}</h2>
            <p>
              {place.state}, {place.country}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
