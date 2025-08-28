'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BusinessLoanResults {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  cashFlowImpact: number;
  debtServiceCoverage: number;
}

export default function BusinessLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('100000');
  const [interestRate, setInterestRate] = useState<string>('7.5');
  const [loanTerm, setLoanTerm] = useState<string>('5');
  const [loanType, setLoanType] = useState<string>('term');
  const [businessRevenue, setBusinessRevenue] = useState<string>('500000');
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>('35000');
  const [creditScore, setCreditScore] = useState<string>('good');
  const [results, setResults] = useState<BusinessLoanResults | null>(null);

  const loanTypes = {
    'term': 'Term Loan',
    'sba': 'SBA Loan',
    'equipment': 'Equipment Financing',
    'line-of-credit': 'Line of Credit',
    'invoice': 'Invoice Factoring'
  };

  const creditScores = {
    'excellent': 'Excellent (750+)',
    'good': 'Good (700-749)',
    'fair': 'Fair (650-699)',
    'poor': 'Poor (600-649)'
  };

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = parseFloat(loanTerm) * 12;
    const revenue = parseFloat(businessRevenue);
    const expenses = parseFloat(monthlyExpenses);

    if (principal <= 0 || rate < 0 || months <= 0) return;

    let monthlyPayment: number;
    
    if (loanType === 'line-of-credit') {
      // Interest-only calculation for line of credit
      monthlyPayment = principal * (parseFloat(interestRate) / 100 / 12);
    } else {
      // Standard amortizing loan calculation
      monthlyPayment = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    }

    const totalCost = loanType === 'line-of-credit' ? principal + (monthlyPayment * 12) : monthlyPayment * months;
    const totalInterest = totalCost - principal;
    const cashFlowImpact = monthlyPayment / (revenue / 12) * 100;
    const debtServiceCoverage = (revenue / 12 - expenses) / monthlyPayment;

    setResults({
      monthlyPayment,
      totalInterest,
      totalCost,
      cashFlowImpact,
      debtServiceCoverage
    });
  };

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm, loanType, businessRevenue, monthlyExpenses]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getDebtServiceRating = (ratio: number) => {
    if (ratio >= 1.5) return { text: 'Excellent', color: 'text-green-600' };
    if (ratio >= 1.25) return { text: 'Good', color: 'text-blue-600' };
    if (ratio >= 1.0) return { text: 'Acceptable', color: 'text-yellow-600' };
    return { text: 'Poor', color: 'text-red-600' };
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏢 Business Loan Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="analysis">Cash Flow Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="loanAmount">Loan Amount</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="Enter loan amount"
                    />
                  </div>

                  <div>
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
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
                    <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                    <Select value={loanTerm} onValueChange={setLoanTerm}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Year</SelectItem>
                        <SelectItem value="2">2 Years</SelectItem>
                        <SelectItem value="3">3 Years</SelectItem>
                        <SelectItem value="5">5 Years</SelectItem>
                        <SelectItem value="7">7 Years</SelectItem>
                        <SelectItem value="10">10 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="loanType">Loan Type</Label>
                    <Select value={loanType} onValueChange={setLoanType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(loanTypes).map(([key, label]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="businessRevenue">Annual Revenue</Label>
                    <Input
                      id="businessRevenue"
                      type="number"
                      value={businessRevenue}
                      onChange={(e) => setBusinessRevenue(e.target.value)}
                      placeholder="Enter annual revenue"
                    />
                  </div>

                  <div>
                    <Label htmlFor="monthlyExpenses">Monthly Operating Expenses</Label>
                    <Input
                      id="monthlyExpenses"
                      type="number"
                      value={monthlyExpenses}
                      onChange={(e) => setMonthlyExpenses(e.target.value)}
                      placeholder="Enter monthly expenses"
                    />
                  </div>

                  <div>
                    <Label htmlFor="creditScore">Business Credit Score</Label>
                    <Select value={creditScore} onValueChange={setCreditScore}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select credit score range" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(creditScores).map(([key, label]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {results && (
                <Card className="bg-green-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800">Loan Payment Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(results.monthlyPayment)}
                        </div>
                        <div className="text-sm text-green-600">Monthly Payment</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(results.totalCost)}
                        </div>
                        <div className="text-sm text-blue-600">Total Cost</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {formatCurrency(results.totalInterest)}
                        </div>
                        <div className="text-sm text-orange-600">Total Interest</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {results.cashFlowImpact.toFixed(1)}%
                        </div>
                        <div className="text-sm text-purple-600">Cash Flow Impact</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              {results && (
                <div className="space-y-4">
                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <CardTitle className="text-blue-800">Debt Service Coverage Ratio</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold text-blue-600">
                            {results.debtServiceCoverage.toFixed(2)}x
                          </div>
                          <div className="text-sm text-gray-600">Coverage Ratio</div>
                        </div>
                        <div className={`text-lg font-semibold ${getDebtServiceRating(results.debtServiceCoverage).color}`}>
                          {getDebtServiceRating(results.debtServiceCoverage).text}
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-gray-600">
                        <p>This ratio measures your business's ability to service debt payments. A ratio above 1.25 is generally considered healthy.</p>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-green-800">Monthly Cash Flow Impact</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Monthly Revenue:</span>
                            <span className="font-semibold">{formatCurrency(parseFloat(businessRevenue) / 12)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Operating Expenses:</span>
                            <span className="font-semibold">{formatCurrency(parseFloat(monthlyExpenses))}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Loan Payment:</span>
                            <span className="font-semibold text-red-600">{formatCurrency(results.monthlyPayment)}</span>
                          </div>
                          <hr />
                          <div className="flex justify-between font-bold">
                            <span>Net Cash Flow:</span>
                            <span className={parseFloat(businessRevenue) / 12 - parseFloat(monthlyExpenses) - results.monthlyPayment > 0 ? 'text-green-600' : 'text-red-600'}>
                              {formatCurrency(parseFloat(businessRevenue) / 12 - parseFloat(monthlyExpenses) - results.monthlyPayment)}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-purple-800">Loan Type Benefits</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm space-y-2">
                          {loanType === 'sba' && (
                            <div>
                              <p className="font-semibold text-green-600">SBA Loan Benefits:</p>
                              <ul className="list-disc list-inside text-gray-600">
                                <li>Lower interest rates</li>
                                <li>Longer repayment terms</li>
                                <li>Lower down payments</li>
                              </ul>
                            </div>
                          )}
                          {loanType === 'equipment' && (
                            <div>
                              <p className="font-semibold text-blue-600">Equipment Financing:</p>
                              <ul className="list-disc list-inside text-gray-600">
                                <li>Equipment serves as collateral</li>
                                <li>Potential tax benefits</li>
                                <li>Preserve working capital</li>
                              </ul>
                            </div>
                          )}
                          {loanType === 'line-of-credit' && (
                            <div>
                              <p className="font-semibold text-orange-600">Line of Credit:</p>
                              <ul className="list-disc list-inside text-gray-600">
                                <li>Flexible access to funds</li>
                                <li>Pay interest only on used amount</li>
                                <li>Revolving credit facility</li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Loan Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-green-700 mb-2">💡 Approval Tips</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Maintain strong business credit score (700+)</li>
                <li>• Prepare detailed financial statements</li>
                <li>• Have a solid business plan and cash flow projections</li>
                <li>• Consider SBA loans for better terms</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 mb-2">📊 Financial Health</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Keep debt service coverage ratio above 1.25</li>
                <li>• Maintain adequate cash reserves</li>
                <li>• Monitor cash flow impact carefully</li>
                <li>• Consider seasonal business fluctuations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
