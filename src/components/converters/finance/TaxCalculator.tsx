'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const taxBrackets = [
  { min: 0, max: 10275, rate: 0.10 },
  { min: 10275, max: 41775, rate: 0.12 },
  { min: 41775, max: 89450, rate: 0.22 },
  { min: 89450, max: 190750, rate: 0.24 },
  { min: 190750, max: 364200, rate: 0.32 },
  { min: 364200, max: 462500, rate: 0.35 },
  { min: 462500, max: Infinity, rate: 0.37 }
];

interface TaxResult {
  totalTax: number;
  effectiveRate: number;
  afterTaxIncome: number;
  marginalRate: number;
}

export default function TaxCalculator() {
  const [income, setIncome] = useState<string>('');
  const [filingStatus, setFilingStatus] = useState<string>('single');
  const [result, setResult] = useState<TaxResult | null>(null);

  const calculateTax = () => {
    const grossIncome = parseFloat(income);
    if (grossIncome > 0) {
      let totalTax = 0;
      let remainingIncome = grossIncome;
      
      for (const bracket of taxBrackets) {
        if (remainingIncome <= 0) break;
        
        const taxableInThisBracket = Math.min(remainingIncome, bracket.max - bracket.min);
        totalTax += taxableInThisBracket * bracket.rate;
        remainingIncome -= taxableInThisBracket;
      }

      const effectiveRate = (totalTax / grossIncome) * 100;
      const afterTaxIncome = grossIncome - totalTax;
      const marginalRate = taxBrackets.find(bracket => 
        grossIncome > bracket.min && grossIncome <= bracket.max
      )?.rate || 0.37;

      setResult({
        totalTax,
        effectiveRate,
        afterTaxIncome,
        marginalRate: marginalRate * 100
      });
    }
  };

  const reset = () => {
    setIncome('');
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>税收计算器</CardTitle>
          <CardDescription>计算联邦所得税和税后收入</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="income">年收入 ($)</Label>
              <Input
                id="income"
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="75000"
              />
            </div>
            <div>
              <Label htmlFor="status">申报状态</Label>
              <Select value={filingStatus} onValueChange={setFilingStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">单身</SelectItem>
                  <SelectItem value="married">已婚合并申报</SelectItem>
                  <SelectItem value="married-separate">已婚分别申报</SelectItem>
                  <SelectItem value="head">户主</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={calculateTax} className="flex-1">
              计算税收
            </Button>
            <Button onClick={reset} variant="outline">
              重置
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>税收计算结果</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  ${result.totalTax.toFixed(2)}
                </div>
                <div className="text-sm text-red-600">联邦税</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  ${result.afterTaxIncome.toFixed(2)}
                </div>
                <div className="text-sm text-green-600">税后收入</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {result.effectiveRate.toFixed(2)}%
                </div>
                <div className="text-sm text-blue-600">有效税率</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {result.marginalRate.toFixed(2)}%
                </div>
                <div className="text-sm text-orange-600">边际税率</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
