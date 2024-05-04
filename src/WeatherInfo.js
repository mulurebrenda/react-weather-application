import React from "react";
import WeatherIcon from "./WeatherIcon";
import WeatherTemperature from "./WeatherTemperature";

export default function WeatherInfo(props) {
  return (
    <div className="WeatherInfo">
      <div className="row mt-3 mb-5">
        <div className="col-6 m-auto ps-4">
          <div className="d-flex ">
            <div>
              <WeatherIcon code={props.data.icon} size={52} />
            </div>

            <div>
              <WeatherTemperature celsius={props.unit.currentTemp} />
            </div>
          </div>
          <ul className="text-start ps-2">
            <li className="max-min-temp pb-1">
              <span id="highest-temp">
                {Math.round(props.unit.highestTemp)}°
              </span>{" "}
              |&nbsp;
              <span id="lowest-temp">
                {Math.round(props.unit.lowestTemp)}°
              </span>
            </li>
            <li className="text-capitalize">{props.data.description}</li>
          </ul>
        </div>
        <div className="col-6 ps-0 pe-4">
          <div className="conditions">
            <div className="humidity">
              💧
              <br />
              <span id="humidity">{props.data.humidity}%</span>
              <br />
              <strong> Humidity </strong>
            </div>
            <div className="wind-speed">
              💨
              <br />
              <span id="wind-speed">{props.data.wind} km/h</span>
              <br />
              <strong> Wind speed </strong>
            </div>
            <div className="pressure">
              🌀
              <br />
              <span id="pressure">{props.data.pressure} hPa</span>
              <br />
              <strong> Pressure </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
