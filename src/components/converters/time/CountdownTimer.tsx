'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Play, Pause, RotateCcw, Bell } from 'lucide-react';

interface Timer {
  id: string;
  name: string;
  targetDate: Date;
  isActive: boolean;
  timeRemaining: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
  };
}

export function CountdownTimer() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [newTimerName, setNewTimerName] = useState('');
  const [newTimerDate, setNewTimerDate] = useState('');
  const [newTimerTime, setNewTimerTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers => 
        prevTimers.map(timer => ({
          ...timer,
          timeRemaining: calculateTimeRemaining(timer.targetDate)
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculateTimeRemaining = (targetDate: Date) => {
    const now = new Date().getTime();
    const target = targetDate.getTime();
    const difference = target - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      total: difference
    };
  };

  const addTimer = () => {
    if (!newTimerName || !newTimerDate || !newTimerTime) {
      return;
    }

    const targetDate = new Date(`${newTimerDate}T${newTimerTime}`);
    if (targetDate <= new Date()) {
      alert('Please select a future date and time');
      return;
    }

    const newTimer: Timer = {
      id: Date.now().toString(),
      name: newTimerName,
      targetDate,
      isActive: true,
      timeRemaining: calculateTimeRemaining(targetDate)
    };

    setTimers(prev => [...prev, newTimer]);
    setNewTimerName('');
    setNewTimerDate('');
    setNewTimerTime('');
  };

  const removeTimer = (id: string) => {
    setTimers(prev => prev.filter(timer => timer.id !== id));
  };

  const toggleTimer = (id: string) => {
    setTimers(prev => 
      prev.map(timer => 
        timer.id === id 
          ? { ...timer, isActive: !timer.isActive }
          : timer
      )
    );
  };

  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0');
  };

  const getTimerStatus = (timer: Timer) => {
    if (timer.timeRemaining.total <= 0) {
      return { status: 'expired', color: 'text-red-600 dark:text-red-400' };
    } else if (timer.timeRemaining.total < 24 * 60 * 60 * 1000) {
      return { status: 'urgent', color: 'text-orange-600 dark:text-orange-400' };
    } else {
      return { status: 'active', color: 'text-green-600 dark:text-green-400' };
    }
  };

  const setQuickTimer = (name: string, hours: number) => {
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + hours);
    
    const newTimer: Timer = {
      id: Date.now().toString(),
      name,
      targetDate,
      isActive: true,
      timeRemaining: calculateTimeRemaining(targetDate)
    };

    setTimers(prev => [...prev, newTimer]);
  };

  return (
    <div className="space-y-6">
      {/* Create New Timer */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Create New Timer
          </CardTitle>
          <CardDescription>
            Set up a countdown timer for your event or deadline
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Event Name</label>
            <Input
              type="text"
              value={newTimerName}
              onChange={(e) => setNewTimerName(e.target.value)}
              placeholder="My Important Event"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Target Date</label>
              <Input
                type="date"
                value={newTimerDate}
                onChange={(e) => setNewTimerDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Target Time</label>
              <Input
                type="time"
                value={newTimerTime}
                onChange={(e) => setNewTimerTime(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={addTimer} className="w-full">
            <Play className="h-4 w-4 mr-2" />
            Start Countdown
          </Button>
        </CardContent>
      </Card>

      {/* Quick Timers */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Timers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              variant="outline"
              onClick={() => setQuickTimer('1 Hour Break', 1)}
              className="h-auto p-3 flex flex-col"
            >
              <div className="font-medium">1 Hour</div>
              <div className="text-xs text-muted-foreground">Break Timer</div>
            </Button>
            <Button
              variant="outline"
              onClick={() => setQuickTimer('Work Session', 2)}
              className="h-auto p-3 flex flex-col"
            >
              <div className="font-medium">2 Hours</div>
              <div className="text-xs text-muted-foreground">Work Session</div>
            </Button>
            <Button
              variant="outline"
              onClick={() => setQuickTimer('Meeting Reminder', 4)}
              className="h-auto p-3 flex flex-col"
            >
              <div className="font-medium">4 Hours</div>
              <div className="text-xs text-muted-foreground">Meeting</div>
            </Button>
            <Button
              variant="outline"
              onClick={() => setQuickTimer('Daily Goal', 24)}
              className="h-auto p-3 flex flex-col"
            >
              <div className="font-medium">1 Day</div>
              <div className="text-xs text-muted-foreground">Daily Goal</div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Timers */}
      {timers.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Active Timers</h2>
          {timers.map((timer) => {
            const timerStatus = getTimerStatus(timer);
            return (
              <Card key={timer.id} className={timer.timeRemaining.total <= 0 ? 'border-red-500' : ''}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{timer.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={timerStatus.status === 'expired' ? 'destructive' : 'secondary'}
                      >
                        {timerStatus.status === 'expired' ? 'Expired' : 
                         timerStatus.status === 'urgent' ? 'Urgent' : 'Active'}
                      </Badge>
                      <Button
                        onClick={() => toggleTimer(timer.id)}
                        variant="outline"
                        size="sm"
                      >
                        {timer.isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button
                        onClick={() => removeTimer(timer.id)}
                        variant="outline"
                        size="sm"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    Target: {timer.targetDate.toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {timer.timeRemaining.total > 0 ? (
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div className="p-3 bg-muted rounded-lg">
                        <div className={`text-2xl font-bold ${timerStatus.color}`}>
                          {formatTime(timer.timeRemaining.days)}
                        </div>
                        <div className="text-sm text-muted-foreground">Days</div>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className={`text-2xl font-bold ${timerStatus.color}`}>
                          {formatTime(timer.timeRemaining.hours)}
                        </div>
                        <div className="text-sm text-muted-foreground">Hours</div>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className={`text-2xl font-bold ${timerStatus.color}`}>
                          {formatTime(timer.timeRemaining.minutes)}
                        </div>
                        <div className="text-sm text-muted-foreground">Minutes</div>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className={`text-2xl font-bold ${timerStatus.color}`}>
                          {formatTime(timer.timeRemaining.seconds)}
                        </div>
                        <div className="text-sm text-muted-foreground">Seconds</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-6 bg-red-50 dark:bg-red-950 rounded-lg">
                      <Bell className="h-12 w-12 text-red-600 dark:text-red-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                        Time's Up!
                      </div>
                      <div className="text-muted-foreground">
                        {timer.name} has expired
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* No Timers Message */}
      {timers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Active Timers</h3>
            <p className="text-muted-foreground mb-4">
              Create your first countdown timer to get started
            </p>
          </CardContent>
        </Card>
      )}

      {/* Timer Tips */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Timer Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Best Practices</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>• Use descriptive names for your timers</div>
                <div>• Set multiple milestones for large projects</div>
                <div>• Enable browser notifications</div>
                <div>• Plan buffer time for important deadlines</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Common Uses</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>• Project deadlines and milestones</div>
                <div>• Event planning and coordination</div>
                <div>• Personal goals and challenges</div>
                <div>• Work sessions and breaks</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}