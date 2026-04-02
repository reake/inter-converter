'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PayoffResult {
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

export default function CreditCardPayoffCalculator() {
  const [balance, setBalance] = useState<string>('5000');
  const [apr, setApr] = useState<string>('18.99');
  const [paymentType, setPaymentType] = useState<string>('minimum');
  const [minimumPayment, setMinimumPayment] = useState<string>('');
  const [fixedPayment, setFixedPayment] = useState<string>('200');
  const [result, setResult] = useState<PayoffResult | null>(null);

  const calculatePayoff = () => {
    const currentBalance = parseFloat(balance) || 0;
    const annualRate = parseFloat(apr) / 100 || 0;
    const monthlyRate = annualRate / 12;

    if (currentBalance <= 0 || annualRate <= 0) return;

    let monthlyPayment: number;
    
    if (paymentType === 'minimum') {
      // Calculate minimum payment (typically 2-3% of balance)
      const minPaymentPercent = 0.02; // 2%
      const calculatedMin = Math.max(currentBalance * minPaymentPercent, 25);
      monthlyPayment = parseFloat(minimumPayment) || calculatedMin;
    } else {
      monthlyPayment = parseFloat(fixedPayment) || 0;
    }

    if (monthlyPayment <= 0) return;

    // Check if payment covers interest
    const monthlyInterest = currentBalance * monthlyRate;
    if (monthlyPayment <= monthlyInterest) {
      alert('Monthly payment must be greater than the monthly interest to pay off the debt!');
      return;
    }

    let remainingBalance = currentBalance;
    let totalInterest = 0;
    let month = 0;
    const payoffBreakdown = [];
    const maxMonths = 600; // 50 years max

    while (remainingBalance > 0.01 && month < maxMonths) {
      month++;
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = Math.min(monthlyPayment - interestPayment, remainingBalance);
      const actualPayment = interestPayment + principalPayment;
      
      remainingBalance -= principalPayment;
      totalInterest += interestPayment;

      if (month <= 60 || month % 12 === 0) { // Show first 5 years monthly, then yearly
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
      totalPayments: Math.round((currentBalance + totalInterest) * 100) / 100,
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
            💳 Credit Card Payoff Calculator
          </CardTitle>
          <CardDescription>
            Calculate how long it will take to pay off your credit card debt and how much interest you&apos;ll pay
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="balance">Current Balance ($)</Label>
              <Input
                id="balance"
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                placeholder="5000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apr">Annual Percentage Rate (APR %)</Label>
              <Input
                id="apr"
                type="number"
                step="0.01"
                value={apr}
                onChange={(e) => setApr(e.target.value)}
                placeholder="18.99"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-type">Payment Strategy</Label>
              <Select value={paymentType} onValueChange={setPaymentType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimum">Minimum Payment</SelectItem>
                  <SelectItem value="fixed">Fixed Monthly Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {paymentType === 'minimum' ? (
              <div className="space-y-2">
                <Label htmlFor="minimum-payment">Minimum Payment ($)</Label>
                <Input
                  id="minimum-payment"
                  type="number"
                  value={minimumPayment}
                  onChange={(e) => setMinimumPayment(e.target.value)}
                  placeholder="Auto-calculated (2% of balance)"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="fixed-payment">Monthly Payment ($)</Label>
                <Input
                  id="fixed-payment"
                  type="number"
                  value={fixedPayment}
                  onChange={(e) => setFixedPayment(e.target.value)}
                  placeholder="200"
                />
              </div>
            )}
          </div>

          <Button onClick={calculatePayoff} className="w-full">
            Calculate Payoff Time
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

      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-amber-900 mb-2">💡 Credit Card Payoff Tips</h3>
          <ul className="text-sm text-amber-800 space-y-1">
            <li>• Pay more than the minimum to reduce interest costs significantly</li>
            <li>• Consider balance transfer to a lower APR card</li>
            <li>• Stop using the card while paying it off</li>
            <li>• Pay twice monthly to reduce average daily balance</li>
            <li>• Focus on highest APR cards first (avalanche method)</li>
            <li>• Consider debt consolidation for multiple cards</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
