'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RetirementResults {
  finalBalance: number;
  totalContributions: number;
  employerMatch: number;
  investmentGrowth: number;
  monthlyContribution: number;
  yearlyBreakdown: Array<{
    year: number;
    balance: number;
    contributions: number;
    employerMatch: number;
    growth: number;
  }>;
}

export default function FourOhOneKCalculator() {
  const [currentAge, setCurrentAge] = useState<string>('30');
  const [retirementAge, setRetirementAge] = useState<string>('65');
  const [currentBalance, setCurrentBalance] = useState<string>('25000');
  const [annualSalary, setAnnualSalary] = useState<string>('75000');
  const [contributionPercent, setContributionPercent] = useState<string>('10');
  const [employerMatchPercent, setEmployerMatchPercent] = useState<string>('3');
  const [annualReturn, setAnnualReturn] = useState<string>('7');
  const [results, setResults] = useState<RetirementResults | null>(null);

  const calculate401k = () => {
    const age = parseInt(currentAge);
    const retAge = parseInt(retirementAge);
    const balance = parseFloat(currentBalance);
    const salary = parseFloat(annualSalary);
    const contribRate = parseFloat(contributionPercent) / 100;
    const matchRate = parseFloat(employerMatchPercent) / 100;
    const returnRate = parseFloat(annualReturn) / 100;

    if (age >= retAge || salary <= 0 || returnRate < 0) return;

    const yearsToRetirement = retAge - age;
    const monthlyContribution = (salary * contribRate) / 12;
    const monthlyEmployerMatch = Math.min((salary * matchRate) / 12, monthlyContribution);
    const monthlyReturn = returnRate / 12;

    let currentBalance401k = balance;
    let totalContributions = 0;
    let totalEmployerMatch = 0;
    const yearlyBreakdown = [];

    for (let year = 1; year <= yearsToRetirement; year++) {
      let yearStartBalance = currentBalance401k;
      let yearContributions = 0;
      let yearEmployerMatch = 0;
      let yearGrowth = 0;

      for (let month = 1; month <= 12; month++) {
        // Add monthly contributions
        currentBalance401k += monthlyContribution + monthlyEmployerMatch;
        yearContributions += monthlyContribution;
        yearEmployerMatch += monthlyEmployerMatch;
        totalContributions += monthlyContribution;
        totalEmployerMatch += monthlyEmployerMatch;

        // Apply monthly growth
        const monthlyGrowth = currentBalance401k * monthlyReturn;
        currentBalance401k += monthlyGrowth;
        yearGrowth += monthlyGrowth;
      }

      yearlyBreakdown.push({
        year: age + year,
        balance: currentBalance401k,
        contributions: yearContributions,
        employerMatch: yearEmployerMatch,
        growth: yearGrowth
      });
    }

    const investmentGrowth = currentBalance401k - balance - totalContributions - totalEmployerMatch;

    setResults({
      finalBalance: currentBalance401k,
      totalContributions,
      employerMatch: totalEmployerMatch,
      investmentGrowth,
      monthlyContribution,
      yearlyBreakdown
    });
  };

  useEffect(() => {
    calculate401k();
  }, [currentAge, retirementAge, currentBalance, annualSalary, contributionPercent, employerMatchPercent, annualReturn]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const get2024Limits = () => {
    const age = parseInt(currentAge);
    const baseLimit = 23000; // 2024 401k contribution limit
    const catchupLimit = 7500; // 2024 catch-up contribution for 50+
    return age >= 50 ? baseLimit + catchupLimit : baseLimit;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏦 401(k) Retirement Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="projection">Projection</TabsTrigger>
              <TabsTrigger value="strategy">Strategy</TabsTrigger>
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
                    <Label htmlFor="currentBalance">Current 401(k) Balance</Label>
                    <Input
                      id="currentBalance"
                      type="number"
                      value={currentBalance}
                      onChange={(e) => setCurrentBalance(e.target.value)}
                      placeholder="Enter current balance"
                    />
                  </div>

                  <div>
                    <Label htmlFor="annualSalary">Annual Salary</Label>
                    <Input
                      id="annualSalary"
                      type="number"
                      value={annualSalary}
                      onChange={(e) => setAnnualSalary(e.target.value)}
                      placeholder="Enter annual salary"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contributionPercent">Your Contribution (%)</Label>
                    <Input
                      id="contributionPercent"
                      type="number"
                      step="0.1"
                      value={contributionPercent}
                      onChange={(e) => setContributionPercent(e.target.value)}
                      placeholder="Enter contribution percentage"
                    />
                    <div className="text-xs text-gray-600 mt-1">
                      2024 limit: {formatCurrency(get2024Limits())} 
                      {parseInt(currentAge) >= 50 && ' (includes $7,500 catch-up)'}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="employerMatchPercent">Employer Match (%)</Label>
                    <Input
                      id="employerMatchPercent"
                      type="number"
                      step="0.1"
                      value={employerMatchPercent}
                      onChange={(e) => setEmployerMatchPercent(e.target.value)}
                      placeholder="Enter employer match"
                    />
                  </div>

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
                  </div>

                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-800 text-sm">401(k) Benefits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1 text-xs text-blue-700">
                        <li>✓ Tax-deferred growth</li>
                        <li>✓ Employer matching</li>
                        <li>✓ High contribution limits</li>
                        <li>✓ Automatic payroll deduction</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {results && (
                <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800">Retirement Projection</CardTitle>
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
                        <div className="text-sm text-blue-600">Your Contributions</div>
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

                    <div className="border-t pt-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span>Monthly Contribution:</span>
                          <span className="font-semibold">{formatCurrency(results.monthlyContribution)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monthly Employer Match:</span>
                          <span className="font-semibold">{formatCurrency(results.employerMatch / (parseInt(retirementAge) - parseInt(currentAge)) / 12)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Years to Retirement:</span>
                          <span className="font-semibold">{parseInt(retirementAge) - parseInt(currentAge)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Return:</span>
                          <span className="font-semibold text-green-600">
                            {(((results.finalBalance - parseFloat(currentBalance)) / parseFloat(currentBalance)) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="projection" className="space-y-4">
              {results && (
                <Card>
                  <CardHeader>
                    <CardTitle>Year-by-Year Projection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Age</th>
                            <th className="text-right p-2">Balance</th>
                            <th className="text-right p-2">Annual Contribution</th>
                            <th className="text-right p-2">Employer Match</th>
                            <th className="text-right p-2">Growth</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.yearlyBreakdown.filter((_, index) => index % 5 === 0 || index === results.yearlyBreakdown.length - 1).map((year) => (
                            <tr key={year.year} className="border-b hover:bg-gray-50">
                              <td className="p-2 font-semibold">{year.year}</td>
                              <td className="p-2 text-right font-semibold">{formatCurrency(year.balance)}</td>
                              <td className="p-2 text-right text-blue-600">{formatCurrency(year.contributions)}</td>
                              <td className="p-2 text-right text-green-600">{formatCurrency(year.employerMatch)}</td>
                              <td className="p-2 text-right text-purple-600">{formatCurrency(year.growth)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="text-center text-gray-500 mt-4 text-xs">
                        Showing every 5th year. Full projection available.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800">Contribution Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {results && (
                      <div className="space-y-3">
                        <div className="text-sm">
                          <div className="flex justify-between mb-2">
                            <span>Annual Contribution:</span>
                            <span className="font-semibold">{formatCurrency(results.monthlyContribution * 12)}</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span>As % of Salary:</span>
                            <span className="font-semibold">{contributionPercent}%</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span>2024 Limit:</span>
                            <span className="font-semibold">{formatCurrency(get2024Limits())}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span>Remaining Room:</span>
                            <span className="font-semibold text-green-600">
                              {formatCurrency(Math.max(0, get2024Limits() - (results.monthlyContribution * 12)))}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800">Employer Match Value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {results && (
                      <div className="space-y-3">
                        <div className="text-sm">
                          <div className="flex justify-between mb-2">
                            <span>Annual Match:</span>
                            <span className="font-semibold text-green-600">
                              {formatCurrency((results.employerMatch / (parseInt(retirementAge) - parseInt(currentAge))))}
                            </span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span>Total Match Value:</span>
                            <span className="font-semibold text-green-600">{formatCurrency(results.employerMatch)}</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span>Match Rate:</span>
                            <span className="font-semibold">{employerMatchPercent}%</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span>Free Money:</span>
                            <span className="font-semibold text-green-600">
                              {((results.employerMatch / results.totalContributions) * 100).toFixed(0)}% boost
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="strategy" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800">Optimization Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Contribute enough to get full employer match</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Increase contributions with salary raises</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Use catch-up contributions after age 50</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Review and rebalance investments annually</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Consider Roth 401(k) for tax diversification</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800">Investment Allocation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <div className="font-semibold mb-2">Age-Based Allocation:</div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>Stocks (Age {currentAge}):</span>
                            <span className="font-semibold">{Math.max(20, 110 - parseInt(currentAge))}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Bonds:</span>
                            <span className="font-semibold">{Math.min(80, parseInt(currentAge) - 10)}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 border-t pt-2">
                        Rule of thumb: Stock % = 110 - your age
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>401(k) vs Other Retirement Accounts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Account Type</th>
                          <th className="text-center p-2">2024 Limit</th>
                          <th className="text-center p-2">Employer Match</th>
                          <th className="text-center p-2">Tax Treatment</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b bg-green-50">
                          <td className="p-2 font-semibold">401(k)</td>
                          <td className="p-2 text-center">{formatCurrency(get2024Limits())}</td>
                          <td className="p-2 text-center text-green-600">✓ Yes</td>
                          <td className="p-2 text-center">Tax-deferred</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-semibold">Traditional IRA</td>
                          <td className="p-2 text-center">$7,000</td>
                          <td className="p-2 text-center text-red-600">✗ No</td>
                          <td className="p-2 text-center">Tax-deferred</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-semibold">Roth IRA</td>
                          <td className="p-2 text-center">$7,000</td>
                          <td className="p-2 text-center text-red-600">✗ No</td>
                          <td className="p-2 text-center">Tax-free</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Action Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl mb-2">🚨</div>
                      <div className="font-semibold text-red-800">Priority 1</div>
                      <div className="text-sm text-red-600 mt-1">
                        Get full employer match - it's free money!
                      </div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl mb-2">📈</div>
                      <div className="font-semibold text-yellow-800">Priority 2</div>
                      <div className="text-sm text-yellow-600 mt-1">
                        Increase contributions by 1% annually
                      </div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl mb-2">🎯</div>
                      <div className="font-semibold text-blue-800">Priority 3</div>
                      <div className="text-sm text-blue-600 mt-1">
                        Aim for 10-15% total savings rate
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
