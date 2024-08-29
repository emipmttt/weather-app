import axios from "axios";

const BASE_URL = "https://search.reservamos.mx/api/v2/places";

export const getCitiesByName = async (city: string) => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${city}`);
    return response.data.filter((place: any) => place.result_type === "city");
  } catch (error) {
    console.error("Error fetching places data:", error);
    throw error;
  }
};
