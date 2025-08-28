'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const currencies = [
  { code: 'USD', name: '美元', rate: 1 },
  { code: 'EUR', name: '欧元', rate: 0.85 },
  { code: 'GBP', name: '英镑', rate: 0.73 },
  { code: 'JPY', name: '日元', rate: 110 },
  { code: 'CNY', name: '人民币', rate: 6.45 },
  { code: 'CAD', name: '加拿大元', rate: 1.25 },
  { code: 'AUD', name: '澳元', rate: 1.35 },
  { code: 'CHF', name: '瑞士法郎', rate: 0.92 },
];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [result, setResult] = useState<number | null>(null);

  const convertCurrency = () => {
    const inputAmount = parseFloat(amount);
    if (inputAmount > 0) {
      const fromRate = currencies.find(c => c.code === fromCurrency)?.rate || 1;
      const toRate = currencies.find(c => c.code === toCurrency)?.rate || 1;
      const convertedAmount = (inputAmount / fromRate) * toRate;
      setResult(convertedAmount);
    }
  };

  const reset = () => {
    setAmount('');
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>货币转换器</CardTitle>
          <CardDescription>在不同货币之间进行转换</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="amount">金额</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100"
              />
            </div>
            <div>
              <Label htmlFor="from">从</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="to">到</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={convertCurrency} className="flex-1">
              转换
            </Button>
            <Button onClick={reset} variant="outline">
              重置
            </Button>
          </div>
        </CardContent>
      </Card>

      {result !== null && (
        <Card>
          <CardHeader>
            <CardTitle>转换结果</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">
                {result.toFixed(2)} {toCurrency}
              </div>
              <div className="text-sm text-blue-600 mt-2">
                {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
