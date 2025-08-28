'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Ruler, ArrowRightLeft } from 'lucide-react';

export default function CmToInchesConverter() {
  const [centimeters, setCentimeters] = useState<string>('1');
  const [inches, setInches] = useState<string>('0.3937');

  const convertCmToInches = (cm: number): number => {
    return cm / 2.54;
  };

  const convertInchesToCm = (inch: number): number => {
    return inch * 2.54;
  };

  const handleCentimetersChange = (value: string) => {
    setCentimeters(value);
    const cm = parseFloat(value);
    if (!isNaN(cm)) {
      const inch = convertCmToInches(cm);
      setInches(inch.toFixed(4));
    } else {
      setInches('');
    }
  };

  const handleInchesChange = (value: string) => {
    setInches(value);
    const inch = parseFloat(value);
    if (!isNaN(inch)) {
      const cm = convertInchesToCm(inch);
      setCentimeters(cm.toFixed(4));
    } else {
      setCentimeters('');
    }
  };

  const swapUnits = () => {
    const tempCm = centimeters;
    const tempInches = inches;
    setCentimeters(tempInches);
    setInches(tempCm);
  };

  useEffect(() => {
    handleCentimetersChange(centimeters);
  }, []);

  const commonMeasurements = [
    { cm: 1, inches: 0.39, desc: '1 centimeter' },
    { cm: 2.54, inches: 1, desc: '1 inch' },
    { cm: 5, inches: 1.97, desc: '5 centimeters' },
    { cm: 10, inches: 3.94, desc: '10 centimeters' },
    { cm: 15, inches: 5.91, desc: '15 centimeters' },
    { cm: 20, inches: 7.87, desc: '20 centimeters' },
    { cm: 30, inches: 11.81, desc: '30 centimeters' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ruler className="h-5 w-5" />
              Centimeters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="number"
                value={centimeters}
                onChange={(e) => handleCentimetersChange(e.target.value)}
                placeholder="Enter centimeters"
                className="text-lg"
                step="0.0001"
              />
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">
                  {centimeters} cm
                </div>
                <div className="text-sm text-gray-600">Centimeters</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ruler className="h-5 w-5" />
              Inches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="number"
                value={inches}
                onChange={(e) => handleInchesChange(e.target.value)}
                placeholder="Enter inches"
                className="text-lg"
              />
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">
                  {inches}"
                </div>
                <div className="text-sm text-gray-600">Inches</div>
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
              <div className="text-sm text-gray-600">Centimeters (Metric)</div>
              <div className="text-2xl font-bold text-blue-600">{centimeters} cm</div>
              <div className="text-xs text-gray-500">cm</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-gray-600">Inches (Imperial)</div>
              <div className="text-2xl font-bold text-green-600">{inches}"</div>
              <div className="text-xs text-gray-500">in</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Common Length Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {commonMeasurements.map((measurement, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="font-medium">{measurement.desc}</div>
                </div>
                <div className="flex gap-6 text-right">
                  <div>
                    <div className="text-blue-600 font-bold">{measurement.cm} cm</div>
                  </div>
                  <div>
                    <div className="text-green-600 font-bold">{measurement.inches}"</div>
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
          <div>• Centimeters to Inches: inches = cm ÷ 2.54</div>
          <div>• Inches to Centimeters: cm = inches × 2.54</div>
          <div>• 1 centimeter = 0.393701 inches (exact)</div>
        </div>
      </div>
    </div>
  );
}
