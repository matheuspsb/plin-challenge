import React from "react";

interface WeatherCardProps {
  city: string;
  temperature: number;
  max_temperature: number;
  min_temperature: number;
  description: string;
  humidity: number;
  windSpeed: number,
  icon: string,
  date: string,
  visibility: number
  main: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, date, temperature, max_temperature, min_temperature, main, description, visibility, humidity, windSpeed, icon }) => {
  return (
        <div className="flex flex-col">
            <h1 className="text-3xl font-semibold mb-2 md:text-4xl">{city}</h1>
            <h4 className="text-sm text-gray-500">{date}</h4>
            <div className="flex flex-row items-center justify-center mt-6">
                <h4 className="font-medium text-6xl">{Math.round(temperature)}°</h4>
                <div className="flex flex-col items-center ml-6">
                    <p>{main}</p>
                    <div className="mt-1">
                        <span className="text-sm font-light text-gray-500">{max_temperature}°C</span>
                    </div>
                    <div>
                        <span className="text-sm font-light text-gray-500">{Math.round(min_temperature)}°C</span>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <img 
                        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                        alt={description}
                    />
                </div>
            </div>
            <div className="flex flex-row justify-between mt-6">
                <div className="flex flex-col items-center">
                    <h4 className="font-medium text-sm">Wind</h4>
                    <p className="text-sm text-gray-500">{windSpeed} m/s</p>
                </div>
                <div className="flex flex-col items-center">
                    <h4 className="font-medium text-sm">Humidity</h4>
                    <p className="text-sm text-gray-500">{humidity}%</p>
                </div>
                <div className="flex flex-col items-center">
                    <h4 className="font-medium text-sm">Visibility</h4>
                    <p className="text-sm text-gray-500">{(visibility)}km</p>
                </div>
            </div>
        </div>
  );
};

export default WeatherCard;
