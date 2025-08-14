'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

export function AutomotiveTemperatureConverter() {
  const [fahrenheit, setFahrenheit] = useState<string>('');
  const [celsius, setCelsius] = useState<string>('');

  const convertFToC = (fValue: string) => {
    setFahrenheit(fValue);
    if (fValue && !isNaN(Number(fValue))) {
      const result = (Number(fValue) - 32) * 5/9;
      setCelsius(result.toFixed(1));
    } else {
      setCelsius('');
    }
  };

  const convertCToF = (cValue: string) => {
    setCelsius(cValue);
    if (cValue && !isNaN(Number(cValue))) {
      const result = (Number(cValue) * 9/5) + 32;
      setFahrenheit(result.toFixed(1));
    } else {
      setFahrenheit('');
    }
  };

  const getTemperatureStatus = (tempF: number) => {
    if (tempF < 160) return { label: 'Cold', color: 'bg-blue-100 text-blue-700' };
    if (tempF < 180) return { label: 'Cool', color: 'bg-cyan-100 text-cyan-700' };
    if (tempF < 200) return { label: 'Normal', color: 'bg-green-100 text-green-700' };
    if (tempF < 220) return { label: 'Warm', color: 'bg-yellow-100 text-yellow-700' };
    if (tempF < 240) return { label: 'Hot', color: 'bg-orange-100 text-orange-700' };
    return { label: 'Overheating', color: 'bg-red-100 text-red-700' };
  };

  const currentTempF = fahrenheit ? Number(fahrenheit) : 0;
  const status = getTemperatureStatus(currentTempF);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Fahrenheit to Celsius */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🌡️ Fahrenheit to Celsius
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="fahrenheit-input">Fahrenheit (°F)</Label>
              <Input
                id="fahrenheit-input"
                type="number"
                value={fahrenheit}
                onChange={(e) => convertFToC(e.target.value)}
                placeholder="Enter °F"
                className="text-lg"
              />
            </div>
            <div>
              <Label htmlFor="celsius-output">Celsius (°C)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="celsius-output"
                  type="text"
                  value={celsius}
                  readOnly
                  className="text-lg font-semibold bg-gray-50"
                />
                {fahrenheit && (
                  <Badge className={status.color}>
                    {status.label}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Celsius to Fahrenheit */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🌡️ Celsius to Fahrenheit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="celsius-input">Celsius (°C)</Label>
              <Input
                id="celsius-input"
                type="number"
                value={celsius}
                onChange={(e) => convertCToF(e.target.value)}
                placeholder="Enter °C"
                className="text-lg"
              />
            </div>
            <div>
              <Label htmlFor="fahrenheit-output">Fahrenheit (°F)</Label>
              <Input
                id="fahrenheit-output"
                type="text"
                value={fahrenheit}
                readOnly
                className="text-lg font-semibold bg-gray-50"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Automotive Temperature Ranges */}
      <Card>
        <CardHeader>
          <CardTitle>Automotive Temperature Ranges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">Engine Coolant</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Cold Start</span>
                  <span>32-100°F (0-38°C)</span>
                </div>
                <div className="flex justify-between">
                  <span>Warm Up</span>
                  <span>100-160°F (38-71°C)</span>
                </div>
                <div className="flex justify-between">
                  <span>Normal Operating</span>
                  <span>180-220°F (82-104°C)</span>
                </div>
                <div className="flex justify-between">
                  <span>Overheating</span>
                  <span>240°F+ (116°C+)</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">Engine Oil</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Cold Oil</span>
                  <span>32-100°F (0-38°C)</span>
                </div>
                <div className="flex justify-between">
                  <span>Warm Oil</span>
                  <span>100-180°F (38-82°C)</span>
                </div>
                <div className="flex justify-between">
                  <span>Normal Operating</span>
                  <span>180-250°F (82-121°C)</span>
                </div>
                <div className="flex justify-between">
                  <span>Too Hot</span>
                  <span>280°F+ (138°C+)</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-gray-700">Transmission</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Cold</span>
                  <span>32-100°F (0-38°C)</span>
                </div>
                <div className="flex justify-between">
                  <span>Normal</span>
                  <span>160-200°F (71-93°C)</span>
                </div>
                <div className="flex justify-between">
                  <span>Hot</span>
                  <span>200-250°F (93-121°C)</span>
                </div>
                <div className="flex justify-between">
                  <span>Damage Zone</span>
                  <span>260°F+ (127°C+)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common Temperature Points */}
      <Card>
        <CardHeader>
          <CardTitle>Common Temperature Reference Points</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-700">Critical Points</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between font-mono">
                  <span>Water Freezing</span>
                  <span>32°F (0°C)</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>Thermostat Opens</span>
                  <span>180-195°F (82-90°C)</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>Water Boiling</span>
                  <span>212°F (100°C)</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>Coolant Boiling (15 PSI)</span>
                  <span>250°F (121°C)</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-700">Performance Ranges</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between font-mono">
                  <span>Racing Engine</span>
                  <span>200-230°F (93-110°C)</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>High Performance</span>
                  <span>190-210°F (88-99°C)</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>Street Performance</span>
                  <span>180-200°F (82-93°C)</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>Economy Driving</span>
                  <span>185-195°F (85-90°C)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formula Information */}
      <Card>
        <CardHeader>
          <CardTitle>Converters Formulas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Fahrenheit to Celsius:</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                °C = (°F - 32) × 5/9
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Celsius to Fahrenheit:</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                °F = (°C × 9/5) + 32
              </p>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                <strong>Note:</strong> Automotive temperature monitoring is critical for engine longevity. 
                Most modern engines operate best between 180-220°F (82-104°C). Temperatures consistently 
                above 240°F (116°C) can cause serious engine damage.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
