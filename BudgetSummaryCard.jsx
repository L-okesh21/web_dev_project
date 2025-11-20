import React from 'react';
import Icon from '../../../components/AppIcon';

const BudgetSummaryCard = ({ totalBudget, estimatedCost, savings, currency = 'USD' }) => {
  const savingsPercentage = totalBudget > 0 ? ((savings / totalBudget) * 100)?.toFixed(1) : 0;
  const isOverBudget = estimatedCost > totalBudget;

  return (
    <div className="bg-card rounded-xl p-6 border border-border card-elevated">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Budget Summary</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="DollarSign" size={16} />
          <span>{currency}</span>
        </div>
      </div>
      <div className="space-y-4">
        {/* Total Budget */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Target" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Total Budget</p>
              <p className="text-xs text-muted-foreground">Your planned spending limit</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-foreground">${totalBudget?.toLocaleString()}</p>
          </div>
        </div>

        {/* Estimated Cost */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isOverBudget ? 'bg-destructive/10' : 'bg-accent/10'
            }`}>
              <Icon name="Calculator" size={20} className={isOverBudget ? 'text-destructive' : 'text-accent'} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Estimated Cost</p>
              <p className="text-xs text-muted-foreground">Current trip calculation</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-lg font-bold ${isOverBudget ? 'text-destructive' : 'text-foreground'}`}>
              ${estimatedCost?.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Savings */}
        <div className="flex items-center justify-between p-4 bg-success/5 rounded-lg border border-success/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingDown" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Potential Savings</p>
              <p className="text-xs text-success">{savingsPercentage}% below budget</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-success">${savings?.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">vs original estimate</p>
          </div>
        </div>
      </div>
      {/* Budget Status Indicator */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Budget Status</span>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
            isOverBudget 
              ? 'bg-destructive/10 text-destructive' 
              : savings > 0 
                ? 'bg-success/10 text-success' :'bg-accent/10 text-accent'
          }`}>
            <Icon 
              name={isOverBudget ? "AlertTriangle" : savings > 0 ? "CheckCircle" : "Clock"} 
              size={12} 
            />
            <span>
              {isOverBudget ? 'Over Budget' : savings > 0 ? 'Under Budget' : 'On Target'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSummaryCard;