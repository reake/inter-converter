'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RefinanceResults {
  newMonthlyPayment: number;
  currentMonthlyPayment: number;
  monthlySavings: number;
  totalSavings: number;
  breakEvenMonths: number;
  totalInterestNew: number;
  totalInterestCurrent: number;
  interestSavings: number;
  worthRefinancing: boolean;
}

export default function MortgageRefinanceCalculator() {
  const [currentBalance, setCurrentBalance] = useState<string>('300000');
  const [currentRate, setCurrentRate] = useState<string>('7.5');
  const [currentYearsLeft, setCurrentYearsLeft] = useState<string>('25');
  const [newRate, setNewRate] = useState<string>('6.0');
  const [newTerm, setNewTerm] = useState<string>('30');
  const [closingCosts, setClosingCosts] = useState<string>('5000');
  const [results, setResults] = useState<RefinanceResults | null>(null);

  const calculateRefinance = useCallback(() => {
    const balance = parseFloat(currentBalance);
    const currentR = parseFloat(currentRate) / 100 / 12;
    const currentMonths = parseFloat(currentYearsLeft) * 12;
    const newR = parseFloat(newRate) / 100 / 12;
    const newMonths = parseFloat(newTerm) * 12;
    const costs = parseFloat(closingCosts);

    if (balance <= 0 || currentR < 0 || newR < 0 || currentMonths <= 0 || newMonths <= 0) return;

    // Current mortgage payment
    const currentMonthlyPayment = (balance * currentR * Math.pow(1 + currentR, currentMonths)) / (Math.pow(1 + currentR, currentMonths) - 1);
    
    // New mortgage payment
    const newMonthlyPayment = (balance * newR * Math.pow(1 + newR, newMonths)) / (Math.pow(1 + newR, newMonths) - 1);
    
    const monthlySavings = currentMonthlyPayment - newMonthlyPayment;
    
    // Break-even calculation
    const breakEvenMonths = monthlySavings > 0 ? costs / monthlySavings : 0;
    
    // Total interest calculations
    const totalInterestCurrent = (currentMonthlyPayment * currentMonths) - balance;
    const totalInterestNew = (newMonthlyPayment * newMonths) - balance;
    const interestSavings = totalInterestCurrent - totalInterestNew;
    
    // Total savings over remaining term
    const totalSavings = (monthlySavings * Math.min(currentMonths, newMonths)) - costs;
    
    const worthRefinancing = monthlySavings > 0 && breakEvenMonths < 60 && totalSavings > 0;

    setResults({
      newMonthlyPayment,
      currentMonthlyPayment,
      monthlySavings,
      totalSavings,
      breakEvenMonths,
      totalInterestNew,
      totalInterestCurrent,
      interestSavings,
      worthRefinancing
    });
  }, [currentBalance, currentRate, currentYearsLeft, newRate, newTerm, closingCosts]);

  useEffect(() => {
    calculateRefinance();
  }, [calculateRefinance]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatMonths = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = Math.round(months % 12);
    if (years === 0) return `${remainingMonths} months`;
    if (remainingMonths === 0) return `${years} years`;
    return `${years} years, ${remainingMonths} months`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔄 Mortgage Refinance Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="guide">Refinance Guide</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="text-red-800">Current Mortgage</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="currentBalance">Remaining Balance</Label>
                      <Input
                        id="currentBalance"
                        type="number"
                        value={currentBalance}
                        onChange={(e) => setCurrentBalance(e.target.value)}
                        placeholder="Enter remaining balance"
                      />
                    </div>

                    <div>
                      <Label htmlFor="currentRate">Current Interest Rate (%)</Label>
                      <Input
                        id="currentRate"
                        type="number"
                        step="0.01"
                        value={currentRate}
                        onChange={(e) => setCurrentRate(e.target.value)}
                        placeholder="Enter current rate"
                      />
                    </div>

                    <div>
                      <Label htmlFor="currentYearsLeft">Years Remaining</Label>
                      <Input
                        id="currentYearsLeft"
                        type="number"
                        value={currentYearsLeft}
                        onChange={(e) => setCurrentYearsLeft(e.target.value)}
                        placeholder="Enter years left"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-green-800">New Mortgage</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="newRate">New Interest Rate (%)</Label>
                      <Input
                        id="newRate"
                        type="number"
                        step="0.01"
                        value={newRate}
                        onChange={(e) => setNewRate(e.target.value)}
                        placeholder="Enter new rate"
                      />
                    </div>

                    <div>
                      <Label htmlFor="newTerm">New Loan Term (years)</Label>
                      <Input
                        id="newTerm"
                        type="number"
                        value={newTerm}
                        onChange={(e) => setNewTerm(e.target.value)}
                        placeholder="Enter new term"
                      />
                    </div>

                    <div>
                      <Label htmlFor="closingCosts">Closing Costs</Label>
                      <Input
                        id="closingCosts"
                        type="number"
                        value={closingCosts}
                        onChange={(e) => setClosingCosts(e.target.value)}
                        placeholder="Enter closing costs"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {results && (
                <Card className={`${results.worthRefinancing ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                  <CardHeader>
                    <CardTitle className={results.worthRefinancing ? 'text-green-800' : 'text-yellow-800'}>
                      Refinance Analysis
                      {results.worthRefinancing ? ' ✅ Recommended' : ' ⚠️ Consider Carefully'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(results.monthlySavings)}
                        </div>
                        <div className="text-sm text-blue-600">Monthly Savings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(results.totalSavings)}
                        </div>
                        <div className="text-sm text-green-600">Total Savings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {formatMonths(results.breakEvenMonths)}
                        </div>
                        <div className="text-sm text-purple-600">Break-Even Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {formatCurrency(results.interestSavings)}
                        </div>
                        <div className="text-sm text-orange-600">Interest Savings</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Current Payment:</span>
                          <span className="font-semibold text-red-600">{formatCurrency(results.currentMonthlyPayment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>New Payment:</span>
                          <span className="font-semibold text-green-600">{formatCurrency(results.newMonthlyPayment)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span>Monthly Difference:</span>
                          <span className={`font-semibold ${results.monthlySavings > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {results.monthlySavings > 0 ? '-' : '+'}{formatCurrency(Math.abs(results.monthlySavings))}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Closing Costs:</span>
                          <span className="font-semibold">{formatCurrency(parseFloat(closingCosts))}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rate Difference:</span>
                          <span className="font-semibold">
                            {(parseFloat(currentRate) - parseFloat(newRate)).toFixed(2)}%
                          </span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span>Recommendation:</span>
                          <span className={`font-semibold ${results.worthRefinancing ? 'text-green-600' : 'text-yellow-600'}`}>
                            {results.worthRefinancing ? 'Refinance' : 'Reconsider'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              {results && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Detailed Financial Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Payment Comparison</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between p-2 bg-red-50 rounded">
                              <span>Current Monthly Payment:</span>
                              <span className="font-semibold">{formatCurrency(results.currentMonthlyPayment)}</span>
                            </div>
                            <div className="flex justify-between p-2 bg-green-50 rounded">
                              <span>New Monthly Payment:</span>
                              <span className="font-semibold">{formatCurrency(results.newMonthlyPayment)}</span>
                            </div>
                            <div className="flex justify-between p-2 bg-blue-50 rounded font-semibold">
                              <span>Monthly Savings:</span>
                              <span>{formatCurrency(results.monthlySavings)}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Break-Even Analysis</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Closing Costs:</span>
                              <span>{formatCurrency(parseFloat(closingCosts))}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Monthly Savings:</span>
                              <span>{formatCurrency(results.monthlySavings)}</span>
                            </div>
                            <div className="flex justify-between p-2 bg-purple-50 rounded font-semibold">
                              <span>Break-Even Time:</span>
                              <span>{formatMonths(results.breakEvenMonths)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className={results.breakEvenMonths <= 24 ? 'border-green-200 bg-green-50' : results.breakEvenMonths <= 60 ? 'border-yellow-200 bg-yellow-50' : 'border-red-200 bg-red-50'}>
                      <CardHeader>
                        <CardTitle className="text-sm">Break-Even Assessment</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-2xl font-bold mb-2">
                            {results.breakEvenMonths <= 24 ? '🟢' : results.breakEvenMonths <= 60 ? '🟡' : '🔴'}
                          </div>
                          <div className="text-sm">
                            {results.breakEvenMonths <= 24 ? 'Excellent' : results.breakEvenMonths <= 60 ? 'Good' : 'Poor'}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {formatMonths(results.breakEvenMonths)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className={results.monthlySavings >= 200 ? 'border-green-200 bg-green-50' : results.monthlySavings >= 100 ? 'border-yellow-200 bg-yellow-50' : 'border-red-200 bg-red-50'}>
                      <CardHeader>
                        <CardTitle className="text-sm">Monthly Impact</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-2xl font-bold mb-2">
                            {results.monthlySavings >= 200 ? '🟢' : results.monthlySavings >= 100 ? '🟡' : '🔴'}
                          </div>
                          <div className="text-sm">
                            {results.monthlySavings >= 200 ? 'Significant' : results.monthlySavings >= 100 ? 'Moderate' : 'Minimal'}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {formatCurrency(results.monthlySavings)} savings
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className={results.totalSavings >= 10000 ? 'border-green-200 bg-green-50' : results.totalSavings >= 5000 ? 'border-yellow-200 bg-yellow-50' : 'border-red-200 bg-red-50'}>
                      <CardHeader>
                        <CardTitle className="text-sm">Total Benefit</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-2xl font-bold mb-2">
                            {results.totalSavings >= 10000 ? '🟢' : results.totalSavings >= 5000 ? '🟡' : '🔴'}
                          </div>
                          <div className="text-sm">
                            {results.totalSavings >= 10000 ? 'High Value' : results.totalSavings >= 5000 ? 'Moderate Value' : 'Low Value'}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {formatCurrency(results.totalSavings)} total
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="guide" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800">When to Refinance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Interest rates dropped 0.5% or more</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Break-even period under 2-3 years</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Plan to stay in home 5+ years</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Credit score improved significantly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Want to switch from ARM to fixed</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800">When NOT to Refinance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Break-even period over 5 years</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Planning to move within 2-3 years</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Credit score has declined</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>High closing costs relative to savings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Already near end of current loan</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Refinancing Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl mb-2">1️⃣</div>
                      <div className="font-semibold text-blue-800">Shop Rates</div>
                      <div className="text-sm text-blue-600 mt-1">Compare multiple lenders</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl mb-2">2️⃣</div>
                      <div className="font-semibold text-green-800">Apply</div>
                      <div className="text-sm text-green-600 mt-1">Submit application & docs</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl mb-2">3️⃣</div>
                      <div className="font-semibold text-yellow-800">Underwriting</div>
                      <div className="text-sm text-yellow-600 mt-1">Lender reviews & approves</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl mb-2">4️⃣</div>
                      <div className="font-semibold text-purple-800">Close</div>
                      <div className="text-sm text-purple-600 mt-1">Sign docs & pay costs</div>
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
