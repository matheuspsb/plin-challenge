"use client";

import React, { useEffect, useState } from "react";
import { getFormattedDateWithTimeZone } from "./utils/dateUtils";
import WeatherCard from "../components/WeatherCard";

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
  const [loading, setLoading] = useState(true);

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
          const formattedDate = getFormattedDateWithTimeZone(data.dt, data.timezone);
          setWeather({...data, formattedDate });
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [location]);

  return (
    <div>
      <div className="bg-white/25 w-full flex justify-center items-center flex-col h-screen">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4 text-center sm:text-start">Informações climáticas:</h1>
        <div className="flex justify-center items-center p-6 w-full h-96 border-2 border-white-300 rounded-3xl drop-shadow-primary max-w-lg">
          {loading ? ( 
              <p>Carregando...</p>
            ) : weather ? ( 
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
            ) : (
              <p>Não foi possível obter os dados climáticos.</p>
            )}
        </div>
      </div>
    </div>
        
  );
};

export default Home;