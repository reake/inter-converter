'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Calculator } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

interface BondCalculation {
  currentValue: number;
  yieldToMaturity: number;
  totalInterest: number;
  annualizedReturn: number;
  duration: number;
}

export default function BondCalculator() {
  const [faceValue, setFaceValue] = useState('1000');
  const [purchasePrice, setPurchasePrice] = useState('950');
  const [couponRate, setCouponRate] = useState('5');
  const [yearsToMaturity, setYearsToMaturity] = useState('10');
  const [result, setResult] = useState<BondCalculation | null>(null);

  useEffect(() => {
    if (faceValue && purchasePrice && couponRate && yearsToMaturity) {
      calculateBond();
    }
  }, [faceValue, purchasePrice, couponRate, yearsToMaturity]);

  const calculateBond = () => {
    const face = parseFloat(faceValue);
    const price = parseFloat(purchasePrice);
    const coupon = parseFloat(couponRate) / 100;
    const years = parseFloat(yearsToMaturity);

    if (face <= 0 || price <= 0 || coupon < 0 || years <= 0) {
      setResult(null);
      return;
    }

    const annualCoupon = face * coupon;
    const totalCoupons = annualCoupon * years;
    const totalReturn = (face + totalCoupons) - price;
    const annualizedReturn = (totalReturn / price / years) * 100;
    
    // Simplified YTM calculation (approximation)
    const ytm = ((annualCoupon + (face - price) / years) / ((face + price) / 2)) * 100;

    setResult({
      currentValue: price,
      yieldToMaturity: ytm,
      totalInterest: totalCoupons,
      annualizedReturn,
      duration: years
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercentage = (rate: number) => {
    return `${rate.toFixed(2)}%`;
  };

  const getResultText = () => {
    if (result) {
      return `Bond: ${formatCurrency(parseFloat(faceValue))}\nPurchase Price: ${formatCurrency(result.currentValue)}\nYield to Maturity: ${formatPercentage(result.yieldToMaturity)}`;
    }
    return '';
  };

  return (
    <div className="space-y-6">
      {/* Bond Input */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Bond Details
          </CardTitle>
          <CardDescription>
            Enter bond information to calculate yield and returns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Face Value ($)</label>
              <Input
                type="number"
                value={faceValue}
                onChange={(e) => setFaceValue(e.target.value)}
                placeholder="1000"
                min="0"
                step="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Purchase Price ($)</label>
              <Input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                placeholder="950"
                min="0"
                step="10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Annual Coupon Rate (%)</label>
              <Input
                type="number"
                value={couponRate}
                onChange={(e) => setCouponRate(e.target.value)}
                placeholder="5"
                min="0"
                max="20"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Years to Maturity</label>
              <Input
                type="number"
                value={yearsToMaturity}
                onChange={(e) => setYearsToMaturity(e.target.value)}
                placeholder="10"
                min="1"
                max="50"
                step="1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Bond Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Main Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formatPercentage(result.yieldToMaturity)}
                </div>
                <div className="text-sm text-muted-foreground">Yield to Maturity</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(result.totalInterest)}
                </div>
                <div className="text-sm text-muted-foreground">Total Interest</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {formatPercentage(result.annualizedReturn)}
                </div>
                <div className="text-sm text-muted-foreground">Annualized Return</div>
              </div>
            </div>

            {/* Summary */}
            <div className="p-4 bg-muted rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span>Face Value:</span>
                  <span className="font-medium">{formatCurrency(parseFloat(faceValue))}</span>
                </div>
                <div className="flex justify-between">
                  <span>Purchase Price:</span>
                  <span className="font-medium">{formatCurrency(result.currentValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Coupon Rate:</span>
                  <span className="font-medium">{couponRate}% annually</span>
                </div>
                <div className="flex justify-between">
                  <span>Time to Maturity:</span>
                  <span className="font-medium">{yearsToMaturity} years</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center">
              <CopyButton
                text={getResultText()}
                variant="outline"
                showText={true}
                successText="Results Copied!"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bond Information */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Bond Investment Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Key Concepts</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>• <strong>Yield to Maturity:</strong> Total return if held to maturity</div>
                <div>• <strong>Coupon Rate:</strong> Annual interest rate paid</div>
                <div>• <strong>Face Value:</strong> Amount paid at maturity</div>
                <div>• <strong>Premium/Discount:</strong> Price above/below face value</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Important Notes</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>• Bond prices move inversely to interest rates</div>
                <div>• Consider credit risk and rating</div>
                <div>• Results are estimates for comparison</div>
                <div>• Consult financial advisors for investment decisions</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}