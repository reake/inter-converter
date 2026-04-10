'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Palette } from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

interface HexToHslConverterProps {
  lang?: string;
}

export default function HexToHslConverter({ lang = 'en' }: HexToHslConverterProps) {
  const isZh = lang === 'zh';
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
        setError(isZh ? '请输入有效的 HEX 颜色代码' : 'Please enter a valid HEX color code');
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
      setError(isZh ? '无效的 HEX 颜色格式' : 'Invalid HEX color format');
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{isZh ? 'HEX 转 HSL 转换器' : 'HEX to HSL Converter'}</h1>
        <p className="text-gray-600">{isZh ? '将 HEX 颜色代码转换为 HSL（色相、饱和度、亮度）值' : 'Convert HEX color codes to HSL (Hue, Saturation, Lightness) values'}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              {isZh ? 'HEX 颜色' : 'HEX Color'}
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
              {isZh ? 'HSL 数值' : 'HSL Values'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-muted rounded">
                  <div className="text-sm text-muted-foreground">{isZh ? '色相' : 'Hue'}</div>
                  <div className="text-xl font-bold">{hslValue.h}°</div>
                </div>
                <div className="text-center p-3 bg-muted rounded">
                  <div className="text-sm text-muted-foreground">{isZh ? '饱和度' : 'Saturation'}</div>
                  <div className="text-xl font-bold">{hslValue.s}%</div>
                </div>
                <div className="text-center p-3 bg-muted rounded">
                  <div className="text-sm text-muted-foreground">{isZh ? '亮度' : 'Lightness'}</div>
                  <div className="text-xl font-bold">{hslValue.l}%</div>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">{isZh ? 'HSL 字符串' : 'HSL String'}</div>
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
          <CardTitle>{isZh ? '关于 HSL 颜色模型' : 'About HSL Color Model'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">{isZh ? '色相 (0-360°)' : 'Hue (0-360°)'}</h4>
              <p className="text-muted-foreground">{isZh ? '表示色轮上的颜色类型。0° 是红色，120° 是绿色，240° 是蓝色。' : 'The color type on the color wheel. 0° is red, 120° is green, 240° is blue.'}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">{isZh ? '饱和度 (0-100%)' : 'Saturation (0-100%)'}</h4>
              <p className="text-muted-foreground">{isZh ? '表示颜色强度。0% 为灰色，100% 为纯色。' : 'The intensity of the color. 0% is gray, 100% is full color.'}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">{isZh ? '亮度 (0-100%)' : 'Lightness (0-100%)'}</h4>
              <p className="text-muted-foreground">{isZh ? '表示颜色明暗。0% 为黑色，50% 为正常亮度，100% 为白色。' : 'The brightness of the color. 0% is black, 50% is normal, 100% is white.'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
