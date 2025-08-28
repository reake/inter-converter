'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RetirementResults {
  finalBalance: number;
  totalContributions: number;
  totalGrowth: number;
  monthlyIncome: number;
  yearlyBreakdown: Array<{
    age: number;
    balance: number;
    contributions: number;
  }>;
}

export default function RetirementSavingsCalculator() {
  const [currentAge, setCurrentAge] = useState<string>('30');
  const [retirementAge, setRetirementAge] = useState<string>('65');
  const [currentSavings, setCurrentSavings] = useState<string>('25000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('500');
  const [annualReturn, setAnnualReturn] = useState<string>('7');
  const [inflationRate, setInflationRate] = useState<string>('3');
  const [withdrawalRate, setWithdrawalRate] = useState<string>('4');
  const [results, setResults] = useState<RetirementResults | null>(null);

  const calculateRetirement = () => {
    const currentAgeNum = parseInt(currentAge);
    const retirementAgeNum = parseInt(retirementAge);
    const savings = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution);
    const returnRate = parseFloat(annualReturn) / 100;
    const inflation = parseFloat(inflationRate) / 100;
    const withdrawal = parseFloat(withdrawalRate) / 100;
    
    if (currentAgeNum >= retirementAgeNum || returnRate < 0 || savings < 0) return;

    const yearsToRetirement = retirementAgeNum - currentAgeNum;
    const monthlyRate = returnRate / 12;
    const totalMonths = yearsToRetirement * 12;
    
    // Calculate future value of current savings
    const futureCurrentSavings = savings * Math.pow(1 + returnRate, yearsToRetirement);
    
    // Calculate future value of monthly contributions
    const futureMonthlyContributions = monthly * (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
    
    const finalBalance = futureCurrentSavings + futureMonthlyContributions;
    const totalContributions = savings + (monthly * totalMonths);
    const totalGrowth = finalBalance - totalContributions;
    
    // Calculate monthly retirement income using withdrawal rate
    const monthlyIncome = (finalBalance * withdrawal) / 12;
    
    // Generate yearly breakdown
    const yearlyBreakdown = [];
    let runningBalance = savings;
    let runningContributions = savings;
    
    for (let year = 1; year <= yearsToRetirement; year++) {
      const age = currentAgeNum + year;
      const yearlyContribution = monthly * 12;
      
      // Add yearly contribution and growth
      runningBalance = runningBalance * (1 + returnRate) + yearlyContribution;
      runningContributions += yearlyContribution;
      
      yearlyBreakdown.push({
        age,
        balance: runningBalance,
        contributions: runningContributions
      });
    }

    setResults({
      finalBalance,
      totalContributions,
      totalGrowth,
      monthlyIncome,
      yearlyBreakdown
    });
  };

  useEffect(() => {
    calculateRetirement();
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, annualReturn, inflationRate, withdrawalRate]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRecommendedSavings = () => {
    const age = parseInt(currentAge);
    const income = parseFloat(monthlyContribution) * 12 / 0.15; // Assuming 15% savings rate
    
    if (age < 30) return income * 1;
    if (age < 40) return income * 3;
    if (age < 50) return income * 6;
    if (age < 60) return income * 8;
    return income * 10;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏖️ Retirement Savings Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="strategies">Strategies</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
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
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="annualReturn">Expected Annual Return (%)</Label>
                    <Input
                      id="annualReturn"
                      type="number"
                      step="0.1"
                      value={annualReturn}
                      onChange={(e) => setAnnualReturn(e.target.value)}
                      placeholder="Enter expected return"
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      Historical stock market average: 7-10%
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="inflationRate">Inflation Rate (%)</Label>
                    <Input
                      id="inflationRate"
                      type="number"
                      step="0.1"
                      value={inflationRate}
                      onChange={(e) => setInflationRate(e.target.value)}
                      placeholder="Enter inflation rate"
                    />
                  </div>

                  <div>
                    <Label htmlFor="withdrawalRate">Withdrawal Rate (%)</Label>
                    <Input
                      id="withdrawalRate"
                      type="number"
                      step="0.1"
                      value={withdrawalRate}
                      onChange={(e) => setWithdrawalRate(e.target.value)}
                      placeholder="Enter withdrawal rate"
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      4% rule is commonly recommended
                    </div>
                  </div>

                  {results && (
                    <Card className="bg-green-50 border-green-200">
                      <CardHeader>
                        <CardTitle className="text-green-800 text-sm">Retirement Projection</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Final Balance:</span>
                            <span className="font-semibold text-lg">{formatCurrency(results.finalBalance)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Growth:</span>
                            <span className="font-semibold text-green-600">{formatCurrency(results.totalGrowth)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Monthly Income:</span>
                            <span className="font-semibold text-blue-600">{formatCurrency(results.monthlyIncome)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Years to Retirement:</span>
                            <span className="font-semibold">{parseInt(retirementAge) - parseInt(currentAge)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {results && results.yearlyBreakdown.length > 0 && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Savings Growth by Age</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs max-h-40 overflow-y-auto">
                      {results.yearlyBreakdown.filter((_, index) => index % 5 === 4 || index === results.yearlyBreakdown.length - 1).map((year) => (
                        <div key={year.age} className="text-center p-2 bg-white rounded">
                          <div className="font-semibold">Age {year.age}</div>
                          <div className="text-green-600">{formatCurrency(year.balance)}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="strategies" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">Maximize Contributions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>💰 Max out employer 401(k) match</div>
                      <div>📈 Increase contributions with raises</div>
                      <div>🎯 Contribute to IRA limits</div>
                      <div>💵 Use catch-up contributions (50+)</div>
                      <div>🔄 Automate contributions</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Investment Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📊 Diversify across asset classes</div>
                      <div>📈 Consider target-date funds</div>
                      <div>💰 Keep fees low</div>
                      <div>🔄 Rebalance annually</div>
                      <div>⏰ Time in market beats timing</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Tax Optimization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🏦 Traditional vs Roth IRA</div>
                      <div>📋 Tax-loss harvesting</div>
                      <div>💰 HSA as retirement account</div>
                      <div>📊 Asset location strategy</div>
                      <div>⚖️ Consult tax professional</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-800 text-sm">Risk Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🛡️ Emergency fund first</div>
                      <div>📈 Age-appropriate allocation</div>
                      <div>💰 Don't panic sell</div>
                      <div>🔄 Regular portfolio review</div>
                      <div>📋 Consider long-term care</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="milestones" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">Savings Milestones by Age</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📊 Age 30: 1x annual salary</div>
                      <div>📈 Age 35: 2x annual salary</div>
                      <div>💰 Age 40: 3x annual salary</div>
                      <div>🎯 Age 45: 4x annual salary</div>
                      <div>📋 Age 50: 6x annual salary</div>
                      <div>🏆 Age 55: 7x annual salary</div>
                      <div>🎉 Age 60: 8x annual salary</div>
                      <div>🏖️ Age 67: 10x annual salary</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Contribution Limits (2024)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🏦 401(k): $23,000 ($30,500 if 50+)</div>
                      <div>📈 IRA: $7,000 ($8,000 if 50+)</div>
                      <div>🏥 HSA: $4,150 individual</div>
                      <div>👨‍👩‍👧‍👦 HSA Family: $8,300</div>
                      <div>💼 SEP-IRA: 25% of compensation</div>
                      <div>🏢 Solo 401(k): $69,000 ($76,500 if 50+)</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Retirement Income Sources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🏛️ Social Security (40% replacement)</div>
                      <div>🏢 Employer pension/401(k)</div>
                      <div>💰 Personal savings (IRA, taxable)</div>
                      <div>🏠 Home equity</div>
                      <div>💼 Part-time work</div>
                      <div>📈 Investment income</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800 text-sm">Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>❌ Starting too late</div>
                      <div>❌ Not maximizing employer match</div>
                      <div>❌ Cashing out 401(k) early</div>
                      <div>❌ Too conservative when young</div>
                      <div>❌ Ignoring inflation</div>
                      <div>❌ No emergency fund</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
