'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';

interface VALoanResults {
  monthlyPayment: number;
  principalAndInterest: number;
  fundingFee: number;
  totalCost: number;
  maxLoanAmount: number;
  entitlementUsed: number;
  remainingEntitlement: number;
}

export default function VALoanCalculator() {
  const [homePrice, setHomePrice] = useState<string>('400000');
  const [downPayment, setDownPayment] = useState<string>('0');
  const [interestRate, setInterestRate] = useState<string>('6.25');
  const [loanTerm, setLoanTerm] = useState<string>('30');
  const [serviceType, setServiceType] = useState<string>('regular');
  const [firstTimeUse, setFirstTimeUse] = useState<boolean>(true);
  const [disability, setDisability] = useState<boolean>(false);
  const [propertyTax, setPropertyTax] = useState<string>('4800');
  const [homeInsurance, setHomeInsurance] = useState<string>('1500');
  const [results, setResults] = useState<VALoanResults | null>(null);

  const serviceTypes = {
    'regular': 'Regular Military',
    'reserves': 'Reserves/National Guard',
    'surviving-spouse': 'Surviving Spouse'
  };

  const calculateVALoan = () => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = parseFloat(loanTerm) * 12;

    if (price <= 0 || down < 0 || rate < 0 || months <= 0) return;

    const loanAmount = price - down;
    
    // VA loan limits (2024)
    const vaLoanLimit = 766550; // National conforming loan limit
    const basicEntitlement = 36000;
    const bonusEntitlement = vaLoanLimit - basicEntitlement;
    const totalEntitlement = basicEntitlement + bonusEntitlement;

    // Calculate maximum loan amount (no down payment required if within entitlement)
    const maxLoanAmount = Math.min(price, totalEntitlement * 4); // 25% entitlement rule

    // VA Funding Fee calculation
    let fundingFeeRate = 0;
    
    if (!disability) { // Disabled veterans are exempt from funding fee
      if (firstTimeUse) {
        if (down === 0) {
          fundingFeeRate = serviceType === 'reserves' ? 0.024 : 0.023; // 2.4% or 2.3%
        } else if ((down / price) >= 0.05) {
          fundingFeeRate = serviceType === 'reserves' ? 0.0175 : 0.0165; // 1.75% or 1.65%
        } else if ((down / price) >= 0.10) {
          fundingFeeRate = serviceType === 'reserves' ? 0.0125 : 0.0115; // 1.25% or 1.15%
        }
      } else {
        // Subsequent use
        fundingFeeRate = down === 0 ? 0.036 : 0.0125; // 3.6% or 1.25%
      }
    }

    const fundingFee = loanAmount * fundingFeeRate;
    const totalLoanWithFee = loanAmount + fundingFee;

    // Principal and Interest calculation (including funding fee in loan amount)
    const principalAndInterest = (totalLoanWithFee * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);

    // Total monthly payment (no PMI required for VA loans)
    const monthlyTax = parseFloat(propertyTax) / 12;
    const monthlyInsurance = parseFloat(homeInsurance) / 12;
    const monthlyPayment = principalAndInterest + monthlyTax + monthlyInsurance;

    const totalCost = (principalAndInterest * months) + (monthlyTax * months) + (monthlyInsurance * months);

    // Entitlement calculations
    const entitlementUsed = Math.min(loanAmount * 0.25, totalEntitlement);
    const remainingEntitlement = totalEntitlement - entitlementUsed;

    setResults({
      monthlyPayment,
      principalAndInterest,
      fundingFee,
      totalCost,
      maxLoanAmount,
      entitlementUsed,
      remainingEntitlement
    });
  };

  useEffect(() => {
    calculateVALoan();
  }, [homePrice, downPayment, interestRate, loanTerm, serviceType, firstTimeUse, disability, propertyTax, homeInsurance]);

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
    const loanAmount = price - parseFloat(downPayment);
    
    return {
      loanLimit: loanAmount <= (results?.maxLoanAmount || 0),
      occupancy: true, // Assumed primary residence
      creditScore: true, // VA doesn't set minimum credit score
      overall: loanAmount <= (results?.maxLoanAmount || 0)
    };
  };

  const eligibility = isEligible();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🇺🇸 VA Loan Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="entitlement">Entitlement</TabsTrigger>
              <TabsTrigger value="benefits">VA Benefits</TabsTrigger>
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
                      placeholder="Enter down payment (optional)"
                    />
                    <div className="text-sm text-green-600 mt-1">
                      ✓ No down payment required with VA loan
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
                    <Label htmlFor="serviceType">Service Type</Label>
                    <Select value={serviceType} onValueChange={setServiceType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(serviceTypes).map(([key, label]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="firstTimeUse" 
                        checked={firstTimeUse}
                        onCheckedChange={setFirstTimeUse}
                      />
                      <Label htmlFor="firstTimeUse">First-time VA loan use</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="disability" 
                        checked={disability}
                        onCheckedChange={setDisability}
                      />
                      <Label htmlFor="disability">Service-connected disability (10%+)</Label>
                    </div>
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
                    <CardTitle className="text-blue-800">VA Loan Payment Breakdown</CardTitle>
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
                          {formatCurrency(results.fundingFee)}
                        </div>
                        <div className="text-sm text-orange-600">VA Funding Fee</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          $0
                        </div>
                        <div className="text-sm text-purple-600">PMI (Not Required)</div>
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
                          <span>Funding Fee Rate:</span>
                          <span>{disability ? '0% (Exempt)' : `${(results.fundingFee / (parseFloat(homePrice) - parseFloat(downPayment)) * 100).toFixed(2)}%`}</span>
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

            <TabsContent value="entitlement" className="space-y-4">
              {results && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>VA Loan Entitlement Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">
                              {formatCurrency(results.entitlementUsed)}
                            </div>
                            <div className="text-sm text-blue-600">Entitlement Used</div>
                          </div>
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">
                              {formatCurrency(results.remainingEntitlement)}
                            </div>
                            <div className="text-sm text-green-600">Remaining Entitlement</div>
                          </div>
                          <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">
                              {formatCurrency(results.maxLoanAmount)}
                            </div>
                            <div className="text-sm text-purple-600">Max Loan Amount</div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Entitlement Explanation</h4>
                          <ul className="text-sm space-y-1 text-gray-600">
                            <li>• Basic entitlement: $36,000</li>
                            <li>• Bonus entitlement: Up to $730,550 (varies by area)</li>
                            <li>• Total entitlement: $766,550 in most areas</li>
                            <li>• You can borrow up to 4x your available entitlement with no down payment</li>
                            <li>• Entitlement can be restored after paying off previous VA loan</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="benefits" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800">VA Loan Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>No down payment required (0%)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>No private mortgage insurance (PMI)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Competitive interest rates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>No prepayment penalties</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Assumable loans</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Reusable benefit</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800">Eligibility Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Active duty, veteran, or eligible surviving spouse</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Meet minimum service requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Obtain Certificate of Eligibility (COE)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Meet lender's credit and income requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Property must be primary residence</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Property must meet VA standards</span>
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
