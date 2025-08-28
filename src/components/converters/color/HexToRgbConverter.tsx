'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Palette, ArrowRightLeft, Copy } from 'lucide-react';

export default function HexToRgbConverter() {
  const [hex, setHex] = useState<string>('#FF0000');
  const [rgb, setRgb] = useState<string>('255, 0, 0');
  const [error, setError] = useState<string>('');

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    // Remove # if present
    const cleanHex = hex.replace('#', '');
    
    // Validate hex format
    if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex) && !/^[0-9A-Fa-f]{3}$/.test(cleanHex)) {
      return null;
    }

    let r, g, b;

    if (cleanHex.length === 3) {
      // Convert 3-digit hex to 6-digit
      r = parseInt(cleanHex[0] + cleanHex[0], 16);
      g = parseInt(cleanHex[1] + cleanHex[1], 16);
      b = parseInt(cleanHex[2] + cleanHex[2], 16);
    } else {
      r = parseInt(cleanHex.substring(0, 2), 16);
      g = parseInt(cleanHex.substring(2, 4), 16);
      b = parseInt(cleanHex.substring(4, 6), 16);
    }

    return { r, g, b };
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    const toHex = (n: number) => {
      const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  };

  const handleHexChange = (value: string) => {
    setHex(value);
    setError('');
    
    const rgbValues = hexToRgb(value);
    if (rgbValues) {
      setRgb(`${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}`);
    } else if (value.trim() !== '') {
      setError('Invalid hex color format');
      setRgb('');
    } else {
      setRgb('');
    }
  };

  const handleRgbChange = (value: string) => {
    setRgb(value);
    setError('');
    
    // Parse RGB values
    const rgbMatch = value.match(/(\d+),\s*(\d+),\s*(\d+)/);
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1]);
      const g = parseInt(rgbMatch[2]);
      const b = parseInt(rgbMatch[3]);
      
      if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
        setHex(rgbToHex(r, g, b));
      } else {
        setError('RGB values must be between 0 and 255');
      }
    } else if (value.trim() !== '') {
      setError('Invalid RGB format (use: r, g, b)');
    }
  };

  const swapFormats = () => {
    // This doesn't make sense for hex/rgb, but we can reset to a new color
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    handleHexChange(randomColor);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    handleHexChange(hex);
  }, []);

  const getCurrentColor = () => {
    const rgbValues = hexToRgb(hex);
    return rgbValues ? `rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})` : '#000000';
  };

  const commonColors = [
    { name: 'Red', hex: '#FF0000', rgb: '255, 0, 0' },
    { name: 'Green', hex: '#00FF00', rgb: '0, 255, 0' },
    { name: 'Blue', hex: '#0000FF', rgb: '0, 0, 255' },
    { name: 'Yellow', hex: '#FFFF00', rgb: '255, 255, 0' },
    { name: 'Magenta', hex: '#FF00FF', rgb: '255, 0, 255' },
    { name: 'Cyan', hex: '#00FFFF', rgb: '0, 255, 255' },
    { name: 'Black', hex: '#000000', rgb: '0, 0, 0' },
    { name: 'White', hex: '#FFFFFF', rgb: '255, 255, 255' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Hex Color
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="text"
                value={hex}
                onChange={(e) => handleHexChange(e.target.value)}
                placeholder="#FF0000"
                className="text-lg font-mono"
              />
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div 
                  className="w-20 h-20 mx-auto rounded-lg border-2 border-gray-300 mb-2"
                  style={{ backgroundColor: getCurrentColor() }}
                ></div>
                <div className="text-lg font-bold text-gray-800">{hex}</div>
                <div className="text-sm text-gray-600">Hex Color</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              RGB Color
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="text"
                value={rgb}
                onChange={(e) => handleRgbChange(e.target.value)}
                placeholder="255, 0, 0"
                className="text-lg font-mono"
              />
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div 
                  className="w-20 h-20 mx-auto rounded-lg border-2 border-gray-300 mb-2"
                  style={{ backgroundColor: getCurrentColor() }}
                ></div>
                <div className="text-lg font-bold text-gray-800">rgb({rgb})</div>
                <div className="text-sm text-gray-600">RGB Color</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
          {error}
        </div>
      )}

      <div className="mt-6 flex justify-center gap-4">
        <Button onClick={swapFormats} variant="outline" className="flex items-center gap-2">
          <ArrowRightLeft className="h-4 w-4" />
          Random Color
        </Button>
        <Button onClick={() => copyToClipboard(hex)} variant="outline" className="flex items-center gap-2">
          <Copy className="h-4 w-4" />
          Copy Hex
        </Button>
        <Button onClick={() => copyToClipboard(`rgb(${rgb})`)} variant="outline" className="flex items-center gap-2">
          <Copy className="h-4 w-4" />
          Copy RGB
        </Button>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Color Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-gray-600">Hex Format</div>
              <div className="text-xl font-bold text-blue-600 font-mono">{hex}</div>
              <div className="text-xs text-gray-500">Hexadecimal</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-gray-600">RGB Format</div>
              <div className="text-xl font-bold text-green-600 font-mono">rgb({rgb})</div>
              <div className="text-xs text-gray-500">Red, Green, Blue</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Common Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {commonColors.map((color, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => handleHexChange(color.hex)}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded border-2 border-gray-300"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <div className="font-medium">{color.name}</div>
                </div>
                <div className="flex gap-6 text-right text-sm">
                  <div>
                    <div className="text-blue-600 font-bold font-mono">{color.hex}</div>
                  </div>
                  <div>
                    <div className="text-green-600 font-bold font-mono">rgb({color.rgb})</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Conversion Information</h3>
        <div className="text-sm text-blue-700 space-y-1">
          <div>• Hex colors use base-16 notation (0-9, A-F)</div>
          <div>• RGB values range from 0 to 255 for each color channel</div>
          <div>• Format: #RRGGBB (Red, Green, Blue in hexadecimal)</div>
          <div>• Short format: #RGB expands to #RRGGBB</div>
        </div>
      </div>
    </div>
  );
}
