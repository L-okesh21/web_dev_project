import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TravelTools = () => {
  const [activeTab, setActiveTab] = useState('currency');
  const [currencyFrom, setCurrencyFrom] = useState('USD');
  const [currencyTo, setCurrencyTo] = useState('EUR');
  const [amount, setAmount] = useState('100');
  const [weatherCity, setWeatherCity] = useState('');
  const [packingCategory, setPackingCategory] = useState('essentials');

  const currencies = [
    { value: 'USD', label: 'US Dollar (USD)' },
    { value: 'EUR', label: 'Euro (EUR)' },
    { value: 'GBP', label: 'British Pound (GBP)' },
    { value: 'JPY', label: 'Japanese Yen (JPY)' },
    { value: 'CAD', label: 'Canadian Dollar (CAD)' },
    { value: 'AUD', label: 'Australian Dollar (AUD)' },
    { value: 'CHF', label: 'Swiss Franc (CHF)' },
    { value: 'CNY', label: 'Chinese Yuan (CNY)' }
  ];

  const packingCategories = [
    { value: 'essentials', label: 'Essentials' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'toiletries', label: 'Toiletries' },
    { value: 'documents', label: 'Documents' },
    { value: 'entertainment', label: 'Entertainment' }
  ];

  const packingItems = {
    essentials: [
      'Passport', 'Travel insurance', 'Credit cards', 'Cash', 'Phone charger',
      'Medications', 'Emergency contacts', 'Travel itinerary'
    ],
    clothing: [
      'Underwear', 'Socks', 'T-shirts', 'Pants/Jeans', 'Jacket/Sweater',
      'Comfortable shoes', 'Formal outfit', 'Sleepwear', 'Swimwear'
    ],
    electronics: [
      'Phone', 'Charger', 'Power bank', 'Camera', 'Laptop/Tablet',
      'Headphones', 'Universal adapter', 'Cables'
    ],
    toiletries: [
      'Toothbrush', 'Toothpaste', 'Shampoo', 'Soap', 'Deodorant',
      'Sunscreen', 'Razor', 'Feminine products', 'Contact solution'
    ],
    documents: [
      'Passport', 'Visa', 'Flight tickets', 'Hotel confirmations',
      'Travel insurance', 'Driver\'s license', 'Vaccination certificates'
    ],
    entertainment: [
      'Books/E-reader', 'Downloaded movies', 'Games', 'Music playlist',
      'Travel journal', 'Guidebooks', 'Language phrasebook'
    ]
  };

  const mockWeatherData = {
    temperature: '22°C',
    condition: 'Partly Cloudy',
    humidity: '65%',
    windSpeed: '12 km/h',
    forecast: [
      { day: 'Today', temp: '22°C', condition: 'Partly Cloudy', icon: 'CloudSun' },
      { day: 'Tomorrow', temp: '25°C', condition: 'Sunny', icon: 'Sun' },
      { day: 'Wed', temp: '19°C', condition: 'Rainy', icon: 'CloudRain' },
      { day: 'Thu', temp: '23°C', condition: 'Cloudy', icon: 'Cloud' },
      { day: 'Fri', temp: '26°C', condition: 'Sunny', icon: 'Sun' }
    ]
  };

  const convertCurrency = () => {
    // Mock conversion rates
    const rates = {
      'USD-EUR': 0.85,
      'USD-GBP': 0.73,
      'USD-JPY': 110,
      'EUR-USD': 1.18,
      'GBP-USD': 1.37
    };
    const rate = rates?.[`${currencyFrom}-${currencyTo}`] || 1;
    return (parseFloat(amount) * rate)?.toFixed(2);
  };

  const tabs = [
    { id: 'currency', label: 'Currency Converter', icon: 'DollarSign' },
    { id: 'weather', label: 'Weather Forecast', icon: 'Cloud' },
    { id: 'packing', label: 'Packing List', icon: 'Package' },
    { id: 'checklist', label: 'Travel Checklist', icon: 'CheckSquare' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Travel Tools</h3>
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center ${
              activeTab === tab?.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Currency Converter */}
      {activeTab === 'currency' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e?.target?.value)}
              placeholder="Enter amount"
            />
            <Select
              label="From"
              options={currencies}
              value={currencyFrom}
              onChange={setCurrencyFrom}
            />
            <Select
              label="To"
              options={currencies}
              value={currencyTo}
              onChange={setCurrencyTo}
            />
          </div>
          <div className="bg-muted rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              {amount} {currencyFrom} = {convertCurrency()} {currencyTo}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Exchange rate: 1 {currencyFrom} = {(convertCurrency() / amount)?.toFixed(4)} {currencyTo}
            </p>
          </div>
        </div>
      )}
      {/* Weather Forecast */}
      {activeTab === 'weather' && (
        <div className="space-y-4">
          <Input
            label="City"
            type="text"
            value={weatherCity}
            onChange={(e) => setWeatherCity(e?.target?.value)}
            placeholder="Enter city name"
          />
          {weatherCity && (
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">{weatherCity}</h4>
                    <p className="text-sm text-muted-foreground">Current Weather</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">{mockWeatherData?.temperature}</p>
                    <p className="text-sm text-muted-foreground">{mockWeatherData?.condition}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="Droplets" size={16} className="text-blue-500" />
                    <span>Humidity: {mockWeatherData?.humidity}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Wind" size={16} className="text-gray-500" />
                    <span>Wind: {mockWeatherData?.windSpeed}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {mockWeatherData?.forecast?.map((day, index) => (
                  <div key={index} className="bg-background rounded-lg p-3 text-center border border-border">
                    <p className="text-xs font-medium text-muted-foreground mb-1">{day?.day}</p>
                    <Icon name={day?.icon} size={20} className="mx-auto mb-1 text-primary" />
                    <p className="text-sm font-semibold text-foreground">{day?.temp}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {/* Packing List */}
      {activeTab === 'packing' && (
        <div className="space-y-4">
          <Select
            label="Category"
            options={packingCategories}
            value={packingCategory}
            onChange={setPackingCategory}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {packingItems?.[packingCategory]?.map((item, index) => (
              <label key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-sm text-foreground">{item}</span>
              </label>
            ))}
          </div>
        </div>
      )}
      {/* Travel Checklist */}
      {activeTab === 'checklist' && (
        <div className="space-y-4">
          <div className="space-y-3">
            {[
              'Book flights and accommodation',
              'Check passport validity (6+ months)',
              'Apply for visa if required',
              'Get travel insurance',
              'Notify bank of travel plans',
              'Check vaccination requirements',
              'Download offline maps',
              'Arrange airport transportation',
              'Set up international phone plan',
              'Make copies of important documents'
            ]?.map((task, index) => (
              <label key={index} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-sm text-foreground flex-1">{task}</span>
                <Icon name="Clock" size={16} className="text-muted-foreground" />
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelTools;