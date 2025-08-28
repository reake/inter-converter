'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function RPMCalculator() {
  const [mph, setMph] = useState<string>('');
  const [gearRatio, setGearRatio] = useState<string>('');
  const [tireDiameter, setTireDiameter] = useState<string>('');
  const [rpm, setRpm] = useState<string>('');

  const calculateRPM = () => {
    if (mph && gearRatio && tireDiameter && 
        !isNaN(Number(mph)) && !isNaN(Number(gearRatio)) && !isNaN(Number(tireDiameter))) {
      const calculatedRPM = (Number(mph) * Number(gearRatio) * 336) / Number(tireDiameter);
      setRpm(calculatedRPM.toFixed(0));
    }
  };

  const clearAll = () => {
    setMph('');
    setGearRatio('');
    setTireDiameter('');
    setRpm('');
  };

  return (
    <div className="space-y-6">
      {/* RPM Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🌀 RPM Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
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
              <Label htmlFor="gear-ratio">Gear Ratio</Label>
              <Input
                id="gear-ratio"
                type="number"
                step="0.01"
                value={gearRatio}
                onChange={(e) => setGearRatio(e.target.value)}
                placeholder="e.g., 3.73"
                className="text-lg"
              />
            </div>
            <div>
              <Label htmlFor="tire-diameter">Tire Diameter (inches)</Label>
              <Input
                id="tire-diameter"
                type="number"
                step="0.1"
                value={tireDiameter}
                onChange={(e) => setTireDiameter(e.target.value)}
                placeholder="e.g., 28.0"
                className="text-lg"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={calculateRPM} className="flex-1">
              Calculate RPM
            </Button>
            <Button onClick={clearAll} variant="outline">
              Clear
            </Button>
          </div>
          
          <div>
            <Label htmlFor="rpm-result">Engine RPM</Label>
            <Input
              id="rpm-result"
              type="text"
              value={rpm}
              readOnly
              className="text-xl font-bold bg-gray-50 text-center"
              placeholder="Result will appear here"
            />
          </div>
        </CardContent>
      </Card>

      {/* Common Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle>Common Driving Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700">Highway Cruising (70 MPH)</h4>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>3.08 ratio, 28" tires:</span>
                  <span className="font-mono">2,600 RPM</span>
                </div>
                <div className="flex justify-between">
                  <span>3.42 ratio, 28" tires:</span>
                  <span className="font-mono">2,880 RPM</span>
                </div>
                <div className="flex justify-between">
                  <span>3.73 ratio, 28" tires:</span>
                  <span className="font-mono">3,140 RPM</span>
                </div>
                <div className="flex justify-between">
                  <span>4.10 ratio, 28" tires:</span>
                  <span className="font-mono">3,450 RPM</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700">City Driving (35 MPH)</h4>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>3.08 ratio, 28" tires:</span>
                  <span className="font-mono">1,300 RPM</span>
                </div>
                <div className="flex justify-between">
                  <span>3.42 ratio, 28" tires:</span>
                  <span className="font-mono">1,440 RPM</span>
                </div>
                <div className="flex justify-between">
                  <span>3.73 ratio, 28" tires:</span>
                  <span className="font-mono">1,570 RPM</span>
                </div>
                <div className="flex justify-between">
                  <span>4.10 ratio, 28" tires:</span>
                  <span className="font-mono">1,725 RPM</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tire Size Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Common Tire Diameters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">Passenger Cars</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>205/55R16</span>
                  <span>24.9"</span>
                </div>
                <div className="flex justify-between">
                  <span>225/60R16</span>
                  <span>26.6"</span>
                </div>
                <div className="flex justify-between">
                  <span>235/65R17</span>
                  <span>29.0"</span>
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
              <h4 className="font-semibold text-sm text-gray-700">Trucks/SUVs</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>265/70R17</span>
                  <span>31.6"</span>
                </div>
                <div className="flex justify-between">
                  <span>285/75R16</span>
                  <span>32.8"</span>
                </div>
                <div className="flex justify-between">
                  <span>33x12.50R15</span>
                  <span>33.0"</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formula and Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Formula & Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">RPM Calculation Formula:</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                RPM = (MPH × Gear Ratio × 336) ÷ Tire Diameter (inches)
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Tips for Optimal RPM:</h4>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>Most engines are most efficient between 1,500-2,500 RPM for cruising</li>
                <li>Peak torque typically occurs between 2,000-4,000 RPM</li>
                <li>Higher RPM increases fuel consumption and engine wear</li>
                <li>Lower gear ratios reduce RPM at highway speeds but hurt acceleration</li>
                <li>Larger tire diameter reduces RPM but may affect speedometer accuracy</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
