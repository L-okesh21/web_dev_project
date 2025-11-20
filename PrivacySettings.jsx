import React, { useState } from 'react';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PrivacySettings = () => {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'friends',
    tripVisibility: 'private',
    activityVisibility: 'friends',
    allowMessages: true,
    allowFriendRequests: true,
    showOnlineStatus: false,
    dataCollection: {
      analytics: true,
      personalization: true,
      marketing: false,
      thirdParty: false
    },
    shareData: {
      socialMedia: false,
      partners: false,
      research: true
    }
  });

  const [isEditing, setIsEditing] = useState(false);

  const visibilityOptions = [
    { value: 'public', label: 'Public', description: 'Visible to everyone' },
    { value: 'friends', label: 'Friends Only', description: 'Visible to your connections' },
    { value: 'private', label: 'Private', description: 'Only visible to you' }
  ];

  const handleVisibilityChange = (field, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field, checked) => {
    setPrivacySettings(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleDataSettingChange = (category, field, checked) => {
    setPrivacySettings(prev => ({
      ...prev,
      [category]: {
        ...prev?.[category],
        [field]: checked
      }
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save privacy settings
  };

  const handleExportData = () => {
    // Export user data
    console.log('Exporting user data...');
  };

  const handleDeleteAccount = () => {
    // Account deletion logic
    console.log('Account deletion requested...');
  };

  return (
    <div className="space-y-6">
      {/* Profile Privacy */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Profile Privacy</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Control who can see your profile and activity
            </p>
          </div>
          {!isEditing ? (
            <Button 
              variant="outline" 
              size="sm"
              iconName="Eye"
              iconPosition="left"
              onClick={() => setIsEditing(true)}
            >
              Edit Privacy
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Select
              label="Profile Visibility"
              description="Who can view your profile information"
              options={visibilityOptions}
              value={privacySettings?.profileVisibility}
              onChange={(value) => handleVisibilityChange('profileVisibility', value)}
              disabled={!isEditing}
            />
            
            <Select
              label="Trip Visibility"
              description="Who can see your planned and completed trips"
              options={visibilityOptions}
              value={privacySettings?.tripVisibility}
              onChange={(value) => handleVisibilityChange('tripVisibility', value)}
              disabled={!isEditing}
            />
            
            <Select
              label="Activity Visibility"
              description="Who can see your reviews and community activity"
              options={visibilityOptions}
              value={privacySettings?.activityVisibility}
              onChange={(value) => handleVisibilityChange('activityVisibility', value)}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-4">
            <CheckboxGroup label="Communication Preferences">
              <Checkbox
                label="Allow Direct Messages"
                description="Let other users send you messages"
                checked={privacySettings?.allowMessages}
                onChange={(e) => handleCheckboxChange('allowMessages', e?.target?.checked)}
                disabled={!isEditing}
              />
              
              <Checkbox
                label="Allow Friend Requests"
                description="Let other users send you connection requests"
                checked={privacySettings?.allowFriendRequests}
                onChange={(e) => handleCheckboxChange('allowFriendRequests', e?.target?.checked)}
                disabled={!isEditing}
              />
              
              <Checkbox
                label="Show Online Status"
                description="Display when you're active on TripCraft"
                checked={privacySettings?.showOnlineStatus}
                onChange={(e) => handleCheckboxChange('showOnlineStatus', e?.target?.checked)}
                disabled={!isEditing}
              />
            </CheckboxGroup>
          </div>
        </div>
      </div>
      {/* Data & Analytics */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Data & Analytics</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manage how your data is collected and used
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <CheckboxGroup label="Data Collection">
              <div className="space-y-3">
                <Checkbox
                  label="Analytics & Performance"
                  description="Help us improve TripCraft with usage analytics"
                  checked={privacySettings?.dataCollection?.analytics}
                  onChange={(e) => handleDataSettingChange('dataCollection', 'analytics', e?.target?.checked)}
                  disabled={!isEditing}
                />
                
                <Checkbox
                  label="Personalization"
                  description="Use your data to personalize recommendations"
                  checked={privacySettings?.dataCollection?.personalization}
                  onChange={(e) => handleDataSettingChange('dataCollection', 'personalization', e?.target?.checked)}
                  disabled={!isEditing}
                />
                
                <Checkbox
                  label="Marketing Insights"
                  description="Use your data for marketing research"
                  checked={privacySettings?.dataCollection?.marketing}
                  onChange={(e) => handleDataSettingChange('dataCollection', 'marketing', e?.target?.checked)}
                  disabled={!isEditing}
                />
                
                <Checkbox
                  label="Third-Party Analytics"
                  description="Share anonymized data with analytics partners"
                  checked={privacySettings?.dataCollection?.thirdParty}
                  onChange={(e) => handleDataSettingChange('dataCollection', 'thirdParty', e?.target?.checked)}
                  disabled={!isEditing}
                />
              </div>
            </CheckboxGroup>
          </div>

          <div>
            <CheckboxGroup label="Data Sharing">
              <div className="space-y-3">
                <Checkbox
                  label="Social Media Integration"
                  description="Allow sharing trip data with connected social accounts"
                  checked={privacySettings?.shareData?.socialMedia}
                  onChange={(e) => handleDataSettingChange('shareData', 'socialMedia', e?.target?.checked)}
                  disabled={!isEditing}
                />
                
                <Checkbox
                  label="Partner Services"
                  description="Share relevant data with booking partners"
                  checked={privacySettings?.shareData?.partners}
                  onChange={(e) => handleDataSettingChange('shareData', 'partners', e?.target?.checked)}
                  disabled={!isEditing}
                />
                
                <Checkbox
                  label="Travel Research"
                  description="Contribute anonymized data to travel research"
                  checked={privacySettings?.shareData?.research}
                  onChange={(e) => handleDataSettingChange('shareData', 'research', e?.target?.checked)}
                  disabled={!isEditing}
                />
              </div>
            </CheckboxGroup>
          </div>
        </div>

        {/* Privacy Summary */}
        {!isEditing && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Shield" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Privacy Summary</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Profile: {visibilityOptions?.find(opt => opt?.value === privacySettings?.profileVisibility)?.label} • 
              Trips: {visibilityOptions?.find(opt => opt?.value === privacySettings?.tripVisibility)?.label} • 
              Data Collection: {Object.values(privacySettings?.dataCollection)?.filter(Boolean)?.length}/4 enabled
            </p>
          </div>
        )}
      </div>
      {/* Data Management */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Data Management</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Export or delete your personal data
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Data Export */}
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="Download" size={20} className="text-primary" />
              <h3 className="font-medium text-foreground">Export Your Data</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Download a copy of all your TripCraft data including trips, preferences, and activity history.
            </p>
            <Button 
              variant="outline" 
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={handleExportData}
            >
              Request Data Export
            </Button>
          </div>

          {/* Account Deletion */}
          <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="Trash2" size={20} className="text-destructive" />
              <h3 className="font-medium text-foreground">Delete Account</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <Button 
              variant="destructive" 
              size="sm"
              iconName="Trash2"
              iconPosition="left"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </div>
        </div>

        {/* GDPR Notice */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900">Your Privacy Rights</h4>
              <p className="text-sm text-blue-700 mt-1">
                Under GDPR and other privacy laws, you have the right to access, correct, delete, or port your personal data. 
                You can also object to or restrict certain processing of your data. Contact our privacy team for assistance.
              </p>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-blue-700 hover:text-blue-800 mt-2 p-0 h-auto"
              >
                Learn more about your rights
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;