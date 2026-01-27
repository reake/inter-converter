'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SecuredLoanResults {
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
  collateralValue: number;
  loanToValueRatio: number;
  riskAssessment: string;
  comparisonWithUnsecured: {
    unsecuredAPR: number;
    unsecuredPayment: number;
    savings: number;
  };
}

export default function SecuredLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('25000');
  const [collateralValue, setCollateralValue] = useState<string>('35000');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [loanTerm, setLoanTerm] = useState<string>('5');
  const [collateralType, setCollateralType] = useState<string>('auto');
  const [creditScore, setCreditScore] = useState<string>('700');
  const [results, setResults] = useState<SecuredLoanResults | null>(null);

  const calculateSecuredLoan = useCallback(() => {
    const principal = parseFloat(loanAmount);
    const collateral = parseFloat(collateralValue);
    const annualRate = parseFloat(interestRate) / 100;
    const years = parseFloat(loanTerm);
    const score = parseInt(creditScore);
    
    if (principal <= 0 || collateral <= 0 || annualRate < 0 || years <= 0) return;

    const monthlyRate = annualRate / 12;
    const numPayments = years * 12;
    
    // Calculate monthly payment
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const totalPayments = monthlyPayment * numPayments;
    const totalInterest = totalPayments - principal;
    
    // Calculate loan-to-value ratio
    const loanToValueRatio = (principal / collateral) * 100;
    
    // Risk assessment
    let riskAssessment = '';
    if (loanToValueRatio <= 70) {
      riskAssessment = 'Low Risk - Excellent collateral coverage';
    } else if (loanToValueRatio <= 85) {
      riskAssessment = 'Moderate Risk - Good collateral coverage';
    } else if (loanToValueRatio <= 100) {
      riskAssessment = 'Higher Risk - Limited collateral coverage';
    } else {
      riskAssessment = 'High Risk - Insufficient collateral';
    }
    
    // Compare with unsecured loan rates
    let unsecuredAPR = 12; // Base unsecured rate
    if (score >= 750) unsecuredAPR = 10;
    else if (score >= 700) unsecuredAPR = 12;
    else if (score >= 650) unsecuredAPR = 15;
    else if (score >= 600) unsecuredAPR = 18;
    else unsecuredAPR = 22;
    
    const unsecuredMonthlyRate = (unsecuredAPR / 100) / 12;
    const unsecuredPayment = (principal * unsecuredMonthlyRate * Math.pow(1 + unsecuredMonthlyRate, numPayments)) / 
                            (Math.pow(1 + unsecuredMonthlyRate, numPayments) - 1);
    
    const monthlySavings = unsecuredPayment - monthlyPayment;
    const totalSavings = monthlySavings * numPayments;

    setResults({
      monthlyPayment,
      totalPayments,
      totalInterest,
      collateralValue: collateral,
      loanToValueRatio,
      riskAssessment,
      comparisonWithUnsecured: {
        unsecuredAPR,
        unsecuredPayment,
        savings: totalSavings
      }
    });
  }, [loanAmount, collateralValue, interestRate, loanTerm, creditScore]);

  useEffect(() => {
    calculateSecuredLoan();
  }, [calculateSecuredLoan]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (rate: number) => `${rate.toFixed(2)}%`;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔒 Secured Loan Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="collateral">Collateral Types</TabsTrigger>
              <TabsTrigger value="comparison">Secured vs Unsecured</TabsTrigger>
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
                    <Label htmlFor="collateralValue">Collateral Value</Label>
                    <Input
                      id="collateralValue"
                      type="number"
                      value={collateralValue}
                      onChange={(e) => setCollateralValue(e.target.value)}
                      placeholder="Enter collateral value"
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      Current market value of your collateral
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="collateralType">Collateral Type</Label>
                    <Select value={collateralType} onValueChange={setCollateralType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select collateral type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Vehicle</SelectItem>
                        <SelectItem value="home">Real Estate</SelectItem>
                        <SelectItem value="savings">Savings Account</SelectItem>
                        <SelectItem value="cd">Certificate of Deposit</SelectItem>
                        <SelectItem value="stocks">Stocks/Securities</SelectItem>
                        <SelectItem value="equipment">Equipment</SelectItem>
                        <SelectItem value="jewelry">Jewelry</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <div className="text-sm text-gray-500 mt-1">
                      Secured loans typically offer 2-5% lower rates
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="loanTerm">Loan Term (years)</Label>
                    <Select value={loanTerm} onValueChange={setLoanTerm}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 years</SelectItem>
                        <SelectItem value="3">3 years</SelectItem>
                        <SelectItem value="4">4 years</SelectItem>
                        <SelectItem value="5">5 years</SelectItem>
                        <SelectItem value="7">7 years</SelectItem>
                        <SelectItem value="10">10 years</SelectItem>
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
                        <SelectItem value="550">Below 600 (Very Poor)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  {results && (
                    <>
                      <Card className="bg-green-50 border-green-200">
                        <CardHeader>
                          <CardTitle className="text-green-800 text-sm">Secured Loan Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Monthly Payment:</span>
                              <span className="font-semibold">{formatCurrency(results.monthlyPayment)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Total Payments:</span>
                              <span className="font-semibold">{formatCurrency(results.totalPayments)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Total Interest:</span>
                              <span className="font-semibold">{formatCurrency(results.totalInterest)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Loan-to-Value Ratio:</span>
                              <span className="font-semibold">{formatPercent(results.loanToValueRatio)}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className={`${results.loanToValueRatio <= 80 ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                        <CardHeader>
                          <CardTitle className={`text-sm ${results.loanToValueRatio <= 80 ? 'text-green-800' : 'text-yellow-800'}`}>
                            Risk Assessment
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className={`text-sm ${results.loanToValueRatio <= 80 ? 'text-green-700' : 'text-yellow-700'}`}>
                            {results.riskAssessment}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-blue-50 border-blue-200">
                        <CardHeader>
                          <CardTitle className="text-blue-800 text-sm">Savings vs Unsecured Loan</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Unsecured APR:</span>
                              <span className="font-semibold">{formatPercent(results.comparisonWithUnsecured.unsecuredAPR)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Unsecured Payment:</span>
                              <span className="font-semibold">{formatCurrency(results.comparisonWithUnsecured.unsecuredPayment)}</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                              <span>Total Savings:</span>
                              <span className="font-semibold">{formatCurrency(results.comparisonWithUnsecured.savings)}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="collateral" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">🚗 Vehicle Collateral</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📊 <strong>LTV Ratio:</strong> Up to 100% of value</div>
                      <div>📉 <strong>Depreciation:</strong> Vehicles lose value quickly</div>
                      <div>🔍 <strong>Appraisal:</strong> KBB or dealer appraisal</div>
                      <div>📋 <strong>Requirements:</strong> Clear title, insurance</div>
                      <div>⚡ <strong>Risk:</strong> Repossession if default</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">🏠 Real Estate Collateral</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📊 <strong>LTV Ratio:</strong> Up to 80-90% of value</div>
                      <div>📈 <strong>Appreciation:</strong> Often increases in value</div>
                      <div>🔍 <strong>Appraisal:</strong> Professional appraisal required</div>
                      <div>📋 <strong>Requirements:</strong> Property deed, insurance</div>
                      <div>⚡ <strong>Risk:</strong> Foreclosure if default</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">💰 Cash/CD Collateral</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📊 <strong>LTV Ratio:</strong> Up to 100% of deposit</div>
                      <div>🔒 <strong>Security:</strong> Funds frozen during loan</div>
                      <div>💸 <strong>Interest:</strong> Lowest rates available</div>
                      <div>📋 <strong>Requirements:</strong> Account at same bank</div>
                      <div>⚡ <strong>Risk:</strong> Funds seized if default</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-800 text-sm">📈 Securities Collateral</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📊 <strong>LTV Ratio:</strong> 50-70% of portfolio value</div>
                      <div>📉 <strong>Volatility:</strong> Market fluctuations affect value</div>
                      <div>💼 <strong>Margin calls:</strong> May need additional collateral</div>
                      <div>📋 <strong>Requirements:</strong> Brokerage account</div>
                      <div>⚡ <strong>Risk:</strong> Securities sold if default</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">✅ Secured Loan Advantages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>💰 <strong>Lower Interest Rates:</strong> 2-5% lower than unsecured</div>
                      <div>💵 <strong>Higher Loan Amounts:</strong> Based on collateral value</div>
                      <div>📈 <strong>Easier Approval:</strong> Collateral reduces lender risk</div>
                      <div>🏦 <strong>Better Terms:</strong> Longer repayment periods</div>
                      <div>📊 <strong>Credit Building:</strong> Helps improve credit score</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800 text-sm">⚠️ Secured Loan Risks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🏠 <strong>Asset Loss Risk:</strong> Can lose collateral if default</div>
                      <div>📉 <strong>Depreciation:</strong> Collateral may lose value</div>
                      <div>📋 <strong>More Paperwork:</strong> Appraisals and documentation</div>
                      <div>⏰ <strong>Longer Process:</strong> More time to approve</div>
                      <div>🔒 <strong>Asset Tied Up:</strong> Can&apos;t sell collateral freely</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">💳 Unsecured Loan Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🏠 <strong>No Asset Risk:</strong> Can&apos;t lose property</div>
                      <div>⚡ <strong>Faster Approval:</strong> Less documentation needed</div>
                      <div>🔓 <strong>No Collateral:</strong> Don&apos;t need valuable assets</div>
                      <div>📋 <strong>Simple Process:</strong> Credit-based approval</div>
                      <div>💰 <strong>Flexible Use:</strong> No restrictions on funds</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-800 text-sm">🎯 When to Choose Each</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🔒 <strong>Choose Secured If:</strong> You have valuable assets, want lower rates, need larger amounts</div>
                      <div>💳 <strong>Choose Unsecured If:</strong> You have good credit, need funds quickly, don&apos;t want asset risk</div>
                      <div>⚖️ <strong>Consider Both:</strong> Compare total costs and risks</div>
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
