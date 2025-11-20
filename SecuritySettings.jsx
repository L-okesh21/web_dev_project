import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const SecuritySettings = () => {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    loginNotifications: true,
    sessionTimeout: '30',
    passwordLastChanged: '2024-09-15'
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [loginHistory] = useState([
    {
      id: 1,
      device: "MacBook Pro - Chrome",
      location: "San Francisco, CA",
      timestamp: "2024-10-30 14:32:15",
      ipAddress: "192.168.1.100",
      status: "success"
    },
    {
      id: 2,
      device: "iPhone 15 - Safari",
      location: "San Francisco, CA", 
      timestamp: "2024-10-30 09:15:22",
      ipAddress: "192.168.1.101",
      status: "success"
    },
    {
      id: 3,
      device: "Windows PC - Edge",
      location: "Oakland, CA",
      timestamp: "2024-10-29 16:45:33",
      ipAddress: "10.0.0.50",
      status: "blocked"
    }
  ]);

  const handlePasswordInputChange = (field, value) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = () => {
    // Password change logic
    setShowPasswordForm(false);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleToggleTwoFactor = () => {
    setSecuritySettings(prev => ({
      ...prev,
      twoFactorEnabled: !prev?.twoFactorEnabled
    }));
  };

  const handleToggleLoginNotifications = () => {
    setSecuritySettings(prev => ({
      ...prev,
      loginNotifications: !prev?.loginNotifications
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'blocked':
        return { name: 'XCircle', color: 'text-destructive' };
      default:
        return { name: 'AlertCircle', color: 'text-warning' };
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Password Security */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Password & Security</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your account security and authentication settings
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Password Section */}
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Lock" size={20} className="text-primary" />
              <div>
                <h3 className="font-medium text-foreground">Password</h3>
                <p className="text-sm text-muted-foreground">
                  Last changed on {new Date(securitySettings.passwordLastChanged)?.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowPasswordForm(true)}
            >
              Change Password
            </Button>
          </div>

          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Shield" size={20} className="text-primary" />
              <div>
                <h3 className="font-medium text-foreground">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {securitySettings?.twoFactorEnabled && (
                <span className="px-2 py-1 bg-success text-success-foreground text-xs rounded-full">
                  Enabled
                </span>
              )}
              <Button 
                variant={securitySettings?.twoFactorEnabled ? "outline" : "default"}
                size="sm"
                onClick={handleToggleTwoFactor}
              >
                {securitySettings?.twoFactorEnabled ? 'Disable' : 'Enable'}
              </Button>
            </div>
          </div>

          {/* Login Notifications */}
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Bell" size={20} className="text-primary" />
              <div>
                <h3 className="font-medium text-foreground">Login Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Get notified of new login attempts
                </p>
              </div>
            </div>
            <Checkbox
              checked={securitySettings?.loginNotifications}
              onChange={handleToggleLoginNotifications}
            />
          </div>
        </div>

        {/* Change Password Form */}
        {showPasswordForm && (
          <div className="mt-6 p-6 border border-border rounded-lg bg-muted/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground">Change Password</h3>
              <Button 
                variant="ghost" 
                size="sm"
                iconName="X"
                onClick={() => setShowPasswordForm(false)}
              />
            </div>
            
            <div className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                value={passwordForm?.currentPassword}
                onChange={(e) => handlePasswordInputChange('currentPassword', e?.target?.value)}
                required
              />
              
              <Input
                label="New Password"
                type="password"
                value={passwordForm?.newPassword}
                onChange={(e) => handlePasswordInputChange('newPassword', e?.target?.value)}
                description="Must be at least 8 characters with numbers and symbols"
                required
              />
              
              <Input
                label="Confirm New Password"
                type="password"
                value={passwordForm?.confirmPassword}
                onChange={(e) => handlePasswordInputChange('confirmPassword', e?.target?.value)}
                required
              />
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button 
                variant="outline"
                onClick={() => setShowPasswordForm(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="default"
                iconName="Check"
                iconPosition="left"
                onClick={handlePasswordChange}
              >
                Update Password
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Login History */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Login History</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Recent login attempts and device access
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export History
          </Button>
        </div>

        <div className="space-y-3">
          {loginHistory?.map((login) => {
            const statusIcon = getStatusIcon(login?.status);
            return (
              <div key={login?.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <Icon 
                    name={statusIcon?.name} 
                    size={20} 
                    className={statusIcon?.color} 
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">{login?.device}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        login?.status === 'success' ?'bg-success/10 text-success' :'bg-destructive/10 text-destructive'
                      }`}>
                        {login?.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {login?.location} • {login?.ipAddress}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {formatTimestamp(login?.timestamp)}
                  </p>
                  {login?.status === 'blocked' && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-xs text-destructive hover:text-destructive"
                    >
                      Report Issue
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Tips */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900">Security Tips</h4>
              <ul className="text-sm text-blue-700 mt-1 space-y-1">
                <li>• Use a unique, strong password for your TripCraft account</li>
                <li>• Enable two-factor authentication for enhanced security</li>
                <li>• Log out from public or shared devices</li>
                <li>• Report any suspicious login activity immediately</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;