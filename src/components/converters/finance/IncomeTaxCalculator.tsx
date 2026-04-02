'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Checkbox } from '@/components/ui/checkbox';

interface TaxResults {
  grossIncome: number;
  adjustedGrossIncome: number;
  taxableIncome: number;
  federalTax: number;
  stateTax: number;
  ficaTax: number;
  totalTax: number;
  netIncome: number;
  effectiveRate: number;
  marginalRate: number;
}

const FEDERAL_BRACKETS = {
  single: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191675, rate: 0.24 },
    { min: 191675, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 }
  ],
  'married-joint': [
    { min: 0, max: 23200, rate: 0.10 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383350, rate: 0.24 },
    { min: 383350, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 }
  ]
} as const;

const STANDARD_DEDUCTIONS = {
  single: 14600,
  'married-joint': 29200,
  'married-separate': 14600,
  'head-of-household': 21900
} as const;

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState<string>('75000');
  const [filingStatus, setFilingStatus] = useState<string>('single');
  const [state, setState] = useState<string>('CA');
  const [deductions, setDeductions] = useState<string>('standard');
  const [itemizedAmount, setItemizedAmount] = useState<string>('15000');
  const [dependents, setDependents] = useState<string>('0');
  const [retirement401k, setRetirement401k] = useState<string>('6000');
  const [results, setResults] = useState<TaxResults | null>(null);

  const filingStatuses = {
    'single': 'Single',
    'married-joint': 'Married Filing Jointly',
    'married-separate': 'Married Filing Separately',
    'head-of-household': 'Head of Household'
  };

  const states = {
    'CA': 'California',
    'NY': 'New York',
    'TX': 'Texas (No State Tax)',
    'FL': 'Florida (No State Tax)',
    'WA': 'Washington (No State Tax)',
    'NV': 'Nevada (No State Tax)',
    'TN': 'Tennessee (No State Tax)',
    'SD': 'South Dakota (No State Tax)',
    'WY': 'Wyoming (No State Tax)'
  };

  const calculateTax = useCallback(() => {
    const grossIncome = parseFloat(income);
    const retirement = parseFloat(retirement401k);
    const numDependents = parseInt(dependents);

    if (grossIncome <= 0) return;

    // Calculate AGI
    const adjustedGrossIncome = grossIncome - retirement;

    // Calculate deductions
    const standardDeduction = STANDARD_DEDUCTIONS[filingStatus as keyof typeof STANDARD_DEDUCTIONS];
    const totalDeductions = deductions === 'standard' 
      ? standardDeduction 
      : Math.max(parseFloat(itemizedAmount), standardDeduction);

    // Calculate taxable income
    const taxableIncome = Math.max(0, adjustedGrossIncome - totalDeductions);

    // Calculate federal tax
    const brackets = filingStatus === 'married-joint' 
      ? FEDERAL_BRACKETS['married-joint'] 
      : FEDERAL_BRACKETS.single;
    
    let federalTax = 0;
    let marginalRate = 0;
    
    for (const bracket of brackets) {
      if (taxableIncome > bracket.min) {
        const taxableAtBracket = Math.min(taxableIncome - bracket.min, bracket.max - bracket.min);
        federalTax += taxableAtBracket * bracket.rate;
        marginalRate = bracket.rate;
      }
    }

    // Child Tax Credit (simplified)
    const childTaxCredit = Math.min(numDependents * 2000, federalTax);
    federalTax = Math.max(0, federalTax - childTaxCredit);

    // Calculate state tax (simplified rates)
    let stateTax = 0;
    if (state === 'CA') {
      stateTax = taxableIncome * 0.093; // Approximate CA rate
    } else if (state === 'NY') {
      stateTax = taxableIncome * 0.0685; // Approximate NY rate
    }
    // No state tax for TX, FL, WA, NV, TN, SD, WY

    // Calculate FICA taxes
    const socialSecurityTax = Math.min(grossIncome * 0.062, 160200 * 0.062); // 2024 SS wage base
    const medicareTax = grossIncome * 0.0145;
    const additionalMedicareTax = grossIncome > 200000 ? (grossIncome - 200000) * 0.009 : 0;
    const ficaTax = socialSecurityTax + medicareTax + additionalMedicareTax;

    const totalTax = federalTax + stateTax + ficaTax;
    const netIncome = grossIncome - totalTax;
    const effectiveRate = (totalTax / grossIncome) * 100;

    setResults({
      grossIncome,
      adjustedGrossIncome,
      taxableIncome,
      federalTax,
      stateTax,
      ficaTax,
      totalTax,
      netIncome,
      effectiveRate,
      marginalRate: marginalRate * 100
    });
  }, [income, filingStatus, state, deductions, itemizedAmount, dependents, retirement401k]);

  useEffect(() => {
    calculateTax();
  }, [calculateTax]);

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
            🧾 Income Tax Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="breakdown">Tax Breakdown</TabsTrigger>
              <TabsTrigger value="strategies">Tax Strategies</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="income">Annual Gross Income</Label>
                    <Input
                      id="income"
                      type="number"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      placeholder="Enter annual income"
                    />
                  </div>

                  <div>
                    <Label htmlFor="filingStatus">Filing Status</Label>
                    <Select value={filingStatus} onValueChange={setFilingStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select filing status" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(filingStatuses).map(([key, label]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(states).map(([key, label]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="dependents">Number of Dependents</Label>
                    <Input
                      id="dependents"
                      type="number"
                      value={dependents}
                      onChange={(e) => setDependents(e.target.value)}
                      placeholder="Enter number of dependents"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="retirement401k">401(k) Contribution</Label>
                    <Input
                      id="retirement401k"
                      type="number"
                      value={retirement401k}
                      onChange={(e) => setRetirement401k(e.target.value)}
                      placeholder="Enter 401k contribution"
                    />
                  </div>

                  <div>
                    <Label htmlFor="deductions">Deduction Type</Label>
                    <Select value={deductions} onValueChange={setDeductions}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select deduction type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Deduction</SelectItem>
                        <SelectItem value="itemized">Itemized Deductions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {deductions === 'itemized' && (
                    <div>
                      <Label htmlFor="itemizedAmount">Itemized Deduction Amount</Label>
                      <Input
                        id="itemizedAmount"
                        type="number"
                        value={itemizedAmount}
                        onChange={(e) => setItemizedAmount(e.target.value)}
                        placeholder="Enter itemized deductions"
                      />
                    </div>
                  )}

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Tax Summary</h4>
                    <div className="text-sm space-y-1">
                      <div>Filing Status: {filingStatuses[filingStatus as keyof typeof filingStatuses]}</div>
                      <div>State: {states[state as keyof typeof states]}</div>
                      <div>Standard Deduction: {formatCurrency(STANDARD_DEDUCTIONS[filingStatus as keyof typeof STANDARD_DEDUCTIONS])}</div>
                    </div>
                  </div>
                </div>
              </div>

              {results && (
                <Card className="bg-green-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800">Tax Calculation Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(results.netIncome)}
                        </div>
                        <div className="text-sm text-green-600">Net Income</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {formatCurrency(results.totalTax)}
                        </div>
                        <div className="text-sm text-red-600">Total Tax</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {results.effectiveRate.toFixed(1)}%
                        </div>
                        <div className="text-sm text-blue-600">Effective Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {results.marginalRate.toFixed(1)}%
                        </div>
                        <div className="text-sm text-purple-600">Marginal Rate</div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">
                          You keep {((results.netIncome / results.grossIncome) * 100).toFixed(1)}% of your gross income
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                          Out of {formatCurrency(results.grossIncome)}, you pay {formatCurrency(results.totalTax)} in taxes
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="breakdown" className="space-y-4">
              {results && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Income Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Gross Income:</span>
                          <span className="font-semibold">{formatCurrency(results.grossIncome)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>401(k) Contribution:</span>
                          <span className="font-semibold text-green-600">-{formatCurrency(parseFloat(retirement401k))}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span>Adjusted Gross Income (AGI):</span>
                          <span className="font-semibold">{formatCurrency(results.adjustedGrossIncome)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Deductions:</span>
                          <span className="font-semibold text-green-600">
                            -{formatCurrency(results.adjustedGrossIncome - results.taxableIncome)}
                          </span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span>Taxable Income:</span>
                          <span className="font-semibold">{formatCurrency(results.taxableIncome)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Tax Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Federal Income Tax:</span>
                          <span className="font-semibold text-red-600">{formatCurrency(results.federalTax)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>State Income Tax:</span>
                          <span className="font-semibold text-red-600">{formatCurrency(results.stateTax)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>FICA Taxes (SS + Medicare):</span>
                          <span className="font-semibold text-red-600">{formatCurrency(results.ficaTax)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 font-bold">
                          <span>Total Tax:</span>
                          <span className="text-red-600">{formatCurrency(results.totalTax)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 font-bold text-lg">
                          <span>Net Income:</span>
                          <span className="text-green-600">{formatCurrency(results.netIncome)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="strategies" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800">Tax Reduction Strategies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Maximize 401(k) contributions ($23,000 limit for 2024)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Contribute to traditional IRA ($7,000 limit)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Use Health Savings Account (HSA) if eligible</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Consider itemizing deductions if beneficial</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Harvest tax losses in investment accounts</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800">Deduction Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Mortgage interest and property taxes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Charitable contributions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>State and local taxes (SALT) up to $10,000</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Medical expenses over 7.5% of AGI</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Business expenses if self-employed</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Tax Planning Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-purple-700 mb-2">📅 Timing Strategies</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Defer income to next year if possible</li>
                        <li>• Accelerate deductions into current year</li>
                        <li>• Consider Roth conversions in low-income years</li>
                        <li>• Time capital gains and losses strategically</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-700 mb-2">💰 Long-term Planning</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Balance traditional vs. Roth retirement accounts</li>
                        <li>• Consider tax-efficient investment strategies</li>
                        <li>• Plan for required minimum distributions</li>
                        <li>• Review tax situation annually</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
