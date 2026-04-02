'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MutualFundResults {
  finalValue: number;
  totalInvestment: number;
  totalGains: number;
  totalFees: number;
  netReturn: number;
  annualizedReturn: number;
  totalShares: number;
  averageCost: number;
}

export default function MutualFundCalculator() {
  const [initialInvestment, setInitialInvestment] = useState<string>('10000');
  const [monthlyInvestment, setMonthlyInvestment] = useState<string>('500');
  const [expectedReturn, setExpectedReturn] = useState<string>('8');
  const [expenseRatio, setExpenseRatio] = useState<string>('0.75');
  const [frontEndLoad, setFrontEndLoad] = useState<string>('0');
  const [backEndLoad, setBackEndLoad] = useState<string>('0');
  const [investmentPeriod, setInvestmentPeriod] = useState<string>('10');
  const [fundType, setFundType] = useState<string>('equity');
  const [results, setResults] = useState<MutualFundResults | null>(null);

  const fundTypes = {
    'equity': 'Equity Fund',
    'bond': 'Bond Fund',
    'balanced': 'Balanced Fund',
    'index': 'Index Fund',
    'sector': 'Sector Fund',
    'international': 'International Fund'
  };

  const calculateMutualFund = useCallback(() => {
    const initial = parseFloat(initialInvestment);
    const monthly = parseFloat(monthlyInvestment);
    const returnRate = parseFloat(expectedReturn) / 100;
    const expenseRate = parseFloat(expenseRatio) / 100;
    const frontLoad = parseFloat(frontEndLoad) / 100;
    const backLoad = parseFloat(backEndLoad) / 100;
    const years = parseFloat(investmentPeriod);

    if (initial < 0 || monthly < 0 || returnRate < 0 || years <= 0) return;

    // Adjust for front-end load
    const netInitial = initial * (1 - frontLoad);
    const netMonthly = monthly * (1 - frontLoad);

    // Net return after expense ratio
    const netReturn = returnRate - expenseRate;
    const monthlyReturn = netReturn / 12;
    const months = years * 12;

    // Calculate future value with compound interest
    let futureValue = netInitial * Math.pow(1 + monthlyReturn, months);
    
    // Add monthly investments
    if (netMonthly > 0) {
      const monthlyFV = netMonthly * (Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn;
      futureValue += monthlyFV;
    }

    // Calculate total fees
    const totalInvestment = initial + (monthly * months);
    const totalFrontEndFees = (initial * frontLoad) + (monthly * months * frontLoad);
    const totalExpenseFees = futureValue * expenseRate * years; // Simplified calculation
    const totalBackEndFees = futureValue * backLoad;
    const totalFees = totalFrontEndFees + totalExpenseFees + totalBackEndFees;

    // Adjust for back-end load
    const finalValue = futureValue * (1 - backLoad);
    const totalGains = finalValue - (totalInvestment - totalFrontEndFees);
    const annualizedReturn = Math.pow(finalValue / (totalInvestment - totalFrontEndFees), 1/years) - 1;

    // Estimate shares and average cost (simplified)
    const averageNAV = 25; // Assumed average NAV for calculation
    const totalShares = (netInitial + netMonthly * months) / averageNAV;
    const averageCost = (totalInvestment - totalFrontEndFees) / totalShares;

    const calculatedResults: MutualFundResults = {
      finalValue: finalValue,
      totalInvestment: totalInvestment,
      totalGains: totalGains,
      totalFees: totalFees,
      netReturn: netReturn * 100,
      annualizedReturn: annualizedReturn * 100,
      totalShares: totalShares,
      averageCost: averageCost
    };

    setResults(calculatedResults);
  }, [initialInvestment, monthlyInvestment, expectedReturn, expenseRatio, frontEndLoad, backEndLoad, investmentPeriod]);

  useEffect(() => {
    calculateMutualFund();
  }, [calculateMutualFund]);

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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Mutual Fund Calculator</h1>
        <p className="text-lg text-gray-600">
          Calculate mutual fund returns, fees impact, and investment growth over time with various fund types.
        </p>
      </div>

      <Tabs defaultValue="calculator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="analysis">Fee Analysis</TabsTrigger>
          <TabsTrigger value="types">Fund Types</TabsTrigger>
          <TabsTrigger value="selection">Fund Selection</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mutual Fund Investment Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="fundType">Fund Type</Label>
                  <Select value={fundType} onValueChange={setFundType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(fundTypes).map(([value, label]) => (
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

                <div>
                  <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                  <Input
                    id="expectedReturn"
                    type="number"
                    step="0.1"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(e.target.value)}
                    placeholder="8"
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
                    placeholder="0.75"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="frontEndLoad">Front-End Load (%)</Label>
                    <Input
                      id="frontEndLoad"
                      type="number"
                      step="0.1"
                      value={frontEndLoad}
                      onChange={(e) => setFrontEndLoad(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="backEndLoad">Back-End Load (%)</Label>
                    <Input
                      id="backEndLoad"
                      type="number"
                      step="0.1"
                      value={backEndLoad}
                      onChange={(e) => setBackEndLoad(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="investmentPeriod">Investment Period (Years)</Label>
                  <Input
                    id="investmentPeriod"
                    type="number"
                    value={investmentPeriod}
                    onChange={(e) => setInvestmentPeriod(e.target.value)}
                    placeholder="10"
                  />
                </div>
              </CardContent>
            </Card>

            {results && (
              <Card>
                <CardHeader>
                  <CardTitle>Investment Results</CardTitle>
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
                      <span>Total Fees:</span>
                      <span className="font-semibold text-red-600">{formatCurrency(results.totalFees)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Net Return Rate:</span>
                      <span className="font-semibold text-blue-600">{formatPercent(results.netReturn)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Shares:</span>
                      <span className="font-semibold">{results.totalShares.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Cost per Share:</span>
                      <span className="font-semibold">{formatCurrency(results.averageCost)}</span>
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
              <CardTitle>Fee Impact Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Fee Breakdown</h3>
                {results && (
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-red-600">Front-End Load</h4>
                      <p className="text-2xl font-bold">{formatPercent(parseFloat(frontEndLoad))}</p>
                      <p className="text-sm text-gray-600">Charged when you buy</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-orange-600">Expense Ratio</h4>
                      <p className="text-2xl font-bold">{formatPercent(parseFloat(expenseRatio))}</p>
                      <p className="text-sm text-gray-600">Annual management fee</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-purple-600">Back-End Load</h4>
                      <p className="text-2xl font-bold">{formatPercent(parseFloat(backEndLoad))}</p>
                      <p className="text-sm text-gray-600">Charged when you sell</p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Expense Ratio Comparison</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                    <span>Low Cost (Index Funds)</span>
                    <span className="font-semibold">0.03% - 0.20%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                    <span>Moderate Cost (Active Funds)</span>
                    <span className="font-semibold">0.50% - 1.00%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                    <span>High Cost (Specialty Funds)</span>
                    <span className="font-semibold">1.00% - 2.00%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                    <span>Very High Cost</span>
                    <span className="font-semibold">2.00%+</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Fee Impact Over Time</h3>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">
                    A 1% difference in annual fees can significantly impact long-term returns:
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Over 10 years: ~10% difference in final value</li>
                    <li>• Over 20 years: ~22% difference in final value</li>
                    <li>• Over 30 years: ~35% difference in final value</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="types">
          <Card>
            <CardHeader>
              <CardTitle>Types of Mutual Funds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-600 mb-3">Equity Funds</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Higher growth potential</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Higher volatility and risk</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">ℹ</span>
                      <span>Best for long-term goals (5+ years)</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold text-green-600 mb-3">Bond Funds</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Regular income generation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Lower volatility than stocks</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Interest rate sensitivity</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">Balanced Funds</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Diversified asset allocation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Professional rebalancing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">ℹ</span>
                      <span>Moderate risk and return</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-600 mb-3">Index Funds</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Low expense ratios</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Broad market exposure</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">ℹ</span>
                      <span>Tracks market performance</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Active vs Passive Management</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-semibold">Active Management</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Fund manager makes investment decisions</li>
                      <li>• Attempts to outperform market</li>
                      <li>• Higher fees (0.5% - 2.0%)</li>
                      <li>• More research and analysis</li>
                    </ul>
                  </div>
                  <div className="p-4 border-l-4 border-green-500 bg-green-50">
                    <h4 className="font-semibold">Passive Management (Index)</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Tracks a specific index</li>
                      <li>• Matches market performance</li>
                      <li>• Lower fees (0.03% - 0.20%)</li>
                      <li>• Minimal trading and turnover</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="selection">
          <Card>
            <CardHeader>
              <CardTitle>Mutual Fund Selection Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Key Selection Criteria</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-blue-600">Performance History</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• 3, 5, and 10-year returns</li>
                      <li>• Consistency across market cycles</li>
                      <li>• Risk-adjusted returns (Sharpe ratio)</li>
                      <li>• Performance vs benchmark</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-green-600">Fees and Expenses</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Expense ratio</li>
                      <li>• Load fees (front/back-end)</li>
                      <li>• 12b-1 marketing fees</li>
                      <li>• Transaction costs</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-purple-600">Fund Management</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Manager experience and tenure</li>
                      <li>• Investment philosophy</li>
                      <li>• Fund company reputation</li>
                      <li>• Assets under management</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-orange-600">Portfolio Fit</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Asset allocation alignment</li>
                      <li>• Risk tolerance match</li>
                      <li>• Time horizon suitability</li>
                      <li>• Diversification benefits</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Red Flags to Avoid</h3>
                <div className="space-y-3">
                  <div className="p-4 border-l-4 border-red-500 bg-red-50">
                    <h4 className="font-semibold">High Fees Without Justification</h4>
                    <p className="text-sm text-gray-600">Expense ratios above 1.5% for most fund types</p>
                  </div>
                  <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
                    <h4 className="font-semibold">Frequent Manager Changes</h4>
                    <p className="text-sm text-gray-600">Multiple manager changes in recent years</p>
                  </div>
                  <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
                    <h4 className="font-semibold">Consistently Poor Performance</h4>
                    <p className="text-sm text-gray-600">Underperforming benchmark for 3+ years</p>
                  </div>
                  <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                    <h4 className="font-semibold">Style Drift</h4>
                    <p className="text-sm text-gray-600">Fund deviating from stated investment objective</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Research Resources</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">💡</span>
                    <span>Morningstar.com - Fund ratings and analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">💡</span>
                    <span>Fund prospectus - Official fund documentation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">💡</span>
                    <span>Annual/semi-annual reports - Detailed performance data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">💡</span>
                    <span>Broker research - Professional analysis and recommendations</span>
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
