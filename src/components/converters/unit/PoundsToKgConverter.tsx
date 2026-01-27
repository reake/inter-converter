'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Scale, ArrowRightLeft } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

export default function PoundsToKgConverter() {
  const [pounds, setPounds] = useState<string>('1');
  const [kilograms, setKilograms] = useState<string>('0.45');

  const convertPoundsToKg = (lbs: number): number => {
    return lbs * 0.45359237;
  };

  const convertKgToPounds = (kg: number): number => {
    return kg / 0.45359237;
  };

  const handlePoundsChange = (value: string) => {
    setPounds(value);
    const lbs = parseFloat(value);
    if (!isNaN(lbs)) {
      const kg = convertPoundsToKg(lbs);
      setKilograms(kg.toFixed(4));
      
    } else {
      setKilograms('');
    }
  };

  const handleKilogramsChange = (value: string) => {
    setKilograms(value);
    const kg = parseFloat(value);
    if (!isNaN(kg)) {
      const lbs = convertKgToPounds(kg);
      setPounds(lbs.toFixed(4));
      
    } else {
      setPounds('');
    }
  };

  const swapUnits = () => {
    const temp = pounds;
    setPounds(kilograms);
    setKilograms(temp);
  };

  const getResultText = () => {
    if (pounds && kilograms) {
      return `${pounds} lbs = ${kilograms} kg`;
    }
    return '';
  };

  const formatResult = (value: number) => {
    return parseFloat(value.toFixed(4)).toString();
  };

  return (
    <div className="space-y-6">
      {/* Conversion Interface */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Pounds to Kilograms Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Value Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Weight Value</label>
            <Input
              type="number"
              value={pounds}
              onChange={(e) => handlePoundsChange(e.target.value)}
              placeholder="Enter pounds"
              className="text-lg"
              step="any"
            />
          </div>

          {/* Unit Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium mb-2">Pounds (lbs)</label>
              <Input
                type="number"
                value={pounds}
                onChange={(e) => handlePoundsChange(e.target.value)}
                placeholder="Enter pounds"
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
              <label className="block text-sm font-medium mb-2">Kilograms (kg)</label>
              <Input
                type="number"
                value={kilograms}
                onChange={(e) => handleKilogramsChange(e.target.value)}
                placeholder="Enter kilograms"
                className="text-lg"
                step="any"
              />
            </div>
          </div>

          {/* Result */}
          {pounds && kilograms && (
            <div className="p-6 bg-muted rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  {formatResult(parseFloat(kilograms))} kg
                </div>
                <div className="text-muted-foreground mb-4">
                  = {formatResult(parseFloat(pounds))} lbs
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
          {pounds && kilograms && (
            <div className="text-center text-sm text-muted-foreground">
              {formatResult(parseFloat(pounds))} lbs = {formatResult(parseFloat(kilograms))} kg
            </div>
          )}

        </CardContent>
      </Card>

      {/* Conversion Reference */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Common Weight Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Common Weights</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>1 pound</span>
                  <span className="text-muted-foreground">0.45 kg</span>
                </div>
                <div className="flex justify-between">
                  <span>10 pounds</span>
                  <span className="text-muted-foreground">4.54 kg</span>
                </div>
                <div className="flex justify-between">
                  <span>50 pounds</span>
                  <span className="text-muted-foreground">22.68 kg</span>
                </div>
                <div className="flex justify-between">
                  <span>100 pounds</span>
                  <span className="text-muted-foreground">45.36 kg</span>
                </div>
                <div className="flex justify-between">
                  <span>150 pounds</span>
                  <span className="text-muted-foreground">68.04 kg</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Conversion Formula</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <div className="font-medium">Pounds to Kilograms</div>
                  <div className="text-muted-foreground">kg = lbs × 0.45359237</div>
                </div>
                <div>
                  <div className="font-medium">Kilograms to Pounds</div>
                  <div className="text-muted-foreground">lbs = kg ÷ 0.45359237</div>
                </div>
                <div>
                  <div className="font-medium">Quick Approximation</div>
                  <div className="text-muted-foreground">kg ≈ lbs ÷ 2.2</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
