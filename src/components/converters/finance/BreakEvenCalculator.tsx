'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Target, DollarSign, TrendingUp } from 'lucide-react';

export function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState<string>('');
  const [variableCostPerUnit, setVariableCostPerUnit] = useState<string>('');
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState<string>('');
  const [results, setResults] = useState<{
    breakEvenUnits: number;
    breakEvenRevenue: number;
    contributionMargin: number;
    contributionMarginRatio: number;
    profitAtUnits: (units: number) => number;
  } | null>(null);

  const calculateBreakEven = () => {
    const fixed = parseFloat(fixedCosts) || 0;
    const variableCost = parseFloat(variableCostPerUnit) || 0;
    const sellingPrice = parseFloat(sellingPricePerUnit) || 0;
    
    if (fixed <= 0 || sellingPrice <= 0 || sellingPrice <= variableCost) return;

    const contributionMargin = sellingPrice - variableCost;
    const contributionMarginRatio = (contributionMargin / sellingPrice) * 100;
    const breakEvenUnits = fixed / contributionMargin;
    const breakEvenRevenue = breakEvenUnits * sellingPrice;

    const profitAtUnits = (units: number) => {
      return (units * contributionMargin) - fixed;
    };

    setResults({
      breakEvenUnits,
      breakEvenRevenue,
      contributionMargin,
      contributionMarginRatio,
      profitAtUnits
    });
  };

  useEffect(() => {
    if (fixedCosts && variableCostPerUnit && sellingPricePerUnit) {
      calculateBreakEven();
    }
  }, [fixedCosts, variableCostPerUnit, sellingPricePerUnit]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatPercentage = (rate: number) => {
    return `${rate.toFixed(1)}%`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Calculator className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Break Even Calculator</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Calculate break-even point for business and investment decisions
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Cost Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="fixedCosts">Fixed Costs ($)</Label>
              <Input
                id="fixedCosts"
                type="number"
                placeholder="Enter total fixed costs"
                value={fixedCosts}
                onChange={(e) => setFixedCosts(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Rent, salaries, insurance, etc.</p>
            </div>

            <div>
              <Label htmlFor="variableCostPerUnit">Variable Cost per Unit ($)</Label>
              <Input
                id="variableCostPerUnit"
                type="number"
                placeholder="Enter variable cost per unit"
                value={variableCostPerUnit}
                onChange={(e) => setVariableCostPerUnit(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Materials, direct labor, shipping, etc.</p>
            </div>

            <div>
              <Label htmlFor="sellingPricePerUnit">Selling Price per Unit ($)</Label>
              <Input
                id="sellingPricePerUnit"
                type="number"
                placeholder="Enter selling price per unit"
                value={sellingPricePerUnit}
                onChange={(e) => setSellingPricePerUnit(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Price charged to customers</p>
            </div>

            <Button onClick={calculateBreakEven} className="w-full">
              Calculate Break Even
            </Button>
          </CardContent>
        </Card>

        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Break Even Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600 font-medium">Break Even Units</div>
                  <div className="text-lg font-bold text-blue-900">
                    {formatNumber(results.breakEvenUnits)}
                  </div>
                </div>

                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-600 font-medium">Break Even Revenue</div>
                  <div className="text-lg font-bold text-green-900">
                    {formatCurrency(results.breakEvenRevenue)}
                  </div>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-sm text-purple-600 font-medium">Contribution Margin</div>
                  <div className="text-lg font-bold text-purple-900">
                    {formatCurrency(results.contributionMargin)}
                  </div>
                </div>

                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="text-sm text-orange-600 font-medium">Margin Ratio</div>
                  <div className="text-lg font-bold text-orange-900">
                    {formatPercentage(results.contributionMarginRatio)}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center space-x-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Profit Scenarios</span>
                </div>
                <div className="space-y-2">
                  {[1.25, 1.5, 2].map((multiplier) => {
                    const units = Math.round(results.breakEvenUnits * multiplier);
                    const profit = results.profitAtUnits(units);
                    return (
                      <div key={multiplier} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm">{formatNumber(units)} units</span>
                        <span className={`text-sm font-medium ${profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(profit)} profit
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Break Even Analysis Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Fixed Costs</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Rent and utilities</li>
                <li>• Salaries and benefits</li>
                <li>• Insurance premiums</li>
                <li>• Equipment depreciation</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Variable Costs</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Raw materials</li>
                <li>• Direct labor</li>
                <li>• Shipping and packaging</li>
                <li>• Sales commissions</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Key Insights</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Higher margin = lower break-even</li>
                <li>• Fixed costs spread over more units</li>
                <li>• Price changes affect break-even</li>
                <li>• Volume discounts impact analysis</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
