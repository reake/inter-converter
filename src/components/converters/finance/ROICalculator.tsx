'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

export function ROICalculator() {
  const [initialInvestment, setInitialInvestment] = useState<string>('');
  const [finalValue, setFinalValue] = useState<string>('');
  const [investmentPeriod, setInvestmentPeriod] = useState<string>('1');
  const [results, setResults] = useState<{
    roi: number;
    profit: number;
    annualizedROI: number;
    totalReturn: number;
  } | null>(null);

  const calculateROI = () => {
    const initial = parseFloat(initialInvestment) || 0;
    const final = parseFloat(finalValue) || 0;
    const period = parseFloat(investmentPeriod) || 1;
    
    if (initial <= 0) return;

    const profit = final - initial;
    const roi = (profit / initial) * 100;
    const totalReturn = (final / initial - 1) * 100;
    const annualizedROI = period > 0 ? (Math.pow(final / initial, 1 / period) - 1) * 100 : roi;

    setResults({
      roi,
      profit,
      annualizedROI,
      totalReturn
    });
  };

  useEffect(() => {
    if (initialInvestment && finalValue) {
      calculateROI();
    }
  }, [initialInvestment, finalValue, investmentPeriod]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (rate: number) => {
    return `${rate.toFixed(2)}%`;
  };

  const getROIColor = (roi: number) => {
    if (roi > 0) return 'text-green-600';
    if (roi < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getROIBgColor = (roi: number) => {
    if (roi > 0) return 'bg-green-50';
    if (roi < 0) return 'bg-red-50';
    return 'bg-gray-50';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Calculator className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">ROI Calculator</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Calculate return on investment (ROI) for business and personal investments
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Investment Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="initialInvestment">Initial Investment ($)</Label>
              <Input
                id="initialInvestment"
                type="number"
                placeholder="Enter initial investment"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="finalValue">Final Value ($)</Label>
              <Input
                id="finalValue"
                type="number"
                placeholder="Enter final investment value"
                value={finalValue}
                onChange={(e) => setFinalValue(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="investmentPeriod">Investment Period (Years)</Label>
              <Input
                id="investmentPeriod"
                type="number"
                placeholder="Enter investment period"
                value={investmentPeriod}
                onChange={(e) => setInvestmentPeriod(e.target.value)}
                className="mt-1"
              />
            </div>

            <Button onClick={calculateROI} className="w-full">
              Calculate ROI
            </Button>
          </CardContent>
        </Card>

        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>ROI Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-3 rounded-lg ${getROIBgColor(results.roi)}`}>
                  <div className="text-sm font-medium text-gray-600">ROI</div>
                  <div className={`text-lg font-bold ${getROIColor(results.roi)}`}>
                    {formatPercentage(results.roi)}
                  </div>
                </div>

                <div className={`p-3 rounded-lg ${getROIBgColor(results.profit)}`}>
                  <div className="text-sm font-medium text-gray-600">Profit/Loss</div>
                  <div className={`text-lg font-bold ${getROIColor(results.profit)}`}>
                    {formatCurrency(results.profit)}
                  </div>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600 font-medium">Annualized ROI</div>
                  <div className="text-lg font-bold text-blue-900">
                    {formatPercentage(results.annualizedROI)}
                  </div>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-sm text-purple-600 font-medium">Total Return</div>
                  <div className="text-lg font-bold text-purple-900">
                    {formatPercentage(results.totalReturn)}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Investment Performance</span>
                </div>
                <div className={`p-3 rounded-lg ${getROIBgColor(results.roi)}`}>
                  <div className="text-sm font-medium">
                    {results.roi > 0 ? '📈 Profitable Investment' : 
                     results.roi < 0 ? '📉 Loss-Making Investment' : 
                     '➖ Break-Even Investment'}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {results.roi > 15 ? 'Excellent return' :
                     results.roi > 7 ? 'Good return' :
                     results.roi > 0 ? 'Modest return' :
                     'Consider reviewing investment strategy'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ROI Benchmarks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Stock Market</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• S&P 500: ~10% annually</li>
                <li>• Conservative: 5-7%</li>
                <li>• Aggressive: 12-15%</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Real Estate</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Rental properties: 8-12%</li>
                <li>• REITs: 6-10%</li>
                <li>• House flipping: 15-25%</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Business</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Small business: 15-30%</li>
                <li>• Startups: 25-50%</li>
                <li>• Established: 10-20%</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
