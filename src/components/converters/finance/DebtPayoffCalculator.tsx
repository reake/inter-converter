'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Debt {
  id: string;
  name: string;
  balance: number;
  minPayment: number;
  apr: number;
}

interface PayoffResults {
  snowballResults: {
    totalTime: number;
    totalInterest: number;
    payoffOrder: string[];
  };
  avalancheResults: {
    totalTime: number;
    totalInterest: number;
    payoffOrder: string[];
  };
  savings: number;
  timeDifference: number;
}

export default function DebtPayoffCalculator() {
  const [debts, setDebts] = useState<Debt[]>([
    { id: '1', name: 'Credit Card 1', balance: 5000, minPayment: 150, apr: 18.99 },
    { id: '2', name: 'Credit Card 2', balance: 3000, minPayment: 90, apr: 22.99 },
    { id: '3', name: 'Personal Loan', balance: 8000, minPayment: 250, apr: 12.5 }
  ]);
  const [extraPayment, setExtraPayment] = useState<string>('100');
  const [results, setResults] = useState<PayoffResults | null>(null);

  const calculatePayoff = useCallback(() => {
    const extra = parseFloat(extraPayment) || 0;
    
    if (debts.length === 0) return;

    // Calculate snowball method (lowest balance first)
    const snowballDebts = [...debts].sort((a, b) => a.balance - b.balance);
    const snowballResults = simulatePayoff(snowballDebts, extra);

    // Calculate avalanche method (highest APR first)
    const avalancheDebts = [...debts].sort((a, b) => b.apr - a.apr);
    const avalancheResults = simulatePayoff(avalancheDebts, extra);

    const savings = snowballResults.totalInterest - avalancheResults.totalInterest;
    const timeDifference = snowballResults.totalTime - avalancheResults.totalTime;

    setResults({
      snowballResults,
      avalancheResults,
      savings,
      timeDifference
    });
  }, [debts, extraPayment]);

  const simulatePayoff = (sortedDebts: Debt[], extraPayment: number) => {
    let debtsRemaining = sortedDebts.map(debt => ({ ...debt }));
    let totalInterest = 0;
    let month = 0;
    const payoffOrder: string[] = [];
    let availableExtra = extraPayment;

    while (debtsRemaining.length > 0 && month < 600) {
      month++;
      
      // Apply interest to all debts
      debtsRemaining.forEach(debt => {
        const monthlyInterest = (debt.balance * debt.apr / 100) / 12;
        debt.balance += monthlyInterest;
        totalInterest += monthlyInterest;
      });

      // Make minimum payments on all debts
      debtsRemaining.forEach(debt => {
        const payment = Math.min(debt.minPayment, debt.balance);
        debt.balance -= payment;
      });

      // Apply extra payment to first debt (sorted by strategy)
      if (availableExtra > 0 && debtsRemaining.length > 0) {
        const targetDebt = debtsRemaining[0];
        const extraApplied = Math.min(availableExtra, targetDebt.balance);
        targetDebt.balance -= extraApplied;
      }

      // Remove paid-off debts and add their minimum payments to extra
      debtsRemaining = debtsRemaining.filter(debt => {
        if (debt.balance <= 0.01) {
          payoffOrder.push(debt.name);
          availableExtra += debt.minPayment;
          return false;
        }
        return true;
      });
    }

    return {
      totalTime: month,
      totalInterest,
      payoffOrder
    };
  };

  useEffect(() => {
    calculatePayoff();
  }, [calculatePayoff]);

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
    
    if (years === 0) return `${Math.round(months)} months`;
    if (remainingMonths === 0) return `${years} years`;
    return `${years} years, ${remainingMonths} months`;
  };

  const addDebt = () => {
    const newId = (debts.length + 1).toString();
    setDebts([...debts, {
      id: newId,
      name: `Debt ${newId}`,
      balance: 1000,
      minPayment: 50,
      apr: 15
    }]);
  };

  const removeDebt = (id: string) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  const updateDebt = (id: string, field: keyof Debt, value: string | number) => {
    setDebts(debts.map(debt => 
      debt.id === id ? { ...debt, [field]: value } : debt
    ));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            ❄️ Debt Payoff Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="strategies">Strategies</TabsTrigger>
              <TabsTrigger value="tips">Payoff Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Your Debts</h3>
                    <Button onClick={addDebt} size="sm">Add Debt</Button>
                  </div>
                  
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {debts.map((debt) => (
                      <Card key={debt.id} className="p-3">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Input
                              value={debt.name}
                              onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                              className="text-sm"
                              placeholder="Debt name"
                            />
                            {debts.length > 1 && (
                              <Button 
                                onClick={() => removeDebt(debt.id)} 
                                size="sm" 
                                variant="outline"
                                className="ml-2"
                              >
                                ×
                              </Button>
                            )}
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <Label className="text-xs">Balance</Label>
                              <Input
                                type="number"
                                value={debt.balance}
                                onChange={(e) => updateDebt(debt.id, 'balance', parseFloat(e.target.value) || 0)}
                                className="text-xs"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Min Payment</Label>
                              <Input
                                type="number"
                                value={debt.minPayment}
                                onChange={(e) => updateDebt(debt.id, 'minPayment', parseFloat(e.target.value) || 0)}
                                className="text-xs"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">APR (%)</Label>
                              <Input
                                type="number"
                                step="0.01"
                                value={debt.apr}
                                onChange={(e) => updateDebt(debt.id, 'apr', parseFloat(e.target.value) || 0)}
                                className="text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div>
                    <Label htmlFor="extraPayment">Extra Monthly Payment</Label>
                    <Input
                      id="extraPayment"
                      type="number"
                      value={extraPayment}
                      onChange={(e) => setExtraPayment(e.target.value)}
                      placeholder="Enter extra payment amount"
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      Additional amount beyond minimum payments
                    </div>
                  </div>

                  <Card className="bg-gray-50 border-gray-200">
                    <CardContent className="p-3">
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Total Debt:</span>
                          <span className="font-semibold">{formatCurrency(debts.reduce((sum, debt) => sum + debt.balance, 0))}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Min Payments:</span>
                          <span className="font-semibold">{formatCurrency(debts.reduce((sum, debt) => sum + debt.minPayment, 0))}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Monthly Payment:</span>
                          <span className="font-semibold">{formatCurrency(debts.reduce((sum, debt) => sum + debt.minPayment, 0) + parseFloat(extraPayment || '0'))}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  {results && (
                    <>
                      <Card className="bg-blue-50 border-blue-200">
                        <CardHeader>
                          <CardTitle className="text-blue-800 text-sm">🏔️ Debt Avalanche (Highest APR First)</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Payoff Time:</span>
                              <span className="font-semibold">{formatMonths(results.avalancheResults.totalTime)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Total Interest:</span>
                              <span className="font-semibold">{formatCurrency(results.avalancheResults.totalInterest)}</span>
                            </div>
                            <div className="text-xs text-gray-600 mt-2">
                              <strong>Payoff Order:</strong>
                              <div>{results.avalancheResults.payoffOrder.join(' → ')}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-green-50 border-green-200">
                        <CardHeader>
                          <CardTitle className="text-green-800 text-sm">❄️ Debt Snowball (Lowest Balance First)</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Payoff Time:</span>
                              <span className="font-semibold">{formatMonths(results.snowballResults.totalTime)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Total Interest:</span>
                              <span className="font-semibold">{formatCurrency(results.snowballResults.totalInterest)}</span>
                            </div>
                            <div className="text-xs text-gray-600 mt-2">
                              <strong>Payoff Order:</strong>
                              <div>{results.snowballResults.payoffOrder.join(' → ')}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className={`${results.savings > 0 ? 'bg-yellow-50 border-yellow-200' : 'bg-purple-50 border-purple-200'}`}>
                        <CardHeader>
                          <CardTitle className={`text-sm ${results.savings > 0 ? 'text-yellow-800' : 'text-purple-800'}`}>
                            💰 Comparison
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Interest Savings (Avalanche):</span>
                              <span className={`font-semibold ${results.savings > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {results.savings > 0 ? '+' : ''}{formatCurrency(results.savings)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Time Difference:</span>
                              <span className="font-semibold">
                                {results.timeDifference > 0 ? `+${formatMonths(results.timeDifference)}` : formatMonths(Math.abs(results.timeDifference))}
                              </span>
                            </div>
                            <div className="text-xs text-gray-600 mt-2">
                              {results.savings > 0 ? 
                                "Avalanche method saves more money but snowball provides quicker wins." :
                                "Snowball method costs slightly more but provides better motivation."
                              }
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="strategies" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">🏔️ Debt Avalanche</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📊 <strong>Strategy:</strong> Pay minimums on all debts, extra goes to highest APR</div>
                      <div>💰 <strong>Advantage:</strong> Saves the most money in interest</div>
                      <div>⏰ <strong>Timeline:</strong> Usually fastest payoff time</div>
                      <div>🧠 <strong>Psychology:</strong> Requires discipline and patience</div>
                      <div>🎯 <strong>Best for:</strong> People motivated by math and savings</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">❄️ Debt Snowball</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📊 <strong>Strategy:</strong> Pay minimums on all debts, extra goes to smallest balance</div>
                      <div>🏆 <strong>Advantage:</strong> Quick wins build momentum</div>
                      <div>💸 <strong>Cost:</strong> May pay slightly more interest</div>
                      <div>🧠 <strong>Psychology:</strong> Provides motivation and confidence</div>
                      <div>🎯 <strong>Best for:</strong> People who need psychological wins</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">🎯 Hybrid Approach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🔄 <strong>Strategy:</strong> Start with snowball, switch to avalanche</div>
                      <div>⚡ <strong>Quick Start:</strong> Pay off 1-2 small debts first</div>
                      <div>💰 <strong>Then Optimize:</strong> Switch to highest APR debts</div>
                      <div>🧠 <strong>Psychology:</strong> Best of both worlds</div>
                      <div>🎯 <strong>Best for:</strong> People who want motivation AND savings</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-800 text-sm">⚖️ Balance Transfer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>💳 <strong>Strategy:</strong> Move high-APR debt to 0% card</div>
                      <div>⏰ <strong>Timeline:</strong> Pay off during promotional period</div>
                      <div>💰 <strong>Savings:</strong> No interest during promo period</div>
                      <div>⚠️ <strong>Risk:</strong> High APR after promo ends</div>
                      <div>🎯 <strong>Best for:</strong> Good credit, disciplined payers</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tips" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">💰 Increase Payments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🎯 <strong>Round up payments:</strong> $187 → $200</div>
                      <div>💸 <strong>Use windfalls:</strong> Tax refunds, bonuses</div>
                      <div>📅 <strong>Bi-weekly payments:</strong> 26 payments = 13 months</div>
                      <div>💼 <strong>Side income:</strong> Gig work, selling items</div>
                      <div>📉 <strong>Cut expenses:</strong> Redirect savings to debt</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">📊 Track Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📱 <strong>Use apps:</strong> Debt tracking applications</div>
                      <div>📈 <strong>Visual progress:</strong> Charts and graphs</div>
                      <div>🏆 <strong>Celebrate milestones:</strong> Each debt paid off</div>
                      <div>📝 <strong>Monthly reviews:</strong> Adjust strategy as needed</div>
                      <div>🎯 <strong>Set goals:</strong> Specific payoff dates</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">🚫 Avoid New Debt</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✂️ <strong>Cut up cards:</strong> Remove temptation</div>
                      <div>💰 <strong>Emergency fund:</strong> $1,000 minimum</div>
                      <div>📋 <strong>Budget strictly:</strong> Track every expense</div>
                      <div>🛒 <strong>Cash only:</strong> For discretionary spending</div>
                      <div>🎯 <strong>Focus on needs:</strong> Delay wants until debt-free</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800 text-sm">⚠️ Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>❌ <strong>Only paying minimums:</strong> Takes decades</div>
                      <div>❌ <strong>Adding new debt:</strong> Defeats the purpose</div>
                      <div>❌ <strong>No emergency fund:</strong> Forces more debt</div>
                      <div>❌ <strong>Ignoring high APR:</strong> Costs thousands extra</div>
                      <div>❌ <strong>Giving up early:</strong> Consistency is key</div>
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
