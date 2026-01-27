'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SavingsGoalResults {
  monthlyDeposit: number;
  totalDeposits: number;
  totalInterest: number;
  finalAmount: number;
  timeToGoal: number;
  compoundingEffect: number;
}

export default function SavingsGoalCalculator() {
  const [goalAmount, setGoalAmount] = useState<string>('50000');
  const [currentSavings, setCurrentSavings] = useState<string>('5000');
  const [monthlyDeposit, setMonthlyDeposit] = useState<string>('500');
  const [interestRate, setInterestRate] = useState<string>('4.5');
  const [timeFrame, setTimeFrame] = useState<string>('10');
  const [compoundingFreq, setCompoundingFreq] = useState<string>('12');
  const [calculationType, setCalculationType] = useState<string>('monthly-payment');
  const [results, setResults] = useState<SavingsGoalResults | null>(null);

  const compoundingOptions = {
    '1': 'Annually',
    '4': 'Quarterly', 
    '12': 'Monthly',
    '365': 'Daily'
  };

  const calculateSavingsGoal = useCallback(() => {
    const goal = parseFloat(goalAmount);
    const current = parseFloat(currentSavings);
    const rate = parseFloat(interestRate) / 100;
    const years = parseFloat(timeFrame);
    const n = parseFloat(compoundingFreq);
    const monthly = parseFloat(monthlyDeposit);

    if (goal <= 0 || rate < 0 || years <= 0 || n <= 0) return;

    let calculatedResults: SavingsGoalResults;

    if (calculationType === 'monthly-payment') {
      // Calculate required monthly payment to reach goal
      const futureValueCurrent = current * Math.pow(1 + rate/n, n * years);
      const remainingGoal = goal - futureValueCurrent;
      
      if (remainingGoal <= 0) {
        calculatedResults = {
          monthlyDeposit: 0,
          totalDeposits: 0,
          totalInterest: futureValueCurrent - current,
          finalAmount: futureValueCurrent,
          timeToGoal: 0,
          compoundingEffect: futureValueCurrent - current
        };
      } else {
        const monthlyRate = rate / 12;
        const months = years * 12;
        const requiredMonthly = remainingGoal / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * Math.pow(1 + monthlyRate, months - months));
        
        calculatedResults = {
          monthlyDeposit: requiredMonthly,
          totalDeposits: requiredMonthly * months,
          totalInterest: goal - current - (requiredMonthly * months),
          finalAmount: goal,
          timeToGoal: years,
          compoundingEffect: goal - current - (requiredMonthly * months)
        };
      }
    } else {
      // Calculate time to reach goal with fixed monthly payment
      const monthlyRate = rate / 12;
      const futureValueCurrent = current * Math.pow(1 + monthlyRate, 12 * years);
      const futureValuePayments = monthly * (Math.pow(1 + monthlyRate, 12 * years) - 1) / monthlyRate;
      const totalFuture = futureValueCurrent + futureValuePayments;
      
      calculatedResults = {
        monthlyDeposit: monthly,
        totalDeposits: monthly * 12 * years,
        totalInterest: totalFuture - current - (monthly * 12 * years),
        finalAmount: totalFuture,
        timeToGoal: years,
        compoundingEffect: totalFuture - current - (monthly * 12 * years)
      };
    }

    setResults(calculatedResults);
  }, [goalAmount, currentSavings, monthlyDeposit, interestRate, timeFrame, compoundingFreq, calculationType]);

  useEffect(() => {
    calculateSavingsGoal();
  }, [calculateSavingsGoal]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Savings Goal Calculator</h1>
        <p className="text-lg text-gray-600">
          Plan your savings strategy to reach your financial goals with compound interest calculations.
        </p>
      </div>

      <Tabs defaultValue="calculator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="tips">Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Savings Goal Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="calculationType">Calculation Type</Label>
                  <Select value={calculationType} onValueChange={setCalculationType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly-payment">Calculate Monthly Payment</SelectItem>
                      <SelectItem value="time-to-goal">Calculate Time to Goal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="goalAmount">Savings Goal ($)</Label>
                  <Input
                    id="goalAmount"
                    type="number"
                    value={goalAmount}
                    onChange={(e) => setGoalAmount(e.target.value)}
                    placeholder="50000"
                  />
                </div>

                <div>
                  <Label htmlFor="currentSavings">Current Savings ($)</Label>
                  <Input
                    id="currentSavings"
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(e.target.value)}
                    placeholder="5000"
                  />
                </div>

                {calculationType === 'time-to-goal' && (
                  <div>
                    <Label htmlFor="monthlyDeposit">Monthly Deposit ($)</Label>
                    <Input
                      id="monthlyDeposit"
                      type="number"
                      value={monthlyDeposit}
                      onChange={(e) => setMonthlyDeposit(e.target.value)}
                      placeholder="500"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="4.5"
                  />
                </div>

                <div>
                  <Label htmlFor="timeFrame">Time Frame (Years)</Label>
                  <Input
                    id="timeFrame"
                    type="number"
                    value={timeFrame}
                    onChange={(e) => setTimeFrame(e.target.value)}
                    placeholder="10"
                  />
                </div>

                <div>
                  <Label htmlFor="compoundingFreq">Compounding Frequency</Label>
                  <Select value={compoundingFreq} onValueChange={setCompoundingFreq}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(compoundingOptions).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {results && (
              <Card>
                <CardHeader>
                  <CardTitle>Savings Goal Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatCurrency(results.monthlyDeposit)}
                      </div>
                      <div className="text-sm text-gray-600">Required Monthly Deposit</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(results.finalAmount)}
                      </div>
                      <div className="text-sm text-gray-600">Final Amount</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Deposits:</span>
                      <span className="font-semibold">{formatCurrency(results.totalDeposits)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Interest Earned:</span>
                      <span className="font-semibold text-green-600">{formatCurrency(results.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time to Goal:</span>
                      <span className="font-semibold">{results.timeToGoal.toFixed(1)} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Compounding Effect:</span>
                      <span className="font-semibold text-blue-600">{formatCurrency(results.compoundingEffect)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>Savings Goal Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Goal Achievement Breakdown</h3>
                {results && (
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-blue-600">Principal Growth</h4>
                      <p className="text-2xl font-bold">{formatCurrency(parseFloat(currentSavings))}</p>
                      <p className="text-sm text-gray-600">Starting amount</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-green-600">Deposit Contributions</h4>
                      <p className="text-2xl font-bold">{formatCurrency(results.totalDeposits)}</p>
                      <p className="text-sm text-gray-600">Total deposits made</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-purple-600">Interest Earned</h4>
                      <p className="text-2xl font-bold">{formatCurrency(results.totalInterest)}</p>
                      <p className="text-sm text-gray-600">Compound interest growth</p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Savings Milestones</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>25% of Goal</span>
                    <span className="font-semibold">{formatCurrency(parseFloat(goalAmount) * 0.25)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>50% of Goal</span>
                    <span className="font-semibold">{formatCurrency(parseFloat(goalAmount) * 0.5)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span>75% of Goal</span>
                    <span className="font-semibold">{formatCurrency(parseFloat(goalAmount) * 0.75)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                    <span>100% of Goal</span>
                    <span className="font-semibold text-green-600">{formatCurrency(parseFloat(goalAmount))}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategies">
          <Card>
            <CardHeader>
              <CardTitle>Savings Strategies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Acceleration Strategies</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-blue-600">Increase Monthly Deposits</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Even small increases can significantly reduce the time to reach your goal due to compound interest.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-green-600">Higher Interest Rates</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Shop for high-yield savings accounts, CDs, or investment options to maximize growth.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-purple-600">Windfall Deposits</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Use tax refunds, bonuses, or gifts to make additional deposits and accelerate progress.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-orange-600">Automatic Transfers</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Set up automatic transfers to ensure consistent saving without relying on willpower.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Account Types for Goals</h3>
                <div className="space-y-3">
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-semibold">High-Yield Savings Account</h4>
                    <p className="text-sm text-gray-600">Best for short-term goals (1-3 years) with easy access to funds.</p>
                  </div>
                  <div className="p-4 border-l-4 border-green-500 bg-green-50">
                    <h4 className="font-semibold">Certificate of Deposit (CD)</h4>
                    <p className="text-sm text-gray-600">Good for medium-term goals (2-5 years) with higher fixed rates.</p>
                  </div>
                  <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                    <h4 className="font-semibold">Investment Account</h4>
                    <p className="text-sm text-gray-600">Suitable for long-term goals (5+ years) with higher growth potential.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips">
          <Card>
            <CardHeader>
              <CardTitle>Savings Success Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Getting Started</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Set specific, measurable, and time-bound savings goals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Start with any amount - consistency matters more than the initial sum</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Automate your savings to remove the temptation to skip deposits</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Track your progress regularly to stay motivated</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Maximizing Growth</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">💡</span>
                    <span>Take advantage of compound interest by starting early</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">💡</span>
                    <span>Consider increasing deposits annually with salary raises</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">💡</span>
                    <span>Review and adjust your strategy as circumstances change</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">💡</span>
                    <span>Don&apos;t let inflation erode your purchasing power - adjust goals accordingly</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Common Mistakes to Avoid</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">⚠️</span>
                    <span>Don&apos;t set unrealistic savings targets that are impossible to maintain</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">⚠️</span>
                    <span>Avoid dipping into savings for non-emergency expenses</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">⚠️</span>
                    <span>Don&apos;t ignore the impact of fees on your savings growth</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">⚠️</span>
                    <span>Avoid keeping all savings in low-yield accounts for long-term goals</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
