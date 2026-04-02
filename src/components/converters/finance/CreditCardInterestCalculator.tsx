'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface InterestResults {
  dailyInterest: number;
  monthlyInterest: number;
  annualInterest: number;
  effectiveAPR: number;
  compoundingEffect: number;
  paymentBreakdown: {
    minimumPayment: number;
    interestPortion: number;
    principalPortion: number;
  };
}

export default function CreditCardInterestCalculator() {
  const [balance, setBalance] = useState<string>('5000');
  const [apr, setApr] = useState<string>('24.99');
  const [paymentAmount, setPaymentAmount] = useState<string>('150');
  const [paymentType, setPaymentType] = useState<string>('fixed');
  const [results, setResults] = useState<InterestResults | null>(null);

  const calculateInterest = useCallback(() => {
    const bal = parseFloat(balance);
    const annualRate = parseFloat(apr) / 100;
    const payment = parseFloat(paymentAmount);

    if (bal <= 0 || annualRate < 0) return;

    // Daily interest rate
    const dailyRate = annualRate / 365;
    const monthlyRate = annualRate / 12;

    // Interest calculations
    const dailyInterest = bal * dailyRate;
    const monthlyInterest = bal * monthlyRate;
    const annualInterest = bal * annualRate;

    // Effective APR (accounting for compounding)
    const effectiveAPR = Math.pow(1 + dailyRate, 365) - 1;

    // Compounding effect over a month
    let compoundBalance = bal;
    for (let day = 1; day <= 30; day++) {
      compoundBalance += compoundBalance * dailyRate;
    }
    const compoundingEffect = compoundBalance - bal - (dailyInterest * 30);

    // Payment breakdown
    const minimumPayment = Math.max(25, bal * 0.02); // Typical 2% minimum
    const actualPayment = paymentType === 'minimum' ? minimumPayment : payment;
    const interestPortion = monthlyInterest;
    const principalPortion = Math.max(0, actualPayment - interestPortion);

    setResults({
      dailyInterest,
      monthlyInterest,
      annualInterest,
      effectiveAPR,
      compoundingEffect,
      paymentBreakdown: {
        minimumPayment,
        interestPortion,
        principalPortion
      }
    });
  }, [balance, apr, paymentAmount, paymentType]);

  useEffect(() => {
    calculateInterest();
  }, [calculateInterest]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercent = (rate: number) => {
    return (rate * 100).toFixed(2) + '%';
  };

  const getInterestColor = (apr: number) => {
    if (apr < 15) return 'text-green-600';
    if (apr < 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💳 Credit Card Interest Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="breakdown">Interest Breakdown</TabsTrigger>
              <TabsTrigger value="tips">Reduction Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="balance">Credit Card Balance</Label>
                    <Input
                      id="balance"
                      type="number"
                      value={balance}
                      onChange={(e) => setBalance(e.target.value)}
                      placeholder="Enter current balance"
                    />
                  </div>

                  <div>
                    <Label htmlFor="apr">Annual Percentage Rate (APR) %</Label>
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
                    <Label htmlFor="paymentType">Payment Strategy</Label>
                    <Select value={paymentType} onValueChange={setPaymentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minimum">Minimum Payment Only</SelectItem>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {paymentType === 'fixed' && (
                    <div>
                      <Label htmlFor="paymentAmount">Monthly Payment Amount</Label>
                      <Input
                        id="paymentAmount"
                        type="number"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        placeholder="Enter payment amount"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <Card className="bg-red-50 border-red-200">
                    <CardHeader>
                      <CardTitle className="text-red-800 text-lg">Interest Rate Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Your APR:</span>
                          <span className={`font-semibold ${getInterestColor(parseFloat(apr))}`}>
                            {apr}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average Credit Card APR:</span>
                          <span className="font-semibold">21.47%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Good Credit APR:</span>
                          <span className="font-semibold text-green-600">15-18%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Excellent Credit APR:</span>
                          <span className="font-semibold text-green-600">13-16%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {results && (
                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-blue-800 text-lg">Daily Cost</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {formatCurrency(results.dailyInterest)}
                          </div>
                          <div className="text-sm text-blue-600">Interest charged per day</div>
                          <div className="text-xs text-gray-600 mt-1">
                            That&apos;s {formatCurrency(results.dailyInterest * 7)} per week
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {results && (
                <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-800">Interest Cost Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {formatCurrency(results.dailyInterest)}
                        </div>
                        <div className="text-sm text-red-600">Daily Interest</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {formatCurrency(results.monthlyInterest)}
                        </div>
                        <div className="text-sm text-orange-600">Monthly Interest</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {formatCurrency(results.annualInterest)}
                        </div>
                        <div className="text-sm text-purple-600">Annual Interest</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatPercent(results.effectiveAPR)}
                        </div>
                        <div className="text-sm text-blue-600">Effective APR</div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span>Balance:</span>
                          <span className="font-semibold">{formatCurrency(parseFloat(balance))}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Stated APR:</span>
                          <span className="font-semibold">{apr}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Compounding Effect:</span>
                          <span className="font-semibold text-red-600">{formatCurrency(results.compoundingEffect)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Interest as % of Balance:</span>
                          <span className="font-semibold text-red-600">
                            {((results.annualInterest / parseFloat(balance)) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="breakdown" className="space-y-4">
              {results && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Breakdown Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Monthly Payment Allocation</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between p-2 bg-red-50 rounded">
                              <span>Interest Portion:</span>
                              <span className="font-semibold text-red-600">
                                {formatCurrency(results.paymentBreakdown.interestPortion)}
                              </span>
                            </div>
                            <div className="flex justify-between p-2 bg-green-50 rounded">
                              <span>Principal Portion:</span>
                              <span className="font-semibold text-green-600">
                                {formatCurrency(results.paymentBreakdown.principalPortion)}
                              </span>
                            </div>
                            <div className="flex justify-between p-2 bg-blue-50 rounded font-semibold">
                              <span>Total Payment:</span>
                              <span>
                                {formatCurrency(results.paymentBreakdown.interestPortion + results.paymentBreakdown.principalPortion)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Interest Rate Breakdown</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Annual Rate:</span>
                              <span>{apr}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Monthly Rate:</span>
                              <span>{(parseFloat(apr) / 12).toFixed(3)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Daily Rate:</span>
                              <span>{(parseFloat(apr) / 365).toFixed(4)}%</span>
                            </div>
                            <div className="flex justify-between border-t pt-2">
                              <span>Effective APR:</span>
                              <span className="font-semibold">{formatPercent(results.effectiveAPR)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-red-200 bg-red-50">
                      <CardHeader>
                        <CardTitle className="text-red-800 text-sm">Minimum Payment Impact</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-lg font-bold text-red-600 mb-1">
                            {formatCurrency(results.paymentBreakdown.minimumPayment)}
                          </div>
                          <div className="text-xs text-red-600">
                            Minimum Required
                          </div>
                          <div className="text-xs text-gray-600 mt-2">
                            Paying minimum only extends debt significantly
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-yellow-200 bg-yellow-50">
                      <CardHeader>
                        <CardTitle className="text-yellow-800 text-sm">Interest Efficiency</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-lg font-bold text-yellow-600 mb-1">
                            {((results.paymentBreakdown.principalPortion / (results.paymentBreakdown.interestPortion + results.paymentBreakdown.principalPortion)) * 100).toFixed(0)}%
                          </div>
                          <div className="text-xs text-yellow-600">
                            Goes to Principal
                          </div>
                          <div className="text-xs text-gray-600 mt-2">
                            Higher is better for debt reduction
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200 bg-blue-50">
                      <CardHeader>
                        <CardTitle className="text-blue-800 text-sm">Daily Interest Cost</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600 mb-1">
                            {formatCurrency(results.dailyInterest)}
                          </div>
                          <div className="text-xs text-blue-600">
                            Per Day
                          </div>
                          <div className="text-xs text-gray-600 mt-2">
                            Interest accrues daily on your balance
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Interest Accumulation Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="text-center p-3 bg-gray-50 rounded">
                          <div className="font-semibold text-gray-800">1 Day</div>
                          <div className="text-gray-600">{formatCurrency(results.dailyInterest)}</div>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 rounded">
                          <div className="font-semibold text-yellow-800">1 Week</div>
                          <div className="text-yellow-600">{formatCurrency(results.dailyInterest * 7)}</div>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded">
                          <div className="font-semibold text-orange-800">1 Month</div>
                          <div className="text-orange-600">{formatCurrency(results.monthlyInterest)}</div>
                        </div>
                        <div className="text-center p-3 bg-red-50 rounded">
                          <div className="font-semibold text-red-800">1 Year</div>
                          <div className="text-red-600">{formatCurrency(results.annualInterest)}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="tips" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800">Reduce Interest Costs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Pay more than the minimum payment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Make payments twice per month</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Pay before the due date</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Apply windfalls to principal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Stop using the card for new purchases</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800">Lower Your Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Call and negotiate with your card company</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Transfer to a 0% APR balance transfer card</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Improve your credit score</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Consider a personal loan at lower rate</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Shop for cards with better rates</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Strategies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl mb-2">💰</div>
                      <div className="font-semibold text-green-800">Avalanche Method</div>
                      <div className="text-sm text-green-600 mt-1">
                        Pay minimums on all cards, extra on highest APR card
                      </div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl mb-2">⚡</div>
                      <div className="font-semibold text-blue-800">Snowball Method</div>
                      <div className="text-sm text-blue-600 mt-1">
                        Pay minimums on all cards, extra on smallest balance
                      </div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl mb-2">🔄</div>
                      <div className="font-semibold text-purple-800">Balance Transfer</div>
                      <div className="text-sm text-purple-600 mt-1">
                        Move balance to 0% APR card for 12-21 months
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {results && (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Potential Savings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="font-semibold text-green-800 mb-2">If you pay an extra $50/month:</div>
                        <div className="text-sm text-green-600">
                          <div>• Save approximately {formatCurrency(results.monthlyInterest * 0.3)} in monthly interest</div>
                          <div>• Pay off debt faster</div>
                          <div>• Build better credit habits</div>
                        </div>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="font-semibold text-blue-800 mb-2">If you get a 0% balance transfer:</div>
                        <div className="text-sm text-blue-600">
                          <div>• Save {formatCurrency(results.monthlyInterest)} per month</div>
                          <div>• All payments go to principal</div>
                          <div>• Typical 12-18 month promotional period</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
