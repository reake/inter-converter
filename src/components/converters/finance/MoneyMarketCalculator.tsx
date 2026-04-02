'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SavingsResults {
  finalBalance: number;
  totalInterest: number;
  monthlyInterest: number;
  effectiveAPY: number;
  yearlyBreakdown: Array<{
    year: number;
    balance: number;
    interestEarned: number;
  }>;
}

export default function MoneyMarketCalculator() {
  const [initialDeposit, setInitialDeposit] = useState<string>('10000');
  const [monthlyDeposit, setMonthlyDeposit] = useState<string>('500');
  const [interestRate, setInterestRate] = useState<string>('4.5');
  const [timeHorizon, setTimeHorizon] = useState<string>('5');
  const [compoundingFreq, setCompoundingFreq] = useState<string>('monthly');
  const [accountType, setAccountType] = useState<string>('standard');
  const [results, setResults] = useState<SavingsResults | null>(null);

  const calculateSavings = useCallback(() => {
    const initial = parseFloat(initialDeposit);
    const monthly = parseFloat(monthlyDeposit);
    const rate = parseFloat(interestRate) / 100;
    const years = parseFloat(timeHorizon);
    
    if (initial < 0 || rate < 0 || years <= 0) return;

    const compoundingPeriods = compoundingFreq === 'daily' ? 365 : 
                              compoundingFreq === 'monthly' ? 12 : 4;
    const periodicRate = rate / compoundingPeriods;
    const totalPeriods = years * compoundingPeriods;
    
    // Calculate compound interest on initial deposit
    const compoundedInitial = initial * Math.pow(1 + periodicRate, totalPeriods);
    
    // Calculate future value of monthly deposits (annuity)
    const monthlyPeriods = years * 12;
    const monthlyRate = rate / 12;
    const futureValueAnnuity = monthly * (Math.pow(1 + monthlyRate, monthlyPeriods) - 1) / monthlyRate;
    
    const finalBalance = compoundedInitial + futureValueAnnuity;
    const totalDeposits = initial + (monthly * monthlyPeriods);
    const totalInterest = finalBalance - totalDeposits;
    const monthlyInterest = totalInterest / monthlyPeriods;
    
    // Calculate effective APY
    const effectiveAPY = Math.pow(1 + periodicRate, compoundingPeriods) - 1;
    
    // Generate yearly breakdown
    const yearlyBreakdown = [];
    for (let year = 1; year <= years; year++) {
      const periodsThisYear = year * compoundingPeriods;
      const depositsThisYear = initial + (monthly * year * 12);
      const compoundedThisYear = initial * Math.pow(1 + periodicRate, periodsThisYear);
      const annuityThisYear = monthly * (Math.pow(1 + monthlyRate, year * 12) - 1) / monthlyRate;
      const balanceThisYear = compoundedThisYear + annuityThisYear;
      const interestThisYear = balanceThisYear - depositsThisYear;
      
      yearlyBreakdown.push({
        year,
        balance: balanceThisYear,
        interestEarned: interestThisYear
      });
    }

    setResults({
      finalBalance,
      totalInterest,
      monthlyInterest,
      effectiveAPY,
      yearlyBreakdown
    });
  }, [initialDeposit, monthlyDeposit, interestRate, timeHorizon, compoundingFreq]);

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

  const getEstimatedRate = () => {
    const baseRate = 4.5;
    if (accountType === 'premium') return baseRate + 0.5;
    if (accountType === 'jumbo') return baseRate + 1.0;
    return baseRate;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📈 Money Market Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="comparison">Account Types</TabsTrigger>
              <TabsTrigger value="strategies">Strategies</TabsTrigger>
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
                    <Label htmlFor="monthlyDeposit">Monthly Deposit</Label>
                    <Input
                      id="monthlyDeposit"
                      type="number"
                      value={monthlyDeposit}
                      onChange={(e) => setMonthlyDeposit(e.target.value)}
                      placeholder="Enter monthly deposit"
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
                    <div className="text-sm text-gray-500 mt-1">
                      Current average: {getEstimatedRate().toFixed(2)}%
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="timeHorizon">Time Horizon (years)</Label>
                    <Select value={timeHorizon} onValueChange={setTimeHorizon}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time horizon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 year</SelectItem>
                        <SelectItem value="2">2 years</SelectItem>
                        <SelectItem value="3">3 years</SelectItem>
                        <SelectItem value="5">5 years</SelectItem>
                        <SelectItem value="10">10 years</SelectItem>
                        <SelectItem value="15">15 years</SelectItem>
                        <SelectItem value="20">20 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="compoundingFreq">Compounding Frequency</Label>
                    <Select value={compoundingFreq} onValueChange={setCompoundingFreq}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select compounding frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="accountType">Account Type</Label>
                    <Select value={accountType} onValueChange={setAccountType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard ($2,500 min)</SelectItem>
                        <SelectItem value="premium">Premium ($10,000 min)</SelectItem>
                        <SelectItem value="jumbo">Jumbo ($100,000 min)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {results && (
                    <Card className="bg-green-50 border-green-200">
                      <CardHeader>
                        <CardTitle className="text-green-800 text-sm">Growth Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Final Balance:</span>
                            <span className="font-semibold text-lg">{formatCurrency(results.finalBalance)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Interest:</span>
                            <span className="font-semibold text-green-600">{formatCurrency(results.totalInterest)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Monthly Interest:</span>
                            <span className="font-semibold">{formatCurrency(results.monthlyInterest)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Effective APY:</span>
                            <span className="font-semibold">{formatPercent(results.effectiveAPY)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {results && results.yearlyBreakdown.length > 0 && (
                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-blue-800 text-sm">Yearly Growth</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1 text-xs max-h-32 overflow-y-auto">
                          {results.yearlyBreakdown.map((year) => (
                            <div key={year.year} className="flex justify-between">
                              <span>Year {year.year}:</span>
                              <span className="font-semibold">{formatCurrency(year.balance)}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">Money Market Account</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✓ Higher interest rates</div>
                      <div>✓ FDIC insured up to $250K</div>
                      <div>✓ Check writing privileges</div>
                      <div>✓ Debit card access</div>
                      <div>⚠ Higher minimum balance</div>
                      <div>⚠ Limited transactions</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">High-Yield Savings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✓ Competitive interest rates</div>
                      <div>✓ Lower minimum balance</div>
                      <div>✓ FDIC insured</div>
                      <div>✓ Easy online access</div>
                      <div>⚠ No check writing</div>
                      <div>⚠ Limited transactions</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Certificate of Deposit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✓ Fixed interest rates</div>
                      <div>✓ FDIC insured</div>
                      <div>✓ Predictable returns</div>
                      <div>✓ Various term options</div>
                      <div>⚠ Funds locked up</div>
                      <div>⚠ Early withdrawal penalties</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="strategies" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">Maximizing Returns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📊 Compare rates across institutions</div>
                      <div>💰 Maintain minimum balance requirements</div>
                      <div>🔄 Set up automatic transfers</div>
                      <div>📈 Consider promotional rates</div>
                      <div>🏦 Look for relationship bonuses</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Account Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📋 Monitor transaction limits</div>
                      <div>💳 Use debit card strategically</div>
                      <div>📱 Set up mobile alerts</div>
                      <div>📊 Review statements monthly</div>
                      <div>🔄 Rebalance regularly</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Tax Considerations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📋 Interest is taxable income</div>
                      <div>🏦 Receive 1099-INT forms</div>
                      <div>💰 Consider tax-advantaged accounts</div>
                      <div>📊 Track interest for tax filing</div>
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
                      <div>🛡️ FDIC insurance protection</div>
                      <div>💰 Stay within insurance limits</div>
                      <div>🏦 Diversify across institutions</div>
                      <div>📈 Consider inflation impact</div>
                      <div>🔄 Review rates regularly</div>
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
