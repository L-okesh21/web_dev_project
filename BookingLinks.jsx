import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const BookingLinks = ({ destination, travelDetails }) => {
  const [activeCategory, setActiveCategory] = useState('transport');

  const bookingCategories = {
    transport: {
      title: 'Transportation',
      icon: 'Plane',
      color: 'text-blue-600',
      services: [
        {
          name: 'RedBus',
          description: 'Book bus tickets across India',
          icon: 'Bus',
          url: 'https://www.redbus.in',
          color: 'bg-red-500',
          popular: true
        },
        {
          name: 'IRCTC',
          description: 'Indian Railways ticket booking',
          icon: 'Train',
          url: 'https://www.irctc.co.in',
          color: 'bg-blue-600',
          popular: true
        },
        {
          name: 'MakeMyTrip',
          description: 'Flights, trains, and buses',
          icon: 'Plane',
          url: 'https://www.makemytrip.com',
          color: 'bg-orange-500',
          popular: false
        },
        {
          name: 'Goibibo',
          description: 'Flight and bus bookings',
          icon: 'Plane',
          url: 'https://www.goibibo.com',
          color: 'bg-purple-600',
          popular: false
        }
      ]
    },
    accommodation: {
      title: 'Hotels & Stays',
      icon: 'Hotel',
      color: 'text-green-600',
      services: [
        {
          name: 'Booking.com',
          description: 'Hotels and vacation rentals worldwide',
          icon: 'Hotel',
          url: 'https://www.booking.com',
          color: 'bg-blue-700',
          popular: true
        },
        {
          name: 'Airbnb',
          description: 'Unique stays and experiences',
          icon: 'Home',
          url: 'https://www.airbnb.com',
          color: 'bg-red-500',
          popular: true
        },
        {
          name: 'OYO',
          description: 'Budget hotels and homes',
          icon: 'Hotel',
          url: 'https://www.oyorooms.com',
          color: 'bg-red-600',
          popular: false
        },
        {
          name: 'Agoda',
          description: 'Hotels with best price guarantee',
          icon: 'Hotel',
          url: 'https://www.agoda.com',
          color: 'bg-purple-600',
          popular: false
        }
      ]
    },
    experiences: {
      title: 'Tours & Activities',
      icon: 'Camera',
      color: 'text-purple-600',
      services: [
        {
          name: 'GetYourGuide',
          description: 'Tours, activities, and attractions',
          icon: 'Camera',
          url: 'https://www.getyourguide.com',
          color: 'bg-blue-500',
          popular: true
        },
        {
          name: 'Viator',
          description: 'Travel experiences and tours',
          icon: 'MapPin',
          url: 'https://www.viator.com',
          color: 'bg-green-600',
          popular: true
        },
        {
          name: 'Klook',
          description: 'Activities and travel services',
          icon: 'Ticket',
          url: 'https://www.klook.com',
          color: 'bg-orange-500',
          popular: false
        },
        {
          name: 'Thrillophilia',
          description: 'Adventure tours and activities',
          icon: 'Mountain',
          url: 'https://www.thrillophilia.com',
          color: 'bg-red-500',
          popular: false
        }
      ]
    }
  };

  const buildSearchUrl = (service, category) => {
    if (!destination) return service?.url;

    const destinationName = encodeURIComponent(destination?.name || '');
    const startDate = travelDetails?.startDate ? new Date(travelDetails?.startDate)?.toISOString()?.split('T')?.[0] : '';
    const endDate = travelDetails?.endDate ? new Date(travelDetails?.endDate)?.toISOString()?.split('T')?.[0] : '';
    
    // Build specific URLs for popular services
    switch (service?.name) {
      case 'RedBus':
        return `${service?.url}?from=&to=${destinationName}`;
      case 'IRCTC':
        return `${service?.url}`;
      case 'Booking.com':
        return `${service?.url}/searchresults.html?ss=${destinationName}&checkin=${startDate}&checkout=${endDate}`;
      case 'Airbnb':
        return `${service?.url}/s/${destinationName}`;
      case 'MakeMyTrip':
        return `${service?.url}/flight/search?to=${destinationName}`;
      default:
        return service?.url;
    }
  };

  const handleServiceClick = (service, category) => {
    const url = buildSearchUrl(service, category);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="ExternalLink" size={20} className="text-primary" />
          <span>Quick Bookings</span>
        </h3>
        {destination && (
          <div className="text-sm text-muted-foreground">
            for {destination?.name}
          </div>
        )}
      </div>
      {/* Category Tabs */}
      <div className="flex space-x-1 mb-6 bg-surface rounded-lg p-1">
        {Object.entries(bookingCategories)?.map(([key, category]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              activeCategory === key
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-background'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            <span className="hidden sm:inline">{category?.title}</span>
          </button>
        ))}
      </div>
      {/* Services Grid */}
      <div className="space-y-3">
        {bookingCategories?.[activeCategory]?.services?.map((service, index) => (
          <div
            key={index}
            onClick={() => handleServiceClick(service, activeCategory)}
            className="group flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/30 cursor-pointer transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${service?.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <Icon name={service?.icon} size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {service?.name}
                  </p>
                  {service?.popular && (
                    <span className="bg-accent/20 text-accent text-xs px-2 py-0.5 rounded-full font-medium">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{service?.description}</p>
              </div>
            </div>
            <Icon 
              name="ExternalLink" 
              size={16} 
              className="text-muted-foreground group-hover:text-primary transition-colors" 
            />
          </div>
        ))}
      </div>
      {!destination && (
        <div className="text-center py-8">
          <Icon name="MapPin" size={32} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">
            Select a destination to get personalized booking links
          </p>
        </div>
      )}
      {/* Quick Tips */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Info" size={16} className="text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Booking Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Compare prices across multiple platforms</li>
              <li>• Book refundable options when possible</li>
              <li>• Check cancellation policies before booking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingLinks;