'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ExchangeRate {
  currency: string;
  rate: number;
  change24h: number;
}

interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

export default function CurrencyExchangeCalculator() {
  const [amount, setAmount] = useState<string>('1000');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [exchangeRate, setExchangeRate] = useState<number>(0.85);
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const currencies: CurrencyInfo[] = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
    { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
    { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰' },
    { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', flag: '🇵🇱' },
    { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿' },
    { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺' },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
    { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
    { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' }
  ];

  // Mock exchange rates (in a real app, these would come from an API)
  const mockRates: { [key: string]: { [key: string]: number } } = {
    'USD': {
      'EUR': 0.85, 'GBP': 0.73, 'JPY': 110.0, 'CHF': 0.88, 'CAD': 1.25,
      'AUD': 1.35, 'CNY': 6.45, 'INR': 74.5, 'KRW': 1180.0, 'SGD': 1.35,
      'HKD': 7.8, 'SEK': 8.5, 'NOK': 8.8, 'DKK': 6.3, 'PLN': 3.9,
      'CZK': 21.5, 'HUF': 295.0, 'RUB': 75.0, 'BRL': 5.2, 'MXN': 20.1,
      'ZAR': 14.8, 'TRY': 8.5, 'NZD': 1.42
    }
  };

  const getExchangeRate = (from: string, to: string): number => {
    if (from === to) return 1;
    
    // Get rate from USD base
    const fromRate = from === 'USD' ? 1 : (1 / (mockRates['USD'][from] || 1));
    const toRate = to === 'USD' ? 1 : (mockRates['USD'][to] || 1);
    
    return toRate / fromRate;
  };

  const calculateConversion = () => {
    const inputAmount = parseFloat(amount);
    if (inputAmount <= 0) return;

    const rate = getExchangeRate(fromCurrency, toCurrency);
    setExchangeRate(rate);
    setConvertedAmount(inputAmount * rate);
    setLastUpdated(new Date());
  };

  useEffect(() => {
    calculateConversion();
  }, [amount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const formatCurrency = (amount: number, currencyCode: string) => {
    const currency = currencies.find(c => c.code === currencyCode);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: currencyCode === 'JPY' || currencyCode === 'KRW' ? 0 : 2,
      maximumFractionDigits: currencyCode === 'JPY' || currencyCode === 'KRW' ? 0 : 4,
    }).format(amount);
  };

  const getPopularPairs = () => {
    return [
      { from: 'USD', to: 'EUR', label: 'USD → EUR' },
      { from: 'USD', to: 'GBP', label: 'USD → GBP' },
      { from: 'EUR', to: 'USD', label: 'EUR → USD' },
      { from: 'GBP', to: 'USD', label: 'GBP → USD' },
      { from: 'USD', to: 'JPY', label: 'USD → JPY' },
      { from: 'USD', to: 'CNY', label: 'USD → CNY' }
    ];
  };

  const getCurrencyInfo = (code: string) => {
    return currencies.find(c => c.code === code) || currencies[0];
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💱 Currency Exchange Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="converter" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="converter">Converter</TabsTrigger>
              <TabsTrigger value="rates">Exchange Rates</TabsTrigger>
              <TabsTrigger value="trends">Market Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="converter" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fromCurrency">From Currency</Label>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <span className="flex items-center gap-2">
                            <span>{currency.flag}</span>
                            <span>{currency.code}</span>
                            <span className="text-gray-500">- {currency.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={swapCurrencies}
                    className="rounded-full"
                  >
                    ⇄
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="toCurrency">To Currency</Label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <span className="flex items-center gap-2">
                            <span>{currency.flag}</span>
                            <span>{currency.code}</span>
                            <span className="text-gray-500">- {currency.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800">Conversion Result</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-blue-600">
                      {formatCurrency(convertedAmount, toCurrency)}
                    </div>
                    <div className="text-lg text-gray-600">
                      {formatCurrency(parseFloat(amount), fromCurrency)} = {formatCurrency(convertedAmount, toCurrency)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Exchange Rate: 1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}
                    </div>
                    <div className="text-xs text-gray-400">
                      Last updated: {lastUpdated.toLocaleTimeString()}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Currency Pairs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {getPopularPairs().map((pair, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setFromCurrency(pair.from);
                          setToCurrency(pair.to);
                        }}
                        className="justify-start"
                      >
                        <span className="flex items-center gap-1">
                          <span>{getCurrencyInfo(pair.from).flag}</span>
                          <span>→</span>
                          <span>{getCurrencyInfo(pair.to).flag}</span>
                          <span className="ml-1">{pair.label}</span>
                        </span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rates" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Exchange Rates (Base: USD)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currencies.slice(1, 13).map((currency) => {
                      const rate = getExchangeRate('USD', currency.code);
                      return (
                        <div key={currency.code} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{currency.flag}</span>
                            <div>
                              <div className="font-semibold">{currency.code}</div>
                              <div className="text-xs text-gray-500">{currency.name}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{rate.toFixed(4)}</div>
                            <div className="text-xs text-green-600">+0.12%</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800">Market Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>USD remains strong against major currencies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>EUR showing stability amid economic uncertainty</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Asian currencies gaining momentum</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Commodity currencies affected by global trade</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800">Exchange Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Monitor rates before large transactions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Consider timing for international transfers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Use limit orders for better rates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Compare fees across different providers</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Currency Factors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-purple-700 mb-2">📊 Economic Indicators</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Interest rates and monetary policy</li>
                        <li>• GDP growth and economic performance</li>
                        <li>• Inflation rates and price stability</li>
                        <li>• Employment data and labor markets</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-700 mb-2">🌍 Global Factors</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Political stability and government policies</li>
                        <li>• Trade relationships and agreements</li>
                        <li>• Commodity prices and natural resources</li>
                        <li>• Market sentiment and risk appetite</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
