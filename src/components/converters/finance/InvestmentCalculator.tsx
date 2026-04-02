'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InvestmentResult {
  finalValue: number;
  totalContributions: number;
  totalGains: number;
  annualizedReturn: number;
  yearlyBreakdown: Array<{
    year: number;
    startingValue: number;
    contributions: number;
    gains: number;
    endingValue: number;
  }>;
}

export default function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState<string>('10000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('500');
  const [expectedReturn, setExpectedReturn] = useState<string>('7');
  const [investmentPeriod, setInvestmentPeriod] = useState<string>('20');
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>('12');
  const [result, setResult] = useState<InvestmentResult | null>(null);

  const calculateInvestment = () => {
    const initial = parseFloat(initialInvestment) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = parseFloat(expectedReturn) / 100 || 0;
    const years = parseFloat(investmentPeriod) || 0;
    if (years <= 0) return;

    const monthlyRate = rate / 12;
    const yearlyBreakdown = [];
    
    let currentValue = initial;
    let totalContributions = initial;

    for (let year = 1; year <= years; year++) {
      const startingValue = currentValue;
      const yearContributions = monthly * 12;
      
      // Calculate monthly compounding for the year
      for (let month = 1; month <= 12; month++) {
        const monthlyGain = currentValue * monthlyRate;
        currentValue += monthlyGain + monthly;
      }
      
      totalContributions += yearContributions;
      const yearGains = currentValue - startingValue - yearContributions;
      
      yearlyBreakdown.push({
        year,
        startingValue: Math.round(startingValue * 100) / 100,
        contributions: Math.round(yearContributions * 100) / 100,
        gains: Math.round(yearGains * 100) / 100,
        endingValue: Math.round(currentValue * 100) / 100
      });
    }

    const finalValue = Math.round(currentValue * 100) / 100;
    const totalGains = Math.round((finalValue - totalContributions) * 100) / 100;
    const annualizedReturn = Math.round(((Math.pow(finalValue / initial, 1 / years) - 1) * 100) * 100) / 100;

    setResult({
      finalValue,
      totalContributions: Math.round(totalContributions * 100) / 100,
      totalGains,
      annualizedReturn,
      yearlyBreakdown
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📈 Investment Calculator
          </CardTitle>
          <CardDescription>
            Calculate investment growth with compound returns and regular contributions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="initial-investment">Initial Investment ($)</Label>
              <Input
                id="initial-investment"
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                placeholder="10000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthly-contribution">Monthly Contribution ($)</Label>
              <Input
                id="monthly-contribution"
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                placeholder="500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expected-return">Expected Annual Return (%)</Label>
              <Input
                id="expected-return"
                type="number"
                step="0.1"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                placeholder="7"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="investment-period">Investment Period (Years)</Label>
              <Input
                id="investment-period"
                type="number"
                value={investmentPeriod}
                onChange={(e) => setInvestmentPeriod(e.target.value)}
                placeholder="20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="compounding">Compounding Frequency</Label>
              <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Annually</SelectItem>
                  <SelectItem value="4">Quarterly</SelectItem>
                  <SelectItem value="12">Monthly</SelectItem>
                  <SelectItem value="365">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={calculateInvestment} className="w-full">
            Calculate Investment Growth
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Final Value</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(result.finalValue)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Contributions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(result.totalContributions)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Gains</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-600">
                {formatCurrency(result.totalGains)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Annualized Return</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-orange-600">
                {result.annualizedReturn}%
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {result && result.yearlyBreakdown.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Investment Growth Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Year</th>
                    <th className="text-right p-2">Starting Value</th>
                    <th className="text-right p-2">Contributions</th>
                    <th className="text-right p-2">Gains</th>
                    <th className="text-right p-2">Ending Value</th>
                  </tr>
                </thead>
                <tbody>
                  {result.yearlyBreakdown.map((row, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{row.year}</td>
                      <td className="text-right p-2">
                        {formatCurrency(row.startingValue)}
                      </td>
                      <td className="text-right p-2 text-blue-600">
                        {formatCurrency(row.contributions)}
                      </td>
                      <td className="text-right p-2 text-green-600">
                        {formatCurrency(row.gains)}
                      </td>
                      <td className="text-right p-2 font-medium">
                        {formatCurrency(row.endingValue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-green-900 mb-2">💡 Investment Tips</h3>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Start investing early to maximize compound growth</li>
            <li>• Diversify across different asset classes and sectors</li>
            <li>• Consider low-cost index funds for broad market exposure</li>
            <li>• Don&apos;t try to time the market - stay consistent</li>
            <li>• Rebalance your portfolio periodically</li>
            <li>• Keep fees low to maximize returns</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
