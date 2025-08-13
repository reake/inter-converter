'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EngineParameters } from '@/types/automotive';

interface EngineInputsProps {
  onValuesChange: (values: EngineParameters) => void;
  requiredFields: (keyof EngineParameters)[];
  units: 'metric' | 'imperial';
  showAdvanced?: boolean;
  values: EngineParameters;
}

export function EngineInputs({
  onValuesChange,
  requiredFields,
  units,
  showAdvanced = false,
  values
}: EngineInputsProps) {
  const handleInputChange = (field: keyof EngineParameters, value: string) => {
    const numericValue = parseFloat(value) || undefined;
    onValuesChange({
      ...values,
      [field]: numericValue
    });
  };

  const isRequired = (field: keyof EngineParameters) => requiredFields.includes(field);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Engine Parameters</CardTitle>
        <CardDescription>
          Enter the engine specifications below. Required fields are marked with an asterisk (*).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Displacement */}
          {(isRequired('displacement') || showAdvanced) && (
            <div className="space-y-2">
              <Label htmlFor="displacement">
                Engine Displacement {isRequired('displacement') && '*'}
                <span className="text-sm text-gray-500 ml-1">
                  ({units === 'imperial' ? 'cubic inches' : 'liters'})
                </span>
              </Label>
              <Input
                id="displacement"
                type="number"
                step="0.1"
                min="0"
                placeholder={units === 'imperial' ? 'e.g., 350' : 'e.g., 5.7'}
                value={values.displacement || ''}
                onChange={(e) => handleInputChange('displacement', e.target.value)}
              />
            </div>
          )}

          {/* Bore */}
          {(isRequired('bore') || showAdvanced) && (
            <div className="space-y-2">
              <Label htmlFor="bore">
                Bore Diameter {isRequired('bore') && '*'}
                <span className="text-sm text-gray-500 ml-1">
                  ({units === 'imperial' ? 'inches' : 'mm'})
                </span>
              </Label>
              <Input
                id="bore"
                type="number"
                step="0.01"
                min="0"
                placeholder={units === 'imperial' ? 'e.g., 4.00' : 'e.g., 101.6'}
                value={values.bore || ''}
                onChange={(e) => handleInputChange('bore', e.target.value)}
              />
            </div>
          )}

          {/* Stroke */}
          {(isRequired('stroke') || showAdvanced) && (
            <div className="space-y-2">
              <Label htmlFor="stroke">
                Stroke Length {isRequired('stroke') && '*'}
                <span className="text-sm text-gray-500 ml-1">
                  ({units === 'imperial' ? 'inches' : 'mm'})
                </span>
              </Label>
              <Input
                id="stroke"
                type="number"
                step="0.01"
                min="0"
                placeholder={units === 'imperial' ? 'e.g., 3.48' : 'e.g., 88.4'}
                value={values.stroke || ''}
                onChange={(e) => handleInputChange('stroke', e.target.value)}
              />
            </div>
          )}

          {/* Cylinders */}
          {(isRequired('cylinders') || showAdvanced) && (
            <div className="space-y-2">
              <Label htmlFor="cylinders">
                Number of Cylinders {isRequired('cylinders') && '*'}
              </Label>
              <Select
                value={values.cylinders?.toString() || ''}
                onValueChange={(value) => handleInputChange('cylinders', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select cylinders" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Cylinders</SelectItem>
                  <SelectItem value="4">4 Cylinders</SelectItem>
                  <SelectItem value="5">5 Cylinders</SelectItem>
                  <SelectItem value="6">6 Cylinders</SelectItem>
                  <SelectItem value="8">8 Cylinders (V8)</SelectItem>
                  <SelectItem value="10">10 Cylinders (V10)</SelectItem>
                  <SelectItem value="12">12 Cylinders (V12)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Compression Ratio */}
          {(isRequired('compressionRatio') || showAdvanced) && (
            <div className="space-y-2">
              <Label htmlFor="compressionRatio">
                Compression Ratio {isRequired('compressionRatio') && '*'}
                <span className="text-sm text-gray-500 ml-1">(e.g., 9.5:1)</span>
              </Label>
              <Input
                id="compressionRatio"
                type="number"
                step="0.1"
                min="6"
                max="20"
                placeholder="e.g., 9.5"
                value={values.compressionRatio || ''}
                onChange={(e) => handleInputChange('compressionRatio', e.target.value)}
              />
            </div>
          )}

          {/* Horsepower */}
          {(isRequired('horsepower') || showAdvanced) && (
            <div className="space-y-2">
              <Label htmlFor="horsepower">
                Horsepower {isRequired('horsepower') && '*'}
                <span className="text-sm text-gray-500 ml-1">(HP)</span>
              </Label>
              <Input
                id="horsepower"
                type="number"
                step="1"
                min="50"
                max="2000"
                placeholder="e.g., 300"
                value={values.horsepower || ''}
                onChange={(e) => handleInputChange('horsepower', e.target.value)}
              />
            </div>
          )}

          {/* Torque */}
          {(isRequired('torque') || showAdvanced) && (
            <div className="space-y-2">
              <Label htmlFor="torque">
                Torque {isRequired('torque') && '*'}
                <span className="text-sm text-gray-500 ml-1">(lb-ft)</span>
              </Label>
              <Input
                id="torque"
                type="number"
                step="1"
                min="50"
                max="1500"
                placeholder="e.g., 350"
                value={values.torque || ''}
                onChange={(e) => handleInputChange('torque', e.target.value)}
              />
            </div>
          )}

          {/* RPM */}
          {(isRequired('rpm') || showAdvanced) && (
            <div className="space-y-2">
              <Label htmlFor="rpm">
                RPM {isRequired('rpm') && '*'}
                <span className="text-sm text-gray-500 ml-1">(Revolutions per minute)</span>
              </Label>
              <Input
                id="rpm"
                type="number"
                step="100"
                min="500"
                max="10000"
                placeholder="e.g., 5500"
                value={values.rpm || ''}
                onChange={(e) => handleInputChange('rpm', e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Common Engine Presets */}
        <div className="pt-4 border-t">
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Common Engine Presets
          </Label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              onClick={() => onValuesChange({
                ...values,
                displacement: 350,
                bore: 4.00,
                stroke: 3.48,
                cylinders: 8,
                compressionRatio: 9.0
              })}
            >
              Chevy 350 SBC
            </button>
            <button
              type="button"
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              onClick={() => onValuesChange({
                ...values,
                displacement: 454,
                bore: 4.25,
                stroke: 4.00,
                cylinders: 8,
                compressionRatio: 8.5
              })}
            >
              Chevy 454 BBC
            </button>
            <button
              type="button"
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              onClick={() => onValuesChange({
                ...values,
                displacement: 302,
                bore: 4.00,
                stroke: 3.00,
                cylinders: 8,
                compressionRatio: 9.0
              })}
            >
              Ford 302
            </button>
            <button
              type="button"
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              onClick={() => onValuesChange({
                ...values,
                displacement: 455,
                bore: 4.15,
                stroke: 4.21,
                cylinders: 8,
                compressionRatio: 8.4
              })}
            >
              Pontiac 455
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}