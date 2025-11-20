import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LiveActivity = () => {
  const [currentActivity, setCurrentActivity] = useState(0);

  const liveActivities = [
  {
    id: 1,
    type: "trip_planned",
    user: "Sarah M.",
    avatar: "https://images.unsplash.com/photo-1630473147136-fedd85b45f25",
    avatarAlt: "Professional headshot of young woman with brown hair and friendly smile",
    action: "just planned a trip to",
    destination: "Tokyo, Japan",
    budget: "$1,200",
    savings: "$340",
    timestamp: "2 minutes ago",
    icon: "MapPin"
  },
  {
    id: 2,
    type: "route_optimized",
    user: "Mike R.",
    avatar: "https://images.unsplash.com/photo-1585066047759-3438c34cf676",
    avatarAlt: "Professional headshot of middle-aged man with beard in business attire",
    action: "optimized their route to",
    destination: "Barcelona, Spain",
    budget: "$800",
    savings: "$180",
    timestamp: "5 minutes ago",
    icon: "Route"
  },
  {
    id: 3,
    type: "budget_saved",
    user: "Emma L.",
    avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
    avatarAlt: "Professional headshot of blonde woman in blue blazer smiling at camera",
    action: "saved money on their",
    destination: "Iceland adventure",
    budget: "$1,500",
    savings: "$420",
    timestamp: "8 minutes ago",
    icon: "DollarSign"
  },
  {
    id: 4,
    type: "trip_completed",
    user: "Alex K.",
    avatar: "https://images.unsplash.com/photo-1654564613056-2217cf8aed14",
    avatarAlt: "Professional headshot of man with glasses and casual shirt outdoors",
    action: "completed their trip to",
    destination: "Santorini, Greece",
    budget: "$1,100",
    savings: "$290",
    timestamp: "12 minutes ago",
    icon: "CheckCircle"
  },
  {
    id: 5,
    type: "destination_discovered",
    user: "Lisa P.",
    avatar: "https://images.unsplash.com/photo-1665023024202-4c8671802bf6",
    avatarAlt: "Professional headshot of woman with curly hair in professional attire",
    action: "discovered hidden gems in",
    destination: "Morocco",
    budget: "$700",
    savings: "$150",
    timestamp: "15 minutes ago",
    icon: "Eye"
  }];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % liveActivities?.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [liveActivities?.length]);

  const getActivityColor = (type) => {
    switch (type) {
      case 'trip_planned':return 'primary';
      case 'route_optimized':return 'accent';
      case 'budget_saved':return 'success';
      case 'trip_completed':return 'success';
      case 'destination_discovered':return 'warning';
      default:return 'primary';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-4">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>Live Activity</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            See what travelers are achieving right now
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join an active community of smart travelers who are planning, optimizing, and completing amazing journeys every day.
          </p>
        </div>

        {/* Live Activity Feed */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
              <div className="flex items-center space-x-2 text-sm text-success">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>Live updates</span>
              </div>
            </div>

            {/* Activity Items */}
            <div className="space-y-4">
              {liveActivities?.map((activity, index) =>
              <div
                key={activity?.id}
                className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-500 ${
                index === currentActivity ?
                'bg-primary/5 border border-primary/20 scale-105' : 'bg-muted/30 hover:bg-muted/50'}`
                }>

                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <Image
                    src={activity?.avatar}
                    alt={activity?.avatarAlt}
                    className="w-12 h-12 rounded-full object-cover" />

                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 bg-${getActivityColor(activity?.type)} rounded-full flex items-center justify-center`}>
                      <Icon name={activity?.icon} size={12} color="white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-1 text-sm">
                      <span className="font-medium text-foreground">{activity?.user}</span>
                      <span className="text-muted-foreground">{activity?.action}</span>
                      <span className="font-medium text-primary">{activity?.destination}</span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                      <span>Budget: {activity?.budget}</span>
                      <span className="text-success">Saved: {activity?.savings}</span>
                      <span>{activity?.timestamp}</span>
                    </div>
                  </div>

                  {/* Pulse Animation for Current */}
                  {index === currentActivity &&
                <div className="flex-shrink-0">
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    </div>
                }
                </div>
              )}
            </div>

            {/* Activity Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">2.4k</div>
                <div className="text-xs text-muted-foreground">Active Now</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">847</div>
                <div className="text-xs text-muted-foreground">Trips Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">$127k</div>
                <div className="text-xs text-muted-foreground">Saved Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">156</div>
                <div className="text-xs text-muted-foreground">Countries</div>
              </div>
            </div>
          </div>

          {/* Community Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={24} className="text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Active Community</h4>
              <p className="text-sm text-muted-foreground">Join 50,000+ travelers sharing tips and experiences</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name="TrendingUp" size={24} className="text-success" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Proven Results</h4>
              <p className="text-sm text-muted-foreground">Average $400 savings per trip with smart planning</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Globe" size={24} className="text-accent" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Global Reach</h4>
              <p className="text-sm text-muted-foreground">Destinations and routes across 156 countries</p>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default LiveActivity;