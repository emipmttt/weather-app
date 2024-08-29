import React from "react";
import moment from "moment";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

type WeatherData = {
  list: {
    dt_txt: string;
    main: {
      temp_min: number;
      temp_max: number;
    };
  }[];
};

type WeatherForecastProps = {
  weatherData: WeatherData;
};

type HourlyWeather = {
  time: string;
  minTemp: number;
  maxTemp: number;
};

const transformData = (
  data: WeatherData["list"],
): { [date: string]: HourlyWeather[] } => {
  const grouped: { [date: string]: HourlyWeather[] } = {};

  data.forEach((entry) => {
    const date = moment(entry.dt_txt).format("YYYY-MM-DD");
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push({
      time: moment(entry.dt_txt).format("HH:mm"),
      minTemp: entry.main.temp_min,
      maxTemp: entry.main.temp_max,
    });
  });

  return grouped;
};

export default function WeatherForecast({ weatherData }: WeatherForecastProps) {
  if (!weatherData) return null;

  const groupedWeather = transformData(weatherData.list);

  // Prepare data for Recharts
  const chartData = Object.entries(groupedWeather).map(
    ([date, hourlyWeather]) => ({
      date,
      minTemp: Math.min(...hourlyWeather.map((hw) => hw.minTemp)),
      maxTemp: Math.max(...hourlyWeather.map((hw) => hw.maxTemp)),
    }),
  );

  return (
    <div className="mt-6">
      {Object.keys(groupedWeather).map((date) => (
        <div key={date} className="card shadow-md p-4 mb-4">
          <h2 className="card-title">{moment(date).format("MMMM D, YYYY")}</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={groupedWeather[date].map((hw) => ({
                time: hw.time,
                minTemp: hw.minTemp,
                maxTemp: hw.maxTemp,
              }))}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="minTemp" fill="#8884d8" />
              <Bar dataKey="maxTemp" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
}
