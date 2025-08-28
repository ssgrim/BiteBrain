import React, { useState, useEffect } from 'react';
import { getWaterTemperatureForSpot, WeatherService } from '@bitebrain/core';

interface WaterTempDisplayProps {
  latitude: number;
  longitude: number;
  waterBodyType: 'lake' | 'river' | 'pond' | 'creek' | 'reservoir';
  className?: string;
}

interface WaterTempData {
  current: number;
  advice: ReturnType<typeof WeatherService.getTemperatureAdvice>;
  seasonal: ReturnType<typeof WeatherService.getSeasonalTempNorms>;
}

export const WaterTempDisplay: React.FC<WaterTempDisplayProps> = ({
  latitude,
  longitude,
  waterBodyType,
  className = '',
}) => {
  const [tempData, setTempData] = useState<WaterTempData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWaterTemp = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getWaterTemperatureForSpot(latitude, longitude, waterBodyType);
        setTempData(data);
      } catch (err) {
        setError('Failed to load water temperature data');
        console.error('Water temperature fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWaterTemp();
  }, [latitude, longitude, waterBodyType]);

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case 'high': return 'text-green-600 bg-green-50';
      case 'moderate': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTempColor = (current: number, typical: number) => {
    const diff = current - typical;
    if (Math.abs(diff) <= 3) return 'text-green-600';
    if (Math.abs(diff) <= 8) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className={`${className} bg-white/90 dark:bg-bitebrain-navy/90 rounded-lg p-4 border border-bitebrain-teal/20`}>
        <div className="animate-pulse">
          <div className="h-4 bg-bitebrain-teal/20 rounded mb-2"></div>
          <div className="h-6 bg-bitebrain-teal/20 rounded mb-1"></div>
          <div className="h-3 bg-bitebrain-teal/20 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error || !tempData) {
    return (
      <div className={`${className} bg-white/90 dark:bg-bitebrain-navy/90 rounded-lg p-4 border border-bitebrain-coral/20`}>
        <div className="text-center text-bitebrain-coral">
          <div className="text-2xl mb-1">🌡️</div>
          <p className="text-sm">Water temp unavailable</p>
        </div>
      </div>
    );
  }

  const { current, advice, seasonal } = tempData;
  const tempDiff = current - seasonal.typical;

  return (
    <div className={`${className} bg-white/90 dark:bg-bitebrain-navy/90 rounded-lg p-4 border border-bitebrain-teal/20 backdrop-blur-sm`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-bitebrain-navy dark:text-bitebrain-mist">
          Water Temperature
        </h3>
        <div className="text-xs text-bitebrain-slate dark:text-bitebrain-mist bg-bitebrain-teal/10 px-2 py-1 rounded">
          {waterBodyType}
        </div>
      </div>

      {/* Current Temperature */}
      <div className="text-center mb-4">
        <div className={`text-3xl font-bold mb-1 ${getTempColor(current, seasonal.typical)}`}>
          {current}°F
        </div>
        
        {/* Comparison to seasonal norm */}
        <div className="text-xs text-bitebrain-slate dark:text-bitebrain-mist">
          {tempDiff > 0 ? '+' : ''}{tempDiff.toFixed(1)}° vs typical ({seasonal.typical}°F)
        </div>
        
        {/* Temperature range */}
        <div className="text-xs text-bitebrain-teal mt-1">
          Normal range: {seasonal.range.min}°F - {seasonal.range.max}°F
        </div>
      </div>

      {/* Fish Activity Level */}
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-3 ${getActivityColor(advice.activity)}`}>
        <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
        {advice.activity.charAt(0).toUpperCase() + advice.activity.slice(1)} Activity
      </div>

      {/* Temperature Advice */}
      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium text-bitebrain-navy dark:text-bitebrain-mist">Strategy:</span>
          <p className="text-bitebrain-slate dark:text-bitebrain-mist text-xs mt-1">
            {advice.advice}
          </p>
        </div>

        <div>
          <span className="font-medium text-bitebrain-navy dark:text-bitebrain-mist">Target Depth:</span>
          <p className="text-bitebrain-teal text-xs">
            {advice.suggestedDepth}
          </p>
        </div>

        <div>
          <span className="font-medium text-bitebrain-navy dark:text-bitebrain-mist">Fish Metabolism:</span>
          <p className="text-bitebrain-slate dark:text-bitebrain-mist text-xs">
            {advice.metabolism}
          </p>
        </div>
      </div>

      {/* Temperature Trend Indicator */}
      <div className="mt-3 pt-3 border-t border-bitebrain-teal/20">
        <div className="flex items-center justify-between text-xs">
          <span className="text-bitebrain-slate dark:text-bitebrain-mist">Temperature Impact</span>
          <div className="flex items-center space-x-1">
            {current >= 60 && current <= 75 ? (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-600">Optimal</span>
              </>
            ) : current >= 50 && current < 85 ? (
              <>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-yellow-600">Good</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-red-600">Challenging</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
