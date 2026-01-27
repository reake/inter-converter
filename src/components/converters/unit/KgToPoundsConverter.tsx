'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Scale, ArrowRightLeft } from 'lucide-react';

export default function KgToPoundsConverter() {
  const [kilograms, setKilograms] = useState<string>('1');
  const [pounds, setPounds] = useState<string>('2.2046');

  const convertKgToPounds = (kg: number): number => {
    return kg * 2.20462262185;
  };

  const convertPoundsToKg = (lbs: number): number => {
    return lbs / 2.20462262185;
  };

  const handleKilogramsChange = (value: string) => {
    setKilograms(value);
    const kg = parseFloat(value);
    if (!isNaN(kg)) {
      const lbs = convertKgToPounds(kg);
      setPounds(lbs.toFixed(4));
    } else {
      setPounds('');
    }
  };

  const handlePoundsChange = (value: string) => {
    setPounds(value);
    const lbs = parseFloat(value);
    if (!isNaN(lbs)) {
      const kg = convertPoundsToKg(lbs);
      setKilograms(kg.toFixed(4));
    } else {
      setKilograms('');
    }
  };

  const swapUnits = () => {
    const tempKg = kilograms;
    const tempLbs = pounds;
    setKilograms(tempLbs);
    setPounds(tempKg);
  };

  const commonWeights = [
    { kg: 1, lbs: 2.2, desc: '1 kilogram' },
    { kg: 5, lbs: 11.0, desc: '5 kilograms' },
    { kg: 10, lbs: 22.0, desc: '10 kilograms' },
    { kg: 25, lbs: 55.1, desc: '25 kilograms' },
    { kg: 50, lbs: 110.2, desc: '50 kilograms' },
    { kg: 75, lbs: 165.3, desc: '75 kilograms' },
    { kg: 100, lbs: 220.5, desc: '100 kilograms' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Kilograms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="number"
                value={kilograms}
                onChange={(e) => handleKilogramsChange(e.target.value)}
                placeholder="Enter kilograms"
                className="text-lg"
                step="0.0001"
              />
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">
                  {kilograms} kg
                </div>
                <div className="text-sm text-gray-600">Kilograms</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Pounds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="number"
                value={pounds}
                onChange={(e) => handlePoundsChange(e.target.value)}
                placeholder="Enter pounds"
                className="text-lg"
              />
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">
                  {pounds} lbs
                </div>
                <div className="text-sm text-gray-600">Pounds</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-center">
        <Button onClick={swapUnits} variant="outline" className="flex items-center gap-2">
          <ArrowRightLeft className="h-4 w-4" />
          Swap Units
        </Button>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Conversion Result</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-gray-600">Kilograms (Metric)</div>
              <div className="text-2xl font-bold text-blue-600">{kilograms} kg</div>
              <div className="text-xs text-gray-500">kg</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-gray-600">Pounds (Imperial)</div>
              <div className="text-2xl font-bold text-green-600">{pounds} lbs</div>
              <div className="text-xs text-gray-500">lbs</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Common Weight Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {commonWeights.map((weight, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="font-medium">{weight.desc}</div>
                </div>
                <div className="flex gap-6 text-right">
                  <div>
                    <div className="text-blue-600 font-bold">{weight.kg} kg</div>
                  </div>
                  <div>
                    <div className="text-green-600 font-bold">{weight.lbs} lbs</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Conversion Formula</h3>
        <div className="text-sm text-blue-700 space-y-1">
          <div>• Kilograms to Pounds: lbs = kg × 2.20462</div>
          <div>• Pounds to Kilograms: kg = lbs ÷ 2.20462</div>
          <div>• 1 kilogram = 2.20462262185 pounds (exact)</div>
        </div>
      </div>
    </div>
  );
}
