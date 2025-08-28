'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Palette, Shuffle, Download } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

type ColorScheme = 'monochromatic' | 'analogous' | 'complementary' | 'triadic' | 'tetradic' | 'split-complementary';

export function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState('#3b82f6');
  const [scheme, setScheme] = useState<ColorScheme>('complementary');
  const [palette, setPalette] = useState<string[]>([]);

  useEffect(() => {
    generatePalette();
  }, [baseColor, scheme]);

  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  const hslToHex = (h: number, s: number, l: number) => {
    h = h / 360;
    s = s / 100;
    l = l / 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = (n: number) => {
      const hex = Math.round(n * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  };

  const generatePalette = () => {
    const { h, s, l } = hexToHsl(baseColor);
    let colors: string[] = [baseColor];

    switch (scheme) {
      case 'monochromatic':
        colors = [
          hslToHex(h, s, Math.max(10, l - 30)),
          hslToHex(h, s, Math.max(20, l - 15)),
          baseColor,
          hslToHex(h, s, Math.min(85, l + 15)),
          hslToHex(h, s, Math.min(95, l + 30))
        ];
        break;

      case 'analogous':
        colors = [
          hslToHex((h - 30 + 360) % 360, s, l),
          hslToHex((h - 15 + 360) % 360, s, l),
          baseColor,
          hslToHex((h + 15) % 360, s, l),
          hslToHex((h + 30) % 360, s, l)
        ];
        break;

      case 'complementary':
        colors = [
          hslToHex(h, s, Math.max(20, l - 20)),
          baseColor,
          hslToHex((h + 180) % 360, s, l),
          hslToHex((h + 180) % 360, s, Math.max(20, l - 20)),
          hslToHex((h + 180) % 360, s, Math.min(80, l + 20))
        ];
        break;

      case 'triadic':
        colors = [
          baseColor,
          hslToHex((h + 120) % 360, s, l),
          hslToHex((h + 240) % 360, s, l),
          hslToHex(h, Math.max(20, s - 20), l),
          hslToHex(h, Math.min(100, s + 20), l)
        ];
        break;

      case 'tetradic':
        colors = [
          baseColor,
          hslToHex((h + 90) % 360, s, l),
          hslToHex((h + 180) % 360, s, l),
          hslToHex((h + 270) % 360, s, l),
          hslToHex(h, s, Math.min(80, l + 20))
        ];
        break;

      case 'split-complementary':
        colors = [
          baseColor,
          hslToHex((h + 150) % 360, s, l),
          hslToHex((h + 210) % 360, s, l),
          hslToHex(h, Math.max(30, s - 20), l),
          hslToHex(h, Math.min(90, s + 10), Math.min(80, l + 15))
        ];
        break;
    }

    setPalette(colors);
  };

  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setBaseColor(randomColor.toUpperCase());
  };

  const exportPalette = () => {
    const paletteData = {
      baseColor,
      scheme,
      colors: palette,
      css: palette.map((color, index) => `--color-${index + 1}: ${color};`).join('\n')
    };
    
    const blob = new Blob([JSON.stringify(paletteData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `color-palette-${scheme}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const schemeDescriptions = {
    monochromatic: 'Uses variations in lightness and saturation of a single color',
    analogous: 'Uses colors that are next to each other on the color wheel',
    complementary: 'Uses colors opposite each other on the color wheel',
    triadic: 'Uses three colors equally spaced around the color wheel',
    tetradic: 'Uses four colors arranged into two complementary pairs',
    'split-complementary': 'Uses a base color and two colors adjacent to its complement'
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Color Palette Generator</h1>
        <p className="text-gray-600">Generate harmonious color palettes using color theory principles</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Base Color</label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-16 h-10 p-1 border rounded"
                />
                <Input
                  type="text"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="flex-1 font-mono"
                  placeholder="#3b82f6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Color Scheme</label>
              <Select value={scheme} onValueChange={(value: ColorScheme) => setScheme(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monochromatic">Monochromatic</SelectItem>
                  <SelectItem value="analogous">Analogous</SelectItem>
                  <SelectItem value="complementary">Complementary</SelectItem>
                  <SelectItem value="triadic">Triadic</SelectItem>
                  <SelectItem value="tetradic">Tetradic</SelectItem>
                  <SelectItem value="split-complementary">Split Complementary</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                {schemeDescriptions[scheme]}
              </p>
            </div>

            <div className="space-y-2">
              <Button onClick={generateRandomColor} variant="outline" className="w-full">
                <Shuffle className="h-4 w-4 mr-2" />
                Random Base Color
              </Button>
              
              <Button onClick={exportPalette} variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export Palette
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Generated Palette</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4 mb-6">
              {palette.map((color, index) => (
                <div key={index} className="space-y-2">
                  <div 
                    className="w-full h-24 rounded-lg border-2 border-border cursor-pointer hover:border-primary transition-colors"
                    style={{ backgroundColor: color }}
                    onClick={() => setBaseColor(color)}
                  />
                  <div className="text-center">
                    <div className="font-mono text-sm">{color}</div>
                    <CopyButton text={color} size="sm" className="mt-1" />
                  </div>
                </div>
              ))}
            </div>

            {/* CSS Variables */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2">CSS Variables</h4>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                {palette.map((color, index) => (
                  <div key={index}>--color-{index + 1}: {color};</div>
                ))}
              </div>
              <CopyButton 
                text={palette.map((color, index) => `--color-${index + 1}: ${color};`).join('\n')}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
