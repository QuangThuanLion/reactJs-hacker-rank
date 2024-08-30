import { log } from 'console';
import React, { useState } from 'react';
import { Weather, weatherData } from '../../data/weatherData';
import WeatherCard from '../WeatherCard';
import "./index.css";

const WeatherList: React.FC = () => {
  
  const [weatherList, setWeatherList] = useState<Weather[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [currentValueSearch, setCurrentValueSearch] = useState<string>('')

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setCurrentValueSearch(value)
    if (value.trim() == '') {
      setWeatherList([]);
    } else {
      setCurrentValueSearch(value)
      const filteredWeather = weatherData.filter((weather) =>
        weather.city.toLowerCase().includes(value)
      );
      setWeatherList(filteredWeather);
    }
  };

  const handleClearSearch = () => {
    setCurrentValueSearch('')
    setWeatherList([]);
  };

  const handleUnitChange = () => {
    setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
  };

  const handleAddFavorite = (cityId: number) => {
    setFavorites((prevFavorites) => [...prevFavorites, cityId]);
  };

  const handleRemoveFavorite = (cityId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((id) => id !== cityId)
    );
  };

  return (
    <div className="layout-column align-items-center justify-content-start weather-list" data-testid="weather-list">
      <h3>Dashboard</h3>
      <p className="city-details">Search for Current Temperature in cities like: New York, London, Paris etc.</p>
      <div className="card w-300 pt-20 pb-5 mt-5">
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <input
            type="text"
            placeholder="Search city"
            value={currentValueSearch}
            onChange={handleSearch}
            data-testid="search-input"
          />
          <button onClick={handleClearSearch} data-testid="clear-search-button">
            Clear search
          </button>
        </section>
        <table className="table search-results">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {weatherList.map((weather) => (
              <WeatherCard
                key={weather.id}
                weather={weather}
                unit={unit}
                onAddFavorite={handleAddFavorite}
                onRemoveFavorite={handleRemoveFavorite}
                isFavorite={favorites.includes(weather.id)}
              />
            ))}
          </tbody>
        </table>
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <button onClick={handleUnitChange} data-testid="unit-change-button" className="outlined">
            Switch to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
          </button>
        </section>
      </div>
      <h3>Favourite Cities</h3>
      <div className="card w-300 pt-20 pb-5">
        <table className="table favorites">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {weatherData
              .filter((weather) => favorites.includes(weather.id))
              .map((weather) => (
                <WeatherCard
                  key={weather.id}
                  weather={weather}
                  unit={unit}
                  onAddFavorite={handleAddFavorite}
                  onRemoveFavorite={handleRemoveFavorite}
                  isFavorite={true}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherList;
