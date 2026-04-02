'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Beaker, ArrowRightLeft } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

const VOLUME_UNITS = {
  'ml': 'Milliliters',
  'l': 'Liters',
  'm3': 'Cubic Meters',
  'tsp': 'Teaspoons',
  'tbsp': 'Tablespoons',
  'fl_oz': 'Fluid Ounces',
  'cup': 'Cups',
  'pt': 'Pints',
  'qt': 'Quarts',
  'gal': 'Gallons'
};

// Conversion factors to liters
const VOLUME_FACTORS = {
  'ml': 0.001,
  'l': 1,
  'm3': 1000,
  'tsp': 0.00492892,
  'tbsp': 0.0147868,
  'fl_oz': 0.0295735,
  'cup': 0.236588,
  'pt': 0.473176,
  'qt': 0.946353,
  'gal': 3.78541
};

export function VolumeConverter() {
  const [fromUnit, setFromUnit] = useState('l');
  const [toUnit, setToUnit] = useState('gal');
  const [value, setValue] = useState('1');
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
      if (VOLUME_FACTORS[fromUnit as keyof typeof VOLUME_FACTORS] && VOLUME_FACTORS[toUnit as keyof typeof VOLUME_FACTORS]) {
        const baseValue = numValue * VOLUME_FACTORS[fromUnit as keyof typeof VOLUME_FACTORS];
        const convertedValue = baseValue / VOLUME_FACTORS[toUnit as keyof typeof VOLUME_FACTORS];
        setResult(convertedValue);
        setError('');
      } else {
        setError('Conversion not supported');
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
      return `${value} ${VOLUME_UNITS[fromUnit as keyof typeof VOLUME_UNITS]} = ${formatResult(result)} ${VOLUME_UNITS[toUnit as keyof typeof VOLUME_UNITS]}`;
    }
    return '';
  };

  const formatResult = (value: number) => {
    if (Math.abs(value) >= 1000000) {
      return value.toExponential(6);
    } else if (Math.abs(value) < 0.001 && value !== 0) {
      return value.toExponential(6);
    } else {
      return parseFloat(value.toFixed(8)).toString();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="sr-only">Volume conversion tool</h2>
      {/* Conversion Interface */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Beaker className="h-5 w-5" />
            Volume Converter
          </CardTitle>
          <CardDescription>
            Convert between different volume units
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Value Input */}
          <div>
            <label htmlFor="volume-value" className="block text-sm font-medium mb-2">Value</label>
            <Input
              id="volume-value"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
              className="text-lg"
              step="any"
            />
          </div>

          {/* Unit Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label htmlFor="volume-from-unit" className="block text-sm font-medium mb-2">From Unit</label>
              <select
                id="volume-from-unit"
                aria-label="From unit"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full p-3 border border-input rounded-md bg-background"
              >
                {Object.entries(VOLUME_UNITS).map(([key, name]) => (
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
                aria-label="Swap volume units"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>

            <div>
              <label htmlFor="volume-to-unit" className="block text-sm font-medium mb-2">To Unit</label>
              <select
                id="volume-to-unit"
                aria-label="To unit"
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full p-3 border border-input rounded-md bg-background"
              >
                {Object.entries(VOLUME_UNITS).map(([key, name]) => (
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
                </div>
                <div className="text-muted-foreground mb-4">
                  {VOLUME_UNITS[toUnit as keyof typeof VOLUME_UNITS]}
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
              {value} {VOLUME_UNITS[fromUnit as keyof typeof VOLUME_UNITS]} = {formatResult(result)} {VOLUME_UNITS[toUnit as keyof typeof VOLUME_UNITS]}
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
          <CardTitle className="text-lg">Common Volume Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Metric System</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>1 cubic meter</span>
                  <span className="text-muted-foreground">1,000 liters</span>
                </div>
                <div className="flex justify-between">
                  <span>1 liter</span>
                  <span className="text-muted-foreground">1,000 milliliters</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Imperial System</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>1 gallon</span>
                  <span className="text-muted-foreground">4 quarts</span>
                </div>
                <div className="flex justify-between">
                  <span>1 quart</span>
                  <span className="text-muted-foreground">2 pints</span>
                </div>
                <div className="flex justify-between">
                  <span>1 pint</span>
                  <span className="text-muted-foreground">2 cups</span>
                </div>
                <div className="flex justify-between">
                  <span>1 cup</span>
                  <span className="text-muted-foreground">8 fl oz</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
