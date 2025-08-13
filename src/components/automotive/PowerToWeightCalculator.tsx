'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function PowerToWeightCalculator() {
  const [horsepower, setHorsepower] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [hpPerLb, setHpPerLb] = useState<string>('');
  const [lbPerHp, setLbPerHp] = useState<string>('');

  const calculateRatio = () => {
    if (horsepower && weight && !isNaN(Number(horsepower)) && !isNaN(Number(weight))) {
      const hp = Number(horsepower);
      const wt = Number(weight);
      
      const hpPerLbRatio = hp / wt;
      const lbPerHpRatio = wt / hp;
      
      setHpPerLb(hpPerLbRatio.toFixed(4));
      setLbPerHp(lbPerHpRatio.toFixed(2));
    }
  };

  const getPerformanceCategory = (ratio: number) => {
    if (ratio >= 0.20) return { label: 'Supercar', color: 'bg-purple-100 text-purple-700' };
    if (ratio >= 0.15) return { label: 'High Performance', color: 'bg-red-100 text-red-700' };
    if (ratio >= 0.12) return { label: 'Sports Car', color: 'bg-orange-100 text-orange-700' };
    if (ratio >= 0.08) return { label: 'Performance', color: 'bg-yellow-100 text-yellow-700' };
    if (ratio >= 0.05) return { label: 'Average', color: 'bg-blue-100 text-blue-700' };
    return { label: 'Economy', color: 'bg-gray-100 text-gray-700' };
  };

  const currentRatio = hpPerLb ? Number(hpPerLb) : 0;
  const category = getPerformanceCategory(currentRatio);

  return (
    <div className="space-y-6">
      {/* Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💪 Power to Weight Ratio Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="horsepower">Horsepower (HP)</Label>
              <Input
                id="horsepower"
                type="number"
                value={horsepower}
                onChange={(e) => setHorsepower(e.target.value)}
                placeholder="e.g., 400"
                className="text-lg"
              />
            </div>
            <div>
              <Label htmlFor="weight">Vehicle Weight (lbs)</Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g., 3200"
                className="text-lg"
              />
            </div>
          </div>
          
          <Button onClick={calculateRatio} className="w-full">
            Calculate Power to Weight Ratio
          </Button>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hp-per-lb">HP per Pound</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="hp-per-lb"
                  type="text"
                  value={hpPerLb}
                  readOnly
                  className="text-lg font-semibold bg-gray-50"
                  placeholder="0.0000"
                />
                {hpPerLb && (
                  <Badge className={category.color}>
                    {category.label}
                  </Badge>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="lb-per-hp">Pounds per HP</Label>
              <Input
                id="lb-per-hp"
                type="text"
                value={lbPerHp}
                readOnly
                className="text-lg font-semibold bg-gray-50"
                placeholder="0.00"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">Economy Cars</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>0.03-0.05 HP/lb</span>
                  <span>20-33 lb/HP</span>
                </div>
                <p className="text-xs text-gray-600">
                  Typical economy cars, hybrids
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">Average Performance</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>0.05-0.08 HP/lb</span>
                  <span>12-20 lb/HP</span>
                </div>
                <p className="text-xs text-gray-600">
                  Mid-size sedans, crossovers
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">Performance Cars</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>0.08-0.12 HP/lb</span>
                  <span>8-12 lb/HP</span>
                </div>
                <p className="text-xs text-gray-600">
                  Hot hatches, muscle cars
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">Sports Cars</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>0.12-0.15 HP/lb</span>
                  <span>6-8 lb/HP</span>
                </div>
                <p className="text-xs text-gray-600">
                  Corvette, Mustang GT, Camaro SS
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">High Performance</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>0.15-0.20 HP/lb</span>
                  <span>5-6 lb/HP</span>
                </div>
                <p className="text-xs text-gray-600">
                  Porsche 911, BMW M3, Hellcat
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">Supercars</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>0.20+ HP/lb</span>
                  <span>&lt;5 lb/HP</span>
                </div>
                <p className="text-xs text-gray-600">
                  Ferrari, Lamborghini, McLaren
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Example Vehicles */}
      <Card>
        <CardHeader>
          <CardTitle>Example Vehicles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700">Classic Muscle Cars</h4>
              <div className="text-sm space-y-2">
                <div className="flex justify-between items-center">
                  <span>1970 Plymouth 'Cuda 440</span>
                  <Badge variant="outline">0.11 HP/lb</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>1969 Camaro Z/28</span>
                  <Badge variant="outline">0.10 HP/lb</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>1970 Chevelle SS 454</span>
                  <Badge variant="outline">0.12 HP/lb</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700">Modern Performance</h4>
              <div className="text-sm space-y-2">
                <div className="flex justify-between items-center">
                  <span>Dodge Hellcat</span>
                  <Badge variant="outline">0.16 HP/lb</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Corvette Z06</span>
                  <Badge variant="outline">0.19 HP/lb</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>McLaren 720S</span>
                  <Badge variant="outline">0.23 HP/lb</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formula Information */}
      <Card>
        <CardHeader>
          <CardTitle>Calculation Formula</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Power to Weight Ratio:</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                HP per Pound = Horsepower ÷ Vehicle Weight (lbs)
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Weight to Power Ratio:</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                Pounds per HP = Vehicle Weight (lbs) ÷ Horsepower
              </p>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                <strong>Note:</strong> Power to weight ratio is a key indicator of vehicle performance. 
                Higher ratios generally mean better acceleration and performance, but other factors like 
                aerodynamics, traction, and gearing also play important roles.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
