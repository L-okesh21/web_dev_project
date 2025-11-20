import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { id: 1, title: 'Destination', icon: 'MapPin' },
    { id: 2, title: 'Details', icon: 'Calendar' },
    { id: 3, title: 'Plan', icon: 'Route' }
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border mb-6">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step?.id <= currentStep
                    ? 'bg-primary text-primary-foreground'
                    : step?.id === currentStep + 1
                    ? 'bg-primary/20 text-primary border-2 border-primary' :'bg-muted text-muted-foreground'
                }`}
              >
                {step?.id < currentStep ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <Icon name={step?.icon} size={20} />
                )}
              </div>
              <div className="hidden sm:block">
                <p
                  className={`text-sm font-medium ${
                    step?.id <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {step?.title}
                </p>
                <p className="text-xs text-muted-foreground">Step {step?.id}</p>
              </div>
            </div>
            {index < steps?.length - 1 && (
              <div className="flex-1 mx-4">
                <div
                  className={`h-0.5 transition-all duration-300 ${
                    step?.id < currentStep ? 'bg-primary' : 'bg-border'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Mobile step indicator */}
      <div className="sm:hidden mt-4 text-center">
        <p className="text-sm font-medium text-foreground">
          Step {currentStep} of {totalSteps}: {steps?.[currentStep - 1]?.title}
        </p>
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;