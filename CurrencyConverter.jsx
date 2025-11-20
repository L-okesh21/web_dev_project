import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const CurrencyConverter = () => {
  const [fromAmount, setFromAmount] = useState('1000');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState('850.00');

  const currencies = [
    { value: 'USD', label: 'US Dollar (USD)', flag: '🇺🇸' },
    { value: 'EUR', label: 'Euro (EUR)', flag: '🇪🇺' },
    { value: 'GBP', label: 'British Pound (GBP)', flag: '🇬🇧' },
    { value: 'JPY', label: 'Japanese Yen (JPY)', flag: '🇯🇵' },
    { value: 'CAD', label: 'Canadian Dollar (CAD)', flag: '🇨🇦' },
    { value: 'AUD', label: 'Australian Dollar (AUD)', flag: '🇦🇺' },
    { value: 'CHF', label: 'Swiss Franc (CHF)', flag: '🇨🇭' },
    { value: 'CNY', label: 'Chinese Yuan (CNY)', flag: '🇨🇳' },
    { value: 'INR', label: 'Indian Rupee (INR)', flag: '🇮🇳' },
    { value: 'KRW', label: 'South Korean Won (KRW)', flag: '🇰🇷' }
  ];

  const exchangeRates = {
    'USD': { 'EUR': 0.85, 'GBP': 0.73, 'JPY': 110.25, 'CAD': 1.25, 'AUD': 1.35, 'CHF': 0.92, 'CNY': 6.45, 'INR': 74.50, 'KRW': 1180.00 },
    'EUR': { 'USD': 1.18, 'GBP': 0.86, 'JPY': 129.70, 'CAD': 1.47, 'AUD': 1.59, 'CHF': 1.08, 'CNY': 7.59, 'INR': 87.71, 'KRW': 1388.24 },
    'GBP': { 'USD': 1.37, 'EUR': 1.16, 'JPY': 151.04, 'CAD': 1.71, 'AUD': 1.85, 'CHF': 1.26, 'CNY': 8.84, 'INR': 102.05, 'KRW': 1616.44 }
  };

  const handleConvert = () => {
    const amount = parseFloat(fromAmount);
    if (isNaN(amount)) return;

    if (fromCurrency === toCurrency) {
      setConvertedAmount(amount?.toFixed(2));
      return;
    }

    let rate = 1;
    if (exchangeRates?.[fromCurrency] && exchangeRates?.[fromCurrency]?.[toCurrency]) {
      rate = exchangeRates?.[fromCurrency]?.[toCurrency];
    } else if (exchangeRates?.[toCurrency] && exchangeRates?.[toCurrency]?.[fromCurrency]) {
      rate = 1 / exchangeRates?.[toCurrency]?.[fromCurrency];
    }

    const converted = amount * rate;
    setConvertedAmount(converted?.toFixed(2));
  };

  const handleSwapCurrencies = () => {
    const tempCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
    setFromAmount(convertedAmount);
    setConvertedAmount(fromAmount);
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border card-elevated">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Currency Converter</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="ArrowLeftRight" size={16} />
          <span>Live Rates</span>
        </div>
      </div>
      <div className="space-y-4">
        {/* From Currency */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">From</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Enter amount"
              value={fromAmount}
              onChange={(e) => setFromAmount(e?.target?.value)}
              className="text-lg font-semibold"
            />
            <Select
              options={currencies}
              value={fromCurrency}
              onChange={setFromCurrency}
              placeholder="Select currency"
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSwapCurrencies}
            iconName="ArrowUpDown"
            className="rounded-full"
          />
        </div>

        {/* To Currency */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">To</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-muted rounded-lg border border-border">
              <div className="text-lg font-bold text-foreground">{convertedAmount}</div>
              <div className="text-xs text-muted-foreground">Converted amount</div>
            </div>
            <Select
              options={currencies}
              value={toCurrency}
              onChange={setToCurrency}
              placeholder="Select currency"
            />
          </div>
        </div>

        {/* Convert Button */}
        <Button
          variant="default"
          fullWidth
          onClick={handleConvert}
          iconName="Calculator"
          iconPosition="left"
        >
          Convert Currency
        </Button>

        {/* Exchange Rate Info */}
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Exchange Rate</span>
            <div className="flex items-center space-x-1 text-xs text-success">
              <Icon name="TrendingUp" size={12} />
              <span>+0.25%</span>
            </div>
          </div>
          <div className="text-sm font-medium text-foreground">
            1 {fromCurrency} = {exchangeRates?.[fromCurrency]?.[toCurrency]?.toFixed(4) || '1.0000'} {toCurrency}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Last updated: {new Date()?.toLocaleTimeString()}
          </div>
        </div>

        {/* Popular Conversions */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Quick Conversions</h4>
          <div className="grid grid-cols-2 gap-2">
            {[
              { from: 'USD', to: 'EUR', rate: 0.85 },
              { from: 'USD', to: 'GBP', rate: 0.73 },
              { from: 'EUR', to: 'USD', rate: 1.18 },
              { from: 'GBP', to: 'USD', rate: 1.37 }
            ]?.map((conversion, index) => (
              <button
                key={index}
                onClick={() => {
                  setFromCurrency(conversion?.from);
                  setToCurrency(conversion?.to);
                  setFromAmount('100');
                  setConvertedAmount((100 * conversion?.rate)?.toFixed(2));
                }}
                className="p-2 text-left bg-background rounded-lg hover:bg-muted transition-colors duration-200"
              >
                <div className="text-xs font-medium text-foreground">
                  {conversion?.from} → {conversion?.to}
                </div>
                <div className="text-xs text-muted-foreground">
                  {conversion?.rate?.toFixed(4)}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;