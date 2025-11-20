import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const DestinationSearch = ({ onDestinationSelect, selectedDestination }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const popularDestinations = [
  {
    id: 1,
    name: "Paris, France",
    country: "France",
    image: "https://images.unsplash.com/photo-1638560597507-6b46ddd1deea",
    alt: "Aerial view of Paris with Eiffel Tower prominently displayed against city skyline at sunset",
    avgCost: "$150-200/day",
    bestTime: "Apr-Jun, Sep-Oct",
    highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame"]
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1705615791233-7d9d9a5fe12a",
    alt: "Modern Tokyo cityscape with illuminated skyscrapers and neon signs at night",
    avgCost: "$120-180/day",
    bestTime: "Mar-May, Sep-Nov",
    highlights: ["Shibuya Crossing", "Mount Fuji", "Senso-ji Temple"]
  },
  {
    id: 3,
    name: "New York City, USA",
    country: "United States",
    image: "https://images.unsplash.com/photo-1629754956560-e7355365730e",
    alt: "Manhattan skyline with Empire State Building and Central Park visible from aerial perspective",
    avgCost: "$180-250/day",
    bestTime: "Apr-Jun, Sep-Nov",
    highlights: ["Times Square", "Central Park", "Statue of Liberty"]
  },
  {
    id: 4,
    name: "Bali, Indonesia",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1627223664399-4f7e0c9de0c3",
    alt: "Traditional Balinese temple with ornate stone architecture surrounded by lush tropical vegetation",
    avgCost: "$50-80/day",
    bestTime: "Apr-Oct",
    highlights: ["Ubud Rice Terraces", "Tanah Lot Temple", "Seminyak Beach"]
  }];


  const searchSuggestions = [
  "London, United Kingdom",
  "Rome, Italy",
  "Barcelona, Spain",
  "Amsterdam, Netherlands",
  "Prague, Czech Republic",
  "Vienna, Austria",
  "Budapest, Hungary",
  "Lisbon, Portugal"];


  const handleSearchChange = (e) => {
    setSearchQuery(e?.target?.value);
    setShowSuggestions(e?.target?.value?.length > 0);
  };

  const handleDestinationClick = (destination) => {
    onDestinationSelect(destination);
    setSearchQuery(destination?.name);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    const mockDestination = {
      id: Date.now(),
      name: suggestion,
      country: suggestion?.split(', ')?.[1],
      avgCost: "$100-150/day",
      bestTime: "Year-round"
    };
    onDestinationSelect(mockDestination);
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const filteredSuggestions = searchSuggestions?.filter((suggestion) =>
  suggestion?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="MapPin" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Where do you want to go?</h2>
          <p className="text-sm text-muted-foreground">Search destinations or browse popular options</p>
        </div>
      </div>
      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Search destinations (e.g., Paris, Tokyo, New York)"
          value={searchQuery}
          onChange={handleSearchChange}
          className="pr-12" />

        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Icon name="Search" size={20} className="text-muted-foreground" />
        </div>

        {showSuggestions && filteredSuggestions?.length > 0 &&
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            {filteredSuggestions?.map((suggestion, index) =>
          <button
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            className="w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg">

                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{suggestion}</span>
                </div>
              </button>
          )}
          </div>
        }
      </div>
      {selectedDestination &&
      <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <div>
                <p className="font-medium text-foreground">{selectedDestination?.name}</p>
                <p className="text-sm text-muted-foreground">Selected destination</p>
              </div>
            </div>
            <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onDestinationSelect(null);
              setSearchQuery('');
            }}>

              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>
      }
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">Popular Destinations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {popularDestinations?.map((destination) =>
          <div
            key={destination?.id}
            onClick={() => handleDestinationClick(destination)}
            className="group cursor-pointer bg-surface rounded-lg overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">

              <div className="relative h-32 overflow-hidden">
                <img
                src={destination?.image}
                alt={destination?.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2 left-3 text-white">
                  <p className="font-medium text-sm">{destination?.name}</p>
                  <p className="text-xs opacity-90">{destination?.avgCost}</p>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Best time:</span>
                  <span className="text-xs font-medium text-foreground">{destination?.bestTime}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {destination?.highlights?.slice(0, 2)?.map((highlight, index) =>
                <span
                  key={index}
                  className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">

                      {highlight}
                    </span>
                )}
                  {destination?.highlights?.length > 2 &&
                <span className="text-xs text-muted-foreground">+{destination?.highlights?.length - 2} more</span>
                }
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);

};

export default DestinationSearch;