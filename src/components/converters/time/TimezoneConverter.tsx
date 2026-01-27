'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, Clock, Plus, Trash2 } from 'lucide-react';

interface TimezoneInfo {
  id: string;
  name: string;
  offset: string;
}

export default function TimezoneConverter() {
  const [sourceTime, setSourceTime] = useState<string>('');
  const [sourceTimezone, setSourceTimezone] = useState<string>('UTC');
  const [targetTimezones, setTargetTimezones] = useState<string[]>(['America/New_York', 'Europe/London', 'Asia/Tokyo']);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  const timezones: TimezoneInfo[] = [
    { id: 'UTC', name: 'UTC (Coordinated Universal Time)', offset: '+00:00' },
    { id: 'America/New_York', name: 'New York (EST/EDT)', offset: '-05:00/-04:00' },
    { id: 'America/Los_Angeles', name: 'Los Angeles (PST/PDT)', offset: '-08:00/-07:00' },
    { id: 'America/Chicago', name: 'Chicago (CST/CDT)', offset: '-06:00/-05:00' },
    { id: 'Europe/London', name: 'London (GMT/BST)', offset: '+00:00/+01:00' },
    { id: 'Europe/Paris', name: 'Paris (CET/CEST)', offset: '+01:00/+02:00' },
    { id: 'Europe/Berlin', name: 'Berlin (CET/CEST)', offset: '+01:00/+02:00' },
    { id: 'Asia/Tokyo', name: 'Tokyo (JST)', offset: '+09:00' },
    { id: 'Asia/Shanghai', name: 'Shanghai (CST)', offset: '+08:00' },
    { id: 'Asia/Dubai', name: 'Dubai (GST)', offset: '+04:00' },
    { id: 'Australia/Sydney', name: 'Sydney (AEST/AEDT)', offset: '+10:00/+11:00' },
    { id: 'Pacific/Auckland', name: 'Auckland (NZST/NZDT)', offset: '+12:00/+13:00' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Set initial time to current time
    const now = new Date();
    setSourceTime(now.toTimeString().slice(0, 8));

    return () => clearInterval(timer);
  }, []);

  const convertTime = (time: string, fromTz: string, toTz: string): string => {
    if (!time) return '';
    
    try {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      const today = new Date();
      today.setHours(hours, minutes, seconds || 0, 0);
      
      // Create date in source timezone
      const targetDate = new Date(today.getTime() + (today.getTimezoneOffset() * 60000));
      
      // Convert to target timezone
      const result = new Date(targetDate.toLocaleString('en-US', { timeZone: toTz }));
      
      return result.toTimeString().slice(0, 8);
    } catch {
      return 'Invalid time';
    }
  };

  const getCurrentTimeInTimezone = (timezone: string): string => {
    try {
      return currentTime.toLocaleString('en-US', {
        timeZone: timezone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return 'Invalid timezone';
    }
  };

  const getDateInTimezone = (timezone: string): string => {
    try {
      return currentTime.toLocaleDateString('en-US', {
        timeZone: timezone,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid timezone';
    }
  };

  const addTimezone = () => {
    const availableTimezones = timezones.filter(tz => !targetTimezones.includes(tz.id));
    if (availableTimezones.length > 0) {
      setTargetTimezones([...targetTimezones, availableTimezones[0].id]);
    }
  };

  const removeTimezone = (index: number) => {
    setTargetTimezones(targetTimezones.filter((_, i) => i !== index));
  };

  const getTimezoneInfo = (id: string) => {
    return timezones.find(tz => tz.id === id) || { id, name: id, offset: 'Unknown' };
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Source Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Time</label>
              <Input
                type="time"
                value={sourceTime}
                onChange={(e) => setSourceTime(e.target.value)}
                className="text-lg"
                step="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Timezone</label>
              <Select value={sourceTimezone} onValueChange={setSourceTimezone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.id} value={tz.id}>
                      {tz.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {getCurrentTimeInTimezone(sourceTimezone)}
              </div>
              <div className="text-sm text-blue-700">
                Current time in {getTimezoneInfo(sourceTimezone).name}
              </div>
              <div className="text-xs text-blue-600 mt-1">
                {getDateInTimezone(sourceTimezone)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Target Timezones
            </div>
            <Button onClick={addTimezone} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Add Timezone
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {targetTimezones.map((timezone, index) => {
              const timezoneInfo = getTimezoneInfo(timezone);
              const convertedTime = convertTime(sourceTime, sourceTimezone, timezone);
              const currentTimeInTz = getCurrentTimeInTimezone(timezone);
              const dateInTz = getDateInTimezone(timezone);
              
              return (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-semibold">{timezoneInfo.name}</div>
                      <div className="text-sm text-gray-600">Offset: {timezoneInfo.offset}</div>
                    </div>
                    {targetTimezones.length > 1 && (
                      <Button 
                        onClick={() => removeTimezone(index)} 
                        size="sm" 
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded">
                      <div className="text-xl font-bold text-green-600">
                        {convertedTime || 'Enter time above'}
                      </div>
                      <div className="text-sm text-green-700">Converted Time</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded">
                      <div className="text-xl font-bold text-gray-600">
                        {currentTimeInTz}
                      </div>
                      <div className="text-sm text-gray-700">Current Time</div>
                      <div className="text-xs text-gray-600 mt-1">{dateInTz}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Popular Timezones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {timezones.slice(0, 6).map((tz) => (
                <div key={tz.id} className="flex items-center justify-between p-2 border rounded hover:bg-gray-50">
                  <div>
                    <div className="font-medium text-sm">{tz.name.split(' (')[0]}</div>
                    <div className="text-xs text-gray-600">{tz.offset}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm">{getCurrentTimeInTimezone(tz.id)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-700 space-y-2">
              <div>• Times are displayed in 24-hour format</div>
              <div>• Daylight saving time is automatically handled</div>
              <div>• Current time updates every second</div>
              <div>• Add multiple timezones for easy comparison</div>
              <div>• Converted times account for date changes</div>
              <div>• All calculations are done in real-time</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
