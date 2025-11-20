import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RouteCard = ({ route, isSelected, onSelect, onBookmark }) => {
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const getTransportIcon = (type) => {
    const icons = {
      car: 'Car',
      plane: 'Plane',
      train: 'Train',
      bus: 'Bus',
      walking: 'MapPin'
    };
    return icons?.[type] || 'MapPin';
  };

  const getTrafficColor = (level) => {
    const colors = {
      light: 'text-success',
      moderate: 'text-warning',
      heavy: 'text-destructive'
    };
    return colors?.[level] || 'text-muted-foreground';
  };

  return (
    <div 
      className={`bg-card border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isSelected ? 'border-primary shadow-md bg-primary/5' : 'border-border hover:border-primary/50'
      }`}
      onClick={onSelect}
    >
      {/* Route Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
            <Icon name={getTransportIcon(route?.transport)} size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{route?.name}</h3>
            <p className="text-sm text-muted-foreground">{route?.description}</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e?.stopPropagation();
            onBookmark(route?.id);
          }}
          className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
        >
          <Icon 
            name={route?.isBookmarked ? 'Bookmark' : 'BookmarkPlus'} 
            size={18} 
            className={route?.isBookmarked ? 'text-primary' : 'text-muted-foreground'} 
          />
        </button>
      </div>
      {/* Route Stats */}
      <div className="grid grid-cols-3 gap-4 mb-3">
        <div className="text-center">
          <div className="text-lg font-bold text-card-foreground">{formatDuration(route?.duration)}</div>
          <div className="text-xs text-muted-foreground">Duration</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-card-foreground">{route?.distance}</div>
          <div className="text-xs text-muted-foreground">Distance</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-card-foreground">{formatCurrency(route?.cost)}</div>
          <div className="text-xs text-muted-foreground">Est. Cost</div>
        </div>
      </div>
      {/* Traffic & Stops */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={14} className={getTrafficColor(route?.traffic)} />
          <span className={`text-sm capitalize ${getTrafficColor(route?.traffic)}`}>
            {route?.traffic} traffic
          </span>
        </div>
        {route?.stops > 0 && (
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{route?.stops} stops</span>
          </div>
        )}
      </div>
      {/* Route Features */}
      {route?.features && route?.features?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {route?.features?.map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          iconName="Eye"
          iconPosition="left"
        >
          View Details
        </Button>
        <Button 
          variant={isSelected ? "default" : "secondary"} 
          size="sm" 
          className="flex-1"
          iconName="Navigation"
          iconPosition="left"
        >
          {isSelected ? 'Selected' : 'Select Route'}
        </Button>
      </div>
      {/* Community Rating */}
      {route?.rating && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="text-warning fill-current" />
            <span className="text-sm font-medium text-card-foreground">{route?.rating}</span>
            <span className="text-sm text-muted-foreground">({route?.reviews} reviews)</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {route?.lastUsed}
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteCard;