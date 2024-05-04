import React, { useState } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  const [unit, setUnit] = useState("");
  let now = new Date();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  function handleResponse(response) {
    console.log(response);
   
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      convertedTemp: response.data.main.temp * 1.8 + 32,
      maxTemperature: response.data.main.temp_max,
      minTemperature: response.data.main.temp_min,
      convertedMaxTemp: response.data.main.temp_max * 1.8 + 32,
      convertedMinTemp: response.data.main.temp_min * 1.8 + 32,
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      wind: response.data.wind.speed,
      location: response.data.name,
      iconUrl: response.data.icon,
      time: `${hours}:${minutes}`,
      fullDate: `${months[new Date(response.data.dt * 1000).getMonth()]} 
        ${new Date(response.data.dt * 1000).getDate()}, 
        ${new Date(response.data.dt * 1000).getFullYear()}`,
    });
    setUnit({
      currentTemp: response.data.main.temp,
      highestTemp: response.data.main.temp_max,
      lowestTemp: response.data.main.temp_min,
    });
  }

  //temp conversion
  function showFarenheit(event) {
    event.preventDefault();
    setUnit({
      currentTemp: `${weatherData.convertedTemp}`,
      highestTemp: `${weatherData.convertedMaxTemp}`,
      lowestTemp: `${weatherData.convertedMinTemp}`,
    });
  }

  function showCelcius(event) {
    event.preventDefault();
    setUnit({
      currentTemp: `${weatherData.temperature}`,
      highestTemp: `${weatherData.maxTemperature}`,
      lowestTemp: `${weatherData.minTemperature}`,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function search() {
    const apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  //getting weather for current location
  function showPosition(position) {
    console.log(position);
    const apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }
  function navigate() {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  if (weatherData.ready) {
    return (
      <div className="Weather">
        <header className="Header pb-4 pt-2">
          <div className="row">
            <div className="col-5 location">
              <h1 className="text-start ps-4 m-0" id="location">
                {weatherData.location}
              </h1>
            </div>
            <div className="col-2 time" id="time">
              {weatherData.time}
            </div>
            <div className="col-4 text-end m-auto" id="date">
              {weatherData.fullDate}
            </div>
          </div>
        </header>
        <div className="row m-auto">
          <div className="col-10 searchform-current">
            <div className="row">
              <div className="col-8 col-sm-9 form pe-1">
                <form role="search" onSubmit={handleSubmit}>
                  <div className="row ">
                    <div className="col col-sm-9 pe-0">
                      <input
                        type="search"
                        placeholder="Enter a city.."
                        className="form-control"
                        autoFocus="on"
                        onChange={handleCityChange}
                      />
                    </div>
                    <div className="col-sm-3 pe-1 d-none d-sm-flex">
                      <input
                        type="submit"
                        value="Search"
                        className="btn btn-primary w-100 ps-0 pe-0"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-4 col-sm-3 pe-1 ">
                <button
                  className="btn shadow-sm current-location-button text-white"
                  onClick={navigate}
                >
                  Current
                </button>
              </div>
            </div>
          </div>
          <div className="col-2 units">
            <button id="celsius" onClick={showCelcius}>
              °C
            </button>
            <span class="mt-1"> | </span>
            <button id="farenheit" onClick={showFarenheit}>
              °F
            </button>
          </div>
        </div>
        <WeatherInfo data={weatherData} unit={unit}/>
        <WeatherForecast coordinates={weatherData.coordinates} />
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}
