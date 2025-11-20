import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RouteComparison = ({ routes, onRouteSelect, selectedRoutes }) => {
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const getTransportIcon = (type) => {
    const icons = {
      car: 'Car',
      plane: 'Plane',
      train: 'Train',
      bus: 'Bus',
      walking: 'MapPin'
    };
    return icons?.[type] || 'MapPin';
  };

  const getBestValue = (routes, key) => {
    if (key === 'cost') {
      return Math.min(...routes?.map(r => r?.[key]));
    }
    if (key === 'duration') {
      return Math.min(...routes?.map(r => r?.[key]));
    }
    if (key === 'rating') {
      return Math.max(...routes?.map(r => r?.[key] || 0));
    }
    return null;
  };

  const bestCost = getBestValue(routes, 'cost');
  const bestDuration = getBestValue(routes, 'duration');
  const bestRating = getBestValue(routes, 'rating');

  if (routes?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="Route" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-card-foreground mb-2">No Routes to Compare</h3>
        <p className="text-muted-foreground">Select routes from the list to compare them side by side.</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-card-foreground">Route Comparison</h3>
          <div className="text-sm text-muted-foreground">
            Comparing {routes?.length} route{routes?.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium text-card-foreground">Route</th>
              <th className="text-center p-4 font-medium text-card-foreground">Transport</th>
              <th className="text-center p-4 font-medium text-card-foreground">Duration</th>
              <th className="text-center p-4 font-medium text-card-foreground">Distance</th>
              <th className="text-center p-4 font-medium text-card-foreground">Cost</th>
              <th className="text-center p-4 font-medium text-card-foreground">Traffic</th>
              <th className="text-center p-4 font-medium text-card-foreground">Rating</th>
              <th className="text-center p-4 font-medium text-card-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {routes?.map((route, index) => (
              <tr key={route?.id} className={`border-t border-border ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}>
                {/* Route Name */}
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-success' : index === 1 ? 'bg-warning' : 'bg-destructive'
                    }`} />
                    <div>
                      <div className="font-medium text-card-foreground">{route?.name}</div>
                      <div className="text-sm text-muted-foreground">{route?.description}</div>
                    </div>
                  </div>
                </td>

                {/* Transport */}
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center">
                    <div className="p-2 bg-muted rounded-lg">
                      <Icon name={getTransportIcon(route?.transport)} size={16} />
                    </div>
                  </div>
                </td>

                {/* Duration */}
                <td className="p-4 text-center">
                  <div className={`font-medium ${route?.duration === bestDuration ? 'text-success' : 'text-card-foreground'}`}>
                    {formatDuration(route?.duration)}
                  </div>
                  {route?.duration === bestDuration && (
                    <div className="text-xs text-success">Fastest</div>
                  )}
                </td>

                {/* Distance */}
                <td className="p-4 text-center">
                  <div className="font-medium text-card-foreground">{route?.distance}</div>
                </td>

                {/* Cost */}
                <td className="p-4 text-center">
                  <div className={`font-medium ${route?.cost === bestCost ? 'text-success' : 'text-card-foreground'}`}>
                    {formatCurrency(route?.cost)}
                  </div>
                  {route?.cost === bestCost && (
                    <div className="text-xs text-success">Cheapest</div>
                  )}
                </td>

                {/* Traffic */}
                <td className="p-4 text-center">
                  <div className={`flex items-center justify-center space-x-1 ${
                    route?.traffic === 'light' ? 'text-success' :
                    route?.traffic === 'moderate' ? 'text-warning' : 'text-destructive'
                  }`}>
                    <Icon name="Clock" size={14} />
                    <span className="text-sm capitalize">{route?.traffic}</span>
                  </div>
                </td>

                {/* Rating */}
                <td className="p-4 text-center">
                  {route?.rating ? (
                    <div className={`${route?.rating === bestRating ? 'text-success' : 'text-card-foreground'}`}>
                      <div className="flex items-center justify-center space-x-1">
                        <Icon name="Star" size={14} className="text-warning fill-current" />
                        <span className="font-medium">{route?.rating}</span>
                      </div>
                      {route?.rating === bestRating && (
                        <div className="text-xs text-success">Highest</div>
                      )}
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">No rating</span>
                  )}
                </td>

                {/* Action */}
                <td className="p-4 text-center">
                  <Button
                    variant={selectedRoutes?.includes(route?.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => onRouteSelect(route)}
                    iconName={selectedRoutes?.includes(route?.id) ? "Check" : "Plus"}
                  >
                    {selectedRoutes?.includes(route?.id) ? 'Selected' : 'Select'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Summary Stats */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Fastest Route</div>
            <div className="font-semibold text-success">{formatDuration(bestDuration)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Cheapest Route</div>
            <div className="font-semibold text-success">{formatCurrency(bestCost)}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Best Rated</div>
            <div className="font-semibold text-success">{bestRating || 'N/A'}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Avg. Savings</div>
            <div className="font-semibold text-card-foreground">
              {formatCurrency(Math.round(routes?.reduce((sum, r) => sum + r?.cost, 0) / routes?.length - bestCost))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteComparison;