import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, onSwapLocations }) => {
  const [fromLocation, setFromLocation] = useState('New York, NY');
  const [toLocation, setToLocation] = useState('Los Angeles, CA');
  const [departureDate, setDepartureDate] = useState('2025-11-15');
  const [returnDate, setReturnDate] = useState('2025-11-22');
  const [passengers, setPassengers] = useState(1);

  const handleSearch = () => {
    onSearch({
      from: fromLocation,
      to: toLocation,
      departure: departureDate,
      return: returnDate,
      passengers: passengers
    });
  };

  const handleSwap = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
    onSwapLocations();
  };

  const recentSearches = [
    "San Francisco, CA",
    "Chicago, IL",
    "Miami, FL",
    "Seattle, WA"
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Search" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-card-foreground">Find Your Route</h2>
      </div>
      <div className="space-y-4">
        {/* Location Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Input
              label="From"
              type="text"
              value={fromLocation}
              onChange={(e) => setFromLocation(e?.target?.value)}
              placeholder="Enter departure city"
              className="pr-10"
            />
            <Icon 
              name="MapPin" 
              size={16} 
              className="absolute right-3 top-9 text-muted-foreground" 
            />
          </div>

          <div className="relative">
            <Input
              label="To"
              type="text"
              value={toLocation}
              onChange={(e) => setToLocation(e?.target?.value)}
              placeholder="Enter destination city"
              className="pr-10"
            />
            <Icon 
              name="Navigation" 
              size={16} 
              className="absolute right-3 top-9 text-muted-foreground" 
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSwap}
            iconName="ArrowUpDown"
            className="border-dashed"
          >
            Swap
          </Button>
        </div>

        {/* Date and Passenger Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Departure Date"
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e?.target?.value)}
          />
          
          <Input
            label="Return Date"
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e?.target?.value)}
          />

          <div className="relative">
            <Input
              label="Passengers"
              type="number"
              min="1"
              max="10"
              value={passengers}
              onChange={(e) => setPassengers(parseInt(e?.target?.value))}
            />
            <Icon 
              name="Users" 
              size={16} 
              className="absolute right-3 top-9 text-muted-foreground" 
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-center pt-2">
          <Button
            variant="default"
            size="lg"
            onClick={handleSearch}
            iconName="Search"
            iconPosition="left"
            className="bg-primary hover:bg-primary/90 px-8"
          >
            Search Routes
          </Button>
        </div>

        {/* Recent Searches */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-card-foreground">Recent Searches</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches?.map((location, index) => (
              <button
                key={index}
                onClick={() => setToLocation(location)}
                className="px-3 py-1 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-card-foreground text-sm rounded-full transition-colors duration-200"
              >
                {location}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Options */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Zap" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-card-foreground">Quick Options</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button variant="outline" size="sm" iconName="Clock">
              Fastest
            </Button>
            <Button variant="outline" size="sm" iconName="DollarSign">
              Cheapest
            </Button>
            <Button variant="outline" size="sm" iconName="Compass">
              Scenic
            </Button>
            <Button variant="outline" size="sm" iconName="Star">
              Popular
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;