'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Zap, ArrowRightLeft } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

const SPEED_UNITS = {
  'mps': 'Meters per Second',
  'kph': 'Kilometers per Hour',
  'mph': 'Miles per Hour',
  'fps': 'Feet per Second',
  'knot': 'Knots'
};

// Conversion factors to meters per second
const SPEED_FACTORS = {
  'mps': 1,
  'kph': 0.277778,
  'mph': 0.44704,
  'fps': 0.3048,
  'knot': 0.514444
};

export function SpeedConverter() {
  const [fromUnit, setFromUnit] = useState('kph');
  const [toUnit, setToUnit] = useState('mph');
  const [value, setValue] = useState('100');
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
      if (SPEED_FACTORS[fromUnit as keyof typeof SPEED_FACTORS] && SPEED_FACTORS[toUnit as keyof typeof SPEED_FACTORS]) {
        const baseValue = numValue * SPEED_FACTORS[fromUnit as keyof typeof SPEED_FACTORS];
        const convertedValue = baseValue / SPEED_FACTORS[toUnit as keyof typeof SPEED_FACTORS];
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
      return `${value} ${SPEED_UNITS[fromUnit as keyof typeof SPEED_UNITS]} = ${formatResult(result)} ${SPEED_UNITS[toUnit as keyof typeof SPEED_UNITS]}`;
    }
    return '';
  };

  const formatResult = (value: number) => {
    if (Math.abs(value) >= 1000000) {
      return value.toExponential(6);
    } else if (Math.abs(value) < 0.001 && value !== 0) {
      return value.toExponential(6);
    } else {
      return parseFloat(value.toFixed(6)).toString();
    }
  };

  return (
    <div className="space-y-6">
      {/* Conversion Interface */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Speed Converter
          </CardTitle>
          <CardDescription>
            Convert between different speed units
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
                {Object.entries(SPEED_UNITS).map(([key, name]) => (
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
                {Object.entries(SPEED_UNITS).map(([key, name]) => (
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
                  {SPEED_UNITS[toUnit as keyof typeof SPEED_UNITS]}
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
              {value} {SPEED_UNITS[fromUnit as keyof typeof SPEED_UNITS]} = {formatResult(result)} {SPEED_UNITS[toUnit as keyof typeof SPEED_UNITS]}
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
          <CardTitle className="text-lg">Common Speed Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Common Speeds</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Walking speed</span>
                  <span className="text-muted-foreground">5 km/h / 3.1 mph</span>
                </div>
                <div className="flex justify-between">
                  <span>Running speed</span>
                  <span className="text-muted-foreground">15 km/h / 9.3 mph</span>
                </div>
                <div className="flex justify-between">
                  <span>City driving</span>
                  <span className="text-muted-foreground">50 km/h / 31 mph</span>
                </div>
                <div className="flex justify-between">
                  <span>Highway speed</span>
                  <span className="text-muted-foreground">100 km/h / 62 mph</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Conversion Factors</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>1 m/s</span>
                  <span className="text-muted-foreground">3.6 km/h</span>
                </div>
                <div className="flex justify-between">
                  <span>1 km/h</span>
                  <span className="text-muted-foreground">0.621 mph</span>
                </div>
                <div className="flex justify-between">
                  <span>1 mph</span>
                  <span className="text-muted-foreground">1.609 km/h</span>
                </div>
                <div className="flex justify-between">
                  <span>1 knot</span>
                  <span className="text-muted-foreground">1.852 km/h</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
