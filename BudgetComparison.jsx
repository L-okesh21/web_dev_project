import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const BudgetComparison = ({ comparisonData }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-high">
          <p className="font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.dataKey}:</span>
              <span className="font-medium text-popover-foreground">
                ${entry?.value?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const totalOriginal = comparisonData?.reduce((sum, item) => sum + item?.original, 0);
  const totalOptimized = comparisonData?.reduce((sum, item) => sum + item?.optimized, 0);
  const totalSavings = totalOriginal - totalOptimized;
  const savingsPercentage = ((totalSavings / totalOriginal) * 100)?.toFixed(1);

  return (
    <div className="bg-card rounded-xl p-6 border border-border card-elevated">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Before vs After Optimization</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="BarChart3" size={16} />
          <span>Comparison</span>
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-destructive" />
            <span className="text-sm font-medium text-foreground">Original Budget</span>
          </div>
          <p className="text-xl font-bold text-destructive">${totalOriginal?.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Initial estimation</p>
        </div>

        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Optimized Budget</span>
          </div>
          <p className="text-xl font-bold text-primary">${totalOptimized?.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">After optimization</p>
        </div>

        <div className="p-4 bg-success/5 rounded-lg border border-success/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingDown" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Total Savings</span>
          </div>
          <p className="text-xl font-bold text-success">${totalSavings?.toLocaleString()}</p>
          <p className="text-xs text-success">{savingsPercentage}% reduction</p>
        </div>
      </div>
      {/* Comparison Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="category" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="original" 
              name="Original" 
              fill="var(--color-destructive)" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="optimized" 
              name="Optimized" 
              fill="var(--color-primary)" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Detailed Breakdown */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Category Breakdown</h4>
        {comparisonData?.map((item, index) => {
          const savings = item?.original - item?.optimized;
          const savingsPercent = ((savings / item?.original) * 100)?.toFixed(1);
          
          return (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Package" size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item?.category}</p>
                  <p className="text-xs text-muted-foreground">
                    {savingsPercent}% savings
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground line-through">
                    ${item?.original?.toLocaleString()}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    ${item?.optimized?.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-success">
                  Save ${savings?.toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetComparison;