'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StockResults {
  totalValue: number;
  totalGain: number;
  percentageGain: number;
  dividendIncome: number;
  totalReturn: number;
  annualizedReturn: number;
  breakEvenPrice: number;
}

export default function StockCalculator() {
  const [shares, setShares] = useState<string>('100');
  const [purchasePrice, setPurchasePrice] = useState<string>('50');
  const [currentPrice, setCurrentPrice] = useState<string>('65');
  const [dividendPerShare, setDividendPerShare] = useState<string>('2.50');
  const [holdingPeriod, setHoldingPeriod] = useState<string>('2');
  const [commissionBuy, setCommissionBuy] = useState<string>('0');
  const [commissionSell, setCommissionSell] = useState<string>('0');
  const [results, setResults] = useState<StockResults | null>(null);

  const calculateStock = () => {
    const numShares = parseFloat(shares);
    const buyPrice = parseFloat(purchasePrice);
    const sellPrice = parseFloat(currentPrice);
    const dividend = parseFloat(dividendPerShare);
    const years = parseFloat(holdingPeriod);
    const buyCommission = parseFloat(commissionBuy);
    const sellCommission = parseFloat(commissionSell);
    
    if (numShares <= 0 || buyPrice <= 0 || years <= 0) return;

    const totalCost = (numShares * buyPrice) + buyCommission;
    const totalValue = (numShares * sellPrice) - sellCommission;
    const capitalGain = totalValue - totalCost;
    
    const dividendIncome = numShares * dividend * years;
    const totalGain = capitalGain + dividendIncome;
    const totalReturn = totalGain / totalCost;
    const percentageGain = (capitalGain / totalCost) * 100;
    
    // Annualized return calculation
    const annualizedReturn = Math.pow(1 + totalReturn, 1/years) - 1;
    
    // Break-even price (including commissions and dividends)
    const breakEvenPrice = (totalCost + sellCommission - dividendIncome) / numShares;

    setResults({
      totalValue,
      totalGain: capitalGain,
      percentageGain,
      dividendIncome,
      totalReturn: totalReturn * 100,
      annualizedReturn: annualizedReturn * 100,
      breakEvenPrice
    });
  };

  useEffect(() => {
    calculateStock();
  }, [shares, purchasePrice, currentPrice, dividendPerShare, holdingPeriod, commissionBuy, commissionSell]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercent = (rate: number) => {
    return rate.toFixed(2) + '%';
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📈 Stock Investment Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="analysis">Investment Analysis</TabsTrigger>
              <TabsTrigger value="strategies">Investment Strategies</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="shares">Number of Shares</Label>
                    <Input
                      id="shares"
                      type="number"
                      value={shares}
                      onChange={(e) => setShares(e.target.value)}
                      placeholder="Enter number of shares"
                    />
                  </div>

                  <div>
                    <Label htmlFor="purchasePrice">Purchase Price per Share</Label>
                    <Input
                      id="purchasePrice"
                      type="number"
                      step="0.01"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(e.target.value)}
                      placeholder="Enter purchase price"
                    />
                  </div>

                  <div>
                    <Label htmlFor="currentPrice">Current/Sell Price per Share</Label>
                    <Input
                      id="currentPrice"
                      type="number"
                      step="0.01"
                      value={currentPrice}
                      onChange={(e) => setCurrentPrice(e.target.value)}
                      placeholder="Enter current price"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dividendPerShare">Annual Dividend per Share</Label>
                    <Input
                      id="dividendPerShare"
                      type="number"
                      step="0.01"
                      value={dividendPerShare}
                      onChange={(e) => setDividendPerShare(e.target.value)}
                      placeholder="Enter annual dividend"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="holdingPeriod">Holding Period (years)</Label>
                    <Input
                      id="holdingPeriod"
                      type="number"
                      step="0.1"
                      value={holdingPeriod}
                      onChange={(e) => setHoldingPeriod(e.target.value)}
                      placeholder="Enter holding period"
                    />
                  </div>

                  <div>
                    <Label htmlFor="commissionBuy">Buy Commission</Label>
                    <Input
                      id="commissionBuy"
                      type="number"
                      step="0.01"
                      value={commissionBuy}
                      onChange={(e) => setCommissionBuy(e.target.value)}
                      placeholder="Enter buy commission"
                    />
                  </div>

                  <div>
                    <Label htmlFor="commissionSell">Sell Commission</Label>
                    <Input
                      id="commissionSell"
                      type="number"
                      step="0.01"
                      value={commissionSell}
                      onChange={(e) => setCommissionSell(e.target.value)}
                      placeholder="Enter sell commission"
                    />
                  </div>

                  {results && (
                    <Card className={`${results.totalGain >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                      <CardHeader>
                        <CardTitle className={`text-sm ${results.totalGain >= 0 ? 'text-green-800' : 'text-red-800'}`}>
                          Investment Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Total Value:</span>
                            <span className="font-semibold">{formatCurrency(results.totalValue)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Capital Gain/Loss:</span>
                            <span className={`font-semibold ${results.totalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {results.totalGain >= 0 ? '+' : ''}{formatCurrency(results.totalGain)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Dividend Income:</span>
                            <span className="font-semibold text-blue-600">{formatCurrency(results.dividendIncome)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Return:</span>
                            <span className={`font-semibold ${results.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatPercent(results.totalReturn)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Annualized Return:</span>
                            <span className={`font-semibold ${results.annualizedReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatPercent(results.annualizedReturn)}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {results && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Break-Even Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-lg font-semibold">Break-Even Price: {formatCurrency(results.breakEvenPrice)}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Stock needs to reach this price to cover all costs and dividends
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">Key Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📊 <strong>P/E Ratio:</strong> Price-to-earnings multiple</div>
                      <div>💰 <strong>Dividend Yield:</strong> Annual dividend ÷ stock price</div>
                      <div>📈 <strong>EPS Growth:</strong> Earnings per share growth rate</div>
                      <div>🏦 <strong>ROE:</strong> Return on equity</div>
                      <div>💵 <strong>Free Cash Flow:</strong> Cash after expenses</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Risk Factors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📉 <strong>Market Risk:</strong> Overall market volatility</div>
                      <div>🏢 <strong>Company Risk:</strong> Business-specific factors</div>
                      <div>🏭 <strong>Sector Risk:</strong> Industry-wide challenges</div>
                      <div>💱 <strong>Currency Risk:</strong> For international stocks</div>
                      <div>💧 <strong>Liquidity Risk:</strong> Ability to sell quickly</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Valuation Methods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>💰 <strong>DCF:</strong> Discounted cash flow analysis</div>
                      <div>📊 <strong>Comparable Analysis:</strong> Peer comparison</div>
                      <div>📈 <strong>PEG Ratio:</strong> P/E relative to growth</div>
                      <div>📋 <strong>Book Value:</strong> Net asset value</div>
                      <div>🎯 <strong>Price Targets:</strong> Analyst projections</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-800 text-sm">Tax Considerations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📅 <strong>Holding Period:</strong> Long vs short-term gains</div>
                      <div>💰 <strong>Tax Rates:</strong> Capital gains vs ordinary income</div>
                      <div>📋 <strong>Tax-Loss Harvesting:</strong> Offset gains with losses</div>
                      <div>🏦 <strong>Qualified Dividends:</strong> Preferential tax treatment</div>
                      <div>📊 <strong>Wash Sale Rule:</strong> 30-day repurchase restriction</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="strategies" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">Value Investing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🎯 Buy undervalued companies</div>
                      <div>📊 Focus on fundamentals</div>
                      <div>⏰ Long-term holding period</div>
                      <div>💰 Margin of safety principle</div>
                      <div>📈 Contrarian approach</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Growth Investing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🚀 High-growth companies</div>
                      <div>📈 Revenue and earnings growth</div>
                      <div>💡 Innovation and disruption</div>
                      <div>🎯 Higher P/E ratios acceptable</div>
                      <div>⚡ Momentum-driven</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Dividend Investing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>💰 Regular income stream</div>
                      <div>🏦 Mature, stable companies</div>
                      <div>📈 Dividend growth history</div>
                      <div>🛡️ Lower volatility</div>
                      <div>🔄 Reinvestment opportunities</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800 text-sm">Risk Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🎯 Diversification across sectors</div>
                      <div>📊 Position sizing limits</div>
                      <div>🛑 Stop-loss orders</div>
                      <div>📋 Regular portfolio review</div>
                      <div>⚖️ Risk-reward assessment</div>
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
