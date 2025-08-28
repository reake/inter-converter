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

export default function BoatLoanCalculator() {
  const [boatPrice, setBoatPrice] = useState<string>('75000');
  const [downPayment, setDownPayment] = useState<string>('15000');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [loanTerm, setLoanTerm] = useState<string>('15');
  const [boatType, setBoatType] = useState<string>('powerboat');
  const [boatAge, setBoatAge] = useState<string>('new');
  const [creditScore, setCreditScore] = useState<string>('750');
  const [results, setResults] = useState<LoanResults | null>(null);

  const calculateLoan = () => {
    const price = parseFloat(boatPrice);
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
  }, [boatPrice, downPayment, interestRate, loanTerm, boatType, boatAge, creditScore]);

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
    
    // Adjust for boat age
    if (boatAge === 'used') baseRate += 0.5;
    if (boatAge === 'older') baseRate += 1.5;
    
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
            ⛵ Boat Loan Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="financing">Financing Options</TabsTrigger>
              <TabsTrigger value="tips">Buying Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="boatPrice">Boat Price</Label>
                    <Input
                      id="boatPrice"
                      type="number"
                      value={boatPrice}
                      onChange={(e) => setBoatPrice(e.target.value)}
                      placeholder="Enter boat price"
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
                      {((parseFloat(downPayment) / parseFloat(boatPrice)) * 100).toFixed(1)}% of boat price
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="boatType">Boat Type</Label>
                    <Select value={boatType} onValueChange={setBoatType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select boat type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="powerboat">Powerboat</SelectItem>
                        <SelectItem value="sailboat">Sailboat</SelectItem>
                        <SelectItem value="yacht">Yacht</SelectItem>
                        <SelectItem value="fishing">Fishing Boat</SelectItem>
                        <SelectItem value="pontoon">Pontoon</SelectItem>
                        <SelectItem value="jetski">Jet Ski</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="boatAge">Boat Age</Label>
                    <Select value={boatAge} onValueChange={setBoatAge}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select boat age" />
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
                        <SelectItem value="5">5 years</SelectItem>
                        <SelectItem value="7">7 years</SelectItem>
                        <SelectItem value="10">10 years</SelectItem>
                        <SelectItem value="12">12 years</SelectItem>
                        <SelectItem value="15">15 years</SelectItem>
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
                            <span className="font-semibold">{formatCurrency(parseFloat(boatPrice) - parseFloat(downPayment))}</span>
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
                    <CardTitle className="text-green-800 text-sm">Marine Lenders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✓ Specialized in boat financing</div>
                      <div>✓ Competitive rates</div>
                      <div>✓ Longer loan terms available</div>
                      <div>✓ Understand boat values</div>
                      <div>⚠ May require marine survey</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Banks & Credit Unions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✓ Existing relationship benefits</div>
                      <div>✓ Potentially lower rates</div>
                      <div>✓ Faster approval process</div>
                      <div>⚠ Limited boat expertise</div>
                      <div>⚠ Shorter loan terms</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Dealer Financing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✓ Convenient one-stop shopping</div>
                      <div>✓ Special manufacturer incentives</div>
                      <div>✓ Quick approval</div>
                      <div>⚠ May not be best rate</div>
                      <div>⚠ Limited negotiation power</div>
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
                      <div>✓ Fast funding</div>
                      <div>✓ Flexible use of funds</div>
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
                    <CardTitle className="text-green-800 text-sm">Pre-Purchase Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🔍 Get pre-approved for financing</div>
                      <div>📋 Research boat values (NADA, BUC)</div>
                      <div>🔧 Schedule marine survey</div>
                      <div>📄 Check boat history report</div>
                      <div>🏦 Compare multiple lenders</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Cost Considerations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>⛽ Fuel costs (varies by engine type)</div>
                      <div>🏠 Docking/storage fees</div>
                      <div>🛡️ Insurance premiums</div>
                      <div>🔧 Maintenance and repairs</div>
                      <div>📋 Registration and taxes</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Negotiation Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>💰 Negotiate boat price first</div>
                      <div>🏦 Shop financing separately</div>
                      <div>📊 Know market values</div>
                      <div>🔍 Point out needed repairs</div>
                      <div>📅 Consider end-of-season timing</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800 text-sm">Red Flags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>❌ No marine survey allowed</div>
                      <div>❌ Unusually low asking price</div>
                      <div>❌ Missing documentation</div>
                      <div>❌ Signs of water damage</div>
                      <div>❌ Pressure to buy immediately</div>
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
