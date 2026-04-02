'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TransferResults {
  transferFee: number;
  monthlyPaymentCurrent: number;
  monthlyPaymentNew: number;
  totalInterestCurrent: number;
  totalInterestNew: number;
  totalSavings: number;
  payoffTimeCurrent: number;
  payoffTimeNew: number;
  breakEvenMonths: number;
  worthTransferring: boolean;
}

export default function BalanceTransferCalculator() {
  const [currentBalance, setCurrentBalance] = useState<string>('8000');
  const [currentAPR, setCurrentAPR] = useState<string>('24.99');
  const [newAPR, setNewAPR] = useState<string>('0');
  const [promoLength, setPromoLength] = useState<string>('18');
  const [regularAPR, setRegularAPR] = useState<string>('18.99');
  const [transferFeePercent, setTransferFeePercent] = useState<string>('3');
  const [monthlyPayment, setMonthlyPayment] = useState<string>('200');
  const [results, setResults] = useState<TransferResults | null>(null);

  const calculateTransfer = useCallback(() => {
    const balance = parseFloat(currentBalance);
    const currentRate = parseFloat(currentAPR) / 100 / 12;
    const newRate = parseFloat(newAPR) / 100 / 12;
    const promoMonths = parseInt(promoLength);
    const regularRate = parseFloat(regularAPR) / 100 / 12;
    const feePercent = parseFloat(transferFeePercent) / 100;
    const payment = parseFloat(monthlyPayment);

    if (balance <= 0 || payment <= 0) return;

    const transferFee = balance * feePercent;
    const newBalance = balance + transferFee;

    // Calculate current scenario
    let currentBalanceRemaining = balance;
    let currentTotalInterest = 0;
    let currentMonths = 0;
    
    while (currentBalanceRemaining > 0 && currentMonths < 600) {
      const interestCharge = currentBalanceRemaining * currentRate;
      const principalPayment = Math.min(payment - interestCharge, currentBalanceRemaining);
      
      if (principalPayment <= 0) break; // Payment too small
      
      currentTotalInterest += interestCharge;
      currentBalanceRemaining -= principalPayment;
      currentMonths++;
    }

    // Calculate new scenario with promo rate then regular rate
    let newBalanceRemaining = newBalance;
    let newTotalInterest = 0;
    let newMonths = 0;
    
    // Promo period
    for (let month = 1; month <= promoMonths && newBalanceRemaining > 0; month++) {
      const interestCharge = newBalanceRemaining * newRate;
      const principalPayment = Math.min(payment - interestCharge, newBalanceRemaining);
      
      if (principalPayment <= 0) break;
      
      newTotalInterest += interestCharge;
      newBalanceRemaining -= principalPayment;
      newMonths++;
    }
    
    // Regular rate period
    while (newBalanceRemaining > 0 && newMonths < 600) {
      const interestCharge = newBalanceRemaining * regularRate;
      const principalPayment = Math.min(payment - interestCharge, newBalanceRemaining);
      
      if (principalPayment <= 0) break;
      
      newTotalInterest += interestCharge;
      newBalanceRemaining -= principalPayment;
      newMonths++;
    }

    const totalSavings = (currentTotalInterest - newTotalInterest) - transferFee;
    const breakEvenMonths = transferFee / Math.max(1, (currentBalanceRemaining * currentRate) - (newBalance * newRate));
    const worthTransferring = totalSavings > 0 && breakEvenMonths < promoMonths;

    setResults({
      transferFee,
      monthlyPaymentCurrent: payment,
      monthlyPaymentNew: payment,
      totalInterestCurrent: currentTotalInterest,
      totalInterestNew: newTotalInterest,
      totalSavings,
      payoffTimeCurrent: currentMonths,
      payoffTimeNew: newMonths,
      breakEvenMonths,
      worthTransferring
    });
  }, [currentBalance, currentAPR, newAPR, promoLength, regularAPR, transferFeePercent, monthlyPayment]);

  useEffect(() => {
    calculateTransfer();
  }, [calculateTransfer]);

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
    const remainingMonths = Math.round(months % 12);
    if (years === 0) return `${remainingMonths} months`;
    if (remainingMonths === 0) return `${years} years`;
    return `${years}y ${remainingMonths}m`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔄 Balance Transfer Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
              <TabsTrigger value="guide">Transfer Guide</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="text-red-800">Current Card</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                      <Label htmlFor="currentAPR">Current APR (%)</Label>
                      <Input
                        id="currentAPR"
                        type="number"
                        step="0.01"
                        value={currentAPR}
                        onChange={(e) => setCurrentAPR(e.target.value)}
                        placeholder="Enter current APR"
                      />
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
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-green-800">New Balance Transfer Card</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="newAPR">Promotional APR (%)</Label>
                      <Input
                        id="newAPR"
                        type="number"
                        step="0.01"
                        value={newAPR}
                        onChange={(e) => setNewAPR(e.target.value)}
                        placeholder="Enter promo APR"
                      />
                    </div>

                    <div>
                      <Label htmlFor="promoLength">Promotional Period (months)</Label>
                      <Input
                        id="promoLength"
                        type="number"
                        value={promoLength}
                        onChange={(e) => setPromoLength(e.target.value)}
                        placeholder="Enter promo length"
                      />
                    </div>

                    <div>
                      <Label htmlFor="regularAPR">Regular APR After Promo (%)</Label>
                      <Input
                        id="regularAPR"
                        type="number"
                        step="0.01"
                        value={regularAPR}
                        onChange={(e) => setRegularAPR(e.target.value)}
                        placeholder="Enter regular APR"
                      />
                    </div>

                    <div>
                      <Label htmlFor="transferFeePercent">Transfer Fee (%)</Label>
                      <Input
                        id="transferFeePercent"
                        type="number"
                        step="0.1"
                        value={transferFeePercent}
                        onChange={(e) => setTransferFeePercent(e.target.value)}
                        placeholder="Enter transfer fee %"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {results && (
                <Card className={`${results.worthTransferring ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                  <CardHeader>
                    <CardTitle className={results.worthTransferring ? 'text-green-800' : 'text-yellow-800'}>
                      Balance Transfer Analysis
                      {results.worthTransferring ? ' ✅ Recommended' : ' ⚠️ Consider Carefully'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(results.totalSavings)}
                        </div>
                        <div className="text-sm text-green-600">Total Savings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(results.transferFee)}
                        </div>
                        <div className="text-sm text-blue-600">Transfer Fee</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {formatMonths(results.breakEvenMonths)}
                        </div>
                        <div className="text-sm text-purple-600">Break-Even Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {formatMonths(results.payoffTimeNew - results.payoffTimeCurrent)}
                        </div>
                        <div className="text-sm text-orange-600">Time Difference</div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span>Current Total Interest:</span>
                          <span className="font-semibold text-red-600">{formatCurrency(results.totalInterestCurrent)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>New Total Interest:</span>
                          <span className="font-semibold text-green-600">{formatCurrency(results.totalInterestNew)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Current Payoff Time:</span>
                          <span className="font-semibold">{formatMonths(results.payoffTimeCurrent)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>New Payoff Time:</span>
                          <span className="font-semibold">{formatMonths(results.payoffTimeNew)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="comparison" className="space-y-4">
              {results && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Side-by-Side Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Scenario</th>
                              <th className="text-right p-2">Total Interest</th>
                              <th className="text-right p-2">Payoff Time</th>
                              <th className="text-right p-2">Total Cost</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b bg-red-50">
                              <td className="p-2 font-semibold text-red-800">Current Card</td>
                              <td className="p-2 text-right text-red-600">{formatCurrency(results.totalInterestCurrent)}</td>
                              <td className="p-2 text-right">{formatMonths(results.payoffTimeCurrent)}</td>
                              <td className="p-2 text-right text-red-600">{formatCurrency(parseFloat(currentBalance) + results.totalInterestCurrent)}</td>
                            </tr>
                            <tr className="border-b bg-green-50">
                              <td className="p-2 font-semibold text-green-800">Balance Transfer</td>
                              <td className="p-2 text-right text-green-600">{formatCurrency(results.totalInterestNew + results.transferFee)}</td>
                              <td className="p-2 text-right">{formatMonths(results.payoffTimeNew)}</td>
                              <td className="p-2 text-right text-green-600">{formatCurrency(parseFloat(currentBalance) + results.totalInterestNew + results.transferFee)}</td>
                            </tr>
                            <tr className="border-b bg-blue-50 font-semibold">
                              <td className="p-2 text-blue-800">Difference</td>
                              <td className="p-2 text-right text-blue-600">{formatCurrency(results.totalSavings)}</td>
                              <td className="p-2 text-right">{formatMonths(results.payoffTimeCurrent - results.payoffTimeNew)}</td>
                              <td className="p-2 text-right text-blue-600">{formatCurrency(results.totalSavings)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className={results.totalSavings > 1000 ? 'border-green-200 bg-green-50' : results.totalSavings > 0 ? 'border-yellow-200 bg-yellow-50' : 'border-red-200 bg-red-50'}>
                      <CardHeader>
                        <CardTitle className="text-sm">Savings Assessment</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-2xl font-bold mb-2">
                            {results.totalSavings > 1000 ? '🟢' : results.totalSavings > 0 ? '🟡' : '🔴'}
                          </div>
                          <div className="text-sm">
                            {results.totalSavings > 1000 ? 'Excellent' : results.totalSavings > 0 ? 'Good' : 'Poor'}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {formatCurrency(results.totalSavings)} saved
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className={results.breakEvenMonths <= 6 ? 'border-green-200 bg-green-50' : results.breakEvenMonths <= 12 ? 'border-yellow-200 bg-yellow-50' : 'border-red-200 bg-red-50'}>
                      <CardHeader>
                        <CardTitle className="text-sm">Break-Even Speed</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-2xl font-bold mb-2">
                            {results.breakEvenMonths <= 6 ? '🟢' : results.breakEvenMonths <= 12 ? '🟡' : '🔴'}
                          </div>
                          <div className="text-sm">
                            {results.breakEvenMonths <= 6 ? 'Fast' : results.breakEvenMonths <= 12 ? 'Moderate' : 'Slow'}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {formatMonths(results.breakEvenMonths)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className={parseInt(promoLength) >= 18 ? 'border-green-200 bg-green-50' : parseInt(promoLength) >= 12 ? 'border-yellow-200 bg-yellow-50' : 'border-red-200 bg-red-50'}>
                      <CardHeader>
                        <CardTitle className="text-sm">Promo Period</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-2xl font-bold mb-2">
                            {parseInt(promoLength) >= 18 ? '🟢' : parseInt(promoLength) >= 12 ? '🟡' : '🔴'}
                          </div>
                          <div className="text-sm">
                            {parseInt(promoLength) >= 18 ? 'Long' : parseInt(promoLength) >= 12 ? 'Medium' : 'Short'}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {promoLength} months
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="guide" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800">Balance Transfer Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>0% APR promotional periods</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Consolidate multiple card balances</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Lower overall interest costs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Simplified payment management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Faster debt payoff potential</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800">Potential Risks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Transfer fees (typically 3-5%)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>High APR after promotional period</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Temptation to accumulate more debt</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Credit score impact from new account</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>May not qualify for best offers</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Balance Transfer Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl mb-2">1️⃣</div>
                      <div className="font-semibold text-blue-800">Calculate Savings</div>
                      <div className="text-sm text-blue-600 mt-1">Compare total costs including fees</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl mb-2">2️⃣</div>
                      <div className="font-semibold text-green-800">Apply Strategically</div>
                      <div className="text-sm text-green-600 mt-1">Shop for best terms and rates</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl mb-2">3️⃣</div>
                      <div className="font-semibold text-yellow-800">Pay Aggressively</div>
                      <div className="text-sm text-yellow-600 mt-1">Maximize promo period benefits</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl mb-2">4️⃣</div>
                      <div className="font-semibold text-purple-800">Avoid New Debt</div>
                      <div className="text-sm text-purple-600 mt-1">Don&apos;t use old cards again</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Best Practices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-800 mb-1">✅ Do This:</div>
                      <div className="text-green-700">
                        <div>• Pay off balance before promo rate expires</div>
                        <div>• Set up automatic payments</div>
                        <div>• Close or hide old credit cards</div>
                        <div>• Create a payoff plan and stick to it</div>
                      </div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="font-semibold text-red-800 mb-1">❌ Avoid This:</div>
                      <div className="text-red-700">
                        <div>• Making new purchases on the transfer card</div>
                        <div>• Using old cards for new debt</div>
                        <div>• Missing payments during promo period</div>
                        <div>• Ignoring the regular APR after promo</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
