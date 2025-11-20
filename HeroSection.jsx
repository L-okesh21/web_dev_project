import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const HeroSection = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [travelDates, setTravelDates] = useState('');

  const budgetOptions = [
  { value: '500-1000', label: '$500 - $1,000' },
  { value: '1000-2500', label: '$1,000 - $2,500' },
  { value: '2500-5000', label: '$2,500 - $5,000' },
  { value: '5000+', label: '$5,000+' }];


  const handleStartPlanning = () => {
    navigate('/smart-trip-planner');
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-success rounded-full blur-2xl"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-6rem)]">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Icon name="Sparkles" size={16} />
              <span>Smart Travel Planning Platform</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Smart travel starts with{' '}
                <span className="text-gradient">smart planning</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Your budget doesn't limit your dreams, it focuses them. Transform travel planning from stressful research into an intuitive, data-driven experience.
              </p>
            </div>

            {/* Social Proof Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary">50,000+</div>
                <div className="text-sm text-muted-foreground">Trips Planned</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-success">$400</div>
                <div className="text-sm text-muted-foreground">Average Savings</div>
              </div>
            </div>

            {/* Quick Search Form */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">Start Your Journey</h3>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Where do you want to go?"
                  value={destination}
                  onChange={(e) => setDestination(e?.target?.value)}
                  className="w-full" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    placeholder="Select budget range"
                    options={budgetOptions}
                    value={budget}
                    onChange={setBudget} />

                  <Input
                    type="date"
                    placeholder="Travel dates"
                    value={travelDates}
                    onChange={(e) => setTravelDates(e?.target?.value)} />

                </div>
                <Button
                  variant="default"
                  fullWidth
                  className="bg-cta hover:bg-cta/90"
                  onClick={handleStartPlanning}
                  iconName="ArrowRight"
                  iconPosition="right">

                  Start Planning Your Trip
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/route-explorer')}
                iconName="Map"
                iconPosition="left">

                Explore Routes
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/budget-optimizer')}
                iconName="Calculator"
                iconPosition="left">

                Budget Tools
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/trip-dashboard')}
                iconName="BarChart3"
                iconPosition="left">

                View Dashboard
              </Button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            {/* Main Hero Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1576603233026-571280f1c3ec"
                alt="Aerial view of winding mountain road through lush green landscape with travelers planning their route"
                className="w-full h-[500px] object-cover" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="DollarSign" size={20} className="text-success" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Budget Saved</div>
                  <div className="text-lg font-bold text-success">$847</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="MapPin" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Destinations</div>
                  <div className="text-lg font-bold text-primary">127</div>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 -left-6 bg-card border border-border rounded-xl p-3 shadow-lg">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-accent" />
                <span className="text-sm font-medium text-foreground">2.4k active planners</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={24} className="text-muted-foreground" />
      </div>
    </section>);

};

export default HeroSection;