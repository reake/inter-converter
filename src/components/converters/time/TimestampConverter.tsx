'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar } from 'lucide-react';
import { CopyButton, CopyResult } from '@/components/ui/CopyButton';
import { ConvertersEngine } from '@/lib/converters/conversion-engine';

const COMMON_TIMEZONES = [
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'New York (EST/EDT)' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)' },
  { value: 'Europe/London', label: 'London (GMT/BST)' },
  { value: 'Europe/Paris', label: 'Paris (CET/CEST)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)' },
];

export function TimestampConverter() {
  const t = useTranslations('tools.timestampConverter');
  const [timestamp, setTimestamp] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [timezone, setTimezone] = useState('UTC');
  const [convertedDate, setConvertedDate] = useState('');
  const [convertedTimestamp, setConvertedTimestamp] = useState('');
  const [error, setError] = useState('');

  // Convert timestamp to date
  useEffect(() => {
    if (timestamp.trim()) {
      const numTimestamp = parseInt(timestamp);
      if (!isNaN(numTimestamp)) {
        const result = ConvertersEngine.convertTimestamp(numTimestamp, timezone);
        if (result.success && result.result) {
          setConvertedDate(result.result);
          setError('');
        } else {
          setError(result.error || 'Invalid timestamp');
          setConvertedDate('');
        }
      } else {
        setError('Please enter a valid number');
        setConvertedDate('');
      }
    } else {
      setConvertedDate('');
      setError('');
    }
  }, [timestamp, timezone]);

  // Convert date to timestamp
  useEffect(() => {
    if (dateTime.trim()) {
      const result = ConvertersEngine.convertDateToTimestamp(dateTime);
      if (result.success && result.result !== undefined) {
        setConvertedTimestamp(result.result.toString());
        setError('');
      } else {
        setError(result.error || 'Invalid date format');
        setConvertedTimestamp('');
      }
    } else {
      setConvertedTimestamp('');
      setError('');
    }
  }, [dateTime]);



  const setCurrentTimestamp = () => {
    const now = Math.floor(Date.now() / 1000);
    setTimestamp(now.toString());
  };

  const clearAll = () => {
    setTimestamp('');
    setDateTime('');
    setConvertedDate('');
    setConvertedTimestamp('');
    setError('');
  };

  return (
    <div className="space-y-6">
      {/* Current Time */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Current Time
            </CardTitle>
            <Button onClick={setCurrentTimestamp} variant="outline" size="sm">
              Use Now
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Current Timestamp</label>
              <div className="text-lg font-mono">{Math.floor(Date.now() / 1000)}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Current Date</label>
              <div className="text-lg">{new Date().toLocaleString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timezone Selection */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Timezone</CardTitle>
        </CardHeader>
        <CardContent>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full p-2 border border-input rounded-md bg-background"
          >
            {COMMON_TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      {/* Timestamp to Date */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Timestamp to Date
          </CardTitle>
          <CardDescription>
            Enter a Unix timestamp to convert to human-readable date
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Unix Timestamp</label>
            <Input
              type="text"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="1640995200"
              className="font-mono"
            />
          </div>
          
          {convertedDate && (
            <div>
              <label className="block text-sm font-medium mb-2">Converted Date</label>
              <CopyResult
                value={convertedDate}
                placeholder="Converted date will appear here"
                inputClassName="font-mono"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Date to Timestamp */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Date to Timestamp
          </CardTitle>
          <CardDescription>
            Enter a date to convert to Unix timestamp
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Date & Time</label>
            <Input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
            />
          </div>
          
          {convertedTimestamp && (
            <div>
              <label className="block text-sm font-medium mb-2">Unix Timestamp</label>
              <CopyResult
                value={convertedTimestamp}
                placeholder="Converted timestamp will appear here"
                inputClassName="font-mono"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="text-destructive text-sm">{error}</div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-center">
        <Button onClick={clearAll} variant="outline">
          Clear All
        </Button>
      </div>

      {/* Quick Examples */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Common Timestamps</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Unix Epoch:</span>
                  <Badge variant="outline" className="font-mono">0</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Year 2000:</span>
                  <Badge variant="outline" className="font-mono">946684800</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Year 2020:</span>
                  <Badge variant="outline" className="font-mono">1577836800</Badge>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Format Examples</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Seconds:</span> 1640995200
                </div>
                <div>
                  <span className="text-muted-foreground">Milliseconds:</span> 1640995200000
                </div>
                <div>
                  <span className="text-muted-foreground">Date:</span> 2022-01-01T00:00:00
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}