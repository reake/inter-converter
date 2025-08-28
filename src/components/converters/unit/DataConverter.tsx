'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightLeft, HardDrive } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

const DATA_UNITS = {
  b: { name: 'Byte (B)', factor: 1 },
  kb: { name: 'Kilobyte (KB)', factor: 1024 },
  mb: { name: 'Megabyte (MB)', factor: 1024 * 1024 },
  gb: { name: 'Gigabyte (GB)', factor: 1024 * 1024 * 1024 },
  tb: { name: 'Terabyte (TB)', factor: 1024 * 1024 * 1024 * 1024 },
  pb: { name: 'Petabyte (PB)', factor: 1024 * 1024 * 1024 * 1024 * 1024 }
};

export function DataConverter() {
  const [fromUnit, setFromUnit] = useState('gb');
  const [toUnit, setToUnit] = useState('mb');
  const [value, setValue] = useState('1');
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    convertValue();
  }, [value, fromUnit, toUnit]);

  const convertValue = () => {
    if (!value || isNaN(parseFloat(value))) {
      setResult(null);
      return;
    }

    const numValue = parseFloat(value);
    const fromFactor = DATA_UNITS[fromUnit as keyof typeof DATA_UNITS].factor;
    const toFactor = DATA_UNITS[toUnit as keyof typeof DATA_UNITS].factor;
    
    const byteValue = numValue * fromFactor;
    const convertedValue = byteValue / toFactor;
    
    setResult(convertedValue);
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Storage Converter</h1>
        <p className="text-gray-600">Convert between KB, MB, GB, TB and other data storage units</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5" />
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
                  {Object.entries(DATA_UNITS).map(([key, unit]) => (
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
              <HardDrive className="h-5 w-5" />
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
                  {Object.entries(DATA_UNITS).map(([key, unit]) => (
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
                  {DATA_UNITS[toUnit as keyof typeof DATA_UNITS].name}
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

      {/* Common Conversions */}
      <Card>
        <CardHeader>
          <CardTitle>Common Data Storage Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-3 bg-muted rounded">
              <div className="font-semibold">1 GB</div>
              <div className="text-muted-foreground">= 1,024 MB</div>
            </div>
            <div className="text-center p-3 bg-muted rounded">
              <div className="font-semibold">1 TB</div>
              <div className="text-muted-foreground">= 1,024 GB</div>
            </div>
            <div className="text-center p-3 bg-muted rounded">
              <div className="font-semibold">1 MB</div>
              <div className="text-muted-foreground">= 1,024 KB</div>
            </div>
            <div className="text-center p-3 bg-muted rounded">
              <div className="font-semibold">1 KB</div>
              <div className="text-muted-foreground">= 1,024 B</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
