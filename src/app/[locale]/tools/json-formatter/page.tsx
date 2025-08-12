"use client"

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function JsonFormatterPage() {
  const t = useTranslations('tools.jsonFormatter');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
    } catch (err) {
      setError('Invalid JSON format');
      setOutput('');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
    } catch (err) {
      setError('Invalid JSON format');
      setOutput('');
    }
  };

  const validateJson = () => {
    try {
      JSON.parse(input);
      setError('');
      alert('Valid JSON!');
    } catch (err) {
      setError('Invalid JSON format');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert('Copied to clipboard!');
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Input JSON:</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('placeholder')}
              className="min-h-[200px]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={formatJson}>{t('format')}</Button>
            <Button onClick={minifyJson} variant="outline">{t('minify')}</Button>
            <Button onClick={validateJson} variant="outline">{t('validate')}</Button>
            <Button onClick={copyToClipboard} variant="outline" disabled={!output}>
              {t('copy')}
            </Button>
            <Button onClick={clearAll} variant="outline">{t('clear')}</Button>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Output:</label>
            <Textarea
              value={output}
              readOnly
              className="min-h-[200px]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
