import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onCreateTrip, onViewAnalytics }) => {
  const quickActionItems = [
    {
      title: 'Plan New Trip',
      description: 'Start planning your next adventure',
      icon: 'Plus',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      action: onCreateTrip,
      type: 'button'
    },
    {
      title: 'Smart Planner',
      description: 'Use AI to optimize your itinerary',
      icon: 'Brain',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      link: '/smart-trip-planner',
      type: 'link'
    },
    {
      title: 'Route Explorer',
      description: 'Discover new routes and paths',
      icon: 'Map',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      link: '/route-explorer',
      type: 'link'
    },
    {
      title: 'Budget Optimizer',
      description: 'Optimize your travel budget',
      icon: 'Calculator',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      link: '/budget-optimizer',
      type: 'link'
    },
    {
      title: 'View Analytics',
      description: 'See your travel patterns and insights',
      icon: 'BarChart3',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      action: onViewAnalytics,
      type: 'button'
    },
    {
      title: 'Account Settings',
      description: 'Manage your preferences',
      icon: 'Settings',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      link: '/account-settings',
      type: 'link'
    }
  ];

  const renderActionItem = (item, index) => {
    const content = (
      <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group h-full">
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-lg ${item?.bgColor} group-hover:scale-110 transition-transform duration-300`}>
            <Icon name={item?.icon} size={24} className={item?.color} />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
              {item?.title}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item?.description}
            </p>
          </div>
          <Icon name="ArrowRight" size={20} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>
    );

    if (item?.type === 'link') {
      return (
        <Link key={index} to={item?.link} className="block h-full">
          {content}
        </Link>
      );
    }

    return (
      <button key={index} onClick={item?.action} className="block w-full h-full text-left">
        {content}
      </button>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <Button variant="ghost" size="sm" iconName="MoreHorizontal">
          More
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActionItems?.map((item, index) => renderActionItem(item, index))}
      </div>
      {/* Featured Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-4">Featured Actions</h4>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" iconName="Share2" iconPosition="left">
            Share Trip
          </Button>
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
            Export Data
          </Button>
          <Button variant="outline" size="sm" iconName="Users" iconPosition="left">
            Invite Friends
          </Button>
          <Button variant="outline" size="sm" iconName="Bell" iconPosition="left">
            Set Reminders
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;