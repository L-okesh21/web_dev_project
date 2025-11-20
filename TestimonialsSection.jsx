import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
  {
    id: 1,
    name: "Jessica Chen",
    role: "Digital Marketing Manager",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1668049221564-862149a48e10",
    avatarAlt: "Professional headshot of Asian woman with long black hair in business attire smiling",
    rating: 5,
    text: `TripCraft transformed my approach to travel planning completely. I saved $680 on my Europe trip while discovering routes I never would have found on my own. The budget optimizer is incredibly accurate and the route suggestions opened up possibilities I hadn't considered.`,
    tripDetails: {
      destination: "Europe (5 countries)",
      duration: "14 days",
      savings: "$680",
      originalBudget: "$3,200"
    },
    highlight: "Saved $680 on European adventure"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Software Engineer",
    location: "Austin, TX",
    avatar: "https://images.unsplash.com/photo-1680339566696-7d1386da3032",
    avatarAlt: "Professional headshot of Hispanic man with beard wearing casual shirt and glasses",
    rating: 5,
    text: `As someone who loves data and efficiency, TripCraft speaks my language. The route optimization algorithms are impressive, and I appreciate how transparent they are about costs. Used it for three trips this year and each one was perfectly planned.`,
    tripDetails: {
      destination: "Japan & South Korea",
      duration: "10 days",
      savings: "$420",
      originalBudget: "$2,800"
    },
    highlight: "Three perfectly optimized trips"
  },
  {
    id: 3,
    name: "Sarah Williams",
    role: "Freelance Designer",
    location: "Portland, OR",
    avatar: "https://images.unsplash.com/photo-1578874619973-3771f025f757",
    avatarAlt: "Professional headshot of woman with red hair and creative styling in modern office setting",
    rating: 5,
    text: `I was skeptical about travel planning apps, but TripCraft proved me wrong. The community recommendations were spot-on, and the budget breakdowns helped me afford a trip I thought was out of reach. The interface is beautiful and intuitive.`,
    tripDetails: {
      destination: "Iceland & Norway",
      duration: "8 days",
      savings: "$540",
      originalBudget: "$2,400"
    },
    highlight: "Made dream trip affordable"
  },
  {
    id: 4,
    name: "David Park",
    role: "Product Manager",
    location: "Seattle, WA",
    avatar: "https://images.unsplash.com/photo-1726440464439-81579d883f5e",
    avatarAlt: "Professional headshot of Asian man in navy blazer with confident smile in corporate environment",
    rating: 5,
    text: `TripCraft's smart planning saved me hours of research and hundreds of dollars. The real-time price alerts caught a flight deal that saved me $300 alone. It's like having a travel expert in your pocket who actually understands budgets.`,
    tripDetails: {
      destination: "Southeast Asia",
      duration: "12 days",
      savings: "$750",
      originalBudget: "$2,100"
    },
    highlight: "Saved hours of research time"
  }];


  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-warning/10 text-warning px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Star" size={16} />
            <span>Success Stories</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Travelers love their TripCraft experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from real travelers who transformed their trip planning and achieved their dream destinations within budget.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Testimonial Content */}
              <div className="md:col-span-2 space-y-6">
                {/* Stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(testimonials?.[activeTestimonial]?.rating)]?.map((_, i) =>
                  <Icon key={i} name="Star" size={20} className="text-warning fill-current" />
                  )}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl text-foreground leading-relaxed">
                  "{testimonials?.[activeTestimonial]?.text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <Image
                    src={testimonials?.[activeTestimonial]?.avatar}
                    alt={testimonials?.[activeTestimonial]?.avatarAlt}
                    className="w-16 h-16 rounded-full object-cover" />

                  <div>
                    <div className="font-semibold text-foreground text-lg">
                      {testimonials?.[activeTestimonial]?.name}
                    </div>
                    <div className="text-muted-foreground">
                      {testimonials?.[activeTestimonial]?.role}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonials?.[activeTestimonial]?.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Trip Stats */}
              <div className="bg-muted/30 rounded-2xl p-6">
                <h4 className="font-semibold text-foreground mb-4">Trip Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Destination:</span>
                    <span className="font-medium text-foreground text-right">
                      {testimonials?.[activeTestimonial]?.tripDetails?.destination}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium text-foreground">
                      {testimonials?.[activeTestimonial]?.tripDetails?.duration}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Original Budget:</span>
                    <span className="font-medium text-foreground">
                      {testimonials?.[activeTestimonial]?.tripDetails?.originalBudget}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="text-muted-foreground">Total Savings:</span>
                    <span className="font-bold text-success text-lg">
                      {testimonials?.[activeTestimonial]?.tripDetails?.savings}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-success/10 rounded-lg">
                  <div className="text-sm text-success font-medium text-center">
                    {testimonials?.[activeTestimonial]?.highlight}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors">

              <Icon name="ChevronLeft" size={20} />
            </button>
            
            <div className="flex space-x-2">
              {testimonials?.map((_, index) =>
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                index === activeTestimonial ? 'bg-primary' : 'bg-muted-foreground/30'}`
                } />

              )}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors">

              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-2">50k+</div>
            <div className="text-sm text-muted-foreground">Happy Travelers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">$2.1M</div>
            <div className="text-sm text-muted-foreground">Total Savings</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-warning mb-2">156</div>
            <div className="text-sm text-muted-foreground">Countries</div>
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;