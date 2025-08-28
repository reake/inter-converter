'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CDResults {
  maturityValue: number;
  totalInterest: number;
  effectiveAPY: number;
  monthlyBreakdown: Array<{
    month: number;
    balance: number;
    interestEarned: number;
  }>;
}

export default function CDCalculator() {
  const [principal, setPrincipal] = useState<string>('10000');
  const [interestRate, setInterestRate] = useState<string>('4.5');
  const [term, setTerm] = useState<string>('12');
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>('12');
  const [results, setResults] = useState<CDResults | null>(null);

  const calculateCD = () => {
    const p = parseFloat(principal);
    const r = parseFloat(interestRate) / 100;
    const t = parseFloat(term) / 12; // Convert months to years
    const n = parseFloat(compoundingFrequency);

    if (p <= 0 || r < 0 || t <= 0 || n <= 0) return;

    // Compound interest formula: A = P(1 + r/n)^(nt)
    const maturityValue = p * Math.pow(1 + r / n, n * t);
    const totalInterest = maturityValue - p;
    
    // Calculate effective APY
    const effectiveAPY = Math.pow(1 + r / n, n) - 1;

    // Generate monthly breakdown
    const monthlyBreakdown = [];
    const monthsTotal = parseFloat(term);
    
    for (let month = 1; month <= monthsTotal; month++) {
      const timeInYears = month / 12;
      const balance = p * Math.pow(1 + r / n, n * timeInYears);
      const interestEarned = balance - p;
      
      monthlyBreakdown.push({
        month,
        balance,
        interestEarned
      });
    }

    setResults({
      maturityValue,
      totalInterest,
      effectiveAPY,
      monthlyBreakdown
    });
  };

  useEffect(() => {
    calculateCD();
  }, [principal, interestRate, term, compoundingFrequency]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercent = (rate: number) => {
    return (rate * 100).toFixed(2) + '%';
  };

  const getCompoundingLabel = (freq: string) => {
    const labels: { [key: string]: string } = {
      '1': 'Annually',
      '2': 'Semi-annually',
      '4': 'Quarterly',
      '12': 'Monthly',
      '365': 'Daily'
    };
    return labels[freq] || freq;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💰 Certificate of Deposit (CD) Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="growth">Growth Chart</TabsTrigger>
              <TabsTrigger value="guide">CD Guide</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="principal">Initial Deposit</Label>
                    <Input
                      id="principal"
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      placeholder="Enter initial deposit"
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
                    <Label htmlFor="term">CD Term (months)</Label>
                    <Select value={term} onValueChange={setTerm}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 months</SelectItem>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="9">9 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="18">18 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                        <SelectItem value="36">36 months</SelectItem>
                        <SelectItem value="48">48 months</SelectItem>
                        <SelectItem value="60">60 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="compounding">Compounding Frequency</Label>
                    <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Annually</SelectItem>
                        <SelectItem value="2">Semi-annually</SelectItem>
                        <SelectItem value="4">Quarterly</SelectItem>
                        <SelectItem value="12">Monthly</SelectItem>
                        <SelectItem value="365">Daily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-800 text-lg">CD Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-blue-700">
                        <li className="flex items-center gap-2">
                          <span className="text-green-600">✓</span>
                          <span>FDIC insured up to $250,000</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-600">✓</span>
                          <span>Fixed interest rate</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-600">✓</span>
                          <span>Guaranteed returns</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-red-600">⚠</span>
                          <span>Early withdrawal penalties</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-red-600">⚠</span>
                          <span>Funds locked until maturity</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  {results && (
                    <Card className="bg-green-50 border-green-200">
                      <CardHeader>
                        <CardTitle className="text-green-800 text-lg">Quick Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Effective APY:</span>
                            <span className="font-semibold text-green-600">{formatPercent(results.effectiveAPY)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Interest:</span>
                            <span className="font-semibold text-green-600">{formatCurrency(results.totalInterest)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Compounding:</span>
                            <span className="font-semibold">{getCompoundingLabel(compoundingFrequency)}</span>
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
                    <CardTitle className="text-green-800">CD Maturity Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(results.maturityValue)}
                        </div>
                        <div className="text-sm text-green-600">Maturity Value</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(results.totalInterest)}
                        </div>
                        <div className="text-sm text-blue-600">Interest Earned</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {formatPercent(results.effectiveAPY)}
                        </div>
                        <div className="text-sm text-purple-600">Effective APY</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {term} months
                        </div>
                        <div className="text-sm text-orange-600">CD Term</div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span>Initial Deposit:</span>
                          <span className="font-semibold">{formatCurrency(parseFloat(principal))}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Annual Rate:</span>
                          <span className="font-semibold">{interestRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Compounding:</span>
                          <span className="font-semibold">{getCompoundingLabel(compoundingFrequency)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Return Rate:</span>
                          <span className="font-semibold text-green-600">
                            {((results.totalInterest / parseFloat(principal)) * 100).toFixed(2)}%
                          </span>
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
                    <CardTitle>CD Growth Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Month</th>
                            <th className="text-right p-2">Balance</th>
                            <th className="text-right p-2">Interest Earned</th>
                            <th className="text-right p-2">Growth %</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.monthlyBreakdown.filter((_, index) => index % 3 === 0 || index === results.monthlyBreakdown.length - 1).map((month) => (
                            <tr key={month.month} className="border-b hover:bg-gray-50">
                              <td className="p-2 font-semibold">{month.month}</td>
                              <td className="p-2 text-right font-semibold">{formatCurrency(month.balance)}</td>
                              <td className="p-2 text-right text-green-600">{formatCurrency(month.interestEarned)}</td>
                              <td className="p-2 text-right text-blue-600">
                                {((month.interestEarned / parseFloat(principal)) * 100).toFixed(2)}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800">Compounding Effect</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {results && (
                      <div className="space-y-3">
                        <div className="text-sm">
                          <div className="flex justify-between mb-1">
                            <span>Simple Interest:</span>
                            <span>{formatCurrency(parseFloat(principal) * (parseFloat(interestRate) / 100) * (parseFloat(term) / 12))}</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span>Compound Interest:</span>
                            <span className="text-green-600 font-semibold">{formatCurrency(results.totalInterest)}</span>
                          </div>
                          <div className="flex justify-between border-t pt-1">
                            <span>Compounding Benefit:</span>
                            <span className="text-blue-600 font-semibold">
                              {formatCurrency(results.totalInterest - (parseFloat(principal) * (parseFloat(interestRate) / 100) * (parseFloat(term) / 12)))}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800">Investment Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between p-2 bg-green-50 rounded">
                        <span>CD (Guaranteed):</span>
                        <span className="font-semibold text-green-600">{formatPercent(results?.effectiveAPY || 0)}</span>
                      </div>
                      <div className="flex justify-between p-2 bg-blue-50 rounded">
                        <span>High-Yield Savings:</span>
                        <span className="font-semibold">3.5-4.5%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-yellow-50 rounded">
                        <span>Money Market:</span>
                        <span className="font-semibold">4.0-5.0%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-purple-50 rounded">
                        <span>Treasury Bills:</span>
                        <span className="font-semibold">4.5-5.5%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="guide" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800">CD Advantages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>FDIC insurance protection up to $250,000</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Fixed, guaranteed interest rate</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>No market risk or volatility</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Higher rates than regular savings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Predictable returns for planning</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800">CD Disadvantages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Funds locked until maturity date</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Early withdrawal penalties</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Lower returns than stocks/bonds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Inflation risk over time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Opportunity cost of better investments</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>CD Strategy Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl mb-2">🪜</div>
                      <div className="font-semibold text-blue-800">CD Laddering</div>
                      <div className="text-sm text-blue-600 mt-1">
                        Stagger maturity dates for liquidity and rate optimization
                      </div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl mb-2">📊</div>
                      <div className="font-semibold text-green-800">Rate Shopping</div>
                      <div className="text-sm text-green-600 mt-1">
                        Compare rates across banks and credit unions
                      </div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl mb-2">⏰</div>
                      <div className="font-semibold text-purple-800">Timing</div>
                      <div className="text-sm text-purple-600 mt-1">
                        Consider rate trends and your liquidity needs
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
