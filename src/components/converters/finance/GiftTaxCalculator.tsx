'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, DollarSign, Users, FileText } from 'lucide-react';

export function GiftTaxCalculator() {
  const [giftAmount, setGiftAmount] = useState<string>('');
  const [relationship, setRelationship] = useState<string>('individual');
  const [previousGifts, setPreviousGifts] = useState<string>('0');
  const [results, setResults] = useState<{
    annualExclusion: number;
    taxableGift: number;
    giftTaxOwed: number;
    lifetimeExemptionUsed: number;
    remainingExemption: number;
    needsReturn: boolean;
  } | null>(null);

  // 2024 gift tax rates and exemptions
  const ANNUAL_EXCLUSION = 18000;
  const LIFETIME_EXEMPTION = 13610000;
  const GIFT_TAX_RATES = [
    { min: 0, max: 10000, rate: 0.18 },
    { min: 10000, max: 20000, rate: 0.20 },
    { min: 20000, max: 40000, rate: 0.22 },
    { min: 40000, max: 60000, rate: 0.24 },
    { min: 60000, max: 80000, rate: 0.26 },
    { min: 80000, max: 100000, rate: 0.28 },
    { min: 100000, max: 150000, rate: 0.30 },
    { min: 150000, max: 250000, rate: 0.32 },
    { min: 250000, max: 500000, rate: 0.34 },
    { min: 500000, max: 750000, rate: 0.37 },
    { min: 750000, max: 1000000, rate: 0.39 },
    { min: 1000000, max: Infinity, rate: 0.40 }
  ];

  const calculateGiftTax = () => {
    const gift = parseFloat(giftAmount) || 0;
    const previous = parseFloat(previousGifts) || 0;
    
    if (gift <= 0) return;

    let exclusion = ANNUAL_EXCLUSION;
    if (relationship === 'spouse-noncitizen') {
      exclusion = 185000; // 2024 annual exclusion for non-citizen spouse
    } else if (relationship === 'charity') {
      exclusion = gift; // Unlimited charitable deduction
    }

    const taxableGift = Math.max(0, gift - exclusion);
    const totalLifetimeGifts = taxableGift + previous;
    
    let giftTaxOwed = 0;
    let remainingAmount = totalLifetimeGifts;
    
    // Calculate tax using progressive rates
    for (const bracket of GIFT_TAX_RATES) {
      if (remainingAmount <= 0) break;
      
      const taxableInBracket = Math.min(remainingAmount, bracket.max - bracket.min);
      giftTaxOwed += taxableInBracket * bracket.rate;
      remainingAmount -= taxableInBracket;
    }

    // Apply lifetime exemption
    const exemptionUsed = Math.min(totalLifetimeGifts, LIFETIME_EXEMPTION);
    const actualTaxOwed = Math.max(0, giftTaxOwed - (exemptionUsed * 0.40)); // Simplified calculation

    setResults({
      annualExclusion: exclusion,
      taxableGift,
      giftTaxOwed: actualTaxOwed,
      lifetimeExemptionUsed: exemptionUsed,
      remainingExemption: Math.max(0, LIFETIME_EXEMPTION - totalLifetimeGifts),
      needsReturn: gift > exclusion
    });
  };

  useEffect(() => {
    if (giftAmount) {
      calculateGiftTax();
    }
  }, [giftAmount, relationship, previousGifts]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Calculator className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Gift Tax Calculator</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Calculate federal gift tax liability and determine if you need to file a gift tax return
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Gift Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="giftAmount">Gift Amount ($)</Label>
              <Input
                id="giftAmount"
                type="number"
                placeholder="Enter gift amount"
                value={giftAmount}
                onChange={(e) => setGiftAmount(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="relationship">Relationship to Recipient</Label>
              <Select value={relationship} onValueChange={setRelationship}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual (non-spouse)</SelectItem>
                  <SelectItem value="spouse-citizen">Spouse (US Citizen)</SelectItem>
                  <SelectItem value="spouse-noncitizen">Spouse (Non-US Citizen)</SelectItem>
                  <SelectItem value="charity">Qualified Charity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="previousGifts">Previous Taxable Gifts ($)</Label>
              <Input
                id="previousGifts"
                type="number"
                placeholder="Enter previous taxable gifts"
                value={previousGifts}
                onChange={(e) => setPreviousGifts(e.target.value)}
                className="mt-1"
              />
            </div>

            <Button onClick={calculateGiftTax} className="w-full">
              Calculate Gift Tax
            </Button>
          </CardContent>
        </Card>

        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Tax Calculation Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600 font-medium">Annual Exclusion</div>
                  <div className="text-lg font-bold text-blue-900">
                    {formatCurrency(results.annualExclusion)}
                  </div>
                </div>

                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="text-sm text-orange-600 font-medium">Taxable Gift</div>
                  <div className="text-lg font-bold text-orange-900">
                    {formatCurrency(results.taxableGift)}
                  </div>
                </div>

                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="text-sm text-red-600 font-medium">Gift Tax Owed</div>
                  <div className="text-lg font-bold text-red-900">
                    {formatCurrency(results.giftTaxOwed)}
                  </div>
                </div>

                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-600 font-medium">Remaining Exemption</div>
                  <div className="text-lg font-bold text-green-900">
                    {formatCurrency(results.remainingExemption)}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Filing Requirements</span>
                </div>
                <div className={`p-3 rounded-lg ${results.needsReturn ? 'bg-yellow-50' : 'bg-green-50'}`}>
                  <div className={`text-sm font-medium ${results.needsReturn ? 'text-yellow-800' : 'text-green-800'}`}>
                    {results.needsReturn 
                      ? '⚠️ Form 709 (Gift Tax Return) required'
                      : '✅ No gift tax return required'
                    }
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Important Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• The annual exclusion for 2024 is $18,000 per recipient</li>
            <li>• Gifts to US citizen spouses are generally unlimited</li>
            <li>• Gifts to non-citizen spouses have a higher annual exclusion ($185,000 in 2024)</li>
            <li>• Charitable gifts are fully deductible with no limit</li>
            <li>• This calculator provides estimates - consult a tax professional for complex situations</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
