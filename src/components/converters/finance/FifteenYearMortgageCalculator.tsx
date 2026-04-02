'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MortgageResults {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  savingsVs30Year: number;
  interestSavings: number;
  payoffDate: string;
}

export default function FifteenYearMortgageCalculator() {
  const [homePrice, setHomePrice] = useState<string>('400000');
  const [downPayment, setDownPayment] = useState<string>('80000');
  const [interestRate, setInterestRate] = useState<string>('6.0');
  const [propertyTax, setPropertyTax] = useState<string>('4800');
  const [homeInsurance, setHomeInsurance] = useState<string>('1200');
  const [results, setResults] = useState<MortgageResults | null>(null);

  const calculateMortgage = useCallback(() => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months15 = 15 * 12;
    const months30 = 30 * 12;
    const tax = parseFloat(propertyTax) / 12;
    const insurance = parseFloat(homeInsurance) / 12;

    if (price <= 0 || down < 0 || rate < 0) return;

    const loanAmount = price - down;
    
    // 15-year calculation
    const monthlyPI15 = (loanAmount * rate * Math.pow(1 + rate, months15)) / (Math.pow(1 + rate, months15) - 1);
    const monthlyPayment = monthlyPI15 + tax + insurance;
    const totalCost = monthlyPI15 * months15;
    const totalInterest = totalCost - loanAmount;

    // 30-year comparison
    const monthlyPI30 = (loanAmount * rate * Math.pow(1 + rate, months30)) / (Math.pow(1 + rate, months30) - 1);
    const totalCost30 = monthlyPI30 * months30;
    const totalInterest30 = totalCost30 - loanAmount;
    
    const savingsVs30Year = (monthlyPI30 + tax + insurance) - monthlyPayment;
    const interestSavings = totalInterest30 - totalInterest;

    // Calculate payoff date
    const currentDate = new Date();
    const payoffDate = new Date(currentDate.getFullYear() + 15, currentDate.getMonth(), currentDate.getDate());

    setResults({
      monthlyPayment,
      totalInterest,
      totalCost,
      savingsVs30Year,
      interestSavings,
      payoffDate: payoffDate.toLocaleDateString()
    });
  }, [homePrice, downPayment, interestRate, propertyTax, homeInsurance]);

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

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏡 15-Year Fixed Mortgage Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="comparison">15 vs 30 Year</TabsTrigger>
              <TabsTrigger value="benefits">15-Year Benefits</TabsTrigger>
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
                    <Label htmlFor="downPayment">Down Payment</Label>
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

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">15-Year Advantages</h4>
                    <div className="text-sm text-green-700">
                      <div>✓ Significant interest savings</div>
                      <div>✓ Build equity faster</div>
                      <div>✓ Own home outright sooner</div>
                    </div>
                  </div>
                </div>
              </div>

              {results && (
                <Card className="bg-green-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800">15-Year Mortgage Payment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(results.monthlyPayment)}
                        </div>
                        <div className="text-sm text-green-600">Monthly Payment</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(results.totalInterest)}
                        </div>
                        <div className="text-sm text-blue-600">Total Interest</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {formatCurrency(results.interestSavings)}
                        </div>
                        <div className="text-sm text-purple-600">Interest Savings vs 30-Year</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {results.payoffDate}
                        </div>
                        <div className="text-sm text-orange-600">Payoff Date</div>
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
                      <CardTitle>15-Year vs 30-Year Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Loan Term</th>
                              <th className="text-right p-2">Monthly Payment</th>
                              <th className="text-right p-2">Total Interest</th>
                              <th className="text-right p-2">Total Cost</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b bg-green-50">
                              <td className="p-2 font-semibold text-green-800">15 Years</td>
                              <td className="p-2 text-right font-semibold text-green-600">{formatCurrency(results.monthlyPayment)}</td>
                              <td className="p-2 text-right text-green-600">{formatCurrency(results.totalInterest)}</td>
                              <td className="p-2 text-right text-green-600">{formatCurrency(results.totalCost)}</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2 font-semibold">30 Years</td>
                              <td className="p-2 text-right">{formatCurrency(results.monthlyPayment + results.savingsVs30Year)}</td>
                              <td className="p-2 text-right">{formatCurrency(results.totalInterest + results.interestSavings)}</td>
                              <td className="p-2 text-right">{formatCurrency(results.totalCost + results.interestSavings)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-green-200 bg-green-50">
                      <CardHeader>
                        <CardTitle className="text-green-800">15-Year Benefits</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Interest Savings:</span>
                            <span className="font-semibold text-green-600">{formatCurrency(results.interestSavings)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Equity Built Faster:</span>
                            <span className="font-semibold text-green-600">2x Rate</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Debt-Free Earlier:</span>
                            <span className="font-semibold text-green-600">15 Years</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-orange-200 bg-orange-50">
                      <CardHeader>
                        <CardTitle className="text-orange-800">Trade-offs</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Higher Monthly Payment:</span>
                            <span className="font-semibold text-orange-600">+{formatCurrency(Math.abs(results.savingsVs30Year))}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Less Cash Flow:</span>
                            <span className="font-semibold text-orange-600">Reduced</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Investment Opportunity:</span>
                            <span className="font-semibold text-orange-600">Limited</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="benefits" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800">Why Choose 15-Year?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Save hundreds of thousands in interest</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Build equity twice as fast</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Own your home outright by retirement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Lower interest rates than 30-year</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Forced savings through equity building</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800">Best For</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>High-income earners with stable jobs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Those prioritizing debt elimination</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Conservative investors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>People nearing retirement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Those who value peace of mind</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Decision Framework</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">Choose 15-Year If:</div>
                      <div className="text-sm text-green-700 mt-2">
                        <div>• Stable high income</div>
                        <div>• Low debt-to-income ratio</div>
                        <div>• Emergency fund established</div>
                        <div>• Maxed retirement savings</div>
                      </div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-lg font-bold text-yellow-600">Consider 30-Year If:</div>
                      <div className="text-sm text-yellow-700 mt-2">
                        <div>• Variable income</div>
                        <div>• High investment returns expected</div>
                        <div>• Need cash flow flexibility</div>
                        <div>• Other high-interest debts</div>
                      </div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">Hybrid Strategy:</div>
                      <div className="text-sm text-blue-700 mt-2">
                        <div>• Start with 30-year</div>
                        <div>• Make extra payments</div>
                        <div>• Refinance to 15-year later</div>
                        <div>• Best of both worlds</div>
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
