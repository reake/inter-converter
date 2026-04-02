'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator, Home, DollarSign, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface HomeAffordabilityCalculatorProps {
  title?: string;
  description?: string;
}

interface AffordabilityResult {
  maxHomePrice: number;
  maxLoanAmount: number;
  monthlyPayment: number;
  downPaymentNeeded: number;
  closingCosts: number;
  totalCashNeeded: number;
  frontEndRatio: number;
  backEndRatio: number;
  monthlyBreakdown: {
    principalAndInterest: number;
    propertyTax: number;
    homeInsurance: number;
    pmi: number;
    hoaFees: number;
    total: number;
  };
  qualificationStatus: 'excellent' | 'good' | 'marginal' | 'poor';
  recommendations: string[];
}

export default function HomeAffordabilityCalculator({ 
  title = "Home Affordability Calculator",
  description = "Calculate how much house you can afford based on your income, debts, and financial situation."
}: HomeAffordabilityCalculatorProps = {}) {
  const [annualIncome, setAnnualIncome] = useState<string>('70000');
  const [monthlyDebts, setMonthlyDebts] = useState<string>('400');
  const [downPaymentAmount, setDownPaymentAmount] = useState<string>('10000');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [loanTerm, setLoanTerm] = useState<string>('30');
  const [propertyTaxAnnual, setPropertyTaxAnnual] = useState<string>('3600');
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState<string>('1200');
  const [hoaFees, setHoaFees] = useState<string>('0');
  const [creditScore, setCreditScore] = useState<string>('good');
  const [result, setResult] = useState<AffordabilityResult | null>(null);

  const calculateAffordability = useCallback(() => {
    const income = parseFloat(annualIncome) || 0;
    const debts = parseFloat(monthlyDebts) || 0;
    const downPayment = parseFloat(downPaymentAmount) || 0;
    const rate = parseFloat(interestRate) / 100 / 12 || 0;
    const term = parseFloat(loanTerm) * 12 || 360;
    const monthlyPropertyTax = parseFloat(propertyTaxAnnual) / 12 || 0;
    const monthlyInsurance = parseFloat(homeInsuranceAnnual) / 12 || 0;
    const monthlyHOA = parseFloat(hoaFees) || 0;

    if (income <= 0) return;

    const monthlyIncome = income / 12;
    
    // Use 28% front-end ratio and 36% back-end ratio (Forbes standard)
    const maxHousingPayment = monthlyIncome * 0.28;
    const maxTotalDebtPayment = monthlyIncome * 0.36;
    const availableForHousing = Math.min(maxHousingPayment, maxTotalDebtPayment - debts);

    if (availableForHousing <= 0) {
      return;
    }

    // Calculate maximum home price using iterative approach
    let homePrice = 50000;
    
    for (let price = 50000; price <= 3000000; price += 1000) {
      const loanAmount = price - downPayment;
      if (loanAmount <= 0) continue;
      
      const downPaymentPercent = (downPayment / price) * 100;
      const monthlyPI = rate === 0 ? loanAmount / term : 
        (loanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
      const monthlyPMI = downPaymentPercent < 20 ? (loanAmount * 0.005) / 12 : 0;
      
      const totalMonthlyPayment = monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyPMI + monthlyHOA;
      
      if (totalMonthlyPayment <= availableForHousing) {
        homePrice = price;
      } else {
        break;
      }
    }

    const maxLoanAmount = homePrice - downPayment;
    const downPaymentPercent = (downPayment / homePrice) * 100;
    const closingCosts = homePrice * 0.025; // Estimate 2.5% closing costs
    const totalCashNeeded = downPayment + closingCosts;

    // Calculate actual monthly payment breakdown
    const monthlyPI = rate === 0 ? maxLoanAmount / term : 
      (maxLoanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    const monthlyPMI = downPaymentPercent < 20 ? (maxLoanAmount * 0.005) / 12 : 0;
    const totalMonthlyPayment = monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyPMI + monthlyHOA;

    const frontEndRatio = (totalMonthlyPayment / monthlyIncome) * 100;
    const backEndRatio = ((debts + totalMonthlyPayment) / monthlyIncome) * 100;

    // Determine qualification status
    let qualificationStatus: 'excellent' | 'good' | 'marginal' | 'poor';
    if (backEndRatio <= 28 && frontEndRatio <= 25) {
      qualificationStatus = 'excellent';
    } else if (backEndRatio <= 36 && frontEndRatio <= 28) {
      qualificationStatus = 'good';
    } else if (backEndRatio <= 43 && frontEndRatio <= 31) {
      qualificationStatus = 'marginal';
    } else {
      qualificationStatus = 'poor';
    }

    // Generate recommendations based on Forbes guidelines
    const recommendations = [];
    if (backEndRatio > 36) {
      recommendations.push('Consider paying down existing debts to improve your debt-to-income ratio');
    }
    if (downPaymentPercent < 20) {
      recommendations.push('Save for a 20% down payment to avoid PMI and get better loan terms');
    }
    if (totalCashNeeded > income * 0.15) {
      recommendations.push('Build up your savings for down payment and closing costs');
    }
    if (creditScore === 'fair' || creditScore === 'poor') {
      recommendations.push('Work on improving your credit score for better interest rates');
    }
    recommendations.push('Get pre-approved with multiple lenders to compare offers');
    recommendations.push('Factor in maintenance costs (1-3% of home value annually)');
    recommendations.push('Keep an emergency fund separate from your down payment');

    setResult({
      maxHomePrice: Math.round(homePrice),
      maxLoanAmount: Math.round(maxLoanAmount),
      monthlyPayment: Math.round(totalMonthlyPayment),
      downPaymentNeeded: Math.round(downPayment),
      closingCosts: Math.round(closingCosts),
      totalCashNeeded: Math.round(totalCashNeeded),
      frontEndRatio: Math.round(frontEndRatio * 100) / 100,
      backEndRatio: Math.round(backEndRatio * 100) / 100,
      monthlyBreakdown: {
        principalAndInterest: Math.round(monthlyPI),
        propertyTax: Math.round(monthlyPropertyTax),
        homeInsurance: Math.round(monthlyInsurance),
        pmi: Math.round(monthlyPMI),
        hoaFees: Math.round(monthlyHOA),
        total: Math.round(totalMonthlyPayment)
      },
      qualificationStatus,
      recommendations
    });
  }, [annualIncome, monthlyDebts, downPaymentAmount, interestRate, loanTerm, propertyTaxAnnual, homeInsuranceAnnual, hoaFees, creditScore]);

  useEffect(() => {
    calculateAffordability();
  }, [calculateAffordability]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getQualificationColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'marginal': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'poor': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getQualificationIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'good': return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case 'marginal': return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case 'poor': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default: return <Calculator className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Home className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Financial Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="annual-income" className="text-base font-medium">Annual Income</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="annual-income"
                  type="number"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(e.target.value)}
                  className="pl-10 h-12 text-base"
                  placeholder="70,000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthly-debts" className="text-base font-medium">Monthly Debt Payments</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="monthly-debts"
                  type="number"
                  value={monthlyDebts}
                  onChange={(e) => setMonthlyDebts(e.target.value)}
                  className="pl-10 h-12 text-base"
                  placeholder="400"
                />
              </div>
              <p className="text-sm text-gray-500">Include student loans, car payments, credit cards, etc.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="down-payment" className="text-base font-medium">Down Payment Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="down-payment"
                  type="number"
                  value={downPaymentAmount}
                  onChange={(e) => setDownPaymentAmount(e.target.value)}
                  className="pl-10 h-12 text-base"
                  placeholder="10,000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="interest-rate" className="text-base font-medium">Interest Rate</Label>
                <div className="relative">
                  <Input
                    id="interest-rate"
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="pr-8 h-12 text-base"
                    placeholder="6.50"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loan-term" className="text-base font-medium">Loan Term</Label>
                <Select value={loanTerm} onValueChange={setLoanTerm}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 Years</SelectItem>
                    <SelectItem value="20">20 Years</SelectItem>
                    <SelectItem value="25">25 Years</SelectItem>
                    <SelectItem value="30">30 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="property-tax" className="text-sm font-medium">Property Tax (Annual)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                  <Input
                    id="property-tax"
                    type="number"
                    value={propertyTaxAnnual}
                    onChange={(e) => setPropertyTaxAnnual(e.target.value)}
                    className="pl-7 h-10 text-sm"
                    placeholder="3,600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="home-insurance" className="text-sm font-medium">Home Insurance (Annual)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                  <Input
                    id="home-insurance"
                    type="number"
                    value={homeInsuranceAnnual}
                    onChange={(e) => setHomeInsuranceAnnual(e.target.value)}
                    className="pl-7 h-10 text-sm"
                    placeholder="1,200"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hoa-fees" className="text-sm font-medium">HOA Fees (Monthly)</Label>
              <div className="relative">
                <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                <Input
                  id="hoa-fees"
                  type="number"
                  value={hoaFees}
                  onChange={(e) => setHoaFees(e.target.value)}
                  className="pl-7 h-10 text-sm"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="credit-score" className="text-sm font-medium">Credit Score Range</Label>
              <Select value={creditScore} onValueChange={setCreditScore}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent (740-850)</SelectItem>
                  <SelectItem value="good">Good (670-739)</SelectItem>
                  <SelectItem value="fair">Fair (580-669)</SelectItem>
                  <SelectItem value="poor">Poor (300-579)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={calculateAffordability} className="w-full h-12 text-lg font-semibold">
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Affordability
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Affordability Results
                </CardTitle>
                <Badge className={`${getQualificationColor(result.qualificationStatus)} border`}>
                  {getQualificationIcon(result.qualificationStatus)}
                  <span className="ml-1 capitalize">{result.qualificationStatus}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Results */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="text-sm font-medium text-blue-600 mb-1">Maximum Home Price</div>
                <div className="text-4xl font-bold text-blue-900">{formatCurrency(result.maxHomePrice)}</div>
                <div className="text-sm text-blue-600">Based on your financial profile</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{formatCurrency(result.monthlyPayment)}</div>
                  <div className="text-sm text-green-700">Monthly Payment</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">{formatCurrency(result.totalCashNeeded)}</div>
                  <div className="text-sm text-purple-700">Cash Needed</div>
                </div>
              </div>

              {/* Payment Breakdown */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Monthly Payment Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="text-gray-700">Principal & Interest</span>
                    <span className="font-semibold">{formatCurrency(result.monthlyBreakdown.principalAndInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="text-gray-700">Property Tax</span>
                    <span className="font-semibold">{formatCurrency(result.monthlyBreakdown.propertyTax)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <span className="text-gray-700">Home Insurance</span>
                    <span className="font-semibold">{formatCurrency(result.monthlyBreakdown.homeInsurance)}</span>
                  </div>
                  {result.monthlyBreakdown.pmi > 0 && (
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                      <span className="text-orange-700">PMI</span>
                      <span className="font-semibold text-orange-700">{formatCurrency(result.monthlyBreakdown.pmi)}</span>
                    </div>
                  )}
                  {result.monthlyBreakdown.hoaFees > 0 && (
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-700">HOA Fees</span>
                      <span className="font-semibold">{formatCurrency(result.monthlyBreakdown.hoaFees)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* DTI Ratios */}
              <div className="border-t pt-4 space-y-3">
                <h4 className="font-semibold text-gray-900">Debt-to-Income Ratios</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className={`text-lg font-bold ${
                      result.frontEndRatio <= 28 ? 'text-green-600' : 
                      result.frontEndRatio <= 31 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {result.frontEndRatio}%
                    </div>
                    <div className="text-sm text-gray-600">Front-End Ratio</div>
                    <div className="text-xs text-gray-500">(Housing only)</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className={`text-lg font-bold ${
                      result.backEndRatio <= 36 ? 'text-green-600' : 
                      result.backEndRatio <= 43 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {result.backEndRatio}%
                    </div>
                    <div className="text-sm text-gray-600">Back-End Ratio</div>
                    <div className="text-xs text-gray-500">(All debts)</div>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Maximum Loan Amount:</span>
                  <span className="font-semibold">{formatCurrency(result.maxLoanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Down Payment:</span>
                  <span className="font-semibold">{formatCurrency(result.downPaymentNeeded)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Closing Costs:</span>
                  <span className="font-semibold">{formatCurrency(result.closingCosts)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recommendations */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Personalized Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-800">{rec}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Educational Content */}
      <Card>
        <CardHeader>
          <CardTitle>Understanding Home Affordability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600">The 28/36 Rule</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <strong>Front-end ratio:</strong> Housing costs ≤ 28% of gross income</li>
                <li>• <strong>Back-end ratio:</strong> Total debt payments ≤ 36% of gross income</li>
                <li>• These are guidelines - actual approval depends on credit, assets, and loan type</li>
                <li>• FHA loans may allow higher ratios (up to 43% back-end)</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-600">Key Factors That Impact Affordability</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <strong>Credit Score:</strong> Higher scores get better rates</li>
                <li>• <strong>Down Payment:</strong> 20%+ avoids PMI</li>
                <li>• <strong>Debt-to-Income:</strong> Lower DTI = more buying power</li>
                <li>• <strong>Interest Rates:</strong> Even 0.5% makes a big difference</li>
                <li>• <strong>Location:</strong> Property taxes and insurance vary</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">Important Reminders</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• This calculator provides estimates - actual loan approval depends on many factors</li>
                  <li>• Budget for maintenance (1-3% of home value annually)</li>
                  <li>• Keep an emergency fund separate from your down payment</li>
                  <li>• Get pre-approved before house hunting for accurate numbers</li>
                  <li>• Consider all homeownership costs: utilities, repairs, upgrades</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
