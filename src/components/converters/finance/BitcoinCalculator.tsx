'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BitcoinResults {
  finalValue: number;
  totalInvestment: number;
  totalGains: number;
  totalBitcoin: number;
  averageCost: number;
  annualizedReturn: number;
  volatilityRisk: string;
}

export default function BitcoinCalculator() {
  const [initialInvestment, setInitialInvestment] = useState<string>('5000');
  const [monthlyInvestment, setMonthlyInvestment] = useState<string>('200');
  const [currentPrice, setCurrentPrice] = useState<string>('45000');
  const [expectedReturn, setExpectedReturn] = useState<string>('15');
  const [investmentPeriod, setInvestmentPeriod] = useState<string>('5');
  const [strategy, setStrategy] = useState<string>('dca');
  const [results, setResults] = useState<BitcoinResults | null>(null);

  const strategies = {
    'dca': 'Dollar Cost Averaging',
    'lump-sum': 'Lump Sum Investment',
    'buy-dips': 'Buy the Dips Strategy'
  };

  const calculateBitcoin = () => {
    const initial = parseFloat(initialInvestment);
    const monthly = parseFloat(monthlyInvestment);
    const price = parseFloat(currentPrice);
    const returnRate = parseFloat(expectedReturn) / 100;
    const years = parseFloat(investmentPeriod);

    if (initial < 0 || monthly < 0 || price <= 0 || years <= 0) return;

    const monthlyReturn = returnRate / 12;
    const months = years * 12;

    let futureValue: number;
    let totalInvestment: number;
    let totalBitcoin: number;

    if (strategy === 'lump-sum') {
      // Lump sum investment
      totalInvestment = initial;
      futureValue = initial * Math.pow(1 + returnRate, years);
      totalBitcoin = initial / price;
    } else {
      // DCA strategy
      totalInvestment = initial + (monthly * months);
      
      // Initial investment growth
      const initialGrowth = initial * Math.pow(1 + monthlyReturn, months);
      
      // Monthly investments with compound growth
      const monthlyGrowth = monthly * (Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn;
      
      futureValue = initialGrowth + monthlyGrowth;
      
      // Calculate total Bitcoin accumulated (simplified)
      const initialBitcoin = initial / price;
      const monthlyBitcoin = (monthly * months) / price; // Simplified average
      totalBitcoin = initialBitcoin + monthlyBitcoin;
    }

    const totalGains = futureValue - totalInvestment;
    const averageCost = totalInvestment / totalBitcoin;
    const annualizedReturn = Math.pow(futureValue / totalInvestment, 1/years) - 1;

    // Volatility assessment based on expected return
    let volatilityRisk: string;
    if (returnRate > 0.3) volatilityRisk = 'Extremely High';
    else if (returnRate > 0.2) volatilityRisk = 'Very High';
    else if (returnRate > 0.1) volatilityRisk = 'High';
    else if (returnRate > 0.05) volatilityRisk = 'Moderate';
    else volatilityRisk = 'Low';

    const calculatedResults: BitcoinResults = {
      finalValue: futureValue,
      totalInvestment: totalInvestment,
      totalGains: totalGains,
      totalBitcoin: totalBitcoin,
      averageCost: averageCost,
      annualizedReturn: annualizedReturn * 100,
      volatilityRisk: volatilityRisk
    };

    setResults(calculatedResults);
  };

  useEffect(() => {
    calculateBitcoin();
  }, [initialInvestment, monthlyInvestment, currentPrice, expectedReturn, investmentPeriod, strategy]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatBitcoin = (amount: number) => {
    return `${amount.toFixed(6)} BTC`;
  };

  const formatPercent = (percent: number) => {
    return `${percent.toFixed(2)}%`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Bitcoin Calculator</h1>
        <p className="text-lg text-gray-600">
          Calculate potential Bitcoin investment returns and analyze different cryptocurrency investment strategies.
        </p>
      </div>

      <Tabs defaultValue="calculator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="risks">Risks & Considerations</TabsTrigger>
          <TabsTrigger value="education">Bitcoin Basics</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Bitcoin Investment Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="strategy">Investment Strategy</Label>
                  <Select value={strategy} onValueChange={setStrategy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(strategies).map(([value, label]) => (
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
                    placeholder="5000"
                  />
                </div>

                {strategy !== 'lump-sum' && (
                  <div>
                    <Label htmlFor="monthlyInvestment">Monthly Investment ($)</Label>
                    <Input
                      id="monthlyInvestment"
                      type="number"
                      value={monthlyInvestment}
                      onChange={(e) => setMonthlyInvestment(e.target.value)}
                      placeholder="200"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="currentPrice">Current Bitcoin Price ($)</Label>
                  <Input
                    id="currentPrice"
                    type="number"
                    value={currentPrice}
                    onChange={(e) => setCurrentPrice(e.target.value)}
                    placeholder="45000"
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
                    placeholder="15"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Bitcoin is highly volatile. Historical returns vary widely.
                  </p>
                </div>

                <div>
                  <Label htmlFor="investmentPeriod">Investment Period (Years)</Label>
                  <Input
                    id="investmentPeriod"
                    type="number"
                    value={investmentPeriod}
                    onChange={(e) => setInvestmentPeriod(e.target.value)}
                    placeholder="5"
                  />
                </div>
              </CardContent>
            </Card>

            {results && (
              <Card>
                <CardHeader>
                  <CardTitle>Bitcoin Investment Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {formatCurrency(results.finalValue)}
                      </div>
                      <div className="text-sm text-gray-600">Projected Portfolio Value</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatBitcoin(results.totalBitcoin)}
                      </div>
                      <div className="text-sm text-gray-600">Total Bitcoin Holdings</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Investment:</span>
                      <span className="font-semibold">{formatCurrency(results.totalInvestment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Gains:</span>
                      <span className={`font-semibold ${results.totalGains >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(results.totalGains)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Cost per BTC:</span>
                      <span className="font-semibold text-blue-600">{formatCurrency(results.averageCost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annualized Return:</span>
                      <span className="font-semibold text-purple-600">{formatPercent(results.annualizedReturn)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Volatility Risk:</span>
                      <span className={`font-semibold ${
                        results.volatilityRisk === 'Extremely High' ? 'text-red-600' :
                        results.volatilityRisk === 'Very High' ? 'text-orange-600' :
                        results.volatilityRisk === 'High' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {results.volatilityRisk}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-sm text-yellow-800">
                      ⚠️ Bitcoin is highly speculative and volatile. Past performance does not guarantee future results.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="strategies">
          <Card>
            <CardHeader>
              <CardTitle>Bitcoin Investment Strategies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Popular Bitcoin Strategies</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-blue-600">Dollar Cost Averaging (DCA)</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Invest a fixed amount regularly regardless of price. Reduces impact of volatility and timing risk.
                    </p>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Reduces average cost over time</li>
                      <li>• Minimizes emotional decision making</li>
                      <li>• Good for beginners</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-green-600">HODLing</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      "Hold On for Dear Life" - Buy and hold for long-term appreciation, ignoring short-term volatility.
                    </p>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Long-term investment approach</li>
                      <li>• Minimal trading fees</li>
                      <li>• Requires strong conviction</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-purple-600">Buy the Dips</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Purchase more Bitcoin during significant price declines to lower average cost basis.
                    </p>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Requires market timing skills</li>
                      <li>• Can be emotionally challenging</li>
                      <li>• Higher risk/reward potential</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-orange-600">Portfolio Allocation</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Allocate a small percentage (1-5%) of total portfolio to Bitcoin as alternative investment.
                    </p>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Risk management approach</li>
                      <li>• Diversification benefits</li>
                      <li>• Conservative exposure</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Risk Management</h3>
                <div className="space-y-3">
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-semibold">Never Invest More Than You Can Afford to Lose</h4>
                    <p className="text-sm text-gray-600">Bitcoin can lose 50-80% of its value in bear markets</p>
                  </div>
                  <div className="p-4 border-l-4 border-green-500 bg-green-50">
                    <h4 className="font-semibold">Diversify Your Cryptocurrency Holdings</h4>
                    <p className="text-sm text-gray-600">Consider other cryptocurrencies and traditional assets</p>
                  </div>
                  <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                    <h4 className="font-semibold">Secure Storage is Critical</h4>
                    <p className="text-sm text-gray-600">Use hardware wallets for long-term storage</p>
                  </div>
                  <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
                    <h4 className="font-semibold">Stay Informed About Regulations</h4>
                    <p className="text-sm text-gray-600">Government policies can significantly impact prices</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks">
          <Card>
            <CardHeader>
              <CardTitle>Bitcoin Risks & Considerations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Major Risk Factors</h3>
                <div className="space-y-3">
                  <div className="p-4 border-l-4 border-red-500 bg-red-50">
                    <h4 className="font-semibold">Extreme Volatility</h4>
                    <p className="text-sm text-gray-600">Bitcoin can experience 20-50% price swings in days or weeks</p>
                  </div>
                  <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
                    <h4 className="font-semibold">Regulatory Risk</h4>
                    <p className="text-sm text-gray-600">Government bans or restrictions can severely impact value</p>
                  </div>
                  <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
                    <h4 className="font-semibold">Technology Risk</h4>
                    <p className="text-sm text-gray-600">Potential technical issues, forks, or security vulnerabilities</p>
                  </div>
                  <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                    <h4 className="font-semibold">Market Manipulation</h4>
                    <p className="text-sm text-gray-600">Large holders ("whales") can influence prices significantly</p>
                  </div>
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-semibold">Environmental Concerns</h4>
                    <p className="text-sm text-gray-600">Energy consumption and environmental impact criticism</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Tax Implications</h3>
                <div className="p-4 border rounded-lg">
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">💡</span>
                      <span>Bitcoin is treated as property by the IRS, not currency</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">💡</span>
                      <span>Every sale or exchange is a taxable event</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">💡</span>
                      <span>Capital gains tax applies to profits from sales</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">💡</span>
                      <span>Keep detailed records of all transactions</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Security Best Practices</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-green-600">Storage Options</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Hardware wallets (most secure)</li>
                      <li>• Software wallets (convenient)</li>
                      <li>• Paper wallets (offline storage)</li>
                      <li>• Exchange wallets (least secure)</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-orange-600">Security Tips</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• Use strong, unique passwords</li>
                      <li>• Enable two-factor authentication</li>
                      <li>• Backup your private keys</li>
                      <li>• Beware of phishing attempts</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle>Bitcoin Basics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">What is Bitcoin?</h3>
                <div className="p-4 border rounded-lg">
                  <p className="text-gray-700 mb-3">
                    Bitcoin is a decentralized digital currency created in 2009 by an anonymous person or group known as Satoshi Nakamoto. 
                    It operates on a peer-to-peer network without the need for intermediaries like banks.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• First and largest cryptocurrency by market cap</li>
                    <li>• Limited supply of 21 million coins</li>
                    <li>• Transactions recorded on a public blockchain</li>
                    <li>• Secured by cryptographic proof-of-work</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-blue-600">Decentralization</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      No central authority controls Bitcoin. The network is maintained by thousands of nodes worldwide.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-green-600">Scarcity</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Only 21 million Bitcoin will ever exist, making it deflationary by design.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-purple-600">Transparency</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      All transactions are publicly visible on the blockchain, ensuring transparency.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-orange-600">Portability</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Bitcoin can be sent anywhere in the world quickly and with relatively low fees.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Investment Thesis</h3>
                <div className="space-y-3">
                  <div className="p-4 border-l-4 border-green-500 bg-green-50">
                    <h4 className="font-semibold">Digital Gold</h4>
                    <p className="text-sm text-gray-600">Store of value and hedge against inflation and currency debasement</p>
                  </div>
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-semibold">Network Effects</h4>
                    <p className="text-sm text-gray-600">Growing adoption increases utility and value of the network</p>
                  </div>
                  <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                    <h4 className="font-semibold">Institutional Adoption</h4>
                    <p className="text-sm text-gray-600">Increasing acceptance by corporations and financial institutions</p>
                  </div>
                  <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
                    <h4 className="font-semibold">Financial Inclusion</h4>
                    <p className="text-sm text-gray-600">Provides financial services to unbanked populations globally</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">⚠️ Important Disclaimer</h4>
                <p className="text-sm text-red-700">
                  This calculator is for educational purposes only. Bitcoin investment carries significant risks including 
                  total loss of capital. Cryptocurrency markets are highly volatile and unpredictable. 
                  Always do your own research and consider consulting with a financial advisor before investing.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
