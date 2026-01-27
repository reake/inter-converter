'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RothResults {
  finalBalance: number;
  totalContributions: number;
  totalGrowth: number;
  taxFreeWithdrawals: number;
  comparisonTraditional: {
    beforeTaxBalance: number;
    afterTaxBalance: number;
    taxSavings: number;
  };
}

export default function RothIRACalculator() {
  const [currentAge, setCurrentAge] = useState<string>('30');
  const [retirementAge, setRetirementAge] = useState<string>('65');
  const [currentBalance, setCurrentBalance] = useState<string>('5000');
  const [annualContribution, setAnnualContribution] = useState<string>('6000');
  const [expectedReturn, setExpectedReturn] = useState<string>('7');
  const [currentTaxRate, setCurrentTaxRate] = useState<string>('22');
  const [retirementTaxRate, setRetirementTaxRate] = useState<string>('15');
  const [results, setResults] = useState<RothResults | null>(null);

  const calculateRothIRA = useCallback(() => {
    const age = parseInt(currentAge);
    const retAge = parseInt(retirementAge);
    const balance = parseFloat(currentBalance);
    const contribution = parseFloat(annualContribution);
    const returnRate = parseFloat(expectedReturn) / 100;
    const currentTax = parseFloat(currentTaxRate) / 100;
    const retirementTax = parseFloat(retirementTaxRate) / 100;
    
    if (age >= retAge || returnRate < 0 || balance < 0) return;

    const yearsToRetirement = retAge - age;
    
    // Calculate Roth IRA growth
    let rothBalance = balance;
    let totalContributions = balance;
    
    for (let year = 0; year < yearsToRetirement; year++) {
      rothBalance = rothBalance * (1 + returnRate) + contribution;
      totalContributions += contribution;
    }
    
    const totalGrowth = rothBalance - totalContributions;
    
    // Compare with Traditional IRA
    // Traditional IRA: pre-tax contributions, taxed on withdrawal
    const traditionalContribution = contribution / (1 - currentTax); // Gross income needed
    let traditionalBalance = balance;
    
    for (let year = 0; year < yearsToRetirement; year++) {
      traditionalBalance = traditionalBalance * (1 + returnRate) + traditionalContribution;
    }
    
    const afterTaxTraditional = traditionalBalance * (1 - retirementTax);
    const taxSavings = rothBalance - afterTaxTraditional;

    setResults({
      finalBalance: rothBalance,
      totalContributions,
      totalGrowth,
      taxFreeWithdrawals: rothBalance,
      comparisonTraditional: {
        beforeTaxBalance: traditionalBalance,
        afterTaxBalance: afterTaxTraditional,
        taxSavings
      }
    });
  }, [annualContribution, currentAge, currentBalance, currentTaxRate, expectedReturn, retirementAge, retirementTaxRate]);

  useEffect(() => {
    calculateRothIRA();
  }, [calculateRothIRA]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getContributionLimit = () => {
    const age = parseInt(currentAge);
    return age >= 50 ? 7000 : 6000; // 2024 limits with catch-up
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏦 Roth IRA Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="comparison">Roth vs Traditional</TabsTrigger>
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
                    <Label htmlFor="currentBalance">Current Roth IRA Balance</Label>
                    <Input
                      id="currentBalance"
                      type="number"
                      value={currentBalance}
                      onChange={(e) => setCurrentBalance(e.target.value)}
                      placeholder="Enter current balance"
                    />
                  </div>

                  <div>
                    <Label htmlFor="annualContribution">Annual Contribution</Label>
                    <Input
                      id="annualContribution"
                      type="number"
                      value={annualContribution}
                      onChange={(e) => setAnnualContribution(e.target.value)}
                      placeholder="Enter annual contribution"
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      2024 limit: ${getContributionLimit().toLocaleString()} (${parseInt(currentAge) >= 50 ? '$1,000 catch-up included' : 'add $1,000 at age 50+'})
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                    <Input
                      id="expectedReturn"
                      type="number"
                      step="0.1"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(e.target.value)}
                      placeholder="Enter expected return"
                    />
                  </div>

                  <div>
                    <Label htmlFor="currentTaxRate">Current Tax Rate (%)</Label>
                    <Input
                      id="currentTaxRate"
                      type="number"
                      step="0.1"
                      value={currentTaxRate}
                      onChange={(e) => setCurrentTaxRate(e.target.value)}
                      placeholder="Enter current tax rate"
                    />
                  </div>

                  <div>
                    <Label htmlFor="retirementTaxRate">Expected Retirement Tax Rate (%)</Label>
                    <Input
                      id="retirementTaxRate"
                      type="number"
                      step="0.1"
                      value={retirementTaxRate}
                      onChange={(e) => setRetirementTaxRate(e.target.value)}
                      placeholder="Enter retirement tax rate"
                    />
                  </div>

                  {results && (
                    <Card className="bg-green-50 border-green-200">
                      <CardHeader>
                        <CardTitle className="text-green-800 text-sm">Roth IRA Projection</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Final Balance:</span>
                            <span className="font-semibold text-lg">{formatCurrency(results.finalBalance)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Contributions:</span>
                            <span className="font-semibold">{formatCurrency(results.totalContributions)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax-Free Growth:</span>
                            <span className="font-semibold text-green-600">{formatCurrency(results.totalGrowth)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax-Free Withdrawals:</span>
                            <span className="font-semibold text-blue-600">{formatCurrency(results.taxFreeWithdrawals)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-4">
              {results && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-green-50 border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-800 text-sm">Roth IRA</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>After-Tax Value:</span>
                          <span className="font-semibold">{formatCurrency(results.finalBalance)}</span>
                        </div>
                        <div className="text-xs text-green-700 mt-2">
                          <div>✓ Tax-free growth</div>
                          <div>✓ Tax-free withdrawals</div>
                          <div>✓ No required distributions</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-800 text-sm">Traditional IRA</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Before-Tax Value:</span>
                          <span className="font-semibold">{formatCurrency(results.comparisonTraditional.beforeTaxBalance)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>After-Tax Value:</span>
                          <span className="font-semibold">{formatCurrency(results.comparisonTraditional.afterTaxBalance)}</span>
                        </div>
                        <div className="text-xs text-blue-700 mt-2">
                          <div>✓ Tax deduction now</div>
                          <div>⚠ Taxed on withdrawals</div>
                          <div>⚠ Required distributions at 73</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {results && (
                <Card className={`${results.comparisonTraditional.taxSavings > 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <CardHeader>
                    <CardTitle className={`text-sm ${results.comparisonTraditional.taxSavings > 0 ? 'text-green-800' : 'text-red-800'}`}>
                      Roth IRA Advantage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {results.comparisonTraditional.taxSavings > 0 ? '+' : ''}{formatCurrency(results.comparisonTraditional.taxSavings)}
                      </div>
                      <div className="text-sm mt-1">
                        {results.comparisonTraditional.taxSavings > 0 
                          ? 'Roth IRA provides more after-tax income'
                          : 'Traditional IRA may be better in this scenario'
                        }
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">When to Choose Roth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📈 Expect higher tax rates in retirement</div>
                      <div>👶 Young with lower current income</div>
                      <div>🏠 Want tax-free inheritance for heirs</div>
                      <div>🎯 No required minimum distributions</div>
                      <div>💰 Can afford after-tax contributions</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-800 text-sm">When to Choose Traditional</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📉 Expect lower tax rates in retirement</div>
                      <div>💼 High current income/tax bracket</div>
                      <div>💰 Need immediate tax deduction</div>
                      <div>🎯 Employer match in 401(k)</div>
                      <div>📊 Income too high for Roth IRA</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="strategies" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">Maximizing Roth Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>💰 Contribute maximum allowed annually</div>
                      <div>🎯 Start as early as possible</div>
                      <div>📈 Invest in growth-oriented assets</div>
                      <div>🔄 Consider Roth conversions</div>
                      <div>⏰ Use catch-up contributions at 50+</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Roth Conversion Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🔄 Convert during low-income years</div>
                      <div>📉 Convert when market is down</div>
                      <div>📊 Manage tax brackets carefully</div>
                      <div>💰 Pay conversion taxes from other funds</div>
                      <div>⏰ Consider multi-year strategy</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Income Limits (2024)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>👤 Single: Phase-out $138K-$153K</div>
                      <div>👫 Married: Phase-out $218K-$228K</div>
                      <div>🚪 Backdoor Roth if over limits</div>
                      <div>💼 Mega backdoor Roth via 401(k)</div>
                      <div>📋 No age limits for contributions</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800 text-sm">Withdrawal Rules</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>💰 Contributions: withdraw anytime</div>
                      <div>⏰ Earnings: 5-year rule + age 59½</div>
                      <div>🏠 $10K first-time home purchase</div>
                      <div>🎓 Higher education expenses</div>
                      <div>🚨 Early withdrawal penalties on earnings</div>
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
