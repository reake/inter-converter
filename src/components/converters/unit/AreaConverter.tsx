'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Square, ArrowRightLeft } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

const AREA_UNITS = {
  'mm2': 'Square Millimeters',
  'cm2': 'Square Centimeters',
  'm2': 'Square Meters',
  'km2': 'Square Kilometers',
  'in2': 'Square Inches',
  'ft2': 'Square Feet',
  'yd2': 'Square Yards',
  'mi2': 'Square Miles',
  'acre': 'Acres',
  'hectare': 'Hectares'
};

// Conversion factors to square meters
const AREA_FACTORS = {
  'mm2': 0.000001,
  'cm2': 0.0001,
  'm2': 1,
  'km2': 1000000,
  'in2': 0.00064516,
  'ft2': 0.092903,
  'yd2': 0.836127,
  'mi2': 2589988.11,
  'acre': 4046.86,
  'hectare': 10000
};

export function AreaConverter() {
  const [fromUnit, setFromUnit] = useState('m2');
  const [toUnit, setToUnit] = useState('ft2');
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
      if (AREA_FACTORS[fromUnit as keyof typeof AREA_FACTORS] && AREA_FACTORS[toUnit as keyof typeof AREA_FACTORS]) {
        const baseValue = numValue * AREA_FACTORS[fromUnit as keyof typeof AREA_FACTORS];
        const convertedValue = baseValue / AREA_FACTORS[toUnit as keyof typeof AREA_FACTORS];
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
      return `${value} ${AREA_UNITS[fromUnit as keyof typeof AREA_UNITS]} = ${formatResult(result)} ${AREA_UNITS[toUnit as keyof typeof AREA_UNITS]}`;
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
      {/* Conversion Interface */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Square className="h-5 w-5" />
            Area Converter
          </CardTitle>
          <CardDescription>
            Convert between different area units
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Value Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Value</label>
            <Input
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
              <label className="block text-sm font-medium mb-2">From</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full p-3 border border-input rounded-md bg-background"
              >
                {Object.entries(AREA_UNITS).map(([key, name]) => (
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
                {Object.entries(AREA_UNITS).map(([key, name]) => (
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
                  {AREA_UNITS[toUnit as keyof typeof AREA_UNITS]}
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
              {value} {AREA_UNITS[fromUnit as keyof typeof AREA_UNITS]} = {formatResult(result)} {AREA_UNITS[toUnit as keyof typeof AREA_UNITS]}
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
          <CardTitle className="text-lg">Common Area Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Metric System</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>1 square kilometer</span>
                  <span className="text-muted-foreground">1,000,000 m²</span>
                </div>
                <div className="flex justify-between">
                  <span>1 hectare</span>
                  <span className="text-muted-foreground">10,000 m²</span>
                </div>
                <div className="flex justify-between">
                  <span>1 square meter</span>
                  <span className="text-muted-foreground">10,000 cm²</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Imperial System</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>1 square mile</span>
                  <span className="text-muted-foreground">640 acres</span>
                </div>
                <div className="flex justify-between">
                  <span>1 acre</span>
                  <span className="text-muted-foreground">43,560 ft²</span>
                </div>
                <div className="flex justify-between">
                  <span>1 square yard</span>
                  <span className="text-muted-foreground">9 ft²</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
