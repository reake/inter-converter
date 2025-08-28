'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Palette, Copy, Shuffle } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

const GRADIENT_DIRECTIONS = {
  'to right': 'Left to Right',
  'to left': 'Right to Left',
  'to bottom': 'Top to Bottom',
  'to top': 'Bottom to Top',
  'to bottom right': 'Top-Left to Bottom-Right',
  'to bottom left': 'Top-Right to Bottom-Left',
  'to top right': 'Bottom-Left to Top-Right',
  'to top left': 'Bottom-Right to Top-Left'
};

export function GradientGenerator() {
  const [color1, setColor1] = useState('#3b82f6');
  const [color2, setColor2] = useState('#8b5cf6');
  const [direction, setDirection] = useState('to right');
  const [cssCode, setCssCode] = useState('');

  useEffect(() => {
    generateCSS();
  }, [color1, color2, direction]);

  const generateCSS = () => {
    const css = `background: linear-gradient(${direction}, ${color1}, ${color2});`;
    setCssCode(css);
  };

  const generateRandomGradient = () => {
    const randomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    
    setColor1(randomColor());
    setColor2(randomColor());
    
    const directions = Object.keys(GRADIENT_DIRECTIONS);
    setDirection(directions[Math.floor(Math.random() * directions.length)]);
  };

  const gradientStyle = {
    background: `linear-gradient(${direction}, ${color1}, ${color2})`
  };

  const presetGradients = [
    { name: 'Ocean Blue', colors: ['#667eea', '#764ba2'] },
    { name: 'Sunset', colors: ['#ff7e5f', '#feb47b'] },
    { name: 'Purple Rain', colors: ['#667eea', '#764ba2'] },
    { name: 'Green Tea', colors: ['#11998e', '#38ef7d'] },
    { name: 'Pink Dream', colors: ['#ff9a9e', '#fecfef'] },
    { name: 'Fire', colors: ['#ff416c', '#ff4b2b'] }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gradient Generator</h1>
        <p className="text-gray-600">Create beautiful CSS gradients with live preview and copy functionality</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Gradient Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Start Color</label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    type="text"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="flex-1 font-mono"
                    placeholder="#3b82f6"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">End Color</label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    type="text"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="flex-1 font-mono"
                    placeholder="#8b5cf6"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Direction</label>
              <Select value={direction} onValueChange={setDirection}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(GRADIENT_DIRECTIONS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">CSS Code</label>
              <div className="relative">
                <textarea
                  value={cssCode}
                  readOnly
                  className="w-full p-3 border rounded-lg font-mono text-sm bg-muted resize-none"
                  rows={2}
                />
                <div className="absolute top-2 right-2">
                  <CopyButton text={cssCode} size="sm" />
                </div>
              </div>
            </div>

            <Button onClick={generateRandomGradient} variant="outline" className="w-full">
              <Shuffle className="h-4 w-4 mr-2" />
              Random Gradient
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="w-full h-48 rounded-lg border-2 border-border"
              style={gradientStyle}
            />
            
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-muted rounded">
                <div className="font-semibold">Start Color</div>
                <div className="font-mono">{color1}</div>
              </div>
              <div className="p-3 bg-muted rounded">
                <div className="font-semibold">End Color</div>
                <div className="font-mono">{color2}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preset Gradients */}
      <Card>
        <CardHeader>
          <CardTitle>Preset Gradients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {presetGradients.map((preset, index) => (
              <div
                key={index}
                className="cursor-pointer group"
                onClick={() => {
                  setColor1(preset.colors[0]);
                  setColor2(preset.colors[1]);
                }}
              >
                <div 
                  className="w-full h-20 rounded-lg border-2 border-border group-hover:border-primary transition-colors"
                  style={{
                    background: `linear-gradient(${direction}, ${preset.colors[0]}, ${preset.colors[1]})`
                  }}
                />
                <div className="text-center text-sm mt-2 font-medium">
                  {preset.name}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
