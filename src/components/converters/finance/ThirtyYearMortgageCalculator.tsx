'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MortgageResults {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  monthlyPrincipal: number;
  monthlyInterestAmount: number;
  amortizationSchedule: Array<{
    year: number;
    balance: number;
    principal: number;
    interest: number;
  }>;
}

export default function ThirtyYearMortgageCalculator() {
  const [homePrice, setHomePrice] = useState<string>('400000');
  const [downPayment, setDownPayment] = useState<string>('80000');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [propertyTax, setPropertyTax] = useState<string>('4800');
  const [homeInsurance, setHomeInsurance] = useState<string>('1200');
  const [pmi, setPmi] = useState<string>('200');
  const [results, setResults] = useState<MortgageResults | null>(null);

  const calculateMortgage = useCallback(() => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = 30 * 12; // Fixed 30 years
    const tax = parseFloat(propertyTax) / 12;
    const insurance = parseFloat(homeInsurance) / 12;
    const pmiAmount = parseFloat(pmi);

    if (price <= 0 || down < 0 || rate < 0) return;

    const loanAmount = price - down;
    const monthlyPrincipal = (loanAmount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const monthlyInterestAmount = loanAmount * rate;
    const monthlyPayment = monthlyPrincipal + tax + insurance + pmiAmount;
    const totalCost = monthlyPrincipal * months;
    const totalInterest = totalCost - loanAmount;

    // Generate amortization schedule (yearly summary)
    const amortizationSchedule = [];
    let balance = loanAmount;
    
    for (let year = 1; year <= 30; year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;
      
      for (let month = 1; month <= 12; month++) {
        const interestPayment = balance * rate;
        const principalPayment = monthlyPrincipal - interestPayment;
        
        yearlyInterest += interestPayment;
        yearlyPrincipal += principalPayment;
        balance -= principalPayment;
        
        if (balance <= 0) break;
      }
      
      amortizationSchedule.push({
        year,
        balance: Math.max(0, balance),
        principal: yearlyPrincipal,
        interest: yearlyInterest
      });
      
      if (balance <= 0) break;
    }

    setResults({
      monthlyPayment,
      totalInterest,
      totalCost,
      monthlyPrincipal,
      monthlyInterestAmount,
      amortizationSchedule
    });
  }, [homePrice, downPayment, interestRate, propertyTax, homeInsurance, pmi]);

  useEffect(() => {
    calculateMortgage();
  }, [calculateMortgage]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getDownPaymentPercent = () => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    return price > 0 ? ((down / price) * 100).toFixed(1) : '0';
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏠 30-Year Fixed Mortgage Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="amortization">Amortization</TabsTrigger>
              <TabsTrigger value="insights">30-Year Benefits</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="homePrice">Home Price</Label>
                    <Input
                      id="homePrice"
                      type="number"
                      value={homePrice}
                      onChange={(e) => setHomePrice(e.target.value)}
                      placeholder="Enter home price"
                    />
                  </div>

                  <div>
                    <Label htmlFor="downPayment">Down Payment ({getDownPaymentPercent()}%)</Label>
                    <Input
                      id="downPayment"
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(e.target.value)}
                      placeholder="Enter down payment"
                    />
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
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="propertyTax">Annual Property Tax</Label>
                    <Input
                      id="propertyTax"
                      type="number"
                      value={propertyTax}
                      onChange={(e) => setPropertyTax(e.target.value)}
                      placeholder="Enter annual property tax"
                    />
                  </div>

                  <div>
                    <Label htmlFor="homeInsurance">Annual Home Insurance</Label>
                    <Input
                      id="homeInsurance"
                      type="number"
                      value={homeInsurance}
                      onChange={(e) => setHomeInsurance(e.target.value)}
                      placeholder="Enter annual insurance"
                    />
                  </div>

                  <div>
                    <Label htmlFor="pmi">Monthly PMI</Label>
                    <Input
                      id="pmi"
                      type="number"
                      value={pmi}
                      onChange={(e) => setPmi(e.target.value)}
                      placeholder="Enter monthly PMI"
                    />
                  </div>
                </div>
              </div>

              {results && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-800">30-Year Mortgage Payment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(results.monthlyPayment)}
                        </div>
                        <div className="text-sm text-blue-600">Total Monthly Payment</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(results.monthlyPrincipal)}
                        </div>
                        <div className="text-sm text-green-600">Principal & Interest</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {formatCurrency(results.totalInterest)}
                        </div>
                        <div className="text-sm text-orange-600">Total Interest (30 years)</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {formatCurrency(results.totalCost)}
                        </div>
                        <div className="text-sm text-purple-600">Total Loan Cost</div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span>Property Tax (monthly):</span>
                          <span>{formatCurrency(parseFloat(propertyTax) / 12)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Home Insurance (monthly):</span>
                          <span>{formatCurrency(parseFloat(homeInsurance) / 12)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>PMI (monthly):</span>
                          <span>{formatCurrency(parseFloat(pmi))}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span>Loan Amount:</span>
                          <span>{formatCurrency(parseFloat(homePrice) - parseFloat(downPayment))}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="amortization" className="space-y-4">
              {results && (
                <Card>
                  <CardHeader>
                    <CardTitle>30-Year Amortization Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Year</th>
                            <th className="text-right p-2">Principal Paid</th>
                            <th className="text-right p-2">Interest Paid</th>
                            <th className="text-right p-2">Remaining Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.amortizationSchedule.slice(0, 10).map((year) => (
                            <tr key={year.year} className="border-b hover:bg-gray-50">
                              <td className="p-2 font-semibold">{year.year}</td>
                              <td className="p-2 text-right text-green-600">{formatCurrency(year.principal)}</td>
                              <td className="p-2 text-right text-red-600">{formatCurrency(year.interest)}</td>
                              <td className="p-2 text-right font-semibold">{formatCurrency(year.balance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {results.amortizationSchedule.length > 10 && (
                        <div className="text-center text-gray-500 mt-4">
                          Showing first 10 years. Full 30-year schedule available.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800">30-Year Mortgage Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Lower monthly payments compared to shorter terms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>More affordable for first-time homebuyers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Frees up cash flow for other investments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Mortgage interest tax deduction benefits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Inflation reduces real cost over time</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-800">Considerations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 font-bold">•</span>
                        <span>Higher total interest paid over loan life</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 font-bold">•</span>
                        <span>Slower equity building in early years</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 font-bold">•</span>
                        <span>Longer debt commitment period</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 font-bold">•</span>
                        <span>May pay PMI longer with smaller down payments</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {results && (
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Breakdown Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-lg font-bold text-blue-600">
                            {((results.totalInterest / (parseFloat(homePrice) - parseFloat(downPayment))) * 100).toFixed(1)}%
                          </div>
                          <div className="text-sm text-blue-600">Interest as % of Loan</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-lg font-bold text-green-600">
                            {((parseFloat(downPayment) / parseFloat(homePrice)) * 100).toFixed(1)}%
                          </div>
                          <div className="text-sm text-green-600">Down Payment %</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Over 30 years, you&apos;ll pay {formatCurrency(results.totalInterest)} in interest on your {formatCurrency(parseFloat(homePrice) - parseFloat(downPayment))} loan. Consider making extra principal payments to reduce total interest.</p>
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
