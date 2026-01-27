'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, Clock, Plus, Trash2 } from 'lucide-react';

interface TimeZone {
  name: string;
  zone: string;
  offset: string;
}

const POPULAR_TIMEZONES: TimeZone[] = [
  { name: 'New York', zone: 'America/New_York', offset: 'UTC-5/-4' },
  { name: 'Los Angeles', zone: 'America/Los_Angeles', offset: 'UTC-8/-7' },
  { name: 'London', zone: 'Europe/London', offset: 'UTC+0/+1' },
  { name: 'Paris', zone: 'Europe/Paris', offset: 'UTC+1/+2' },
  { name: 'Tokyo', zone: 'Asia/Tokyo', offset: 'UTC+9' },
  { name: 'Sydney', zone: 'Australia/Sydney', offset: 'UTC+10/+11' },
  { name: 'Dubai', zone: 'Asia/Dubai', offset: 'UTC+4' },
  { name: 'Singapore', zone: 'Asia/Singapore', offset: 'UTC+8' },
  { name: 'Hong Kong', zone: 'Asia/Hong_Kong', offset: 'UTC+8' },
  { name: 'Mumbai', zone: 'Asia/Kolkata', offset: 'UTC+5:30' },
  { name: 'Beijing', zone: 'Asia/Shanghai', offset: 'UTC+8' },
  { name: 'Moscow', zone: 'Europe/Moscow', offset: 'UTC+3' }
];

export function WorldClock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimezones, setSelectedTimezones] = useState<TimeZone[]>([
    POPULAR_TIMEZONES[0], // New York
    POPULAR_TIMEZONES[2], // London
    POPULAR_TIMEZONES[4], // Tokyo
    POPULAR_TIMEZONES[5]  // Sydney
  ]);
  const [availableTimezone, setAvailableTimezone] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (timezone: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(currentTime);
    } catch {
      return 'Invalid timezone';
    }
  };

  const formatDate = (timezone: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(currentTime);
    } catch {
      return 'Invalid timezone';
    }
  };

  const getTimeStatus = (timezone: string) => {
    try {
      const hour = new Date().toLocaleString('en-US', { 
        timeZone: timezone, 
        hour: 'numeric', 
        hour12: false 
      });
      const hourNum = parseInt(hour);
      
      if (hourNum >= 6 && hourNum < 12) return { status: 'Morning', color: 'text-yellow-600' };
      if (hourNum >= 12 && hourNum < 18) return { status: 'Afternoon', color: 'text-orange-600' };
      if (hourNum >= 18 && hourNum < 22) return { status: 'Evening', color: 'text-purple-600' };
      return { status: 'Night', color: 'text-blue-600' };
    } catch {
      return { status: 'Unknown', color: 'text-gray-600' };
    }
  };

  const addTimezone = () => {
    if (availableTimezone) {
      const timezone = POPULAR_TIMEZONES.find(tz => tz.zone === availableTimezone);
      if (timezone && !selectedTimezones.find(tz => tz.zone === timezone.zone)) {
        setSelectedTimezones([...selectedTimezones, timezone]);
        setAvailableTimezone('');
      }
    }
  };

  const removeTimezone = (timezoneToRemove: string) => {
    setSelectedTimezones(selectedTimezones.filter(tz => tz.zone !== timezoneToRemove));
  };

  const availableToAdd = POPULAR_TIMEZONES.filter(
    tz => !selectedTimezones.find(selected => selected.zone === tz.zone)
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">World Clock</h1>
        <p className="text-gray-600">Track time across multiple time zones around the world</p>
      </div>

      {/* Add Timezone */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Time Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Select value={availableTimezone} onValueChange={setAvailableTimezone}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a timezone to add" />
              </SelectTrigger>
              <SelectContent>
                {availableToAdd.map((tz) => (
                  <SelectItem key={tz.zone} value={tz.zone}>
                    {tz.name} ({tz.offset})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={addTimezone} disabled={!availableTimezone}>
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Time Zone Clocks */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedTimezones.map((timezone) => {
          const timeStatus = getTimeStatus(timezone.zone);
          return (
            <Card key={timezone.zone} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Globe className="h-5 w-5" />
                    {timezone.name}
                  </CardTitle>
                  {selectedTimezones.length > 1 && (
                    <Button
                      onClick={() => removeTimezone(timezone.zone)}
                      variant="ghost"
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {timezone.offset}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-mono font-bold text-primary mb-2">
                    {formatTime(timezone.zone)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(timezone.zone)}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className={`text-sm font-medium ${timeStatus.color}`}>
                    {timeStatus.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Current UTC Time */}
      <Card>
        <CardHeader>
          <CardTitle>UTC Reference Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-2xl font-mono font-bold mb-2">
              {currentTime.toUTCString()}
            </div>
            <div className="text-sm text-muted-foreground">
              Coordinated Universal Time (UTC)
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Zone Information */}
      <Card>
        <CardHeader>
          <CardTitle>Time Zone Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Understanding Time Zones</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>• Time zones are based on UTC (Coordinated Universal Time)</div>
                <div>• Each zone is typically 1 hour apart from adjacent zones</div>
                <div>• Daylight Saving Time can shift zones by 1 hour seasonally</div>
                <div>• Some regions use half-hour or quarter-hour offsets</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Business Hours Guide</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>• Morning: 6:00 AM - 12:00 PM</div>
                <div>• Afternoon: 12:00 PM - 6:00 PM</div>
                <div>• Evening: 6:00 PM - 10:00 PM</div>
                <div>• Night: 10:00 PM - 6:00 AM</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
