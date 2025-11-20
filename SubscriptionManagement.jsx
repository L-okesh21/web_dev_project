import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SubscriptionManagement = () => {
  const [currentPlan] = useState({
    name: 'Explorer Pro',
    type: 'monthly',
    price: 19.99,
    nextBilling: '2024-11-30',
    features: [
      'Unlimited trip planning',
      'Advanced route optimization',
      'Real-time price alerts',
      'Priority customer support',
      'Multi-destination planning',
      'Offline trip access',
      'Premium destination insights'
    ]
  });

  const [plans] = useState([
    {
      id: 'free',
      name: 'Free Explorer',
      price: 0,
      billing: 'forever',
      popular: false,
      features: [
        'Basic trip planning',
        'Up to 3 saved trips',
        'Standard route suggestions',
        'Community access',
        'Basic budget tracking'
      ],
      limitations: [
        'Limited to 3 trips per month',
        'Basic customer support',
        'No offline access'
      ]
    },
    {
      id: 'pro-monthly',
      name: 'Explorer Pro',
      price: 19.99,
      billing: 'monthly',
      popular: true,
      features: [
        'Unlimited trip planning',
        'Advanced route optimization',
        'Real-time price alerts',
        'Priority customer support',
        'Multi-destination planning',
        'Offline trip access',
        'Premium destination insights',
        'Custom budget categories',
        'Trip collaboration tools'
      ],
      limitations: []
    },
    {
      id: 'pro-yearly',
      name: 'Explorer Pro',
      price: 199.99,
      billing: 'yearly',
      popular: false,
      savings: 'Save $39.89',
      features: [
        'All Pro features included',
        'Annual travel report',
        'Exclusive destination guides',
        'Early access to new features',
        'Personal travel consultant',
        'Group planning tools',
        'Advanced analytics dashboard'
      ],
      limitations: []
    },
    {
      id: 'enterprise',
      name: 'Team Explorer',
      price: 49.99,
      billing: 'per user/month',
      popular: false,
      features: [
        'All Pro features',
        'Team management dashboard',
        'Corporate travel policies',
        'Expense reporting integration',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced security features',
        'Bulk booking discounts'
      ],
      limitations: []
    }
  ]);

  const [billingHistory] = useState([
    {
      id: 1,
      date: '2024-10-30',
      amount: 19.99,
      plan: 'Explorer Pro Monthly',
      status: 'paid',
      invoice: 'INV-2024-001'
    },
    {
      id: 2,
      date: '2024-09-30',
      amount: 19.99,
      plan: 'Explorer Pro Monthly',
      status: 'paid',
      invoice: 'INV-2024-002'
    },
    {
      id: 3,
      date: '2024-08-30',
      amount: 19.99,
      plan: 'Explorer Pro Monthly',
      status: 'paid',
      invoice: 'INV-2024-003'
    }
  ]);

  const handlePlanChange = (planId) => {
    console.log('Changing to plan:', planId);
  };

  const handleCancelSubscription = () => {
    console.log('Canceling subscription...');
  };

  const handleDownloadInvoice = (invoiceId) => {
    console.log('Downloading invoice:', invoiceId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPlanIcon = (planId) => {
    switch (planId) {
      case 'free':
        return 'Compass';
      case 'pro-monthly': case'pro-yearly':
        return 'Star';
      case 'enterprise':
        return 'Building';
      default:
        return 'Package';
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Current Subscription</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your TripCraft subscription and billing
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Star" size={24} color="white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{currentPlan?.name}</h3>
                <p className="text-sm text-muted-foreground">
                  ${currentPlan?.price}/{currentPlan?.type}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Next billing</p>
              <p className="font-medium text-foreground">{formatDate(currentPlan?.nextBilling)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {currentPlan?.features?.slice(0, 6)?.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="Check" size={16} className="text-success" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              Change Plan
            </Button>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
              Cancel Subscription
            </Button>
          </div>
        </div>
      </div>
      {/* Available Plans */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Available Plans</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Choose the plan that best fits your travel needs
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans?.map((plan) => (
            <div 
              key={plan?.id}
              className={`relative rounded-lg border p-6 ${
                plan?.popular 
                  ? 'border-primary bg-primary/5' :'border-border bg-card'
              }`}
            >
              {plan?.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name={getPlanIcon(plan?.id)} size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{plan?.name}</h3>
                <div className="mt-2">
                  <span className="text-2xl font-bold text-foreground">${plan?.price}</span>
                  <span className="text-sm text-muted-foreground">/{plan?.billing}</span>
                </div>
                {plan?.savings && (
                  <p className="text-sm text-success font-medium mt-1">{plan?.savings}</p>
                )}
              </div>

              <div className="space-y-2 mb-6">
                {plan?.features?.slice(0, 5)?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={14} className="text-success" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
                {plan?.features?.length > 5 && (
                  <p className="text-xs text-muted-foreground">
                    +{plan?.features?.length - 5} more features
                  </p>
                )}
              </div>

              <Button 
                variant={plan?.popular ? "default" : "outline"}
                fullWidth
                onClick={() => handlePlanChange(plan?.id)}
                disabled={plan?.id === 'pro-monthly'} // Current plan
              >
                {plan?.id === 'pro-monthly' ? 'Current Plan' : 'Choose Plan'}
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Billing History */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Billing History</h2>
            <p className="text-sm text-muted-foreground mt-1">
              View and download your past invoices
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Download All
          </Button>
        </div>

        <div className="space-y-3">
          {billingHistory?.map((bill) => (
            <div key={bill?.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Receipt" size={20} className="text-success" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{bill?.plan}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(bill?.date)} • Invoice {bill?.invoice}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium text-foreground">${bill?.amount}</p>
                  <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                    {bill?.status}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  iconName="Download"
                  onClick={() => handleDownloadInvoice(bill?.invoice)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Subscription Management */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Subscription Management</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Additional subscription options and settings
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="CreditCard" size={20} className="text-primary" />
                <h3 className="font-medium text-foreground">Payment Method</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Visa ending in 4242 • Expires 12/2027
              </p>
              <Button variant="outline" size="sm">
                Update Payment
              </Button>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="Calendar" size={20} className="text-primary" />
                <h3 className="font-medium text-foreground">Billing Cycle</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Monthly billing on the 30th of each month
              </p>
              <Button variant="outline" size="sm">
                Change Cycle
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 border border-amber-200 rounded-lg bg-amber-50">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="Pause" size={20} className="text-amber-600" />
                <h3 className="font-medium text-foreground">Pause Subscription</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Temporarily pause your subscription for up to 3 months
              </p>
              <Button variant="outline" size="sm">
                Pause Plan
              </Button>
            </div>

            <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="XCircle" size={20} className="text-destructive" />
                <h3 className="font-medium text-foreground">Cancel Subscription</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Cancel your subscription (effective at end of billing period)
              </p>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleCancelSubscription}
              >
                Cancel Plan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManagement;