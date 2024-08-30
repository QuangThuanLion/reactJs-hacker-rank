import React from 'react';
import { Weather } from '../../data/weatherData';

interface WeatherCardProps {
  weather: Weather;
  unit: 'C' | 'F';
  onAddFavorite: (cityId: number) => void;
  onRemoveFavorite: (cityId: number) => void;
  isFavorite: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  unit,
  onAddFavorite,
  onRemoveFavorite,
  isFavorite,
}) => {

  const handleFavoriteClick = () => {
    if (isFavorite) {
      onRemoveFavorite(weather.id);
    } else {
      onAddFavorite(weather.id);
    }
  };

  const displayTemperature = unit === 'C'
  ? weather.temperature
  : ((weather.temperature * 9/5) + 32).toFixed(1);

  return (
    <tr className="weather-card" data-testid={`weather-card-${weather.id}`}>
      <td>{weather.city}</td>
      <td>{displayTemperature} {unit === 'C' ? '°C' : '°F'}</td>
      <td>{weather.description}</td>
      <td>
        <button 
            onClick={handleFavoriteClick} 
            data-testid={`weather-card-action-${weather.id}`}>
            {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        </button>
      </td>
    </tr>
  );
};

export default WeatherCard;

