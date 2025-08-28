'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface UnsecuredLoanResults {
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
  estimatedAPR: number;
  debtToIncomeRatio: number;
  qualificationLikelihood: string;
  alternativeOptions: {
    securedLoanAPR: number;
    securedSavings: number;
    creditCardAPR: number;
    creditCardCost: number;
  };
}

export default function UnsecuredLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('15000');
  const [interestRate, setInterestRate] = useState<string>('12.5');
  const [loanTerm, setLoanTerm] = useState<string>('5');
  const [creditScore, setCreditScore] = useState<string>('700');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('5000');
  const [monthlyDebts, setMonthlyDebts] = useState<string>('800');
  const [loanPurpose, setLoanPurpose] = useState<string>('debt-consolidation');
  const [results, setResults] = useState<UnsecuredLoanResults | null>(null);

  const calculateUnsecuredLoan = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const years = parseFloat(loanTerm);
    const score = parseInt(creditScore);
    const income = parseFloat(monthlyIncome);
    const debts = parseFloat(monthlyDebts);
    
    if (principal <= 0 || annualRate < 0 || years <= 0 || income <= 0) return;

    const monthlyRate = annualRate / 12;
    const numPayments = years * 12;
    
    // Calculate monthly payment
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const totalPayments = monthlyPayment * numPayments;
    const totalInterest = totalPayments - principal;
    
    // Calculate debt-to-income ratio
    const newMonthlyDebts = debts + monthlyPayment;
    const debtToIncomeRatio = (newMonthlyDebts / income) * 100;
    
    // Estimate actual APR based on credit score
    let estimatedAPR = annualRate * 100;
    if (score >= 750) estimatedAPR = Math.max(6, estimatedAPR * 0.8);
    else if (score >= 700) estimatedAPR = Math.max(8, estimatedAPR * 0.9);
    else if (score >= 650) estimatedAPR = Math.max(10, estimatedAPR);
    else if (score >= 600) estimatedAPR = Math.max(15, estimatedAPR * 1.2);
    else estimatedAPR = Math.max(20, estimatedAPR * 1.5);
    
    // Qualification likelihood
    let qualificationLikelihood = '';
    if (score >= 750 && debtToIncomeRatio <= 36) {
      qualificationLikelihood = 'Excellent - Very likely to qualify for best rates';
    } else if (score >= 700 && debtToIncomeRatio <= 43) {
      qualificationLikelihood = 'Good - Likely to qualify with competitive rates';
    } else if (score >= 650 && debtToIncomeRatio <= 50) {
      qualificationLikelihood = 'Fair - May qualify with higher rates';
    } else if (score >= 600) {
      qualificationLikelihood = 'Poor - Difficult to qualify, very high rates';
    } else {
      qualificationLikelihood = 'Very Poor - Unlikely to qualify';
    }
    
    // Alternative options comparison
    const securedLoanAPR = estimatedAPR * 0.6; // Secured loans typically 40% lower
    const securedMonthlyRate = (securedLoanAPR / 100) / 12;
    const securedPayment = (principal * securedMonthlyRate * Math.pow(1 + securedMonthlyRate, numPayments)) / 
                          (Math.pow(1 + securedMonthlyRate, numPayments) - 1);
    const securedSavings = (monthlyPayment - securedPayment) * numPayments;
    
    const creditCardAPR = Math.max(18, estimatedAPR + 5); // Credit cards typically higher
    const creditCardMonthlyRate = (creditCardAPR / 100) / 12;
    const creditCardPayment = (principal * creditCardMonthlyRate * Math.pow(1 + creditCardMonthlyRate, numPayments)) / 
                             (Math.pow(1 + creditCardMonthlyRate, numPayments) - 1);
    const creditCardCost = (creditCardPayment - monthlyPayment) * numPayments;

    setResults({
      monthlyPayment,
      totalPayments,
      totalInterest,
      estimatedAPR,
      debtToIncomeRatio,
      qualificationLikelihood,
      alternativeOptions: {
        securedLoanAPR,
        securedSavings,
        creditCardAPR,
        creditCardCost
      }
    });
  };

  useEffect(() => {
    calculateUnsecuredLoan();
  }, [loanAmount, interestRate, loanTerm, creditScore, monthlyIncome, monthlyDebts, loanPurpose]);

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
            🔓 Unsecured Loan Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="qualification">Qualification</TabsTrigger>
              <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
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
                    <div className="text-sm text-gray-500 mt-1">
                      Typical range: $2,000 - $100,000
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="loanPurpose">Loan Purpose</Label>
                    <Select value={loanPurpose} onValueChange={setLoanPurpose}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
                        <SelectItem value="home-improvement">Home Improvement</SelectItem>
                        <SelectItem value="major-purchase">Major Purchase</SelectItem>
                        <SelectItem value="medical">Medical Expenses</SelectItem>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="vacation">Vacation</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
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
                      Rates typically range from 6% to 36%
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

                  <div>
                    <Label htmlFor="monthlyIncome">Monthly Income</Label>
                    <Input
                      id="monthlyIncome"
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                      placeholder="Enter monthly income"
                    />
                  </div>

                  <div>
                    <Label htmlFor="monthlyDebts">Current Monthly Debts</Label>
                    <Input
                      id="monthlyDebts"
                      type="number"
                      value={monthlyDebts}
                      onChange={(e) => setMonthlyDebts(e.target.value)}
                      placeholder="Enter current monthly debt payments"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {results && (
                    <>
                      <Card className="bg-blue-50 border-blue-200">
                        <CardHeader>
                          <CardTitle className="text-blue-800 text-sm">Loan Details</CardTitle>
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
                              <span>Estimated APR:</span>
                              <span className="font-semibold">{formatPercent(results.estimatedAPR)}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className={`${results.debtToIncomeRatio <= 36 ? 'bg-green-50 border-green-200' : results.debtToIncomeRatio <= 43 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'}`}>
                        <CardHeader>
                          <CardTitle className={`text-sm ${results.debtToIncomeRatio <= 36 ? 'text-green-800' : results.debtToIncomeRatio <= 43 ? 'text-yellow-800' : 'text-red-800'}`}>
                            Debt-to-Income Analysis
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>New DTI Ratio:</span>
                              <span className="font-semibold">{formatPercent(results.debtToIncomeRatio)}</span>
                            </div>
                            <div className={`text-xs mt-2 ${results.debtToIncomeRatio <= 36 ? 'text-green-700' : results.debtToIncomeRatio <= 43 ? 'text-yellow-700' : 'text-red-700'}`}>
                              {results.debtToIncomeRatio <= 36 ? 
                                "Excellent DTI ratio - lenders prefer under 36%" :
                                results.debtToIncomeRatio <= 43 ?
                                "Acceptable DTI ratio - some lenders may approve" :
                                "High DTI ratio - may be difficult to qualify"
                              }
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-purple-50 border-purple-200">
                        <CardHeader>
                          <CardTitle className="text-purple-800 text-sm">Qualification Likelihood</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-purple-700">
                            {results.qualificationLikelihood}
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="qualification" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">✅ Qualification Factors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📊 <strong>Credit Score:</strong> 650+ for best rates</div>
                      <div>💰 <strong>Income:</strong> Stable, verifiable income</div>
                      <div>📈 <strong>Debt-to-Income:</strong> Under 43% preferred</div>
                      <div>💼 <strong>Employment:</strong> 2+ years same job/field</div>
                      <div>🏦 <strong>Banking History:</strong> No recent overdrafts</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">📋 Required Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🆔 <strong>Identification:</strong> Driver's license or passport</div>
                      <div>💰 <strong>Income Proof:</strong> Pay stubs, tax returns</div>
                      <div>🏦 <strong>Bank Statements:</strong> 2-3 months recent</div>
                      <div>🏠 <strong>Address Proof:</strong> Utility bill or lease</div>
                      <div>📊 <strong>Credit Report:</strong> Lender will pull this</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">💡 Improve Approval Odds</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📈 <strong>Boost Credit Score:</strong> Pay down balances</div>
                      <div>💰 <strong>Increase Income:</strong> Side jobs, raises</div>
                      <div>📉 <strong>Reduce Debts:</strong> Pay off small balances</div>
                      <div>🏦 <strong>Shop Around:</strong> Compare multiple lenders</div>
                      <div>👥 <strong>Consider Co-signer:</strong> If credit is poor</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800 text-sm">🚫 Approval Killers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📉 <strong>Recent Bankruptcy:</strong> Wait 2-4 years</div>
                      <div>💸 <strong>High DTI Ratio:</strong> Over 50% is problematic</div>
                      <div>📊 <strong>Poor Credit:</strong> Under 600 very difficult</div>
                      <div>💼 <strong>Unstable Income:</strong> Job changes, gaps</div>
                      <div>🏦 <strong>Too Many Inquiries:</strong> Multiple recent applications</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="alternatives" className="space-y-4">
              {results && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-800 text-sm">🔓 Unsecured Loan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>APR:</span>
                          <span className="font-semibold">{formatPercent(results.estimatedAPR)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monthly Payment:</span>
                          <span className="font-semibold">{formatCurrency(results.monthlyPayment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Interest:</span>
                          <span className="font-semibold">{formatCurrency(results.totalInterest)}</span>
                        </div>
                        <div className="text-xs text-gray-600 mt-2">
                          No collateral required, faster approval
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-800 text-sm">🔒 Secured Loan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>APR:</span>
                          <span className="font-semibold">{formatPercent(results.alternativeOptions.securedLoanAPR)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Potential Savings:</span>
                          <span className="font-semibold text-green-600">{formatCurrency(results.alternativeOptions.securedSavings)}</span>
                        </div>
                        <div className="text-xs text-gray-600 mt-2">
                          Requires collateral but lower rates
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-red-50 border-red-200">
                    <CardHeader>
                      <CardTitle className="text-red-800 text-sm">💳 Credit Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>APR:</span>
                          <span className="font-semibold">{formatPercent(results.alternativeOptions.creditCardAPR)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Extra Cost:</span>
                          <span className="font-semibold text-red-600">{formatCurrency(results.alternativeOptions.creditCardCost)}</span>
                        </div>
                        <div className="text-xs text-gray-600 mt-2">
                          Higher rates but more flexible
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">💰 Lower Cost Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🏦 <strong>Credit Union Loans:</strong> Often 2-3% lower rates</div>
                      <div>🏠 <strong>Home Equity Loan:</strong> Tax-deductible, low rates</div>
                      <div>💳 <strong>0% Balance Transfer:</strong> Temporary but no interest</div>
                      <div>👥 <strong>Family/Friends:</strong> No interest, flexible terms</div>
                      <div>💼 <strong>401(k) Loan:</strong> Borrow from retirement</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-800 text-sm">⚠️ Higher Risk Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>⚡ <strong>Payday Loans:</strong> Extremely high APR (400%+)</div>
                      <div>🚗 <strong>Title Loans:</strong> Risk losing your vehicle</div>
                      <div>💰 <strong>Cash Advances:</strong> High fees and APR</div>
                      <div>🏪 <strong>Pawn Shops:</strong> High rates, lose items</div>
                      <div>💸 <strong>Predatory Lenders:</strong> Avoid at all costs</div>
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
