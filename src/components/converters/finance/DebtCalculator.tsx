'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DebtResult {
  monthsToPayoff: number;
  totalInterest: number;
  totalPayments: number;
  monthlyPayment: number;
  payoffBreakdown: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export default function DebtCalculator() {
  const [debtAmount, setDebtAmount] = useState<string>('15000');
  const [interestRate, setInterestRate] = useState<string>('12.5');
  const [paymentStrategy, setPaymentStrategy] = useState<string>('minimum');
  const [minimumPayment, setMinimumPayment] = useState<string>('');
  const [targetPayment, setTargetPayment] = useState<string>('400');
  const [targetMonths, setTargetMonths] = useState<string>('48');
  const [result, setResult] = useState<DebtResult | null>(null);

  const calculateDebt = () => {
    const balance = parseFloat(debtAmount) || 0;
    const rate = parseFloat(interestRate) / 100 / 12 || 0;
    
    if (balance <= 0 || rate <= 0) return;

    let monthlyPayment: number;
    let isFixedTerm = false;

    switch (paymentStrategy) {
      case 'minimum':
        // Calculate minimum payment (typically 2-3% of balance)
        const minPaymentPercent = 0.025; // 2.5%
        const calculatedMin = Math.max(balance * minPaymentPercent, 25);
        monthlyPayment = parseFloat(minimumPayment) || calculatedMin;
        break;
      case 'fixed':
        monthlyPayment = parseFloat(targetPayment) || 0;
        break;
      case 'term':
        const months = parseFloat(targetMonths) || 48;
        monthlyPayment = balance * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
        isFixedTerm = true;
        break;
      default:
        monthlyPayment = 0;
    }

    if (monthlyPayment <= 0) return;

    // Check if payment covers interest
    const monthlyInterest = balance * rate;
    if (monthlyPayment <= monthlyInterest && !isFixedTerm) {
      alert('Monthly payment must be greater than the monthly interest to pay off the debt!');
      return;
    }

    let remainingBalance = balance;
    let totalInterest = 0;
    let month = 0;
    const payoffBreakdown = [];
    const maxMonths = isFixedTerm ? parseFloat(targetMonths) : 600;

    while (remainingBalance > 0.01 && month < maxMonths) {
      month++;
      const interestPayment = remainingBalance * rate;
      const principalPayment = Math.min(monthlyPayment - interestPayment, remainingBalance);
      const actualPayment = interestPayment + principalPayment;
      
      remainingBalance -= principalPayment;
      totalInterest += interestPayment;

      if (month <= 60 || month % 12 === 0) {
        payoffBreakdown.push({
          month,
          payment: Math.round(actualPayment * 100) / 100,
          principal: Math.round(principalPayment * 100) / 100,
          interest: Math.round(interestPayment * 100) / 100,
          balance: Math.round(remainingBalance * 100) / 100
        });
      }
    }

    setResult({
      monthsToPayoff: month,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalPayments: Math.round((balance + totalInterest) * 100) / 100,
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      payoffBreakdown
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatMonths = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) return `${months} months`;
    if (remainingMonths === 0) return `${years} years`;
    return `${years} years, ${remainingMonths} months`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💳 Debt Payoff Calculator
          </CardTitle>
          <CardDescription>
            Calculate debt payoff strategies and compare different payment approaches
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="debt-amount">Total Debt Amount ($)</Label>
              <Input
                id="debt-amount"
                type="number"
                value={debtAmount}
                onChange={(e) => setDebtAmount(e.target.value)}
                placeholder="15000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interest-rate">Interest Rate (APR %)</Label>
              <Input
                id="interest-rate"
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="12.5"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="payment-strategy">Payment Strategy</Label>
              <Select value={paymentStrategy} onValueChange={setPaymentStrategy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimum">Minimum Payment</SelectItem>
                  <SelectItem value="fixed">Fixed Monthly Payment</SelectItem>
                  <SelectItem value="term">Target Payoff Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {paymentStrategy === 'minimum' && (
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="minimum-payment">Minimum Payment ($)</Label>
                <Input
                  id="minimum-payment"
                  type="number"
                  value={minimumPayment}
                  onChange={(e) => setMinimumPayment(e.target.value)}
                  placeholder="Auto-calculated (2.5% of balance)"
                />
              </div>
            )}

            {paymentStrategy === 'fixed' && (
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="target-payment">Monthly Payment ($)</Label>
                <Input
                  id="target-payment"
                  type="number"
                  value={targetPayment}
                  onChange={(e) => setTargetPayment(e.target.value)}
                  placeholder="400"
                />
              </div>
            )}

            {paymentStrategy === 'term' && (
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="target-months">Target Payoff Time (Months)</Label>
                <Input
                  id="target-months"
                  type="number"
                  value={targetMonths}
                  onChange={(e) => setTargetMonths(e.target.value)}
                  placeholder="48"
                />
              </div>
            )}
          </div>

          <Button onClick={calculateDebt} className="w-full">
            Calculate Debt Payoff
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payoff Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">
                {formatMonths(result.monthsToPayoff)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(result.monthlyPayment)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Interest</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(result.totalInterest)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-600">
                {formatCurrency(result.totalPayments)}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {result && result.payoffBreakdown.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Schedule</CardTitle>
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
                  {result.payoffBreakdown.map((row, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{row.month}</td>
                      <td className="text-right p-2 font-medium">
                        {formatCurrency(row.payment)}
                      </td>
                      <td className="text-right p-2 text-green-600">
                        {formatCurrency(row.principal)}
                      </td>
                      <td className="text-right p-2 text-red-600">
                        {formatCurrency(row.interest)}
                      </td>
                      <td className="text-right p-2">
                        {formatCurrency(row.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-red-900 mb-2">💡 Debt Payoff Tips</h3>
          <ul className="text-sm text-red-800 space-y-1">
            <li>• Pay more than the minimum to reduce total interest</li>
            <li>• Focus on highest interest rate debts first (avalanche method)</li>
            <li>• Consider debt consolidation for multiple high-interest debts</li>
            <li>• Stop using credit cards while paying off debt</li>
            <li>• Create a budget to find extra money for debt payments</li>
            <li>• Consider balance transfers to lower interest rate cards</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
