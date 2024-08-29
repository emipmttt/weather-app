// src/services/openweathermap.ts
import axios from "axios";

const API_KEY = "0eebd1fcf852d29ca0340c5c451d4c9a";
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const getWeatherByCoordinates = async (lat: string, lon: string) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        lat,
        lon,
        units: "metric",
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
