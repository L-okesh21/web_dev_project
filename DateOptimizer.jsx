import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DateOptimizer = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-11');
  const [flexibleDates, setFlexibleDates] = useState(true);

  const priceData = [
    { date: 'Nov 1', price: 1250, day: 'Fri', isWeekend: false },
    { date: 'Nov 2', price: 1180, day: 'Sat', isWeekend: true },
    { date: 'Nov 3', price: 1320, day: 'Sun', isWeekend: true },
    { date: 'Nov 4', price: 980, day: 'Mon', isWeekend: false },
    { date: 'Nov 5', price: 920, day: 'Tue', isWeekend: false },
    { date: 'Nov 6', price: 890, day: 'Wed', isWeekend: false },
    { date: 'Nov 7', price: 940, day: 'Thu', isWeekend: false },
    { date: 'Nov 8', price: 1150, day: 'Fri', isWeekend: false },
    { date: 'Nov 9', price: 1280, day: 'Sat', isWeekend: true },
    { date: 'Nov 10', price: 1350, day: 'Sun', isWeekend: true },
    { date: 'Nov 11', price: 850, day: 'Mon', isWeekend: false },
    { date: 'Nov 12', price: 820, day: 'Tue', isWeekend: false },
    { date: 'Nov 13', price: 880, day: 'Wed', isWeekend: false },
    { date: 'Nov 14', price: 910, day: 'Thu', isWeekend: false }
  ];

  const bestDeals = [
    {
      date: 'Nov 12, 2024',
      price: 820,
      savings: 530,
      day: 'Tuesday',
      description: 'Best overall value'
    },
    {
      date: 'Nov 6, 2024',
      price: 890,
      savings: 460,
      day: 'Wednesday',
      description: 'Mid-week special'
    },
    {
      date: 'Nov 11, 2024',
      price: 850,
      savings: 500,
      day: 'Monday',
      description: 'Start of week discount'
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-high">
          <p className="font-medium text-popover-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">{data?.day}</p>
          <p className="text-sm font-semibold text-primary">${data?.price}</p>
          {data?.isWeekend && (
            <p className="text-xs text-accent">Weekend Premium</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border card-elevated">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Date Optimizer</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Calendar" size={16} />
          <span>Find Best Dates</span>
        </div>
      </div>
      {/* Date Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input
          type="month"
          label="Travel Month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e?.target?.value)}
        />
        <div className="flex items-center space-x-3 pt-6">
          <input
            type="checkbox"
            id="flexible-dates"
            checked={flexibleDates}
            onChange={(e) => setFlexibleDates(e?.target?.checked)}
            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
          />
          <label htmlFor="flexible-dates" className="text-sm font-medium text-foreground">
            Flexible dates (±3 days)
          </label>
        </div>
      </div>
      {/* Price Trend Chart */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Price Trends</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Best Deals */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-foreground">Best Deals Found</h4>
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>

        {bestDeals?.map((deal, index) => (
          <div key={index} className="p-4 bg-success/5 rounded-lg border border-success/20 hover:border-success/40 transition-colors duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Calendar" size={20} className="text-success" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{deal?.date}</p>
                  <p className="text-xs text-muted-foreground">{deal?.day} • {deal?.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-success">${deal?.price}</p>
                <p className="text-xs text-success">Save ${deal?.savings}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="TrendingDown" size={12} />
                  <span>{((deal?.savings / (deal?.price + deal?.savings)) * 100)?.toFixed(1)}% off</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>Limited time</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Select Date
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Price Alerts */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-foreground">Price Alerts</h4>
          <Button variant="ghost" size="sm" iconName="Bell">
            Set Alert
          </Button>
        </div>
        
        <div className="p-3 bg-muted rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Bell" size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">Get notified when prices drop</span>
          </div>
          <p className="text-xs text-muted-foreground">
            We'll send you an alert when prices for your selected dates drop by 10% or more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DateOptimizer;