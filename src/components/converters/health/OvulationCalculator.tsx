'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarDays, Heart } from 'lucide-react';

export default function OvulationCalculator() {
  const [cycleLength, setCycleLength] = useState<string>('28');
  const [lastPeriodDate, setLastPeriodDate] = useState<string>('');
  const [results, setResults] = useState<{
    ovulationDate: string;
    fertileWindow: { start: string; end: string };
    nextPeriod: string;
  } | null>(null);

  const calculateOvulation = () => {
    if (!lastPeriodDate || !cycleLength) return;

    const lastPeriod = new Date(lastPeriodDate);
    const cycle = parseInt(cycleLength);
    
    // Ovulation typically occurs 14 days before next period
    const ovulationDay = cycle - 14;
    const ovulationDate = new Date(lastPeriod);
    ovulationDate.setDate(lastPeriod.getDate() + ovulationDay);
    
    // Fertile window: 5 days before ovulation to 1 day after
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(ovulationDate.getDate() - 5);
    
    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(ovulationDate.getDate() + 1);
    
    // Next period date
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(lastPeriod.getDate() + cycle);

    setResults({
      ovulationDate: ovulationDate.toLocaleDateString(),
      fertileWindow: {
        start: fertileStart.toLocaleDateString(),
        end: fertileEnd.toLocaleDateString()
      },
      nextPeriod: nextPeriod.toLocaleDateString()
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-500" />
            Ovulation Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lastPeriod">Last Menstrual Period Start Date</Label>
              <Input
                id="lastPeriod"
                type="date"
                value={lastPeriodDate}
                onChange={(e) => setLastPeriodDate(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cycleLength">Menstrual Cycle Length (days)</Label>
              <Input
                id="cycleLength"
                type="number"
                min="21"
                max="35"
                value={cycleLength}
                onChange={(e) => setCycleLength(e.target.value)}
                placeholder="28"
              />
            </div>
          </div>
          
          <Button 
            onClick={calculateOvulation} 
            className="w-full"
            disabled={!lastPeriodDate || !cycleLength}
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            Calculate Ovulation
          </Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Calculation Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-pink-50 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Estimated Ovulation Date</div>
                <div className="text-lg font-semibold text-pink-600">
                  {results.ovulationDate}
                </div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Fertile Window</div>
                <div className="text-sm font-medium text-green-600">
                  {results.fertileWindow.start}
                </div>
                <div className="text-xs text-muted-foreground">to</div>
                <div className="text-sm font-medium text-green-600">
                  {results.fertileWindow.end}
                </div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Next Period</div>
                <div className="text-lg font-semibold text-blue-600">
                  {results.nextPeriod}
                </div>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground mt-4 p-3 bg-gray-50 rounded">
              <strong>Note:</strong> This calculator is based on an average 28-day cycle. Actual ovulation timing may vary due to individual differences.
              For accurate fertility guidance, please consult a healthcare professional.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
