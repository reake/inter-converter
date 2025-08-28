'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Eye, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export function ContrastChecker() {
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [contrastRatio, setContrastRatio] = useState(0);
  const [wcagResults, setWcagResults] = useState({
    aa: { normal: false, large: false },
    aaa: { normal: false, large: false }
  });

  useEffect(() => {
    calculateContrast();
  }, [foregroundColor, backgroundColor]);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const calculateContrast = () => {
    const fg = hexToRgb(foregroundColor);
    const bg = hexToRgb(backgroundColor);
    
    if (!fg || !bg) return;

    const fgLuminance = getLuminance(fg.r, fg.g, fg.b);
    const bgLuminance = getLuminance(bg.r, bg.g, bg.b);
    
    const lighter = Math.max(fgLuminance, bgLuminance);
    const darker = Math.min(fgLuminance, bgLuminance);
    
    const ratio = (lighter + 0.05) / (darker + 0.05);
    setContrastRatio(ratio);

    // WCAG compliance check
    setWcagResults({
      aa: {
        normal: ratio >= 4.5,
        large: ratio >= 3
      },
      aaa: {
        normal: ratio >= 7,
        large: ratio >= 4.5
      }
    });
  };

  const getStatusIcon = (passed: boolean) => {
    return passed ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <XCircle className="h-4 w-4 text-red-600" />
    );
  };

  const getStatusBadge = (passed: boolean) => {
    return (
      <Badge variant={passed ? "default" : "destructive"}>
        {passed ? "Pass" : "Fail"}
      </Badge>
    );
  };

  const presetCombinations = [
    { name: 'Black on White', fg: '#000000', bg: '#ffffff' },
    { name: 'White on Black', fg: '#ffffff', bg: '#000000' },
    { name: 'Blue on White', fg: '#0066cc', bg: '#ffffff' },
    { name: 'White on Blue', fg: '#ffffff', bg: '#0066cc' },
    { name: 'Dark Gray on Light Gray', fg: '#333333', bg: '#f5f5f5' },
    { name: 'Green on White', fg: '#008000', bg: '#ffffff' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Color Contrast Checker</h1>
        <p className="text-gray-600">Check color contrast ratios for WCAG accessibility compliance</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Color Selection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Foreground Color (Text)</label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={foregroundColor}
                  onChange={(e) => setForegroundColor(e.target.value)}
                  className="w-16 h-10 p-1 border rounded"
                />
                <Input
                  type="text"
                  value={foregroundColor}
                  onChange={(e) => setForegroundColor(e.target.value)}
                  className="flex-1 font-mono"
                  placeholder="#000000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Background Color</label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-16 h-10 p-1 border rounded"
                />
                <Input
                  type="text"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="flex-1 font-mono"
                  placeholder="#ffffff"
                />
              </div>
            </div>

            <div className="pt-4">
              <h4 className="font-semibold mb-3">Preset Combinations</h4>
              <div className="space-y-2">
                {presetCombinations.map((combo, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setForegroundColor(combo.fg);
                      setBackgroundColor(combo.bg);
                    }}
                    className="w-full p-3 text-left border rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{combo.name}</span>
                      <div className="flex gap-2">
                        <div 
                          className="w-4 h-4 rounded border"
                          style={{ backgroundColor: combo.fg }}
                        />
                        <div 
                          className="w-4 h-4 rounded border"
                          style={{ backgroundColor: combo.bg }}
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contrast Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div 
              className="p-6 rounded-lg border-2"
              style={{ 
                color: foregroundColor, 
                backgroundColor: backgroundColor 
              }}
            >
              <div className="text-lg font-semibold mb-2">Sample Text</div>
              <div className="text-sm">
                This is how your text will look with the selected colors. 
                The contrast ratio determines readability and accessibility.
              </div>
            </div>

            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold mb-1">
                {contrastRatio.toFixed(2)}:1
              </div>
              <div className="text-sm text-muted-foreground">Contrast Ratio</div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">WCAG Compliance</h4>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(wcagResults.aa.normal)}
                    <span className="text-sm">AA Normal Text (4.5:1)</span>
                  </div>
                  {getStatusBadge(wcagResults.aa.normal)}
                </div>

                <div className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(wcagResults.aa.large)}
                    <span className="text-sm">AA Large Text (3:1)</span>
                  </div>
                  {getStatusBadge(wcagResults.aa.large)}
                </div>

                <div className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(wcagResults.aaa.normal)}
                    <span className="text-sm">AAA Normal Text (7:1)</span>
                  </div>
                  {getStatusBadge(wcagResults.aaa.normal)}
                </div>

                <div className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(wcagResults.aaa.large)}
                    <span className="text-sm">AAA Large Text (4.5:1)</span>
                  </div>
                  {getStatusBadge(wcagResults.aaa.large)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>WCAG Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-blue-600">WCAG AA (Minimum)</h4>
              <div className="space-y-2 text-sm">
                <div>• Normal text: 4.5:1 contrast ratio</div>
                <div>• Large text (18pt+ or 14pt+ bold): 3:1 contrast ratio</div>
                <div>• Required for most websites and applications</div>
                <div>• Legal compliance in many jurisdictions</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-green-600">WCAG AAA (Enhanced)</h4>
              <div className="space-y-2 text-sm">
                <div>• Normal text: 7:1 contrast ratio</div>
                <div>• Large text: 4.5:1 contrast ratio</div>
                <div>• Higher standard for better accessibility</div>
                <div>• Recommended for critical applications</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
