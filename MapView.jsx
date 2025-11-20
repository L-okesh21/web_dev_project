import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ selectedRoute, routes, onRouteSelect }) => {
  const [mapStyle, setMapStyle] = useState('roadmap');
  const [showTraffic, setShowTraffic] = useState(true);

  const mapStyles = [
    { id: 'roadmap', name: 'Road', icon: 'Map' },
    { id: 'satellite', name: 'Satellite', icon: 'Satellite' },
    { id: 'terrain', name: 'Terrain', icon: 'Mountain' }
  ];

  // Mock coordinates for demonstration
  const mockCoordinates = {
    start: { lat: 40.7128, lng: -74.0060 }, // New York
    end: { lat: 34.0522, lng: -118.2437 }   // Los Angeles
  };

  const generateMapUrl = () => {
    const { start, end } = mockCoordinates;
    return `https://www.google.com/maps?q=${start?.lat},${start?.lng}&destination=${end?.lat},${end?.lng}&z=6&output=embed`;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden h-full flex flex-col">
      {/* Map Controls */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-card-foreground">Route Map</h3>
          <div className="flex items-center space-x-2">
            {mapStyles?.map((style) => (
              <button
                key={style?.id}
                onClick={() => setMapStyle(style?.id)}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  mapStyle === style?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background text-muted-foreground hover:bg-muted'
                }`}
                title={style?.name}
              >
                <Icon name={style?.icon} size={16} />
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowTraffic(!showTraffic)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm transition-colors duration-200 ${
                showTraffic
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-muted-foreground hover:bg-muted'
              }`}
            >
              <Icon name="Activity" size={14} />
              <span>Traffic</span>
            </button>
            <div className="text-sm text-muted-foreground">
              {routes?.length} routes available
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Maximize2">
              Fullscreen
            </Button>
            <Button variant="outline" size="sm" iconName="Share2">
              Share
            </Button>
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className="flex-1 relative">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Route Explorer Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={generateMapUrl()}
          className="border-0"
        />

        {/* Route Overlay Controls */}
        <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <div className="space-y-2">
            <div className="text-sm font-medium text-card-foreground mb-2">Active Routes</div>
            {routes?.slice(0, 3)?.map((route, index) => (
              <button
                key={route?.id}
                onClick={() => onRouteSelect(route)}
                className={`flex items-center space-x-2 w-full p-2 rounded-lg text-left transition-colors duration-200 ${
                  selectedRoute?.id === route?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-card-foreground'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${
                  index === 0 ? 'bg-success' : index === 1 ? 'bg-warning' : 'bg-destructive'
                }`} />
                <div className="flex-1">
                  <div className="text-sm font-medium">{route?.name}</div>
                  <div className="text-xs opacity-75">{route?.duration}min • ${route?.cost}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 right-4 bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <div className="space-y-2">
            <div className="text-sm font-medium text-card-foreground mb-2">Legend</div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full" />
                <span className="text-xs text-muted-foreground">Fastest Route</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning rounded-full" />
                <span className="text-xs text-muted-foreground">Balanced Route</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-destructive rounded-full" />
                <span className="text-xs text-muted-foreground">Cheapest Route</span>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {!selectedRoute && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              <Icon name="MapPin" size={48} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Select a route to view on map</p>
            </div>
          </div>
        )}
      </div>
      {/* Quick Stats */}
      {selectedRoute && (
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-card-foreground">{selectedRoute?.duration}min</div>
              <div className="text-xs text-muted-foreground">Duration</div>
            </div>
            <div>
              <div className="text-lg font-bold text-card-foreground">{selectedRoute?.distance}</div>
              <div className="text-xs text-muted-foreground">Distance</div>
            </div>
            <div>
              <div className="text-lg font-bold text-card-foreground">${selectedRoute?.cost}</div>
              <div className="text-xs text-muted-foreground">Est. Cost</div>
            </div>
            <div>
              <div className={`text-lg font-bold capitalize ${
                selectedRoute?.traffic === 'light' ? 'text-success' :
                selectedRoute?.traffic === 'moderate' ? 'text-warning' : 'text-destructive'
              }`}>
                {selectedRoute?.traffic}
              </div>
              <div className="text-xs text-muted-foreground">Traffic</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;