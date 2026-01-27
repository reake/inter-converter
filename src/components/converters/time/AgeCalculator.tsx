'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar, User, Cake } from 'lucide-react';

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [targetDate, setTargetDate] = useState('');
  type AgeResult = {
    exact: { years: number; months: number; days: number };
    totalDays: number;
    totalHours: number;
    totalMinutes: number;
    nextBirthday: { date: string; daysLeft: number };
    zodiacSign: string;
    chineseZodiac: string;
    birthDayOfWeek: string;
    ageInWeeks: number;
    ageInMonths: number;
  };
  type AgeError = { error: string };
  const [result, setResult] = useState<AgeResult | AgeError | null>(null);

  useEffect(() => {
    const today = new Date();
    setTargetDate(today.toISOString().split('T')[0]);
  }, []);

  const calculateAge = useCallback(() => {
    try {
      const birth = new Date(birthDate);
      const target = new Date(targetDate);
      
      if (birth > target) {
        setResult({ error: 'Birth date cannot be in the future' });
        return;
      }

      // Calculate exact age
      let years = target.getFullYear() - birth.getFullYear();
      let months = target.getMonth() - birth.getMonth();
      let days = target.getDate() - birth.getDate();

      if (days < 0) {
        months--;
        const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
        days += lastMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      // Calculate total days
      const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
      
      // Calculate total hours and minutes
      const totalHours = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60));
      const totalMinutes = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60));

      // Calculate next birthday
      const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
      if (nextBirthday < target) {
        nextBirthday.setFullYear(target.getFullYear() + 1);
      }
      const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

      // Calculate zodiac sign
      const zodiacSign = getZodiacSign(birth.getMonth() + 1, birth.getDate());

      // Calculate Chinese zodiac
      const chineseZodiac = getChineseZodiac(birth.getFullYear());

      setResult({
        exact: { years, months, days },
        totalDays,
        totalHours,
        totalMinutes,
        nextBirthday: {
          date: nextBirthday.toLocaleDateString(),
          daysLeft: daysToNextBirthday
        },
        zodiacSign,
        chineseZodiac,
        birthDayOfWeek: birth.toLocaleDateString('en-US', { weekday: 'long' }),
        ageInWeeks: Math.floor(totalDays / 7),
        ageInMonths: years * 12 + months
      });
    } catch {
      setResult({ error: 'Invalid date format' });
    }
  }, [birthDate, targetDate]);

  useEffect(() => {
    if (birthDate && targetDate) {
      calculateAge();
    }
  }, [birthDate, targetDate, calculateAge]);

  const getZodiacSign = (month: number, day: number) => {
    const signs = [
      { name: 'Capricorn', start: [12, 22], end: [1, 19] },
      { name: 'Aquarius', start: [1, 20], end: [2, 18] },
      { name: 'Pisces', start: [2, 19], end: [3, 20] },
      { name: 'Aries', start: [3, 21], end: [4, 19] },
      { name: 'Taurus', start: [4, 20], end: [5, 20] },
      { name: 'Gemini', start: [5, 21], end: [6, 20] },
      { name: 'Cancer', start: [6, 21], end: [7, 22] },
      { name: 'Leo', start: [7, 23], end: [8, 22] },
      { name: 'Virgo', start: [8, 23], end: [9, 22] },
      { name: 'Libra', start: [9, 23], end: [10, 22] },
      { name: 'Scorpio', start: [10, 23], end: [11, 21] },
      { name: 'Sagittarius', start: [11, 22], end: [12, 21] }
    ];

    for (const sign of signs) {
      if (
        (month === sign.start[0] && day >= sign.start[1]) ||
        (month === sign.end[0] && day <= sign.end[1]) ||
        (sign.name === 'Capricorn' && ((month === 12 && day >= 22) || (month === 1 && day <= 19)))
      ) {
        return sign.name;
      }
    }
    return 'Unknown';
  };

  const getChineseZodiac = (year: number) => {
    const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    return animals[(year - 1900) % 12];
  };

  const setToday = () => {
    const today = new Date();
    setTargetDate(today.toISOString().split('T')[0]);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Age Calculator</h1>
        <p className="text-gray-600">Calculate your exact age, next birthday, and interesting age statistics</p>
      </div>

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
              <label className="block text-sm font-medium mb-2">Birth Date</label>
              <Input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Calculate Age As Of</label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={setToday} variant="outline" size="sm">
                  Today
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Age Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result && !('error' in result) ? (
              <div className="space-y-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {result.exact.years} years old
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {result.exact.years} years, {result.exact.months} months, {result.exact.days} days
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-muted rounded">
                    <div className="font-semibold">{result.totalDays.toLocaleString()}</div>
                    <div className="text-muted-foreground">Days</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded">
                    <div className="font-semibold">{result.ageInWeeks.toLocaleString()}</div>
                    <div className="text-muted-foreground">Weeks</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded">
                    <div className="font-semibold">{result.ageInMonths}</div>
                    <div className="text-muted-foreground">Months</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded">
                    <div className="font-semibold">{result.totalHours.toLocaleString()}</div>
                    <div className="text-muted-foreground">Hours</div>
                  </div>
                </div>
              </div>
            ) : result && 'error' in result ? (
              <div className="text-center p-4 text-red-600">
                {result.error}
              </div>
            ) : (
              <div className="text-center p-4 text-muted-foreground">
                Enter your birth date to calculate age
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {result && !('error' in result) && (
        <>
          {/* Birthday Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cake className="h-5 w-5" />
                Birthday Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Next Birthday</h4>
                    <div className="text-lg font-medium">{result.nextBirthday.date}</div>
                    <div className="text-sm text-muted-foreground">
                      {result.nextBirthday.daysLeft} days to go
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Birth Day</h4>
                    <div className="text-lg font-medium">{result.birthDayOfWeek}</div>
                    <div className="text-sm text-muted-foreground">
                      Day of the week you were born
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Zodiac Sign</h4>
                    <div className="text-lg font-medium">{result.zodiacSign}</div>
                    <div className="text-sm text-muted-foreground">
                      Western zodiac sign
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Chinese Zodiac</h4>
                    <div className="text-lg font-medium">{result.chineseZodiac}</div>
                    <div className="text-sm text-muted-foreground">
                      Chinese zodiac animal
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fun Facts */}
          <Card>
            <CardHeader>
              <CardTitle>Fun Age Facts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="p-4 border rounded-lg text-center">
                  <div className="font-semibold text-blue-600 mb-2">Minutes Lived</div>
                  <div className="text-lg font-bold">{result.totalMinutes.toLocaleString()}</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="font-semibold text-green-600 mb-2">Heartbeats</div>
                  <div className="text-lg font-bold">{(result.totalMinutes * 70).toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-1">Approx. at 70 BPM</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="font-semibold text-purple-600 mb-2">Breaths Taken</div>
                  <div className="text-lg font-bold">{(result.totalMinutes * 16).toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-1">Approx. at 16 per min</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
