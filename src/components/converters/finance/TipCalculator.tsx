'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Users, Calculator, Percent } from 'lucide-react';

interface TipCalculation {
  billAmount: number;
  tipPercentage: number;
  tipAmount: number;
  totalAmount: number;
  amountPerPerson: number;
  tipPerPerson: number;
}

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState<string>('50.00');
  const [tipPercentage, setTipPercentage] = useState<string>('18');
  const [numberOfPeople, setNumberOfPeople] = useState<string>('2');
  const [customTip, setCustomTip] = useState<string>('');
  const [calculation, setCalculation] = useState<TipCalculation>({
    billAmount: 0,
    tipPercentage: 0,
    tipAmount: 0,
    totalAmount: 0,
    amountPerPerson: 0,
    tipPerPerson: 0
  });

  const calculateTip = useCallback(() => {
    const bill = parseFloat(billAmount) || 0;
    const tip = parseFloat(tipPercentage) || 0;
    const people = parseInt(numberOfPeople) || 1;

    const tipAmount = (bill * tip) / 100;
    const totalAmount = bill + tipAmount;
    const amountPerPerson = totalAmount / people;
    const tipPerPerson = tipAmount / people;

    setCalculation({
      billAmount: bill,
      tipPercentage: tip,
      tipAmount,
      totalAmount,
      amountPerPerson,
      tipPerPerson
    });
  }, [billAmount, tipPercentage, numberOfPeople]);

  useEffect(() => {
    calculateTip();
  }, [calculateTip]);

  const handleTipPreset = (percentage: number) => {
    setTipPercentage(percentage.toString());
    setCustomTip('');
  };

  const handleCustomTip = (value: string) => {
    setCustomTip(value);
    setTipPercentage(value);
  };

  const getServiceQuality = (tip: number) => {
    if (tip >= 20) return { text: 'Excellent Service', color: 'bg-green-100 text-green-800' };
    if (tip >= 18) return { text: 'Great Service', color: 'bg-blue-100 text-blue-800' };
    if (tip >= 15) return { text: 'Good Service', color: 'bg-yellow-100 text-yellow-800' };
    if (tip >= 10) return { text: 'Fair Service', color: 'bg-orange-100 text-orange-800' };
    return { text: 'Poor Service', color: 'bg-red-100 text-red-800' };
  };

  const serviceQuality = getServiceQuality(calculation.tipPercentage);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tip Calculator</h1>
        <p className="text-gray-600">Calculate tips and split bills for restaurants and services</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Bill Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Bill Amount */}
            <div className="space-y-2">
              <Label htmlFor="billAmount">Bill Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="billAmount"
                  type="number"
                  placeholder="0.00"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  className="pl-8"
                  step="0.01"
                />
              </div>
            </div>

            {/* Tip Percentage Presets */}
            <div className="space-y-2">
              <Label>Tip Percentage</Label>
              <div className="grid grid-cols-4 gap-2">
                {[15, 18, 20, 25].map((percentage) => (
                  <Button
                    key={percentage}
                    variant={tipPercentage === percentage.toString() ? 'default' : 'outline'}
                    onClick={() => handleTipPreset(percentage)}
                    className="text-sm"
                  >
                    {percentage}%
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Tip */}
            <div className="space-y-2">
              <Label htmlFor="customTip">Custom Tip %</Label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="customTip"
                  type="number"
                  placeholder="Enter custom %"
                  value={customTip}
                  onChange={(e) => handleCustomTip(e.target.value)}
                  className="pl-8"
                  step="0.1"
                />
              </div>
            </div>

            {/* Number of People */}
            <div className="space-y-2">
              <Label htmlFor="numberOfPeople">Number of People</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="numberOfPeople"
                  type="number"
                  placeholder="1"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(e.target.value)}
                  className="pl-8"
                  min="1"
                />
              </div>
            </div>

            {/* Service Quality Badge */}
            <div className="flex items-center justify-center">
              <Badge className={serviceQuality.color}>
                {serviceQuality.text}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Calculation Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Bill Breakdown */}
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Original Bill</span>
                <span className="font-semibold">${calculation.billAmount.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-700">Tip ({calculation.tipPercentage}%)</span>
                <span className="font-semibold text-blue-700">${calculation.tipAmount.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-200">
                <span className="text-green-700 font-medium">Total Amount</span>
                <span className="font-bold text-lg text-green-700">${calculation.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Per Person Breakdown */}
            {parseInt(numberOfPeople) > 1 && (
              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium text-gray-900">Per Person ({numberOfPeople} people)</h4>
                
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-purple-700">Amount per Person</span>
                  <span className="font-semibold text-purple-700">${calculation.amountPerPerson.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-orange-700">Tip per Person</span>
                  <span className="font-semibold text-orange-700">${calculation.tipPerPerson.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="space-y-2 pt-4 border-t">
              <h4 className="font-medium text-gray-900">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setBillAmount('');
                    setTipPercentage('18');
                    setNumberOfPeople('1');
                    setCustomTip('');
                  }}
                >
                  Reset
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const result = `Bill: $${calculation.billAmount.toFixed(2)}\nTip (${calculation.tipPercentage}%): $${calculation.tipAmount.toFixed(2)}\nTotal: $${calculation.totalAmount.toFixed(2)}${parseInt(numberOfPeople) > 1 ? `\nPer person: $${calculation.amountPerPerson.toFixed(2)}` : ''}`;
                    navigator.clipboard.writeText(result);
                  }}
                >
                  Copy
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tip Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Tipping Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-green-600 mb-2">Restaurants</h4>
              <div className="space-y-1 text-muted-foreground">
                <div>• Fine dining: 18-25%</div>
                <div>• Casual dining: 15-20%</div>
                <div>• Fast casual: 10-15%</div>
                <div>• Takeout: 10% (optional)</div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-blue-600 mb-2">Services</h4>
              <div className="space-y-1 text-muted-foreground">
                <div>• Hair stylist: 15-20%</div>
                <div>• Taxi/Uber: 15-20%</div>
                <div>• Hotel housekeeping: $2-5/day</div>
                <div>• Delivery: 15-20%</div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-purple-600 mb-2">Special Cases</h4>
              <div className="space-y-1 text-muted-foreground">
                <div>• Large groups (6+): 18-20%</div>
                <div>• Poor service: 10-15%</div>
                <div>• Exceptional service: 20-25%</div>
                <div>• Buffet: 10-15%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
