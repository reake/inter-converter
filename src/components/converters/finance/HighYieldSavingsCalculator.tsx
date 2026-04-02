'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SavingsResults {
  finalBalance: number;
  totalInterest: number;
  totalContributions: number;
  effectiveAPY: number;
  monthlyBreakdown: Array<{
    month: number;
    balance: number;
    interestEarned: number;
    contribution: number;
  }>;
}

export default function HighYieldSavingsCalculator() {
  const [initialDeposit, setInitialDeposit] = useState<string>('5000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('500');
  const [interestRate, setInterestRate] = useState<string>('4.5');
  const [timeYears, setTimeYears] = useState<string>('5');
  const [results, setResults] = useState<SavingsResults | null>(null);

  const calculateSavings = useCallback(() => {
    const initial = parseFloat(initialDeposit);
    const monthly = parseFloat(monthlyContribution);
    const rate = parseFloat(interestRate) / 100;
    const years = parseFloat(timeYears);

    if (initial < 0 || monthly < 0 || rate < 0 || years <= 0) return;

    const monthlyRate = rate / 12;
    const totalMonths = years * 12;
    let balance = initial;
    let totalContributions = initial;
    const monthlyBreakdown = [];

    for (let month = 1; month <= totalMonths; month++) {
      // Add monthly contribution
      balance += monthly;
      totalContributions += monthly;
      
      // Calculate interest
      const interestEarned = balance * monthlyRate;
      balance += interestEarned;

      monthlyBreakdown.push({
        month,
        balance,
        interestEarned,
        contribution: monthly
      });
    }

    const totalInterest = balance - totalContributions;
    const effectiveAPY = Math.pow(1 + monthlyRate, 12) - 1;

    setResults({
      finalBalance: balance,
      totalInterest,
      totalContributions,
      effectiveAPY,
      monthlyBreakdown
    });
  }, [initialDeposit, monthlyContribution, interestRate, timeYears]);

  useEffect(() => {
    calculateSavings();
  }, [calculateSavings]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (rate: number) => {
    return (rate * 100).toFixed(2) + '%';
  };

  const getBestRates = () => [
    { bank: 'Marcus by Goldman Sachs', apy: '4.50%', minimum: '$0' },
    { bank: 'Ally Bank', apy: '4.35%', minimum: '$0' },
    { bank: 'Capital One 360', apy: '4.30%', minimum: '$0' },
    { bank: 'Discover Bank', apy: '4.25%', minimum: '$2,500' },
    { bank: 'American Express', apy: '4.25%', minimum: '$0' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💰 High-Yield Savings Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="growth">Growth Analysis</TabsTrigger>
              <TabsTrigger value="rates">Best Rates</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="initialDeposit">Initial Deposit</Label>
                    <Input
                      id="initialDeposit"
                      type="number"
                      value={initialDeposit}
                      onChange={(e) => setInitialDeposit(e.target.value)}
                      placeholder="Enter initial deposit"
                    />
                  </div>

                  <div>
                    <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
                    <Input
                      id="monthlyContribution"
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(e.target.value)}
                      placeholder="Enter monthly contribution"
                    />
                  </div>

                  <div>
                    <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="Enter interest rate"
                    />
                  </div>

                  <div>
                    <Label htmlFor="timeYears">Time Period (years)</Label>
                    <Input
                      id="timeYears"
                      type="number"
                      value={timeYears}
                      onChange={(e) => setTimeYears(e.target.value)}
                      placeholder="Enter time period"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Card className="bg-green-50 border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-800 text-lg">High-Yield Benefits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-green-700">
                        <li className="flex items-center gap-2">
                          <span className="text-green-600">✓</span>
                          <span>FDIC insured up to $250,000</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-600">✓</span>
                          <span>Higher rates than traditional savings</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-600">✓</span>
                          <span>No minimum balance requirements</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-600">✓</span>
                          <span>Easy online access and transfers</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-600">✓</span>
                          <span>Perfect for emergency funds</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  {results && (
                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-blue-800 text-lg">Quick Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Effective APY:</span>
                            <span className="font-semibold text-blue-600">{formatPercent(results.effectiveAPY)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Interest:</span>
                            <span className="font-semibold text-green-600">{formatCurrency(results.totalInterest)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Return on Investment:</span>
                            <span className="font-semibold text-purple-600">
                              {((results.totalInterest / results.totalContributions) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {results && (
                <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800">Savings Growth Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(results.finalBalance)}
                        </div>
                        <div className="text-sm text-green-600">Final Balance</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(results.totalContributions)}
                        </div>
                        <div className="text-sm text-blue-600">Total Contributions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {formatCurrency(results.totalInterest)}
                        </div>
                        <div className="text-sm text-purple-600">Interest Earned</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {formatPercent(results.effectiveAPY)}
                        </div>
                        <div className="text-sm text-orange-600">Effective APY</div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span>Initial Deposit:</span>
                          <span className="font-semibold">{formatCurrency(parseFloat(initialDeposit))}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monthly Contribution:</span>
                          <span className="font-semibold">{formatCurrency(parseFloat(monthlyContribution))}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time Period:</span>
                          <span className="font-semibold">{timeYears} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Interest Rate:</span>
                          <span className="font-semibold">{interestRate}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="growth" className="space-y-4">
              {results && (
                <Card>
                  <CardHeader>
                    <CardTitle>Savings Growth Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Year</th>
                            <th className="text-right p-2">Balance</th>
                            <th className="text-right p-2">Annual Interest</th>
                            <th className="text-right p-2">Annual Contributions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: parseInt(timeYears) }, (_, yearIndex) => {
                            const year = yearIndex + 1;
                            const yearEndMonth = year * 12;
                            const yearData = results.monthlyBreakdown[yearEndMonth - 1];
                            const yearStartMonth = (year - 1) * 12;
                            const yearStartBalance = yearStartMonth === 0 ? parseFloat(initialDeposit) : results.monthlyBreakdown[yearStartMonth - 1]?.balance || 0;
                            const annualInterest = yearData ? yearData.balance - yearStartBalance - (parseFloat(monthlyContribution) * 12) : 0;
                            
                            return (
                              <tr key={year} className="border-b hover:bg-gray-50">
                                <td className="p-2 font-semibold">{year}</td>
                                <td className="p-2 text-right font-semibold">{yearData ? formatCurrency(yearData.balance) : '-'}</td>
                                <td className="p-2 text-right text-green-600">{formatCurrency(annualInterest)}</td>
                                <td className="p-2 text-right text-blue-600">{formatCurrency(parseFloat(monthlyContribution) * 12)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800">Compound Interest Power</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {results && (
                      <div className="space-y-3">
                        <div className="text-sm">
                          <div className="flex justify-between mb-2">
                            <span>Without Compounding:</span>
                            <span>{formatCurrency(results.totalContributions + (results.totalContributions * parseFloat(interestRate) / 100 * parseFloat(timeYears)))}</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span>With Compounding:</span>
                            <span className="text-green-600 font-semibold">{formatCurrency(results.finalBalance)}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span>Compounding Benefit:</span>
                            <span className="text-blue-600 font-semibold">
                              {formatCurrency(results.finalBalance - (results.totalContributions + (results.totalContributions * parseFloat(interestRate) / 100 * parseFloat(timeYears))))}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800">vs Traditional Savings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {results && (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between p-2 bg-green-50 rounded">
                          <span>High-Yield ({interestRate}%):</span>
                          <span className="font-semibold text-green-600">{formatCurrency(results.finalBalance)}</span>
                        </div>
                        <div className="flex justify-between p-2 bg-red-50 rounded">
                          <span>Traditional (0.05%):</span>
                          <span className="font-semibold text-red-600">
                            {formatCurrency(results.totalContributions + (results.totalContributions * 0.0005 * parseFloat(timeYears)))}
                          </span>
                        </div>
                        <div className="flex justify-between p-2 bg-blue-50 rounded font-semibold">
                          <span>Difference:</span>
                          <span className="text-blue-600">
                            {formatCurrency(results.finalBalance - (results.totalContributions + (results.totalContributions * 0.0005 * parseFloat(timeYears))))}
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="rates" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Best High-Yield Savings Rates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Bank</th>
                          <th className="text-center p-2">APY</th>
                          <th className="text-center p-2">Minimum Balance</th>
                          <th className="text-center p-2">FDIC Insured</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getBestRates().map((rate, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="p-2 font-semibold">{rate.bank}</td>
                            <td className="p-2 text-center text-green-600 font-semibold">{rate.apy}</td>
                            <td className="p-2 text-center">{rate.minimum}</td>
                            <td className="p-2 text-center text-green-600">✓</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="text-xs text-gray-600 mt-4">
                    * Rates are subject to change. Always verify current rates with the bank.
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800">What to Look For</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Competitive APY (4%+ in 2024)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>No monthly maintenance fees</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Low or no minimum balance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>FDIC insurance protection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Easy online and mobile access</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800">Maximizing Returns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Set up automatic transfers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Compare rates regularly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Keep emergency fund separate</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Consider CD ladders for longer terms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Track interest earnings for taxes</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>High-Yield Savings Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl mb-2">🎯</div>
                      <div className="font-semibold text-green-800">Emergency Fund</div>
                      <div className="text-sm text-green-600 mt-1">
                        3-6 months of expenses in high-yield savings
                      </div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl mb-2">📈</div>
                      <div className="font-semibold text-blue-800">Short-term Goals</div>
                      <div className="text-sm text-blue-600 mt-1">
                        Save for goals 1-3 years away
                      </div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl mb-2">🔄</div>
                      <div className="font-semibold text-purple-800">Cash Management</div>
                      <div className="text-sm text-purple-600 mt-1">
                        Park cash between investments
                      </div>
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
