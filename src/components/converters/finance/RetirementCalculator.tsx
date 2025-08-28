'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RetirementResults {
  totalSavings: number;
  monthlyContribution: number;
  employerMatch: number;
  totalContributions: number;
  investmentGrowth: number;
  inflationAdjustedValue: number;
  monthlyIncomeNeeded: number;
  shortfall: number;
}

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState<string>('30');
  const [retirementAge, setRetirementAge] = useState<string>('65');
  const [currentSavings, setCurrentSavings] = useState<string>('25000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('500');
  const [employerMatch, setEmployerMatch] = useState<string>('3');
  const [expectedReturn, setExpectedReturn] = useState<string>('7');
  const [inflationRate, setInflationRate] = useState<string>('3');
  const [currentIncome, setCurrentIncome] = useState<string>('60000');
  const [incomeReplacement, setIncomeReplacement] = useState<string>('80');
  const [results, setResults] = useState<RetirementResults | null>(null);

  const calculateRetirement = () => {
    const age = parseInt(currentAge);
    const retAge = parseInt(retirementAge);
    const savings = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution);
    const match = parseFloat(employerMatch) / 100;
    const returnRate = parseFloat(expectedReturn) / 100;
    const inflation = parseFloat(inflationRate) / 100;
    const income = parseFloat(currentIncome);
    const replacement = parseFloat(incomeReplacement) / 100;

    if (age >= retAge || age < 0 || retAge < 0) return;

    const yearsToRetirement = retAge - age;
    const monthsToRetirement = yearsToRetirement * 12;
    const monthlyReturn = returnRate / 12;

    // Calculate employer match (assuming it matches up to a percentage of salary)
    const annualEmployerMatch = Math.min(monthly * 12, income * match);
    const monthlyEmployerMatch = annualEmployerMatch / 12;

    // Future value of current savings
    const futureValueCurrentSavings = savings * Math.pow(1 + returnRate, yearsToRetirement);

    // Future value of monthly contributions (annuity)
    const totalMonthlyContribution = monthly + monthlyEmployerMatch;
    const futureValueContributions = totalMonthlyContribution * 
      ((Math.pow(1 + monthlyReturn, monthsToRetirement) - 1) / monthlyReturn);

    const totalSavings = futureValueCurrentSavings + futureValueContributions;
    const totalContributions = savings + (totalMonthlyContribution * monthsToRetirement);
    const investmentGrowth = totalSavings - totalContributions;

    // Inflation-adjusted value
    const inflationAdjustedValue = totalSavings / Math.pow(1 + inflation, yearsToRetirement);

    // Required income in retirement (inflation-adjusted)
    const futureIncomeNeeded = income * replacement * Math.pow(1 + inflation, yearsToRetirement);
    const monthlyIncomeNeeded = futureIncomeNeeded / 12;

    // Using 4% withdrawal rule to determine if savings are sufficient
    const annualWithdrawal = totalSavings * 0.04;
    const shortfall = Math.max(0, futureIncomeNeeded - annualWithdrawal);

    setResults({
      totalSavings,
      monthlyContribution: totalMonthlyContribution,
      employerMatch: monthlyEmployerMatch,
      totalContributions,
      investmentGrowth,
      inflationAdjustedValue,
      monthlyIncomeNeeded,
      shortfall
    });
  };

  useEffect(() => {
    calculateRetirement();
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, employerMatch, expectedReturn, inflationRate, currentIncome, incomeReplacement]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRetirementReadiness = () => {
    if (!results) return { status: 'unknown', color: 'gray', message: '' };
    
    if (results.shortfall === 0) {
      return { 
        status: 'on-track', 
        color: 'green', 
        message: 'You\'re on track for retirement!' 
      };
    } else if (results.shortfall < results.totalSavings * 0.2) {
      return { 
        status: 'close', 
        color: 'yellow', 
        message: 'You\'re close to your retirement goal' 
      };
    } else {
      return { 
        status: 'behind', 
        color: 'red', 
        message: 'You may need to save more for retirement' 
      };
    }
  };

  const readiness = getRetirementReadiness();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏖️ Retirement Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="projections">Projections</TabsTrigger>
              <TabsTrigger value="strategies">Strategies</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentAge">Current Age</Label>
                    <Input
                      id="currentAge"
                      type="number"
                      value={currentAge}
                      onChange={(e) => setCurrentAge(e.target.value)}
                      placeholder="Enter current age"
                    />
                  </div>

                  <div>
                    <Label htmlFor="retirementAge">Retirement Age</Label>
                    <Input
                      id="retirementAge"
                      type="number"
                      value={retirementAge}
                      onChange={(e) => setRetirementAge(e.target.value)}
                      placeholder="Enter retirement age"
                    />
                  </div>

                  <div>
                    <Label htmlFor="currentSavings">Current Retirement Savings</Label>
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
                    <Label htmlFor="employerMatch">Employer Match (%)</Label>
                    <Input
                      id="employerMatch"
                      type="number"
                      step="0.1"
                      value={employerMatch}
                      onChange={(e) => setEmployerMatch(e.target.value)}
                      placeholder="Enter employer match percentage"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                    <Select value={expectedReturn} onValueChange={setExpectedReturn}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select expected return" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5% (Conservative)</SelectItem>
                        <SelectItem value="6">6% (Moderate Conservative)</SelectItem>
                        <SelectItem value="7">7% (Moderate)</SelectItem>
                        <SelectItem value="8">8% (Moderate Aggressive)</SelectItem>
                        <SelectItem value="9">9% (Aggressive)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="inflationRate">Expected Inflation Rate (%)</Label>
                    <Select value={inflationRate} onValueChange={setInflationRate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select inflation rate" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2% (Low)</SelectItem>
                        <SelectItem value="3">3% (Historical Average)</SelectItem>
                        <SelectItem value="4">4% (High)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="currentIncome">Current Annual Income</Label>
                    <Input
                      id="currentIncome"
                      type="number"
                      value={currentIncome}
                      onChange={(e) => setCurrentIncome(e.target.value)}
                      placeholder="Enter current income"
                    />
                  </div>

                  <div>
                    <Label htmlFor="incomeReplacement">Income Replacement (%)</Label>
                    <Select value={incomeReplacement} onValueChange={setIncomeReplacement}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select replacement percentage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="70">70% (Minimal)</SelectItem>
                        <SelectItem value="80">80% (Comfortable)</SelectItem>
                        <SelectItem value="90">90% (Luxurious)</SelectItem>
                        <SelectItem value="100">100% (Same as current)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {results && (
                <Card className={`border-2 ${readiness.color === 'green' ? 'border-green-200 bg-green-50' : readiness.color === 'yellow' ? 'border-yellow-200 bg-yellow-50' : 'border-red-200 bg-red-50'}`}>
                  <CardHeader>
                    <CardTitle className={`${readiness.color === 'green' ? 'text-green-800' : readiness.color === 'yellow' ? 'text-yellow-800' : 'text-red-800'}`}>
                      Retirement Projection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(results.totalSavings)}
                        </div>
                        <div className="text-sm text-blue-600">Total at Retirement</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(results.monthlyContribution)}
                        </div>
                        <div className="text-sm text-green-600">Monthly Savings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {formatCurrency(results.employerMatch)}
                        </div>
                        <div className="text-sm text-purple-600">Employer Match</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {formatCurrency(results.investmentGrowth)}
                        </div>
                        <div className="text-sm text-orange-600">Investment Growth</div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg text-center ${readiness.color === 'green' ? 'bg-green-100' : readiness.color === 'yellow' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                      <div className={`text-lg font-semibold ${readiness.color === 'green' ? 'text-green-800' : readiness.color === 'yellow' ? 'text-yellow-800' : 'text-red-800'}`}>
                        {readiness.message}
                      </div>
                      {results.shortfall > 0 && (
                        <div className="text-sm text-red-600 mt-2">
                          Shortfall: {formatCurrency(results.shortfall)} annually
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="projections" className="space-y-4">
              {results && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Detailed Projections</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-blue-700">Savings Breakdown</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Current savings:</span>
                              <span className="font-semibold">{formatCurrency(parseFloat(currentSavings))}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Future value of current savings:</span>
                              <span className="font-semibold">{formatCurrency(results.totalSavings - (results.monthlyContribution * (parseInt(retirementAge) - parseInt(currentAge)) * 12))}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Total contributions:</span>
                              <span className="font-semibold">{formatCurrency(results.totalContributions - parseFloat(currentSavings))}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Investment growth:</span>
                              <span className="font-semibold text-green-600">{formatCurrency(results.investmentGrowth)}</span>
                            </div>
                            <hr />
                            <div className="flex justify-between font-bold">
                              <span>Total at retirement:</span>
                              <span>{formatCurrency(results.totalSavings)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold text-green-700">Income Needs</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Current income:</span>
                              <span className="font-semibold">{formatCurrency(parseFloat(currentIncome))}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Replacement percentage:</span>
                              <span className="font-semibold">{incomeReplacement}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Monthly income needed:</span>
                              <span className="font-semibold">{formatCurrency(results.monthlyIncomeNeeded)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>4% withdrawal rule:</span>
                              <span className="font-semibold">{formatCurrency(results.totalSavings * 0.04 / 12)}/month</span>
                            </div>
                            <hr />
                            <div className="flex justify-between font-bold">
                              <span>Gap:</span>
                              <span className={results.shortfall > 0 ? 'text-red-600' : 'text-green-600'}>
                                {results.shortfall > 0 ? `-${formatCurrency(results.shortfall / 12)}/month` : 'Surplus!'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Inflation Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {formatCurrency(results.totalSavings)}
                          </div>
                          <div className="text-sm text-blue-600">Nominal Value</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">
                            {formatCurrency(results.inflationAdjustedValue)}
                          </div>
                          <div className="text-sm text-orange-600">Today's Purchasing Power</div>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-gray-600">
                        <p>The inflation-adjusted value shows what your retirement savings will be worth in today's dollars, accounting for the expected {inflationRate}% annual inflation rate.</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="strategies" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800">Catch-Up Strategies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Increase contributions by 1% annually</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Maximize employer match (free money!)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Use catch-up contributions if 50+</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Consider Roth IRA conversions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Delay retirement by 1-2 years</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800">Investment Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Diversify across asset classes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Consider target-date funds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Rebalance portfolio annually</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Keep investment costs low</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Stay invested during market volatility</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Retirement Account Limits (2024)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-purple-700 mb-2">401(k) Limits</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Employee contribution: $23,000</li>
                        <li>• Catch-up (50+): Additional $7,500</li>
                        <li>• Total limit: $69,000 ($76,500 with catch-up)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-700 mb-2">IRA Limits</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Traditional/Roth IRA: $7,000</li>
                        <li>• Catch-up (50+): Additional $1,000</li>
                        <li>• Income limits apply for Roth IRA</li>
                      </ul>
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
