'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function TorqueHorsepowerCalculator() {
  const [torque, setTorque] = useState<string>('');
  const [rpm, setRpm] = useState<string>('');
  const [horsepower, setHorsepower] = useState<string>('');

  const calculateHorsepower = () => {
    if (torque && rpm && !isNaN(Number(torque)) && !isNaN(Number(rpm))) {
      const hp = (Number(torque) * Number(rpm)) / 5252;
      setHorsepower(hp.toFixed(2));
    }
  };

  const calculateTorque = () => {
    if (horsepower && rpm && !isNaN(Number(horsepower)) && !isNaN(Number(rpm))) {
      const tq = (Number(horsepower) * 5252) / Number(rpm);
      setTorque(tq.toFixed(2));
    }
  };

  const clearAll = () => {
    setTorque('');
    setRpm('');
    setHorsepower('');
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="curves">Power Curves</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="space-y-6">
          {/* Main Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔩 Torque & Horsepower Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="torque">Torque (lb-ft)</Label>
                  <Input
                    id="torque"
                    type="number"
                    value={torque}
                    onChange={(e) => setTorque(e.target.value)}
                    placeholder="e.g., 400"
                    className="text-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="rpm">RPM</Label>
                  <Input
                    id="rpm"
                    type="number"
                    value={rpm}
                    onChange={(e) => setRpm(e.target.value)}
                    placeholder="e.g., 3000"
                    className="text-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="horsepower">Horsepower (HP)</Label>
                  <Input
                    id="horsepower"
                    type="number"
                    value={horsepower}
                    onChange={(e) => setHorsepower(e.target.value)}
                    placeholder="e.g., 228"
                    className="text-lg"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={calculateHorsepower} className="flex-1">
                  Calculate HP from Torque
                </Button>
                <Button onClick={calculateTorque} className="flex-1">
                  Calculate Torque from HP
                </Button>
                <Button onClick={clearAll} variant="outline">
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Example Engines */}
          <Card>
            <CardHeader>
              <CardTitle>Example Engine Characteristics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-700">High-Torque Engines</h4>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>Diesel Truck Engine:</span>
                      <span>1,000+ lb-ft @ 1,600 RPM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Big Block V8:</span>
                      <span>500 lb-ft @ 3,200 RPM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Modern Turbo V6:</span>
                      <span>400 lb-ft @ 2,000 RPM</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-700">High-RPM Engines</h4>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>Formula 1 V6:</span>
                      <span>200 lb-ft @ 10,500 RPM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Motorcycle Engine:</span>
                      <span>80 lb-ft @ 8,000 RPM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>High-Rev V8:</span>
                      <span>300 lb-ft @ 7,000 RPM</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="curves" className="space-y-6">
          {/* Power Curve Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Typical Power Curves</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Small Block V8 (350 CI)</h4>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <div className="font-semibold">RPM</div>
                    <div className="font-semibold">Torque</div>
                    <div className="font-semibold">HP</div>
                    <div className="font-semibold">Efficiency</div>
                    
                    <div>2000</div>
                    <div>320 lb-ft</div>
                    <div>122 HP</div>
                    <div>Peak Torque</div>
                    
                    <div>3000</div>
                    <div>350 lb-ft</div>
                    <div>200 HP</div>
                    <div>Good Power</div>
                    
                    <div>4000</div>
                    <div>340 lb-ft</div>
                    <div>259 HP</div>
                    <div>Sweet Spot</div>
                    
                    <div>5000</div>
                    <div>320 lb-ft</div>
                    <div>305 HP</div>
                    <div>Peak HP</div>
                    
                    <div>6000</div>
                    <div>290 lb-ft</div>
                    <div>331 HP</div>
                    <div>High RPM</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Modern Turbo 4-Cylinder</h4>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <div className="font-semibold">RPM</div>
                    <div className="font-semibold">Torque</div>
                    <div className="font-semibold">HP</div>
                    <div className="font-semibold">Boost</div>
                    
                    <div>1500</div>
                    <div>280 lb-ft</div>
                    <div>80 HP</div>
                    <div>15 PSI</div>
                    
                    <div>2500</div>
                    <div>295 lb-ft</div>
                    <div>140 HP</div>
                    <div>18 PSI</div>
                    
                    <div>3500</div>
                    <div>290 lb-ft</div>
                    <div>193 HP</div>
                    <div>20 PSI</div>
                    
                    <div>4500</div>
                    <div>275 lb-ft</div>
                    <div>235 HP</div>
                    <div>22 PSI</div>
                    
                    <div>5500</div>
                    <div>250 lb-ft</div>
                    <div>261 HP</div>
                    <div>20 PSI</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Formula Information */}
      <Card>
        <CardHeader>
          <CardTitle>Formulas & Relationships</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Horsepower from Torque:</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                HP = (Torque × RPM) ÷ 5252
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Torque from Horsepower:</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                Torque = (HP × 5252) ÷ RPM
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Key Relationships:</h4>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>At 5,252 RPM, horsepower and torque values are equal</li>
                <li>Below 5,252 RPM, torque is higher than horsepower</li>
                <li>Above 5,252 RPM, horsepower is higher than torque</li>
                <li>Torque determines acceleration feel, horsepower determines top speed</li>
                <li>Peak torque typically occurs at lower RPM than peak horsepower</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
