'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gauge, Calculator, Info } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

interface TireSpeedResult {
  speed: number;
  speedKph: number;
  tireCircumference: number;
  revolutionsPerMile: number;
}

export function TireSpeedCalculator() {
  const [tireDiameter, setTireDiameter] = useState<string>('');
  const [gearRatio, setGearRatio] = useState<string>('');
  const [rpm, setRpm] = useState<string>('');
  const [result, setResult] = useState<TireSpeedResult | null>(null);

  const calculateSpeed = () => {
    const diameter = parseFloat(tireDiameter);
    const ratio = parseFloat(gearRatio);
    const engineRpm = parseFloat(rpm);

    if (isNaN(diameter) || isNaN(ratio) || isNaN(engineRpm) || 
        diameter <= 0 || ratio <= 0 || engineRpm <= 0) {
      setResult(null);
      return;
    }

    // Calculate tire circumference in inches
    const circumference = Math.PI * diameter;
    
    // Calculate revolutions per mile
    const revolutionsPerMile = 63360 / circumference; // 63360 inches in a mile
    
    // Calculate speed in MPH
    // Speed = (RPM / gear ratio) / revolutions per mile * 60 minutes
    const speed = (engineRpm / ratio) / revolutionsPerMile * 60;
    
    // Convert to KPH
    const speedKph = speed * 1.609344;

    setResult({
      speed: Math.round(speed * 100) / 100,
      speedKph: Math.round(speedKph * 100) / 100,
      tireCircumference: Math.round(circumference * 100) / 100,
      revolutionsPerMile: Math.round(revolutionsPerMile)
    });
  };

  const clearAll = () => {
    setTireDiameter('');
    setGearRatio('');
    setRpm('');
    setResult(null);
  };

  // Auto-calculate when all inputs are valid
  useEffect(() => {
    if (tireDiameter && gearRatio && rpm) {
      calculateSpeed();
    }
  }, [tireDiameter, gearRatio, rpm]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5" />
            Tire Speed Calculator
          </CardTitle>
          <CardDescription>
            Calculate vehicle speed based on tire diameter, gear ratio, and engine RPM
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tire Diameter (inches)</label>
              <Input
                type="number"
                placeholder="e.g., 28.0"
                value={tireDiameter}
                onChange={(e) => setTireDiameter(e.target.value)}
                step="0.1"
                min="10"
                max="50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Gear Ratio</label>
              <Input
                type="number"
                placeholder="e.g., 3.73"
                value={gearRatio}
                onChange={(e) => setGearRatio(e.target.value)}
                step="0.01"
                min="1"
                max="10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Engine RPM</label>
              <Input
                type="number"
                placeholder="e.g., 6000"
                value={rpm}
                onChange={(e) => setRpm(e.target.value)}
                step="100"
                min="500"
                max="10000"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculateSpeed} className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Calculate Speed
            </Button>
            <Button variant="outline" onClick={clearAll}>
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Speed Calculation Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Vehicle Speed</span>
                    <CopyButton text={result.speed.toString()} />
                  </div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {result.speed} MPH
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {result.speedKph} KPH
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Tire Circumference</span>
                    <CopyButton text={result.tireCircumference.toString()} />
                  </div>
                  <div className="text-xl font-bold text-green-600 dark:text-green-400">
                    {result.tireCircumference} inches
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Revolutions per Mile</span>
                    <CopyButton text={result.revolutionsPerMile.toString()} />
                  </div>
                  <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    {result.revolutionsPerMile} rev/mile
                  </div>
                </div>

                <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Calculation Formula</span>
                    <Info className="h-4 w-4" />
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Speed = (RPM ÷ Gear Ratio) ÷ Rev/Mile × 60
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Common Tire Sizes Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Common Tire Diameter Reference</CardTitle>
          <CardDescription>
            Approximate overall diameters for common tire sizes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Badge variant="outline" className="w-full justify-center">Street Tires</Badge>
              <div className="text-sm space-y-1">
                <div>225/60R16: 26.6"</div>
                <div>235/70R16: 28.0"</div>
                <div>245/75R16: 29.5"</div>
                <div>265/70R17: 30.6"</div>
              </div>
            </div>
            <div className="space-y-2">
              <Badge variant="outline" className="w-full justify-center">Performance</Badge>
              <div className="text-sm space-y-1">
                <div>245/45R17: 25.7"</div>
                <div>255/40R18: 26.0"</div>
                <div>275/35R19: 26.6"</div>
                <div>295/30R20: 27.0"</div>
              </div>
            </div>
            <div className="space-y-2">
              <Badge variant="outline" className="w-full justify-center">Drag Racing</Badge>
              <div className="text-sm space-y-1">
                <div>28x9.0R15: 28.0"</div>
                <div>29x10.5R15: 29.0"</div>
                <div>30x12.0R15: 30.0"</div>
                <div>31x13.5R15: 31.0"</div>
              </div>
            </div>
            <div className="space-y-2">
              <Badge variant="outline" className="w-full justify-center">Off-Road</Badge>
              <div className="text-sm space-y-1">
                <div>31x10.5R15: 31.0"</div>
                <div>33x12.5R15: 33.0"</div>
                <div>35x12.5R17: 35.0"</div>
                <div>37x13.5R17: 37.0"</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
