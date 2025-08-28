'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [term, setTerm] = useState<string>('');
  const [result, setResult] = useState<LoanResult | null>(null);

  const calculateLoan = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12; // Monthly interest rate
    const n = parseFloat(term) * 12; // Number of payments

    if (p > 0 && r > 0 && n > 0) {
      const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = monthlyPayment * n;
      const totalInterest = totalPayment - p;

      setResult({
        monthlyPayment,
        totalPayment,
        totalInterest
      });
    }
  };

  const reset = () => {
    setPrincipal('');
    setRate('');
    setTerm('');
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>贷款计算器</CardTitle>
          <CardDescription>计算月供、总还款额和利息</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="principal">贷款金额 ($)</Label>
              <Input
                id="principal"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="100000"
              />
            </div>
            <div>
              <Label htmlFor="rate">年利率 (%)</Label>
              <Input
                id="rate"
                type="number"
                step="0.01"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="5.5"
              />
            </div>
            <div>
              <Label htmlFor="term">贷款期限 (年)</Label>
              <Input
                id="term"
                type="number"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="30"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={calculateLoan} className="flex-1">
              计算
            </Button>
            <Button onClick={reset} variant="outline">
              重置
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>计算结果</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  ${result.monthlyPayment.toFixed(2)}
                </div>
                <div className="text-sm text-blue-600">月供</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  ${result.totalPayment.toFixed(2)}
                </div>
                <div className="text-sm text-green-600">总还款额</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  ${result.totalInterest.toFixed(2)}
                </div>
                <div className="text-sm text-orange-600">总利息</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
