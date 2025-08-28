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
  loanToValue: number;
}

export default function RVLoanCalculator() {
  const [rvPrice, setRvPrice] = useState<string>('125000');
  const [downPayment, setDownPayment] = useState<string>('25000');
  const [interestRate, setInterestRate] = useState<string>('5.5');
  const [loanTerm, setLoanTerm] = useState<string>('15');
  const [rvType, setRvType] = useState<string>('motorhome');
  const [rvAge, setRvAge] = useState<string>('new');
  const [creditScore, setCreditScore] = useState<string>('750');
  const [results, setResults] = useState<LoanResults | null>(null);

  const calculateLoan = () => {
    const price = parseFloat(rvPrice);
    const down = parseFloat(downPayment);
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseFloat(loanTerm) * 12;
    
    const loanAmount = price - down;
    
    if (loanAmount <= 0 || rate <= 0 || term <= 0) return;

    const monthlyPayment = (loanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - loanAmount;
    const loanToValue = (loanAmount / price) * 100;
    
    const currentDate = new Date();
    const payoffDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + term, 1);

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      payoffDate: payoffDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
      loanToValue
    });
  };

  useEffect(() => {
    calculateLoan();
  }, [rvPrice, downPayment, interestRate, loanTerm, rvType, rvAge, creditScore]);

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
    let baseRate = 5.5;
    
    // Adjust for RV age
    if (rvAge === 'used') baseRate += 0.5;
    if (rvAge === 'older') baseRate += 1.5;
    
    // Adjust for RV type
    if (rvType === 'travel-trailer') baseRate += 0.25;
    if (rvType === 'fifth-wheel') baseRate += 0.25;
    
    // Adjust for credit score
    if (score >= 750) return baseRate;
    if (score >= 700) return baseRate + 0.5;
    if (score >= 650) return baseRate + 1;
    return baseRate + 2;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🚐 RV Loan Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="financing">Financing Guide</TabsTrigger>
              <TabsTrigger value="tips">RV Buying Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="rvPrice">RV Price</Label>
                    <Input
                      id="rvPrice"
                      type="number"
                      value={rvPrice}
                      onChange={(e) => setRvPrice(e.target.value)}
                      placeholder="Enter RV price"
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
                    <div className="text-sm text-gray-500 mt-1">
                      {((parseFloat(downPayment) / parseFloat(rvPrice)) * 100).toFixed(1)}% of RV price
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="rvType">RV Type</Label>
                    <Select value={rvType} onValueChange={setRvType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select RV type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="motorhome">Class A Motorhome</SelectItem>
                        <SelectItem value="class-b">Class B Motorhome</SelectItem>
                        <SelectItem value="class-c">Class C Motorhome</SelectItem>
                        <SelectItem value="travel-trailer">Travel Trailer</SelectItem>
                        <SelectItem value="fifth-wheel">Fifth Wheel</SelectItem>
                        <SelectItem value="toy-hauler">Toy Hauler</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="rvAge">RV Age</Label>
                    <Select value={rvAge} onValueChange={setRvAge}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select RV age" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New (0-2 years)</SelectItem>
                        <SelectItem value="used">Used (3-10 years)</SelectItem>
                        <SelectItem value="older">Older (10+ years)</SelectItem>
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
                      Estimated rate: {getEstimatedRate().toFixed(2)}%
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="loanTerm">Loan Term (years)</Label>
                    <Select value={loanTerm} onValueChange={setLoanTerm}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 years</SelectItem>
                        <SelectItem value="12">12 years</SelectItem>
                        <SelectItem value="15">15 years</SelectItem>
                        <SelectItem value="18">18 years</SelectItem>
                        <SelectItem value="20">20 years</SelectItem>
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

                  {results && (
                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-blue-800 text-sm">Loan Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Loan Amount:</span>
                            <span className="font-semibold">{formatCurrency(parseFloat(rvPrice) - parseFloat(downPayment))}</span>
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
                            <span>Loan-to-Value:</span>
                            <span className="font-semibold">{results.loanToValue.toFixed(1)}%</span>
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

            <TabsContent value="financing" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">RV Specialists</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✓ Specialized RV financing</div>
                      <div>✓ Competitive rates</div>
                      <div>✓ Extended loan terms (up to 20 years)</div>
                      <div>✓ Understand RV values</div>
                      <div>✓ Flexible approval criteria</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Banks & Credit Unions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✓ Member/customer benefits</div>
                      <div>✓ Potentially lower rates</div>
                      <div>✓ Existing relationship advantages</div>
                      <div>⚠ Limited RV expertise</div>
                      <div>⚠ Stricter approval requirements</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Dealer Financing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✓ One-stop shopping convenience</div>
                      <div>✓ Manufacturer incentives</div>
                      <div>✓ Quick approval process</div>
                      <div>⚠ May not offer best rates</div>
                      <div>⚠ Limited lender options</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-800 text-sm">Loan Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📋 Minimum 10-20% down payment</div>
                      <div>📊 Credit score 650+ preferred</div>
                      <div>💰 Debt-to-income ratio &lt; 40%</div>
                      <div>📄 Proof of income/employment</div>
                      <div>🏠 Insurance requirements</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tips" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">Pre-Purchase Planning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🎯 Define your RV usage goals</div>
                      <div>📏 Consider size and weight limits</div>
                      <div>🚗 Ensure adequate tow vehicle</div>
                      <div>🏦 Get pre-approved for financing</div>
                      <div>📊 Research RV values (NADA, KBB)</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Inspection Checklist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🔧 Mechanical systems check</div>
                      <div>💧 Plumbing and water systems</div>
                      <div>⚡ Electrical systems test</div>
                      <div>🏠 Interior condition assessment</div>
                      <div>🔍 Exterior damage inspection</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Hidden Costs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🛡️ Insurance premiums</div>
                      <div>🏠 Storage/parking fees</div>
                      <div>🔧 Maintenance and repairs</div>
                      <div>⛽ Fuel costs (lower MPG)</div>
                      <div>📋 Registration and taxes</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800 text-sm">Avoid These Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>❌ Buying too large for first RV</div>
                      <div>❌ Ignoring weight limitations</div>
                      <div>❌ Skipping professional inspection</div>
                      <div>❌ Not budgeting for extras</div>
                      <div>❌ Rushing the purchase decision</div>
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
