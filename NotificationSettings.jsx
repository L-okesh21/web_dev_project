import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    email: {
      priceAlerts: true,
      tripReminders: true,
      bookingConfirmations: true,
      communityActivity: false,
      newsletter: true,
      promotions: false
    },
    push: {
      priceAlerts: true,
      tripReminders: true,
      bookingConfirmations: true,
      communityActivity: false,
      emergencyAlerts: true
    },
    sms: {
      tripReminders: false,
      bookingConfirmations: true,
      emergencyAlerts: true
    }
  });

  const [frequency, setFrequency] = useState({
    priceAlerts: 'immediate',
    communityDigest: 'weekly',
    newsletter: 'monthly'
  });

  const [isEditing, setIsEditing] = useState(false);

  const frequencyOptions = {
    priceAlerts: [
      { value: 'immediate', label: 'Immediate' },
      { value: 'daily', label: 'Daily Digest' },
      { value: 'weekly', label: 'Weekly Summary' }
    ],
    communityDigest: [
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'monthly', label: 'Monthly' },
      { value: 'never', label: 'Never' }
    ],
    newsletter: [
      { value: 'weekly', label: 'Weekly' },
      { value: 'monthly', label: 'Monthly' },
      { value: 'quarterly', label: 'Quarterly' },
      { value: 'never', label: 'Never' }
    ]
  };

  const handleNotificationChange = (type, category, checked) => {
    setNotifications(prev => ({
      ...prev,
      [type]: {
        ...prev?.[type],
        [category]: checked
      }
    }));
  };

  const handleFrequencyChange = (category, value) => {
    setFrequency(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save notification settings
  };

  const getNotificationCount = () => {
    let count = 0;
    Object.values(notifications)?.forEach(type => {
      Object.values(type)?.forEach(enabled => {
        if (enabled) count++;
      });
    });
    return count;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Notification Settings</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Control how and when you receive updates from TripCraft
          </p>
        </div>
        {!isEditing ? (
          <Button 
            variant="outline" 
            size="sm"
            iconName="Bell"
            iconPosition="left"
            onClick={() => setIsEditing(true)}
          >
            Edit Settings
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
      <div className="space-y-8">
        {/* Email Notifications */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Mail" size={20} className="text-primary" />
            <h3 className="text-lg font-medium text-foreground">Email Notifications</h3>
          </div>
          
          <CheckboxGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Checkbox
                label="Price Alerts"
                description="Get notified when trip prices change"
                checked={notifications?.email?.priceAlerts}
                onChange={(e) => handleNotificationChange('email', 'priceAlerts', e?.target?.checked)}
                disabled={!isEditing}
              />
              
              <Checkbox
                label="Trip Reminders"
                description="Upcoming trip notifications and check-in reminders"
                checked={notifications?.email?.tripReminders}
                onChange={(e) => handleNotificationChange('email', 'tripReminders', e?.target?.checked)}
                disabled={!isEditing}
              />
              
              <Checkbox
                label="Booking Confirmations"
                description="Confirmation emails for bookings and changes"
                checked={notifications?.email?.bookingConfirmations}
                onChange={(e) => handleNotificationChange('email', 'bookingConfirmations', e?.target?.checked)}
                disabled={!isEditing}
              />
              
              <Checkbox
                label="Community Activity"
                description="Updates on route reviews and community posts"
                checked={notifications?.email?.communityActivity}
                onChange={(e) => handleNotificationChange('email', 'communityActivity', e?.target?.checked)}
                disabled={!isEditing}
              />
              
              <Checkbox
                label="Newsletter"
                description="Travel tips, destination guides, and platform updates"
                checked={notifications?.email?.newsletter}
                onChange={(e) => handleNotificationChange('email', 'newsletter', e?.target?.checked)}
                disabled={!isEditing}
              />
              
              <Checkbox
                label="Promotions & Deals"
                description="Special offers and discount notifications"
                checked={notifications?.email?.promotions}
                onChange={(e) => handleNotificationChange('email', 'promotions', e?.target?.checked)}
                disabled={!isEditing}
              />
            </div>
          </CheckboxGroup>
        </div>

        {/* Push Notifications */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Smartphone" size={20} className="text-primary" />
            <h3 className="text-lg font-medium text-foreground">Push Notifications</h3>
          </div>
          
          <CheckboxGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Checkbox
                label="Price Alerts"
                description="Real-time price change notifications"
                checked={notifications?.push?.priceAlerts}
                onChange={(e) => handleNotificationChange('push', 'priceAlerts', e?.target?.checked)}
                disabled={!isEditing}
              />
              
              <Checkbox
                label="Trip Reminders"
                description="Check-in reminders and travel updates"
                checked={notifications?.push?.tripReminders}
                onChange={(e) => handleNotificationChange('push', 'tripReminders', e?.target?.checked)}
                disabled={!isEditing}
              />
              
              <Checkbox
                label="Booking Confirmations"
                description="Instant booking confirmations"
                checked={notifications?.push?.bookingConfirmations}
                onChange={(e) => handleNotificationChange('push', 'bookingConfirmations', e?.target?.checked)}
                disabled={!isEditing}
              />
              
              <Checkbox
                label="Community Activity"
                description="New comments and route recommendations"
                checked={notifications?.push?.communityActivity}
                onChange={(e) => handleNotificationChange('push', 'communityActivity', e?.target?.checked)}
                disabled={!isEditing}
              />
              
              <Checkbox
                label="Emergency Alerts"
                description="Travel advisories and safety updates"
                checked={notifications?.push?.emergencyAlerts}
                onChange={(e) => handleNotificationChange('push', 'emergencyAlerts', e?.target?.checked)}
                disabled={!isEditing}
              />
            </div>
          </CheckboxGroup>
        </div>

        {/* SMS Notifications */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="MessageSquare" size={20} className="text-primary" />
            <h3 className="text-lg font-medium text-foreground">SMS Notifications</h3>
          </div>
          
          <CheckboxGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Checkbox
                label="Trip Reminders"
                description="Flight check-in and departure reminders"
                checked={notifications?.sms?.tripReminders}
                onChange={(e) => handleNotificationChange('sms', 'tripReminders', e?.target?.checked)}
                disabled={!isEditing}
              />
              
              <Checkbox
                label="Booking Confirmations"
                description="SMS confirmations for important bookings"
                checked={notifications?.sms?.bookingConfirmations}
                onChange={(e) => handleNotificationChange('sms', 'bookingConfirmations', e?.target?.checked)}
                disabled={!isEditing}
              />
              
              <Checkbox
                label="Emergency Alerts"
                description="Critical travel alerts and safety notifications"
                checked={notifications?.sms?.emergencyAlerts}
                onChange={(e) => handleNotificationChange('sms', 'emergencyAlerts', e?.target?.checked)}
                disabled={!isEditing}
              />
            </div>
          </CheckboxGroup>
        </div>

        {/* Frequency Settings */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Clock" size={20} className="text-primary" />
            <h3 className="text-lg font-medium text-foreground">Notification Frequency</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Price Alert Frequency"
              description="How often to receive price updates"
              options={frequencyOptions?.priceAlerts}
              value={frequency?.priceAlerts}
              onChange={(value) => handleFrequencyChange('priceAlerts', value)}
              disabled={!isEditing}
            />
            
            <Select
              label="Community Digest"
              description="Community activity summary frequency"
              options={frequencyOptions?.communityDigest}
              value={frequency?.communityDigest}
              onChange={(value) => handleFrequencyChange('communityDigest', value)}
              disabled={!isEditing}
            />
            
            <Select
              label="Newsletter Frequency"
              description="How often to receive newsletters"
              options={frequencyOptions?.newsletter}
              value={frequency?.newsletter}
              onChange={(value) => handleFrequencyChange('newsletter', value)}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
      {/* Summary */}
      {!isEditing && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Bell" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Notification Summary</span>
          </div>
          <p className="text-sm text-muted-foreground">
            You have {getNotificationCount()} notification types enabled across email, push, and SMS channels.
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationSettings;