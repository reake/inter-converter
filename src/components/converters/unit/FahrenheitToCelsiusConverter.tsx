'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Thermometer, ArrowRightLeft } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

export default function FahrenheitToCelsiusConverter() {
  const [fahrenheit, setFahrenheit] = useState<string>('32');
  const [celsius, setCelsius] = useState<string>('0');

  const convertFahrenheitToCelsius = (f: number): number => {
    return (f - 32) * 5 / 9;
  };

  const convertCelsiusToFahrenheit = (c: number): number => {
    return (c * 9 / 5) + 32;
  };

  const handleFahrenheitChange = (value: string) => {
    setFahrenheit(value);
    const f = parseFloat(value);
    if (!isNaN(f)) {
      const c = convertFahrenheitToCelsius(f);
      setCelsius(c.toFixed(2));
      
    } else {
      setCelsius('');
    }
  };

  const handleCelsiusChange = (value: string) => {
    setCelsius(value);
    const c = parseFloat(value);
    if (!isNaN(c)) {
      const f = convertCelsiusToFahrenheit(c);
      setFahrenheit(f.toFixed(2));
      
    } else {
      setFahrenheit('');
    }
  };

  const swapUnits = () => {
    const temp = fahrenheit;
    setFahrenheit(celsius);
    setCelsius(temp);
  };

  const getResultText = () => {
    if (fahrenheit && celsius) {
      return `${fahrenheit}°F = ${celsius}°C`;
    }
    return '';
  };

  const formatResult = (value: number) => {
    return parseFloat(value.toFixed(2)).toString();
  };

  return (
    <div className="space-y-6">
      {/* Conversion Interface */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Thermometer className="h-5 w-5" />
            Fahrenheit to Celsius Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Value Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Temperature Value</label>
            <Input
              type="number"
              value={fahrenheit}
              onChange={(e) => handleFahrenheitChange(e.target.value)}
              placeholder="Enter Fahrenheit"
              className="text-lg"
              step="any"
            />
          </div>

          {/* Unit Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium mb-2">Fahrenheit (°F)</label>
              <Input
                type="number"
                value={fahrenheit}
                onChange={(e) => handleFahrenheitChange(e.target.value)}
                placeholder="Enter Fahrenheit"
                className="text-lg"
                step="any"
              />
            </div>

            <div className="flex justify-center">
              <Button
                onClick={swapUnits}
                variant="outline"
                size="sm"
                className="rounded-full w-10 h-10 p-0"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Celsius (°C)</label>
              <Input
                type="number"
                value={celsius}
                onChange={(e) => handleCelsiusChange(e.target.value)}
                placeholder="Enter Celsius"
                className="text-lg"
                step="any"
              />
            </div>
          </div>

          {/* Result */}
          {fahrenheit && celsius && (
            <div className="p-6 bg-muted rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {formatResult(parseFloat(celsius))}°C
                </div>
                <div className="text-muted-foreground mb-4">
                  = {formatResult(parseFloat(fahrenheit))}°F
                </div>
                <CopyButton
                  text={getResultText()}
                  variant="outline"
                  size="sm"
                  showText={true}
                  successText="Result Copied!"
                />
              </div>
            </div>
          )}

          {/* Conversion Formula */}
          {fahrenheit && celsius && (
            <div className="text-center text-sm text-muted-foreground">
              {formatResult(parseFloat(fahrenheit))}°F = {formatResult(parseFloat(celsius))}°C
            </div>
          )}

        </CardContent>
      </Card>

      {/* Conversion Reference */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Common Temperature Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Common Temperatures</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Water freezes</span>
                  <span className="text-muted-foreground">32°F = 0°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Room temperature</span>
                  <span className="text-muted-foreground">68°F = 20°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Body temperature</span>
                  <span className="text-muted-foreground">98.6°F = 37°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Water boils</span>
                  <span className="text-muted-foreground">212°F = 100°C</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Conversion Formulas</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <div className="font-medium">Fahrenheit to Celsius</div>
                  <div className="text-muted-foreground">°C = (°F - 32) × 5/9</div>
                </div>
                <div>
                  <div className="font-medium">Celsius to Fahrenheit</div>
                  <div className="text-muted-foreground">°F = °C × 9/5 + 32</div>
                </div>
                <div>
                  <div className="font-medium">Quick Approximation</div>
                  <div className="text-muted-foreground">°F ≈ °C × 2 + 30</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
