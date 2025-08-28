'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MortgageResult {
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
  monthlyPrincipalAndInterest: number;
  monthlyTaxes: number;
  monthlyInsurance: number;
  monthlyPMI: number;
  amortizationSchedule: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export default function MortgageCalculator() {
  const t = useTranslations('tools.mortgageCalculator');
  const [loanAmount, setLoanAmount] = useState<string>('300000');
  const [downPayment, setDownPayment] = useState<string>('60000');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [loanTerm, setLoanTerm] = useState<string>('30');
  const [propertyTax, setPropertyTax] = useState<string>('3600');
  const [homeInsurance, setHomeInsurance] = useState<string>('1200');
  const [pmiRate, setPmiRate] = useState<string>('0.5');
  const [result, setResult] = useState<MortgageResult | null>(null);

  const calculateMortgage = () => {
    const principal = parseFloat(loanAmount) || 0;
    const down = parseFloat(downPayment) || 0;
    const rate = parseFloat(interestRate) / 100 / 12 || 0;
    const term = parseFloat(loanTerm) * 12 || 0;
    const taxes = parseFloat(propertyTax) / 12 || 0;
    const insurance = parseFloat(homeInsurance) / 12 || 0;
    const pmi = parseFloat(pmiRate) / 100 / 12 || 0;

    if (principal <= 0 || term <= 0) return;

    const loanAmountAfterDown = principal - down;
    const monthlyRate = rate;
    
    // Calculate monthly principal and interest
    const monthlyPI = loanAmountAfterDown * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    
    // Calculate PMI (if down payment < 20%)
    const downPaymentPercent = (down / principal) * 100;
    const monthlyPMI = downPaymentPercent < 20 ? (loanAmountAfterDown * pmi) : 0;
    
    const totalMonthlyPayment = monthlyPI + taxes + insurance + monthlyPMI;
    const totalPayments = monthlyPI * term;
    const totalInterest = totalPayments - loanAmountAfterDown;

    // Generate amortization schedule (first 5 years)
    const amortizationSchedule = [];
    let balance = loanAmountAfterDown;
    
    for (let month = 1; month <= Math.min(60, term); month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPI - interestPayment;
      balance -= principalPayment;

      amortizationSchedule.push({
        month,
        payment: Math.round(monthlyPI * 100) / 100,
        principal: Math.round(principalPayment * 100) / 100,
        interest: Math.round(interestPayment * 100) / 100,
        balance: Math.round(balance * 100) / 100
      });
    }

    setResult({
      monthlyPayment: Math.round(totalMonthlyPayment * 100) / 100,
      totalPayments: Math.round(totalPayments * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      monthlyPrincipalAndInterest: Math.round(monthlyPI * 100) / 100,
      monthlyTaxes: Math.round(taxes * 100) / 100,
      monthlyInsurance: Math.round(insurance * 100) / 100,
      monthlyPMI: Math.round(monthlyPMI * 100) / 100,
      amortizationSchedule
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
            🏠 {t('title')}
          </CardTitle>
          <CardDescription>
            {t('description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="loan-amount">{t('homePrice')}</Label>
              <Input
                id="loan-amount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="300000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="down-payment">{t('downPayment')}</Label>
              <Input
                id="down-payment"
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                placeholder="60000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interest-rate">{t('interestRate')}</Label>
              <Input
                id="interest-rate"
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="6.5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loan-term">{t('loanTerm')}</Label>
              <Select value={loanTerm} onValueChange={setLoanTerm}>
                <SelectTrigger>
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

            <div className="space-y-2">
              <Label htmlFor="property-tax">{t('annualPropertyTax')}</Label>
              <Input
                id="property-tax"
                type="number"
                value={propertyTax}
                onChange={(e) => setPropertyTax(e.target.value)}
                placeholder="3600"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="home-insurance">{t('annualHomeInsurance')}</Label>
              <Input
                id="home-insurance"
                type="number"
                value={homeInsurance}
                onChange={(e) => setHomeInsurance(e.target.value)}
                placeholder="1200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pmi-rate">{t('pmiRate')}</Label>
              <Input
                id="pmi-rate"
                type="number"
                step="0.1"
                value={pmiRate}
                onChange={(e) => setPmiRate(e.target.value)}
                placeholder="0.5"
              />
            </div>
          </div>

          <Button onClick={calculateMortgage} className="w-full">
            {t('calculate')}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>{t('monthlyPaymentBreakdown')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">{t('totalMonthlyPayment')}</span>
                    <span className="text-xl font-bold text-blue-600">
                      {formatCurrency(result.monthlyPayment)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <span>{t('principalAndInterest')}</span>
                    <span className="font-medium">{formatCurrency(result.monthlyPrincipalAndInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <span>{t('propertyTaxes')}</span>
                    <span className="font-medium">{formatCurrency(result.monthlyTaxes)}</span>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <span>{t('monthlyHomeInsurance')}</span>
                    <span className="font-medium">{formatCurrency(result.monthlyInsurance)}</span>
                  </div>
                  {result.monthlyPMI > 0 && (
                    <div className="flex justify-between items-center p-2">
                      <span>{t('pmi')}</span>
                      <span className="font-medium">{formatCurrency(result.monthlyPMI)}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-sm text-green-700 mb-1">{t('totalInterestPaid')}</div>
                    <div className="text-lg font-bold text-green-800">
                      {formatCurrency(result.totalInterest)}
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-sm text-purple-700 mb-1">{t('totalPayments')}</div>
                    <div className="text-lg font-bold text-purple-800">
                      {formatCurrency(result.totalPayments)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {result.amortizationSchedule.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>{t('amortizationSchedule')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">{t('month')}</th>
                        <th className="text-right p-2">{t('payment')}</th>
                        <th className="text-right p-2">{t('principal')}</th>
                        <th className="text-right p-2">{t('interest')}</th>
                        <th className="text-right p-2">{t('balance')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.amortizationSchedule.map((row, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2">{row.month}</td>
                          <td className="text-right p-2 font-medium">
                            {formatCurrency(row.payment)}
                          </td>
                          <td className="text-right p-2 text-green-600">
                            {formatCurrency(row.principal)}
                          </td>
                          <td className="text-right p-2 text-red-600">
                            {formatCurrency(row.interest)}
                          </td>
                          <td className="text-right p-2">
                            {formatCurrency(row.balance)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-900 mb-2">{t('tips.title')}</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• {t('tips.tip1')}</li>
            <li>• {t('tips.tip2')}</li>
            <li>• {t('tips.tip3')}</li>
            <li>• {t('tips.tip4')}</li>
            <li>• {t('tips.tip5')}</li>
            <li>• {t('tips.tip6')}</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
