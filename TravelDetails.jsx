import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const TravelDetails = ({ travelDetails, onDetailsChange, onNext, onBack }) => {
  const [errors, setErrors] = useState({});

  const travelStyleOptions = [
    { value: 'budget', label: 'Budget Traveler', description: 'Hostels, local transport, street food' },
    { value: 'mid-range', label: 'Mid-Range', description: 'Hotels, mix of transport, restaurants' },
    { value: 'luxury', label: 'Luxury', description: 'Premium hotels, private transport, fine dining' },
    { value: 'backpacker', label: 'Backpacker', description: 'Minimal cost, maximum adventure' }
  ];

  const groupSizeOptions = [
    { value: '1', label: 'Solo (1 person)' },
    { value: '2', label: 'Couple (2 people)' },
    { value: '3-4', label: 'Small Group (3-4 people)' },
    { value: '5-8', label: 'Medium Group (5-8 people)' },
    { value: '9+', label: 'Large Group (9+ people)' }
  ];

  const accommodationOptions = [
    { value: 'hostel', label: 'Hostel', description: '$20-50/night' },
    { value: 'budget-hotel', label: 'Budget Hotel', description: '$50-100/night' },
    { value: 'mid-range-hotel', label: 'Mid-Range Hotel', description: '$100-200/night' },
    { value: 'luxury-hotel', label: 'Luxury Hotel', description: '$200+/night' },
    { value: 'airbnb', label: 'Airbnb/Rental', description: '$40-150/night' },
    { value: 'mixed', label: 'Mixed Options', description: 'Combination of above' }
  ];

  const handleInputChange = (field, value) => {
    onDetailsChange({ ...travelDetails, [field]: value });
    if (errors?.[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!travelDetails?.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!travelDetails?.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (travelDetails?.startDate && travelDetails?.endDate) {
      const start = new Date(travelDetails.startDate);
      const end = new Date(travelDetails.endDate);
      if (end <= start) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    if (!travelDetails?.budget || travelDetails?.budget <= 0) {
      newErrors.budget = 'Budget must be greater than 0';
    }

    if (!travelDetails?.travelStyle) {
      newErrors.travelStyle = 'Please select a travel style';
    }

    if (!travelDetails?.groupSize) {
      newErrors.groupSize = 'Please select group size';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const calculateDuration = () => {
    if (travelDetails?.startDate && travelDetails?.endDate) {
      const start = new Date(travelDetails.startDate);
      const end = new Date(travelDetails.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const getBudgetPerDay = () => {
    const duration = calculateDuration();
    if (duration > 0 && travelDetails?.budget) {
      return Math.round(travelDetails?.budget / duration);
    }
    return 0;
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Calendar" size={20} className="text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Travel Details</h2>
          <p className="text-sm text-muted-foreground">When and how do you want to travel?</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Travel Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="date"
            label="Start Date"
            value={travelDetails?.startDate || ''}
            onChange={(e) => handleInputChange('startDate', e?.target?.value)}
            error={errors?.startDate}
            required
            min={new Date()?.toISOString()?.split('T')?.[0]}
          />
          <Input
            type="date"
            label="End Date"
            value={travelDetails?.endDate || ''}
            onChange={(e) => handleInputChange('endDate', e?.target?.value)}
            error={errors?.endDate}
            required
            min={travelDetails?.startDate || new Date()?.toISOString()?.split('T')?.[0]}
          />
        </div>

        {/* Duration Display */}
        {calculateDuration() > 0 && (
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">
                Trip Duration: {calculateDuration()} days
              </span>
            </div>
          </div>
        )}

        {/* Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="number"
            label="Total Budget (USD)"
            placeholder="e.g., 2000"
            value={travelDetails?.budget || ''}
            onChange={(e) => handleInputChange('budget', parseFloat(e?.target?.value) || '')}
            error={errors?.budget}
            required
            min="1"
          />
          <div className="flex flex-col justify-end">
            {getBudgetPerDay() > 0 && (
              <div className="p-3 bg-success/5 border border-success/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="DollarSign" size={16} className="text-success" />
                  <span className="text-sm font-medium text-foreground">
                    ${getBudgetPerDay()}/day budget
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Travel Style */}
        <Select
          label="Travel Style"
          description="Choose your preferred travel style"
          options={travelStyleOptions}
          value={travelDetails?.travelStyle || ''}
          onChange={(value) => handleInputChange('travelStyle', value)}
          error={errors?.travelStyle}
          required
          placeholder="Select travel style"
        />

        {/* Group Size */}
        <Select
          label="Group Size"
          description="How many people will be traveling?"
          options={groupSizeOptions}
          value={travelDetails?.groupSize || ''}
          onChange={(value) => handleInputChange('groupSize', value)}
          error={errors?.groupSize}
          required
          placeholder="Select group size"
        />

        {/* Accommodation Preference */}
        <Select
          label="Accommodation Preference"
          description="What type of accommodation do you prefer?"
          options={accommodationOptions}
          value={travelDetails?.accommodation || ''}
          onChange={(value) => handleInputChange('accommodation', value)}
          placeholder="Select accommodation type"
        />

        {/* Special Requirements */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Special Requirements (Optional)
          </label>
          <textarea
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows="3"
            placeholder="Any special requirements, dietary restrictions, accessibility needs, etc."
            value={travelDetails?.specialRequirements || ''}
            onChange={(e) => handleInputChange('specialRequirements', e?.target?.value)}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={onBack}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Back
          </Button>
          <Button
            variant="default"
            onClick={handleNext}
            iconName="ArrowRight"
            iconPosition="right"
            className="bg-primary hover:bg-primary/90"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TravelDetails;