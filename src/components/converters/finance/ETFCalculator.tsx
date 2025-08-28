'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ETFResults {
  finalValue: number;
  totalInvestment: number;
  totalGains: number;
  totalFees: number;
  annualizedReturn: number;
  totalShares: number;
  dividendIncome: number;
  capitalGains: number;
}

export default function ETFCalculator() {
  const [initialInvestment, setInitialInvestment] = useState<string>('10000');
  const [monthlyInvestment, setMonthlyInvestment] = useState<string>('500');
  const [expectedReturn, setExpectedReturn] = useState<string>('10');
  const [expenseRatio, setExpenseRatio] = useState<string>('0.03');
  const [dividendYield, setDividendYield] = useState<string>('1.5');
  const [investmentPeriod, setInvestmentPeriod] = useState<string>('15');
  const [etfType, setETFType] = useState<string>('broad-market');
  const [sharePrice, setSharePrice] = useState<string>('400');
  const [results, setResults] = useState<ETFResults | null>(null);

  const etfTypes = {
    'broad-market': 'Broad Market (S&P 500)',
    'total-market': 'Total Stock Market',
    'international': 'International Developed',
    'emerging': 'Emerging Markets',
    'sector': 'Sector Specific',
    'bond': 'Bond ETF',
    'reit': 'Real Estate (REIT)',
    'commodity': 'Commodity'
  };

  const calculateETF = () => {
    const initial = parseFloat(initialInvestment);
    const monthly = parseFloat(monthlyInvestment);
    const returnRate = parseFloat(expectedReturn) / 100;
    const expenseRate = parseFloat(expenseRatio) / 100;
    const divYield = parseFloat(dividendYield) / 100;
    const years = parseFloat(investmentPeriod);
    const price = parseFloat(sharePrice);

    if (initial < 0 || monthly < 0 || returnRate < 0 || years <= 0 || price <= 0) return;

    // Net return after expense ratio
    const netReturn = returnRate - expenseRate;
    const monthlyReturn = netReturn / 12;
    const months = years * 12;

    // Calculate future value with compound interest
    let futureValue = initial * Math.pow(1 + monthlyReturn, months);
    
    // Add monthly investments
    if (monthly > 0) {
      const monthlyFV = monthly * (Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn;
      futureValue += monthlyFV;
    }

    const totalInvestment = initial + (monthly * months);
    const totalGains = futureValue - totalInvestment;
    const annualizedReturn = Math.pow(futureValue / totalInvestment, 1/years) - 1;

    // Calculate fees
    const averageBalance = (totalInvestment + futureValue) / 2;
    const totalFees = averageBalance * expenseRate * years;

    // Calculate shares and dividend income
    const initialShares = initial / price;
    const monthlyShares = monthly / price;
    const totalShares = initialShares + (monthlyShares * months);
    
    // Simplified dividend calculation
    const averageDividendPerShare = price * divYield;
    const totalDividendIncome = totalShares * averageDividendPerShare * years;
    
    const capitalGains = futureValue - totalInvestment - totalDividendIncome;

    const calculatedResults: ETFResults = {
      finalValue: futureValue,
      totalInvestment: totalInvestment,
      totalGains: totalGains,
      totalFees: totalFees,
      annualizedReturn: annualizedReturn * 100,
      totalShares: totalShares,
      dividendIncome: totalDividendIncome,
      capitalGains: capitalGains
    };

    setResults(calculatedResults);
  };

  useEffect(() => {
    calculateETF();
  }, [initialInvestment, monthlyInvestment, expectedReturn, expenseRatio, dividendYield, investmentPeriod, etfType, sharePrice]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercent = (percent: number) => {
    return `${percent.toFixed(2)}%`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">ETF Calculator</h1>
        <p className="text-lg text-gray-600">
          Calculate ETF investment returns, analyze costs, and compare different ETF strategies.
        </p>
      </div>

      <Tabs defaultValue="calculator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="comparison">ETF vs Mutual Funds</TabsTrigger>
          <TabsTrigger value="types">ETF Types</TabsTrigger>
          <TabsTrigger value="strategy">Investment Strategy</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ETF Investment Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="etfType">ETF Type</Label>
                  <Select value={etfType} onValueChange={setETFType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(etfTypes).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="initialInvestment">Initial Investment ($)</Label>
                  <Input
                    id="initialInvestment"
                    type="number"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(e.target.value)}
                    placeholder="10000"
                  />
                </div>

                <div>
                  <Label htmlFor="monthlyInvestment">Monthly Investment ($)</Label>
                  <Input
                    id="monthlyInvestment"
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(e.target.value)}
                    placeholder="500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sharePrice">Current Share Price ($)</Label>
                    <Input
                      id="sharePrice"
                      type="number"
                      step="0.01"
                      value={sharePrice}
                      onChange={(e) => setSharePrice(e.target.value)}
                      placeholder="400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dividendYield">Dividend Yield (%)</Label>
                    <Input
                      id="dividendYield"
                      type="number"
                      step="0.1"
                      value={dividendYield}
                      onChange={(e) => setDividendYield(e.target.value)}
                      placeholder="1.5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                  <Input
                    id="expectedReturn"
                    type="number"
                    step="0.1"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(e.target.value)}
                    placeholder="10"
                  />
                </div>

                <div>
                  <Label htmlFor="expenseRatio">Annual Expense Ratio (%)</Label>
                  <Input
                    id="expenseRatio"
                    type="number"
                    step="0.01"
                    value={expenseRatio}
                    onChange={(e) => setExpenseRatio(e.target.value)}
                    placeholder="0.03"
                  />
                </div>

                <div>
                  <Label htmlFor="investmentPeriod">Investment Period (Years)</Label>
                  <Input
                    id="investmentPeriod"
                    type="number"
                    value={investmentPeriod}
                    onChange={(e) => setInvestmentPeriod(e.target.value)}
                    placeholder="15"
                  />
                </div>
              </CardContent>
            </Card>

            {results && (
              <Card>
                <CardHeader>
                  <CardTitle>ETF Investment Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(results.finalValue)}
                      </div>
                      <div className="text-sm text-gray-600">Final Portfolio Value</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatPercent(results.annualizedReturn)}
                      </div>
                      <div className="text-sm text-gray-600">Annualized Return</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Investment:</span>
                      <span className="font-semibold">{formatCurrency(results.totalInvestment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Gains:</span>
                      <span className="font-semibold text-green-600">{formatCurrency(results.totalGains)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dividend Income:</span>
                      <span className="font-semibold text-blue-600">{formatCurrency(results.dividendIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Capital Gains:</span>
                      <span className="font-semibold text-purple-600">{formatCurrency(results.capitalGains)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Fees:</span>
                      <span className="font-semibold text-red-600">{formatCurrency(results.totalFees)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Shares:</span>
                      <span className="font-semibold">{results.totalShares.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>ETFs vs Mutual Funds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-600 mb-3">ETF Advantages</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Lower expense ratios (0.03%-0.75%)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Intraday trading flexibility</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Tax efficiency</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>No minimum investment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Transparent holdings</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold text-green-600 mb-3">Mutual Fund Advantages</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Automatic dividend reinvestment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Fractional share investing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>No trading commissions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Professional active management</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Systematic investment plans</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Cost Comparison</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 p-3 text-left">Feature</th>
                        <th className="border border-gray-300 p-3 text-left">ETFs</th>
                        <th className="border border-gray-300 p-3 text-left">Index Mutual Funds</th>
                        <th className="border border-gray-300 p-3 text-left">Active Mutual Funds</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-3">Expense Ratio</td>
                        <td className="border border-gray-300 p-3">0.03% - 0.75%</td>
                        <td className="border border-gray-300 p-3">0.05% - 0.20%</td>
                        <td className="border border-gray-300 p-3">0.50% - 2.00%</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">Trading Costs</td>
                        <td className="border border-gray-300 p-3">Bid-ask spread</td>
                        <td className="border border-gray-300 p-3">None</td>
                        <td className="border border-gray-300 p-3">None</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">Load Fees</td>
                        <td className="border border-gray-300 p-3">None</td>
                        <td className="border border-gray-300 p-3">None</td>
                        <td className="border border-gray-300 p-3">0% - 5.75%</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">Minimum Investment</td>
                        <td className="border border-gray-300 p-3">1 share</td>
                        <td className="border border-gray-300 p-3">$1 - $3,000</td>
                        <td className="border border-gray-300 p-3">$1,000 - $10,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="types">
          <Card>
            <CardHeader>
              <CardTitle>Types of ETFs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Equity ETFs</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-blue-600">Broad Market ETFs</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• SPY, VOO, IVV (S&P 500)</li>
                      <li>• VTI (Total Stock Market)</li>
                      <li>• QQQ (Nasdaq 100)</li>
                      <li>• Low fees, broad diversification</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-green-600">Sector ETFs</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• XLK (Technology)</li>
                      <li>• XLF (Financial)</li>
                      <li>• XLE (Energy)</li>
                      <li>• Higher risk, sector concentration</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-purple-600">International ETFs</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• VEA (Developed Markets)</li>
                      <li>• VWO (Emerging Markets)</li>
                      <li>• VXUS (Total International)</li>
                      <li>• Geographic diversification</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-orange-600">Style ETFs</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• VTV (Value)</li>
                      <li>• VUG (Growth)</li>
                      <li>• VB (Small Cap)</li>
                      <li>• Factor-based investing</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Fixed Income ETFs</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-blue-600">Government Bond ETFs</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• BND (Total Bond Market)</li>
                      <li>• VGIT (Intermediate Treasury)</li>
                      <li>• TIPS (Inflation Protected)</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-green-600">Corporate Bond ETFs</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• LQD (Investment Grade)</li>
                      <li>• HYG (High Yield)</li>
                      <li>• VCIT (Intermediate Corporate)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Alternative ETFs</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-purple-600">REIT ETFs</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• VNQ (Real Estate)</li>
                      <li>• SCHH (US REIT)</li>
                      <li>• High dividend yields</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-orange-600">Commodity ETFs</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• GLD (Gold)</li>
                      <li>• USO (Oil)</li>
                      <li>• DBA (Agriculture)</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-red-600">Leveraged ETFs</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• TQQQ (3x Nasdaq)</li>
                      <li>• SPXL (3x S&P 500)</li>
                      <li>• High risk, short-term use</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategy">
          <Card>
            <CardHeader>
              <CardTitle>ETF Investment Strategies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Core-Satellite Strategy</h3>
                <div className="p-4 border rounded-lg">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-blue-600">Core Holdings (70-80%)</h4>
                      <ul className="text-sm text-gray-600 mt-2 space-y-1">
                        <li>• Broad market index ETFs</li>
                        <li>• Low-cost, diversified exposure</li>
                        <li>• VTI, VOO, VXUS examples</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-600">Satellite Holdings (20-30%)</h4>
                      <ul className="text-sm text-gray-600 mt-2 space-y-1">
                        <li>• Sector, style, or thematic ETFs</li>
                        <li>• Higher risk/return potential</li>
                        <li>• Tactical allocation adjustments</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Asset Allocation Models</h3>
                <div className="space-y-3">
                  <div className="p-4 border-l-4 border-green-500 bg-green-50">
                    <h4 className="font-semibold">Conservative (Age 60+)</h4>
                    <p className="text-sm text-gray-600">30% Stock ETFs, 60% Bond ETFs, 10% Alternatives</p>
                  </div>
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-semibold">Moderate (Age 40-60)</h4>
                    <p className="text-sm text-gray-600">60% Stock ETFs, 30% Bond ETFs, 10% Alternatives</p>
                  </div>
                  <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                    <h4 className="font-semibold">Aggressive (Age 20-40)</h4>
                    <p className="text-sm text-gray-600">80% Stock ETFs, 15% Bond ETFs, 5% Alternatives</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Best Practices</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Start with broad market ETFs for core exposure</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Consider expense ratios when selecting ETFs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Rebalance portfolio periodically (annually or semi-annually)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Use dollar-cost averaging for regular investments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Avoid frequent trading to minimize costs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">⚠️</span>
                    <span>Be cautious with leveraged and inverse ETFs</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
