'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function TireCalculator() {
  const [originalWidth, setOriginalWidth] = useState<string>('225');
  const [originalAspect, setOriginalAspect] = useState<string>('60');
  const [originalRim, setOriginalRim] = useState<string>('16');
  
  const [newWidth, setNewWidth] = useState<string>('245');
  const [newAspect, setNewAspect] = useState<string>('50');
  const [newRim, setNewRim] = useState<string>('17');

  const [speedometerSpeed, setSpeedometerSpeed] = useState<string>('60');

  const calculateTireDiameter = (width: number, aspect: number, rim: number) => {
    const sidewallHeight = (width * aspect) / 100;
    return (rim + (2 * sidewallHeight / 25.4));
  };

  const originalDiameter = calculateTireDiameter(
    Number(originalWidth) || 0,
    Number(originalAspect) || 0,
    Number(originalRim) || 0
  );

  const newDiameter = calculateTireDiameter(
    Number(newWidth) || 0,
    Number(newAspect) || 0,
    Number(newRim) || 0
  );

  const diameterDifference = newDiameter - originalDiameter;
  const percentageDifference = originalDiameter > 0 ? (diameterDifference / originalDiameter) * 100 : 0;
  
  const actualSpeed = Number(speedometerSpeed) * (newDiameter / originalDiameter);
  const speedDifference = actualSpeed - Number(speedometerSpeed);

  return (
    <div className="space-y-6">
      {/* Tire Size Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🛞 Original Tire Size
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="orig-width">Width (mm)</Label>
                <Input
                  id="orig-width"
                  type="number"
                  value={originalWidth}
                  onChange={(e) => setOriginalWidth(e.target.value)}
                  placeholder="225"
                />
              </div>
              <div>
                <Label htmlFor="orig-aspect">Aspect %</Label>
                <Input
                  id="orig-aspect"
                  type="number"
                  value={originalAspect}
                  onChange={(e) => setOriginalAspect(e.target.value)}
                  placeholder="60"
                />
              </div>
              <div>
                <Label htmlFor="orig-rim">Rim (in)</Label>
                <Input
                  id="orig-rim"
                  type="number"
                  value={originalRim}
                  onChange={(e) => setOriginalRim(e.target.value)}
                  placeholder="16"
                />
              </div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-lg font-semibold">
                {originalWidth}/{originalAspect}R{originalRim}
              </div>
              <div className="text-sm text-gray-600">
                Diameter: {originalDiameter.toFixed(1)}"
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🛞 New Tire Size
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="new-width">Width (mm)</Label>
                <Input
                  id="new-width"
                  type="number"
                  value={newWidth}
                  onChange={(e) => setNewWidth(e.target.value)}
                  placeholder="245"
                />
              </div>
              <div>
                <Label htmlFor="new-aspect">Aspect %</Label>
                <Input
                  id="new-aspect"
                  type="number"
                  value={newAspect}
                  onChange={(e) => setNewAspect(e.target.value)}
                  placeholder="50"
                />
              </div>
              <div>
                <Label htmlFor="new-rim">Rim (in)</Label>
                <Input
                  id="new-rim"
                  type="number"
                  value={newRim}
                  onChange={(e) => setNewRim(e.target.value)}
                  placeholder="17"
                />
              </div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="text-lg font-semibold">
                {newWidth}/{newAspect}R{newRim}
              </div>
              <div className="text-sm text-gray-600">
                Diameter: {newDiameter.toFixed(1)}"
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparison Results */}
      <Card>
        <CardHeader>
          <CardTitle>Size Comparison Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gray-50 rounded">
              <div className="text-2xl font-bold text-blue-600">
                {diameterDifference > 0 ? '+' : ''}{diameterDifference.toFixed(2)}"
              </div>
              <div className="text-sm text-gray-600">Diameter Difference</div>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <div className="text-2xl font-bold text-green-600">
                {percentageDifference > 0 ? '+' : ''}{percentageDifference.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Percentage Change</div>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <div className="text-2xl font-bold text-purple-600">
                {Math.abs(diameterDifference * 3.14159).toFixed(2)}"
              </div>
              <div className="text-sm text-gray-600">Circumference Difference</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Speed Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>Speedometer Accuracy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="speedo-speed">Speedometer Reading (MPH)</Label>
              <Input
                id="speedo-speed"
                type="number"
                value={speedometerSpeed}
                onChange={(e) => setSpeedometerSpeed(e.target.value)}
                placeholder="60"
                className="text-lg"
              />
            </div>
            <div>
              <Label htmlFor="actual-speed">Actual Speed (MPH)</Label>
              <Input
                id="actual-speed"
                type="text"
                value={actualSpeed.toFixed(1)}
                readOnly
                className="text-lg font-semibold bg-gray-50"
              />
            </div>
            <div>
              <Label htmlFor="speed-diff">Speed Difference</Label>
              <Input
                id="speed-diff"
                type="text"
                value={`${speedDifference > 0 ? '+' : ''}${speedDifference.toFixed(1)} MPH`}
                readOnly
                className="text-lg font-semibold bg-gray-50"
              />
            </div>
          </div>
          <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded">
            <strong>Note:</strong> Larger tires make your speedometer read slower than actual speed. 
            Smaller tires make it read faster than actual speed.
          </div>
        </CardContent>
      </Card>

      {/* Common Tire Sizes */}
      <Card>
        <CardHeader>
          <CardTitle>Common Tire Size Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">Compact Cars</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>185/65R15</span>
                  <span>24.5"</span>
                </div>
                <div className="flex justify-between">
                  <span>195/60R16</span>
                  <span>24.2"</span>
                </div>
                <div className="flex justify-between">
                  <span>205/55R16</span>
                  <span>24.9"</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">Mid-Size Cars</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>215/60R16</span>
                  <span>26.2"</span>
                </div>
                <div className="flex justify-between">
                  <span>225/55R17</span>
                  <span>26.7"</span>
                </div>
                <div className="flex justify-between">
                  <span>235/50R18</span>
                  <span>27.3"</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">Performance Cars</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>245/40R18</span>
                  <span>25.7"</span>
                </div>
                <div className="flex justify-between">
                  <span>275/35R19</span>
                  <span>26.6"</span>
                </div>
                <div className="flex justify-between">
                  <span>295/30R20</span>
                  <span>27.0"</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">SUVs/Trucks</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>235/75R15</span>
                  <span>28.9"</span>
                </div>
                <div className="flex justify-between">
                  <span>265/70R17</span>
                  <span>31.6"</span>
                </div>
                <div className="flex justify-between">
                  <span>285/75R16</span>
                  <span>32.8"</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">Off-Road</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>31x10.50R15</span>
                  <span>31.0"</span>
                </div>
                <div className="flex justify-between">
                  <span>33x12.50R15</span>
                  <span>33.0"</span>
                </div>
                <div className="flex justify-between">
                  <span>35x12.50R17</span>
                  <span>35.0"</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">Plus Sizing</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>225/60R16</span>
                  <span>26.6" (Original)</span>
                </div>
                <div className="flex justify-between">
                  <span>225/50R17</span>
                  <span>26.9" (+1)</span>
                </div>
                <div className="flex justify-between">
                  <span>225/45R18</span>
                  <span>26.0" (+2)</span>
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
              <h4 className="font-semibold mb-2">Tire Diameter Calculation:</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                Diameter = Rim Diameter + (2 × Sidewall Height)<br/>
                Sidewall Height = (Tire Width × Aspect Ratio) ÷ 100 ÷ 25.4
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Speed Correction:</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                Actual Speed = Speedometer Reading × (New Diameter ÷ Original Diameter)
              </p>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                <strong>Important:</strong> Changing tire size affects speedometer accuracy, 
                fuel economy, and vehicle performance. Most manufacturers recommend staying 
                within ±3% of the original tire diameter.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
