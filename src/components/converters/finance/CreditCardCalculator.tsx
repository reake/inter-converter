'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calculator, CreditCard, TrendingDown, AlertTriangle, DollarSign, Calendar } from 'lucide-react';

interface CreditCardCalculatorProps {
  title?: string;
  description?: string;
}

interface PaymentSchedule {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

interface Results {
  monthsToPayoff: number;
  totalInterest: number;
  totalPayments: number;
  minimumPaymentTime: number;
  minimumPaymentInterest: number;
}

export default function CreditCardCalculator({ 
  title = "Credit Card Payoff Calculator",
  description = "Calculate how long it will take to pay off your credit card debt and how much interest you'll pay."
}: CreditCardCalculatorProps) {
  const [balance, setBalance] = useState('5000');
  const [apr, setApr] = useState('18.99');
  const [monthlyPayment, setMonthlyPayment] = useState('150');
  const [minimumPayment, setMinimumPayment] = useState('100');
  const [results, setResults] = useState<Results | null>(null);
  const [paymentSchedule, setPaymentSchedule] = useState<PaymentSchedule[]>([]);
  const calculatePayoff = useCallback(() => {
    const currentBalance = parseFloat(balance);
    const annualRate = parseFloat(apr) / 100;
    const monthlyRate = annualRate / 12;
    const payment = parseFloat(monthlyPayment);
    const minPayment = parseFloat(minimumPayment);

    if (currentBalance <= 0 || annualRate < 0 || payment <= 0) return;

    // Calculate with user's payment
    let remainingBalance = currentBalance;
    let totalInterest = 0;
    let months = 0;
    const schedule: PaymentSchedule[] = [];

    while (remainingBalance > 0.01 && months < 600) { // Max 50 years
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = Math.min(payment - interestPayment, remainingBalance);
      
      if (principalPayment <= 0) break; // Payment too low to cover interest
      
      remainingBalance -= principalPayment;
      totalInterest += interestPayment;
      months++;

      if (months <= 60) { // Only store first 5 years for display
        schedule.push({
          month: months,
          payment: Math.min(payment, remainingBalance + interestPayment + principalPayment),
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(0, remainingBalance)
        });
      }
    }

    // Calculate with minimum payment
    let minBalance = currentBalance;
    let minTotalInterest = 0;
    let minMonths = 0;

    while (minBalance > 0.01 && minMonths < 600) {
      const interestPayment = minBalance * monthlyRate;
      const principalPayment = Math.min(minPayment - interestPayment, minBalance);
      
      if (principalPayment <= 0) break;
      
      minBalance -= principalPayment;
      minTotalInterest += interestPayment;
      minMonths++;
    }

    setResults({
      monthsToPayoff: months,
      totalInterest,
      totalPayments: currentBalance + totalInterest,
      minimumPaymentTime: minMonths,
      minimumPaymentInterest: minTotalInterest
    });

    setPaymentSchedule(schedule);
  }, [balance, apr, monthlyPayment, minimumPayment]);

  useEffect(() => {
    calculatePayoff();
  }, [calculatePayoff]);

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
          <CreditCard className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Credit Card Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="balance">Current Balance</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="balance"
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="pl-10"
                  placeholder="5000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apr">Annual Percentage Rate (APR)</Label>
              <div className="relative">
                <Input
                  id="apr"
                  type="number"
                  step="0.01"
                  value={apr}
                  onChange={(e) => setApr(e.target.value)}
                  className="pr-8"
                  placeholder="18.99"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyPayment">Monthly Payment</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="monthlyPayment"
                  type="number"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(e.target.value)}
                  className="pl-10"
                  placeholder="150"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="minimumPayment">Minimum Payment (for comparison)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="minimumPayment"
                  type="number"
                  value={minimumPayment}
                  onChange={(e) => setMinimumPayment(e.target.value)}
                  className="pl-10"
                  placeholder="100"
                />
              </div>
            </div>

            <Button onClick={calculatePayoff} className="w-full">
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Payoff
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5" />
                Payoff Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {formatMonths(results.monthsToPayoff)}
                  </div>
                  <div className="text-sm text-green-700">Time to Pay Off</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(results.totalInterest)}
                  </div>
                  <div className="text-sm text-blue-700">Total Interest</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount Paid:</span>
                  <span className="font-semibold">{formatCurrency(results.totalPayments)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interest Saved vs Minimum:</span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(results.minimumPaymentInterest - results.totalInterest)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time Saved vs Minimum:</span>
                  <span className="font-semibold text-green-600">
                    {formatMonths(results.minimumPaymentTime - results.monthsToPayoff)}
                  </span>
                </div>
              </div>

              {results.monthsToPayoff > results.minimumPaymentTime && (
                <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    Your payment is lower than optimal. Consider increasing it to save on interest.
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Payment Schedule */}
      {results && paymentSchedule.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Payment Schedule
              <Badge variant="secondary">First 5 Years</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="yearly" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="yearly">Yearly Summary</TabsTrigger>
                <TabsTrigger value="monthly">Monthly Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="yearly" className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
                        <th className="border border-gray-300 px-4 py-2 text-right">Principal Paid</th>
                        <th className="border border-gray-300 px-4 py-2 text-right">Interest Paid</th>
                        <th className="border border-gray-300 px-4 py-2 text-right">Remaining Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: Math.min(5, Math.ceil(paymentSchedule.length / 12)) }, (_, yearIndex) => {
                        const yearPayments = paymentSchedule.slice(yearIndex * 12, (yearIndex + 1) * 12);
                        const totalPrincipal = yearPayments.reduce((sum, payment) => sum + payment.principal, 0);
                        const totalInterest = yearPayments.reduce((sum, payment) => sum + payment.interest, 0);
                        const endBalance = yearPayments[yearPayments.length - 1]?.balance || 0;
                        
                        return (
                          <tr key={yearIndex}>
                            <td className="border border-gray-300 px-4 py-2">{yearIndex + 1}</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(totalPrincipal)}</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(totalInterest)}</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(endBalance)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="monthly" className="space-y-4">
                <div className="overflow-x-auto max-h-96">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead className="sticky top-0 bg-white">
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-2 text-left">Month</th>
                        <th className="border border-gray-300 px-4 py-2 text-right">Payment</th>
                        <th className="border border-gray-300 px-4 py-2 text-right">Principal</th>
                        <th className="border border-gray-300 px-4 py-2 text-right">Interest</th>
                        <th className="border border-gray-300 px-4 py-2 text-right">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentSchedule.map((payment, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="border border-gray-300 px-4 py-2">{payment.month}</td>
                          <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(payment.payment)}</td>
                          <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(payment.principal)}</td>
                          <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(payment.interest)}</td>
                          <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(payment.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle>Credit Card Payoff Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">Strategies to Pay Off Faster:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Pay more than the minimum payment</li>
                <li>• Make bi-weekly payments instead of monthly</li>
                <li>• Use windfalls (tax refunds, bonuses) for extra payments</li>
                <li>• Consider the debt avalanche method for multiple cards</li>
                <li>• Transfer to a lower APR card if possible</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600">Important Considerations:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Stop using the card while paying it off</li>
                <li>• Build an emergency fund to avoid new debt</li>
                <li>• Consider balance transfer offers carefully</li>
                <li>• Track your progress monthly</li>
                <li>• Celebrate milestones to stay motivated</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
