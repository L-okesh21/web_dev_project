import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ExpenseTracker = ({ expenses, onAddExpense, totalBudget }) => {
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: '',
    description: '',
    date: new Date()?.toISOString()?.split('T')?.[0]
  });

  const categoryOptions = [
    { value: 'accommodation', label: 'Accommodation' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'food', label: 'Food & Dining' },
    { value: 'activities', label: 'Activities' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'miscellaneous', label: 'Miscellaneous' }
  ];

  const getCategoryIcon = (category) => {
    const icons = {
      accommodation: 'Bed',
      transportation: 'Car',
      food: 'Utensils',
      activities: 'Camera',
      shopping: 'ShoppingBag',
      miscellaneous: 'MoreHorizontal'
    };
    return icons?.[category] || 'DollarSign';
  };

  const getCategoryColor = (category) => {
    const colors = {
      accommodation: 'text-blue-600',
      transportation: 'text-green-600',
      food: 'text-orange-600',
      activities: 'text-purple-600',
      shopping: 'text-pink-600',
      miscellaneous: 'text-gray-600'
    };
    return colors?.[category] || 'text-gray-600';
  };

  const totalSpent = expenses?.reduce((sum, expense) => sum + expense?.amount, 0);
  const remainingBudget = totalBudget - totalSpent;

  const handleAddExpense = () => {
    if (newExpense?.category && newExpense?.amount && newExpense?.description) {
      onAddExpense({
        ...newExpense,
        amount: parseFloat(newExpense?.amount),
        id: Date.now(),
        timestamp: new Date()?.toISOString()
      });
      setNewExpense({
        category: '',
        amount: '',
        description: '',
        date: new Date()?.toISOString()?.split('T')?.[0]
      });
      setIsAddingExpense(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Expense Tracker</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAddingExpense(!isAddingExpense)}
          iconName="Plus"
          iconPosition="left"
        >
          Add Expense
        </Button>
      </div>
      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Total Budget</span>
          </div>
          <p className="text-xl font-bold text-foreground">{formatCurrency(totalBudget)}</p>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-destructive" />
            <span className="text-sm font-medium text-muted-foreground">Total Spent</span>
          </div>
          <p className="text-xl font-bold text-foreground">{formatCurrency(totalSpent)}</p>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Wallet" size={16} className={remainingBudget >= 0 ? 'text-success' : 'text-destructive'} />
            <span className="text-sm font-medium text-muted-foreground">Remaining</span>
          </div>
          <p className={`text-xl font-bold ${remainingBudget >= 0 ? 'text-success' : 'text-destructive'}`}>
            {formatCurrency(remainingBudget)}
          </p>
        </div>
      </div>
      {/* Budget Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Budget Usage</span>
          <span className="text-foreground font-medium">
            {((totalSpent / totalBudget) * 100)?.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${
              totalSpent > totalBudget ? 'bg-destructive' : 'bg-primary'
            }`}
            style={{ width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%` }}
          />
        </div>
      </div>
      {/* Add Expense Form */}
      {isAddingExpense && (
        <div className="bg-muted rounded-lg p-4 mb-6">
          <h4 className="text-md font-medium text-foreground mb-4">Add New Expense</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Category"
              options={categoryOptions}
              value={newExpense?.category}
              onChange={(value) => setNewExpense({ ...newExpense, category: value })}
              placeholder="Select category"
            />
            <Input
              label="Amount"
              type="number"
              placeholder="0.00"
              value={newExpense?.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e?.target?.value })}
            />
            <Input
              label="Description"
              type="text"
              placeholder="What did you spend on?"
              value={newExpense?.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e?.target?.value })}
            />
            <Input
              label="Date"
              type="date"
              value={newExpense?.date}
              onChange={(e) => setNewExpense({ ...newExpense, date: e?.target?.value })}
            />
          </div>
          <div className="flex space-x-2 mt-4">
            <Button variant="default" onClick={handleAddExpense}>
              Add Expense
            </Button>
            <Button variant="outline" onClick={() => setIsAddingExpense(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      {/* Recent Expenses */}
      <div>
        <h4 className="text-md font-medium text-foreground mb-4">Recent Expenses</h4>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {expenses?.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="Receipt" size={48} className="mx-auto mb-2 opacity-50" />
              <p>No expenses recorded yet</p>
              <p className="text-sm">Add your first expense to start tracking</p>
            </div>
          ) : (
            expenses?.map((expense) => (
              <div key={expense?.id} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-muted ${getCategoryColor(expense?.category)}`}>
                    <Icon name={getCategoryIcon(expense?.category)} size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{expense?.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {expense?.category?.charAt(0)?.toUpperCase() + expense?.category?.slice(1)} • {expense?.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{formatCurrency(expense?.amount)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;