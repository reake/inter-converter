'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Calendar, Clock } from 'lucide-react';

interface DateDifference {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  businessDays: number;
}

export function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [includeEndDate, setIncludeEndDate] = useState(false);
  const [businessDaysOnly, setBusinessDaysOnly] = useState(false);
  const [result, setResult] = useState<DateDifference | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (startDate && endDate) {
      calculateDifference();
    } else {
      setResult(null);
      setError('');
    }
  }, [startDate, endDate, includeEndDate, businessDaysOnly]);

  const calculateDifference = () => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        setError('Please enter valid dates');
        setResult(null);
        return;
      }

      if (start > end) {
        setError('Start date must be before end date');
        setResult(null);
        return;
      }

      // Calculate the difference
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // Adjust for include end date option
      const adjustedDiffDays = includeEndDate ? diffDays + 1 : diffDays;

      // Calculate years, months, days
      let years = end.getFullYear() - start.getFullYear();
      let months = end.getMonth() - start.getMonth();
      let days = end.getDate() - start.getDate();

      if (days < 0) {
        months--;
        const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        days += lastMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      // Calculate business days
      const businessDays = calculateBusinessDays(start, end);

      const difference: DateDifference = {
        years,
        months,
        days,
        totalDays: adjustedDiffDays,
        totalHours: Math.ceil(diffTime / (1000 * 60 * 60)),
        totalMinutes: Math.ceil(diffTime / (1000 * 60)),
        totalSeconds: Math.ceil(diffTime / 1000),
        businessDays: includeEndDate ? businessDays + (isBusinessDay(end) ? 1 : 0) : businessDays
      };

      setResult(difference);
      setError('');
    } catch (err) {
      setError('Error calculating date difference');
      setResult(null);
    }
  };

  const calculateBusinessDays = (start: Date, end: Date): number => {
    let count = 0;
    const current = new Date(start);
    
    while (current < end) {
      if (isBusinessDay(current)) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }
    
    return count;
  };

  const isBusinessDay = (date: Date): boolean => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // Not Sunday (0) or Saturday (6)
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const setToday = (field: 'start' | 'end') => {
    const today = new Date().toISOString().split('T')[0];
    if (field === 'start') {
      setStartDate(today);
    } else {
      setEndDate(today);
    }
  };

  const clearAll = () => {
    setStartDate('');
    setEndDate('');
    setResult(null);
    setError('');
  };

  const formatResult = () => {
    if (!result) return '';
    
    const parts = [];
    if (result.years > 0) parts.push(`${result.years} year${result.years !== 1 ? 's' : ''}`);
    if (result.months > 0) parts.push(`${result.months} month${result.months !== 1 ? 's' : ''}`);
    if (result.days > 0) parts.push(`${result.days} day${result.days !== 1 ? 's' : ''}`);
    
    return parts.join(', ') || '0 days';
  };

  return (
    <div className="space-y-6">
      {/* Date Input */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Select Dates
          </CardTitle>
          <CardDescription>
            Choose the start and end dates to calculate the difference
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Start Date</label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <Button
                  onClick={() => setToday('start')}
                  variant="outline"
                  size="sm"
                >
                  Today
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Date</label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <Button
                  onClick={() => setToday('end')}
                  variant="outline"
                  size="sm"
                >
                  Today
                </Button>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={includeEndDate}
                onChange={(e) => setIncludeEndDate(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Include end date in calculation</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={businessDaysOnly}
                onChange={(e) => setBusinessDaysOnly(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Show business days (exclude weekends)</span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Date Difference Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Main Result */}
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">{formatResult()}</div>
                <div className="flex items-center justify-center gap-2">
                  <Badge variant="outline">{result.totalDays} total days</Badge>
                  <Button
                    onClick={() => copyToClipboard(formatResult())}
                    variant="outline"
                    size="sm"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{result.years}</div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">{result.months}</div>
                <div className="text-sm text-muted-foreground">Months</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{result.days}</div>
                <div className="text-sm text-muted-foreground">Days</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{result.businessDays}</div>
                <div className="text-sm text-muted-foreground">Business Days</div>
              </div>
            </div>

            {/* Alternative Formats */}
            <div className="space-y-2">
              <h4 className="font-medium">Alternative Formats:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>Total Days:</span>
                  <span className="font-mono">{result.totalDays.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>Total Hours:</span>
                  <span className="font-mono">{result.totalHours.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>Total Minutes:</span>
                  <span className="font-mono">{result.totalMinutes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between p-2 bg-muted rounded">
                  <span>Total Seconds:</span>
                  <span className="font-mono">{result.totalSeconds.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
              <h4 className="font-medium mb-2">Common Calculations</h4>
              <div className="space-y-2 text-sm">
                <div>• Age calculation (birth date to today)</div>
                <div>• Project duration (start to end date)</div>
                <div>• Days until vacation</div>
                <div>• Employment duration</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Tips</h4>
              <div className="space-y-2 text-sm">
                <div>• Use "Include end date" for inclusive counting</div>
                <div>• Business days exclude weekends</div>
                <div>• Results account for leap years</div>
                <div>• All calculations are precise to the day</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}