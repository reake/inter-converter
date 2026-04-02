'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DividendResults {
  annualDividends: number;
  monthlyDividends: number;
  quarterlyDividends: number;
  totalReturn: number;
  dividendYield: number;
  reinvestedValue: number;
  totalShares: number;
  capitalGains: number;
}

export default function DividendCalculator() {
  const [initialInvestment, setInitialInvestment] = useState<string>('10000');
  const [sharePrice, setSharePrice] = useState<string>('50');
  const [annualDividend, setAnnualDividend] = useState<string>('2.50');
  const [dividendGrowthRate, setDividendGrowthRate] = useState<string>('5');
  const [stockGrowthRate, setStockGrowthRate] = useState<string>('7');
  const [timeHorizon, setTimeHorizon] = useState<string>('10');
  const [reinvestDividends, setReinvestDividends] = useState<string>('yes');
  const [taxRate, setTaxRate] = useState<string>('15');
  const [results, setResults] = useState<DividendResults | null>(null);

  const calculateDividends = useCallback(() => {
    const investment = parseFloat(initialInvestment);
    const price = parseFloat(sharePrice);
    const dividend = parseFloat(annualDividend);
    const divGrowth = parseFloat(dividendGrowthRate) / 100;
    const stockGrowth = parseFloat(stockGrowthRate) / 100;
    const years = parseFloat(timeHorizon);
    const reinvest = reinvestDividends === 'yes';
    const tax = parseFloat(taxRate) / 100;

    if (investment <= 0 || price <= 0 || dividend < 0 || years <= 0) return;

    const initialShares = investment / price;
    let totalShares = initialShares;
    let currentDividend = dividend;
    let currentPrice = price;
    let totalDividendsReceived = 0;
    let totalReinvestedValue = 0;

    // Calculate year by year
    for (let year = 1; year <= years; year++) {
      // Calculate dividends for this year
      const yearlyDividends = totalShares * currentDividend;
      const afterTaxDividends = yearlyDividends * (1 - tax);
      totalDividendsReceived += afterTaxDividends;

      // Reinvest dividends if selected
      if (reinvest) {
        const additionalShares = afterTaxDividends / currentPrice;
        totalShares += additionalShares;
        totalReinvestedValue += afterTaxDividends;
      }

      // Grow dividend and stock price
      currentDividend *= (1 + divGrowth);
      currentPrice *= (1 + stockGrowth);
    }

    const finalStockValue = totalShares * currentPrice;
    const capitalGains = finalStockValue - investment - totalReinvestedValue;
    const totalReturn = finalStockValue + (reinvest ? 0 : totalDividendsReceived) - investment;
    const currentYield = (dividend / price) * 100;

    const calculatedResults: DividendResults = {
      annualDividends: totalShares * currentDividend * (1 - tax),
      monthlyDividends: (totalShares * currentDividend * (1 - tax)) / 12,
      quarterlyDividends: (totalShares * currentDividend * (1 - tax)) / 4,
      totalReturn: totalReturn,
      dividendYield: currentYield,
      reinvestedValue: totalReinvestedValue,
      totalShares: totalShares,
      capitalGains: capitalGains
    };

    setResults(calculatedResults);
  }, [initialInvestment, sharePrice, annualDividend, dividendGrowthRate, stockGrowthRate, timeHorizon, reinvestDividends, taxRate]);

  useEffect(() => {
    calculateDividends();
  }, [calculateDividends]);

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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Dividend Calculator</h1>
        <p className="text-lg text-gray-600">
          Calculate dividend income, reinvestment returns, and total portfolio growth from dividend-paying stocks.
        </p>
      </div>

      <Tabs defaultValue="calculator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="stocks">Top Dividend Stocks</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Dividend Investment Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sharePrice">Share Price ($)</Label>
                    <Input
                      id="sharePrice"
                      type="number"
                      step="0.01"
                      value={sharePrice}
                      onChange={(e) => setSharePrice(e.target.value)}
                      placeholder="50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="annualDividend">Annual Dividend per Share ($)</Label>
                    <Input
                      id="annualDividend"
                      type="number"
                      step="0.01"
                      value={annualDividend}
                      onChange={(e) => setAnnualDividend(e.target.value)}
                      placeholder="2.50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dividendGrowthRate">Dividend Growth Rate (%)</Label>
                    <Input
                      id="dividendGrowthRate"
                      type="number"
                      step="0.1"
                      value={dividendGrowthRate}
                      onChange={(e) => setDividendGrowthRate(e.target.value)}
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="stockGrowthRate">Stock Price Growth Rate (%)</Label>
                    <Input
                      id="stockGrowthRate"
                      type="number"
                      step="0.1"
                      value={stockGrowthRate}
                      onChange={(e) => setStockGrowthRate(e.target.value)}
                      placeholder="7"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="timeHorizon">Investment Time Horizon (Years)</Label>
                  <Input
                    id="timeHorizon"
                    type="number"
                    value={timeHorizon}
                    onChange={(e) => setTimeHorizon(e.target.value)}
                    placeholder="10"
                  />
                </div>

                <div>
                  <Label htmlFor="reinvestDividends">Reinvest Dividends</Label>
                  <Select value={reinvestDividends} onValueChange={setReinvestDividends}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes - Reinvest All Dividends</SelectItem>
                      <SelectItem value="no">No - Take Cash Dividends</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="taxRate">Dividend Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    step="0.1"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    placeholder="15"
                  />
                </div>
              </CardContent>
            </Card>

            {results && (
              <Card>
                <CardHeader>
                  <CardTitle>Dividend Investment Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(results.annualDividends)}
                      </div>
                      <div className="text-sm text-gray-600">Annual Dividend Income</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatPercent(results.dividendYield)}
                      </div>
                      <div className="text-sm text-gray-600">Current Dividend Yield</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monthly Dividends:</span>
                      <span className="font-semibold text-green-600">{formatCurrency(results.monthlyDividends)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quarterly Dividends:</span>
                      <span className="font-semibold text-green-600">{formatCurrency(results.quarterlyDividends)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Shares Owned:</span>
                      <span className="font-semibold">{results.totalShares.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reinvested Value:</span>
                      <span className="font-semibold text-blue-600">{formatCurrency(results.reinvestedValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Capital Gains:</span>
                      <span className="font-semibold text-purple-600">{formatCurrency(results.capitalGains)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">Total Return:</span>
                      <span className="font-bold text-green-600">{formatCurrency(results.totalReturn)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>Dividend Investment Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Income vs Growth Breakdown</h3>
                {results && (
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-green-600">Dividend Income</h4>
                      <p className="text-2xl font-bold">{formatCurrency(results.reinvestedValue || results.annualDividends * parseFloat(timeHorizon))}</p>
                      <p className="text-sm text-gray-600">Total dividend payments</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-blue-600">Capital Appreciation</h4>
                      <p className="text-2xl font-bold">{formatCurrency(results.capitalGains)}</p>
                      <p className="text-sm text-gray-600">Stock price growth</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-purple-600">Compound Effect</h4>
                      <p className="text-2xl font-bold">{formatCurrency(results.reinvestedValue)}</p>
                      <p className="text-sm text-gray-600">Reinvestment growth</p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Dividend Yield Categories</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                      <span>Low Yield (0-2%)</span>
                      <span className="text-sm text-gray-600">Growth-focused stocks</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                      <span>Moderate Yield (2-4%)</span>
                      <span className="text-sm text-gray-600">Balanced dividend stocks</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <span>High Yield (4-6%)</span>
                      <span className="text-sm text-gray-600">Income-focused stocks</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                      <span>Very High Yield (6%+)</span>
                      <span className="text-sm text-gray-600">High-risk, may be unsustainable</span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Your Investment</h4>
                    {results && (
                      <div className="space-y-2">
                        <p>Current Yield: <span className="font-semibold">{formatPercent(results.dividendYield)}</span></p>
                        <p>Category: <span className="font-semibold">
                          {results.dividendYield < 2 ? 'Low Yield' :
                           results.dividendYield < 4 ? 'Moderate Yield' :
                           results.dividendYield < 6 ? 'High Yield' : 'Very High Yield'}
                        </span></p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategies">
          <Card>
            <CardHeader>
              <CardTitle>Dividend Investment Strategies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Core Dividend Strategies</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-blue-600">Dividend Growth Investing</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Focus on companies that consistently increase their dividend payments over time, providing inflation protection and growing income.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-green-600">High-Yield Strategy</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Target stocks with high current yields for immediate income, but be cautious of sustainability and company health.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-purple-600">Dividend Aristocrats</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Invest in S&P 500 companies that have increased dividends for 25+ consecutive years, showing consistent performance.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-orange-600">DRIP Strategy</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Use Dividend Reinvestment Plans to automatically reinvest dividends, compounding returns over time.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Portfolio Allocation</h3>
                <div className="space-y-3">
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-semibold">Conservative (Age 60+)</h4>
                    <p className="text-sm text-gray-600">60-70% dividend stocks, focus on stability and income generation</p>
                  </div>
                  <div className="p-4 border-l-4 border-green-500 bg-green-50">
                    <h4 className="font-semibold">Moderate (Age 40-60)</h4>
                    <p className="text-sm text-gray-600">40-50% dividend stocks, balance between growth and income</p>
                  </div>
                  <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                    <h4 className="font-semibold">Aggressive (Age 20-40)</h4>
                    <p className="text-sm text-gray-600">20-30% dividend stocks, focus on dividend growth over current yield</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Risk Management</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">💡</span>
                    <span>Diversify across sectors to reduce concentration risk</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">💡</span>
                    <span>Monitor payout ratios to ensure dividend sustainability</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">💡</span>
                    <span>Consider international dividend stocks for geographic diversification</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">💡</span>
                    <span>Avoid chasing extremely high yields without fundamental analysis</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stocks">
          <Card>
            <CardHeader>
              <CardTitle>Popular Dividend Stock Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Dividend Aristocrats (Examples)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-blue-600">Consumer Staples</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Coca-Cola (KO) - 61 years of increases</li>
                      <li>• Procter & Gamble (PG) - 67 years</li>
                      <li>• Walmart (WMT) - 49 years</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-green-600">Industrials</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• 3M Company (MMM) - 65 years</li>
                      <li>• Caterpillar (CAT) - 29 years</li>
                      <li>• Emerson Electric (EMR) - 66 years</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-purple-600">Healthcare</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Johnson & Johnson (JNJ) - 61 years</li>
                      <li>• Abbott Laboratories (ABT) - 51 years</li>
                      <li>• Medtronic (MDT) - 46 years</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-orange-600">Utilities</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• NextEra Energy (NEE) - 28 years</li>
                      <li>• Consolidated Edison (ED) - 49 years</li>
                      <li>• American Water Works (AWK) - 13 years</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">High-Yield Sectors</h3>
                <div className="space-y-3">
                  <div className="p-4 border-l-4 border-red-500 bg-red-50">
                    <h4 className="font-semibold">REITs (Real Estate Investment Trusts)</h4>
                    <p className="text-sm text-gray-600">Typically yield 3-8%, required to distribute 90% of income</p>
                  </div>
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-semibold">Utilities</h4>
                    <p className="text-sm text-gray-600">Stable yields 3-5%, regulated businesses with predictable cash flows</p>
                  </div>
                  <div className="p-4 border-l-4 border-green-500 bg-green-50">
                    <h4 className="font-semibold">Energy MLPs</h4>
                    <p className="text-sm text-gray-600">High yields 6-10%, but tax complexity and commodity exposure</p>
                  </div>
                  <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                    <h4 className="font-semibold">Telecom</h4>
                    <p className="text-sm text-gray-600">Yields 4-7%, mature businesses with steady cash generation</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Disclaimer</h4>
                <p className="text-sm text-yellow-700">
                  This information is for educational purposes only and should not be considered investment advice. 
                  Always conduct your own research and consider consulting with a financial advisor before making investment decisions.
                  Past performance does not guarantee future results.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
