import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TrendingDestinations = () => {
  const navigate = useNavigate();

  const trendingDestinations = [
  {
    id: 1,
    name: "Santorini, Greece",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1662121783914-9ee843f21504",
    imageAlt: "White-washed buildings with blue domes overlooking the Aegean Sea in Santorini",
    avgBudget: "$1,200",
    duration: "5-7 days",
    trending: "+15%",
    description: "Stunning sunsets and iconic blue-domed churches make this Greek island paradise irresistible.",
    bestTime: "Apr-Oct",
    highlights: ["Sunset Views", "Wine Tasting", "Beach Clubs"]
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1557409362-fb339d4a0cf5",
    imageAlt: "Traditional Japanese temple with red torii gates surrounded by cherry blossoms in Kyoto",
    avgBudget: "$900",
    duration: "4-6 days",
    trending: "+22%",
    description: "Ancient temples, traditional gardens, and authentic cultural experiences await in Japan's former capital.",
    bestTime: "Mar-May, Sep-Nov",
    highlights: ["Temple Tours", "Cherry Blossoms", "Traditional Cuisine"]
  },
  {
    id: 3,
    name: "Reykjavik, Iceland",
    country: "Iceland",
    image: "https://images.unsplash.com/photo-1567442089877-dddeff132609",
    imageAlt: "Northern lights dancing over colorful houses in Reykjavik with snow-covered mountains in background",
    avgBudget: "$1,500",
    duration: "6-8 days",
    trending: "+8%",
    description: "Northern lights, geothermal spas, and dramatic landscapes create unforgettable Nordic adventures.",
    bestTime: "Sep-Mar (Northern Lights)",
    highlights: ["Northern Lights", "Blue Lagoon", "Golden Circle"]
  },
  {
    id: 4,
    name: "Marrakech, Morocco",
    country: "Morocco",
    image: "https://images.unsplash.com/photo-1675782357245-9e6187773ea7",
    imageAlt: "Bustling Moroccan marketplace with colorful spices, textiles, and traditional architecture in Marrakech",
    avgBudget: "$700",
    duration: "4-5 days",
    trending: "+18%",
    description: "Vibrant souks, stunning palaces, and rich cultural heritage make Morocco's red city captivating.",
    bestTime: "Oct-Apr",
    highlights: ["Medina Markets", "Atlas Mountains", "Desert Tours"]
  }];


  const handleExploreDestination = (destination) => {
    navigate('/smart-trip-planner', { state: { destination: destination?.name } });
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="TrendingUp" size={16} />
            <span>Trending Now</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Popular Destinations This Month
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover where smart travelers are heading next. These destinations are trending based on searches, bookings, and community recommendations.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trendingDestinations?.map((destination) =>
          <div
            key={destination?.id}
            className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            onClick={() => handleExploreDestination(destination)}>

              {/* Image */}
              <div className="relative overflow-hidden">
                <Image
                src={destination?.image}
                alt={destination?.imageAlt}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />

                <div className="absolute top-3 right-3 bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
                  {destination?.trending}
                </div>
                <div className="absolute bottom-3 left-3 bg-black/50 text-white px-2 py-1 rounded-lg text-xs">
                  {destination?.bestTime}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1">
                      {destination?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{destination?.country}</p>
                  </div>
                  <Icon name="Heart" size={20} className="text-muted-foreground hover:text-destructive transition-colors cursor-pointer" />
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {destination?.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {destination?.highlights?.slice(0, 2)?.map((highlight, index) =>
                <span
                  key={index}
                  className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">

                      {highlight}
                    </span>
                )}
                </div>

                {/* Budget & Duration */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Icon name="DollarSign" size={14} className="text-success" />
                    <span className="font-medium text-foreground">{destination?.avgBudget}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} className="text-muted-foreground" />
                    <span className="text-muted-foreground">{destination?.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/route-explorer')}
            iconName="Globe"
            iconPosition="left">

            Explore All Destinations
          </Button>
        </div>
      </div>
    </section>);

};

export default TrendingDestinations;