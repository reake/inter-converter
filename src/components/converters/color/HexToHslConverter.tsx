'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Palette } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

export default function HexToHslConverter() {
  const [hexValue, setHexValue] = useState('#3b82f6');
  const [hslValue, setHslValue] = useState({ h: 0, s: 0, l: 0 });
  const [error, setError] = useState('');

  const hexToHsl = (hex: string) => {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse r, g, b values
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  useEffect(() => {
    try {
      setError('');
      
      // Validate hex format
      const hexRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      if (!hexRegex.test(hexValue)) {
        setError('Please enter a valid HEX color code');
        return;
      }

      let normalizedHex = hexValue.replace('#', '');
      
      // Convert 3-digit hex to 6-digit
      if (normalizedHex.length === 3) {
        normalizedHex = normalizedHex.split('').map((char) => char + char).join('');
      }

      const hsl = hexToHsl(normalizedHex);
      setHslValue(hsl);
    } catch {
      setError('Invalid HEX color format');
    }
  }, [hexValue]);

  const handleHexChange = (value: string) => {
    if (!value.startsWith('#')) {
      value = '#' + value;
    }
    setHexValue(value);
  };

  const hslString = `hsl(${hslValue.h}, ${hslValue.s}%, ${hslValue.l}%)`;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">HEX to HSL Converter</h1>
        <p className="text-gray-600">Convert HEX color codes to HSL (Hue, Saturation, Lightness) values</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              HEX Color
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="text"
                value={hexValue}
                onChange={(e) => handleHexChange(e.target.value)}
                placeholder="#3b82f6"
                className="text-lg font-mono"
              />
              
              <div 
                className="w-full h-20 rounded-lg border-2 border-gray-200"
                style={{ backgroundColor: hexValue }}
              />
              
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              HSL Values
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-muted rounded">
                  <div className="text-sm text-muted-foreground">Hue</div>
                  <div className="text-xl font-bold">{hslValue.h}°</div>
                </div>
                <div className="text-center p-3 bg-muted rounded">
                  <div className="text-sm text-muted-foreground">Saturation</div>
                  <div className="text-xl font-bold">{hslValue.s}%</div>
                </div>
                <div className="text-center p-3 bg-muted rounded">
                  <div className="text-sm text-muted-foreground">Lightness</div>
                  <div className="text-xl font-bold">{hslValue.l}%</div>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">HSL String</div>
                <div className="font-mono text-lg mb-2">{hslString}</div>
                <CopyButton text={hslString} />
              </div>

              <div 
                className="w-full h-20 rounded-lg border-2 border-gray-200"
                style={{ backgroundColor: hslString }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Color Information */}
      <Card>
        <CardHeader>
          <CardTitle>About HSL Color Model</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Hue (0-360°)</h4>
              <p className="text-muted-foreground">The color type on the color wheel. 0° is red, 120° is green, 240° is blue.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Saturation (0-100%)</h4>
              <p className="text-muted-foreground">The intensity of the color. 0% is gray, 100% is full color.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Lightness (0-100%)</h4>
              <p className="text-muted-foreground">The brightness of the color. 0% is black, 50% is normal, 100% is white.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
