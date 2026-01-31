'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EmbedCodeGeneratorProps {
  toolId: string;
  toolName: string;
  defaultWidth?: string;
  defaultHeight?: string;
}

export function EmbedCodeGenerator({
  toolId,
  toolName,
  defaultWidth = '400',
  defaultHeight = '500'
}: EmbedCodeGeneratorProps) {
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);
  const [copied, setCopied] = useState(false);

  const generateIframeCode = () => {
    return `<iframe 
  src="https://interconverter.com/embed/${toolId}" 
  width="${width}" 
  height="${height}" 
  frameborder="0" 
  allowfullscreen
  style="border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
</iframe>`;
  };

  const generateScriptCode = () => {
    return `<script>
  (function() {
    const script = document.createElement('script');
    script.src = 'https://interconverter.com/embed-widget.js';
    script.async = true;
    script.onload = function() {
      InterConverterWidget.init({
        tool: '${toolId}',
        width: '${width}px',
        height: '${height}px'
      });
    };
    document.head.appendChild(script);
  })();
</script>`;
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Embed This Tool</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="embed-width">Width (px)</Label>
            <Input
              id="embed-width"
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="embed-height">Height (px)</Label>
            <Input
              id="embed-height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label>Iframe Code</Label>
          <div className="relative">
            <textarea
              className="w-full h-24 p-3 text-sm font-mono bg-gray-100 border rounded-lg resize-none"
              readOnly
              value={generateIframeCode()}
            />
            <Button
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(generateIframeCode())}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>

        <div>
          <Label>JavaScript Code</Label>
          <div className="relative">
            <textarea
              className="w-full h-24 p-3 text-sm font-mono bg-gray-100 border rounded-lg resize-none"
              readOnly
              value={generateScriptCode()}
            />
            <Button
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(generateScriptCode())}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Preview</h4>
          <iframe
            src={`/embed/${toolId}`}
            width={parseInt(width)}
            height={Math.min(parseInt(height), 400)}
            className="w-full border rounded-lg"
            style={{ maxHeight: '400px' }}
            title={toolName}
          />
        </div>
      </CardContent>
    </Card>
  );
}
