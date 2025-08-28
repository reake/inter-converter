'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PayrollResults {
  grossPay: number;
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  totalDeductions: number;
  netPay: number;
  effectiveRate: number;
  yearlyProjection: {
    grossAnnual: number;
    netAnnual: number;
    totalTaxes: number;
  };
}

export default function PayrollTaxCalculator() {
  const [salary, setSalary] = useState<string>('75000');
  const [payFrequency, setPayFrequency] = useState<string>('biweekly');
  const [filingStatus, setFilingStatus] = useState<string>('single');
  const [allowances, setAllowances] = useState<string>('1');
  const [state, setState] = useState<string>('california');
  const [preDeductions, setPreDeductions] = useState<string>('500');
  const [results, setResults] = useState<PayrollResults | null>(null);

  const calculatePayroll = () => {
    const annualSalary = parseFloat(salary);
    const preTaxDeductions = parseFloat(preDeductions);
    const allowancesNum = parseInt(allowances);
    
    if (annualSalary <= 0) return;

    // Calculate pay periods per year
    const payPeriods = payFrequency === 'weekly' ? 52 : 
                      payFrequency === 'biweekly' ? 26 : 
                      payFrequency === 'semimonthly' ? 24 : 12;
    
    const grossPay = annualSalary / payPeriods;
    const preTaxPerPay = preTaxDeductions / payPeriods;
    const taxableIncome = grossPay - preTaxPerPay;
    const annualTaxableIncome = annualSalary - preTaxDeductions;
    
    // Federal income tax (simplified brackets for 2024)
    let federalTax = 0;
    const federalBrackets = filingStatus === 'single' ? 
      [[0, 0.10], [11000, 0.12], [44725, 0.22], [95375, 0.24], [182050, 0.32], [231250, 0.35], [578125, 0.37]] :
      [[0, 0.10], [22000, 0.12], [89450, 0.22], [190750, 0.24], [364200, 0.32], [462500, 0.35], [693750, 0.37]];
    
    let remainingIncome = annualTaxableIncome;
    for (let i = 0; i < federalBrackets.length; i++) {
      const [threshold, rate] = federalBrackets[i];
      const nextThreshold = i < federalBrackets.length - 1 ? federalBrackets[i + 1][0] : Infinity;
      const taxableAtThisRate = Math.min(remainingIncome, nextThreshold - threshold);
      
      if (taxableAtThisRate > 0) {
        federalTax += taxableAtThisRate * rate;
        remainingIncome -= taxableAtThisRate;
      }
      
      if (remainingIncome <= 0) break;
    }
    
    // Adjust for allowances (simplified)
    federalTax = Math.max(0, federalTax - (allowancesNum * 4300));
    federalTax = federalTax / payPeriods;
    
    // State tax (simplified - California as example)
    let stateTax = 0;
    if (state === 'california') {
      const caRate = annualTaxableIncome > 100000 ? 0.093 : 
                     annualTaxableIncome > 50000 ? 0.08 : 0.06;
      stateTax = (annualTaxableIncome * caRate) / payPeriods;
    } else if (state === 'newyork') {
      const nyRate = annualTaxableIncome > 100000 ? 0.085 : 0.065;
      stateTax = (annualTaxableIncome * nyRate) / payPeriods;
    }
    // Texas, Florida, etc. have no state income tax
    
    // Social Security (6.2% up to wage base)
    const ssWageBase = 160200; // 2024 limit
    const socialSecurity = Math.min(taxableIncome * 0.062, (ssWageBase / payPeriods) * 0.062);
    
    // Medicare (1.45% + 0.9% additional for high earners)
    let medicare = taxableIncome * 0.0145;
    if (annualTaxableIncome > (filingStatus === 'single' ? 200000 : 250000)) {
      medicare += taxableIncome * 0.009; // Additional Medicare tax
    }
    
    const totalDeductions = federalTax + stateTax + socialSecurity + medicare + preTaxPerPay;
    const netPay = grossPay - totalDeductions;
    const effectiveRate = (totalDeductions - preTaxPerPay) / taxableIncome;
    
    const yearlyProjection = {
      grossAnnual: annualSalary,
      netAnnual: netPay * payPeriods,
      totalTaxes: (federalTax + stateTax + socialSecurity + medicare) * payPeriods
    };

    setResults({
      grossPay,
      federalTax,
      stateTax,
      socialSecurity,
      medicare,
      totalDeductions,
      netPay,
      effectiveRate,
      yearlyProjection
    });
  };

  useEffect(() => {
    calculatePayroll();
  }, [salary, payFrequency, filingStatus, allowances, state, preDeductions]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (rate: number) => {
    return (rate * 100).toFixed(1) + '%';
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💰 Payroll Tax Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="breakdown">Tax Breakdown</TabsTrigger>
              <TabsTrigger value="planning">Tax Planning</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="salary">Annual Salary</Label>
                    <Input
                      id="salary"
                      type="number"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      placeholder="Enter annual salary"
                    />
                  </div>

                  <div>
                    <Label htmlFor="payFrequency">Pay Frequency</Label>
                    <Select value={payFrequency} onValueChange={setPayFrequency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pay frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly (52 pays/year)</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly (26 pays/year)</SelectItem>
                        <SelectItem value="semimonthly">Semi-monthly (24 pays/year)</SelectItem>
                        <SelectItem value="monthly">Monthly (12 pays/year)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="filingStatus">Filing Status</Label>
                    <Select value={filingStatus} onValueChange={setFilingStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select filing status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married Filing Jointly</SelectItem>
                        <SelectItem value="marriedSeparate">Married Filing Separately</SelectItem>
                        <SelectItem value="headOfHousehold">Head of Household</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="allowances">W-4 Allowances</Label>
                    <Input
                      id="allowances"
                      type="number"
                      value={allowances}
                      onChange={(e) => setAllowances(e.target.value)}
                      placeholder="Enter number of allowances"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="california">California</SelectItem>
                        <SelectItem value="newyork">New York</SelectItem>
                        <SelectItem value="texas">Texas (No State Tax)</SelectItem>
                        <SelectItem value="florida">Florida (No State Tax)</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="preDeductions">Pre-tax Deductions (Annual)</Label>
                    <Input
                      id="preDeductions"
                      type="number"
                      value={preDeductions}
                      onChange={(e) => setPreDeductions(e.target.value)}
                      placeholder="401k, health insurance, etc."
                    />
                  </div>

                  {results && (
                    <Card className="bg-green-50 border-green-200">
                      <CardHeader>
                        <CardTitle className="text-green-800 text-sm">Paycheck Breakdown</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between font-semibold">
                            <span>Gross Pay:</span>
                            <span>{formatCurrency(results.grossPay)}</span>
                          </div>
                          <div className="flex justify-between text-red-600">
                            <span>Federal Tax:</span>
                            <span>-{formatCurrency(results.federalTax)}</span>
                          </div>
                          <div className="flex justify-between text-red-600">
                            <span>State Tax:</span>
                            <span>-{formatCurrency(results.stateTax)}</span>
                          </div>
                          <div className="flex justify-between text-red-600">
                            <span>Social Security:</span>
                            <span>-{formatCurrency(results.socialSecurity)}</span>
                          </div>
                          <div className="flex justify-between text-red-600">
                            <span>Medicare:</span>
                            <span>-{formatCurrency(results.medicare)}</span>
                          </div>
                          <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                            <span>Net Pay:</span>
                            <span className="text-green-600">{formatCurrency(results.netPay)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Effective Rate:</span>
                            <span>{formatPercent(results.effectiveRate)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {results && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Annual Projection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-sm text-gray-600">Gross Annual</div>
                        <div className="font-semibold">{formatCurrency(results.yearlyProjection.grossAnnual)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Total Taxes</div>
                        <div className="font-semibold text-red-600">{formatCurrency(results.yearlyProjection.totalTaxes)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Net Annual</div>
                        <div className="font-semibold text-green-600">{formatCurrency(results.yearlyProjection.netAnnual)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="breakdown" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">Federal Income Tax</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📊 Progressive tax brackets</div>
                      <div>💰 2024 rates: 10% to 37%</div>
                      <div>📋 Based on taxable income</div>
                      <div>🏠 Reduced by allowances/deductions</div>
                      <div>📈 Higher income = higher rate</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">State Income Tax</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🗺️ Varies by state (0% to 13.3%)</div>
                      <div>🚫 No tax: TX, FL, NV, WA, etc.</div>
                      <div>📈 CA has highest rates</div>
                      <div>🏠 May have different deductions</div>
                      <div>📋 Some cities have additional tax</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Social Security</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📊 6.2% employee + 6.2% employer</div>
                      <div>💰 2024 wage base: $160,200</div>
                      <div>🛡️ Funds retirement benefits</div>
                      <div>📈 No tax on wages above base</div>
                      <div>🏦 Self-employed pay 12.4%</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-orange-800 text-sm">Medicare Tax</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📊 1.45% employee + 1.45% employer</div>
                      <div>💰 No wage base limit</div>
                      <div>📈 Additional 0.9% over $200K</div>
                      <div>🏥 Funds Medicare program</div>
                      <div>🏦 Self-employed pay 2.9%</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="planning" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 text-sm">Reduce Tax Withholding</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>📋 Maximize 401(k) contributions</div>
                      <div>🏥 Use HSA if available</div>
                      <div>🚗 Commuter benefits</div>
                      <div>👶 Dependent care FSA</div>
                      <div>📊 Update W-4 when life changes</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-sm">Year-End Planning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>💰 Maximize retirement contributions</div>
                      <div>📈 Tax-loss harvesting</div>
                      <div>🎁 Charitable giving</div>
                      <div>📋 Bunch deductions if beneficial</div>
                      <div>⏰ Make estimated payments if needed</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-purple-800 text-sm">Withholding Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>🎯 Aim for small refund or owe</div>
                      <div>💰 Don't give government free loan</div>
                      <div>📊 Review quarterly</div>
                      <div>📈 Adjust for bonuses/raises</div>
                      <div>🏦 Consider extra withholding vs. estimated payments</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-800 text-sm">Common Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div>❌ Not updating W-4 after life changes</div>
                      <div>❌ Claiming too many allowances</div>
                      <div>❌ Forgetting about bonuses</div>
                      <div>❌ Not planning for state taxes</div>
                      <div>❌ Ignoring additional Medicare tax</div>
                    </div>
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
