'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { HelpCircleIcon, BookOpenIcon, LightbulbIcon, LinkIcon } from 'lucide-react';

interface EducationalTooltipProps {
  term: string;
  definition: string;
  examples?: string[];
  relatedTerms?: string[];
  position?: 'top' | 'bottom' | 'left' | 'right';
  triggerText?: string;
  showIcon?: boolean;
}

export function EducationalTooltip({
  term,
  definition,
  examples = [],
  relatedTerms = [],
  position = 'top',
  triggerText,
  showIcon = true
}: EducationalTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-auto p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
        >
          {showIcon && <HelpCircleIcon className="h-4 w-4" />}
          {triggerText && <span className="ml-1 text-sm">{triggerText}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0" 
        side={position}
        align="start"
      >
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpenIcon className="h-5 w-5 text-blue-600" />
              {term}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Definition */}
            <div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {definition}
              </p>
            </div>

            {/* Examples */}
            {examples.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <LightbulbIcon className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium text-gray-800">Examples</span>
                </div>
                <ul className="space-y-1">
                  {examples.map((example, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-yellow-500 mt-0.5">•</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Terms */}
            {relatedTerms.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <LinkIcon className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-800">Related Terms</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {relatedTerms.map((relatedTerm, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {relatedTerm}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}

// Predefined automotive terms for common use
export const automotiveTerms = {
  cfm: {
    term: 'CFM (Cubic Feet per Minute)',
    definition: 'A measurement of airflow volume that indicates how much air a carburetor can flow. Higher CFM ratings generally support more horsepower, but oversized carburetors can hurt performance.',
    examples: [
      'A 350 cubic inch engine typically needs 600-650 CFM',
      'Street engines use lower CFM than race engines',
      'Too much CFM can cause poor throttle response'
    ],
    relatedTerms: ['Carburetor', 'Airflow', 'Venturi', 'Throttle Body']
  },
  compressionRatio: {
    term: 'Compression Ratio',
    definition: 'The ratio of the cylinder volume when the piston is at the bottom of its stroke to the volume when the piston is at the top. Higher compression ratios generally produce more power but require higher octane fuel.',
    examples: [
      '9:1 compression is common for pump gas engines',
      '12:1+ compression typically requires race fuel',
      'Lower compression reduces power but improves fuel economy'
    ],
    relatedTerms: ['Octane Rating', 'Detonation', 'Combustion Chamber', 'Piston']
  },
  gearRatio: {
    term: 'Gear Ratio',
    definition: 'The ratio between the number of teeth on the ring gear and pinion gear in a differential. Higher ratios provide better acceleration but lower top speed and worse fuel economy.',
    examples: [
      '3.73:1 is good for balanced street performance',
      '4.10:1+ ratios are better for drag racing',
      '3.08:1 ratios are better for highway cruising'
    ],
    relatedTerms: ['Final Drive', 'Differential', 'Ring Gear', 'Pinion Gear']
  },
  volumetricEfficiency: {
    term: 'Volumetric Efficiency (VE)',
    definition: 'A measure of how effectively an engine can move air and fuel into and out of its cylinders. 100% VE means the engine fills its cylinders completely with the air/fuel mixture.',
    examples: [
      'Stock engines typically achieve 70-85% VE',
      'Well-tuned performance engines can exceed 100% VE',
      'Forced induction can achieve VE over 150%'
    ],
    relatedTerms: ['Airflow', 'Intake Manifold', 'Exhaust System', 'Camshaft']
  },
  powerToWeight: {
    term: 'Power-to-Weight Ratio',
    definition: 'The ratio of engine power to vehicle weight, typically expressed as horsepower per pound or pounds per horsepower. Lower weight per horsepower means better acceleration performance.',
    examples: [
      'Economy cars: 15-20 lbs/hp',
      'Sports cars: 8-12 lbs/hp',
      'Supercars: 5-8 lbs/hp',
      'Top fuel dragsters: 2-3 lbs/hp'
    ],
    relatedTerms: ['Horsepower', 'Vehicle Weight', 'Acceleration', 'Performance']
  }
};

// Helper component for common automotive terms
interface AutoTermTooltipProps {
  termKey: keyof typeof automotiveTerms;
  triggerText?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function AutoTermTooltip({ 
  termKey, 
  triggerText, 
  position = 'top' 
}: AutoTermTooltipProps) {
  const termData = automotiveTerms[termKey];
  
  return (
    <EducationalTooltip
      term={termData.term}
      definition={termData.definition}
      examples={termData.examples}
      relatedTerms={termData.relatedTerms}
      triggerText={triggerText}
      position={position}
    />
  );
}