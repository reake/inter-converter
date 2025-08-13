'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Calculator, DollarSign } from 'lucide-react';

type FilingStatus = 'single' | 'marriedJoint' | 'marriedSeparate' | 'headOfHousehold';

interface TaxBracket {
  rate: number;
  min: number;
  max: number;
}

interface TaxResult {
  grossIncome: number;
  adjustedGrossIncome: number;
  taxableIncome: number;
  federalTax: number;
  effectiveRate: number;
  marginalRate: number;
  afterTaxIncome: number;
  standardDeduction: number;
}

// 2024 Tax Brackets (simplified)
const TAX_BRACKETS: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { rate: 0.10, min: 0, max: 11000 },
    { rate: 0.12, min: 11000, max: 44725 },
    { rate: 0.22, min: 44725, max: 95375 },
    { rate: 0.24, min: 95375, max: 182050 },
    { rate: 0.32, min: 182050, max: 231250 },
    { rate: 0.35, min: 231250, max: 578125 },
    { rate: 0.37, min: 578125, max: Infinity }
  ],
  marriedJoint: [
    { rate: 0.10, min: 0, max: 22000 },
    { rate: 0.12, min: 22000, max: 89450 },
    { rate: 0.22, min: 89450, max: 190750 },
    { rate: 0.24, min: 190750, max: 364200 },
    { rate: 0.32, min: 364200, max: 462500 },
    { rate: 0.35, min: 462500, max: 693750 },
    { rate: 0.37, min: 693750, max: Infinity }
  ],
  marriedSeparate: [
    { rate: 0.10, min: 0, max: 11000 },
    { rate: 0.12, min: 11000, max: 44725 },
    { rate: 0.22, min: 44725, max: 95375 },
    { rate: 0.24, min: 95375, max: 182100 },
    { rate: 0.32, min: 182100, max: 231250 },
    { rate: 0.35, min: 231250, max: 346875 },
    { rate: 0.37, min: 346875, max: Infinity }
  ],
  headOfHousehold: [
    { rate: 0.10, min: 0, max: 15700 },
    { rate: 0.12, min: 15700, max: 59850 },
    { rate: 0.22, min: 59850, max: 95350 },
    { rate: 0.24, min: 95350, max: 182050 },
    { rate: 0.32, min: 182050, max: 231250 },
    { rate: 0.35, min: 231250, max: 578100 },
    { rate: 0.37, min: 578100, max: Infinity }
  ]
};

// 2024 Standard Deductions
const STANDARD_DEDUCTIONS: Record<FilingStatus, number> = {
  single: 14600,
  marriedJoint: 29200,
  marriedSeparate: 14600,
  headOfHousehold: 21900
};

export function TaxCalculator() {
  const [income, setIncome] = useState('75000');
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [deductionType, setDeductionType] = useState<'standard' | 'itemized'>('standard');
  const [itemizedDeductions, setItemizedDeductions] = useState('0');
  const [result, setResult] = useState<TaxResult | null>(null);

  useEffect(() => {
    calculateTax();
  }, [income, filingStatus, deductionType, itemizedDeductions]);

  const calculateTax = () => {
    const grossIncome = parseFloat(income) || 0;
    if (grossIncome <= 0) {
      setResult(null);
      return;
    }

    const standardDeduction = STANDARD_DEDUCTIONS[filingStatus];
    const deduction = deductionType === 'standard' 
      ? standardDeduction 
      : Math.max(parseFloat(itemizedDeductions) || 0, standardDeduction);

    const adjustedGrossIncome = grossIncome; // Simplified - no adjustments
    const taxableIncome = Math.max(0, adjustedGrossIncome - deduction);

    const brackets = TAX_BRACKETS[filingStatus];
    let federalTax = 0;
    let marginalRate = 0;

    for (const bracket of brackets) {
      if (taxableIncome > bracket.min) {
        const taxableAtThisBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
        federalTax += taxableAtThisBracket * bracket.rate;
        marginalRate = bracket.rate;
      }
    }

    const effectiveRate = grossIncome > 0 ? (federalTax / grossIncome) * 100 : 0;
    const afterTaxIncome = grossIncome - federalTax;

    setResult({
      grossIncome,
      adjustedGrossIncome,
      taxableIncome,
      federalTax,
      effectiveRate,
      marginalRate: marginalRate * 100,
      afterTaxIncome,
      standardDeduction
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (rate: number) => {
    return `${rate.toFixed(1)}%`;
  };

  const copyResult = async () => {
    if (result) {
      const resultText = `Income: ${formatCurrency(result.grossIncome)}\nFederal Tax: ${formatCurrency(result.federalTax)}\nEffective Rate: ${formatPercentage(result.effectiveRate)}\nAfter-Tax Income: ${formatCurrency(result.afterTaxIncome)}`;
      try {
        await navigator.clipboard.writeText(resultText);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const setPresetIncome = (amount: string, status: FilingStatus) => {
    setIncome(amount);
    setFilingStatus(status);
  };

  const getTaxBracketInfo = () => {
    if (!result) return [];
    
    const brackets = TAX_BRACKETS[filingStatus];
    return brackets.map(bracket => {
      const taxableAtBracket = Math.max(0, Math.min(result.taxableIncome, bracket.max) - bracket.min);
      const taxAtBracket = taxableAtBracket * bracket.rate;
      
      return {
        rate: bracket.rate * 100,
        range: `${formatCurrency(bracket.min)} - ${bracket.max === Infinity ? '∞' : formatCurrency(bracket.max)}`,
        taxableIncome: taxableAtBracket,
        tax: taxAtBracket,
        isActive: taxableAtBracket > 0
      };
    }).filter(bracket => bracket.isActive);
  };

  return (
    <div className="space-y-6">
      {/* Income and Filing Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Income Information
          </CardTitle>
          <CardDescription>
            Enter your income and select your filing status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Annual Gross Income ($)</label>
            <Input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="75000"
              min="0"
              step="1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
              className="w-full p-3 border border-input rounded-md bg-background"
            >
              <option value="single">Single</option>
              <option value="marriedJoint">Married Filing Jointly</option>
              <option value="marriedSeparate">Married Filing Separately</option>
              <option value="headOfHousehold">Head of Household</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Deductions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Deductions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button
              variant={deductionType === 'standard' ? 'default' : 'outline'}
              onClick={() => setDeductionType('standard')}
            >
              Standard Deduction
            </Button>
            <Button
              variant={deductionType === 'itemized' ? 'default' : 'outline'}
              onClick={() => setDeductionType('itemized')}
            >
              Itemized Deductions
            </Button>
          </div>

          {deductionType === 'standard' && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">
                Standard deduction for {filingStatus.replace(/([A-Z])/g, ' $1').toLowerCase()}: {formatCurrency(STANDARD_DEDUCTIONS[filingStatus])}
              </div>
            </div>
          )}

          {deductionType === 'itemized' && (
            <div>
              <label className="block text-sm font-medium mb-2">Total Itemized Deductions ($)</label>
              <Input
                type="number"
                value={itemizedDeductions}
                onChange={(e) => setItemizedDeductions(e.target.value)}
                placeholder="0"
                min="0"
                step="100"
              />
              <div className="text-xs text-muted-foreground mt-1">
                Minimum will be standard deduction: {formatCurrency(STANDARD_DEDUCTIONS[filingStatus])}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Presets */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Income Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={() => setPresetIncome('50000', 'single')}
              className="text-left justify-start h-auto p-3"
            >
              <div>
                <div className="font-medium">Entry Level</div>
                <div className="text-sm text-muted-foreground">$50K Single</div>
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={() => setPresetIncome('100000', 'marriedJoint')}
              className="text-left justify-start h-auto p-3"
            >
              <div>
                <div className="font-medium">Middle Class</div>
                <div className="text-sm text-muted-foreground">$100K Married</div>
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={() => setPresetIncome('200000', 'single')}
              className="text-left justify-start h-auto p-3"
            >
              <div>
                <div className="font-medium">High Earner</div>
                <div className="text-sm text-muted-foreground">$200K Single</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Tax Calculation Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Main Results */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(result.federalTax)}
                </div>
                <div className="text-sm text-muted-foreground">Federal Tax</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatPercentage(result.effectiveRate)}
                </div>
                <div className="text-sm text-muted-foreground">Effective Rate</div>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {formatPercentage(result.marginalRate)}
                </div>
                <div className="text-sm text-muted-foreground">Marginal Rate</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {formatCurrency(result.afterTaxIncome)}
                </div>
                <div className="text-sm text-muted-foreground">After-Tax Income</div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-3">Income Breakdown</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span>Gross Income:</span>
                  <span className="font-medium">{formatCurrency(result.grossIncome)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Deductions:</span>
                  <span className="font-medium">
                    -{formatCurrency(result.adjustedGrossIncome - result.taxableIncome)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Taxable Income:</span>
                  <span className="font-medium">{formatCurrency(result.taxableIncome)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Federal Tax:</span>
                  <span className="font-medium">{formatCurrency(result.federalTax)}</span>
                </div>
              </div>
            </div>

            {/* Tax Brackets */}
            <div>
              <h4 className="font-medium mb-3">Tax Brackets Applied</h4>
              <div className="space-y-2">
                {getTaxBracketInfo().map((bracket, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{formatPercentage(bracket.rate)}</Badge>
                      <span className="text-sm">{bracket.range}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatCurrency(bracket.tax)}</div>
                      <div className="text-xs text-muted-foreground">
                        on {formatCurrency(bracket.taxableIncome)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center">
              <Button onClick={copyResult} variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Copy Results
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tax Information */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Tax Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Key Terms</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div><strong>Effective Rate:</strong> Total tax ÷ Total income</div>
                <div><strong>Marginal Rate:</strong> Tax rate on your last dollar earned</div>
                <div><strong>Standard Deduction:</strong> Fixed deduction amount</div>
                <div><strong>Itemized Deductions:</strong> Sum of specific deductible expenses</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Important Notes</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>• This calculator estimates federal taxes only</div>
                <div>• State taxes are not included</div>
                <div>• Results are for planning purposes</div>
                <div>• Consult tax professionals for advice</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}