"use client";

import React, { useEffect, useState } from "react";
import { getFormattedDateWithTimeZone } from "./utils/dateUtils";
import WeatherCard from "./components/WeatherCard";

interface WeatherData {
  id: number;
  weather: { 
    id: number; 
    main: string; 
    description: string; 
    icon: string 
  }[];
  base: string;
  main: {
    temp: number;
    humidity: number;
    temp_max: number;
    temp_min: number;
  };
  wind: { speed: number };
  name: string;
  visibility: number;
  dt: number;
  formattedDate: string;
  timezone: number;
}

const Home: React.FC = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [weather, setWeather] = useState<WeatherData | null>(null)

  useEffect(() => {
    // Obter a geolocalização do usuário
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, []);

  useEffect(() => {
    // Obter a previsão do tempo usando a OpenWeatherAPI
    if (location.latitude !== 0 && location.longitude !== 0) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_APP_ID}&units=metric`
      )
        .then((response) => response.json())
        .then((data: WeatherData) => {
          console.log(data)
          const formattedDate = getFormattedDateWithTimeZone(data.dt, data.timezone);
          setWeather({...data, formattedDate });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [location]);

  return (
    <div>
      <h1 className="text-4xl font-semibold text-gray-800 mt-8 ml-8">Weather Page</h1>
      <div className="bg-white/25 w-full rounded-lg flex justify-center items-center flex-col h-screen">
        <div className="flex justify-center items-center p-16 border-2 border-white-300 rounded-3xl drop-shadow-primary max-w-lg">
          {weather && ( 
            <WeatherCard
              city={weather.name}
              main={weather.weather[0].main}
              date={weather.formattedDate}
              temperature={Math.round(weather.main.temp)}
              max_temperature={Math.round(weather.main.temp_max)}
              min_temperature={Math.round(weather.main.temp_min)}
              description={weather.weather[0].description}
              humidity={weather.main.humidity}
              icon={weather.weather[0].icon}
              windSpeed={weather.wind.speed}
              visibility={(weather.visibility / 1000)}
            />
          )}
        </div>
      </div>
    </div>
        
  );
};

export default Home;