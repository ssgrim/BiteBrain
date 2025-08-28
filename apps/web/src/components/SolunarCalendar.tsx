import React, { useState, useEffect } from 'react';
import { SolunarService, SolunarDay, SolunarPeriod } from '@bitebrain/core';

interface SolunarCalendarProps {
  latitude?: number;
  longitude?: number;
  timezone?: string;
  className?: string;
}

export const SolunarCalendar: React.FC<SolunarCalendarProps> = ({
  latitude = 39.8283, // Default to center of US
  longitude = -98.5795,
  timezone = 'America/New_York',
  className = '',
}) => {
  const [solunarData, setSolunarData] = useState<SolunarDay[]>([]);
  const [currentPeriod, setCurrentPeriod] = useState<SolunarPeriod | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSolunarData = async () => {
      setLoading(true);
      try {
        const service = new SolunarService({ latitude, longitude, timezone });
        const weekData = service.calculateWeek(selectedDate);
        setSolunarData(weekData);

        const current = service.getCurrentPeriod();
        setCurrentPeriod(current);
      } catch (error) {
        console.error('Failed to load solunar data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSolunarData();
  }, [latitude, longitude, timezone, selectedDate]);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getPeriodIcon = (type: 'major' | 'minor'): string => {
    return type === 'major' ? '🌕' : '🌖';
  };

  const getRatingColor = (rating: number): string => {
    if (rating >= 8) return 'text-green-600 bg-green-100';
    if (rating >= 6) return 'text-yellow-600 bg-yellow-100';
    if (rating >= 4) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getPeriodColor = (period: SolunarPeriod): string => {
    if (period.type === 'major') {
      return period.confidence > 0.8 ? 'bg-blue-500' : 'bg-blue-400';
    }
    return period.confidence > 0.7 ? 'bg-purple-500' : 'bg-purple-400';
  };

  const isCurrentPeriod = (period: SolunarPeriod): boolean => {
    const now = new Date();
    return now >= period.startTime && now <= period.endTime;
  };

  if (loading) {
    return (
      <div className={`${className} bg-white dark:bg-bitebrain-navy rounded-lg shadow-lg p-6`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} bg-white dark:bg-bitebrain-navy rounded-lg shadow-lg overflow-hidden`}>
      {/* Header */}
      <div className="bg-bitebrain-teal text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold flex items-center">
              🌙 Solunar Calendar
            </h2>
            <p className="text-sm opacity-90">
              Peak fishing times based on moon and sun positions
            </p>
          </div>
          {currentPeriod && (
            <div className="text-right">
              <div className="text-sm opacity-90">Current Period</div>
              <div className="font-semibold flex items-center">
                {getPeriodIcon(currentPeriod.type)} {currentPeriod.type.toUpperCase()}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Current Status */}
      {currentPeriod && (
        <div className="bg-bitebrain-teal/10 p-4 border-b border-bitebrain-teal/20">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-bitebrain-slate dark:text-bitebrain-mist">
                Active Period:
              </span>
              <span className="ml-2 font-semibold text-bitebrain-navy dark:text-bitebrain-mist">
                {getPeriodIcon(currentPeriod.type)} {currentPeriod.type.charAt(0).toUpperCase() + currentPeriod.type.slice(1)}
              </span>
            </div>
            <div className="text-right">
              <div className="text-sm text-bitebrain-slate dark:text-bitebrain-mist">
                {formatTime(currentPeriod.startTime)} - {formatTime(currentPeriod.endTime)}
              </div>
              <div className="text-xs text-bitebrain-teal">
                Peak: {formatTime(currentPeriod.peakTime)}
              </div>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-bitebrain-slate dark:text-bitebrain-mist">
              <span>Confidence: {Math.round(currentPeriod.confidence * 100)}%</span>
              <span>Moon: {currentPeriod.moonPhase} ({Math.round(currentPeriod.moonIllumination * 100)}%)</span>
            </div>
          </div>
        </div>
      )}

      {/* 7-Day Calendar */}
      <div className="p-4">
        <h3 className="font-semibold text-bitebrain-navy dark:text-bitebrain-mist mb-3">
          7-Day Forecast
        </h3>

        <div className="space-y-3">
          {solunarData.map((day, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              {/* Day Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-bitebrain-navy dark:text-bitebrain-mist">
                    {formatDate(day.date)}
                  </span>
                  {index === 0 && (
                    <span className="px-2 py-1 text-xs bg-bitebrain-teal text-white rounded-full">
                      Today
                    </span>
                  )}
                </div>
                <div className={`px-2 py-1 text-xs rounded-full ${getRatingColor(day.overallRating)}`}>
                  Rating: {Math.round(day.overallRating)}/10
                </div>
              </div>

              {/* Periods */}
              <div className="space-y-2">
                {day.periods.map((period, periodIndex) => (
                  <div
                    key={periodIndex}
                    className={`flex items-center justify-between p-2 rounded text-sm ${
                      isCurrentPeriod(period)
                        ? 'bg-bitebrain-teal/20 border border-bitebrain-teal'
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getPeriodIcon(period.type)}</span>
                      <div>
                        <div className="font-medium text-bitebrain-navy dark:text-bitebrain-mist">
                          {period.type.charAt(0).toUpperCase() + period.type.slice(1)} Period
                        </div>
                        <div className="text-xs text-bitebrain-slate dark:text-bitebrain-mist">
                          {formatTime(period.startTime)} - {formatTime(period.endTime)}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-bitebrain-slate dark:text-bitebrain-mist">
                        Peak: {formatTime(period.peakTime)}
                      </div>
                      <div className="text-xs text-bitebrain-teal">
                        {Math.round(period.confidence * 100)}% confidence
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Best Period Highlight */}
              {day.bestPeriod && (
                <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                  <div className="flex items-center text-xs text-green-700 dark:text-green-300">
                    <span className="mr-1">🎯</span>
                    <span>
                      Best period: {formatTime(day.bestPeriod.startTime)} - {formatTime(day.bestPeriod.endTime)}
                      ({Math.round(day.bestPeriod.confidence * 100)}% confidence)
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-4 text-xs text-bitebrain-slate dark:text-bitebrain-mist">
          <div className="flex items-center">
            <span className="mr-1">🌕</span>
            <span>Major Period (Strong)</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1">🌖</span>
            <span>Minor Period (Moderate)</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1">🎯</span>
            <span>Best Period</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1">📍</span>
            <span>Current Period</span>
          </div>
        </div>
      </div>
    </div>
  );
};
