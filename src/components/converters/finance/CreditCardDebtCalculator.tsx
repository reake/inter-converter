'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DebtResults {
  monthlyPayment: number;
  payoffTime: number;
  totalInterest: number;
  totalPayment: number;
  paymentBreakdown: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export default function CreditCardDebtCalculator() {
  const [currentBalance, setCurrentBalance] = useState<string>('5000');
  const [interestRate, setInterestRate] = useState<string>('18.99');
  const [monthlyPayment, setMonthlyPayment] = useState<string>('200');
  const [paymentStrategy, setPaymentStrategy] = useState<string>('fixed');
  const [additionalCharges, setAdditionalCharges] = useState<string>('0');
  const [results, setResults] = useState<DebtResults | null>(null);

  const calculateDebt = useCallback(() => {
    const balance = parseFloat(currentBalance);
    const rate = parseFloat(interestRate) / 100 / 12;
    const payment = parseFloat(monthlyPayment);
    const charges = parseFloat(additionalCharges);
    
    if (balance <= 0 || rate < 0 || payment <= 0) return;

    let remainingBalance = balance;
    let totalInterest = 0;
    let month = 0;
    const paymentBreakdown = [];
    
    // Calculate minimum payment (typically 2-3% of balance)
    const minimumPayment = Math.max(25, balance * 0.025);
    
    while (remainingBalance > 0.01 && month < 600) { // Max 50 years to prevent infinite loop
      month++;
      
      // Add monthly charges
      remainingBalance += charges;
      
      // Calculate interest for this month
      const interestPayment = remainingBalance * rate;
      totalInterest += interestPayment;
      
      // Determine payment amount based on strategy
      let actualPayment = payment;
      if (paymentStrategy === 'minimum') {
        actualPayment = Math.max(minimumPayment, remainingBalance * 0.025);
      } else if (paymentStrategy === 'percent') {
        actualPayment = remainingBalance * 0.05; // 5% of balance
      }
      
      // Ensure payment doesn't exceed remaining balance + interest
      actualPayment = Math.min(actualPayment, remainingBalance + interestPayment);
      
      // Calculate principal payment
      const principalPayment = actualPayment - interestPayment;
      
      // Update balance
      remainingBalance = Math.max(0, remainingBalance - principalPayment);
      
      // Store breakdown for first 12 months
      if (month <= 12) {
        paymentBreakdown.push({
          month,
          payment: actualPayment,
          principal: principalPayment,
          interest: interestPayment,
          balance: remainingBalance
        });
      }
      
      // Break if payment is too small to make progress
      if (principalPayment <= 0 && remainingBalance > 0) {
        break;
      }
    }
    
    const totalPayment = balance + totalInterest;

    setResults({
      monthlyPayment: payment,
      payoffTime: month,
      totalInterest,
      totalPayment,
      paymentBreakdown
    });
  }, [currentBalance, interestRate, monthlyPayment, paymentStrategy, additionalCharges]);

  useEffect(() => {
    calculateDebt();
  }, [calculateDebt]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatMonths = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) return `${months} months`;
    if (remainingMonths === 0) return `${years} years`;
    return `${years} years, ${remainingMonths} months`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💳 Credit Card Debt Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="strategies">Payoff Strategies</TabsTrigger>
              <TabsTrigger value="tips">Debt Management</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentBalance">Current Balance</Label>
                    <Input
                      id="currentBalance"
                      type="number"
                      value={currentBalance}
                      onChange={(e) => setCurrentBalance(e.target.value)}
                      placeholder="Enter current balance"
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
                      Average credit card APR: 20-25%
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="monthlyPayment">Monthly Payment</Label>
                    <Input
                      id="monthlyPayment"
                      type="number"
                      value={monthlyPayment}
                      onChange={(e) => setMonthlyPayment(e.target.value)}
                      placeholder="Enter monthly payment"
                    />
                  </div>

                  <div>
                    <Label htmlFor="paymentStrategy">Payment Strategy</Label>
                    <Select value={paymentStrategy} onValueChange={setPaymentStrategy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment strategy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Fixed Payment</SelectItem>
                        <SelectItem value="minimum">Minimum Payment Only</SelectItem>
                        <SelectItem value="percent">Percentage of Balance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="additionalCharges">Monthly Charges</Label>
                    <Input
                      id="additionalCharges"
                      type="number"
                      value={additionalCharges}
                      onChange={(e) => setAdditionalCharges(e.target.value)}
                      placeholder="Enter additional monthly charges"
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      New purchases or fees added monthly
                    </div>
                  </div>

                  {results && (
                    <Card className="bg-red-50 border-red-200">
                      <CardHeader>
                        <CardTitle className="text-red-800 text-sm">Payoff Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Payoff Time:</span>
                            <span className="font-semibold">{formatMonths(results.payoffTime)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Interest:</span>
                            <span className="font-semibold text-red-600">{formatCurrency(results.totalInterest)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Payment:</span>
                            <span className="font-semibold">{formatCurrency(results.totalPayment)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Interest as % of Balance:</span>
                            <span className="font-semibold">{((results.totalInterest / parseFloat(currentBalance)) * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {results && results.paymentBreakdown.length > 0 && (
                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-blue-800 text-sm">First Year Breakdown</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1 text-xs max-h-32 overflow-y-auto">
                          {results.paymentBreakdown.map((month) => (
                            <div key={month.month} className="flex justify-between">
                              <span>Month {month.month}:</span>
                              <span>Balance: {formatCurrency(month.balance)}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="strategies" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">Debt Avalanche</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🎯 Pay minimums on all cards</div>
                      <div>💰 Put extra money toward highest APR</div>
                      <div>📊 Mathematically optimal</div>
                      <div>💵 Saves most money on interest</div>
                      <div>⏰ May take longer to see progress</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Debt Snowball</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🎯 Pay minimums on all cards</div>
                      <div>💰 Put extra money toward smallest balance</div>
                      <div>🎉 Quick psychological wins</div>
                      <div>📈 Builds momentum and motivation</div>
                      <div>💸 May cost more in interest</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Balance Transfer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🔄 Move debt to 0% APR card</div>
                      <div>⏰ Promotional period (12-21 months)</div>
                      <div>💰 Save on interest during promo</div>
                      <div>📋 Transfer fees (3-5%)</div>
                      <div>⚠️ Must pay off before promo ends</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-800 text-sm">Debt Consolidation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🏦 Personal loan to pay off cards</div>
                      <div>📉 Potentially lower interest rate</div>
                      <div>📅 Fixed payment schedule</div>
                      <div>🔒 Prevents additional charges</div>
                      <div>⚠️ Requires good credit for best rates</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tips" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">Accelerate Payoff</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>💰 Pay more than minimum</div>
                      <div>📅 Make bi-weekly payments</div>
                      <div>🎁 Use windfalls (tax refunds, bonuses)</div>
                      <div>💼 Pick up side income</div>
                      <div>🛒 Reduce unnecessary expenses</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Prevent New Debt</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>💳 Remove cards from wallet</div>
                      <div>🛒 Use cash or debit only</div>
                      <div>📱 Delete stored payment info</div>
                      <div>📋 Create and stick to budget</div>
                      <div>🚨 Build emergency fund</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Negotiate with Creditors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📞 Call to request lower APR</div>
                      <div>💰 Ask about hardship programs</div>
                      <div>📋 Request payment plan options</div>
                      <div>🏦 Consider debt management plan</div>
                      <div>⚖️ Seek credit counseling if needed</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800 text-sm">Warning Signs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>❌ Only making minimum payments</div>
                      <div>❌ Using cards for basic needs</div>
                      <div>❌ Cash advances for payments</div>
                      <div>❌ Maxed out credit limits</div>
                      <div>❌ Missing payments regularly</div>
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
