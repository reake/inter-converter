'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/ui/CopyButton';
import { Palette, Eye, Shuffle } from 'lucide-react';

export default function RgbToHexConverter() {
  const [red, setRed] = useState<string>('255');
  const [green, setGreen] = useState<string>('0');
  const [blue, setBlue] = useState<string>('0');
  const [hex, setHex] = useState<string>('#FF0000');

  const rgbToHex = (r: number, g: number, b: number): string => {
    const toHex = (n: number) => {
      const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  };

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const handleRgbChange = (r: string, g: string, b: string) => {
    setRed(r);
    setGreen(g);
    setBlue(b);
    
    const rVal = parseInt(r) || 0;
    const gVal = parseInt(g) || 0;
    const bVal = parseInt(b) || 0;
    
    if (rVal >= 0 && rVal <= 255 && gVal >= 0 && gVal <= 255 && bVal >= 0 && bVal <= 255) {
      const hexValue = rgbToHex(rVal, gVal, bVal);
      setHex(hexValue);
    }
  };

  const handleHexChange = (hexValue: string) => {
    setHex(hexValue);
    const rgb = hexToRgb(hexValue);
    if (rgb) {
      setRed(rgb.r.toString());
      setGreen(rgb.g.toString());
      setBlue(rgb.b.toString());
    }
  };

  const commonColors = [
    { name: 'Red', rgb: '255, 0, 0', hex: '#FF0000' },
    { name: 'Green', rgb: '0, 128, 0', hex: '#008000' },
    { name: 'Blue', rgb: '0, 0, 255', hex: '#0000FF' },
    { name: 'Yellow', rgb: '255, 255, 0', hex: '#FFFF00' },
    { name: 'Cyan', rgb: '0, 255, 255', hex: '#00FFFF' },
    { name: 'Magenta', rgb: '255, 0, 255', hex: '#FF00FF' },
    { name: 'Black', rgb: '0, 0, 0', hex: '#000000' },
    { name: 'White', rgb: '255, 255, 255', hex: '#FFFFFF' },
    { name: 'Gray', rgb: '128, 128, 128', hex: '#808080' },
    { name: 'Orange', rgb: '255, 165, 0', hex: '#FFA500' },
    { name: 'Purple', rgb: '128, 0, 128', hex: '#800080' },
    { name: 'Pink', rgb: '255, 192, 203', hex: '#FFC0CB' }
  ];

  const webSafeColors = [
    '#000000', '#000033', '#000066', '#000099', '#0000CC', '#0000FF',
    '#003300', '#003333', '#003366', '#003399', '#0033CC', '#0033FF',
    '#006600', '#006633', '#006666', '#006699', '#0066CC', '#0066FF',
    '#009900', '#009933', '#009966', '#009999', '#0099CC', '#0099FF',
    '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
    '#00FF00', '#00FF33', '#00FF66', '#00FF99', '#00FFCC', '#00FFFF'
  ];

  const currentColor = `rgb(${red}, ${green}, ${blue})`;

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    handleRgbChange(r.toString(), g.toString(), b.toString());
  };

  const setPresetColor = (color: { hex: string }) => {
    handleHexChange(color.hex);
  };

  return (
    <div className="space-y-6">
      <h2 className="sr-only">RGB and HEX color conversion tool</h2>
      <Tabs defaultValue="converter" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="converter">RGB ↔ HEX</TabsTrigger>
          <TabsTrigger value="colors">Common Colors</TabsTrigger>
          <TabsTrigger value="websafe">Web Safe Colors</TabsTrigger>
        </TabsList>

        <TabsContent value="converter">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  RGB Color
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label htmlFor="red">Red</Label>
                      <Input
                        id="red"
                        type="number"
                        min="0"
                        max="255"
                        value={red}
                        onChange={(e) => handleRgbChange(e.target.value, green, blue)}
                        placeholder="255"
                        className="text-lg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="green">Green</Label>
                      <Input
                        id="green"
                        type="number"
                        min="0"
                        max="255"
                        value={green}
                        onChange={(e) => handleRgbChange(red, e.target.value, blue)}
                        placeholder="0"
                        className="text-lg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="blue">Blue</Label>
                      <Input
                        id="blue"
                        type="number"
                        min="0"
                        max="255"
                        value={blue}
                        onChange={(e) => handleRgbChange(red, green, e.target.value)}
                        placeholder="0"
                        className="text-lg"
                      />
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-lg font-mono font-bold mb-2">
                      rgb({red}, {green}, {blue})
                    </div>
                    <CopyButton text={`rgb(${red}, ${green}, ${blue})`} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  # HEX Color
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="hex">HEX Color Code</Label>
                    <div className="flex gap-2">
                      <Input
                        id="hex"
                        type="text"
                        value={hex}
                        onChange={(e) => handleHexChange(e.target.value)}
                        placeholder="#FF0000"
                        className="text-center font-mono text-lg"
                      />
                      <input
                        aria-label="HEX color picker"
                        type="color"
                        value={hex}
                        onChange={(e) => handleHexChange(e.target.value)}
                        className="w-12 h-10 border border-input rounded cursor-pointer"
                      />
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-lg font-mono font-bold mb-2">
                      {hex}
                    </div>
                    <CopyButton text={hex} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Color Preview */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Color Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div 
                    className="w-full h-32 rounded-lg border-2 border-border"
                    style={{ backgroundColor: currentColor }}
                  />
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Current Color</div>
                    <div className="font-mono text-lg">{currentColor}</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-muted rounded">
                      <div className="font-semibold">RGB Value</div>
                      <div className="font-mono">rgb({red}, {green}, {blue})</div>
                    </div>
                    <div className="p-3 bg-muted rounded">
                      <div className="font-semibold">HEX Value</div>
                      <div className="font-mono">{hex}</div>
                    </div>
                    <div className="p-3 bg-muted rounded">
                      <div className="font-semibold">CSS Color</div>
                      <div className="font-mono text-xs">color: {hex};</div>
                    </div>
                    <div className="p-3 bg-muted rounded">
                      <div className="font-semibold">Background</div>
                      <div className="font-mono text-xs">background: {hex};</div>
                    </div>
                  </div>
                  <Button onClick={generateRandomColor} variant="outline" className="w-full">
                    <Shuffle className="h-4 w-4 mr-2" />
                    Random Color
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors">
          <Card>
            <CardHeader>
              <CardTitle>Common Colors Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {commonColors.map((color, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer transition-colors"
                    onClick={() => setPresetColor(color)}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded border-2 border-border"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="font-medium">{color.name}</div>
                    </div>
                    <div className="flex gap-6 text-right text-sm">
                      <div>
                        <div className="font-mono text-blue-600">rgb({color.rgb})</div>
                      </div>
                      <div>
                        <div className="font-mono text-green-600">{color.hex}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="websafe">
          <Card>
            <CardHeader>
              <CardTitle>Web Safe Color Palette</CardTitle>
              <p className="text-sm text-muted-foreground">
                216 colors that display consistently across all browsers and monitors
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                {webSafeColors.map((color, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded cursor-pointer border-2 border-border hover:border-primary transition-colors group relative"
                    style={{ backgroundColor: color }}
                    onClick={() => handleHexChange(color)}
                    title={color}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded flex items-center justify-center transition-all">
                      <span className="text-xs font-mono text-white opacity-0 group-hover:opacity-100">
                        {color}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Web Safe Colors</h4>
                <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <div>• 216 colors formed by RGB values: 00, 33, 66, 99, CC, FF</div>
                  <div>• Ensures consistent display across all devices</div>
                  <div>• No color dithering on 256-color displays</div>
                  <div>• Ideal for legacy browser compatibility</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
