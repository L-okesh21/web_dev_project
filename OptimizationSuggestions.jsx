import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OptimizationSuggestions = ({ suggestions, onApplySuggestion }) => {
  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'accommodation': return 'Bed';
      case 'transportation': return 'Plane';
      case 'food': return 'UtensilsCrossed';
      case 'activities': return 'MapPin';
      case 'timing': return 'Calendar';
      default: return 'Lightbulb';
    }
  };

  const getSuggestionColor = (savings) => {
    if (savings >= 200) return 'text-success';
    if (savings >= 100) return 'text-accent';
    return 'text-primary';
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border card-elevated">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Smart Savings Suggestions</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Sparkles" size={16} />
          <span>{suggestions?.length} recommendations</span>
        </div>
      </div>
      <div className="space-y-4">
        {suggestions?.map((suggestion) => (
          <div key={suggestion?.id} className="p-4 bg-muted rounded-lg border border-border hover:border-primary/30 transition-colors duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={getSuggestionIcon(suggestion?.type)} size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-foreground mb-1">{suggestion?.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{suggestion?.description}</p>
                  
                  {/* Impact Metrics */}
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="TrendingDown" size={14} className={getSuggestionColor(suggestion?.savings)} />
                      <span className={`text-sm font-medium ${getSuggestionColor(suggestion?.savings)}`}>
                        Save ${suggestion?.savings}
                      </span>
                    </div>
                    {suggestion?.impact && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Zap" size={14} className="text-accent" />
                        <span className="text-sm text-muted-foreground">{suggestion?.impact}</span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  {suggestion?.details && (
                    <div className="bg-background rounded-lg p-3 mb-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {suggestion?.details?.map((detail, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Icon name="Check" size={12} className="text-success" />
                            <span className="text-muted-foreground">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  suggestion?.priority === 'high' ?'bg-destructive/10 text-destructive'
                    : suggestion?.priority === 'medium' ?'bg-accent/10 text-accent' :'bg-success/10 text-success'
                }`}>
                  {suggestion?.priority} impact
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onApplySuggestion(suggestion?.id)}
                  className="text-xs"
                >
                  Apply
                </Button>
              </div>
            </div>

            {/* Progress Bar for Savings */}
            <div className="w-full bg-background rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-success to-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((suggestion?.savings / 500) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Apply All Button */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Total potential savings: <span className="font-semibold text-success">
              ${suggestions?.reduce((sum, s) => sum + s?.savings, 0)?.toLocaleString()}
            </span>
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={() => suggestions?.forEach(s => onApplySuggestion(s?.id))}
            iconName="CheckCircle"
            iconPosition="left"
          >
            Apply All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OptimizationSuggestions;