'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Palette, Eye } from 'lucide-react';
import { ConversionEngine } from '@/lib/converters/conversion-engine';

interface ColorValues {
  hex: string;
  rgb: string;
  hsl: string;
  r: number;
  g: number;
  b: number;
  h: number;
  s: number;
  l: number;
}

const PRESET_COLORS = [
  { name: 'Red', hex: '#FF0000' },
  { name: 'Green', hex: '#00FF00' },
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Yellow', hex: '#FFFF00' },
  { name: 'Cyan', hex: '#00FFFF' },
  { name: 'Magenta', hex: '#FF00FF' },
  { name: 'Orange', hex: '#FFA500' },
  { name: 'Purple', hex: '#800080' },
  { name: 'Pink', hex: '#FFC0CB' },
  { name: 'Brown', hex: '#A52A2A' },
  { name: 'Gray', hex: '#808080' },
  { name: 'Black', hex: '#000000' },
];

export function ColorConverter() {
  const [hexInput, setHexInput] = useState('#FF0000');
  const [rgbInput, setRgbInput] = useState('255, 0, 0');
  const [colorValues, setColorValues] = useState<ColorValues | null>(null);
  const [error, setError] = useState('');
  const [activeInput, setActiveInput] = useState<'hex' | 'rgb'>('hex');

  useEffect(() => {
    if (activeInput === 'hex') {
      convertFromHex(hexInput);
    } else {
      convertFromRgb(rgbInput);
    }
  }, [hexInput, rgbInput, activeInput]);

  const convertFromHex = (hex: string) => {
    const result = ConversionEngine.convertColor(hex, 'hex', 'rgb');
    if (result.success && result.result) {
      const rgbMatch = result.result.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (rgbMatch) {
        const r = parseInt(rgbMatch[1]);
        const g = parseInt(rgbMatch[2]);
        const b = parseInt(rgbMatch[3]);
        
        const hsl = rgbToHsl(r, g, b);
        
        setColorValues({
          hex: hex.toUpperCase(),
          rgb: result.result,
          hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
          r, g, b,
          h: hsl.h,
          s: hsl.s,
          l: hsl.l
        });
        setError('');
        
        // Update RGB input if converting from HEX
        if (activeInput === 'hex') {
          setRgbInput(`${r}, ${g}, ${b}`);
        }
      }
    } else {
      setError(result.error || 'Invalid color format');
      setColorValues(null);
    }
  };

  const convertFromRgb = (rgb: string) => {
    // Parse RGB input (support various formats)
    let r: number, g: number, b: number;
    
    if (rgb.includes('rgb(')) {
      const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (match) {
        r = parseInt(match[1]);
        g = parseInt(match[2]);
        b = parseInt(match[3]);
      } else {
        setError('Invalid RGB format');
        return;
      }
    } else {
      const parts = rgb.split(',').map(part => parseInt(part.trim()));
      if (parts.length === 3 && parts.every(part => !isNaN(part))) {
        [r, g, b] = parts;
      } else {
        setError('Invalid RGB format');
        return;
      }
    }

    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
      setError('RGB values must be between 0 and 255');
      return;
    }

    const result = ConversionEngine.convertColor(`rgb(${r}, ${g}, ${b})`, 'rgb', 'hex');
    if (result.success && result.result) {
      const hsl = rgbToHsl(r, g, b);
      
      setColorValues({
        hex: result.result,
        rgb: `rgb(${r}, ${g}, ${b})`,
        hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
        r, g, b,
        h: hsl.h,
        s: hsl.s,
        l: hsl.l
      });
      setError('');
      
      // Update HEX input if converting from RGB
      if (activeInput === 'rgb') {
        setHexInput(result.result);
      }
    } else {
      setError(result.error || 'Invalid RGB values');
      setColorValues(null);
    }
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h: number, s: number, l: number;

    l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const setPresetColor = (hex: string) => {
    setHexInput(hex);
    setActiveInput('hex');
  };

  const generateRandomColor = () => {
    const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
    setHexInput(randomHex);
    setActiveInput('hex');
  };

  return (
    <div className="space-y-6">
      {/* Color Input */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Color Input
          </CardTitle>
          <CardDescription>
            Enter a color in HEX or RGB format
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">HEX Color</label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={hexInput}
                  onChange={(e) => {
                    setHexInput(e.target.value);
                    setActiveInput('hex');
                  }}
                  placeholder="#FF0000"
                  className="font-mono"
                />
                <input
                  type="color"
                  value={colorValues?.hex || '#FF0000'}
                  onChange={(e) => {
                    setHexInput(e.target.value);
                    setActiveInput('hex');
                  }}
                  className="w-12 h-10 border border-input rounded cursor-pointer"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">RGB Values</label>
              <Input
                type="text"
                value={rgbInput}
                onChange={(e) => {
                  setRgbInput(e.target.value);
                  setActiveInput('rgb');
                }}
                placeholder="255, 0, 0"
                className="font-mono"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={generateRandomColor} variant="outline" size="sm">
              Random Color
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Color Preview */}
      {colorValues && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Color Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Large Color Preview */}
            <div 
              className="w-full h-32 rounded-lg border-2 border-border"
              style={{ backgroundColor: colorValues.hex }}
            />

            {/* Color Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm font-medium mb-1">HEX</div>
                <div className="flex items-center justify-between">
                  <code className="text-lg font-mono">{colorValues.hex}</code>
                  <Button
                    onClick={() => copyToClipboard(colorValues.hex)}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm font-medium mb-1">RGB</div>
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono">{colorValues.rgb}</code>
                  <Button
                    onClick={() => copyToClipboard(colorValues.rgb)}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm font-medium mb-1">HSL</div>
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono">{colorValues.hsl}</code>
                  <Button
                    onClick={() => copyToClipboard(colorValues.hsl)}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Individual Values */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-sm">
              <div className="text-center p-2 bg-red-50 dark:bg-red-950 rounded">
                <div className="font-medium text-red-600 dark:text-red-400">R</div>
                <div>{colorValues.r}</div>
              </div>
              <div className="text-center p-2 bg-green-50 dark:bg-green-950 rounded">
                <div className="font-medium text-green-600 dark:text-green-400">G</div>
                <div>{colorValues.g}</div>
              </div>
              <div className="text-center p-2 bg-blue-50 dark:bg-blue-950 rounded">
                <div className="font-medium text-blue-600 dark:text-blue-400">B</div>
                <div>{colorValues.b}</div>
              </div>
              <div className="text-center p-2 bg-purple-50 dark:bg-purple-950 rounded">
                <div className="font-medium text-purple-600 dark:text-purple-400">H</div>
                <div>{colorValues.h}°</div>
              </div>
              <div className="text-center p-2 bg-orange-50 dark:bg-orange-950 rounded">
                <div className="font-medium text-orange-600 dark:text-orange-400">S</div>
                <div>{colorValues.s}%</div>
              </div>
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-950 rounded">
                <div className="font-medium text-gray-600 dark:text-gray-400">L</div>
                <div>{colorValues.l}%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="text-destructive text-sm">{error}</div>
          </CardContent>
        </Card>
      )}

      {/* Preset Colors */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Preset Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
            {PRESET_COLORS.map((color) => (
              <button
                key={color.name}
                onClick={() => setPresetColor(color.hex)}
                className="aspect-square rounded-lg border-2 border-border hover:border-primary transition-colors relative group"
                style={{ backgroundColor: color.hex }}
                title={`${color.name} (${color.hex})`}
              >
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all" />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Color Formats Guide */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Color Format Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-3">HEX Format</h4>
              <div className="space-y-2 text-sm font-mono">
                <div>#FF0000 (Red)</div>
                <div>#00FF00 (Green)</div>
                <div>#0000FF (Blue)</div>
                <div>#FFFFFF (White)</div>
                <div>#000000 (Black)</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">RGB Format</h4>
              <div className="space-y-2 text-sm font-mono">
                <div>rgb(255, 0, 0)</div>
                <div>rgb(0, 255, 0)</div>
                <div>rgb(0, 0, 255)</div>
                <div>255, 255, 255</div>
                <div>0, 0, 0</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">HSL Format</h4>
              <div className="space-y-2 text-sm font-mono">
                <div>hsl(0, 100%, 50%)</div>
                <div>hsl(120, 100%, 50%)</div>
                <div>hsl(240, 100%, 50%)</div>
                <div>hsl(0, 0%, 100%)</div>
                <div>hsl(0, 0%, 0%)</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}