'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, TrendingUp, PieChart, FileText } from 'lucide-react';

export function TrustCalculator() {
  const [trustPrincipal, setTrustPrincipal] = useState<string>('');
  const [annualIncome, setAnnualIncome] = useState<string>('');
  const [distributionRate, setDistributionRate] = useState<string>('5');
  const [distributionType, setDistributionType] = useState<string>('income');
  const [beneficiaryTaxRate, setBeneficiaryTaxRate] = useState<string>('22');
  const [results, setResults] = useState<{
    totalDistribution: number;
    incomeDistribution: number;
    principalDistribution: number;
    beneficiaryTax: number;
    trustTax: number;
    netToBeneficiary: number;
    remainingPrincipal: number;
    yieldRate: number;
  } | null>(null);

  const calculateTrustDistribution = () => {
    const principal = parseFloat(trustPrincipal) || 0;
    const income = parseFloat(annualIncome) || 0;
    const rate = parseFloat(distributionRate) || 0;
    const taxRate = parseFloat(beneficiaryTaxRate) || 0;
    
    if (principal <= 0) return;

    const yieldRate = principal > 0 ? (income / principal) * 100 : 0;
    const totalDistribution = (principal * rate) / 100;
    
    let incomeDistribution = 0;
    let principalDistribution = 0;
    let beneficiaryTax = 0;
    let trustTax = 0;

    if (distributionType === 'income') {
      // Income-only distribution
      incomeDistribution = Math.min(totalDistribution, income);
      principalDistribution = Math.max(0, totalDistribution - income);
      beneficiaryTax = (incomeDistribution * taxRate) / 100;
      trustTax = Math.max(0, (income - incomeDistribution) * 0.37); // Trust tax rate ~37%
    } else if (distributionType === 'principal') {
      // Principal-only distribution
      principalDistribution = totalDistribution;
      incomeDistribution = 0;
      beneficiaryTax = 0; // Principal distributions are not taxable
      trustTax = income * 0.37; // Trust pays tax on all income
    } else {
      // Mixed distribution (income first, then principal)
      incomeDistribution = Math.min(totalDistribution, income);
      principalDistribution = Math.max(0, totalDistribution - income);
      beneficiaryTax = (incomeDistribution * taxRate) / 100;
      trustTax = Math.max(0, (income - incomeDistribution) * 0.37);
    }

    const netToBeneficiary = totalDistribution - beneficiaryTax;
    const remainingPrincipal = principal - principalDistribution;

    setResults({
      totalDistribution,
      incomeDistribution,
      principalDistribution,
      beneficiaryTax,
      trustTax,
      netToBeneficiary,
      remainingPrincipal,
      yieldRate
    });
  };

  useEffect(() => {
    if (trustPrincipal && annualIncome) {
      calculateTrustDistribution();
    }
  }, [trustPrincipal, annualIncome, distributionRate, distributionType, beneficiaryTaxRate]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (rate: number) => {
    return `${rate.toFixed(2)}%`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Calculator className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Trust Calculator</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Calculate trust distributions and analyze tax implications for beneficiaries and trustees
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Trust Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="trustPrincipal">Trust Principal ($)</Label>
              <Input
                id="trustPrincipal"
                type="number"
                placeholder="Enter trust principal amount"
                value={trustPrincipal}
                onChange={(e) => setTrustPrincipal(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="annualIncome">Annual Income Generated ($)</Label>
              <Input
                id="annualIncome"
                type="number"
                placeholder="Enter annual income"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="distributionRate">Distribution Rate (%)</Label>
              <Input
                id="distributionRate"
                type="number"
                placeholder="Enter distribution percentage"
                value={distributionRate}
                onChange={(e) => setDistributionRate(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="distributionType">Distribution Type</Label>
              <Select value={distributionType} onValueChange={setDistributionType}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select distribution type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income Only</SelectItem>
                  <SelectItem value="principal">Principal Only</SelectItem>
                  <SelectItem value="mixed">Income First, Then Principal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="beneficiaryTaxRate">Beneficiary Tax Rate (%)</Label>
              <Select value={beneficiaryTaxRate} onValueChange={setBeneficiaryTaxRate}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select tax rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10% (Low Income)</SelectItem>
                  <SelectItem value="12">12%</SelectItem>
                  <SelectItem value="22">22% (Middle Income)</SelectItem>
                  <SelectItem value="24">24%</SelectItem>
                  <SelectItem value="32">32%</SelectItem>
                  <SelectItem value="35">35%</SelectItem>
                  <SelectItem value="37">37% (High Income)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={calculateTrustDistribution} className="w-full">
              Calculate Distribution
            </Button>
          </CardContent>
        </Card>

        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5" />
                <span>Distribution Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600 font-medium">Total Distribution</div>
                  <div className="text-lg font-bold text-blue-900">
                    {formatCurrency(results.totalDistribution)}
                  </div>
                </div>

                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-600 font-medium">Net to Beneficiary</div>
                  <div className="text-lg font-bold text-green-900">
                    {formatCurrency(results.netToBeneficiary)}
                  </div>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-sm text-purple-600 font-medium">Income Distribution</div>
                  <div className="text-lg font-bold text-purple-900">
                    {formatCurrency(results.incomeDistribution)}
                  </div>
                </div>

                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="text-sm text-orange-600 font-medium">Principal Distribution</div>
                  <div className="text-lg font-bold text-orange-900">
                    {formatCurrency(results.principalDistribution)}
                  </div>
                </div>

                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="text-sm text-red-600 font-medium">Beneficiary Tax</div>
                  <div className="text-lg font-bold text-red-900">
                    {formatCurrency(results.beneficiaryTax)}
                  </div>
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="text-sm text-yellow-600 font-medium">Trust Tax</div>
                  <div className="text-lg font-bold text-yellow-900">
                    {formatCurrency(results.trustTax)}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Remaining Principal</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {formatCurrency(results.remainingPrincipal)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Trust Yield Rate</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {formatPercentage(results.yieldRate)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Tax Implications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Income Distributions</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Taxable to beneficiary</li>
                <li>• Trust gets deduction</li>
                <li>• K-1 form issued</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Principal Distributions</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Not taxable to beneficiary</li>
                <li>• Reduces trust principal</li>
                <li>• No tax deduction for trust</li>
              </ul>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-2">Undistributed Income</h4>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• Trust pays tax (~37%)</li>
                <li>• Higher than individual rates</li>
                <li>• Consider distribution timing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
