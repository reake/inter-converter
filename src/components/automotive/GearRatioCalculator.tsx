'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function GearRatioCalculator() {
  const [ringTeeth, setRingTeeth] = useState<string>('');
  const [pinionTeeth, setPinionTeeth] = useState<string>('');
  const [gearRatio, setGearRatio] = useState<string>('');

  const [mph, setMph] = useState<string>('');
  const [rpm, setRpm] = useState<string>('');
  const [tireDiameter, setTireDiameter] = useState<string>('');
  const [calculatedRatio, setCalculatedRatio] = useState<string>('');

  const calculateGearRatio = () => {
    if (ringTeeth && pinionTeeth && !isNaN(Number(ringTeeth)) && !isNaN(Number(pinionTeeth))) {
      const ratio = Number(ringTeeth) / Number(pinionTeeth);
      setGearRatio(ratio.toFixed(2));
    }
  };

  const calculateOptimalRatio = () => {
    if (mph && rpm && tireDiameter && 
        !isNaN(Number(mph)) && !isNaN(Number(rpm)) && !isNaN(Number(tireDiameter))) {
      const ratio = (Number(rpm) * Number(tireDiameter)) / (Number(mph) * 336);
      setCalculatedRatio(ratio.toFixed(2));
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Ring & Pinion Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚙️ Ring & Pinion Gear Ratio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="ring-teeth">Ring Gear Teeth</Label>
              <Input
                id="ring-teeth"
                type="number"
                value={ringTeeth}
                onChange={(e) => setRingTeeth(e.target.value)}
                placeholder="e.g., 41"
                className="text-lg"
              />
            </div>
            <div>
              <Label htmlFor="pinion-teeth">Pinion Gear Teeth</Label>
              <Input
                id="pinion-teeth"
                type="number"
                value={pinionTeeth}
                onChange={(e) => setPinionTeeth(e.target.value)}
                placeholder="e.g., 10"
                className="text-lg"
              />
            </div>
            <Button onClick={calculateGearRatio} className="w-full">
              Calculate Ratio
            </Button>
            <div>
              <Label htmlFor="gear-ratio">Gear Ratio</Label>
              <Input
                id="gear-ratio"
                type="text"
                value={gearRatio}
                readOnly
                className="text-lg font-semibold bg-gray-50"
                placeholder="Result will appear here"
              />
            </div>
          </CardContent>
        </Card>

        {/* Optimal Ratio Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎯 Optimal Gear Ratio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="mph">Speed (MPH)</Label>
              <Input
                id="mph"
                type="number"
                value={mph}
                onChange={(e) => setMph(e.target.value)}
                placeholder="e.g., 70"
                className="text-lg"
              />
            </div>
            <div>
              <Label htmlFor="rpm">Engine RPM</Label>
              <Input
                id="rpm"
                type="number"
                value={rpm}
                onChange={(e) => setRpm(e.target.value)}
                placeholder="e.g., 2500"
                className="text-lg"
              />
            </div>
            <div>
              <Label htmlFor="tire-diameter">Tire Diameter (inches)</Label>
              <Input
                id="tire-diameter"
                type="number"
                value={tireDiameter}
                onChange={(e) => setTireDiameter(e.target.value)}
                placeholder="e.g., 28"
                className="text-lg"
              />
            </div>
            <Button onClick={calculateOptimalRatio} className="w-full">
              Calculate Optimal Ratio
            </Button>
            <div>
              <Label htmlFor="calculated-ratio">Optimal Ratio</Label>
              <Input
                id="calculated-ratio"
                type="text"
                value={calculatedRatio}
                readOnly
                className="text-lg font-semibold bg-gray-50"
                placeholder="Result will appear here"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Common Gear Ratios */}
      <Card>
        <CardHeader>
          <CardTitle>Common Gear Ratios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">Street Performance</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>3.08:1</span>
                  <span>Highway cruising</span>
                </div>
                <div className="flex justify-between">
                  <span>3.23:1</span>
                  <span>Balanced performance</span>
                </div>
                <div className="flex justify-between">
                  <span>3.42:1</span>
                  <span>Street performance</span>
                </div>
                <div className="flex justify-between">
                  <span>3.73:1</span>
                  <span>Good acceleration</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">Performance</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>4.10:1</span>
                  <span>Street/strip</span>
                </div>
                <div className="flex justify-between">
                  <span>4.30:1</span>
                  <span>Quick acceleration</span>
                </div>
                <div className="flex justify-between">
                  <span>4.56:1</span>
                  <span>Drag racing</span>
                </div>
                <div className="flex justify-between">
                  <span>4.88:1</span>
                  <span>Heavy acceleration</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">Racing</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>5.13:1</span>
                  <span>Short track</span>
                </div>
                <div className="flex justify-between">
                  <span>5.38:1</span>
                  <span>Bracket racing</span>
                </div>
                <div className="flex justify-between">
                  <span>5.86:1</span>
                  <span>Pure drag racing</span>
                </div>
                <div className="flex justify-between">
                  <span>6.20:1</span>
                  <span>Heavy cars</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formula Information */}
      <Card>
        <CardHeader>
          <CardTitle>Calculation Formulas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Gear Ratio from Ring & Pinion:</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                Gear Ratio = Ring Gear Teeth ÷ Pinion Gear Teeth
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Optimal Gear Ratio:</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                Gear Ratio = (RPM × Tire Diameter) ÷ (MPH × 336)
              </p>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                <strong>Note:</strong> Lower gear ratios (3.08:1) provide better fuel economy and higher top speed. 
                Higher gear ratios (4.56:1) provide better acceleration but lower top speed and fuel economy.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
