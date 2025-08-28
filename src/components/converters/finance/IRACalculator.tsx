'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

interface IRAResults {
  totalContributions: number;
  totalEarnings: number;
  finalBalance: number;
  taxSavings: number;
  afterTaxValue: number;
  requiredMinimumDistribution: number;
}

export default function IRACalculator() {
  const [currentAge, setCurrentAge] = useState<string>('30');
  const [retirementAge, setRetirementAge] = useState<string>('65');
  const [currentBalance, setCurrentBalance] = useState<string>('10000');
  const [annualContribution, setAnnualContribution] = useState<string>('6000');
  const [expectedReturn, setExpectedReturn] = useState<string>('7');
  const [iraType, setIraType] = useState<string>('traditional');
  const [currentTaxRate, setCurrentTaxRate] = useState<string>('22');
  const [retirementTaxRate, setRetirementTaxRate] = useState<string>('18');
  const [results, setResults] = useState<IRAResults | null>(null);

  const iraTypes = {
    'traditional': 'Traditional IRA',
    'roth': 'Roth IRA',
    'sep': 'SEP-IRA',
    'simple': 'SIMPLE IRA'
  };

  const contributionLimits = {
    'traditional': { under50: 6500, over50: 7500 },
    'roth': { under50: 6500, over50: 7500 },
    'sep': { limit: 66000 },
    'simple': { under50: 15500, over50: 19000 }
  };

  const calculateIRA = () => {
    const age = parseInt(currentAge);
    const retAge = parseInt(retirementAge);
    const balance = parseFloat(currentBalance);
    const contribution = parseFloat(annualContribution);
    const returnRate = parseFloat(expectedReturn) / 100;
    const currentTax = parseFloat(currentTaxRate) / 100;
    const retirementTax = parseFloat(retirementTaxRate) / 100;

    if (age >= retAge || balance < 0 || contribution < 0 || returnRate < 0) return;

    const yearsToRetirement = retAge - age;
    
    // Calculate future value with compound interest
    const futureValueCurrent = balance * Math.pow(1 + returnRate, yearsToRetirement);
    const futureValueContributions = contribution * (Math.pow(1 + returnRate, yearsToRetirement) - 1) / returnRate;
    const totalFutureValue = futureValueCurrent + futureValueContributions;
    
    const totalContributions = contribution * yearsToRetirement;
    const totalEarnings = totalFutureValue - balance - totalContributions;

    // Tax calculations based on IRA type
    let taxSavings = 0;
    let afterTaxValue = totalFutureValue;
    
    if (iraType === 'traditional' || iraType === 'sep' || iraType === 'simple') {
      // Traditional IRA: tax deduction now, taxed in retirement
      taxSavings = totalContributions * currentTax;
      afterTaxValue = totalFutureValue * (1 - retirementTax);
    } else if (iraType === 'roth') {
      // Roth IRA: no tax deduction now, tax-free in retirement
      taxSavings = 0;
      afterTaxValue = totalFutureValue; // Tax-free withdrawals
    }

    // Required Minimum Distribution (RMD) at age 73
    const rmdAge = 73;
    const yearsToRmd = Math.max(0, rmdAge - age);
    const balanceAtRmd = totalFutureValue * Math.pow(1 + returnRate, yearsToRmd - yearsToRetirement);
    const rmdFactor = 27.4; // IRS life expectancy factor at age 73
    const rmd = iraType === 'roth' ? 0 : balanceAtRmd / rmdFactor;

    const calculatedResults: IRAResults = {
      totalContributions: totalContributions,
      totalEarnings: totalEarnings,
      finalBalance: totalFutureValue,
      taxSavings: taxSavings,
      afterTaxValue: afterTaxValue,
      requiredMinimumDistribution: rmd
    };

    setResults(calculatedResults);
  };

  useEffect(() => {
    calculateIRA();
  }, [currentAge, retirementAge, currentBalance, annualContribution, expectedReturn, iraType, currentTaxRate, retirementTaxRate]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getContributionLimit = () => {
    const age = parseInt(currentAge);
    const limits = contributionLimits[iraType as keyof typeof contributionLimits];
    
    if (iraType === 'sep') {
      return (limits as { limit: number }).limit;
    } else if ('under50' in limits) {
      return age >= 50 ? limits.over50 : limits.under50;
    }
    return 0;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">IRA Calculator</h1>
        <p className="text-lg text-gray-600">
          Calculate your Individual Retirement Account growth and tax benefits across different IRA types.
        </p>
      </div>

      <Tabs defaultValue="calculator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="comparison">IRA Types</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="rules">Rules & Limits</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>IRA Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="iraType">IRA Type</Label>
                  <Select value={iraType} onValueChange={setIraType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(iraTypes).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentAge">Current Age</Label>
                    <Input
                      id="currentAge"
                      type="number"
                      value={currentAge}
                      onChange={(e) => setCurrentAge(e.target.value)}
                      placeholder="30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="retirementAge">Retirement Age</Label>
                    <Input
                      id="retirementAge"
                      type="number"
                      value={retirementAge}
                      onChange={(e) => setRetirementAge(e.target.value)}
                      placeholder="65"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="currentBalance">Current IRA Balance ($)</Label>
                  <Input
                    id="currentBalance"
                    type="number"
                    value={currentBalance}
                    onChange={(e) => setCurrentBalance(e.target.value)}
                    placeholder="10000"
                  />
                </div>

                <div>
                  <Label htmlFor="annualContribution">Annual Contribution ($)</Label>
                  <Input
                    id="annualContribution"
                    type="number"
                    value={annualContribution}
                    onChange={(e) => setAnnualContribution(e.target.value)}
                    placeholder="6000"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    2024 limit: ${getContributionLimit().toLocaleString()}
                  </p>
                </div>

                <div>
                  <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                  <Input
                    id="expectedReturn"
                    type="number"
                    step="0.1"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(e.target.value)}
                    placeholder="7"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentTaxRate">Current Tax Rate (%)</Label>
                    <Input
                      id="currentTaxRate"
                      type="number"
                      value={currentTaxRate}
                      onChange={(e) => setCurrentTaxRate(e.target.value)}
                      placeholder="22"
                    />
                  </div>
                  <div>
                    <Label htmlFor="retirementTaxRate">Retirement Tax Rate (%)</Label>
                    <Input
                      id="retirementTaxRate"
                      type="number"
                      value={retirementTaxRate}
                      onChange={(e) => setRetirementTaxRate(e.target.value)}
                      placeholder="18"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {results && (
              <Card>
                <CardHeader>
                  <CardTitle>IRA Projection Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatCurrency(results.finalBalance)}
                      </div>
                      <div className="text-sm text-gray-600">Total Balance at Retirement</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(results.afterTaxValue)}
                      </div>
                      <div className="text-sm text-gray-600">After-Tax Value</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Contributions:</span>
                      <span className="font-semibold">{formatCurrency(results.totalContributions)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Earnings:</span>
                      <span className="font-semibold text-green-600">{formatCurrency(results.totalEarnings)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax Savings:</span>
                      <span className="font-semibold text-blue-600">{formatCurrency(results.taxSavings)}</span>
                    </div>
                    {results.requiredMinimumDistribution > 0 && (
                      <div className="flex justify-between">
                        <span>RMD at Age 73:</span>
                        <span className="font-semibold text-orange-600">{formatCurrency(results.requiredMinimumDistribution)}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-600">
                      Years to Retirement: {parseInt(retirementAge) - parseInt(currentAge)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>IRA Types Comparison</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-600 mb-3">Traditional IRA</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Tax-deductible contributions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Tax-deferred growth</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Taxed on withdrawals</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Required minimum distributions at 73</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold text-green-600 mb-3">Roth IRA</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>No tax deduction for contributions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Tax-free growth</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Tax-free withdrawals in retirement</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>No required minimum distributions</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-600 mb-3">SEP-IRA</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Higher contribution limits</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Easy to set up and maintain</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">ℹ</span>
                      <span>For self-employed and small business owners</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Must contribute equally for all employees</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-600 mb-3">SIMPLE IRA</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Employer matching contributions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Lower administrative costs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">ℹ</span>
                      <span>For small businesses (100 or fewer employees)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Lower contribution limits than 401(k)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategies">
          <Card>
            <CardHeader>
              <CardTitle>IRA Optimization Strategies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Contribution Strategies</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-blue-600">Maximize Annual Contributions</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Contribute the maximum allowed amount each year to take full advantage of tax benefits and compound growth.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-green-600">Catch-up Contributions</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      If you're 50 or older, make additional catch-up contributions to accelerate retirement savings.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-purple-600">Backdoor Roth Conversion</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      High earners can use backdoor Roth conversions to access Roth IRA benefits despite income limits.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-orange-600">Dollar-Cost Averaging</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Make regular monthly contributions to reduce market timing risk and build consistent habits.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Tax Planning</h3>
                <div className="space-y-3">
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-semibold">Traditional vs. Roth Decision</h4>
                    <p className="text-sm text-gray-600">Choose Traditional if you expect to be in a lower tax bracket in retirement, Roth if higher.</p>
                  </div>
                  <div className="p-4 border-l-4 border-green-500 bg-green-50">
                    <h4 className="font-semibold">Roth Conversion Ladder</h4>
                    <p className="text-sm text-gray-600">Convert Traditional IRA funds to Roth during low-income years to minimize tax impact.</p>
                  </div>
                  <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                    <h4 className="font-semibold">RMD Planning</h4>
                    <p className="text-sm text-gray-600">Plan for required minimum distributions to avoid penalties and manage tax burden.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <CardTitle>IRA Rules & Contribution Limits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">2024 Contribution Limits</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 p-3 text-left">IRA Type</th>
                        <th className="border border-gray-300 p-3 text-left">Under 50</th>
                        <th className="border border-gray-300 p-3 text-left">50 and Over</th>
                        <th className="border border-gray-300 p-3 text-left">Income Limits</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-3">Traditional IRA</td>
                        <td className="border border-gray-300 p-3">$6,500</td>
                        <td className="border border-gray-300 p-3">$7,500</td>
                        <td className="border border-gray-300 p-3">Deduction phases out</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">Roth IRA</td>
                        <td className="border border-gray-300 p-3">$6,500</td>
                        <td className="border border-gray-300 p-3">$7,500</td>
                        <td className="border border-gray-300 p-3">$138K-$153K (single)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">SEP-IRA</td>
                        <td className="border border-gray-300 p-3">$66,000</td>
                        <td className="border border-gray-300 p-3">$66,000</td>
                        <td className="border border-gray-300 p-3">25% of compensation</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">SIMPLE IRA</td>
                        <td className="border border-gray-300 p-3">$15,500</td>
                        <td className="border border-gray-300 p-3">$19,000</td>
                        <td className="border border-gray-300 p-3">No income limits</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Important Rules</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400">
                    <h4 className="font-semibold">Early Withdrawal Penalties</h4>
                    <p className="text-sm text-gray-600">10% penalty on withdrawals before age 59½ (some exceptions apply)</p>
                  </div>
                  <div className="p-3 bg-red-50 border-l-4 border-red-400">
                    <h4 className="font-semibold">Required Minimum Distributions</h4>
                    <p className="text-sm text-gray-600">Must begin taking RMDs from Traditional IRAs at age 73</p>
                  </div>
                  <div className="p-3 bg-blue-50 border-l-4 border-blue-400">
                    <h4 className="font-semibold">Contribution Deadlines</h4>
                    <p className="text-sm text-gray-600">Contributions for the tax year can be made until April 15th of the following year</p>
                  </div>
                  <div className="p-3 bg-green-50 border-l-4 border-green-400">
                    <h4 className="font-semibold">Earned Income Requirement</h4>
                    <p className="text-sm text-gray-600">Must have earned income to contribute to an IRA</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
