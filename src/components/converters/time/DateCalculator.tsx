'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Calculator } from 'lucide-react';

export function DateCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [calculationType, setCalculationType] = useState<'difference' | 'add' | 'subtract'>('difference');
  const [addValue, setAddValue] = useState('1');
  const [addUnit, setAddUnit] = useState('days');
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (startDate) {
      calculateResult();
    }
  }, [startDate, endDate, calculationType, addValue, addUnit]);

  const calculateResult = () => {
    try {
      const start = new Date(startDate);
      
      if (calculationType === 'difference' && endDate) {
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        
        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        
        const years = Math.floor(days / 365);
        const months = Math.floor((days % 365) / 30);
        const remainingDays = days % 30;
        
        setResult({
          type: 'difference',
          totalDays: days,
          totalHours: Math.floor(diffTime / (1000 * 60 * 60)),
          totalMinutes: Math.floor(diffTime / (1000 * 60)),
          breakdown: { years, months, days: remainingDays, hours, minutes },
          formatted: `${days} days, ${hours} hours, ${minutes} minutes`
        });
      } else if (calculationType === 'add' || calculationType === 'subtract') {
        const value = parseInt(addValue) * (calculationType === 'subtract' ? -1 : 1);
        let resultDate = new Date(start);
        
        switch (addUnit) {
          case 'years':
            resultDate.setFullYear(resultDate.getFullYear() + value);
            break;
          case 'months':
            resultDate.setMonth(resultDate.getMonth() + value);
            break;
          case 'weeks':
            resultDate.setDate(resultDate.getDate() + (value * 7));
            break;
          case 'days':
            resultDate.setDate(resultDate.getDate() + value);
            break;
          case 'hours':
            resultDate.setHours(resultDate.getHours() + value);
            break;
          case 'minutes':
            resultDate.setMinutes(resultDate.getMinutes() + value);
            break;
        }
        
        setResult({
          type: calculationType,
          resultDate: resultDate,
          formatted: resultDate.toLocaleString(),
          iso: resultDate.toISOString()
        });
      }
    } catch (error) {
      setResult({ error: 'Invalid date format' });
    }
  };

  const setToday = () => {
    const today = new Date();
    setStartDate(today.toISOString().split('T')[0]);
  };

  const setTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setEndDate(tomorrow.toISOString().split('T')[0]);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Date Calculator</h1>
        <p className="text-gray-600">Calculate date differences, add or subtract time from dates</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Calculation Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={calculationType} onValueChange={(value: any) => setCalculationType(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="difference">Calculate Difference Between Dates</SelectItem>
              <SelectItem value="add">Add Time to Date</SelectItem>
              <SelectItem value="subtract">Subtract Time from Date</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Date Input
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {calculationType === 'difference' ? 'Start Date' : 'Base Date'}
              </label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={setToday} variant="outline" size="sm">
                  Today
                </Button>
              </div>
            </div>

            {calculationType === 'difference' && (
              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={setTomorrow} variant="outline" size="sm">
                    Tomorrow
                  </Button>
                </div>
              </div>
            )}

            {(calculationType === 'add' || calculationType === 'subtract') && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Value</label>
                  <Input
                    type="number"
                    value={addValue}
                    onChange={(e) => setAddValue(e.target.value)}
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Unit</label>
                  <Select value={addUnit} onValueChange={setAddUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minutes">Minutes</SelectItem>
                      <SelectItem value="hours">Hours</SelectItem>
                      <SelectItem value="days">Days</SelectItem>
                      <SelectItem value="weeks">Weeks</SelectItem>
                      <SelectItem value="months">Months</SelectItem>
                      <SelectItem value="years">Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result && !result.error ? (
              <div className="space-y-4">
                {result.type === 'difference' && (
                  <>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-2">
                        {result.totalDays.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Days</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center p-3 bg-muted rounded">
                        <div className="font-semibold">{result.totalHours.toLocaleString()}</div>
                        <div className="text-muted-foreground">Hours</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded">
                        <div className="font-semibold">{result.totalMinutes.toLocaleString()}</div>
                        <div className="text-muted-foreground">Minutes</div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Breakdown</h4>
                      <div className="space-y-1 text-sm">
                        <div>{result.breakdown.years} years</div>
                        <div>{result.breakdown.months} months</div>
                        <div>{result.breakdown.days} days</div>
                        <div>{result.breakdown.hours} hours</div>
                        <div>{result.breakdown.minutes} minutes</div>
                      </div>
                    </div>
                  </>
                )}

                {(result.type === 'add' || result.type === 'subtract') && (
                  <>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-lg font-bold text-primary mb-2">
                        {result.formatted}
                      </div>
                      <div className="text-sm text-muted-foreground">Result Date</div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">ISO Format</h4>
                      <div className="font-mono text-sm">{result.iso}</div>
                    </div>
                  </>
                )}
              </div>
            ) : result?.error ? (
              <div className="text-center p-4 text-red-600">
                {result.error}
              </div>
            ) : (
              <div className="text-center p-4 text-muted-foreground">
                Enter dates to see calculation results
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Common Calculations */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Calculations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              onClick={() => {
                const today = new Date();
                const nextWeek = new Date(today);
                nextWeek.setDate(today.getDate() + 7);
                setStartDate(today.toISOString().split('T')[0]);
                setEndDate(nextWeek.toISOString().split('T')[0]);
                setCalculationType('difference');
              }}
            >
              Days in a Week
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const today = new Date();
                const nextMonth = new Date(today);
                nextMonth.setMonth(today.getMonth() + 1);
                setStartDate(today.toISOString().split('T')[0]);
                setEndDate(nextMonth.toISOString().split('T')[0]);
                setCalculationType('difference');
              }}
            >
              Days in a Month
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const today = new Date();
                const nextYear = new Date(today);
                nextYear.setFullYear(today.getFullYear() + 1);
                setStartDate(today.toISOString().split('T')[0]);
                setEndDate(nextYear.toISOString().split('T')[0]);
                setCalculationType('difference');
              }}
            >
              Days in a Year
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const today = new Date();
                setStartDate(today.toISOString().split('T')[0]);
                setAddValue('30');
                setAddUnit('days');
                setCalculationType('add');
              }}
            >
              30 Days Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
