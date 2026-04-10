'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Square, RotateCcw, Clock } from 'lucide-react';

interface OnlineStopwatchProps {
  lang?: string;
}

export default function OnlineStopwatch({ lang = 'en' }: OnlineStopwatchProps) {
  const isZh = lang === 'zh';
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    return {
      display: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`,
      minutes,
      seconds,
      milliseconds: ms
    };
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps(prevLaps => [...prevLaps, time]);
    }
  };

  const handleReset = () => {
    setTime(0);
    setLaps([]);
  };

  const timeFormatted = formatTime(time);
  const bestLap = laps.length > 0 ? Math.min(...laps) : null;
  const worstLap = laps.length > 0 ? Math.max(...laps) : null;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{isZh ? '秒表' : 'Stopwatch'}</h1>
        <p className="text-gray-600">{isZh ? '适用于运动与活动计时的高精度秒表，支持圈速记录' : 'Precise timing tool with lap functionality for sports and activities'}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {isZh ? '计时显示' : 'Timer Display'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="text-6xl font-mono font-bold text-primary">
              {timeFormatted.display}
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center p-3 bg-muted rounded">
                <div className="font-semibold">{timeFormatted.minutes}</div>
                <div className="text-muted-foreground">{isZh ? '分' : 'Minutes'}</div>
              </div>
              <div className="text-center p-3 bg-muted rounded">
                <div className="font-semibold">{timeFormatted.seconds}</div>
                <div className="text-muted-foreground">{isZh ? '秒' : 'Seconds'}</div>
              </div>
              <div className="text-center p-3 bg-muted rounded">
                <div className="font-semibold">{timeFormatted.milliseconds}</div>
                <div className="text-muted-foreground">{isZh ? '百分秒' : 'Centiseconds'}</div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              {!isRunning ? (
                <Button onClick={handleStart} size="lg" className="px-8">
                  <Play className="h-5 w-5 mr-2" />
                  {isZh ? '开始' : 'Start'}
                </Button>
              ) : (
                <Button onClick={handlePause} size="lg" className="px-8" variant="secondary">
                  <Pause className="h-5 w-5 mr-2" />
                  {isZh ? '暂停' : 'Pause'}
                </Button>
              )}
              
              <Button onClick={handleStop} size="lg" className="px-8" variant="destructive">
                <Square className="h-5 w-5 mr-2" />
                {isZh ? '停止' : 'Stop'}
              </Button>
            </div>

            <div className="flex justify-center gap-4">
              <Button 
                onClick={handleLap} 
                disabled={!isRunning}
                variant="outline"
                className="px-6"
              >
                {isZh ? '计圈' : 'Lap'}
              </Button>
              
              <Button 
                onClick={handleReset} 
                disabled={isRunning}
                variant="outline"
                className="px-6"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                {isZh ? '重置' : 'Reset'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{isZh ? '圈速记录' : 'Lap Times'}</CardTitle>
            {laps.length > 0 && (
              <div className="text-sm text-muted-foreground">
                {isZh ? `已记录 ${laps.length} 圈` : `${laps.length} lap${laps.length !== 1 ? 's' : ''} recorded`}
              </div>
            )}
          </CardHeader>
          <CardContent>
            {laps.length > 0 ? (
              <div className="space-y-4">
                {/* Lap Statistics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded">
                    <div className="font-semibold text-green-800 dark:text-green-200">{isZh ? '最佳圈速' : 'Best Lap'}</div>
                    <div className="font-mono text-green-700 dark:text-green-300">
                      {bestLap ? formatTime(bestLap).display : '--'}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded">
                    <div className="font-semibold text-red-800 dark:text-red-200">{isZh ? '最慢圈速' : 'Worst Lap'}</div>
                    <div className="font-mono text-red-700 dark:text-red-300">
                      {worstLap ? formatTime(worstLap).display : '--'}
                    </div>
                  </div>
                </div>

                {/* Lap List */}
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {laps.map((lapTime, index) => {
                    const isBest = lapTime === bestLap;
                    const isWorst = lapTime === worstLap && bestLap !== worstLap;
                    
                    return (
                      <div
                        key={index}
                        className={`flex justify-between items-center p-3 rounded border ${
                          isBest
                            ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                            : isWorst
                            ? 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'
                            : 'bg-muted'
                        }`}
                      >
                        <span className="font-medium">
                          {isZh ? `第 ${index + 1} 圈` : `Lap ${index + 1}`}
                          {isBest && <span className="ml-2 text-xs text-green-600">{isZh ? '最佳' : 'BEST'}</span>}
                          {isWorst && <span className="ml-2 text-xs text-red-600">{isZh ? '最慢' : 'WORST'}</span>}
                        </span>
                        <span className="font-mono">
                          {formatTime(lapTime).display}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <Button 
                  onClick={() => setLaps([])} 
                  variant="outline" 
                  className="w-full"
                  disabled={isRunning}
                >
                  {isZh ? '清除圈速' : 'Clear Laps'}
                </Button>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>{isZh ? '暂无圈速记录' : 'No lap times recorded'}</p>
                <p className="text-sm mt-2">{isZh ? '启动秒表后点击“计圈”即可记录时间' : 'Start the timer and press "Lap" to record times'}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Usage Tips */}
      <Card>
        <CardHeader>
          <CardTitle>{isZh ? '如何使用' : 'How to Use'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-blue-600 mb-2">{isZh ? '基础计时' : 'Basic Timing'}</h4>
              <div className="space-y-1 text-muted-foreground">
                {isZh ? (
                  <>
                    <div>• 点击“开始”启动计时</div>
                    <div>• 点击“暂停”可临时停止</div>
                    <div>• 点击“停止”结束并清零</div>
                  </>
                ) : (
                  <>
                    <div>• Press Start to begin timing</div>
                    <div>• Press Pause to temporarily stop</div>
                    <div>• Press Stop to end and reset</div>
                  </>
                )}
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-green-600 mb-2">{isZh ? '圈速记录' : 'Lap Recording'}</h4>
              <div className="space-y-1 text-muted-foreground">
                {isZh ? (
                  <>
                    <div>• 运行时点击“计圈”即可记录</div>
                    <div>• 最佳与最慢圈速会高亮显示</div>
                    <div>• 停止后可清除圈速</div>
                  </>
                ) : (
                  <>
                    <div>• Press Lap while running to record</div>
                    <div>• Best and worst laps are highlighted</div>
                    <div>• Clear laps when stopped</div>
                  </>
                )}
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-purple-600 mb-2">{isZh ? '精度说明' : 'Precision'}</h4>
              <div className="space-y-1 text-muted-foreground">
                {isZh ? (
                  <>
                    <div>• 精确到百分秒（0.01 秒）</div>
                    <div>• 适合运动计时</div>
                    <div>• 适合稳定记录表现</div>
                  </>
                ) : (
                  <>
                    <div>• Accurate to centiseconds (0.01s)</div>
                    <div>• Perfect for sports timing</div>
                    <div>• Reliable performance tracking</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
