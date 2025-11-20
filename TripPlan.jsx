import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TripPlan = ({ destination, travelDetails, onBack, onSave }) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [tripPlan, setTripPlan] = useState(null);
  const [activeTab, setActiveTab] = useState('itinerary');

  useEffect(() => {
    // Simulate trip generation
    const timer = setTimeout(() => {
      setTripPlan(generateMockTripPlan());
      setIsGenerating(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [destination, travelDetails]);

  const generateMockTripPlan = () => {
    const duration = calculateDuration();
    const dailyBudget = Math.round(travelDetails?.budget / duration);

    return {
      summary: {
        destination: destination?.name,
        duration: duration,
        totalBudget: travelDetails?.budget,
        dailyBudget: dailyBudget,
        travelStyle: travelDetails?.travelStyle,
        groupSize: travelDetails?.groupSize
      },
      itinerary: generateItinerary(duration),
      budgetBreakdown: generateBudgetBreakdown(travelDetails?.budget),
      recommendations: generateRecommendations(),
      map: {
        lat: getDestinationCoords()?.lat,
        lng: getDestinationCoords()?.lng
      }
    };
  };

  const calculateDuration = () => {
    const start = new Date(travelDetails.startDate);
    const end = new Date(travelDetails.endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  const getDestinationCoords = () => {
    const coords = {
      'Paris, France': { lat: 48.8566, lng: 2.3522 },
      'Tokyo, Japan': { lat: 35.6762, lng: 139.6503 },
      'New York City, USA': { lat: 40.7128, lng: -74.0060 },
      'Bali, Indonesia': { lat: -8.3405, lng: 115.0920 }
    };
    return coords?.[destination?.name] || { lat: 40.7128, lng: -74.0060 };
  };

  const generateItinerary = (duration) => {
    const activities = [
      {
        day: 1,
        title: "Arrival & City Orientation",
        activities: [
          { time: "10:00 AM", activity: "Airport pickup & hotel check-in", cost: "$25" },
          { time: "2:00 PM", activity: "Walking tour of historic district", cost: "$15" },
          { time: "7:00 PM", activity: "Welcome dinner at local restaurant", cost: "$45" }
        ]
      },
      {
        day: 2,
        title: "Major Attractions",
        activities: [
          { time: "9:00 AM", activity: "Visit main landmark/museum", cost: "$30" },
          { time: "1:00 PM", activity: "Lunch at popular local spot", cost: "$25" },
          { time: "3:00 PM", activity: "Guided cultural experience", cost: "$40" },
          { time: "8:00 PM", activity: "Evening entertainment", cost: "$35" }
        ]
      },
      {
        day: 3,
        title: "Local Experiences",
        activities: [
          { time: "8:00 AM", activity: "Local market visit & cooking class", cost: "$55" },
          { time: "2:00 PM", activity: "Neighborhood exploration", cost: "$10" },
          { time: "6:00 PM", activity: "Sunset viewing spot", cost: "Free" }
        ]
      }
    ];

    return activities?.slice(0, Math.min(duration, 7));
  };

  const generateBudgetBreakdown = (totalBudget) => {
    return {
      accommodation: { amount: Math.round(totalBudget * 0.35), percentage: 35 },
      food: { amount: Math.round(totalBudget * 0.25), percentage: 25 },
      transportation: { amount: Math.round(totalBudget * 0.20), percentage: 20 },
      activities: { amount: Math.round(totalBudget * 0.15), percentage: 15 },
      miscellaneous: { amount: Math.round(totalBudget * 0.05), percentage: 5 }
    };
  };

  const generateRecommendations = () => {
    return {
      packingList: [
        "Comfortable walking shoes",
        "Weather-appropriate clothing",
        "Portable charger",
        "Travel adapter",
        "First aid kit"
      ],
      tips: [
        "Book attractions in advance to avoid queues",
        "Learn basic local phrases",
        "Keep copies of important documents",
        "Download offline maps",
        "Research local customs and etiquette"
      ],
      alternatives: [
        {
          title: "Budget-Friendly Alternative",
          description: "Reduce accommodation costs by 30% with hostels",
          savings: "$" + Math.round(travelDetails?.budget * 0.1)
        },
        {
          title: "Extended Stay Option",
          description: "Add 2 more days for deeper exploration",
          additionalCost: "$" + Math.round(travelDetails?.budget * 0.3)
        }
      ]
    };
  };

  const tabs = [
    { id: 'itinerary', label: 'Itinerary', icon: 'Calendar' },
    { id: 'budget', label: 'Budget', icon: 'DollarSign' },
    { id: 'map', label: 'Map', icon: 'Map' },
    { id: 'recommendations', label: 'Tips', icon: 'Lightbulb' }
  ];

  if (isGenerating) {
    return (
      <div className="bg-card rounded-xl p-8 border border-border">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Sparkles" size={32} className="text-primary animate-pulse" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Creating Your Perfect Trip</h2>
          <p className="text-muted-foreground mb-6">
            Analyzing {destination?.name} for the best experiences within your budget...
          </p>
          <div className="w-full bg-muted rounded-full h-2 mb-4">
            <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✓ Finding best accommodation options</p>
            <p>✓ Optimizing route and activities</p>
            <p className="animate-pulse">⏳ Calculating budget breakdown...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-1">Your Trip to {tripPlan?.summary?.destination}</h2>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center space-x-1">
                <Icon name="Calendar" size={16} />
                <span>{tripPlan?.summary?.duration} days</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="DollarSign" size={16} />
                <span>${tripPlan?.summary?.totalBudget} total</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Users" size={16} />
                <span>{tripPlan?.summary?.groupSize}</span>
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">${tripPlan?.summary?.dailyBudget}</p>
            <p className="text-sm text-muted-foreground">per day</p>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === tab?.id
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'itinerary' && (
          <div className="space-y-6">
            {tripPlan?.itinerary?.map((day) => (
              <div key={day?.day} className="border border-border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Day {day?.day}: {day?.title}
                </h3>
                <div className="space-y-3">
                  {day?.activities?.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div>
                          <p className="font-medium text-foreground">{activity?.activity}</p>
                          <p className="text-sm text-muted-foreground">{activity?.time}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-primary">{activity?.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(tripPlan?.budgetBreakdown)?.map(([category, data]) => (
                <div key={category} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground capitalize">{category}</h4>
                    <span className="text-lg font-bold text-primary">${data?.amount}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mb-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${data?.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-muted-foreground">{data?.percentage}% of total budget</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="space-y-4">
            <div className="h-96 bg-muted rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title={destination?.name}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${tripPlan?.map?.lat},${tripPlan?.map?.lng}&z=14&output=embed`}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-surface rounded-lg text-center">
                <Icon name="MapPin" size={24} className="text-primary mx-auto mb-2" />
                <p className="font-medium text-foreground">Main Attractions</p>
                <p className="text-sm text-muted-foreground">5 key locations</p>
              </div>
              <div className="p-4 bg-surface rounded-lg text-center">
                <Icon name="Navigation" size={24} className="text-accent mx-auto mb-2" />
                <p className="font-medium text-foreground">Walking Distance</p>
                <p className="text-sm text-muted-foreground">2.5 km daily avg</p>
              </div>
              <div className="p-4 bg-surface rounded-lg text-center">
                <Icon name="Clock" size={24} className="text-success mx-auto mb-2" />
                <p className="font-medium text-foreground">Travel Time</p>
                <p className="text-sm text-muted-foreground">30 min between sites</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
                  <Icon name="Package" size={18} />
                  <span>Packing Essentials</span>
                </h4>
                <ul className="space-y-2">
                  {tripPlan?.recommendations?.packingList?.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm">
                      <Icon name="Check" size={14} className="text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
                  <Icon name="Lightbulb" size={18} />
                  <span>Pro Tips</span>
                </h4>
                <ul className="space-y-2">
                  {tripPlan?.recommendations?.tips?.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <Icon name="Star" size={14} className="text-accent mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-3">Alternative Options</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tripPlan?.recommendations?.alternatives?.map((alt, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <h5 className="font-medium text-foreground mb-2">{alt?.title}</h5>
                    <p className="text-sm text-muted-foreground mb-2">{alt?.description}</p>
                    <p className="text-sm font-medium text-primary">
                      {alt?.savings ? `Save ${alt?.savings}` : `+${alt?.additionalCost}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Footer Actions */}
      <div className="p-6 border-t border-border bg-surface">
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={onBack}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Modify Plan
          </Button>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              iconName="Share"
              iconPosition="left"
            >
              Share Trip
            </Button>
            <Button
              variant="default"
              onClick={() => onSave(tripPlan)}
              iconName="Save"
              iconPosition="left"
              className="bg-success hover:bg-success/90"
            >
              Save Trip
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlan;