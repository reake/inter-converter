'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MortgageResults {
  interestOnlyPayment: number;
  principalAndInterestPayment: number;
  totalInterestPaid: number;
  totalAmountPaid: number;
  paymentShock: number;
  balloonPayment: number;
}

interface AmortizationEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export default function InterestOnlyMortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('400000');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [interestOnlyPeriod, setInterestOnlyPeriod] = useState<string>('120'); // months
  const [totalLoanTerm, setTotalLoanTerm] = useState<string>('360'); // months
  const [creditScore, setCreditScore] = useState<string>('prime');
  const [results, setResults] = useState<MortgageResults | null>(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationEntry[]>([]);
  const [showSchedule, setShowSchedule] = useState(false);

  const creditScoreRanges = {
    'excellent': 'Excellent (740-850)',
    'prime': 'Prime (661-739)',
    'near-prime': 'Near Prime (601-660)',
    'subprime': 'Subprime (501-600)',
    'deep-subprime': 'Deep Subprime (300-500)'
  };

  const calculateMortgage = () => {
    const principal = parseFloat(loanAmount);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const ioMonths = parseInt(interestOnlyPeriod);
    const totalMonths = parseInt(totalLoanTerm);
    const amortizingMonths = totalMonths - ioMonths;

    if (principal <= 0 || monthlyRate <= 0 || ioMonths <= 0 || totalMonths <= 0) {
      return;
    }

    // Interest-only payment calculation
    const interestOnlyPayment = principal * monthlyRate;

    // Principal and interest payment after IO period
    const principalAndInterestPayment = amortizingMonths > 0 
      ? (principal * monthlyRate * Math.pow(1 + monthlyRate, amortizingMonths)) / 
        (Math.pow(1 + monthlyRate, amortizingMonths) - 1)
      : principal; // If no amortizing period, balloon payment

    // Payment shock
    const paymentShock = principalAndInterestPayment - interestOnlyPayment;

    // Total interest paid during IO period
    const ioInterest = interestOnlyPayment * ioMonths;

    // Total interest paid during amortizing period
    const amortizingInterest = amortizingMonths > 0 
      ? (principalAndInterestPayment * amortizingMonths) - principal
      : 0;

    const totalInterestPaid = ioInterest + amortizingInterest;
    const totalAmountPaid = principal + totalInterestPaid;

    // Balloon payment (if loan doesn't fully amortize)
    const balloonPayment = amortizingMonths <= 0 ? principal : 0;

    setResults({
      interestOnlyPayment,
      principalAndInterestPayment,
      totalInterestPaid,
      totalAmountPaid,
      paymentShock,
      balloonPayment
    });

    // Generate amortization schedule
    generateAmortizationSchedule(principal, monthlyRate, ioMonths, totalMonths, interestOnlyPayment, principalAndInterestPayment);
  };

  const generateAmortizationSchedule = (
    principal: number,
    monthlyRate: number,
    ioMonths: number,
    totalMonths: number,
    ioPayment: number,
    piPayment: number
  ) => {
    const schedule: AmortizationEntry[] = [];
    let balance = principal;

    // Interest-only period
    for (let month = 1; month <= ioMonths; month++) {
      const interest = balance * monthlyRate;
      schedule.push({
        month,
        payment: ioPayment,
        principal: 0,
        interest,
        balance
      });
    }

    // Principal and interest period
    for (let month = ioMonths + 1; month <= totalMonths; month++) {
      const interest = balance * monthlyRate;
      const principalPayment = piPayment - interest;
      balance = Math.max(0, balance - principalPayment);

      schedule.push({
        month,
        payment: piPayment,
        principal: principalPayment,
        interest,
        balance
      });

      if (balance <= 0) break;
    }

    setAmortizationSchedule(schedule);
  };

  useEffect(() => {
    calculateMortgage();
  }, [loanAmount, interestRate, interestOnlyPeriod, totalLoanTerm]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(Math.round(num));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Interest-Only Mortgage Calculator</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Calculate interest-only mortgage payments and analyze payment shock scenarios. 
          Understand the costs and risks of interest-only loans before making a decision.
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
              <Label htmlFor="creditScore" className="text-base font-medium">Credit Score</Label>
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
            </div>

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
                  placeholder="400,000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interestRate" className="text-base font-medium">Interest Rate</Label>
              <div className="relative">
                <Input
                  id="interestRate"
                  type="number"
                  step="0.01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="pr-8 h-12 text-base"
                  placeholder="6.50"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interestOnlyPeriod" className="text-base font-medium">Interest-Only Period</Label>
              <div className="flex">
                <Input
                  id="interestOnlyPeriod"
                  type="number"
                  value={Math.round(parseInt(interestOnlyPeriod) / 12)}
                  onChange={(e) => setInterestOnlyPeriod((parseInt(e.target.value) * 12).toString())}
                  className="h-12 text-base rounded-r-none"
                  placeholder="10"
                />
                <div className="bg-gray-100 border border-l-0 rounded-r-md px-3 flex items-center text-gray-600 min-w-[80px] justify-center">
                  Years
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalLoanTerm" className="text-base font-medium">Total Loan Term</Label>
              <div className="flex">
                <Input
                  id="totalLoanTerm"
                  type="number"
                  value={Math.round(parseInt(totalLoanTerm) / 12)}
                  onChange={(e) => setTotalLoanTerm((parseInt(e.target.value) * 12).toString())}
                  className="h-12 text-base rounded-r-none"
                  placeholder="30"
                />
                <div className="bg-gray-100 border border-l-0 rounded-r-md px-3 flex items-center text-gray-600 min-w-[80px] justify-center">
                  Years
                </div>
              </div>
            </div>

            <Button 
              onClick={calculateMortgage}
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
              <CardTitle className="text-2xl font-bold">Payment Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-sm font-medium text-blue-600 mb-1">Interest-Only Payment</div>
                  <div className="text-3xl font-bold text-blue-900">{formatCurrency(results.interestOnlyPayment)}</div>
                  <div className="text-sm text-blue-600">per month</div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="text-sm font-medium text-red-600 mb-1">Full Payment (After IO Period)</div>
                  <div className="text-3xl font-bold text-red-900">{formatCurrency(results.principalAndInterestPayment)}</div>
                  <div className="text-sm text-red-600">per month</div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <div className="text-sm font-medium text-orange-600 mb-1">Payment Shock</div>
                  <div className="text-2xl font-bold text-orange-900">+{formatCurrency(results.paymentShock)}</div>
                  <div className="text-sm text-orange-600">monthly increase</div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Interest Paid:</span>
                  <span className="font-semibold">{formatCurrency(results.totalInterestPaid)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount Paid:</span>
                  <span className="font-semibold">{formatCurrency(results.totalAmountPaid)}</span>
                </div>
                {results.balloonPayment > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>Balloon Payment:</span>
                    <span className="font-semibold">{formatCurrency(results.balloonPayment)}</span>
                  </div>
                )}
              </div>

              <Button
                onClick={() => setShowSchedule(!showSchedule)}
                variant="outline"
                className="w-full"
              >
                {showSchedule ? 'Hide' : 'Show'} Amortization Schedule
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Key Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Understanding Interest-Only Mortgages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-green-700 mb-2">✓ Advantages</h3>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Lower initial monthly payments</li>
                <li>• More cash flow for other investments</li>
                <li>• Potential tax benefits on interest</li>
                <li>• Flexibility for income fluctuations</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 mb-2">⚠ Risks</h3>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• No equity building during IO period</li>
                <li>• Payment shock when IO period ends</li>
                <li>• Higher total interest costs</li>
                <li>• Risk if property values decline</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Amortization Schedule */}
      {showSchedule && amortizationSchedule.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Amortization Schedule</CardTitle>
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
                  {amortizationSchedule.slice(0, 24).map((entry) => (
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
              {amortizationSchedule.length > 24 && (
                <div className="text-center py-4 text-gray-500">
                  ... and {amortizationSchedule.length - 24} more payments
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
