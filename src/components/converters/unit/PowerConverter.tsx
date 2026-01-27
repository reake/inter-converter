'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightLeft, Zap } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

const POWER_UNITS = {
  w: { name: 'Watt (W)', factor: 1 },
  kw: { name: 'Kilowatt (kW)', factor: 1000 },
  hp: { name: 'Horsepower (HP)', factor: 745.7 },
  ps: { name: 'Metric Horsepower (PS)', factor: 735.5 },
  btu_h: { name: 'BTU/hour', factor: 0.293071 }
};

export function PowerConverter() {
  const [fromUnit, setFromUnit] = useState('hp');
  const [toUnit, setToUnit] = useState('kw');
  const [value, setValue] = useState('1');
  const [result, setResult] = useState<number | null>(null);

  const convertValue = useCallback(() => {
    if (!value || isNaN(parseFloat(value))) {
      setResult(null);
      return;
    }

    const numValue = parseFloat(value);
    const fromFactor = POWER_UNITS[fromUnit as keyof typeof POWER_UNITS].factor;
    const toFactor = POWER_UNITS[toUnit as keyof typeof POWER_UNITS].factor;
    
    const wattValue = numValue * fromFactor;
    const convertedValue = wattValue / toFactor;
    
    setResult(convertedValue);
  }, [value, fromUnit, toUnit]);

  useEffect(() => {
    convertValue();
  }, [convertValue]);

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Power Converter</h1>
        <p className="text-gray-600">Convert between watts, kilowatts, horsepower and other power units</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              From
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(POWER_UNITS).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter value"
                className="text-lg"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              To
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(POWER_UNITS).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary mb-2">
                  {result !== null ? result.toLocaleString(undefined, { maximumFractionDigits: 6 }) : '0'}
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {POWER_UNITS[toUnit as keyof typeof POWER_UNITS].name}
                </div>
                {result !== null && (
                  <CopyButton text={result.toString()} />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button onClick={swapUnits} variant="outline" size="sm">
          <ArrowRightLeft className="h-4 w-4 mr-2" />
          Swap Units
        </Button>
      </div>
    </div>
  );
}
