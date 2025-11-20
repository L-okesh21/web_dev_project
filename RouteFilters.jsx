import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const RouteFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const transportOptions = [
    { value: 'all', label: 'All Transport' },
    { value: 'car', label: 'Car' },
    { value: 'plane', label: 'Flight' },
    { value: 'train', label: 'Train' },
    { value: 'bus', label: 'Bus' }
  ];

  const sortOptions = [
    { value: 'fastest', label: 'Fastest Route' },
    { value: 'cheapest', label: 'Cheapest Route' },
    { value: 'balanced', label: 'Best Balance' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  const trafficOptions = [
    { value: 'light', label: 'Light Traffic' },
    { value: 'moderate', label: 'Moderate Traffic' },
    { value: 'heavy', label: 'Heavy Traffic' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleCheckboxChange = (key, checked) => {
    onFiltersChange({
      ...filters,
      [key]: checked
    });
  };

  const activeFiltersCount = Object.values(filters)?.filter(value => 
    value && value !== 'all' && value !== ''
  )?.length;

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="font-semibold text-card-foreground">Filters</h3>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearFilters}
          iconName="X"
          className="text-muted-foreground hover:text-foreground"
        >
          Clear
        </Button>
      </div>
      <div className="space-y-4">
        {/* Transport Type */}
        <div>
          <Select
            label="Transport Type"
            options={transportOptions}
            value={filters?.transport || 'all'}
            onChange={(value) => handleFilterChange('transport', value)}
            className="w-full"
          />
        </div>

        {/* Sort By */}
        <div>
          <Select
            label="Sort By"
            options={sortOptions}
            value={filters?.sortBy || 'fastest'}
            onChange={(value) => handleFilterChange('sortBy', value)}
            className="w-full"
          />
        </div>

        {/* Duration Range */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Max Duration
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="30"
              max="1440"
              step="30"
              value={filters?.maxDuration || 480}
              onChange={(e) => handleFilterChange('maxDuration', parseInt(e?.target?.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>30min</span>
              <span className="font-medium text-card-foreground">
                {Math.floor((filters?.maxDuration || 480) / 60)}h {(filters?.maxDuration || 480) % 60}m
              </span>
              <span>24h</span>
            </div>
          </div>
        </div>

        {/* Budget Range */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Max Budget
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="50"
              max="2000"
              step="50"
              value={filters?.maxBudget || 500}
              onChange={(e) => handleFilterChange('maxBudget', parseInt(e?.target?.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$50</span>
              <span className="font-medium text-card-foreground">
                ${filters?.maxBudget || 500}
              </span>
              <span>$2000</span>
            </div>
          </div>
        </div>

        {/* Traffic Conditions */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-3">
            Traffic Conditions
          </label>
          <div className="space-y-2">
            {trafficOptions?.map((option) => (
              <Checkbox
                key={option?.value}
                label={option?.label}
                checked={filters?.traffic?.includes(option?.value) || false}
                onChange={(e) => {
                  const currentTraffic = filters?.traffic || [];
                  const newTraffic = e?.target?.checked
                    ? [...currentTraffic, option?.value]
                    : currentTraffic?.filter(t => t !== option?.value);
                  handleFilterChange('traffic', newTraffic);
                }}
              />
            ))}
          </div>
        </div>

        {/* Route Features */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-3">
            Route Features
          </label>
          <div className="space-y-2">
            <Checkbox
              label="Scenic Route"
              checked={filters?.scenic || false}
              onChange={(e) => handleCheckboxChange('scenic', e?.target?.checked)}
            />
            <Checkbox
              label="Toll-Free"
              checked={filters?.tollFree || false}
              onChange={(e) => handleCheckboxChange('tollFree', e?.target?.checked)}
            />
            <Checkbox
              label="Rest Stops"
              checked={filters?.restStops || false}
              onChange={(e) => handleCheckboxChange('restStops', e?.target?.checked)}
            />
            <Checkbox
              label="Fuel Stations"
              checked={filters?.fuelStations || false}
              onChange={(e) => handleCheckboxChange('fuelStations', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Community Verified */}
        <div>
          <Checkbox
            label="Community Verified Routes"
            description="Routes validated by verified travelers"
            checked={filters?.communityVerified || false}
            onChange={(e) => handleCheckboxChange('communityVerified', e?.target?.checked)}
          />
        </div>

        {/* Bookmarked Only */}
        <div>
          <Checkbox
            label="Bookmarked Routes Only"
            checked={filters?.bookmarkedOnly || false}
            onChange={(e) => handleCheckboxChange('bookmarkedOnly', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Quick Filters */}
      <div className="mt-6 pt-4 border-t border-border">
        <label className="block text-sm font-medium text-card-foreground mb-3">
          Quick Filters
        </label>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filters?.quickFilter === 'business' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('quickFilter', 
              filters?.quickFilter === 'business' ? '' : 'business'
            )}
          >
            Business Travel
          </Button>
          <Button
            variant={filters?.quickFilter === 'leisure' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('quickFilter', 
              filters?.quickFilter === 'leisure' ? '' : 'leisure'
            )}
          >
            Leisure Travel
          </Button>
          <Button
            variant={filters?.quickFilter === 'family' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('quickFilter', 
              filters?.quickFilter === 'family' ? '' : 'family'
            )}
          >
            Family Friendly
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RouteFilters;