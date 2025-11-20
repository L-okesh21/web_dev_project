import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TravelPreferences = () => {
  const [preferences, setPreferences] = useState({
    travelStyle: 'balanced',
    budgetRange: 'moderate',
    accommodationType: ['hotel', 'airbnb'],
    transportModes: ['flight', 'train'],
    interests: ['culture', 'food', 'nature'],
    groupSize: 'couple',
    seasonPreference: 'flexible'
  });

  const [isEditing, setIsEditing] = useState(false);

  const travelStyleOptions = [
    { value: 'budget', label: 'Budget Traveler', description: 'Focus on cost-effective options' },
    { value: 'balanced', label: 'Balanced Explorer', description: 'Mix of comfort and value' },
    { value: 'luxury', label: 'Luxury Seeker', description: 'Premium experiences and comfort' },
    { value: 'adventure', label: 'Adventure Enthusiast', description: 'Unique and thrilling experiences' }
  ];

  const budgetRangeOptions = [
    { value: 'budget', label: 'Budget ($0-$50/day)', description: 'Backpacker style' },
    { value: 'moderate', label: 'Moderate ($50-$150/day)', description: 'Comfortable travel' },
    { value: 'premium', label: 'Premium ($150-$300/day)', description: 'High-end experiences' },
    { value: 'luxury', label: 'Luxury ($300+/day)', description: 'No expense spared' }
  ];

  const groupSizeOptions = [
    { value: 'solo', label: 'Solo Traveler' },
    { value: 'couple', label: 'Couple' },
    { value: 'family', label: 'Family (3-5 people)' },
    { value: 'group', label: 'Group (6+ people)' }
  ];

  const seasonOptions = [
    { value: 'spring', label: 'Spring (Mar-May)' },
    { value: 'summer', label: 'Summer (Jun-Aug)' },
    { value: 'fall', label: 'Fall (Sep-Nov)' },
    { value: 'winter', label: 'Winter (Dec-Feb)' },
    { value: 'flexible', label: 'Flexible/Any Season' }
  ];

  const accommodationTypes = [
    { id: 'hotel', label: 'Hotels & Resorts' },
    { id: 'airbnb', label: 'Vacation Rentals' },
    { id: 'hostel', label: 'Hostels' },
    { id: 'boutique', label: 'Boutique Properties' },
    { id: 'camping', label: 'Camping & Glamping' }
  ];

  const transportModes = [
    { id: 'flight', label: 'Flights' },
    { id: 'train', label: 'Trains' },
    { id: 'bus', label: 'Buses' },
    { id: 'car', label: 'Car Rental' },
    { id: 'cruise', label: 'Cruises' }
  ];

  const interests = [
    { id: 'culture', label: 'Culture & History' },
    { id: 'food', label: 'Food & Cuisine' },
    { id: 'nature', label: 'Nature & Wildlife' },
    { id: 'adventure', label: 'Adventure Sports' },
    { id: 'relaxation', label: 'Relaxation & Wellness' },
    { id: 'nightlife', label: 'Nightlife & Entertainment' },
    { id: 'shopping', label: 'Shopping' },
    { id: 'photography', label: 'Photography' }
  ];

  const handleCheckboxChange = (category, itemId, checked) => {
    setPreferences(prev => ({
      ...prev,
      [category]: checked 
        ? [...prev?.[category], itemId]
        : prev?.[category]?.filter(id => id !== itemId)
    }));
  };

  const handleSelectChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save preferences logic
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Travel Preferences</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Customize your travel recommendations and planning experience
          </p>
        </div>
        {!isEditing ? (
          <Button 
            variant="outline" 
            size="sm"
            iconName="Settings"
            iconPosition="left"
            onClick={() => setIsEditing(true)}
          >
            Edit Preferences
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="default" 
              size="sm"
              iconName="Check"
              iconPosition="left"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Travel Style & Budget */}
        <div className="space-y-4">
          <Select
            label="Travel Style"
            description="How do you prefer to travel?"
            options={travelStyleOptions}
            value={preferences?.travelStyle}
            onChange={(value) => handleSelectChange('travelStyle', value)}
            disabled={!isEditing}
          />
          
          <Select
            label="Budget Range"
            description="Typical daily budget per person"
            options={budgetRangeOptions}
            value={preferences?.budgetRange}
            onChange={(value) => handleSelectChange('budgetRange', value)}
            disabled={!isEditing}
          />
          
          <Select
            label="Group Size"
            description="How many people usually travel with you?"
            options={groupSizeOptions}
            value={preferences?.groupSize}
            onChange={(value) => handleSelectChange('groupSize', value)}
            disabled={!isEditing}
          />
          
          <Select
            label="Season Preference"
            description="When do you prefer to travel?"
            options={seasonOptions}
            value={preferences?.seasonPreference}
            onChange={(value) => handleSelectChange('seasonPreference', value)}
            disabled={!isEditing}
          />
        </div>

        {/* Preferences Checkboxes */}
        <div className="space-y-6">
          <CheckboxGroup label="Accommodation Types">
            <div className="grid grid-cols-1 gap-2">
              {accommodationTypes?.map((type) => (
                <Checkbox
                  key={type?.id}
                  label={type?.label}
                  checked={preferences?.accommodationType?.includes(type?.id)}
                  onChange={(e) => handleCheckboxChange('accommodationType', type?.id, e?.target?.checked)}
                  disabled={!isEditing}
                />
              ))}
            </div>
          </CheckboxGroup>

          <CheckboxGroup label="Transportation Modes">
            <div className="grid grid-cols-1 gap-2">
              {transportModes?.map((mode) => (
                <Checkbox
                  key={mode?.id}
                  label={mode?.label}
                  checked={preferences?.transportModes?.includes(mode?.id)}
                  onChange={(e) => handleCheckboxChange('transportModes', mode?.id, e?.target?.checked)}
                  disabled={!isEditing}
                />
              ))}
            </div>
          </CheckboxGroup>

          <CheckboxGroup label="Travel Interests">
            <div className="grid grid-cols-1 gap-2">
              {interests?.map((interest) => (
                <Checkbox
                  key={interest?.id}
                  label={interest?.label}
                  checked={preferences?.interests?.includes(interest?.id)}
                  onChange={(e) => handleCheckboxChange('interests', interest?.id, e?.target?.checked)}
                  disabled={!isEditing}
                />
              ))}
            </div>
          </CheckboxGroup>
        </div>
      </div>
      {/* Preference Summary */}
      {!isEditing && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="User" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Your Travel Profile</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {travelStyleOptions?.find(opt => opt?.value === preferences?.travelStyle)?.label} • {' '}
            {budgetRangeOptions?.find(opt => opt?.value === preferences?.budgetRange)?.label} • {' '}
            {groupSizeOptions?.find(opt => opt?.value === preferences?.groupSize)?.label} • {' '}
            {preferences?.interests?.length} interests selected
          </p>
        </div>
      )}
    </div>
  );
};

export default TravelPreferences;