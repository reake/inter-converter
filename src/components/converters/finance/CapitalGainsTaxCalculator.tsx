'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TaxResults {
  capitalGain: number;
  federalTax: number;
  stateTax: number;
  netInvestmentIncomeTax: number;
  totalTax: number;
  afterTaxProfit: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
}

export default function CapitalGainsTaxCalculator() {
  const [purchasePrice, setPurchasePrice] = useState<string>('10000');
  const [salePrice, setSalePrice] = useState<string>('15000');
  const [holdingPeriod, setHoldingPeriod] = useState<string>('long');
  const [annualIncome, setAnnualIncome] = useState<string>('75000');
  const [filingStatus, setFilingStatus] = useState<string>('single');
  const [state, setState] = useState<string>('california');
  const [results, setResults] = useState<TaxResults | null>(null);

  const calculateCapitalGainsTax = () => {
    const purchase = parseFloat(purchasePrice);
    const sale = parseFloat(salePrice);
    const income = parseFloat(annualIncome);

    if (purchase <= 0 || sale <= 0 || income <= 0) return;

    const capitalGain = sale - purchase;
    if (capitalGain <= 0) {
      setResults({
        capitalGain,
        federalTax: 0,
        stateTax: 0,
        netInvestmentIncomeTax: 0,
        totalTax: 0,
        afterTaxProfit: capitalGain,
        effectiveTaxRate: 0,
        marginalTaxRate: 0
      });
      return;
    }

    let federalRate = 0;
    let marginalTaxRate = 0;

    // 2024 Federal Capital Gains Tax Rates
    if (holdingPeriod === 'short') {
      // Short-term gains taxed as ordinary income
      if (filingStatus === 'single') {
        if (income <= 11000) federalRate = 0.10;
        else if (income <= 44725) federalRate = 0.12;
        else if (income <= 95375) federalRate = 0.22;
        else if (income <= 182050) federalRate = 0.24;
        else if (income <= 231250) federalRate = 0.32;
        else if (income <= 578125) federalRate = 0.35;
        else federalRate = 0.37;
      } else { // married filing jointly
        if (income <= 22000) federalRate = 0.10;
        else if (income <= 89450) federalRate = 0.12;
        else if (income <= 190750) federalRate = 0.22;
        else if (income <= 364200) federalRate = 0.24;
        else if (income <= 462500) federalRate = 0.32;
        else if (income <= 693750) federalRate = 0.35;
        else federalRate = 0.37;
      }
      marginalTaxRate = federalRate;
    } else {
      // Long-term capital gains rates
      if (filingStatus === 'single') {
        if (income <= 44625) federalRate = 0.00;
        else if (income <= 492300) federalRate = 0.15;
        else federalRate = 0.20;
      } else { // married filing jointly
        if (income <= 89250) federalRate = 0.00;
        else if (income <= 553850) federalRate = 0.15;
        else federalRate = 0.20;
      }
      marginalTaxRate = federalRate;
    }

    const federalTax = capitalGain * federalRate;

    // Net Investment Income Tax (3.8% for high earners)
    let netInvestmentIncomeTax = 0;
    const niitThreshold = filingStatus === 'single' ? 200000 : 250000;
    if (income > niitThreshold && holdingPeriod === 'long') {
      netInvestmentIncomeTax = capitalGain * 0.038;
    }

    // State tax (simplified - California example)
    let stateTaxRate = 0;
    if (state === 'california') {
      if (income <= 10099) stateTaxRate = 0.01;
      else if (income <= 23942) stateTaxRate = 0.02;
      else if (income <= 37788) stateTaxRate = 0.04;
      else if (income <= 52455) stateTaxRate = 0.06;
      else if (income <= 66295) stateTaxRate = 0.08;
      else if (income <= 338639) stateTaxRate = 0.093;
      else if (income <= 406364) stateTaxRate = 0.103;
      else if (income <= 677278) stateTaxRate = 0.113;
      else stateTaxRate = 0.123;
    } else if (state === 'texas' || state === 'florida') {
      stateTaxRate = 0; // No state capital gains tax
    } else {
      stateTaxRate = 0.05; // Average state rate
    }

    const stateTax = capitalGain * stateTaxRate;
    const totalTax = federalTax + stateTax + netInvestmentIncomeTax;
    const afterTaxProfit = capitalGain - totalTax;
    const effectiveTaxRate = totalTax / capitalGain;

    setResults({
      capitalGain,
      federalTax,
      stateTax,
      netInvestmentIncomeTax,
      totalTax,
      afterTaxProfit,
      effectiveTaxRate,
      marginalTaxRate
    });
  };

  useEffect(() => {
    calculateCapitalGainsTax();
  }, [purchasePrice, salePrice, holdingPeriod, annualIncome, filingStatus, state]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (rate: number) => {
    return (rate * 100).toFixed(1) + '%';
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📊 Capital Gains Tax Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="strategies">Tax Strategies</TabsTrigger>
              <TabsTrigger value="rates">Tax Rates</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="purchasePrice">Purchase Price</Label>
                    <Input
                      id="purchasePrice"
                      type="number"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(e.target.value)}
                      placeholder="Enter purchase price"
                    />
                  </div>

                  <div>
                    <Label htmlFor="salePrice">Sale Price</Label>
                    <Input
                      id="salePrice"
                      type="number"
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                      placeholder="Enter sale price"
                    />
                  </div>

                  <div>
                    <Label htmlFor="holdingPeriod">Holding Period</Label>
                    <Select value={holdingPeriod} onValueChange={setHoldingPeriod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select holding period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short-term (≤ 1 year)</SelectItem>
                        <SelectItem value="long">Long-term (&gt; 1 year)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="annualIncome">Annual Income</Label>
                    <Input
                      id="annualIncome"
                      type="number"
                      value={annualIncome}
                      onChange={(e) => setAnnualIncome(e.target.value)}
                      placeholder="Enter annual income"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="filingStatus">Filing Status</Label>
                    <Select value={filingStatus} onValueChange={setFilingStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select filing status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married Filing Jointly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="california">California</SelectItem>
                        <SelectItem value="texas">Texas</SelectItem>
                        <SelectItem value="florida">Florida</SelectItem>
                        <SelectItem value="newyork">New York</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Card className={`${holdingPeriod === 'long' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <CardHeader>
                      <CardTitle className={`text-sm ${holdingPeriod === 'long' ? 'text-green-800' : 'text-red-800'}`}>
                        {holdingPeriod === 'long' ? 'Long-term Benefits' : 'Short-term Implications'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className={`text-sm ${holdingPeriod === 'long' ? 'text-green-700' : 'text-red-700'}`}>
                        {holdingPeriod === 'long' ? (
                          <div>
                            <div>✓ Preferential tax rates (0%, 15%, 20%)</div>
                            <div>✓ Lower effective tax rate</div>
                            <div>✓ Potential NIIT exemption</div>
                          </div>
                        ) : (
                          <div>
                            <div>⚠ Taxed as ordinary income</div>
                            <div>⚠ Higher effective tax rate</div>
                            <div>⚠ No preferential treatment</div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {results && (
                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-blue-800 text-sm">Tax Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Capital Gain:</span>
                            <span className="font-semibold">{formatCurrency(results.capitalGain)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Tax:</span>
                            <span className="font-semibold text-red-600">{formatCurrency(results.totalTax)}</span>
                          </div>
                          <div className="flex justify-between border-t pt-1">
                            <span>After-tax Profit:</span>
                            <span className="font-semibold text-green-600">{formatCurrency(results.afterTaxProfit)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {results && (
                <Card className="bg-gradient-to-r from-red-50 to-green-50 border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-800">Capital Gains Tax Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(results.capitalGain)}
                        </div>
                        <div className="text-sm text-blue-600">Capital Gain</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {formatCurrency(results.totalTax)}
                        </div>
                        <div className="text-sm text-red-600">Total Tax</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(results.afterTaxProfit)}
                        </div>
                        <div className="text-sm text-green-600">After-tax Profit</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {formatPercent(results.effectiveTaxRate)}
                        </div>
                        <div className="text-sm text-purple-600">Effective Rate</div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span>Federal Tax:</span>
                          <span className="font-semibold text-red-600">{formatCurrency(results.federalTax)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>State Tax:</span>
                          <span className="font-semibold text-red-600">{formatCurrency(results.stateTax)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>NIIT (3.8%):</span>
                          <span className="font-semibold text-red-600">{formatCurrency(results.netInvestmentIncomeTax)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Marginal Rate:</span>
                          <span className="font-semibold">{formatPercent(results.marginalTaxRate)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="strategies" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800">Tax Reduction Strategies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Hold investments > 1 year for long-term rates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Harvest tax losses to offset gains</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Use tax-advantaged accounts (401k, IRA)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Gift appreciated assets to charity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Consider installment sales</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800">Tax-Loss Harvesting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Sell losing investments to offset gains</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>$3,000 annual deduction against income</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Carry forward unused losses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Avoid wash sale rule (30 days)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Rebalance portfolio tax-efficiently</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Advanced Strategies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl mb-2">🎁</div>
                      <div className="font-semibold text-green-800">Charitable Giving</div>
                      <div className="text-sm text-green-600 mt-1">
                        Donate appreciated assets to avoid capital gains tax
                      </div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl mb-2">🏠</div>
                      <div className="font-semibold text-blue-800">1031 Exchange</div>
                      <div className="text-sm text-blue-600 mt-1">
                        Defer taxes on real estate by exchanging properties
                      </div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl mb-2">👨‍👩‍👧‍👦</div>
                      <div className="font-semibold text-purple-800">Family Transfers</div>
                      <div className="text-sm text-purple-600 mt-1">
                        Gift assets to family members in lower tax brackets
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {results && (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Optimization Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {holdingPeriod === 'short' && (
                        <div className="p-3 bg-yellow-50 rounded-lg">
                          <div className="font-semibold text-yellow-800 mb-1">⏰ Consider Waiting:</div>
                          <div className="text-yellow-700 text-sm">
                            Holding for > 1 year could save you {formatCurrency(results.federalTax - (results.capitalGain * (parseFloat(annualIncome) > 44625 ? 0.15 : 0)))} in federal taxes.
                          </div>
                        </div>
                      )}
                      
                      {results.netInvestmentIncomeTax > 0 && (
                        <div className="p-3 bg-red-50 rounded-lg">
                          <div className="font-semibold text-red-800 mb-1">💰 High Earner Alert:</div>
                          <div className="text-red-700 text-sm">
                            You're subject to the 3.8% Net Investment Income Tax. Consider tax-loss harvesting or charitable giving.
                          </div>
                        </div>
                      )}

                      {state === 'california' && results.stateTax > 0 && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="font-semibold text-blue-800 mb-1">🏖️ State Tax Impact:</div>
                          <div className="text-blue-700 text-sm">
                            California has high capital gains taxes. Consider timing sales or establishing residency in a no-tax state.
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="rates" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>2024 Federal Capital Gains Tax Rates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-800">Long-term Capital Gains (> 1 year)</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Tax Rate</th>
                              <th className="text-right p-2">Single</th>
                              <th className="text-right p-2">Married</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b bg-green-50">
                              <td className="p-2 font-semibold text-green-600">0%</td>
                              <td className="p-2 text-right">$0 - $44,625</td>
                              <td className="p-2 text-right">$0 - $89,250</td>
                            </tr>
                            <tr className="border-b">
                              <td className="p-2 font-semibold">15%</td>
                              <td className="p-2 text-right">$44,626 - $492,300</td>
                              <td className="p-2 text-right">$89,251 - $553,850</td>
                            </tr>
                            <tr className="border-b bg-red-50">
                              <td className="p-2 font-semibold text-red-600">20%</td>
                              <td className="p-2 text-right">$492,301+</td>
                              <td className="p-2 text-right">$553,851+</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-red-800">Short-term Capital Gains (≤ 1 year)</h4>
                      <div className="text-sm text-red-700">
                        <div className="p-3 bg-red-50 rounded-lg">
                          <div className="font-semibold mb-2">Taxed as Ordinary Income</div>
                          <div>10%, 12%, 22%, 24%, 32%, 35%, 37%</div>
                          <div className="mt-2">Same rates as your regular income tax bracket</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>State Capital Gains Tax Rates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">State</th>
                          <th className="text-center p-2">Rate</th>
                          <th className="text-left p-2">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b bg-green-50">
                          <td className="p-2 font-semibold">Texas, Florida</td>
                          <td className="p-2 text-center text-green-600">0%</td>
                          <td className="p-2">No state capital gains tax</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-semibold">California</td>
                          <td className="p-2 text-center text-red-600">1% - 12.3%</td>
                          <td className="p-2">Taxed as ordinary income</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-semibold">New York</td>
                          <td className="p-2 text-center">4% - 8.82%</td>
                          <td className="p-2">Plus NYC tax if applicable</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2 font-semibold">Average</td>
                          <td className="p-2 text-center">5%</td>
                          <td className="p-2">Most states tax as income</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Additional Taxes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 rounded-lg">
                      <div className="font-semibold text-red-800 mb-2">Net Investment Income Tax (NIIT)</div>
                      <div className="text-red-700 text-sm">
                        <div>• 3.8% additional tax on investment income</div>
                        <div>• Applies to high earners: $200k+ (single), $250k+ (married)</div>
                        <div>• Includes capital gains, dividends, interest</div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-800 mb-2">Medicare Surtax</div>
                      <div className="text-blue-700 text-sm">
                        <div>• 0.9% additional Medicare tax on high earners</div>
                        <div>• Applies to wages, not capital gains</div>
                        <div>• Threshold: $200k+ (single), $250k+ (married)</div>
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
