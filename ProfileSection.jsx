import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1992-03-15",
    location: "San Francisco, CA",
    bio: "Passionate traveler exploring the world one destination at a time. Love discovering hidden gems and sharing travel tips with fellow adventurers."
  });

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save logic would go here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Profile Information</h2>
        {!isEditing ?
        <Button
          variant="outline"
          size="sm"
          iconName="Edit2"
          iconPosition="left"
          onClick={() => setIsEditing(true)}>

            Edit Profile
          </Button> :

        <div className="flex space-x-2">
            <Button
            variant="outline"
            size="sm"
            onClick={handleCancel}>

              Cancel
            </Button>
            <Button
            variant="default"
            size="sm"
            iconName="Check"
            iconPosition="left"
            onClick={handleSave}>

              Save Changes
            </Button>
          </div>
        }
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1700561791890-a15d45b9c79d"
              alt="Professional headshot of woman with shoulder-length brown hair wearing white blazer"
              className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-lg" />

            {isEditing &&
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                <Icon name="Camera" size={16} />
              </button>
            }
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">{profileData?.firstName} {profileData?.lastName}</p>
            <p className="text-xs text-muted-foreground">Member since March 2023</p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            value={profileData?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            disabled={!isEditing}
            required />

          
          <Input
            label="Last Name"
            type="text"
            value={profileData?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            disabled={!isEditing}
            required />

          
          <Input
            label="Email Address"
            type="email"
            value={profileData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            disabled={!isEditing}
            required
            className="md:col-span-2" />

          
          <Input
            label="Phone Number"
            type="tel"
            value={profileData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            disabled={!isEditing} />

          
          <Input
            label="Date of Birth"
            type="date"
            value={profileData?.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
            disabled={!isEditing} />

          
          <Input
            label="Location"
            type="text"
            value={profileData?.location}
            onChange={(e) => handleInputChange('location', e?.target?.value)}
            disabled={!isEditing}
            placeholder="City, State/Country"
            className="md:col-span-2" />

          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
            <textarea
              value={profileData?.bio}
              onChange={(e) => handleInputChange('bio', e?.target?.value)}
              disabled={!isEditing}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed resize-none"
              placeholder="Tell us about yourself and your travel interests..." />

          </div>
        </div>
      </div>
    </div>);

};

export default ProfileSection;