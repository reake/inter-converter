'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Thermometer, ArrowRightLeft } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';
import { ConvertersEngine } from '@/lib/converters/conversion-engine';

const TEMPERATURE_UNITS = {
  c: 'Celsius',
  f: 'Fahrenheit',
  k: 'Kelvin'
};

export function TemperatureConverter() {
  const [fromUnit, setFromUnit] = useState('c');
  const [toUnit, setToUnit] = useState('f');
  const [value, setValue] = useState('0');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const convertValue = useCallback(() => {
    if (!value || isNaN(parseFloat(value))) {
      setResult(null);
      setError('');
      return;
    }

    const numValue = parseFloat(value);
    
    try {
      const tempResult = ConvertersEngine.convertTemperature(numValue, fromUnit, toUnit);
      if (tempResult.success && tempResult.result !== undefined) {
        setResult(tempResult.result);
        setError('');
      } else {
        setError(tempResult.error || 'Conversion failed');
        setResult(null);
      }
    } catch {
      setError('Conversion error');
      setResult(null);
    }
  }, [value, fromUnit, toUnit]);

  useEffect(() => {
    convertValue();
  }, [convertValue]);

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const getResultText = () => {
    if (result !== null) {
      const fromSymbol = fromUnit === 'k' ? 'K' : `°${fromUnit.toUpperCase()}`;
      const toSymbol = toUnit === 'k' ? 'K' : `°${toUnit.toUpperCase()}`;
      return `${value}${fromSymbol} = ${formatResult(result)}${toSymbol}`;
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
            Temperature Converter
          </CardTitle>
          <CardDescription>
            Convert between Celsius, Fahrenheit, and Kelvin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Value Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Temperature Value</label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter temperature"
              className="text-lg"
              step="any"
            />
          </div>

          {/* Unit Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium mb-2">From</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full p-3 border border-input rounded-md bg-background"
              >
                {Object.entries(TEMPERATURE_UNITS).map(([key, name]) => (
                  <option key={key} value={key}>
                    {name}
                  </option>
                ))}
              </select>
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
              <label className="block text-sm font-medium mb-2">To</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full p-3 border border-input rounded-md bg-background"
              >
                {Object.entries(TEMPERATURE_UNITS).map(([key, name]) => (
                  <option key={key} value={key}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result */}
          {result !== null && (
            <div className="p-6 bg-muted rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {formatResult(result)}
                  {toUnit === 'k' ? 'K' : `°${toUnit.toUpperCase()}`}
                </div>
                <div className="text-muted-foreground mb-4">
                  {TEMPERATURE_UNITS[toUnit as keyof typeof TEMPERATURE_UNITS]}
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
          {result !== null && (
            <div className="text-center text-sm text-muted-foreground">
              {value}{fromUnit === 'k' ? 'K' : `°${fromUnit.toUpperCase()}`} = {formatResult(result)}{toUnit === 'k' ? 'K' : `°${toUnit.toUpperCase()}`}
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="text-destructive text-sm p-3 bg-destructive/10 rounded-lg">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Conversion Reference */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Temperature Reference Points</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Common Temperatures</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Absolute Zero</span>
                  <span className="text-muted-foreground">-273.15°C / -459.67°F / 0K</span>
                </div>
                <div className="flex justify-between">
                  <span>Water Freezes</span>
                  <span className="text-muted-foreground">0°C / 32°F / 273.15K</span>
                </div>
                <div className="flex justify-between">
                  <span>Room Temperature</span>
                  <span className="text-muted-foreground">20°C / 68°F / 293.15K</span>
                </div>
                <div className="flex justify-between">
                  <span>Body Temperature</span>
                  <span className="text-muted-foreground">37°C / 98.6°F / 310.15K</span>
                </div>
                <div className="flex justify-between">
                  <span>Water Boils</span>
                  <span className="text-muted-foreground">100°C / 212°F / 373.15K</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Conversion Formulas</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <div className="font-medium">Celsius to Fahrenheit</div>
                  <div className="text-muted-foreground">°F = (°C × 9/5) + 32</div>
                </div>
                <div>
                  <div className="font-medium">Fahrenheit to Celsius</div>
                  <div className="text-muted-foreground">°C = (°F - 32) × 5/9</div>
                </div>
                <div>
                  <div className="font-medium">Celsius to Kelvin</div>
                  <div className="text-muted-foreground">K = °C + 273.15</div>
                </div>
                <div>
                  <div className="font-medium">Kelvin to Celsius</div>
                  <div className="text-muted-foreground">°C = K - 273.15</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
