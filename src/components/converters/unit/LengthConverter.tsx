'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Ruler, ArrowRightLeft } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';
import { ConvertersEngine } from '@/lib/converters/conversion-engine';

const LENGTH_UNITS = {
  mm: 'Millimeters',
  cm: 'Centimeters', 
  m: 'Meters',
  km: 'Kilometers',
  in: 'Inches',
  ft: 'Feet',
  yd: 'Yards',
  mi: 'Miles'
};

export function LengthConverter() {
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
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
      const conversionResult = ConvertersEngine.convertUnits(numValue, fromUnit, toUnit, 'length');
      if (conversionResult.success && conversionResult.result !== undefined) {
        setResult(conversionResult.result);
        setError('');
      } else {
        setError(conversionResult.error || 'Conversion not supported');
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
      return `${value} ${LENGTH_UNITS[fromUnit as keyof typeof LENGTH_UNITS]} = ${formatResult(result)} ${LENGTH_UNITS[toUnit as keyof typeof LENGTH_UNITS]}`;
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
      <h2 className="sr-only">Length conversion tool</h2>
      {/* Conversion Interface */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Ruler className="h-5 w-5" />
            Length Converter
          </CardTitle>
          <CardDescription>
            Convert between different length units
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Value Input */}
          <div>
            <label htmlFor="length-value" className="block text-sm font-medium mb-2">Value</label>
            <Input
              id="length-value"
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
              <label htmlFor="length-from-unit" className="block text-sm font-medium mb-2">From Unit</label>
              <select
                id="length-from-unit"
                aria-label="From unit"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full p-3 border border-input rounded-md bg-background"
              >
                {Object.entries(LENGTH_UNITS).map(([key, name]) => (
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
                aria-label="Swap length units"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>

            <div>
              <label htmlFor="length-to-unit" className="block text-sm font-medium mb-2">To Unit</label>
              <select
                id="length-to-unit"
                aria-label="To unit"
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full p-3 border border-input rounded-md bg-background"
              >
                {Object.entries(LENGTH_UNITS).map(([key, name]) => (
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
                  {LENGTH_UNITS[toUnit as keyof typeof LENGTH_UNITS]}
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
              {value} {LENGTH_UNITS[fromUnit as keyof typeof LENGTH_UNITS]} = {formatResult(result)} {LENGTH_UNITS[toUnit as keyof typeof LENGTH_UNITS]}
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
          <CardTitle className="text-lg">Common Length Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Metric System</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>1 kilometer</span>
                  <span className="text-muted-foreground">1,000 meters</span>
                </div>
                <div className="flex justify-between">
                  <span>1 meter</span>
                  <span className="text-muted-foreground">100 centimeters</span>
                </div>
                <div className="flex justify-between">
                  <span>1 centimeter</span>
                  <span className="text-muted-foreground">10 millimeters</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Imperial System</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>1 mile</span>
                  <span className="text-muted-foreground">5,280 feet</span>
                </div>
                <div className="flex justify-between">
                  <span>1 yard</span>
                  <span className="text-muted-foreground">3 feet</span>
                </div>
                <div className="flex justify-between">
                  <span>1 foot</span>
                  <span className="text-muted-foreground">12 inches</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
