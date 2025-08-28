'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Ruler, ArrowRightLeft, Copy } from 'lucide-react';

export default function InchesToCmConverter() {
  const [inches, setInches] = useState<string>('1');
  const [centimeters, setCentimeters] = useState<string>('2.54');

  const convertInchesToCm = (inch: number): number => {
    return inch * 2.54;
  };

  const convertCmToInches = (cm: number): number => {
    return cm / 2.54;
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

  const swapUnits = () => {
    const tempInches = inches;
    const tempCm = centimeters;
    setInches(tempCm);
    setCentimeters(tempInches);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    handleInchesChange(inches);
  }, []);

  const commonMeasurements = [
    { inch: 1, cm: 2.54, desc: '1 inch' },
    { inch: 2, cm: 5.08, desc: '2 inches' },
    { inch: 4, cm: 10.16, desc: '4 inches' },
    { inch: 6, cm: 15.24, desc: '6 inches' },
    { inch: 8, cm: 20.32, desc: '8 inches' },
    { inch: 10, cm: 25.4, desc: '10 inches' },
    { inch: 12, cm: 30.48, desc: '1 foot' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-6">
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
                step="0.0001"
              />
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">
                  {inches}"
                </div>
                <div className="text-sm text-gray-600">Inches</div>
              </div>
            </div>
          </CardContent>
        </Card>

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
              />
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">
                  {centimeters} cm
                </div>
                <div className="text-sm text-gray-600">Centimeters</div>
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
              <div className="text-sm text-gray-600">Inches (Imperial)</div>
              <div className="text-2xl font-bold text-blue-600">{inches}"</div>
              <div className="text-xs text-gray-500">in</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-gray-600">Centimeters (Metric)</div>
              <div className="text-2xl font-bold text-green-600">{centimeters} cm</div>
              <div className="text-xs text-gray-500">cm</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Common Measurements</CardTitle>
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
                    <div className="text-blue-600 font-bold">{measurement.inch}"</div>
                  </div>
                  <div>
                    <div className="text-green-600 font-bold">{measurement.cm} cm</div>
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
          <div>• Inches to Centimeters: cm = inches × 2.54</div>
          <div>• Centimeters to Inches: inches = cm ÷ 2.54</div>
          <div>• 1 inch = exactly 2.54 centimeters</div>
        </div>
      </div>
    </div>
  );
}
