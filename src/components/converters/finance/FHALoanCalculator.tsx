'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FHALoanResults {
  monthlyPayment: number;
  principalAndInterest: number;
  upfrontMIP: number;
  monthlyMIP: number;
  totalMIP: number;
  totalCost: number;
  maxLoanAmount: number;
}

export default function FHALoanCalculator() {
  const [homePrice, setHomePrice] = useState<string>('300000');
  const [downPayment, setDownPayment] = useState<string>('10500'); // 3.5% default
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [loanTerm, setLoanTerm] = useState<string>('30');
  const [creditScore, setCreditScore] = useState<string>('580');
  const [propertyTax, setPropertyTax] = useState<string>('3600');
  const [homeInsurance, setHomeInsurance] = useState<string>('1200');
  const [results, setResults] = useState<FHALoanResults | null>(null);

  const creditScoreRanges = {
    '580': '580-619 (Minimum)',
    '620': '620-659 (Fair)',
    '660': '660-699 (Good)',
    '700': '700+ (Excellent)'
  };

  const calculateFHALoan = useCallback(() => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = parseFloat(loanTerm) * 12;

    if (price <= 0 || down < 0 || rate < 0 || months <= 0) return;

    const loanAmount = price - down;
    const downPaymentPercent = (down / price) * 100;

    // FHA loan limits (2024 - varies by area, using national average)
    const fhaLoanLimit = 472030; // National conforming loan limit for most areas
    const maxLoanAmount = Math.min(price * 0.965, fhaLoanLimit); // 96.5% max LTV

    // Upfront Mortgage Insurance Premium (UFMIP) - 1.75% of loan amount
    const upfrontMIP = loanAmount * 0.0175;

    // Annual MIP rates based on loan amount, LTV, and term
    let annualMIPRate = 0.0055; // Default rate
    
    if (loanAmount <= 625500) { // Base loan limit
      if (downPaymentPercent >= 10) {
        annualMIPRate = loanTerm === '30' ? 0.008 : 0.0045;
      } else {
        annualMIPRate = loanTerm === '30' ? 0.0085 : 0.008;
      }
    } else {
      annualMIPRate = loanTerm === '30' ? 0.0105 : 0.0095;
    }

    const monthlyMIP = (loanAmount * annualMIPRate) / 12;

    // Principal and Interest calculation
    const principalAndInterest = (loanAmount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);

    // Total monthly payment (PITI + MIP)
    const monthlyTax = parseFloat(propertyTax) / 12;
    const monthlyInsurance = parseFloat(homeInsurance) / 12;
    const monthlyPayment = principalAndInterest + monthlyMIP + monthlyTax + monthlyInsurance;

    // MIP duration calculation
    let mipDurationMonths = months;
    if (downPaymentPercent >= 10 && loanTerm === '30') {
      mipDurationMonths = 11 * 12; // 11 years for 30-year loans with 10%+ down
    } else if (loanTerm === '15') {
      mipDurationMonths = months; // Life of loan for 15-year
    }

    const totalMIP = upfrontMIP + (monthlyMIP * mipDurationMonths);
    const totalCost = (principalAndInterest * months) + totalMIP + (monthlyTax * months) + (monthlyInsurance * months);

    setResults({
      monthlyPayment,
      principalAndInterest,
      upfrontMIP,
      monthlyMIP,
      totalMIP,
      totalCost,
      maxLoanAmount
    });
  }, [homePrice, downPayment, interestRate, loanTerm, propertyTax, homeInsurance]);

  useEffect(() => {
    calculateFHALoan();
  }, [calculateFHALoan]);

  // Auto-calculate 3.5% down payment when home price changes
  useEffect(() => {
    const price = parseFloat(homePrice);
    if (price > 0) {
      const minDown = price * 0.035;
      if (parseFloat(downPayment) < minDown) {
        setDownPayment(minDown.toString());
      }
    }
  }, [homePrice, downPayment]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getDownPaymentPercent = () => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    return price > 0 ? ((down / price) * 100).toFixed(1) : '0';
  };

  const isEligible = () => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const loanAmount = price - down;
    const downPercent = (down / price) * 100;
    const score = parseInt(creditScore);

    return {
      creditScore: score >= 580,
      downPayment: downPercent >= 3.5,
      loanLimit: loanAmount <= (results?.maxLoanAmount || 0),
      overall: score >= 580 && downPercent >= 3.5 && loanAmount <= (results?.maxLoanAmount || 0)
    };
  };

  const eligibility = isEligible();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏛️ FHA Loan Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
              <TabsTrigger value="benefits">FHA Benefits</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="homePrice">Home Price</Label>
                    <Input
                      id="homePrice"
                      type="number"
                      value={homePrice}
                      onChange={(e) => setHomePrice(e.target.value)}
                      placeholder="Enter home price"
                    />
                  </div>

                  <div>
                    <Label htmlFor="downPayment">Down Payment ({getDownPaymentPercent()}%)</Label>
                    <Input
                      id="downPayment"
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(e.target.value)}
                      placeholder="Enter down payment"
                    />
                    <div className="text-sm text-gray-600 mt-1">
                      Minimum: {formatCurrency(parseFloat(homePrice) * 0.035)} (3.5%)
                    </div>
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
                    <Label htmlFor="loanTerm">Loan Term</Label>
                    <Select value={loanTerm} onValueChange={setLoanTerm}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 Years</SelectItem>
                        <SelectItem value="30">30 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="creditScore">Credit Score Range</Label>
                    <Select value={creditScore} onValueChange={setCreditScore}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select credit score" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(creditScoreRanges).map(([key, label]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="propertyTax">Annual Property Tax</Label>
                    <Input
                      id="propertyTax"
                      type="number"
                      value={propertyTax}
                      onChange={(e) => setPropertyTax(e.target.value)}
                      placeholder="Enter annual property tax"
                    />
                  </div>

                  <div>
                    <Label htmlFor="homeInsurance">Annual Home Insurance</Label>
                    <Input
                      id="homeInsurance"
                      type="number"
                      value={homeInsurance}
                      onChange={(e) => setHomeInsurance(e.target.value)}
                      placeholder="Enter annual insurance"
                    />
                  </div>
                </div>
              </div>

              {results && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-800">FHA Loan Payment Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(results.monthlyPayment)}
                        </div>
                        <div className="text-sm text-blue-600">Total Monthly Payment</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(results.principalAndInterest)}
                        </div>
                        <div className="text-sm text-green-600">Principal & Interest</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {formatCurrency(results.monthlyMIP)}
                        </div>
                        <div className="text-sm text-orange-600">Monthly MIP</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {formatCurrency(results.upfrontMIP)}
                        </div>
                        <div className="text-sm text-purple-600">Upfront MIP</div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span>Property Tax (monthly):</span>
                          <span>{formatCurrency(parseFloat(propertyTax) / 12)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Home Insurance (monthly):</span>
                          <span>{formatCurrency(parseFloat(homeInsurance) / 12)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total MIP (lifetime):</span>
                          <span>{formatCurrency(results.totalMIP)}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span>Total Loan Cost:</span>
                          <span>{formatCurrency(results.totalCost)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="eligibility" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>FHA Loan Eligibility Check</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <span>Credit Score (580+ required)</span>
                      <span className={`font-semibold ${eligibility.creditScore ? 'text-green-600' : 'text-red-600'}`}>
                        {eligibility.creditScore ? '✓ Eligible' : '✗ Not Eligible'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <span>Down Payment (3.5% minimum)</span>
                      <span className={`font-semibold ${eligibility.downPayment ? 'text-green-600' : 'text-red-600'}`}>
                        {eligibility.downPayment ? '✓ Sufficient' : '✗ Insufficient'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <span>Loan Amount (within FHA limits)</span>
                      <span className={`font-semibold ${eligibility.loanLimit ? 'text-green-600' : 'text-red-600'}`}>
                        {eligibility.loanLimit ? '✓ Within Limits' : '✗ Exceeds Limits'}
                      </span>
                    </div>
                    <div className={`p-4 rounded-lg border-2 ${eligibility.overall ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${eligibility.overall ? 'text-green-600' : 'text-red-600'}`}>
                          {eligibility.overall ? '✓ FHA Eligible' : '✗ Not FHA Eligible'}
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                          {eligibility.overall 
                            ? 'You meet the basic FHA loan requirements'
                            : 'Please adjust your parameters to meet FHA requirements'
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="benefits" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800">FHA Loan Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Low down payment (3.5% minimum)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Lower credit score requirements (580+)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Down payment can be a gift</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Assumable loans</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>No prepayment penalties</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-800">Important Considerations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 font-bold">•</span>
                        <span>Mortgage Insurance Premium (MIP) required</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 font-bold">•</span>
                        <span>Property must meet FHA standards</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 font-bold">•</span>
                        <span>Loan limits vary by area</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 font-bold">•</span>
                        <span>Must be primary residence</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 font-bold">•</span>
                        <span>MIP may last for life of loan</span>
                      </li>
                    </ul>
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
