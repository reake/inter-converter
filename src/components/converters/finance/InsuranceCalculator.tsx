'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InsuranceResult {
  monthlyPremium: number;
  annualPremium: number;
  coverageAmount: number;
  deductible: number;
  coverageRatio: number;
  recommendations: string[];
}

export default function InsuranceCalculator() {
  const [insuranceType, setInsuranceType] = useState<string>('life');
  const [age, setAge] = useState<string>('35');
  const [income, setIncome] = useState<string>('75000');
  const [coverageAmount, setCoverageAmount] = useState<string>('500000');
  const [healthStatus, setHealthStatus] = useState<string>('good');
  const [smokingStatus, setSmokingStatus] = useState<string>('no');
  const [result, setResult] = useState<InsuranceResult | null>(null);

  const calculateInsurance = () => {
    const ageNum = parseFloat(age) || 35;
    const incomeNum = parseFloat(income) || 75000;
    const coverageNum = parseFloat(coverageAmount) || 500000;

    let basePremium = 0;
    let recommendations: string[] = [];

    // Base premium calculation based on insurance type
    switch (insuranceType) {
      case 'life':
        basePremium = (coverageNum / 1000) * 0.5; // $0.50 per $1000 coverage
        recommendations = [
          'Consider term life insurance for temporary needs',
          'Whole life insurance for permanent coverage',
          'Review coverage every 5 years or after major life events'
        ];
        break;
      case 'auto':
        basePremium = incomeNum * 0.015; // 1.5% of income
        recommendations = [
          'Maintain good driving record for lower rates',
          'Consider higher deductibles to lower premiums',
          'Bundle with home insurance for discounts'
        ];
        break;
      case 'home':
        basePremium = coverageNum * 0.003; // 0.3% of home value
        recommendations = [
          'Ensure coverage matches replacement cost',
          'Consider umbrella policy for additional liability',
          'Review coverage annually for home improvements'
        ];
        break;
    }

    // Age adjustments
    if (ageNum < 25) basePremium *= 1.5;
    else if (ageNum < 35) basePremium *= 1.2;
    else if (ageNum > 55) basePremium *= 1.3;
    else if (ageNum > 65) basePremium *= 1.6;

    // Health status adjustments (for life insurance)
    if (insuranceType === 'life') {
      switch (healthStatus) {
        case 'excellent':
          basePremium *= 0.8;
          break;
        case 'poor':
          basePremium *= 1.5;
          break;
        case 'fair':
          basePremium *= 1.2;
          break;
      }

      if (smokingStatus === 'yes') {
        basePremium *= 2.0;
      }
    }

    const monthlyPremium = Math.round(basePremium / 12 * 100) / 100;
    const annualPremium = Math.round(basePremium * 100) / 100;
    const coverageRatio = Math.round((coverageNum / incomeNum) * 100) / 100;

    setResult({
      monthlyPremium,
      annualPremium,
      coverageAmount: coverageNum,
      deductible: insuranceType === 'auto' ? 1000 : insuranceType === 'home' ? 2500 : 0,
      coverageRatio,
      recommendations
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🛡️ Insurance Calculator
          </CardTitle>
          <CardDescription>
            Calculate insurance premiums and coverage recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="insurance-type">Insurance Type</Label>
              <Select value={insuranceType} onValueChange={setInsuranceType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="life">Life Insurance</SelectItem>
                  <SelectItem value="auto">Auto Insurance</SelectItem>
                  <SelectItem value="home">Home Insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="35"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="income">Annual Income ($)</Label>
              <Input
                id="income"
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="75000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverage-amount">
                {insuranceType === 'life' ? 'Coverage Amount ($)' : 
                 insuranceType === 'home' ? 'Home Value ($)' : 'Coverage Limit ($)'}
              </Label>
              <Input
                id="coverage-amount"
                type="number"
                value={coverageAmount}
                onChange={(e) => setCoverageAmount(e.target.value)}
                placeholder="500000"
              />
            </div>

            {insuranceType === 'life' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="health-status">Health Status</Label>
                  <Select value={healthStatus} onValueChange={setHealthStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smoking-status">Smoking Status</Label>
                  <Select value={smokingStatus} onValueChange={setSmokingStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">Non-smoker</SelectItem>
                      <SelectItem value="yes">Smoker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>

          <Button onClick={calculateInsurance} className="w-full">
            Calculate Insurance Premium
          </Button>
        </CardContent>
      </Card>

      {result && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Monthly Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(result.monthlyPremium)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Annual Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(result.annualPremium)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Coverage Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(result.coverageAmount)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Coverage Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-orange-600">
                  {result.coverageRatio}x
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {insuranceType === 'life' ? 'Times annual income' : 'Coverage multiple'}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Insurance Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </>
      )}

      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-amber-900 mb-2">🛡️ Insurance Tips</h3>
          <ul className="text-sm text-amber-800 space-y-1">
            <li>• Shop around and compare quotes from multiple insurers</li>
            <li>• Review your coverage annually and after major life changes</li>
            <li>• Consider bundling policies for potential discounts</li>
            <li>• Maintain good credit score to get better rates</li>
            <li>• Don&apos;t be underinsured - adequate coverage is crucial</li>
            <li>• Consider umbrella policy for additional liability protection</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
