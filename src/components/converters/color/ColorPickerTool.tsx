'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/ui/CopyButton';
import { Palette, Eye, History, Shuffle } from 'lucide-react';

export default function ColorPickerTool() {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [red, setRed] = useState(255);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [hex, setHex] = useState('#FF0000');
  const [colorHistory, setColorHistory] = useState<string[]>([]);

  const hslToRgb = (h: number, s: number, l: number) => {
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

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (n: number) => {
      const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  };

  useEffect(() => {
    const rgb = hslToRgb(hue, saturation, lightness);
    setRed(rgb.r);
    setGreen(rgb.g);
    setBlue(rgb.b);
    setHex(rgbToHex(rgb.r, rgb.g, rgb.b));
  }, [hue, saturation, lightness]);

  const addToHistory = (color: string) => {
    if (!colorHistory.includes(color)) {
      setColorHistory(prev => [color, ...prev.slice(0, 11)]);
    }
  };

  const generateRandomColor = () => {
    setHue(Math.floor(Math.random() * 361));
    setSaturation(Math.floor(Math.random() * 101));
    setLightness(Math.floor(Math.random() * 101));
  };

  const currentColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  const currentRgb = `rgb(${red}, ${green}, ${blue})`;

  const colorPalettes = [
    {
      name: 'Warm Colors',
      colors: ['#FF6B6B', '#FF8E53', '#FF6B35', '#F7931E', '#FFD23F', '#EE4C7C']
    },
    {
      name: 'Cool Colors', 
      colors: ['#4ECDC4', '#45B7D1', '#96CEB4', '#74B9FF', '#DDA0DD', '#98D8C8']
    },
    {
      name: 'Neutral Colors',
      colors: ['#2C3E50', '#34495E', '#7F8C8D', '#95A5A6', '#BDC3C7', '#ECF0F1']
    },
    {
      name: 'Vibrant Colors',
      colors: ['#E74C3C', '#9B59B6', '#3498DB', '#1ABC9C', '#F39C12', '#2ECC71']
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="sr-only">Color picker workspace</h2>
      <Tabs defaultValue="picker" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="picker">Color Picker</TabsTrigger>
          <TabsTrigger value="palettes">Color Palettes</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="guide">Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="picker">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Color Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="color-picker-hue">Hue: {hue}°</Label>
                  <input
                    id="color-picker-hue"
                    type="range"
                    min="0"
                    max="360"
                    step="1"
                    value={hue}
                    onChange={(e) => setHue(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                  />
                  <div className="h-4 rounded mt-2" style={{
                    background: `linear-gradient(to right, 
                      hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), 
                      hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), 
                      hsl(360, 100%, 50%))`
                  }}></div>
                </div>

                <div>
                  <Label htmlFor="color-picker-saturation">Saturation: {saturation}%</Label>
                  <input
                    id="color-picker-saturation"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={saturation}
                    onChange={(e) => setSaturation(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                  />
                  <div className="h-4 rounded mt-2" style={{
                    background: `linear-gradient(to right, 
                      hsl(${hue}, 0%, ${lightness}%), 
                      hsl(${hue}, 100%, ${lightness}%))`
                  }}></div>
                </div>

                <div>
                  <Label htmlFor="color-picker-lightness">Lightness: {lightness}%</Label>
                  <input
                    id="color-picker-lightness"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={lightness}
                    onChange={(e) => setLightness(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                  />
                  <div className="h-4 rounded mt-2" style={{
                    background: `linear-gradient(to right, 
                      hsl(${hue}, ${saturation}%, 0%), 
                      hsl(${hue}, ${saturation}%, 50%), 
                      hsl(${hue}, ${saturation}%, 100%))`
                  }}></div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="color-picker-red">Red</Label>
                    <Input id="color-picker-red" value={red} readOnly className="text-center" />
                  </div>
                  <div>
                    <Label htmlFor="color-picker-green">Green</Label>
                    <Input id="color-picker-green" value={green} readOnly className="text-center" />
                  </div>
                  <div>
                    <Label htmlFor="color-picker-blue">Blue</Label>
                    <Input id="color-picker-blue" value={blue} readOnly className="text-center" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="color-picker-hex">HEX Color Code</Label>
                  <Input id="color-picker-hex" value={hex} readOnly className="text-center font-mono text-lg" />
                </div>

                <Button onClick={generateRandomColor} variant="outline" className="w-full">
                  <Shuffle className="h-4 w-4 mr-2" />
                  Random Color
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Color Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div 
                    className="w-full h-48 rounded-lg border-2 border-border cursor-pointer"
                    style={{ backgroundColor: currentColor }}
                    onClick={() => addToHistory(hex)}
                  />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-muted rounded">
                      <div className="font-semibold">HSL</div>
                      <div className="font-mono">{currentColor}</div>
                    </div>
                    <div className="p-3 bg-muted rounded">
                      <div className="font-semibold">RGB</div>
                      <div className="font-mono">{currentRgb}</div>
                    </div>
                    <div className="p-3 bg-muted rounded">
                      <div className="font-semibold">HEX</div>
                      <div className="font-mono">{hex}</div>
                    </div>
                    <div className="p-3 bg-muted rounded">
                      <div className="font-semibold">CSS</div>
                      <div className="font-mono text-xs">color: {hex};</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <CopyButton text={hex} className="flex-1" />
                    <CopyButton text={currentRgb} className="flex-1" />
                  </div>

                  <Button 
                    onClick={() => addToHistory(hex)}
                    variant="outline"
                    className="w-full"
                  >
                    Add to History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="palettes">
          <div className="space-y-6">
            {colorPalettes.map((palette, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{palette.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-6 gap-3">
                    {palette.colors.map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="aspect-square rounded-lg cursor-pointer border-2 border-border hover:border-primary transition-colors relative group"
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          setHex(color);
                          addToHistory(color);
                        }}
                      >
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg flex items-center justify-center transition-all">
                          <span className="text-xs font-mono text-white opacity-0 group-hover:opacity-100">
                            {color}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Color History
              </CardTitle>
              <p className="text-sm text-muted-foreground">Recently used colors (up to 12)</p>
            </CardHeader>
            <CardContent>
              {colorHistory.length > 0 ? (
                <div className="grid grid-cols-6 md:grid-cols-12 gap-3">
                  {colorHistory.map((color, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-lg cursor-pointer border-2 border-border hover:border-primary transition-colors relative group"
                      style={{ backgroundColor: color }}
                      onClick={() => setHex(color)}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg flex items-center justify-center transition-all">
                        <span className="text-xs font-mono text-white opacity-0 group-hover:opacity-100">
                          {color}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No color history yet</p>
                  <p className="text-sm mt-2">Colors will appear here after selection</p>
                </div>
              )}
              
              {colorHistory.length > 0 && (
                <Button 
                  onClick={() => setColorHistory([])}
                  variant="outline"
                  className="mt-4"
                >
                  Clear History
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guide">
          <Card>
            <CardHeader>
              <CardTitle>Color Picker Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Color Modes</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-blue-600 mb-2">HSL Mode</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Hue: 0-360°</div>
                      <div>• Saturation: 0-100%</div>
                      <div>• Lightness: 0-100%</div>
                      <div>• Most intuitive for color adjustment</div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-green-600 mb-2">RGB Mode</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Red: 0-255</div>
                      <div>• Green: 0-255</div>
                      <div>• Blue: 0-255</div>
                      <div>• Standard display format</div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-purple-600 mb-2">HEX Mode</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Hexadecimal notation</div>
                      <div>• Format: #RRGGBB</div>
                      <div>• Web design standard</div>
                      <div>• Compact and precise</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Usage Tips</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200">Quick Color Adjustment</h4>
                    <div className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      Use HSL sliders for intuitive control over color tone, saturation, and brightness
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded">
                    <h4 className="font-semibold text-green-800 dark:text-green-200">Color History</h4>
                    <div className="text-sm text-green-700 dark:text-green-300 mt-1">
                      Click the preview area or palette colors to automatically add to history
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded">
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200">One-Click Copy</h4>
                    <div className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                      Copy HEX and RGB values directly for use in design software
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Applications</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Web Design</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Website theme colors</div>
                      <div>• UI component styling</div>
                      <div>• Brand color standards</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Graphic Design</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Poster color schemes</div>
                      <div>• Logo color selection</div>
                      <div>• Print design colors</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
