import React from 'react';
import Icon from '../../../components/AppIcon';

const TripStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Trips',
      value: stats?.totalTrips,
      icon: 'MapPin',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+2 this month',
      changeType: 'positive'
    },
    {
      title: 'Countries Visited',
      value: stats?.countriesVisited,
      icon: 'Globe',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+1 this year',
      changeType: 'positive'
    },
    {
      title: 'Total Distance',
      value: `${stats?.totalDistance?.toLocaleString()} km`,
      icon: 'Route',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+5,420 km',
      changeType: 'positive'
    },
    {
      title: 'Money Saved',
      value: `$${stats?.moneySaved?.toLocaleString()}`,
      icon: 'PiggyBank',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '+$340 this trip',
      changeType: 'positive'
    },
    {
      title: 'Active Trips',
      value: stats?.activeTrips,
      icon: 'Plane',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      change: stats?.activeTrips > 0 ? 'In progress' : 'None active',
      changeType: stats?.activeTrips > 0 ? 'neutral' : 'neutral'
    },
    {
      title: 'Avg Trip Duration',
      value: `${stats?.avgTripDuration} days`,
      icon: 'Calendar',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      change: '+1.2 days',
      changeType: 'positive'
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${stat?.bgColor}`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
              <p className="text-sm text-muted-foreground">{stat?.title}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${getChangeColor(stat?.changeType)}`}>
              {stat?.change}
            </span>
            {stat?.changeType === 'positive' && (
              <Icon name="TrendingUp" size={16} className="text-success" />
            )}
            {stat?.changeType === 'negative' && (
              <Icon name="TrendingDown" size={16} className="text-destructive" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TripStats;