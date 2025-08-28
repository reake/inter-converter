'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface LoanResults {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  payoffDate: string;
  monthlyPaymentBreakdown: {
    principal: number;
    interest: number;
  };
}

export default function HomeImprovementLoanCalculator() {
  const [projectCost, setProjectCost] = useState<string>('50000');
  const [downPayment, setDownPayment] = useState<string>('10000');
  const [interestRate, setInterestRate] = useState<string>('7.5');
  const [loanTerm, setLoanTerm] = useState<string>('10');
  const [loanType, setLoanType] = useState<string>('personal');
  const [creditScore, setCreditScore] = useState<string>('750');
  const [results, setResults] = useState<LoanResults | null>(null);

  const calculateLoan = () => {
    const cost = parseFloat(projectCost);
    const down = parseFloat(downPayment);
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseFloat(loanTerm) * 12;
    
    const loanAmount = cost - down;
    
    if (loanAmount <= 0 || rate <= 0 || term <= 0) return;

    const monthlyPayment = (loanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - loanAmount;
    
    const currentDate = new Date();
    const payoffDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + term, 1);
    
    const principalPayment = loanAmount / term;
    const interestPayment = monthlyPayment - principalPayment;

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      payoffDate: payoffDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
      monthlyPaymentBreakdown: {
        principal: principalPayment,
        interest: interestPayment
      }
    });
  };

  useEffect(() => {
    calculateLoan();
  }, [projectCost, downPayment, interestRate, loanTerm, loanType, creditScore]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getEstimatedRate = () => {
    const score = parseInt(creditScore);
    const baseRate = loanType === 'heloc' ? 6.5 : loanType === 'personal' ? 8.5 : 5.5;
    
    if (score >= 750) return baseRate;
    if (score >= 700) return baseRate + 1;
    if (score >= 650) return baseRate + 2;
    return baseRate + 3;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏠 Home Improvement Loan Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="options">Loan Options</TabsTrigger>
              <TabsTrigger value="tips">Improvement Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="projectCost">Total Project Cost</Label>
                    <Input
                      id="projectCost"
                      type="number"
                      value={projectCost}
                      onChange={(e) => setProjectCost(e.target.value)}
                      placeholder="Enter project cost"
                    />
                  </div>

                  <div>
                    <Label htmlFor="downPayment">Down Payment</Label>
                    <Input
                      id="downPayment"
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(e.target.value)}
                      placeholder="Enter down payment"
                    />
                  </div>

                  <div>
                    <Label htmlFor="loanType">Loan Type</Label>
                    <Select value={loanType} onValueChange={setLoanType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal Loan</SelectItem>
                        <SelectItem value="heloc">HELOC</SelectItem>
                        <SelectItem value="home-equity">Home Equity Loan</SelectItem>
                        <SelectItem value="cash-out">Cash-Out Refinance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="creditScore">Credit Score</Label>
                    <Select value={creditScore} onValueChange={setCreditScore}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select credit score range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="800">800+ (Excellent)</SelectItem>
                        <SelectItem value="750">750-799 (Very Good)</SelectItem>
                        <SelectItem value="700">700-749 (Good)</SelectItem>
                        <SelectItem value="650">650-699 (Fair)</SelectItem>
                        <SelectItem value="600">600-649 (Poor)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
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
                    <div className="text-sm text-gray-500 mt-1">
                      Estimated rate for your credit: {getEstimatedRate().toFixed(2)}%
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="loanTerm">Loan Term (years)</Label>
                    <Select value={loanTerm} onValueChange={setLoanTerm}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 years</SelectItem>
                        <SelectItem value="7">7 years</SelectItem>
                        <SelectItem value="10">10 years</SelectItem>
                        <SelectItem value="15">15 years</SelectItem>
                        <SelectItem value="20">20 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {results && (
                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-blue-800 text-sm">Loan Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Loan Amount:</span>
                            <span className="font-semibold">{formatCurrency(parseFloat(projectCost) - parseFloat(downPayment))}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Monthly Payment:</span>
                            <span className="font-semibold text-lg">{formatCurrency(results.monthlyPayment)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Interest:</span>
                            <span className="font-semibold">{formatCurrency(results.totalInterest)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Payoff Date:</span>
                            <span className="font-semibold">{results.payoffDate}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="options" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">Personal Loan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✓ No collateral required</div>
                      <div>✓ Fixed interest rates</div>
                      <div>✓ Quick approval process</div>
                      <div>⚠ Higher interest rates</div>
                      <div>⚠ Lower loan amounts</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">HELOC</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✓ Lower interest rates</div>
                      <div>✓ Tax-deductible interest</div>
                      <div>✓ Flexible borrowing</div>
                      <div>⚠ Variable rates</div>
                      <div>⚠ Home as collateral</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Home Equity Loan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✓ Fixed interest rates</div>
                      <div>✓ Tax-deductible interest</div>
                      <div>✓ Lump sum payment</div>
                      <div>⚠ Home as collateral</div>
                      <div>⚠ Closing costs</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-800 text-sm">Cash-Out Refinance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✓ Lowest interest rates</div>
                      <div>✓ Tax-deductible interest</div>
                      <div>✓ Large loan amounts</div>
                      <div>⚠ Replaces current mortgage</div>
                      <div>⚠ High closing costs</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tips" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">High ROI Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🏠 Kitchen remodel (70-80% ROI)</div>
                      <div>🚿 Bathroom renovation (60-70% ROI)</div>
                      <div>🏡 Curb appeal improvements (75-100% ROI)</div>
                      <div>🪟 Window replacement (70-80% ROI)</div>
                      <div>🏠 Siding replacement (75-85% ROI)</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Planning Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📋 Get multiple contractor quotes</div>
                      <div>📊 Budget 10-20% extra for overruns</div>
                      <div>🏦 Shop around for best loan rates</div>
                      <div>📅 Consider seasonal timing</div>
                      <div>🏠 Focus on functional improvements</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Cost-Saving Strategies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🔨 DIY where possible</div>
                      <div>🛒 Buy materials during sales</div>
                      <div>📋 Combine multiple projects</div>
                      <div>⏰ Schedule during off-season</div>
                      <div>♻️ Consider refurbished materials</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800 text-sm">Avoid These Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>❌ Over-improving for neighborhood</div>
                      <div>❌ Skipping permits</div>
                      <div>❌ Choosing cheapest contractor</div>
                      <div>❌ Not checking references</div>
                      <div>❌ Ignoring resale value</div>
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
