'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EmergencyFundResults {
  targetAmount: number;
  currentProgress: number;
  remainingAmount: number;
  monthsToGoal: number;
  monthlyInterest: number;
  projectedBalance: number;
  riskAssessment: string;
}

export default function EmergencyFundCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>('4000');
  const [currentSavings, setCurrentSavings] = useState<string>('2000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('300');
  const [interestRate, setInterestRate] = useState<string>('4.5');
  const [targetMonths, setTargetMonths] = useState<string>('6');
  const [employmentType, setEmploymentType] = useState<string>('stable');
  const [results, setResults] = useState<EmergencyFundResults | null>(null);

  const calculateEmergencyFund = () => {
    const expenses = parseFloat(monthlyExpenses);
    const current = parseFloat(currentSavings);
    const contribution = parseFloat(monthlyContribution);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = parseFloat(targetMonths);

    if (expenses <= 0 || contribution < 0 || months <= 0) return;

    const targetAmount = expenses * months;
    const remainingAmount = Math.max(0, targetAmount - current);
    const currentProgress = (current / targetAmount) * 100;

    // Calculate months to goal with compound interest
    let balance = current;
    let monthsToGoal = 0;
    
    while (balance < targetAmount && monthsToGoal < 240) { // Max 20 years
      balance += contribution;
      balance += balance * rate; // Add interest
      monthsToGoal++;
    }

    const monthlyInterest = current * rate;
    const projectedBalance = current + (contribution * 12) + (current * (parseFloat(interestRate) / 100));

    // Risk assessment based on employment type and current savings
    let riskAssessment = 'Low';
    if (employmentType === 'freelance' || employmentType === 'contract') {
      riskAssessment = currentProgress < 50 ? 'High' : currentProgress < 75 ? 'Medium' : 'Low';
    } else if (employmentType === 'unstable') {
      riskAssessment = currentProgress < 75 ? 'High' : 'Medium';
    } else {
      riskAssessment = currentProgress < 25 ? 'High' : currentProgress < 50 ? 'Medium' : 'Low';
    }

    setResults({
      targetAmount,
      currentProgress,
      remainingAmount,
      monthsToGoal,
      monthlyInterest,
      projectedBalance,
      riskAssessment
    });
  };

  useEffect(() => {
    calculateEmergencyFund();
  }, [monthlyExpenses, currentSavings, monthlyContribution, interestRate, targetMonths, employmentType]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRecommendedMonths = () => {
    switch (employmentType) {
      case 'stable': return '3-6 months';
      case 'freelance': return '6-12 months';
      case 'contract': return '6-9 months';
      case 'unstable': return '9-12 months';
      default: return '6 months';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'High': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🚨 Emergency Fund Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="strategy">Strategy</TabsTrigger>
              <TabsTrigger value="guide">Emergency Guide</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="monthlyExpenses">Monthly Expenses</Label>
                    <Input
                      id="monthlyExpenses"
                      type="number"
                      value={monthlyExpenses}
                      onChange={(e) => setMonthlyExpenses(e.target.value)}
                      placeholder="Enter monthly expenses"
                    />
                  </div>

                  <div>
                    <Label htmlFor="currentSavings">Current Emergency Savings</Label>
                    <Input
                      id="currentSavings"
                      type="number"
                      value={currentSavings}
                      onChange={(e) => setCurrentSavings(e.target.value)}
                      placeholder="Enter current savings"
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
                    <Label htmlFor="interestRate">Savings Account APY (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="Enter interest rate"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="targetMonths">Target Coverage (months)</Label>
                    <Select value={targetMonths} onValueChange={setTargetMonths}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select target months" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 months</SelectItem>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="9">9 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="employmentType">Employment Type</Label>
                    <Select value={employmentType} onValueChange={setEmploymentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stable">Stable Employment</SelectItem>
                        <SelectItem value="freelance">Freelance/Self-Employed</SelectItem>
                        <SelectItem value="contract">Contract Work</SelectItem>
                        <SelectItem value="unstable">Unstable Employment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-800 text-sm">Recommended for You</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-blue-700">
                        <div className="font-semibold">Employment Type: {employmentType}</div>
                        <div>Recommended: {getRecommendedMonths()}</div>
                        <div className="mt-2">
                          {employmentType === 'freelance' && "Irregular income requires larger buffer"}
                          {employmentType === 'stable' && "Steady income allows standard 3-6 months"}
                          {employmentType === 'contract' && "Contract gaps need extra coverage"}
                          {employmentType === 'unstable' && "Job uncertainty requires maximum protection"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {results && (
                    <Card className={`${results.riskAssessment === 'Low' ? 'bg-green-50 border-green-200' : results.riskAssessment === 'Medium' ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'}`}>
                      <CardHeader>
                        <CardTitle className={`text-sm ${getRiskColor(results.riskAssessment)}`}>
                          Risk Level: {results.riskAssessment}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm">
                          <div>Progress: {results.currentProgress.toFixed(0)}% of target</div>
                          <div>Time to Goal: {results.monthsToGoal} months</div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {results && (
                <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-800">Emergency Fund Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(results.targetAmount)}
                        </div>
                        <div className="text-sm text-blue-600">Target Amount</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(parseFloat(currentSavings))}
                        </div>
                        <div className="text-sm text-green-600">Current Savings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {formatCurrency(results.remainingAmount)}
                        </div>
                        <div className="text-sm text-orange-600">Still Needed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {results.monthsToGoal}
                        </div>
                        <div className="text-sm text-purple-600">Months to Goal</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress to Goal</span>
                        <span>{results.currentProgress.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, results.currentProgress)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span>Monthly Expenses:</span>
                          <span className="font-semibold">{formatCurrency(parseFloat(monthlyExpenses))}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Target Months:</span>
                          <span className="font-semibold">{targetMonths} months</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monthly Interest:</span>
                          <span className="font-semibold text-green-600">{formatCurrency(results.monthlyInterest)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Risk Assessment:</span>
                          <span className={`font-semibold ${getRiskColor(results.riskAssessment)}`}>
                            {results.riskAssessment}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="strategy" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800">Building Your Fund</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Start with $1,000 mini emergency fund</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Automate transfers to separate account</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Use windfalls (tax refunds, bonuses)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Cut expenses temporarily to boost savings</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Sell unused items for quick cash</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800">Where to Keep It</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>High-yield savings account (4%+ APY)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Money market account with debit access</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Short-term CDs for portion of fund</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Separate from checking account</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>FDIC insured up to $250,000</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {results && (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Action Plan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-2xl mb-2">🎯</div>
                        <div className="font-semibold text-red-800">Step 1: Target</div>
                        <div className="text-sm text-red-600 mt-1">
                          Save {formatCurrency(results.targetAmount)} total
                        </div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-2xl mb-2">📅</div>
                        <div className="font-semibold text-yellow-800">Step 2: Timeline</div>
                        <div className="text-sm text-yellow-600 mt-1">
                          {results.monthsToGoal} months at current rate
                        </div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl mb-2">💰</div>
                        <div className="font-semibold text-green-800">Step 3: Automate</div>
                        <div className="text-sm text-green-600 mt-1">
                          {formatCurrency(parseFloat(monthlyContribution))} monthly transfer
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Fund Priorities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="font-semibold text-red-800 mb-1">🚨 High Priority (Build First):</div>
                      <div className="text-red-700 text-sm">
                        <div>• Job loss or reduced income</div>
                        <div>• Major medical expenses</div>
                        <div>• Essential home repairs (roof, HVAC)</div>
                        <div>• Car repairs for work transportation</div>
                      </div>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="font-semibold text-yellow-800 mb-1">⚠️ Medium Priority:</div>
                      <div className="text-yellow-700 text-sm">
                        <div>• Appliance replacements</div>
                        <div>• Pet medical emergencies</div>
                        <div>• Family emergencies requiring travel</div>
                        <div>• Unexpected tax bills</div>
                      </div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-800 mb-1">✅ Not Emergencies:</div>
                      <div className="text-green-700 text-sm">
                        <div>• Vacations or entertainment</div>
                        <div>• Home improvements (non-essential)</div>
                        <div>• Shopping sales or deals</div>
                        <div>• Investment opportunities</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="guide" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800">Emergency Fund Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Avoid credit card debt in emergencies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Reduce financial stress and anxiety</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Maintain lifestyle during job loss</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Take advantage of opportunities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Sleep better knowing you're prepared</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800">Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Keeping fund in checking account</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Using fund for non-emergencies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Investing emergency fund in stocks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Not replenishing after use</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Waiting to start until debt is paid off</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Fund by Life Stage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl mb-2">👨‍🎓</div>
                      <div className="font-semibold text-blue-800">Young Adult</div>
                      <div className="text-sm text-blue-600 mt-1">
                        <div>$1,000 starter fund</div>
                        <div>Focus on building habits</div>
                        <div>Live with family if possible</div>
                      </div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl mb-2">👨‍👩‍👧‍👦</div>
                      <div className="font-semibold text-green-800">Family</div>
                      <div className="text-sm text-green-600 mt-1">
                        <div>6-12 months expenses</div>
                        <div>Consider dual incomes</div>
                        <div>Account for childcare costs</div>
                      </div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl mb-2">👴</div>
                      <div className="font-semibold text-purple-800">Pre-Retirement</div>
                      <div className="text-sm text-purple-600 mt-1">
                        <div>12+ months expenses</div>
                        <div>Bridge to Social Security</div>
                        <div>Healthcare cost buffer</div>
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
