import React, { useState, useEffect } from 'react';
import { WeatherService, WeatherConditions } from '@bitebrain/core';

interface WeatherDisplayProps {
  latitude: number;
  longitude: number;
  className?: string;
  onWeatherUpdate?: (weather: WeatherConditions) => void;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  latitude,
  longitude,
  className = '',
  onWeatherUpdate,
}) => {
  const [weather, setWeather] = useState<WeatherConditions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const weatherData = await WeatherService.getWeatherForLocation(latitude, longitude);
      setWeather(weatherData);
      setLastUpdated(new Date());

      if (onWeatherUpdate) {
        onWeatherUpdate(weatherData);
      }
    } catch (err) {
      setError('Failed to load weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();

    // Update weather every 15 minutes as per requirements
    const interval = setInterval(fetchWeather, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, [latitude, longitude]);

  const getWindDirectionIcon = (direction: string): string => {
    const icons: Record<string, string> = {
      'N': '⬆️', 'NNE': '↗️', 'NE': '↗️', 'ENE': '↗️',
      'E': '➡️', 'ESE': '↘️', 'SE': '↘️', 'SSE': '↘️',
      'S': '⬇️', 'SSW': '↙️', 'SW': '↙️', 'WSW': '↙️',
      'W': '⬅️', 'WNW': '↖️', 'NW': '↖️', 'NNW': '↖️'
    };
    return icons[direction] || '🌀';
  };

  const getPressureTrend = (pressure: number): { trend: string; color: string; icon: string } => {
    // Mock pressure trend - in production this would compare to previous readings
    if (pressure > 30.10) {
      return { trend: 'Rising', color: 'text-green-600', icon: '📈' };
    } else if (pressure < 29.90) {
      return { trend: 'Falling', color: 'text-red-600', icon: '📉' };
    } else {
      return { trend: 'Steady', color: 'text-yellow-600', icon: '➡️' };
    }
  };

  const getCloudCoverDescription = (cloudCover: number): string => {
    if (cloudCover < 25) return 'Clear';
    if (cloudCover < 50) return 'Partly Cloudy';
    if (cloudCover < 75) return 'Mostly Cloudy';
    return 'Overcast';
  };

  const getPrecipitationIcon = (precipitation: number): string => {
    if (precipitation === 0) return '☀️';
    if (precipitation < 0.1) return '🌦️';
    if (precipitation < 0.5) return '🌧️';
    return '⛈️';
  };

  if (loading) {
    return (
      <div className={`${className} bg-white dark:bg-bitebrain-navy rounded-lg shadow-lg p-6`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className={`${className} bg-white dark:bg-bitebrain-navy rounded-lg shadow-lg p-6 border border-red-200`}>
        <div className="text-center text-red-600">
          <div className="text-4xl mb-2">🌡️</div>
          <p className="font-semibold">Weather Unavailable</p>
          <p className="text-sm text-gray-600 mt-1">{error}</p>
          <button
            onClick={fetchWeather}
            className="mt-3 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const pressureTrend = getPressureTrend(weather.pressure);

  return (
    <div className={`${className} bg-white dark:bg-bitebrain-navy rounded-lg shadow-lg overflow-hidden`}>
      {/* Header */}
      <div className="bg-bitebrain-teal text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold flex items-center">
              🌤️ Current Weather
            </h2>
            <p className="text-sm opacity-90">
              Real-time conditions for fishing
            </p>
          </div>
          {lastUpdated && (
            <div className="text-right text-xs opacity-75">
              Updated: {lastUpdated.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main Weather Display */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Temperature */}
          <div className="text-center">
            <div className="text-4xl font-bold text-bitebrain-navy dark:text-bitebrain-mist mb-1">
              {weather.temperature}°F
            </div>
            <div className="text-sm text-bitebrain-slate dark:text-bitebrain-mist">
              Air Temperature
            </div>
          </div>

          {/* Precipitation */}
          <div className="text-center">
            <div className="text-3xl mb-1">{getPrecipitationIcon(weather.precipitation)}</div>
            <div className="text-sm font-medium text-bitebrain-navy dark:text-bitebrain-mist">
              {weather.precipitation === 0 ? 'No Rain' : `${weather.precipitation}" precipitation`}
            </div>
            <div className="text-xs text-bitebrain-slate dark:text-bitebrain-mist">
              {getCloudCoverDescription(weather.cloudCover)}
            </div>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          {/* Wind */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-bitebrain-slate dark:text-bitebrain-mist">Wind</div>
                <div className="font-semibold text-bitebrain-navy dark:text-bitebrain-mist">
                  {weather.windSpeed} mph
                </div>
              </div>
              <div className="text-2xl">{getWindDirectionIcon(weather.windDirection)}</div>
            </div>
            <div className="text-xs text-bitebrain-teal mt-1">
              {weather.windDirection}
            </div>
          </div>

          {/* Pressure */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-bitebrain-slate dark:text-bitebrain-mist">Pressure</div>
                <div className="font-semibold text-bitebrain-navy dark:text-bitebrain-mist">
                  {weather.pressure}"
                </div>
              </div>
              <div className="text-xl">{pressureTrend.icon}</div>
            </div>
            <div className={`text-xs mt-1 ${pressureTrend.color}`}>
              {pressureTrend.trend}
            </div>
          </div>

          {/* Humidity */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <div>
              <div className="text-sm text-bitebrain-slate dark:text-bitebrain-mist">Humidity</div>
              <div className="font-semibold text-bitebrain-navy dark:text-bitebrain-mist">
                {weather.humidity}%
              </div>
            </div>
          </div>

          {/* Cloud Cover */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <div>
              <div className="text-sm text-bitebrain-slate dark:text-bitebrain-mist">Cloud Cover</div>
              <div className="font-semibold text-bitebrain-navy dark:text-bitebrain-mist">
                {weather.cloudCover}%
              </div>
            </div>
          </div>
        </div>

        {/* Fishing Impact Summary */}
        <div className="mt-6 p-4 bg-bitebrain-teal/10 rounded-lg border border-bitebrain-teal/20">
          <h3 className="font-semibold text-bitebrain-navy dark:text-bitebrain-mist mb-2">
            🎣 Fishing Impact
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-bitebrain-slate dark:text-bitebrain-mist">Wind Effect:</span>
              <span className={`ml-1 font-medium ${
                weather.windSpeed < 10 ? 'text-green-600' :
                weather.windSpeed < 20 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {weather.windSpeed < 10 ? 'Favorable' :
                 weather.windSpeed < 20 ? 'Moderate' : 'Challenging'}
              </span>
            </div>
            <div>
              <span className="text-bitebrain-slate dark:text-bitebrain-mist">Pressure:</span>
              <span className={`ml-1 font-medium ${pressureTrend.color}`}>
                {pressureTrend.trend}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 text-xs text-bitebrain-slate dark:text-bitebrain-mist text-center">
        Data updates every 15 minutes • Powered by WeatherService
      </div>
    </div>
  );
};
