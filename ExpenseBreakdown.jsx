import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const ExpenseBreakdown = ({ expenses }) => {
  const colors = [
    'var(--color-primary)',
    'var(--color-accent)',
    'var(--color-success)',
    'var(--color-warning)',
    'var(--color-destructive)',
    '#8B5CF6',
    '#F59E0B',
    '#06B6D4'
  ];

  const totalAmount = expenses?.reduce((sum, expense) => sum + expense?.amount, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      const percentage = ((data?.amount / totalAmount) * 100)?.toFixed(1);
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-high">
          <p className="font-medium text-popover-foreground">{data?.category}</p>
          <p className="text-sm text-muted-foreground">
            ${data?.amount?.toLocaleString()} ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border card-elevated">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Expense Breakdown</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="PieChart" size={16} />
          <span>Categories</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenses}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="amount"
              >
                {expenses?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors?.[index % colors?.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category List */}
        <div className="space-y-3">
          {expenses?.map((expense, index) => {
            const percentage = ((expense?.amount / totalAmount) * 100)?.toFixed(1);
            return (
              <div key={expense?.category} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: colors?.[index % colors?.length] }}
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">{expense?.category}</p>
                    <p className="text-xs text-muted-foreground">{percentage}% of total</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">${expense?.amount?.toLocaleString()}</p>
                  {expense?.optimizedAmount && (
                    <p className="text-xs text-success">
                      Save ${(expense?.amount - expense?.optimizedAmount)?.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Total Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Total Expenses</span>
          <span className="text-lg font-bold text-foreground">${totalAmount?.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ExpenseBreakdown;