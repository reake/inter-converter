'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Plus, Trash2, TrendingDown, DollarSign, Percent } from 'lucide-react';

interface DebtConsolidationCalculatorProps {
  title?: string;
  description?: string;
}

interface Debt {
  id: string;
  name: string;
  balance: number;
  apr: number;
  minimumPayment: number;
}

interface ConsolidationResults {
  totalDebt: number;
  totalMinimumPayments: number;
  weightedAverageAPR: number;
  consolidationPayment: number;
  consolidationAPR: number;
  originalPayoffTime: number;
  consolidatedPayoffTime: number;
  originalTotalInterest: number;
  consolidatedTotalInterest: number;
  monthlySavings: number;
  interestSavings: number;
  timeSavings: number;
}

export default function DebtConsolidationCalculator({ 
  title = "Debt Consolidation Calculator",
  description = "Compare your current debts with a consolidated loan to see potential savings on interest and monthly payments."
}: DebtConsolidationCalculatorProps) {
  const [debts, setDebts] = useState<Debt[]>([
    { id: '1', name: 'Credit Card 1', balance: 5000, apr: 18.99, minimumPayment: 125 },
    { id: '2', name: 'Credit Card 2', balance: 3000, apr: 22.99, minimumPayment: 90 },
    { id: '3', name: 'Personal Loan', balance: 8000, apr: 12.99, minimumPayment: 200 }
  ]);
  
  const [consolidationAPR, setConsolidationAPR] = useState('10.99');
  const [consolidationTerm, setConsolidationTerm] = useState('60'); // months
  const [results, setResults] = useState<ConsolidationResults | null>(null);

  const addDebt = () => {
    const newDebt: Debt = {
      id: Date.now().toString(),
      name: `Debt ${debts.length + 1}`,
      balance: 0,
      apr: 0,
      minimumPayment: 0
    };
    setDebts([...debts, newDebt]);
  };

  const removeDebt = (id: string) => {
    if (debts.length > 1) {
      setDebts(debts.filter(debt => debt.id !== id));
    }
  };

  const updateDebt = (id: string, field: keyof Debt, value: string | number) => {
    setDebts(debts.map(debt => 
      debt.id === id ? { ...debt, [field]: value } : debt
    ));
  };

  const calculatePayoffTime = useCallback((balance: number, apr: number, payment: number): number => {
    if (payment <= 0 || apr < 0 || balance <= 0) return 0;
    
    const monthlyRate = apr / 100 / 12;
    if (payment <= balance * monthlyRate) return 999; // Payment too low
    
    return Math.ceil(Math.log(1 + (balance * monthlyRate) / payment) / Math.log(1 + monthlyRate));
  }, []);

  const calculateTotalInterest = useCallback((balance: number, apr: number, payment: number): number => {
    const months = calculatePayoffTime(balance, apr, payment);
    if (months >= 999) return balance * 10; // Estimate for very long payoff
    
    return (payment * months) - balance;
  }, [calculatePayoffTime]);

  const calculateConsolidation = useCallback(() => {
    const validDebts = debts.filter(debt => debt.balance > 0 && debt.apr > 0);
    if (validDebts.length === 0) return;

    const totalDebt = validDebts.reduce((sum, debt) => sum + debt.balance, 0);
    const totalMinimumPayments = validDebts.reduce((sum, debt) => sum + debt.minimumPayment, 0);
    
    // Calculate weighted average APR
    const weightedAverageAPR = validDebts.reduce((sum, debt) => 
      sum + (debt.apr * debt.balance), 0) / totalDebt;

    // Calculate original payoff scenarios
    let originalTotalInterest = 0;
    let maxPayoffTime = 0;

    validDebts.forEach(debt => {
      const interest = calculateTotalInterest(debt.balance, debt.apr, debt.minimumPayment);
      const payoffTime = calculatePayoffTime(debt.balance, debt.apr, debt.minimumPayment);
      originalTotalInterest += interest;
      maxPayoffTime = Math.max(maxPayoffTime, payoffTime);
    });

    // Calculate consolidation loan payment
    const consAPR = parseFloat(consolidationAPR);
    const consTerm = parseInt(consolidationTerm);
    const monthlyRate = consAPR / 100 / 12;
    
    const consolidationPayment = totalDebt * (monthlyRate * Math.pow(1 + monthlyRate, consTerm)) / 
      (Math.pow(1 + monthlyRate, consTerm) - 1);

    const consolidatedTotalInterest = (consolidationPayment * consTerm) - totalDebt;

    const monthlySavings = totalMinimumPayments - consolidationPayment;
    const interestSavings = originalTotalInterest - consolidatedTotalInterest;
    const timeSavings = maxPayoffTime - consTerm;

    setResults({
      totalDebt,
      totalMinimumPayments,
      weightedAverageAPR,
      consolidationPayment,
      consolidationAPR: consAPR,
      originalPayoffTime: maxPayoffTime,
      consolidatedPayoffTime: consTerm,
      originalTotalInterest,
      consolidatedTotalInterest,
      monthlySavings,
      interestSavings,
      timeSavings
    });
  }, [debts, consolidationAPR, consolidationTerm, calculatePayoffTime, calculateTotalInterest]);

  useEffect(() => {
    calculateConsolidation();
  }, [calculateConsolidation]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatMonths = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) return `${months} months`;
    if (remainingMonths === 0) return `${years} years`;
    return `${years} years ${remainingMonths} months`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Calculator className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Debts Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5" />
                Current Debts
              </CardTitle>
              <Button onClick={addDebt} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add Debt
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {debts.map((debt) => (
              <div key={debt.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <Input
                    value={debt.name}
                    onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                    className="font-medium"
                    placeholder="Debt name"
                  />
                  {debts.length > 1 && (
                    <Button
                      onClick={() => removeDebt(debt.id)}
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label className="text-xs">Balance</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                      <Input
                        type="number"
                        value={debt.balance || ''}
                        onChange={(e) => updateDebt(debt.id, 'balance', parseFloat(e.target.value) || 0)}
                        className="pl-7 text-sm"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-xs">APR</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.01"
                        value={debt.apr || ''}
                        onChange={(e) => updateDebt(debt.id, 'apr', parseFloat(e.target.value) || 0)}
                        className="pr-6 text-sm"
                        placeholder="0"
                      />
                      <Percent className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-xs">Min Payment</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                      <Input
                        type="number"
                        value={debt.minimumPayment || ''}
                        onChange={(e) => updateDebt(debt.id, 'minimumPayment', parseFloat(e.target.value) || 0)}
                        className="pl-7 text-sm"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Consolidation Options */}
        <Card>
          <CardHeader>
            <CardTitle>Consolidation Loan Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="consolidationAPR">New Loan APR</Label>
              <div className="relative">
                <Input
                  id="consolidationAPR"
                  type="number"
                  step="0.01"
                  value={consolidationAPR}
                  onChange={(e) => setConsolidationAPR(e.target.value)}
                  className="pr-8"
                  placeholder="10.99"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="consolidationTerm">Loan Term (months)</Label>
              <Input
                id="consolidationTerm"
                type="number"
                value={consolidationTerm}
                onChange={(e) => setConsolidationTerm(e.target.value)}
                placeholder="60"
              />
            </div>

            <Button onClick={calculateConsolidation} className="w-full">
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Savings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Results Section */}
      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Consolidation Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(results.monthlySavings)}
                </div>
                <div className="text-sm text-green-700">Monthly Savings</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(results.interestSavings)}
                </div>
                <div className="text-sm text-blue-700">Interest Savings</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {formatMonths(Math.abs(results.timeSavings))}
                </div>
                <div className="text-sm text-purple-700">
                  {results.timeSavings > 0 ? 'Time Saved' : 'Extra Time'}
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Scenario</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Total Debt</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Monthly Payment</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Average APR</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Payoff Time</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Total Interest</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Current Debts</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(results.totalDebt)}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(results.totalMinimumPayments)}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{results.weightedAverageAPR.toFixed(2)}%</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{formatMonths(results.originalPayoffTime)}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(results.originalTotalInterest)}</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 px-4 py-2 font-medium">Consolidated Loan</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(results.totalDebt)}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(results.consolidationPayment)}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{results.consolidationAPR.toFixed(2)}%</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{formatMonths(results.consolidatedPayoffTime)}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(results.consolidatedTotalInterest)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Recommendation */}
            <div className="p-4 rounded-lg border-l-4 border-blue-500 bg-blue-50">
              <h4 className="font-semibold text-blue-800 mb-2">Recommendation</h4>
              <p className="text-blue-700">
                {results.interestSavings > 0 && results.monthlySavings > 0 
                  ? "Debt consolidation appears beneficial! You'll save money on both monthly payments and total interest."
                  : results.interestSavings > 0
                  ? "Consolidation will save on total interest, but may increase monthly payments."
                  : results.monthlySavings > 0
                  ? "Consolidation will lower monthly payments, but may cost more in total interest."
                  : "Consolidation may not provide significant benefits with these terms. Consider shopping for better rates."
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle>Debt Consolidation Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">When Consolidation Makes Sense:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Lower interest rate than current average</li>
                <li>• Simplified single monthly payment</li>
                <li>• Fixed payment schedule</li>
                <li>• Good credit score for better rates</li>
                <li>• Commitment to avoid new debt</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-600">Important Considerations:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Longer terms may cost more in total interest</li>
                <li>• Fees and closing costs</li>
                <li>• Risk of accumulating new debt</li>
                <li>• Loss of promotional rates on current cards</li>
                <li>• Impact on credit utilization ratio</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
