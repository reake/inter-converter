'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Debt {
  id: string;
  name: string;
  balance: number;
  rate: number;
  minPayment: number;
}

interface ConsolidationResults {
  newLoanAmount: number;
  newMonthlyPayment: number;
  newPayoffTime: number;
  totalInterestNew: number;
  totalInterestOld: number;
  monthlySavings: number;
  totalSavings: number;
  payoffTimeDifference: number;
}

export default function ConsolidationLoanCalculator() {
  const [debts, setDebts] = useState<Debt[]>([
    { id: '1', name: 'Credit Card 1', balance: 5000, rate: 18.99, minPayment: 150 },
    { id: '2', name: 'Credit Card 2', balance: 3000, rate: 22.99, minPayment: 90 },
    { id: '3', name: 'Personal Loan', balance: 8000, rate: 12.5, minPayment: 250 }
  ]);
  const [consolidationRate, setConsolidationRate] = useState<string>('8.5');
  const [consolidationTerm, setConsolidationTerm] = useState<string>('5');
  const [loanType, setLoanType] = useState<string>('personal');
  const [creditScore, setCreditScore] = useState<string>('700');
  const [results, setResults] = useState<ConsolidationResults | null>(null);

  const calculateConsolidation = useCallback(() => {
    const newRate = parseFloat(consolidationRate) / 100 / 12;
    const termMonths = parseFloat(consolidationTerm) * 12;
    
    // Calculate total debt and current payments
    const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
    const totalMinPayments = debts.reduce((sum, debt) => sum + debt.minPayment, 0);
    
    if (totalDebt <= 0 || newRate <= 0 || termMonths <= 0) return;

    // Calculate new loan payment
    const newMonthlyPayment = (totalDebt * newRate * Math.pow(1 + newRate, termMonths)) / 
                              (Math.pow(1 + newRate, termMonths) - 1);
    
    const totalNewPayments = newMonthlyPayment * termMonths;
    const totalInterestNew = totalNewPayments - totalDebt;
    
    // Calculate current debt payoff scenario (minimum payments)
    let totalInterestOld = 0;
    let maxPayoffTime = 0;
    
    debts.forEach(debt => {
      const monthlyRate = debt.rate / 100 / 12;
      if (debt.minPayment > debt.balance * monthlyRate) {
        const payoffMonths = Math.log(1 + (debt.balance * monthlyRate) / debt.minPayment) / 
                            Math.log(1 + monthlyRate);
        const totalPayments = debt.minPayment * payoffMonths;
        totalInterestOld += totalPayments - debt.balance;
        maxPayoffTime = Math.max(maxPayoffTime, payoffMonths);
      } else {
        // Payment too low, debt won't be paid off
        maxPayoffTime = 600; // Set to 50 years as maximum
        totalInterestOld += debt.balance * 2; // Estimate high interest
      }
    });
    
    const monthlySavings = totalMinPayments - newMonthlyPayment;
    const totalSavings = totalInterestOld - totalInterestNew;
    const payoffTimeDifference = maxPayoffTime - termMonths;

    setResults({
      newLoanAmount: totalDebt,
      newMonthlyPayment,
      newPayoffTime: termMonths,
      totalInterestNew,
      totalInterestOld,
      monthlySavings,
      totalSavings,
      payoffTimeDifference
    });
  }, [debts, consolidationRate, consolidationTerm]);

  useEffect(() => {
    calculateConsolidation();
  }, [calculateConsolidation]);

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
      rate: 15,
      minPayment: 50
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

  const getEstimatedRate = () => {
    const score = parseInt(creditScore);
    let baseRate = 8.5;
    
    if (loanType === 'home-equity') baseRate = 6.5;
    if (loanType === 'balance-transfer') baseRate = 4.5; // Promotional rate
    
    if (score >= 750) return baseRate;
    if (score >= 700) return baseRate + 1;
    if (score >= 650) return baseRate + 2.5;
    return baseRate + 4;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔄 Debt Consolidation Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="options">Consolidation Options</TabsTrigger>
              <TabsTrigger value="strategies">Debt Strategies</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Current Debts</h3>
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
                              <Label className="text-xs">Rate (%)</Label>
                              <Input
                                type="number"
                                step="0.01"
                                value={debt.rate}
                                onChange={(e) => updateDebt(debt.id, 'rate', parseFloat(e.target.value) || 0)}
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
                          </div>
                        </div>
                      </Card>
                    ))}
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
                          <span>Weighted Avg Rate:</span>
                          <span className="font-semibold">
                            {((debts.reduce((sum, debt) => sum + (debt.balance * debt.rate), 0) / 
                               debts.reduce((sum, debt) => sum + debt.balance, 0)) || 0).toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Consolidation Loan</h3>
                  
                  <div>
                    <Label htmlFor="loanType">Loan Type</Label>
                    <Select value={loanType} onValueChange={setLoanType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal Loan</SelectItem>
                        <SelectItem value="home-equity">Home Equity Loan</SelectItem>
                        <SelectItem value="balance-transfer">Balance Transfer Card</SelectItem>
                        <SelectItem value="heloc">HELOC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="consolidationRate">Interest Rate (%)</Label>
                    <Input
                      id="consolidationRate"
                      type="number"
                      step="0.01"
                      value={consolidationRate}
                      onChange={(e) => setConsolidationRate(e.target.value)}
                      placeholder="Enter interest rate"
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      Estimated rate: {getEstimatedRate().toFixed(2)}%
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="consolidationTerm">Loan Term (years)</Label>
                    <Select value={consolidationTerm} onValueChange={setConsolidationTerm}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 years</SelectItem>
                        <SelectItem value="3">3 years</SelectItem>
                        <SelectItem value="4">4 years</SelectItem>
                        <SelectItem value="5">5 years</SelectItem>
                        <SelectItem value="7">7 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="creditScore">Credit Score</Label>
                    <Select value={creditScore} onValueChange={setCreditScore}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select credit score range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="800">800+ (Excellent)</SelectItem>
                        <SelectItem value="750">750-799 (Very Good)</SelectItem>
                        <SelectItem value="700">700-749 (Good)</SelectItem>
                        <SelectItem value="650">650-699 (Fair)</SelectItem>
                        <SelectItem value="600">600-649 (Poor)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {results && (
                    <Card className={`${results.totalSavings > 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                      <CardHeader>
                        <CardTitle className={`text-sm ${results.totalSavings > 0 ? 'text-green-800' : 'text-red-800'}`}>
                          Consolidation Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>New Monthly Payment:</span>
                            <span className="font-semibold">{formatCurrency(results.newMonthlyPayment)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Monthly Savings:</span>
                            <span className={`font-semibold ${results.monthlySavings > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {results.monthlySavings > 0 ? '+' : ''}{formatCurrency(results.monthlySavings)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Interest Savings:</span>
                            <span className={`font-semibold ${results.totalSavings > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {results.totalSavings > 0 ? '+' : ''}{formatCurrency(results.totalSavings)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Payoff Time:</span>
                            <span className="font-semibold">{formatMonths(results.newPayoffTime)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="options" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">Personal Loan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✓ Fixed interest rates</div>
                      <div>✓ Predictable payments</div>
                      <div>✓ No collateral required</div>
                      <div>✓ Quick approval process</div>
                      <div>⚠ Higher rates than secured loans</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Home Equity Loan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✓ Lower interest rates</div>
                      <div>✓ Tax-deductible interest</div>
                      <div>✓ Large loan amounts</div>
                      <div>✓ Fixed payments</div>
                      <div>⚠ Home as collateral</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Balance Transfer Card</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✓ 0% promotional rates</div>
                      <div>✓ Lower monthly payments</div>
                      <div>✓ Consolidate credit card debt</div>
                      <div>⚠ Promotional period ends</div>
                      <div>⚠ Transfer fees (3-5%)</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-800 text-sm">HELOC</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>✓ Flexible borrowing</div>
                      <div>✓ Lower interest rates</div>
                      <div>✓ Interest-only payments</div>
                      <div>⚠ Variable interest rates</div>
                      <div>⚠ Home as collateral</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="strategies" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">When Consolidation Helps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📉 Lower interest rate available</div>
                      <div>💰 Simplify multiple payments</div>
                      <div>📅 Fixed payment schedule</div>
                      <div>🎯 Improve credit utilization</div>
                      <div>🧠 Reduce payment stress</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Alternative Strategies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🏔️ Debt avalanche method</div>
                      <div>❄️ Debt snowball method</div>
                      <div>💰 Increase payments to highest rate</div>
                      <div>📞 Negotiate with creditors</div>
                      <div>💼 Increase income sources</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Before Consolidating</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📊 Calculate total costs</div>
                      <div>🔍 Shop around for rates</div>
                      <div>📋 Check fees and terms</div>
                      <div>🎯 Ensure you qualify</div>
                      <div>🚫 Stop using credit cards</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800 text-sm">Avoid These Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>❌ Running up new debt</div>
                      <div>❌ Extending payoff unnecessarily</div>
                      <div>❌ Ignoring fees and costs</div>
                      <div>❌ Not addressing spending habits</div>
                      <div>❌ Risking home with equity loans</div>
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
