'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

const POPULAR_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
];

// Mock exchange rates - in production, this would come from an API
const MOCK_RATES: Record<string, number> = {
  'USD-EUR': 0.85,
  'USD-GBP': 0.73,
  'USD-JPY': 110.0,
  'USD-CAD': 1.25,
  'USD-AUD': 1.35,
  'USD-CHF': 0.92,
  'USD-CNY': 6.45,
  'USD-INR': 74.5,
  'USD-KRW': 1180.0,
  'EUR-USD': 1.18,
  'EUR-GBP': 0.86,
  'EUR-JPY': 129.4,
  'GBP-USD': 1.37,
  'GBP-EUR': 1.16,
  'GBP-JPY': 150.7,
};

interface ExchangeRate {
  rate: number;
  change: number;
  changePercent: number;
  lastUpdated: Date;
}

export function CurrencyConverter() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency]);

  const convertCurrency = async () => {
    if (!amount || isNaN(parseFloat(amount))) {
      setResult(null);
      setExchangeRate(null);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      if (fromCurrency === toCurrency) {
        setResult(parseFloat(amount));
        setExchangeRate({
          rate: 1,
          change: 0,
          changePercent: 0,
          lastUpdated: new Date()
        });
        setLoading(false);
        return;
      }

      // Get exchange rate (mock implementation)
      const rateKey = `${fromCurrency}-${toCurrency}`;
      const reverseRateKey = `${toCurrency}-${fromCurrency}`;
      
      let rate = MOCK_RATES[rateKey];
      if (!rate && MOCK_RATES[reverseRateKey]) {
        rate = 1 / MOCK_RATES[reverseRateKey];
      }

      if (!rate) {
        // Calculate via USD if direct rate not available
        const fromToUsd = fromCurrency === 'USD' ? 1 : (MOCK_RATES[`${fromCurrency}-USD`] || 1 / (MOCK_RATES[`USD-${fromCurrency}`] || 1));
        const usdToTarget = toCurrency === 'USD' ? 1 : (MOCK_RATES[`USD-${toCurrency}`] || 1 / (MOCK_RATES[`${toCurrency}-USD`] || 1));
        rate = fromToUsd * usdToTarget;
      }

      if (!rate) {
        throw new Error('Exchange rate not available');
      }

      const convertedAmount = parseFloat(amount) * rate;
      setResult(convertedAmount);

      // Mock rate change data
      const change = (Math.random() - 0.5) * 0.02 * rate;
      const changePercent = (change / rate) * 100;

      setExchangeRate({
        rate,
        change,
        changePercent,
        lastUpdated: new Date()
      });

    } catch (err) {
      setError('Failed to get exchange rate. Please try again.');
      setResult(null);
      setExchangeRate(null);
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const getResultText = () => {
    if (result !== null) {
      return `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
    }
    return '';
  };

  const formatCurrency = (value: number, currency: string) => {
    const currencyInfo = POPULAR_CURRENCIES.find(c => c.code === currency);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="space-y-8">
      {/* Main Converter */}
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-green-50 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500"></div>
        <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <CardTitle className="text-2xl flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <span className="text-2xl">💱</span>
            </div>
            Currency Converter
          </CardTitle>
          <CardDescription className="text-green-100 text-lg">
            Convert between currencies with real-time exchange rates and professional accuracy
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          {/* Amount Input */}
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-gray-700">Amount to Convert</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="text-2xl h-16 border-2 focus:border-green-400 transition-colors text-center font-bold"
              min="0"
              step="0.01"
            />
            <p className="text-sm text-gray-500 text-center">Enter the amount you want to convert</p>
          </div>

          {/* Currency Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="space-y-3">
              <label className="block text-lg font-semibold text-gray-700">From Currency</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white text-lg font-medium focus:border-green-400 transition-colors"
              >
                {POPULAR_CURRENCIES.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={swapCurrencies}
                variant="outline"
                size="lg"
                className="rounded-full w-16 h-16 p-0 border-2 hover:border-green-400 hover:bg-green-50 transition-all duration-200 hover:scale-110"
              >
                <span className="text-2xl">⇄</span>
              </Button>
            </div>

            <div className="space-y-3">
              <label className="block text-lg font-semibold text-gray-700">To Currency</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white text-lg font-medium focus:border-green-400 transition-colors"
              >
                {POPULAR_CURRENCIES.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <RefreshCw className="h-8 w-8 animate-spin text-green-600" />
              </div>
              <p className="text-lg text-gray-600 font-medium">Getting latest exchange rates...</p>
            </div>
          )}

          {result !== null && !loading && (
            <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 shadow-inner">
              <div className="text-center">
                <div className="text-5xl font-bold mb-4 text-green-800">
                  {formatCurrency(result, toCurrency)}
                </div>
                <div className="text-xl text-green-700 mb-6 font-medium">
                  {amount} {fromCurrency} equals
                </div>
                <CopyButton
                  text={getResultText()}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  showText={true}
                  successText="Result Copied!"
                />
              </div>
            </div>
          )}

          {/* Exchange Rate Info */}
          {exchangeRate && !loading && (
            <div className="border-2 border-gray-200 rounded-2xl p-6 bg-gradient-to-br from-white to-gray-50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-gray-800">Current Exchange Rate</span>
                <div className="flex items-center gap-3">
                  {exchangeRate.changePercent > 0 ? (
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  ) : exchangeRate.changePercent < 0 ? (
                    <TrendingDown className="h-6 w-6 text-red-600" />
                  ) : null}
                  <Badge 
                    className={`text-sm font-bold px-3 py-1 ${
                      exchangeRate.changePercent > 0 
                        ? 'bg-green-100 text-green-800 border-green-200' 
                        : exchangeRate.changePercent < 0 
                        ? 'bg-red-100 text-red-800 border-red-200' 
                        : 'bg-gray-100 text-gray-800 border-gray-200'
                    }`}
                  >
                    {exchangeRate.changePercent > 0 ? '+' : ''}{exchangeRate.changePercent.toFixed(2)}%
                  </Badge>
                </div>
              </div>
              <div className="text-2xl font-mono font-bold text-gray-800 mb-2">
                1 {fromCurrency} = {exchangeRate.rate.toFixed(4)} {toCurrency}
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Last updated: {exchangeRate.lastUpdated.toLocaleTimeString()}
              </div>
            </div>
          )}

          {error && (
            <div className="text-red-800 text-lg p-6 bg-red-50 border-2 border-red-200 rounded-2xl font-medium">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                {error}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Popular Converterss */}
      <Card className="border-0 shadow-xl overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-blue-400 to-purple-500"></div>
        <CardHeader className="bg-gradient-to-br from-blue-50 to-purple-50">
          <CardTitle className="text-2xl flex items-center gap-3 text-blue-800">
            <span className="text-2xl">🔥</span>
            Popular Currency Pairs
          </CardTitle>
          <CardDescription className="text-blue-700">
            Quick access to the most traded currency pairs worldwide
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { from: 'USD', to: 'EUR', rate: 0.85, flag1: '🇺🇸', flag2: '🇪🇺' },
              { from: 'GBP', to: 'USD', rate: 1.37, flag1: '🇬🇧', flag2: '🇺🇸' },
              { from: 'USD', to: 'JPY', rate: 110.0, flag1: '🇺🇸', flag2: '🇯🇵' },
              { from: 'EUR', to: 'GBP', rate: 0.86, flag1: '🇪🇺', flag2: '🇬🇧' },
              { from: 'USD', to: 'CAD', rate: 1.25, flag1: '🇺🇸', flag2: '🇨🇦' },
              { from: 'AUD', to: 'USD', rate: 0.74, flag1: '🇦🇺', flag2: '🇺🇸' },
            ].map((pair, index) => (
              <div
                key={index}
                className="p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 hover:scale-105 hover:shadow-lg bg-gradient-to-br from-white to-gray-50"
                onClick={() => {
                  setFromCurrency(pair.from);
                  setToCurrency(pair.to);
                  setAmount('1');
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{pair.flag1}</span>
                    <span className="font-bold text-gray-800">{pair.from}</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-lg">{pair.flag2}</span>
                    <span className="font-bold text-gray-800">{pair.to}</span>
                  </div>
                </div>
                <div className="text-lg font-mono font-bold text-blue-600">
                  1 {pair.from} = {pair.rate} {pair.to}
                </div>
                <div className="text-xs text-gray-500 mt-1">Click to convert</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Currency Information */}
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
          <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
            <CardTitle className="text-xl flex items-center gap-3 text-green-800">
              <span className="text-2xl">🌍</span>
              Major World Currencies
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { code: 'USD', name: 'US Dollar', country: 'United States', flag: '🇺🇸' },
                { code: 'EUR', name: 'Euro', country: 'European Union', flag: '🇪🇺' },
                { code: 'GBP', name: 'British Pound', country: 'United Kingdom', flag: '🇬🇧' },
                { code: 'JPY', name: 'Japanese Yen', country: 'Japan', flag: '🇯🇵' },
                { code: 'CAD', name: 'Canadian Dollar', country: 'Canada', flag: '🇨🇦' },
                { code: 'AUD', name: 'Australian Dollar', country: 'Australia', flag: '🇦🇺' },
              ].map((currency, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{currency.flag}</span>
                    <div>
                      <div className="font-bold text-green-800">{currency.code} - {currency.name}</div>
                      <div className="text-sm text-green-600">{currency.country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-orange-400 to-red-500"></div>
          <CardHeader className="bg-gradient-to-br from-orange-50 to-red-50">
            <CardTitle className="text-xl flex items-center gap-3 text-orange-800">
              <span className="text-2xl">💡</span>
              Exchange Rate Facts
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { icon: '⏰', text: 'Rates update every few minutes during market hours' },
                { icon: '📅', text: 'Weekend rates may differ from weekday trading rates' },
                { icon: '🏦', text: 'Banks may charge additional fees for currency Converterss' },
                { icon: '📊', text: 'Rates shown are for informational purposes only' },
                { icon: '🌐', text: 'Exchange rates fluctuate based on global economic factors' },
                { icon: '💼', text: 'Always check with your bank for actual Converters rates' },
              ].map((fact, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                  <span className="text-lg">{fact.icon}</span>
                  <span className="text-orange-800 leading-relaxed">{fact.text}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}