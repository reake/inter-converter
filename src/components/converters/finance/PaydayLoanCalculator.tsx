'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PaydayResults {
  loanAmount: number;
  fee: number;
  totalRepayment: number;
  apr: number;
  costPer100: number;
  alternativeCosts: {
    creditCard: number;
    overdraft: number;
    personalLoan: number;
  };
}

export default function PaydayLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('300');
  const [feeAmount, setFeeAmount] = useState<string>('45');
  const [loanTerm, setLoanTerm] = useState<string>('14');
  const [feeType, setFeeType] = useState<string>('flat');
  const [rolloverCount, setRolloverCount] = useState<string>('0');
  const [results, setResults] = useState<PaydayResults | null>(null);

  const calculatePaydayLoan = () => {
    const principal = parseFloat(loanAmount);
    const fee = parseFloat(feeAmount);
    const termDays = parseFloat(loanTerm);
    const rollovers = parseInt(rolloverCount);
    
    if (principal <= 0 || fee < 0 || termDays <= 0) return;

    let totalFee = fee;
    let totalRepayment = principal + fee;
    
    // Calculate rollover costs
    if (rollovers > 0) {
      totalFee += fee * rollovers; // Each rollover typically costs the same fee
      totalRepayment = principal + totalFee;
    }
    
    // Calculate APR
    const feeRate = totalFee / principal;
    const termYears = (termDays + (rollovers * termDays)) / 365;
    const apr = (feeRate / termYears) * 100;
    
    // Cost per $100 borrowed
    const costPer100 = (totalFee / principal) * 100;
    
    // Alternative costs comparison (for same amount and term)
    const creditCardAPR = 25; // Average credit card APR
    const overdraftFee = 35; // Typical overdraft fee
    const personalLoanAPR = 15; // Average personal loan APR
    
    const creditCardCost = (principal * (creditCardAPR / 100) * (termDays / 365));
    const personalLoanCost = (principal * (personalLoanAPR / 100) * (termDays / 365));

    setResults({
      loanAmount: principal,
      fee: totalFee,
      totalRepayment,
      apr,
      costPer100,
      alternativeCosts: {
        creditCard: creditCardCost,
        overdraft: overdraftFee,
        personalLoan: personalLoanCost
      }
    });
  };

  useEffect(() => {
    calculatePaydayLoan();
  }, [loanAmount, feeAmount, loanTerm, feeType, rolloverCount]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercent = (rate: number) => {
    return rate.toFixed(0) + '%';
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ⚡ Payday Loan Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
              <TabsTrigger value="warnings">Warnings & Tips</TabsTrigger>
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
                      Typical range: $100 - $1,000
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="feeAmount">Fee Amount</Label>
                    <Input
                      id="feeAmount"
                      type="number"
                      step="0.01"
                      value={feeAmount}
                      onChange={(e) => setFeeAmount(e.target.value)}
                      placeholder="Enter fee amount"
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      Typical: $15-$30 per $100 borrowed
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="loanTerm">Loan Term (days)</Label>
                    <Select value={loanTerm} onValueChange={setLoanTerm}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days (most common)</SelectItem>
                        <SelectItem value="21">21 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="rolloverCount">Number of Rollovers</Label>
                    <Select value={rolloverCount} onValueChange={setRolloverCount}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rollovers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0 (Pay on time)</SelectItem>
                        <SelectItem value="1">1 rollover</SelectItem>
                        <SelectItem value="2">2 rollovers</SelectItem>
                        <SelectItem value="3">3 rollovers</SelectItem>
                        <SelectItem value="4">4+ rollovers</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="text-sm text-gray-500 mt-1">
                      Each rollover typically costs another fee
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {results && (
                    <Card className="bg-red-50 border-red-200">
                      <CardHeader>
                        <CardTitle className="text-red-800 text-sm">Loan Cost Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Loan Amount:</span>
                            <span className="font-semibold">{formatCurrency(results.loanAmount)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Fees:</span>
                            <span className="font-semibold text-red-600">{formatCurrency(results.fee)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Repayment:</span>
                            <span className="font-semibold">{formatCurrency(results.totalRepayment)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Cost per $100:</span>
                            <span className="font-semibold text-red-600">{formatCurrency(results.costPer100)}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span>Annual APR:</span>
                            <span className="font-semibold text-red-800 text-lg">{formatPercent(results.apr)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {results && (
                    <Card className="bg-orange-50 border-orange-200">
                      <CardHeader>
                        <CardTitle className="text-orange-800 text-sm">Cost Comparison</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Payday Loan:</span>
                            <span className="font-semibold text-red-600">{formatCurrency(results.fee)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Credit Card:</span>
                            <span className="font-semibold">{formatCurrency(results.alternativeCosts.creditCard)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Overdraft Fee:</span>
                            <span className="font-semibold">{formatCurrency(results.alternativeCosts.overdraft)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Personal Loan:</span>
                            <span className="font-semibold">{formatCurrency(results.alternativeCosts.personalLoan)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Card className="bg-yellow-50 border-yellow-200">
                    <CardHeader>
                      <CardTitle className="text-yellow-800 text-sm">⚠️ Important Warning</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-yellow-700">
                        Payday loans are extremely expensive and can trap borrowers in cycles of debt. 
                        The average borrower is in debt for 5 months per year and pays more in fees 
                        than the original loan amount.
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="alternatives" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">Better Alternatives</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>💳 <strong>Credit Card Cash Advance:</strong> High APR but lower than payday loans</div>
                      <div>🏦 <strong>Bank Overdraft:</strong> One-time fee, may be cheaper for small amounts</div>
                      <div>💰 <strong>Personal Loan:</strong> Much lower APR, longer terms</div>
                      <div>👥 <strong>Borrow from Friends/Family:</strong> No interest, flexible terms</div>
                      <div>💼 <strong>Paycheck Advance from Employer:</strong> Often free or low cost</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Emergency Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🏛️ <strong>Credit Union Loans:</strong> PAL (Payday Alternative Loans)</div>
                      <div>🤝 <strong>Community Programs:</strong> Local assistance programs</div>
                      <div>⛪ <strong>Religious Organizations:</strong> Emergency financial help</div>
                      <div>📱 <strong>Cash Advance Apps:</strong> Earnin, Dave, Brigit (small fees)</div>
                      <div>💼 <strong>Side Gig Work:</strong> Uber, DoorDash, TaskRabbit</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Long-term Solutions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🚨 <strong>Emergency Fund:</strong> Save $500-$1,000 for emergencies</div>
                      <div>📊 <strong>Budget Creation:</strong> Track income and expenses</div>
                      <div>💰 <strong>Increase Income:</strong> Second job, skills training</div>
                      <div>📉 <strong>Reduce Expenses:</strong> Cut unnecessary spending</div>
                      <div>🏦 <strong>Build Credit:</strong> Access to better loan options</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-800 text-sm">Credit Union PAL</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>💰 <strong>Amount:</strong> $200 - $1,000</div>
                      <div>📅 <strong>Term:</strong> 1-6 months</div>
                      <div>📊 <strong>APR:</strong> Maximum 28%</div>
                      <div>💵 <strong>Fee:</strong> Maximum $20 application fee</div>
                      <div>🏦 <strong>Requirement:</strong> Credit union membership</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="warnings" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800 text-sm">Debt Trap Cycle</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🔄 <strong>Rollover Trap:</strong> 80% of loans are rolled over</div>
                      <div>💸 <strong>Fee Accumulation:</strong> Fees often exceed loan amount</div>
                      <div>📈 <strong>Repeat Borrowing:</strong> Average borrower takes 8-10 loans/year</div>
                      <div>⏰ <strong>Short Terms:</strong> Difficult to repay in 2 weeks</div>
                      <div>🎯 <strong>Targeting:</strong> Often targets vulnerable communities</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-800 text-sm">Red Flags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🚫 <strong>No Credit Check:</strong> Doesn't verify ability to repay</div>
                      <div>⚡ <strong>Instant Approval:</strong> Too good to be true</div>
                      <div>🎯 <strong>Aggressive Marketing:</strong> "Fast cash" promises</div>
                      <div>📍 <strong>Location Targeting:</strong> Near low-income areas</div>
                      <div>💻 <strong>Online Predators:</strong> Unlicensed online lenders</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Legal Protections</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🏛️ <strong>State Regulations:</strong> Some states ban payday loans</div>
                      <div>📋 <strong>Disclosure Requirements:</strong> Must show APR and fees</div>
                      <div>🔄 <strong>Rollover Limits:</strong> Some states limit rollovers</div>
                      <div>⏰ <strong>Cooling-off Periods:</strong> Required breaks between loans</div>
                      <div>📞 <strong>CFPB Complaints:</strong> Report predatory practices</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">Getting Help</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📞 <strong>Credit Counseling:</strong> Non-profit debt counseling</div>
                      <div>⚖️ <strong>Legal Aid:</strong> Free legal assistance</div>
                      <div>🏛️ <strong>State Regulators:</strong> File complaints</div>
                      <div>💰 <strong>Financial Assistance:</strong> Government programs</div>
                      <div>📚 <strong>Financial Education:</strong> Budgeting and money management</div>
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
