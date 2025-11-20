import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeatherWidget = ({ destination }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock weather data for demonstration (in real app, use weather API)
  const mockWeatherData = {
    current: {
      temperature: 22,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 12,
      icon: 'Cloud'
    },
    forecast: [
      { day: 'Today', high: 24, low: 18, condition: 'Partly Cloudy', icon: 'Cloud' },
      { day: 'Tomorrow', high: 26, low: 20, condition: 'Sunny', icon: 'Sun' },
      { day: 'Monday', high: 23, low: 17, condition: 'Light Rain', icon: 'CloudRain' },
      { day: 'Tuesday', high: 25, low: 19, condition: 'Sunny', icon: 'Sun' }
    ]
  };

  useEffect(() => {
    if (destination) {
      fetchWeatherData();
    }
  }, [destination]);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would make an API call here:
      // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${destination?.name}&appid=${API_KEY}`);
      // const data = await response.json();
      
      setWeather(mockWeatherData);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const getTemperatureColor = (temp) => {
    if (temp >= 30) return 'text-red-600';
    if (temp >= 20) return 'text-orange-500';
    if (temp >= 10) return 'text-blue-500';
    return 'text-blue-700';
  };

  if (!destination) {
    return (
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="text-center py-8">
          <Icon name="MapPin" size={32} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Select a destination to view weather</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Cloud" size={20} className="text-blue-500" />
          <span>Weather in {destination?.name}</span>
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={fetchWeatherData}
          disabled={loading}
        >
          <Icon name="RefreshCw" size={16} className={loading ? 'animate-spin' : ''} />
        </Button>
      </div>

      {loading && (
        <div className="text-center py-8">
          <Icon name="Loader2" size={32} className="text-muted-foreground mx-auto mb-3 animate-spin" />
          <p className="text-muted-foreground">Loading weather data...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <Icon name="AlertTriangle" size={32} className="text-red-500 mx-auto mb-3" />
          <p className="text-red-500 mb-3">{error}</p>
          <Button variant="outline" size="sm" onClick={fetchWeatherData}>
            Try Again
          </Button>
        </div>
      )}

      {weather && !loading && (
        <div className="space-y-4">
          {/* Current Weather */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon name={weather?.current?.icon} size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Weather</p>
                  <p className="font-medium text-foreground">{weather?.current?.condition}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${getTemperatureColor(weather?.current?.temperature)}`}>
                  {weather?.current?.temperature}°C
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center space-x-2">
                <Icon name="Droplets" size={16} className="text-blue-500" />
                <span className="text-sm text-muted-foreground">
                  Humidity: {weather?.current?.humidity}%
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Wind" size={16} className="text-blue-500" />
                <span className="text-sm text-muted-foreground">
                  Wind: {weather?.current?.windSpeed} km/h
                </span>
              </div>
            </div>
          </div>

          {/* 4-Day Forecast */}
          <div>
            <h4 className="font-medium text-foreground mb-3">4-Day Forecast</h4>
            <div className="grid grid-cols-2 gap-3">
              {weather?.forecast?.map((day, index) => (
                <div 
                  key={index}
                  className="bg-surface rounded-lg p-3 border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{day?.day}</span>
                    <Icon name={day?.icon} size={16} className="text-blue-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{day?.condition}</span>
                    <div className="text-sm">
                      <span className={`font-medium ${getTemperatureColor(day?.high)}`}>
                        {day?.high}°
                      </span>
                      <span className="text-muted-foreground mx-1">/</span>
                      <span className="text-muted-foreground">{day?.low}°</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Alert */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Weather Tip</p>
                <p className="text-xs text-yellow-700 mt-1">
                  Pack light layers for variable temperatures. Rain expected on Monday.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;