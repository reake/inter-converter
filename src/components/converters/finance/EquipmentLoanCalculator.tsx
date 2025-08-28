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
  taxBenefits: number;
}

export default function EquipmentLoanCalculator() {
  const [equipmentCost, setEquipmentCost] = useState<string>('100000');
  const [downPayment, setDownPayment] = useState<string>('20000');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [loanTerm, setLoanTerm] = useState<string>('7');
  const [equipmentType, setEquipmentType] = useState<string>('construction');
  const [businessType, setBusinessType] = useState<string>('llc');
  const [creditScore, setCreditScore] = useState<string>('750');
  const [results, setResults] = useState<LoanResults | null>(null);

  const calculateLoan = () => {
    const cost = parseFloat(equipmentCost);
    const down = parseFloat(downPayment);
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseFloat(loanTerm) * 12;
    
    const loanAmount = cost - down;
    
    if (loanAmount <= 0 || rate <= 0 || term <= 0) return;

    const monthlyPayment = (loanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - loanAmount;
    
    // Section 179 deduction potential (simplified)
    const section179Deduction = Math.min(cost, 1160000); // 2023 limit
    const taxBenefits = section179Deduction * 0.25; // Assuming 25% tax rate
    
    const currentDate = new Date();
    const payoffDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + term, 1);

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      payoffDate: payoffDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
      taxBenefits
    });
  };

  useEffect(() => {
    calculateLoan();
  }, [equipmentCost, downPayment, interestRate, loanTerm, equipmentType, businessType, creditScore]);

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
    let baseRate = 6.5;
    
    // Adjust for equipment type
    if (equipmentType === 'medical') baseRate -= 0.5;
    if (equipmentType === 'restaurant') baseRate += 0.5;
    if (equipmentType === 'technology') baseRate += 1;
    
    // Adjust for credit score
    if (score >= 750) return baseRate;
    if (score >= 700) return baseRate + 0.5;
    if (score >= 650) return baseRate + 1.5;
    return baseRate + 3;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏭 Equipment Loan Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="financing">Financing Options</TabsTrigger>
              <TabsTrigger value="benefits">Tax Benefits</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="equipmentCost">Equipment Cost</Label>
                    <Input
                      id="equipmentCost"
                      type="number"
                      value={equipmentCost}
                      onChange={(e) => setEquipmentCost(e.target.value)}
                      placeholder="Enter equipment cost"
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
                      {((parseFloat(downPayment) / parseFloat(equipmentCost)) * 100).toFixed(1)}% of equipment cost
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="equipmentType">Equipment Type</Label>
                    <Select value={equipmentType} onValueChange={setEquipmentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select equipment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="construction">Construction Equipment</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing Equipment</SelectItem>
                        <SelectItem value="medical">Medical Equipment</SelectItem>
                        <SelectItem value="restaurant">Restaurant Equipment</SelectItem>
                        <SelectItem value="technology">Technology/IT Equipment</SelectItem>
                        <SelectItem value="transportation">Transportation Equipment</SelectItem>
                        <SelectItem value="agricultural">Agricultural Equipment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select value={businessType} onValueChange={setBusinessType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="llc">LLC</SelectItem>
                        <SelectItem value="corporation">Corporation</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
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
                        <SelectItem value="3">3 years</SelectItem>
                        <SelectItem value="5">5 years</SelectItem>
                        <SelectItem value="7">7 years</SelectItem>
                        <SelectItem value="10">10 years</SelectItem>
                        <SelectItem value="12">12 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="creditScore">Business Credit Score</Label>
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
                            <span className="font-semibold">{formatCurrency(parseFloat(equipmentCost) - parseFloat(downPayment))}</span>
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
                            <span>Potential Tax Savings:</span>
                            <span className="font-semibold text-green-600">{formatCurrency(results.taxBenefits)}</span>
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
                    <CardTitle className="text-green-800 text-sm">Equipment Financing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✓ Equipment serves as collateral</div>
                      <div>✓ 100% financing available</div>
                      <div>✓ Competitive interest rates</div>
                      <div>✓ Preserve working capital</div>
                      <div>✓ Fixed monthly payments</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Equipment Leasing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✓ Lower monthly payments</div>
                      <div>✓ Tax advantages</div>
                      <div>✓ Upgrade flexibility</div>
                      <div>✓ Maintenance packages available</div>
                      <div>⚠ No ownership equity</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">SBA Loans</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✓ Government backing</div>
                      <div>✓ Lower down payments</div>
                      <div>✓ Longer repayment terms</div>
                      <div>✓ Competitive rates</div>
                      <div>⚠ Longer approval process</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-800 text-sm">Bank Term Loans</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✓ Relationship banking benefits</div>
                      <div>✓ Flexible terms</div>
                      <div>✓ Multiple use of funds</div>
                      <div>⚠ Higher down payment required</div>
                      <div>⚠ Stricter qualification criteria</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="benefits" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">Section 179 Deduction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>💰 Deduct full purchase price in year 1</div>
                      <div>📊 2023 limit: $1,160,000</div>
                      <div>🏭 Applies to most business equipment</div>
                      <div>📋 Must be used 50%+ for business</div>
                      <div>⚠ Consult tax professional</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Bonus Depreciation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📈 Additional first-year deduction</div>
                      <div>🗓️ 2023: 80% bonus depreciation</div>
                      <div>🔄 Phases down through 2026</div>
                      <div>🏭 Applies to new equipment</div>
                      <div>💡 Can combine with Section 179</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Cash Flow Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>💰 Preserve working capital</div>
                      <div>📊 Predictable monthly payments</div>
                      <div>🏦 Build business credit history</div>
                      <div>📈 Potential equipment appreciation</div>
                      <div>🔧 Immediate productivity gains</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800 text-sm">Important Considerations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📋 Equipment must be business-use</div>
                      <div>💼 Business income limitations apply</div>
                      <div>📊 Depreciation recapture on sale</div>
                      <div>🏦 Interest may be deductible</div>
                      <div>⚖️ Always consult tax advisor</div>
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
