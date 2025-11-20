import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CTASection = () => {
  const navigate = useNavigate();

  const benefits = [
  {
    icon: "Zap",
    title: "Instant Planning",
    description: "Get personalized itineraries in minutes, not hours"
  },
  {
    icon: "DollarSign",
    title: "Guaranteed Savings",
    description: "Save an average of $400 per trip with smart optimization"
  },
  {
    icon: "Shield",
    title: "Risk-Free",
    description: "Free to use with no hidden fees or commitments"
  }];


  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-success rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-cta/10 text-cta px-4 py-2 rounded-full text-sm font-medium">
                  <Icon name="Rocket" size={16} />
                  <span>Start Your Journey</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                  Ready to plan your next{' '}
                  <span className="text-gradient">amazing adventure?</span>
                </h2>

                <p className="text-xl text-muted-foreground leading-relaxed">
                  Join thousands of smart travelers who have transformed their trip planning experience. Start creating your perfect itinerary in just minutes.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                {benefits?.map((benefit, index) =>
                <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon name={benefit?.icon} size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{benefit?.title}</h4>
                      <p className="text-muted-foreground">{benefit?.description}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => navigate('/smart-trip-planner')}
                  className="bg-cta hover:bg-cta/90 text-lg px-8 py-4"
                  iconName="ArrowRight"
                  iconPosition="right">

                  Start Planning Free
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/route-explorer')}
                  className="text-lg px-8 py-4"
                  iconName="Map"
                  iconPosition="left">

                  Explore Routes
                </Button>
              </div>

              {/* Trust Signals */}
              <div className="flex items-center space-x-6 pt-6 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">50,000+ travelers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Star" size={16} className="text-warning" />
                  <span className="text-sm text-muted-foreground">4.9/5 rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="text-sm text-muted-foreground">100% free</span>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1631119462484-6e9b42648510"
                  alt="Excited travelers with backpacks standing on mountain peak overlooking scenic valley landscape"
                  className="w-full h-[500px] object-cover" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                
                {/* Overlay Content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">Your Next Adventure</h4>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={14} className="text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-900">4.9</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Budget Range</div>
                        <div className="font-medium text-gray-900">$800 - $1,200</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Duration</div>
                        <div className="font-medium text-gray-900">7-10 days</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-card border border-border rounded-2xl p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                    <Icon name="TrendingUp" size={24} className="text-success" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                    <div className="text-xl font-bold text-success">98.7%</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon name="Clock" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Avg. Planning Time</div>
                    <div className="text-xl font-bold text-primary">5 mins</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -left-8 bg-card border border-border rounded-xl p-3 shadow-lg transform -translate-y-1/2">
                <div className="flex items-center space-x-2">
                  <Icon name="Sparkles" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-foreground">AI-Powered</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 pt-12 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50k+</div>
              <div className="text-muted-foreground">Trips Planned</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-success mb-2">$2.1M</div>
              <div className="text-muted-foreground">Money Saved</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">156</div>
              <div className="text-muted-foreground">Countries</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-warning mb-2">4.9★</div>
              <div className="text-muted-foreground">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default CTASection;