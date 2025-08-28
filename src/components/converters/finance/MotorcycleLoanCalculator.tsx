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

export default function MotorcycleLoanCalculator() {
  const [bikePrice, setBikePrice] = useState<string>('15000');
  const [downPayment, setDownPayment] = useState<string>('3000');
  const [interestRate, setInterestRate] = useState<string>('7.5');
  const [loanTerm, setLoanTerm] = useState<string>('5');
  const [bikeType, setBikeType] = useState<string>('sport');
  const [bikeAge, setBikeAge] = useState<string>('new');
  const [creditScore, setCreditScore] = useState<string>('750');
  const [results, setResults] = useState<LoanResults | null>(null);

  const calculateLoan = () => {
    const price = parseFloat(bikePrice);
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
  }, [bikePrice, downPayment, interestRate, loanTerm, bikeType, bikeAge, creditScore]);

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
    let baseRate = 7.5;
    
    // Adjust for bike age
    if (bikeAge === 'used') baseRate += 1;
    if (bikeAge === 'older') baseRate += 2;
    
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
            🏍️ Motorcycle Loan Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="financing">Financing Options</TabsTrigger>
              <TabsTrigger value="tips">Buying Guide</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bikePrice">Motorcycle Price</Label>
                    <Input
                      id="bikePrice"
                      type="number"
                      value={bikePrice}
                      onChange={(e) => setBikePrice(e.target.value)}
                      placeholder="Enter motorcycle price"
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
                      {((parseFloat(downPayment) / parseFloat(bikePrice)) * 100).toFixed(1)}% of bike price
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bikeType">Motorcycle Type</Label>
                    <Select value={bikeType} onValueChange={setBikeType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bike type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sport">Sport Bike</SelectItem>
                        <SelectItem value="cruiser">Cruiser</SelectItem>
                        <SelectItem value="touring">Touring</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="adventure">Adventure</SelectItem>
                        <SelectItem value="dirt">Dirt Bike</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="bikeAge">Motorcycle Age</Label>
                    <Select value={bikeAge} onValueChange={setBikeAge}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bike age" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New (0-2 years)</SelectItem>
                        <SelectItem value="used">Used (3-7 years)</SelectItem>
                        <SelectItem value="older">Older (8+ years)</SelectItem>
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
                        <SelectItem value="2">2 years</SelectItem>
                        <SelectItem value="3">3 years</SelectItem>
                        <SelectItem value="4">4 years</SelectItem>
                        <SelectItem value="5">5 years</SelectItem>
                        <SelectItem value="6">6 years</SelectItem>
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
                            <span className="font-semibold">{formatCurrency(parseFloat(bikePrice) - parseFloat(downPayment))}</span>
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
                    <CardTitle className="text-green-800 text-sm">Motorcycle Dealers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✓ Manufacturer financing incentives</div>
                      <div>✓ Promotional rates (0% APR)</div>
                      <div>✓ Trade-in value application</div>
                      <div>✓ Quick approval process</div>
                      <div>⚠ May not offer best rates</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Banks & Credit Unions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✓ Competitive interest rates</div>
                      <div>✓ Member/customer discounts</div>
                      <div>✓ Flexible loan terms</div>
                      <div>✓ Pre-approval available</div>
                      <div>⚠ Stricter approval criteria</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Online Lenders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✓ Fast online application</div>
                      <div>✓ Competitive rates</div>
                      <div>✓ Quick funding</div>
                      <div>✓ Soft credit check options</div>
                      <div>⚠ Limited personal service</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-800 text-sm">Personal Loans</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✓ No collateral required</div>
                      <div>✓ Flexible use of funds</div>
                      <div>✓ Fast approval</div>
                      <div>⚠ Higher interest rates</div>
                      <div>⚠ Shorter repayment terms</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tips" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">Before You Buy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🏍️ Take a motorcycle safety course</div>
                      <div>📋 Get pre-approved for financing</div>
                      <div>🔍 Research bike values (KBB, NADA)</div>
                      <div>🛡️ Get insurance quotes</div>
                      <div>🔧 Budget for gear and maintenance</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Inspection Checklist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🔧 Engine condition and sounds</div>
                      <div>🛞 Tire wear and condition</div>
                      <div>🔋 Battery and electrical systems</div>
                      <div>🛠️ Brake system inspection</div>
                      <div>📋 Service history review</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Additional Costs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🪖 Safety gear ($500-$1,500)</div>
                      <div>🛡️ Insurance premiums</div>
                      <div>📋 Registration and taxes</div>
                      <div>🔧 Regular maintenance</div>
                      <div>🏠 Storage/parking costs</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800 text-sm">Red Flags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>❌ No test ride allowed</div>
                      <div>❌ Missing or altered VIN</div>
                      <div>❌ No maintenance records</div>
                      <div>❌ Signs of crash damage</div>
                      <div>❌ Unusually low asking price</div>
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
