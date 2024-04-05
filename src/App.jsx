import { useState, useEffect } from 'react'
import clear from './assets/clear.png'
import cloud from './assets/cloud.png'
import rain from './assets/rain.png'

import './App.css'
const api = {
  key: "1032d5bf6959b673cb7ba789aa37f83d",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [weatherCity1, setWeatherCity1] = useState({});
  const [weatherCity2, setWeatherCity2] = useState({});
  const city1="Riyadh";
  const city2="Jeddah";

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };
  useEffect(() => {
      fetch(`${api.base}weather?q=${city1}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeatherCity1(result);
        });
  }, []); 
  
  useEffect(() => {
      fetch(`${api.base}weather?q=${city2}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeatherCity2(result);
        });
  }, []); 
  
  const icon = () => {
    const description = weather.weather[0].description;
    const rains = 'rain';
    const clouds = 'clouds';
    if(description.includes(rains)){
      return <img src={rain} className="weather-icon"/>
    } else if(description.includes(clouds)){
      return <img src={cloud} className="weather-icon"/>
    }
    else{
      return <img src={clear} className="weather-icon"/>
    }
  }

  const iconCity1 = () => {
    const description = weatherCity1.weather[0].description;
    const rains = 'rain';
    const clouds = 'clouds';
    if(description.includes(rains)){
      return <img src={rain} className="weather-icon"/>
    } else if(description.includes(clouds)){
      return <img src={cloud} className="weather-icon"/>
    }
    else{
      return <img src={clear} className="weather-icon"/>
    }
  }
  const iconCity2 = () => {
    const description = weatherCity2.weather[0].description;
    const rains = 'rain';
    const clouds = 'clouds';
    if(description.includes(rains)){
      return <img src={rain} className="weather-icon"/>
    } else if(description.includes(clouds)){
      return <img src={cloud} className="weather-icon"/>
    }
    else{
      return <img src={clear} className="weather-icon"/>
    }
  }

  return (
    <>
    <div className="first">
    <input type='text' placeholder='Search for the city name' className="search" onChange={(e) => setSearch(e.target.value)}/>
    <button className="search" onClick={searchPressed}>Search</button>
    </div>
{typeof weather.main !== "undefined" ? (
<div class="weather-card">
    <div class="weather-data">
        <div class="location">{weather.name}</div>
        <div class="temperature">{weather.main.temp}°C</div>
        <div class="description">({weather.weather[0].description})</div>
        {icon()}
    </div>
</div>
) : (
  ""
)}
{typeof weatherCity1.main !== "undefined" ? (
<div class="weather-card">
    <div class="weather-data">
        <div class="location">{weatherCity1.name}</div>
        <div class="temperature">{weatherCity1.main.temp}°C</div>
        <div class="description">({weatherCity1.weather[0].description})</div>
        {iconCity1()}
    </div>
</div>
) : (
  ""
)}
{typeof weatherCity2.main !== "undefined" ? (
<div class="weather-card">
    <div class="weather-data">
        <div class="location">{weatherCity2.name}</div>
        <div class="temperature">{weatherCity2.main.temp}°C</div>
        <div class="description">({weatherCity2.weather[0].description})</div>
        {iconCity2()}
    </div>
</div>
) : (
  ""
)}
    </>
  )
}

export default App
