import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiKey = process.env.REACT_APP_API_KEY;
    const metric = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${metric}`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
    }
  };

  return (
    <>
      <div className="h-full flex flex-col items-center justify-center bg-slate-900 ">
        <h1 className="text-3xl uppercase font-bold mb-2 mt-10 text-white text-center ">
          Open Weather Dashboard
        </h1>
        <br />
        <center>
        <form onSubmit={handleSubmit} className="max-w-md w-full">
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Enter city name"
            className="w-full border border-double bg-transparent  border-gray-300 rounded-md py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Weather
          </button>
        </form>
        </center>

        {weatherData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4 p-4">
            <div className="bg-slate-800 rounded-md shadow-md text-center p-16">
              <h2 className=" text-3xl text-center font-semibold text-white mb-2">
                {cityName}
              </h2>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt="weather-icon"
                className="mx-auto"
              />
              <div className="text-4xl font-bold mb-2 text-white text-center">
                {weatherData.main.temp}°C
              </div>
              <p className="text-3xl  text-white mb-2 font-light">
                {weatherData.weather[0].description}
              </p>
            </div>
            <div className="bg-slate-800 rounded-md shadow-md p-16 text-center">
              <p className="text-2xl text-white mb-2 font-light">Humidity</p>
              <p className=" text-3xl text-white mb-2 font-bold">
                {" "}
                {weatherData.main.humidity} %
              </p>
              <p className="text-2xl text-white mb-2 font-light">Wind Speed</p>
              <p className=" text-3xl text-white mb-2 font-bold">
                {" "}
                {weatherData.wind.speed} Km/h
              </p>
              <p className="text-2xl text-white mb-2 font-light">Pressure</p>
              <p className=" text-3xl text-white mb-2 font-bold">
                {" "}
                {weatherData.main.pressure} hPa
              </p>
            </div>
            <div className="bg-slate-800 rounded-md shadow-md p-16 text-center">
              <p className="text-2xl text-white mb-2 font-light">Visibility</p>
              <p className=" text-3xl text-white mb-2 font-bold">
                {" "}
                {weatherData.visibility / 1000} km
              </p>
              <p className="text-2xl text-white mb-2 font-light">Cloudiness</p>
              <p className=" text-3xl text-white mb-2 font-bold">
                {" "}
                {weatherData.clouds.all}  %
              </p>
              <p className="text-2xl text-white mb-2 font-light">
                Feels Like 
                </p>
              <p className=" text-3xl text-white mb-2 font-bold">
                {" "}
                {weatherData.main.feels_like} %
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
