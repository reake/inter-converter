'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LoanResults {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  loanAmount: number;
}

interface AmortizationEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export default function PersonalLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('5000');
  const [interestRate, setInterestRate] = useState<string>('9.63');
  const [loanTerm, setLoanTerm] = useState<string>('36');
  const [creditScore, setCreditScore] = useState<string>('prime');
  const [results, setResults] = useState<LoanResults | null>(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationEntry[]>([]);
  const [showSchedule, setShowSchedule] = useState(false);

  const creditScoreRanges = {
    'excellent': 'Excellent (740-850)',
    'prime': 'Prime (661-739)',
    'near-prime': 'Near Prime (601-660)',
    'subprime': 'Subprime (501-600)',
    'deep-subprime': 'Deep Subprime (300-500)'
  };

  const loanTermOptions = [
    { value: '12', label: '12 Months' },
    { value: '24', label: '24 Months' },
    { value: '36', label: '36 Months' },
    { value: '48', label: '48 Months' },
    { value: '60', label: '60 Months' },
    { value: '72', label: '72 Months' }
  ];

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = parseInt(loanTerm);

    if (principal <= 0 || rate < 0 || months <= 0) {
      return;
    }

    // Monthly payment calculation using standard loan formula
    const monthlyPayment = rate === 0 
      ? principal / months
      : (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);

    const totalPayments = monthlyPayment * months;
    const totalInterest = totalPayments - principal;

    setResults({
      monthlyPayment,
      totalInterest,
      totalCost: totalPayments,
      loanAmount: principal
    });

    // Generate amortization schedule
    generateAmortizationSchedule(principal, rate, months, monthlyPayment);
  };

  const generateAmortizationSchedule = (
    principal: number,
    monthlyRate: number,
    months: number,
    payment: number
  ) => {
    const schedule: AmortizationEntry[] = [];
    let balance = principal;

    for (let month = 1; month <= months; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = payment - interestPayment;
      balance = Math.max(0, balance - principalPayment);

      schedule.push({
        month,
        payment,
        principal: principalPayment,
        interest: interestPayment,
        balance
      });

      if (balance <= 0) break;
    }

    setAmortizationSchedule(schedule);
  };

  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getInterestRateByCredit = (score: string) => {
    const rates = {
      'excellent': '5.0-8.0',
      'prime': '7.0-12.0',
      'near-prime': '12.0-18.0',
      'subprime': '18.0-25.0',
      'deep-subprime': '25.0-35.0+'
    };
    return rates[score as keyof typeof rates] || '7.0-12.0';
  };

  const getLoanPurposes = () => [
    'Debt Consolidation',
    'Home Improvement',
    'Medical Expenses',
    'Wedding',
    'Vacation',
    'Emergency Fund',
    'Education',
    'Business',
    'Other'
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Personal Loan Calculator</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculate your personal loan payments and compare rates. Find the best loan terms 
          for debt consolidation, home improvement, or other personal expenses.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="loanAmount" className="text-base font-medium">Loan Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">$</span>
                <Input
                  id="loanAmount"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="pl-8 h-12 text-base"
                  placeholder="5,000"
                />
              </div>
              <p className="text-sm text-gray-500">
                Most lenders offer $1,000 - $100,000
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="loanTerm" className="text-base font-medium">Loan Terms</Label>
              <div className="flex">
                <Input
                  id="loanTerm"
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  className="h-12 text-base rounded-r-none"
                  placeholder="36"
                />
                <div className="bg-gray-100 border border-l-0 rounded-r-md px-3 flex items-center text-gray-600 min-w-[80px] justify-center">
                  Months
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {loanTermOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={loanTerm === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLoanTerm(option.value)}
                    className="text-xs"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interestRate" className="text-base font-medium">Interest Rate Per Annum</Label>
              <div className="relative">
                <Input
                  id="interestRate"
                  type="number"
                  step="0.01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="pr-8 h-12 text-base"
                  placeholder="9.63"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="creditScore" className="text-base font-medium">Credit Score Range</Label>
              <Select value={creditScore} onValueChange={setCreditScore}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(creditScoreRanges).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500">
                Typical rates: {getInterestRateByCredit(creditScore)}%
              </p>
            </div>

            <Button 
              onClick={calculateLoan}
              className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
            >
              Calculate
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Loan Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="text-sm font-medium text-blue-600 mb-1">Monthly Payment</div>
                <div className="text-4xl font-bold text-blue-900">{formatCurrency(results.monthlyPayment)}</div>
                <div className="text-sm text-blue-600">per month for {loanTerm} months</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Total Interest</div>
                  <div className="text-xl font-bold">{formatCurrency(results.totalInterest)}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Total Paid</div>
                  <div className="text-xl font-bold">{formatCurrency(results.totalCost)}</div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Amount:</span>
                  <span className="font-semibold">{formatCurrency(results.loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interest Rate:</span>
                  <span className="font-semibold">{interestRate}% APR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Term:</span>
                  <span className="font-semibold">{loanTerm} months</span>
                </div>
              </div>

              <Button
                onClick={() => setShowSchedule(!showSchedule)}
                variant="outline"
                className="w-full"
              >
                {showSchedule ? 'Hide' : 'Show'} Payment Schedule
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Loan Uses and Tips */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Common Loan Uses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {getLoanPurposes().map((purpose) => (
                <div key={purpose} className="text-sm p-2 bg-gray-50 rounded text-center">
                  {purpose}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Personal Loan Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 text-gray-600">
              <li>• Check your credit score before applying</li>
              <li>• Compare rates from multiple lenders</li>
              <li>• Consider shorter terms to save on interest</li>
              <li>• Avoid prepayment penalties</li>
              <li>• Use for consolidating high-interest debt</li>
              <li>• Don't borrow more than you need</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Payment Schedule */}
      {showSchedule && amortizationSchedule.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Payment Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Payment #</th>
                    <th className="text-right p-2">Payment</th>
                    <th className="text-right p-2">Principal</th>
                    <th className="text-right p-2">Interest</th>
                    <th className="text-right p-2">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {amortizationSchedule.slice(0, 12).map((entry) => (
                    <tr key={entry.month} className="border-b hover:bg-gray-50">
                      <td className="p-2">{entry.month}</td>
                      <td className="text-right p-2">{formatCurrency(entry.payment)}</td>
                      <td className="text-right p-2">{formatCurrency(entry.principal)}</td>
                      <td className="text-right p-2">{formatCurrency(entry.interest)}</td>
                      <td className="text-right p-2">{formatCurrency(entry.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {amortizationSchedule.length > 12 && (
                <div className="text-center py-4 text-gray-500">
                  ... and {amortizationSchedule.length - 12} more payments
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
