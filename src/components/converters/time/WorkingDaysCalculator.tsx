'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Briefcase, Clock } from 'lucide-react';

export function WorkingDaysCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [excludeWeekends, setExcludeWeekends] = useState(true);
  const [excludeHolidays, setExcludeHolidays] = useState(false);
  const [customHolidays, setCustomHolidays] = useState<string[]>([]);
  const [newHoliday, setNewHoliday] = useState('');
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (startDate && endDate) {
      calculateWorkingDays();
    }
  }, [startDate, endDate, excludeWeekends, excludeHolidays, customHolidays]);

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
  };

  const isHoliday = (date: Date) => {
    if (!excludeHolidays) return false;
    const dateStr = date.toISOString().split('T')[0];
    return customHolidays.includes(dateStr);
  };

  const calculateWorkingDays = () => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (start > end) {
        setResult({ error: 'Start date must be before end date' });
        return;
      }

      let totalDays = 0;
      let workingDays = 0;
      let weekends = 0;
      let holidays = 0;
      
      const current = new Date(start);
      
      while (current <= end) {
        totalDays++;
        
        if (excludeWeekends && isWeekend(current)) {
          weekends++;
        } else if (isHoliday(current)) {
          holidays++;
        } else {
          workingDays++;
        }
        
        current.setDate(current.getDate() + 1);
      }

      // Calculate working hours (assuming 8 hours per working day)
      const workingHours = workingDays * 8;
      
      // Calculate weeks
      const weeks = Math.floor(totalDays / 7);
      const remainingDays = totalDays % 7;

      setResult({
        totalDays,
        workingDays,
        weekends,
        holidays,
        workingHours,
        weeks,
        remainingDays,
        breakdown: {
          weekdays: totalDays - weekends - holidays,
          excludedWeekends: excludeWeekends ? weekends : 0,
          excludedHolidays: holidays
        }
      });
    } catch (error) {
      setResult({ error: 'Invalid date format' });
    }
  };

  const addHoliday = () => {
    if (newHoliday && !customHolidays.includes(newHoliday)) {
      setCustomHolidays([...customHolidays, newHoliday]);
      setNewHoliday('');
    }
  };

  const removeHoliday = (holiday: string) => {
    setCustomHolidays(customHolidays.filter(h => h !== holiday));
  };

  const setToday = () => {
    const today = new Date();
    setStartDate(today.toISOString().split('T')[0]);
  };

  const setNextMonth = () => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setEndDate(nextMonth.toISOString().split('T')[0]);
  };

  // Common holidays (can be customized)
  const commonHolidays = [
    { name: 'New Year\'s Day', date: '2024-01-01' },
    { name: 'Independence Day', date: '2024-07-04' },
    { name: 'Christmas Day', date: '2024-12-25' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Working Days Calculator</h1>
        <p className="text-gray-600">Calculate business days between dates, excluding weekends and holidays</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Date Range
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Start Date</label>
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

            <div>
              <label className="block text-sm font-medium mb-2">End Date</label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={setNextMonth} variant="outline" size="sm">
                  +1 Month
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Exclusions</h4>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="weekends"
                  checked={excludeWeekends}
                  onCheckedChange={setExcludeWeekends}
                />
                <label htmlFor="weekends" className="text-sm">
                  Exclude weekends (Saturday & Sunday)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="holidays"
                  checked={excludeHolidays}
                  onCheckedChange={setExcludeHolidays}
                />
                <label htmlFor="holidays" className="text-sm">
                  Exclude custom holidays
                </label>
              </div>
            </div>

            {excludeHolidays && (
              <div>
                <h4 className="font-semibold mb-2">Custom Holidays</h4>
                <div className="flex gap-2 mb-3">
                  <Input
                    type="date"
                    value={newHoliday}
                    onChange={(e) => setNewHoliday(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={addHoliday} size="sm">
                    Add
                  </Button>
                </div>
                
                {customHolidays.length > 0 && (
                  <div className="space-y-2">
                    {customHolidays.map((holiday, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                        <span className="text-sm">{holiday}</span>
                        <Button
                          onClick={() => removeHoliday(holiday)}
                          variant="ghost"
                          size="sm"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-3">
                  <h5 className="text-sm font-medium mb-2">Quick Add Common Holidays</h5>
                  <div className="space-y-1">
                    {commonHolidays.map((holiday, index) => (
                      <Button
                        key={index}
                        onClick={() => {
                          if (!customHolidays.includes(holiday.date)) {
                            setCustomHolidays([...customHolidays, holiday.date]);
                          }
                        }}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        {holiday.name} ({holiday.date})
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result && !result.error ? (
              <div className="space-y-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {result.workingDays}
                  </div>
                  <div className="text-sm text-muted-foreground">Working Days</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted rounded">
                    <div className="font-semibold">{result.totalDays}</div>
                    <div className="text-sm text-muted-foreground">Total Days</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded">
                    <div className="font-semibold">{result.workingHours}</div>
                    <div className="text-sm text-muted-foreground">Working Hours</div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3">Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total days:</span>
                      <span className="font-medium">{result.totalDays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Working days:</span>
                      <span className="font-medium">{result.workingDays}</span>
                    </div>
                    {excludeWeekends && (
                      <div className="flex justify-between">
                        <span>Weekends excluded:</span>
                        <span className="font-medium">{result.weekends}</span>
                      </div>
                    )}
                    {excludeHolidays && result.holidays > 0 && (
                      <div className="flex justify-between">
                        <span>Holidays excluded:</span>
                        <span className="font-medium">{result.holidays}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Time Period</h4>
                  <div className="text-sm">
                    <div>{result.weeks} weeks and {result.remainingDays} days</div>
                    <div className="text-muted-foreground mt-1">
                      Approximately {Math.round(result.workingDays / 5)} work weeks
                    </div>
                  </div>
                </div>
              </div>
            ) : result?.error ? (
              <div className="text-center p-4 text-red-600">
                {result.error}
              </div>
            ) : (
              <div className="text-center p-4 text-muted-foreground">
                Select start and end dates to calculate working days
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Calculations */}
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
                const twoWeeks = new Date(today);
                twoWeeks.setDate(today.getDate() + 14);
                setStartDate(today.toISOString().split('T')[0]);
                setEndDate(twoWeeks.toISOString().split('T')[0]);
              }}
            >
              Next 2 Weeks
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const today = new Date();
                const nextMonth = new Date(today);
                nextMonth.setMonth(today.getMonth() + 1);
                setStartDate(today.toISOString().split('T')[0]);
                setEndDate(nextMonth.toISOString().split('T')[0]);
              }}
            >
              Next Month
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const today = new Date();
                const quarter = new Date(today);
                quarter.setMonth(today.getMonth() + 3);
                setStartDate(today.toISOString().split('T')[0]);
                setEndDate(quarter.toISOString().split('T')[0]);
              }}
            >
              Next Quarter
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const today = new Date();
                const year = new Date(today);
                year.setFullYear(today.getFullYear() + 1);
                setStartDate(today.toISOString().split('T')[0]);
                setEndDate(year.toISOString().split('T')[0]);
              }}
            >
              Next Year
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
