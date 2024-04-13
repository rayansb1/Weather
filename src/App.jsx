import React, { useState, useEffect } from 'react';
import clear from './assets/clear.png';
import cloud from './assets/cloud.png';
import rain from './assets/rain.png';
import './App.css';

const api = {
  key: "1032d5bf6959b673cb7ba789aa37f83d",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [citiesWeather, setCitiesWeather] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      });
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetch(`${api.base}weather?lat=${userLocation.latitude}&lon=${userLocation.longitude}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          // Check if the result contains valid data
          if (result.cod === 200) {
            setCitiesWeather(prevState => [...prevState, result]);
          }
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, [userLocation]);

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        // Check if the result contains valid data
        if (result.cod === 200) {
          setCitiesWeather(prevState => [...prevState, result]);
        } else {
          console.error('City not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  };

  const getIcon = (description) => {
    if (description.includes('rain')) {
      return rain;
    } else if (description.includes('clouds')) {
      return cloud;
    } else {
      return clear;
    }
  }

  return (
    <>
      <div className="first">
        <input type='search' placeholder='Search for the city name' className="search" onChange={(e) => setSearch(e.target.value)} />
        <button className="start" onClick={searchPressed}>Search</button>
      </div>
      {citiesWeather.map((cityWeather, index) => (
        <div key={index} className="weather-card">
          <div className="weather-data">
            <div className="location">{cityWeather.name}</div>
            <div className="temperature">{cityWeather.main && cityWeather.main.temp}°C</div>
            <div className="description">({cityWeather.weather && cityWeather.weather[0].description})</div>
            <img src={cityWeather.weather ? getIcon(cityWeather.weather[0].description) : clear} className="weather-icon" alt="Weather Icon" />
          </div>
        </div>
      ))}
    </>
  );
}

export default App;
