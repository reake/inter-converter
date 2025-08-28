'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PaymentResults {
  minimumPayment: number;
  interestPortion: number;
  principalPortion: number;
  payoffTime: number;
  totalInterest: number;
  totalPayments: number;
  comparisonScenarios: {
    doubleMinimum: {
      payment: number;
      payoffTime: number;
      totalInterest: number;
      savings: number;
    };
    fixedPayment: {
      payment: number;
      payoffTime: number;
      totalInterest: number;
      savings: number;
    };
  };
}

export default function MinimumPaymentCalculator() {
  const [balance, setBalance] = useState<string>('5000');
  const [apr, setApr] = useState<string>('18.99');
  const [minimumType, setMinimumType] = useState<string>('percentage');
  const [minimumPercent, setMinimumPercent] = useState<string>('2');
  const [minimumFixed, setMinimumFixed] = useState<string>('25');
  const [fixedPaymentAmount, setFixedPaymentAmount] = useState<string>('200');
  const [results, setResults] = useState<PaymentResults | null>(null);

  const calculatePayments = () => {
    const bal = parseFloat(balance);
    const annualRate = parseFloat(apr) / 100;
    const monthlyRate = annualRate / 12;
    const minPercent = parseFloat(minimumPercent) / 100;
    const minFixed = parseFloat(minimumFixed);
    const fixedPayment = parseFloat(fixedPaymentAmount);
    
    if (bal <= 0 || annualRate < 0) return;

    // Calculate minimum payment
    let minimumPayment = 0;
    if (minimumType === 'percentage') {
      minimumPayment = Math.max(bal * minPercent, minFixed || 25);
    } else {
      minimumPayment = minFixed;
    }

    // Calculate interest and principal portions
    const interestPortion = bal * monthlyRate;
    const principalPortion = Math.max(minimumPayment - interestPortion, 0);

    // Calculate payoff time with minimum payments
    let payoffTime = 0;
    let totalInterest = 0;
    let currentBalance = bal;
    let monthlyPayment = minimumPayment;

    // Simulate minimum payment scenario
    while (currentBalance > 0.01 && payoffTime < 600) { // Max 50 years
      const interestCharge = currentBalance * monthlyRate;
      
      // Recalculate minimum payment if percentage-based
      if (minimumType === 'percentage') {
        monthlyPayment = Math.max(currentBalance * minPercent, minFixed || 25);
      }
      
      const principalPayment = Math.min(monthlyPayment - interestCharge, currentBalance);
      
      if (principalPayment <= 0) {
        payoffTime = 600; // Never pays off
        break;
      }
      
      totalInterest += interestCharge;
      currentBalance -= principalPayment;
      payoffTime++;
    }

    const totalPayments = bal + totalInterest;

    // Calculate double minimum scenario
    let doubleBalance = bal;
    let doubleTime = 0;
    let doubleInterest = 0;
    const doublePayment = minimumPayment * 2;

    while (doubleBalance > 0.01 && doubleTime < 600) {
      const interestCharge = doubleBalance * monthlyRate;
      const principalPayment = Math.min(doublePayment - interestCharge, doubleBalance);
      
      if (principalPayment <= 0) break;
      
      doubleInterest += interestCharge;
      doubleBalance -= principalPayment;
      doubleTime++;
    }

    // Calculate fixed payment scenario
    let fixedBalance = bal;
    let fixedTime = 0;
    let fixedInterest = 0;

    while (fixedBalance > 0.01 && fixedTime < 600) {
      const interestCharge = fixedBalance * monthlyRate;
      const principalPayment = Math.min(fixedPayment - interestCharge, fixedBalance);
      
      if (principalPayment <= 0) break;
      
      fixedInterest += interestCharge;
      fixedBalance -= principalPayment;
      fixedTime++;
    }

    setResults({
      minimumPayment,
      interestPortion,
      principalPortion,
      payoffTime,
      totalInterest,
      totalPayments,
      comparisonScenarios: {
        doubleMinimum: {
          payment: doublePayment,
          payoffTime: doubleTime,
          totalInterest: doubleInterest,
          savings: totalInterest - doubleInterest
        },
        fixedPayment: {
          payment: fixedPayment,
          payoffTime: fixedTime,
          totalInterest: fixedInterest,
          savings: totalInterest - fixedInterest
        }
      }
    });
  };

  useEffect(() => {
    calculatePayments();
  }, [balance, apr, minimumType, minimumPercent, minimumFixed, fixedPaymentAmount]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatMonths = (months: number) => {
    if (months >= 600) return 'Never pays off';
    const years = Math.floor(months / 12);
    const remainingMonths = Math.round(months % 12);
    
    if (years === 0) return `${Math.round(months)} months`;
    if (remainingMonths === 0) return `${years} years`;
    return `${years} years, ${remainingMonths} months`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💳 Minimum Payment Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="comparison">Payment Comparison</TabsTrigger>
              <TabsTrigger value="strategies">Payment Strategies</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="balance">Current Balance</Label>
                    <Input
                      id="balance"
                      type="number"
                      value={balance}
                      onChange={(e) => setBalance(e.target.value)}
                      placeholder="Enter current balance"
                    />
                  </div>

                  <div>
                    <Label htmlFor="apr">Annual Percentage Rate (APR)</Label>
                    <Input
                      id="apr"
                      type="number"
                      step="0.01"
                      value={apr}
                      onChange={(e) => setApr(e.target.value)}
                      placeholder="Enter APR"
                    />
                  </div>

                  <div>
                    <Label htmlFor="minimumType">Minimum Payment Method</Label>
                    <Select value={minimumType} onValueChange={setMinimumType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select minimum payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage of Balance</SelectItem>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {minimumType === 'percentage' && (
                    <>
                      <div>
                        <Label htmlFor="minimumPercent">Minimum Percentage</Label>
                        <Input
                          id="minimumPercent"
                          type="number"
                          step="0.1"
                          value={minimumPercent}
                          onChange={(e) => setMinimumPercent(e.target.value)}
                          placeholder="Enter minimum percentage"
                        />
                        <div className="text-sm text-gray-500 mt-1">
                          Typical range: 1-3% of balance
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="minimumFixed">Minimum Floor Amount</Label>
                        <Input
                          id="minimumFixed"
                          type="number"
                          value={minimumFixed}
                          onChange={(e) => setMinimumFixed(e.target.value)}
                          placeholder="Enter minimum floor amount"
                        />
                        <div className="text-sm text-gray-500 mt-1">
                          Minimum payment even if percentage is lower
                        </div>
                      </div>
                    </>
                  )}

                  {minimumType === 'fixed' && (
                    <div>
                      <Label htmlFor="minimumFixedAmount">Fixed Minimum Payment</Label>
                      <Input
                        id="minimumFixedAmount"
                        type="number"
                        value={minimumFixed}
                        onChange={(e) => setMinimumFixed(e.target.value)}
                        placeholder="Enter fixed minimum payment"
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="fixedPaymentAmount">Alternative Fixed Payment</Label>
                    <Input
                      id="fixedPaymentAmount"
                      type="number"
                      value={fixedPaymentAmount}
                      onChange={(e) => setFixedPaymentAmount(e.target.value)}
                      placeholder="Enter alternative payment amount"
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      For comparison scenarios
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {results && (
                    <>
                      <Card className="bg-red-50 border-red-200">
                        <CardHeader>
                          <CardTitle className="text-red-800 text-sm">Minimum Payment Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Minimum Payment:</span>
                              <span className="font-semibold">{formatCurrency(results.minimumPayment)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Interest Portion:</span>
                              <span className="font-semibold text-red-600">{formatCurrency(results.interestPortion)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Principal Portion:</span>
                              <span className="font-semibold text-green-600">{formatCurrency(results.principalPortion)}</span>
                            </div>
                            <div className="flex justify-between border-t pt-2">
                              <span>Payoff Time:</span>
                              <span className="font-semibold">{formatMonths(results.payoffTime)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Total Interest:</span>
                              <span className="font-semibold text-red-600">{formatCurrency(results.totalInterest)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Total Payments:</span>
                              <span className="font-semibold">{formatCurrency(results.totalPayments)}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-yellow-50 border-yellow-200">
                        <CardHeader>
                          <CardTitle className="text-yellow-800 text-sm">⚠️ Minimum Payment Warning</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-yellow-700">
                            {results.principalPortion < results.interestPortion ? (
                              "Your minimum payment barely covers interest! Most of your payment goes to interest, not reducing the balance."
                            ) : results.payoffTime > 120 ? (
                              "It will take over 10 years to pay off this debt with minimum payments. Consider paying more to save on interest."
                            ) : (
                              "While your minimum payment covers more than interest, you could save significantly by paying more."
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-4">
              {results && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-red-50 border-red-200">
                    <CardHeader>
                      <CardTitle className="text-red-800 text-sm">Minimum Payment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Payment:</span>
                          <span className="font-semibold">{formatCurrency(results.minimumPayment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Payoff Time:</span>
                          <span className="font-semibold">{formatMonths(results.payoffTime)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Interest:</span>
                          <span className="font-semibold">{formatCurrency(results.totalInterest)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-orange-50 border-orange-200">
                    <CardHeader>
                      <CardTitle className="text-orange-800 text-sm">Double Minimum</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Payment:</span>
                          <span className="font-semibold">{formatCurrency(results.comparisonScenarios.doubleMinimum.payment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Payoff Time:</span>
                          <span className="font-semibold">{formatMonths(results.comparisonScenarios.doubleMinimum.payoffTime)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Interest:</span>
                          <span className="font-semibold">{formatCurrency(results.comparisonScenarios.doubleMinimum.totalInterest)}</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                          <span>Savings:</span>
                          <span className="font-semibold">{formatCurrency(results.comparisonScenarios.doubleMinimum.savings)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-800 text-sm">Fixed Payment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Payment:</span>
                          <span className="font-semibold">{formatCurrency(results.comparisonScenarios.fixedPayment.payment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Payoff Time:</span>
                          <span className="font-semibold">{formatMonths(results.comparisonScenarios.fixedPayment.payoffTime)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Interest:</span>
                          <span className="font-semibold">{formatCurrency(results.comparisonScenarios.fixedPayment.totalInterest)}</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                          <span>Savings:</span>
                          <span className="font-semibold">{formatCurrency(results.comparisonScenarios.fixedPayment.savings)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="strategies" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">Smart Payment Strategies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>💰 <strong>Pay More Than Minimum:</strong> Even $25 extra saves thousands</div>
                      <div>🎯 <strong>Target High APR Cards:</strong> Pay minimums on others</div>
                      <div>📅 <strong>Make Bi-weekly Payments:</strong> 26 payments = 13 months</div>
                      <div>💸 <strong>Apply Windfalls:</strong> Tax refunds, bonuses to principal</div>
                      <div>🔄 <strong>Round Up Payments:</strong> Pay $200 instead of $187</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Debt Payoff Methods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🏔️ <strong>Debt Avalanche:</strong> Pay highest APR first</div>
                      <div>❄️ <strong>Debt Snowball:</strong> Pay smallest balance first</div>
                      <div>⚖️ <strong>Debt Consolidation:</strong> Combine at lower rate</div>
                      <div>💳 <strong>Balance Transfer:</strong> 0% promotional rates</div>
                      <div>🏠 <strong>Home Equity:</strong> Lower rates, tax benefits</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Why Minimums Hurt</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📈 <strong>Compound Interest:</strong> Works against you</div>
                      <div>⏰ <strong>Extended Timeline:</strong> Decades to pay off</div>
                      <div>💸 <strong>High Total Cost:</strong> Pay 2-3x original amount</div>
                      <div>📉 <strong>Slow Progress:</strong> Balance barely decreases</div>
                      <div>🎯 <strong>Opportunity Cost:</strong> Money tied up in debt</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-800 text-sm">Extra Payment Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🎯 <strong>Start Small:</strong> Even $10 extra helps</div>
                      <div>📊 <strong>Track Progress:</strong> Watch balance decrease</div>
                      <div>🏆 <strong>Celebrate Milestones:</strong> Stay motivated</div>
                      <div>💰 <strong>Use Savings:</strong> Emergency fund after debt</div>
                      <div>📱 <strong>Automate Payments:</strong> Set it and forget it</div>
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
