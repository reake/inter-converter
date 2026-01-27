'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StudentLoanResults {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  payoffTime: number;
}

interface RepaymentPlan {
  name: string;
  monthlyPayment: number;
  totalCost: number;
  payoffTime: number;
}

export default function StudentLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('30000');
  const [interestRate, setInterestRate] = useState<string>('5.28');
  const [loanTerm, setLoanTerm] = useState<string>('10');
  const [loanType, setLoanType] = useState<string>('federal');
  const [income, setIncome] = useState<string>('50000');
  const [familySize, setFamilySize] = useState<string>('1');
  const [results, setResults] = useState<StudentLoanResults | null>(null);
  const [repaymentPlans, setRepaymentPlans] = useState<RepaymentPlan[]>([]);

  const loanTypes = {
    'federal': 'Federal Student Loan',
    'private': 'Private Student Loan',
    'parent-plus': 'Parent PLUS Loan',
    'grad-plus': 'Grad PLUS Loan'
  };

  const calculateLoan = useCallback(() => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = parseFloat(loanTerm) * 12;
    const annualIncome = parseFloat(income);
    const size = parseInt(familySize);

    if (principal <= 0 || rate < 0 || months <= 0) return;

    // Standard repayment calculation
    const monthlyPayment = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const totalCost = monthlyPayment * months;
    const totalInterest = totalCost - principal;

    setResults({
      monthlyPayment,
      totalInterest,
      totalCost,
      payoffTime: months / 12
    });

    // Calculate different repayment plans for federal loans
    if (loanType === 'federal') {
      const plans: RepaymentPlan[] = [];

      // Standard 10-year plan
      plans.push({
        name: 'Standard Repayment',
        monthlyPayment,
        totalCost,
        payoffTime: 10
      });

      // Extended repayment (25 years)
      const extendedMonths = 25 * 12;
      const extendedPayment = (principal * rate * Math.pow(1 + rate, extendedMonths)) / (Math.pow(1 + rate, extendedMonths) - 1);
      plans.push({
        name: 'Extended Repayment',
        monthlyPayment: extendedPayment,
        totalCost: extendedPayment * extendedMonths,
        payoffTime: 25
      });

      // Income-Based Repayment (IBR) - simplified calculation
      const discretionaryIncome = Math.max(0, annualIncome - (15000 * size));
      const ibrPayment = Math.max(discretionaryIncome * 0.15 / 12, 0);
      const ibrMonths = ibrPayment > 0 ? Math.min(300, Math.ceil(Math.log(1 + (principal * rate) / ibrPayment) / Math.log(1 + rate))) : 300;
      plans.push({
        name: 'Income-Based Repayment',
        monthlyPayment: ibrPayment,
        totalCost: ibrPayment * ibrMonths,
        payoffTime: ibrMonths / 12
      });

      // Pay As You Earn (PAYE)
      const payePayment = Math.min(monthlyPayment, annualIncome * 0.10 / 12);
      const payeMonths = payePayment > 0 ? Math.min(240, Math.ceil(Math.log(1 + (principal * rate) / payePayment) / Math.log(1 + rate))) : 240;
      plans.push({
        name: 'Pay As You Earn',
        monthlyPayment: payePayment,
        totalCost: payePayment * payeMonths,
        payoffTime: payeMonths / 12
      });

      setRepaymentPlans(plans);
    } else {
      setRepaymentPlans([]);
    }
  }, [loanAmount, interestRate, loanTerm, loanType, income, familySize]);

  useEffect(() => {
    calculateLoan();
  }, [calculateLoan]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🎓 Student Loan Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="plans">Repayment Plans</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="loanAmount">Total Loan Amount</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="Enter loan amount"
                    />
                  </div>

                  <div>
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="Enter interest rate"
                    />
                  </div>

                  <div>
                    <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                    <Select value={loanTerm} onValueChange={setLoanTerm}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 Years</SelectItem>
                        <SelectItem value="15">15 Years</SelectItem>
                        <SelectItem value="20">20 Years</SelectItem>
                        <SelectItem value="25">25 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="loanType">Loan Type</Label>
                    <Select value={loanType} onValueChange={setLoanType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(loanTypes).map(([key, label]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {loanType === 'federal' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="income">Annual Income</Label>
                      <Input
                        id="income"
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        placeholder="Enter annual income"
                      />
                    </div>

                    <div>
                      <Label htmlFor="familySize">Family Size</Label>
                      <Select value={familySize} onValueChange={setFamilySize}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select family size" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                            <SelectItem key={size} value={size.toString()}>{size}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              {results && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-800">Standard Repayment Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(results.monthlyPayment)}
                        </div>
                        <div className="text-sm text-blue-600">Monthly Payment</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(results.totalCost)}
                        </div>
                        <div className="text-sm text-green-600">Total Cost</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {formatCurrency(results.totalInterest)}
                        </div>
                        <div className="text-sm text-orange-600">Total Interest</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {results.payoffTime.toFixed(1)} yrs
                        </div>
                        <div className="text-sm text-purple-600">Payoff Time</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="plans" className="space-y-4">
              {repaymentPlans.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Federal Loan Repayment Plans</h3>
                  {repaymentPlans.map((plan, index) => (
                    <Card key={index} className="border-l-4 border-l-blue-500">
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-blue-800">{plan.name}</h4>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Monthly Payment:</span>
                            <div className="font-semibold">{formatCurrency(plan.monthlyPayment)}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Total Cost:</span>
                            <div className="font-semibold">{formatCurrency(plan.totalCost)}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Payoff Time:</span>
                            <div className="font-semibold">{plan.payoffTime.toFixed(1)} years</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-gray-600">
                      Repayment plan options are available for federal student loans only.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Student Loan Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-green-700 mb-2">💡 Repayment Strategies</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Consider income-driven repayment plans for federal loans</li>
                <li>• Make extra payments toward principal to reduce interest</li>
                <li>• Look into loan forgiveness programs for eligible careers</li>
                <li>• Consolidate multiple federal loans for simplified payments</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 mb-2">📚 Important Notes</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Federal loans offer more flexible repayment options</li>
                <li>• Interest may be tax-deductible up to $2,500/year</li>
                <li>• Consider refinancing private loans for better rates</li>
                <li>• Avoid default - contact servicer if having trouble paying</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
