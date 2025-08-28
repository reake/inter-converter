'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

interface LoanCalculation {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: AmortizationEntry[];
}

interface AmortizationEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('300000');
  const [interestRate, setInterestRate] = useState('3.5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [extraPayment, setExtraPayment] = useState('0');
  const [result, setResult] = useState<LoanCalculation | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);

  useEffect(() => {
    if (loanAmount && interestRate && loanTerm) {
      calculateLoan();
    }
  }, [loanAmount, interestRate, loanTerm, extraPayment]);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const months = parseFloat(loanTerm) * 12;
    const extra = parseFloat(extraPayment) || 0;

    if (principal <= 0 || rate < 0 || months <= 0) {
      setResult(null);
      return;
    }

    // Calculate monthly payment using loan formula
    const monthlyPayment = rate === 0 
      ? principal / months 
      : (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);

    // Generate amortization schedule
    const schedule: AmortizationEntry[] = [];
    let remainingBalance = principal;
    let totalInterestPaid = 0;
    let month = 1;

    while (remainingBalance > 0.01 && month <= months * 2) { // Safety limit
      const interestPayment = remainingBalance * rate;
      let principalPayment = monthlyPayment - interestPayment + extra;
      
      // Don't pay more than remaining balance
      if (principalPayment > remainingBalance) {
        principalPayment = remainingBalance;
      }

      const totalPayment = interestPayment + principalPayment;
      remainingBalance -= principalPayment;
      totalInterestPaid += interestPayment;

      schedule.push({
        month,
        payment: totalPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, remainingBalance)
      });

      month++;

      if (remainingBalance <= 0.01) break;
    }

    const totalPayment = schedule.reduce((sum, entry) => sum + entry.payment, 0);

    setResult({
      monthlyPayment: monthlyPayment + extra,
      totalPayment,
      totalInterest: totalInterestPaid,
      amortizationSchedule: schedule
    });
  };

  const getResultText = () => {
    if (result) {
      return `Loan: $${parseFloat(loanAmount).toLocaleString()}\nMonthly Payment: $${result.monthlyPayment.toFixed(2)}\nTotal Interest: $${result.totalInterest.toFixed(2)}`;
    }
    return '';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const setPresetLoan = (amount: string, rate: string, term: string) => {
    setLoanAmount(amount);
    setInterestRate(rate);
    setLoanTerm(term);
    setExtraPayment('0');
  };

  return (
    <div className="space-y-6">
      {/* Loan Input */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Loan Details
          </CardTitle>
          <CardDescription>
            Enter your loan information to calculate payments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Loan Amount ($)</label>
              <Input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="300000"
                min="0"
                step="1000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Annual Interest Rate (%)</label>
              <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="3.5"
                min="0"
                max="50"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Loan Term (Years)</label>
              <Input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                placeholder="30"
                min="1"
                max="50"
                step="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Extra Monthly Payment ($)</label>
              <Input
                type="number"
                value={extraPayment}
                onChange={(e) => setExtraPayment(e.target.value)}
                placeholder="0"
                min="0"
                step="50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Presets */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Common Loan Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={() => setPresetLoan('300000', '3.5', '30')}
              className="text-left justify-start h-auto p-3"
            >
              <div>
                <div className="font-medium">30-Year Mortgage</div>
                <div className="text-sm text-muted-foreground">$300K at 3.5%</div>
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={() => setPresetLoan('25000', '4.5', '5')}
              className="text-left justify-start h-auto p-3"
            >
              <div>
                <div className="font-medium">Auto Loan</div>
                <div className="text-sm text-muted-foreground">$25K at 4.5%</div>
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={() => setPresetLoan('10000', '8.0', '3')}
              className="text-left justify-start h-auto p-3"
            >
              <div>
                <div className="font-medium">Personal Loan</div>
                <div className="text-sm text-muted-foreground">$10K at 8.0%</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Loan Calculation Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Main Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(result.monthlyPayment)}
                </div>
                <div className="text-sm text-muted-foreground">Monthly Payment</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(result.totalInterest)}
                </div>
                <div className="text-sm text-muted-foreground">Total Interest</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {formatCurrency(result.totalPayment)}
                </div>
                <div className="text-sm text-muted-foreground">Total Payment</div>
              </div>
            </div>

            {/* Summary */}
            <div className="p-4 bg-muted rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span>Loan Amount:</span>
                  <span className="font-medium">{formatCurrency(parseFloat(loanAmount))}</span>
                </div>
                <div className="flex justify-between">
                  <span>Interest Rate:</span>
                  <span className="font-medium">{interestRate}% APR</span>
                </div>
                <div className="flex justify-between">
                  <span>Loan Term:</span>
                  <span className="font-medium">{loanTerm} years ({parseFloat(loanTerm) * 12} payments)</span>
                </div>
                <div className="flex justify-between">
                  <span>Payoff Time:</span>
                  <span className="font-medium">
                    {result.amortizationSchedule.length} months
                    {parseFloat(extraPayment) > 0 && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {(parseFloat(loanTerm) * 12) - result.amortizationSchedule.length} months saved
                      </Badge>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <CopyButton
                text={getResultText()}
                variant="outline"
                showText={true}
                successText="Results Copied!"
              />
              <Button 
                onClick={() => setShowSchedule(!showSchedule)} 
                variant="outline"
              >
                {showSchedule ? 'Hide' : 'Show'} Amortization Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Amortization Schedule */}
      {result && showSchedule && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Amortization Schedule</CardTitle>
            <CardDescription>
              Monthly breakdown of principal and interest payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Month</th>
                    <th className="text-right p-2">Payment</th>
                    <th className="text-right p-2">Principal</th>
                    <th className="text-right p-2">Interest</th>
                    <th className="text-right p-2">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.amortizationSchedule.slice(0, 12).map((entry) => (
                    <tr key={entry.month} className="border-b hover:bg-muted/50">
                      <td className="p-2">{entry.month}</td>
                      <td className="p-2 text-right font-mono">{formatCurrency(entry.payment)}</td>
                      <td className="p-2 text-right font-mono">{formatCurrency(entry.principal)}</td>
                      <td className="p-2 text-right font-mono">{formatCurrency(entry.interest)}</td>
                      <td className="p-2 text-right font-mono">{formatCurrency(entry.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {result.amortizationSchedule.length > 12 && (
                <div className="text-center py-4 text-muted-foreground">
                  Showing first 12 months of {result.amortizationSchedule.length} total payments
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Loan Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Save Money Tips</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>• Make extra principal payments to reduce total interest</div>
                <div>• Consider bi-weekly payments instead of monthly</div>
                <div>• Shop around for the best interest rates</div>
                <div>• Improve your credit score before applying</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Important Notes</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>• Results are estimates for comparison purposes</div>
                <div>• Actual rates may vary based on credit and lender</div>
                <div>• Consider additional costs like insurance and taxes</div>
                <div>• Consult with financial advisors for major decisions</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}