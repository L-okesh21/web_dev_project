import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TripCard = ({ trip, onShare, onEdit }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'upcoming':
        return 'bg-primary text-primary-foreground';
      case 'completed':
        return 'bg-muted text-muted-foreground';
      case 'planning':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysRemaining = (startDate) => {
    const today = new Date();
    const tripDate = new Date(startDate);
    const diffTime = tripDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Trip Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={trip?.image}
          alt={trip?.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trip?.status)}`}>
            {trip?.status?.charAt(0)?.toUpperCase() + trip?.status?.slice(1)}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <button
            onClick={() => onShare(trip)}
            className="p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors duration-200"
          >
            <Icon name="Share2" size={16} />
          </button>
        </div>
      </div>
      {/* Trip Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-1">
            {trip?.destination}
          </h3>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="Calendar" size={14} />
            <span>{trip?.duration} days</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={14} />
            <span>{trip?.locations} locations</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="DollarSign" size={14} />
            <span>${trip?.budget?.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-sm">
            <span className="text-muted-foreground">
              {formatDate(trip?.startDate)} - {formatDate(trip?.endDate)}
            </span>
          </div>
          {trip?.status === 'upcoming' && (
            <div className="text-sm font-medium text-primary">
              {getDaysRemaining(trip?.startDate)} days to go
            </div>
          )}
        </div>

        {/* Progress Bar for Active Trips */}
        {trip?.status === 'active' && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Trip Progress</span>
              <span className="text-foreground font-medium">{trip?.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${trip?.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Expense Tracking for Active/Completed Trips */}
        {(trip?.status === 'active' || trip?.status === 'completed') && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Spent</span>
              <span className={`font-medium ${
                trip?.spent > trip?.budget ? 'text-destructive' : 'text-success'
              }`}>
                ${trip?.spent?.toLocaleString()} / ${trip?.budget?.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  trip?.spent > trip?.budget ? 'bg-destructive' : 'bg-success'
                }`}
                style={{ width: `${Math.min((trip?.spent / trip?.budget) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onEdit(trip)}
            iconName="Edit"
            iconPosition="left"
          >
            Edit
          </Button>
          <Link to={`/trip-dashboard/${trip?.id}`} className="flex-1">
            <Button variant="default" size="sm" fullWidth>
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TripCard;