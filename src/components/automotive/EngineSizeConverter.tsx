'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function EngineSizeConverter() {
  const [cubicInches, setCubicInches] = useState<string>('');
  const [liters, setLiters] = useState<string>('');

  const convertCIToLiters = (ci: string) => {
    setCubicInches(ci);
    if (ci && !isNaN(Number(ci))) {
      const result = Number(ci) * 0.01638706;
      setLiters(result.toFixed(2));
    } else {
      setLiters('');
    }
  };

  const convertLitersToCI = (l: string) => {
    setLiters(l);
    if (l && !isNaN(Number(l))) {
      const result = Number(l) / 0.01638706;
      setCubicInches(result.toFixed(2));
    } else {
      setCubicInches('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Cubic Inches to Liters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔧 Cubic Inches to Liters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="ci-input">Cubic Inches (CI)</Label>
              <Input
                id="ci-input"
                type="number"
                value={cubicInches}
                onChange={(e) => convertCIToLiters(e.target.value)}
                placeholder="Enter cubic inches"
                className="text-lg"
              />
            </div>
            <div>
              <Label htmlFor="liters-output">Liters (L)</Label>
              <Input
                id="liters-output"
                type="text"
                value={liters}
                readOnly
                className="text-lg font-semibold bg-gray-50"
              />
            </div>
          </CardContent>
        </Card>

        {/* Liters to Cubic Inches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔧 Liters to Cubic Inches
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="liters-input">Liters (L)</Label>
              <Input
                id="liters-input"
                type="number"
                value={liters}
                onChange={(e) => convertLitersToCI(e.target.value)}
                placeholder="Enter liters"
                className="text-lg"
              />
            </div>
            <div>
              <Label htmlFor="ci-output">Cubic Inches (CI)</Label>
              <Input
                id="ci-output"
                type="text"
                value={cubicInches}
                readOnly
                className="text-lg font-semibold bg-gray-50"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Common Engine Sizes Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Common Engine Sizes Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">Small Block V8</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>283 CI</span>
                  <span>4.6L</span>
                </div>
                <div className="flex justify-between">
                  <span>305 CI</span>
                  <span>5.0L</span>
                </div>
                <div className="flex justify-between">
                  <span>327 CI</span>
                  <span>5.4L</span>
                </div>
                <div className="flex justify-between">
                  <span>350 CI</span>
                  <span>5.7L</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">Big Block V8</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>396 CI</span>
                  <span>6.5L</span>
                </div>
                <div className="flex justify-between">
                  <span>427 CI</span>
                  <span>7.0L</span>
                </div>
                <div className="flex justify-between">
                  <span>454 CI</span>
                  <span>7.4L</span>
                </div>
                <div className="flex justify-between">
                  <span>502 CI</span>
                  <span>8.2L</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">Modern Engines</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>2.0L</span>
                  <span>122 CI</span>
                </div>
                <div className="flex justify-between">
                  <span>3.5L</span>
                  <span>214 CI</span>
                </div>
                <div className="flex justify-between">
                  <span>5.0L</span>
                  <span>305 CI</span>
                </div>
                <div className="flex justify-between">
                  <span>6.2L</span>
                  <span>378 CI</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formula Information */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Formula</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Cubic Inches to Liters:</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                Liters = Cubic Inches × 0.01638706
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Liters to Cubic Inches:</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                Cubic Inches = Liters ÷ 0.01638706
              </p>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                <strong>Note:</strong> Engine displacement is the total volume of all cylinders in an engine. 
                It's measured in cubic inches (CI) in the US and cubic centimeters (CC) or liters (L) in most other countries.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
