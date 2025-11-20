import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeatureShowcase = () => {
  const navigate = useNavigate();

  const features = [
  {
    id: 1,
    icon: "Brain",
    title: "Smart Trip Planner",
    description: "AI-powered planning that creates personalized itineraries based on your budget, preferences, and travel style.",
    image: "https://images.unsplash.com/photo-1728996896909-db7da8aef03e",
    imageAlt: "Person using laptop with travel planning interface showing maps and budget calculations",
    benefits: ["Personalized Itineraries", "Budget Optimization", "Real-time Updates"],
    route: "/smart-trip-planner",
    color: "primary"
  },
  {
    id: 2,
    icon: "Map",
    title: "Route Explorer",
    description: "Discover multiple route options with real-time traffic, cost comparisons, and hidden gems along the way.",
    image: "https://images.unsplash.com/photo-1616710679107-5893e3eba222",
    imageAlt: "Interactive map interface showing multiple travel routes with cost and time comparisons",
    benefits: ["Multiple Route Options", "Cost Comparisons", "Hidden Gems"],
    route: "/route-explorer",
    color: "accent"
  },
  {
    id: 3,
    icon: "Calculator",
    title: "Budget Optimizer",
    description: "Comprehensive financial planning tools that break down expenses and suggest cost-saving alternatives.",
    image: "https://images.unsplash.com/photo-1724833256463-26b199dc1b69",
    imageAlt: "Budget planning dashboard showing expense categories, savings opportunities, and financial charts",
    benefits: ["Expense Breakdown", "Savings Suggestions", "Price Alerts"],
    route: "/budget-optimizer",
    color: "success"
  }];


  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Zap" size={16} />
            <span>Powerful Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything you need for perfect trips
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From initial inspiration to budget-conscious execution, TripCraft provides intelligent tools that transform travel planning from stressful research into an intuitive experience.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-20">
          {features?.map((feature, index) =>
          <div
            key={feature?.id}
            className={`grid lg:grid-cols-2 gap-12 items-center ${
            index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`
            }>

              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-${feature?.color}/10 rounded-xl flex items-center justify-center`}>
                    <Icon name={feature?.icon} size={24} className={`text-${feature?.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{feature?.title}</h3>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  {feature?.description}
                </p>

                {/* Benefits */}
                <div className="space-y-3">
                  {feature?.benefits?.map((benefit, benefitIndex) =>
                <div key={benefitIndex} className="flex items-center space-x-3">
                      <div className={`w-5 h-5 bg-${feature?.color} rounded-full flex items-center justify-center`}>
                        <Icon name="Check" size={12} color="white" strokeWidth={3} />
                      </div>
                      <span className="text-foreground font-medium">{benefit}</span>
                    </div>
                )}
                </div>

                <div className="pt-4">
                  <Button
                  variant="default"
                  size="lg"
                  onClick={() => navigate(feature?.route)}
                  iconName="ArrowRight"
                  iconPosition="right"
                  className={feature?.color === 'primary' ? 'bg-primary hover:bg-primary/90' :
                  feature?.color === 'accent' ? 'bg-accent hover:bg-accent/90' : 'bg-success hover:bg-success/90'}>

                    Try {feature?.title}
                  </Button>
                </div>
              </div>

              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                  src={feature?.image}
                  alt={feature?.imageAlt}
                  className="w-full h-[400px] object-cover" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>

                {/* Floating Stats */}
                <div className="absolute -top-4 -right-4 bg-card border border-border rounded-xl p-4 shadow-lg">
                  <div className="text-center">
                    <div className={`text-2xl font-bold text-${feature?.color}`}>
                      {feature?.id === 1 ? '98%' : feature?.id === 2 ? '15+' : '$400'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {feature?.id === 1 ? 'Accuracy' : feature?.id === 2 ? 'Routes' : 'Avg Savings'}
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-3 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} className={`text-${feature?.color}`} />
                    <span className="text-sm font-medium text-foreground">
                      {feature?.id === 1 ? '12k+ users' : feature?.id === 2 ? '8k+ routes' : '5k+ optimized'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-16 border-t border-border">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to start planning smarter?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of travelers who have transformed their trip planning experience with TripCraft's intelligent tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              onClick={() => navigate('/smart-trip-planner')}
              className="bg-cta hover:bg-cta/90"
              iconName="Compass"
              iconPosition="left">

              Start Planning Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/trip-dashboard')}
              iconName="BarChart3"
              iconPosition="left">

              View Dashboard
            </Button>
          </div>
        </div>
      </div>
    </section>);

};

export default FeatureShowcase;