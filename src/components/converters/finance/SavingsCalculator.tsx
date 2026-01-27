'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SavingsResult {
  finalAmount: number;
  totalContributions: number;
  totalInterest: number;
  monthlyBreakdown: Array<{
    month: number;
    balance: number;
    interestEarned: number;
    totalContributions: number;
  }>;
}

export default function SavingsCalculator() {
  const [initialAmount, setInitialAmount] = useState<string>('1000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('100');
  const [annualRate, setAnnualRate] = useState<string>('5');
  const [years, setYears] = useState<string>('10');
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>('12');
  const [result, setResult] = useState<SavingsResult | null>(null);

  const calculateSavings = () => {
    const principal = parseFloat(initialAmount) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = parseFloat(annualRate) / 100 || 0;
    const time = parseFloat(years) || 0;
    if (rate === 0 || time === 0) return;

    const monthlyRate = rate / 12;
    const totalMonths = time * 12;
    const monthlyBreakdown = [];
    let balance = principal;
    let totalContributions = principal;

    for (let month = 1; month <= totalMonths; month++) {
      const interestEarned = balance * monthlyRate;
      balance += interestEarned + monthly;
      totalContributions += monthly;

      if (month % 12 === 0 || month === totalMonths) {
        monthlyBreakdown.push({
          month,
          balance: Math.round(balance * 100) / 100,
          interestEarned: Math.round(interestEarned * 100) / 100,
          totalContributions: Math.round(totalContributions * 100) / 100
        });
      }
    }

    const finalAmount = Math.round(balance * 100) / 100;
    const totalInterest = Math.round((finalAmount - totalContributions) * 100) / 100;

    setResult({
      finalAmount,
      totalContributions: Math.round(totalContributions * 100) / 100,
      totalInterest,
      monthlyBreakdown
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
            💰 Savings Calculator
          </CardTitle>
          <CardDescription>
            Calculate how your savings will grow over time with compound interest and regular contributions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="initial-amount">Initial Amount ($)</Label>
              <Input
                id="initial-amount"
                type="number"
                value={initialAmount}
                onChange={(e) => setInitialAmount(e.target.value)}
                placeholder="1000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthly-contribution">Monthly Contribution ($)</Label>
              <Input
                id="monthly-contribution"
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                placeholder="100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="annual-rate">Annual Interest Rate (%)</Label>
              <Input
                id="annual-rate"
                type="number"
                step="0.1"
                value={annualRate}
                onChange={(e) => setAnnualRate(e.target.value)}
                placeholder="5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="years">Time Period (Years)</Label>
              <Input
                id="years"
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="10"
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

          <Button onClick={calculateSavings} className="w-full">
            Calculate Savings Growth
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Final Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(result.finalAmount)}
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
              <CardTitle className="text-lg">Interest Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-600">
                {formatCurrency(result.totalInterest)}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {result && result.monthlyBreakdown.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Savings Growth Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Year</th>
                    <th className="text-right p-2">Balance</th>
                    <th className="text-right p-2">Total Contributions</th>
                    <th className="text-right p-2">Interest Earned</th>
                  </tr>
                </thead>
                <tbody>
                  {result.monthlyBreakdown.map((row, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{Math.ceil(row.month / 12)}</td>
                      <td className="text-right p-2 font-medium">
                        {formatCurrency(row.balance)}
                      </td>
                      <td className="text-right p-2">
                        {formatCurrency(row.totalContributions)}
                      </td>
                      <td className="text-right p-2 text-purple-600">
                        {formatCurrency(row.balance - row.totalContributions)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Savings Tips</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Start saving early to maximize compound interest benefits</li>
            <li>• Automate your savings to ensure consistent contributions</li>
            <li>• Consider high-yield savings accounts for better interest rates</li>
            <li>• Review and increase contributions when your income grows</li>
            <li>• Set specific savings goals to stay motivated</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
