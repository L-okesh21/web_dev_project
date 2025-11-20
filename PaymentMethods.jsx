import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'credit',
      brand: 'visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '2027',
      holderName: 'Sarah Johnson',
      isDefault: true,
      nickname: 'Personal Visa'
    },
    {
      id: 2,
      type: 'credit',
      brand: 'mastercard',
      last4: '8888',
      expiryMonth: '08',
      expiryYear: '2026',
      holderName: 'Sarah Johnson',
      isDefault: false,
      nickname: 'Travel Card'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    holderName: '',
    nickname: '',
    isDefault: false
  });

  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1)?.padStart(2, '0'),
    label: String(i + 1)?.padStart(2, '0')
  }));

  const yearOptions = Array.from({ length: 10 }, (_, i) => ({
    value: String(new Date()?.getFullYear() + i),
    label: String(new Date()?.getFullYear() + i)
  }));

  const getCardIcon = (brand) => {
    switch (brand) {
      case 'visa':
        return 'CreditCard';
      case 'mastercard':
        return 'CreditCard';
      case 'amex':
        return 'CreditCard';
      default:
        return 'CreditCard';
    }
  };

  const getCardBrandName = (brand) => {
    switch (brand) {
      case 'visa':
        return 'Visa';
      case 'mastercard':
        return 'Mastercard';
      case 'amex':
        return 'American Express';
      default:
        return 'Credit Card';
    }
  };

  const handleInputChange = (field, value) => {
    setNewCard(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddCard = () => {
    const card = {
      id: Date.now(),
      type: 'credit',
      brand: 'visa', // Would be detected from card number
      last4: newCard?.cardNumber?.slice(-4),
      expiryMonth: newCard?.expiryMonth,
      expiryYear: newCard?.expiryYear,
      holderName: newCard?.holderName,
      isDefault: newCard?.isDefault,
      nickname: newCard?.nickname || `Card ending in ${newCard?.cardNumber?.slice(-4)}`
    };

    setPaymentMethods(prev => [...prev, card]);
    setNewCard({
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      holderName: '',
      nickname: '',
      isDefault: false
    });
    setShowAddForm(false);
  };

  const handleSetDefault = (cardId) => {
    setPaymentMethods(prev => 
      prev?.map(card => ({
        ...card,
        isDefault: card?.id === cardId
      }))
    );
  };

  const handleDeleteCard = (cardId) => {
    setPaymentMethods(prev => prev?.filter(card => card?.id !== cardId));
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Payment Methods</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your saved payment methods for faster booking
          </p>
        </div>
        <Button 
          variant="default" 
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setShowAddForm(true)}
        >
          Add Card
        </Button>
      </div>
      {/* Existing Payment Methods */}
      <div className="space-y-4 mb-6">
        {paymentMethods?.map((method) => (
          <div key={method?.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                <Icon name={getCardIcon(method?.brand)} size={20} color="white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-foreground">
                    {getCardBrandName(method?.brand)} •••• {method?.last4}
                  </span>
                  {method?.isDefault && (
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {method?.nickname} • Expires {method?.expiryMonth}/{method?.expiryYear}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!method?.isDefault && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleSetDefault(method?.id)}
                >
                  Set Default
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm"
                iconName="Edit2"
              >
                Edit
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                iconName="Trash2"
                onClick={() => handleDeleteCard(method?.id)}
                className="text-destructive hover:text-destructive"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Add New Card Form */}
      {showAddForm && (
        <div className="border border-border rounded-lg p-6 bg-muted/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-foreground">Add New Payment Method</h3>
            <Button 
              variant="ghost" 
              size="sm"
              iconName="X"
              onClick={() => setShowAddForm(false)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Card Number"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={newCard?.cardNumber}
              onChange={(e) => handleInputChange('cardNumber', e?.target?.value)}
              required
              className="md:col-span-2"
            />
            
            <Input
              label="Cardholder Name"
              type="text"
              placeholder="Name on card"
              value={newCard?.holderName}
              onChange={(e) => handleInputChange('holderName', e?.target?.value)}
              required
            />
            
            <Input
              label="Card Nickname (Optional)"
              type="text"
              placeholder="e.g., Travel Card"
              value={newCard?.nickname}
              onChange={(e) => handleInputChange('nickname', e?.target?.value)}
            />
            
            <Select
              label="Expiry Month"
              options={monthOptions}
              value={newCard?.expiryMonth}
              onChange={(value) => handleInputChange('expiryMonth', value)}
              placeholder="Month"
              required
            />
            
            <Select
              label="Expiry Year"
              options={yearOptions}
              value={newCard?.expiryYear}
              onChange={(value) => handleInputChange('expiryYear', value)}
              placeholder="Year"
              required
            />
            
            <Input
              label="CVV"
              type="text"
              placeholder="123"
              value={newCard?.cvv}
              onChange={(e) => handleInputChange('cvv', e?.target?.value)}
              required
              maxLength={4}
            />
            
            <div className="md:col-span-2">
              <Checkbox
                label="Set as default payment method"
                checked={newCard?.isDefault}
                onChange={(e) => handleInputChange('isDefault', e?.target?.checked)}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <Button 
              variant="outline"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={handleAddCard}
            >
              Add Card
            </Button>
          </div>
        </div>
      )}
      {/* Security Notice */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Secure Payment Processing</h4>
            <p className="text-sm text-blue-700 mt-1">
              Your payment information is encrypted and securely stored. We never store your full card number or CVV.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;