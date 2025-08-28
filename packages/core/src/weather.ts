import { WeatherConditions } from './types';
import { SolunarService, SolunarPeriod } from './solunar';

// Mock weather data service - in production this would connect to real APIs
export class WeatherService {
  private static mockData: Record<string, WeatherConditions> = {
    'default': {
      temperature: 72,
      windSpeed: 8,
      windDirection: 'SW',
      pressure: 29.92,
      humidity: 65,
      cloudCover: 30,
      precipitation: 0,
      waterTemp: 68,
    },
    'cold-front': {
      temperature: 45,
      windSpeed: 15,
      windDirection: 'N',
      pressure: 30.15,
      humidity: 45,
      cloudCover: 80,
      precipitation: 0,
      waterTemp: 52,
    },
    'summer-hot': {
      temperature: 88,
      windSpeed: 5,
      windDirection: 'S',
      pressure: 29.85,
      humidity: 75,
      cloudCover: 10,
      precipitation: 0,
      waterTemp: 78,
    },
  };

  static async getWeatherForLocation(
    latitude: number,
    longitude: number
  ): Promise<WeatherConditions> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock data based on season/location
    const season = WeatherService.getCurrentSeason();
    
    if (season === 'winter') {
      return WeatherService.mockData['cold-front'];
    } else if (season === 'summer') {
      return WeatherService.mockData['summer-hot'];
    }
    
    return WeatherService.mockData['default'];
  }

  static async getWaterTemperature(
    latitude: number,
    longitude: number,
    waterBodyType: 'lake' | 'river' | 'pond' | 'creek' | 'reservoir'
  ): Promise<number> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const season = WeatherService.getCurrentSeason();
    const baseTemp = WeatherService.getSeasonalBaseTemp(season);
    
    // Adjust for water body type
    const typeAdjustment = WeatherService.getWaterBodyTempAdjustment(waterBodyType);
    
    // Add some realistic variation
    const variation = (Math.random() - 0.5) * 8; // ±4 degrees
    
    return Math.round(baseTemp + typeAdjustment + variation);
  }

  private static getCurrentSeason(): 'spring' | 'summer' | 'fall' | 'winter' {
    const month = new Date().getMonth() + 1; // 1-12
    
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'fall';
    return 'winter';
  }

  private static getSeasonalBaseTemp(season: string): number {
    switch (season) {
      case 'spring': return 58;
      case 'summer': return 75;
      case 'fall': return 62;
      case 'winter': return 42;
      default: return 60;
    }
  }

  private static getWaterBodyTempAdjustment(type: string): number {
    switch (type) {
      case 'pond': return 3; // Shallow, warms faster
      case 'creek': return -2; // Moving water, cooler
      case 'river': return -1; // Moving water, slightly cooler
      case 'reservoir': return 1; // Deep but managed
      case 'lake': return 0; // Baseline
      default: return 0;
    }
  }

  static getTemperatureAdvice(waterTemp: number): {
    activity: 'high' | 'moderate' | 'low';
    advice: string;
    suggestedDepth: string;
    metabolism: string;
  } {
    if (waterTemp < 45) {
      return {
        activity: 'low',
        advice: 'Fish are sluggish. Use slow presentations and smaller baits.',
        suggestedDepth: 'Deep water, 15-30 feet',
        metabolism: 'Very slow - fish need fewer calories'
      };
    } else if (waterTemp < 55) {
      return {
        activity: 'low',
        advice: 'Pre-spawn conditions. Fish are moving but still slow.',
        suggestedDepth: 'Medium depth, 8-15 feet',
        metabolism: 'Slow - use finesse techniques'
      };
    } else if (waterTemp < 65) {
      return {
        activity: 'moderate',
        advice: 'Good fishing conditions. Fish are becoming more active.',
        suggestedDepth: 'Shallow to medium, 5-12 feet',
        metabolism: 'Moderate - fish are feeding regularly'
      };
    } else if (waterTemp < 75) {
      return {
        activity: 'high',
        advice: 'Excellent fishing! Peak activity for most species.',
        suggestedDepth: 'Shallow water, 2-8 feet',
        metabolism: 'High - aggressive feeding periods'
      };
    } else if (waterTemp < 85) {
      return {
        activity: 'moderate',
        advice: 'Hot water - fish early morning and late evening.',
        suggestedDepth: 'Deeper structure, 12-25 feet',
        metabolism: 'High but seeking cooler areas'
      };
    } else {
      return {
        activity: 'low',
        advice: 'Very hot water. Fish are stressed and inactive.',
        suggestedDepth: 'Deepest available water, 20+ feet',
        metabolism: 'Stressed - fish are conserving energy'
      };
    }
  }

  static getSeasonalTempNorms(month: number): {
    typical: number;
    range: { min: number; max: number };
  } {
    const norms: Record<number, { typical: number; range: { min: number; max: number } }> = {
      1: { typical: 38, range: { min: 32, max: 45 } },  // January
      2: { typical: 42, range: { min: 35, max: 48 } },  // February
      3: { typical: 48, range: { min: 42, max: 55 } },  // March
      4: { typical: 55, range: { min: 48, max: 62 } },  // April
      5: { typical: 65, range: { min: 58, max: 72 } },  // May
      6: { typical: 72, range: { min: 68, max: 78 } },  // June
      7: { typical: 78, range: { min: 75, max: 82 } },  // July
      8: { typical: 82, range: { min: 78, max: 85 } },  // August
      9: { typical: 75, range: { min: 68, max: 80 } },  // September
      10: { typical: 65, range: { min: 58, max: 72 } }, // October
      11: { typical: 52, range: { min: 45, max: 58 } }, // November
      12: { typical: 42, range: { min: 35, max: 48 } }, // December
    };
    
    return norms[month] || norms[new Date().getMonth() + 1];
  }

  /**
   * Calculate solunar impact on fishing conditions
   */
  static getSolunarImpact(
    latitude: number,
    longitude: number,
    timezone: string = 'America/New_York'
  ): {
    currentPeriod: SolunarPeriod | null;
    impact: number; // -1 to 1, negative = worse fishing, positive = better fishing
    description: string;
    confidence: number;
  } {
    const solunarService = new SolunarService({ latitude, longitude, timezone });
    const currentPeriod = solunarService.getCurrentPeriod();

    if (!currentPeriod) {
      return {
        currentPeriod: null,
        impact: 0,
        description: 'No significant solunar activity',
        confidence: 0.5
      };
    }

    // Calculate impact based on period type and confidence
    let impact = 0;
    let description = '';

    if (currentPeriod.type === 'major') {
      impact = currentPeriod.confidence * 0.8; // Major periods boost fishing by up to 80%
      description = `Major solunar period (${Math.round(currentPeriod.confidence * 100)}% confidence)`;
    } else {
      impact = currentPeriod.confidence * 0.4; // Minor periods boost fishing by up to 40%
      description = `Minor solunar period (${Math.round(currentPeriod.confidence * 100)}% confidence)`;
    }

    // Adjust impact based on moon phase
    if (currentPeriod.moonIllumination > 0.75 || currentPeriod.moonIllumination < 0.25) {
      impact *= 1.2; // Full/new moon periods are stronger
      description += ' - Strong moon phase';
    }

    return {
      currentPeriod,
      impact: Math.min(1, impact),
      description,
      confidence: currentPeriod.confidence
    };
  }

  /**
   * Get comprehensive fishing conditions including solunar data
   */
  static async getFishingConditions(
    latitude: number,
    longitude: number,
    waterBodyType: 'lake' | 'river' | 'pond' | 'creek' | 'reservoir',
    timezone: string = 'America/New_York'
  ): Promise<{
    weather: WeatherConditions;
    waterTemp: {
      current: number;
      advice: ReturnType<typeof WeatherService.getTemperatureAdvice>;
      seasonal: ReturnType<typeof WeatherService.getSeasonalTempNorms>;
    };
    solunar: ReturnType<typeof WeatherService.getSolunarImpact>;
    overallRating: number; // 0-10 overall fishing quality
    factors: string[]; // Key factors affecting fishing
  }> {
    const [weather, waterTempData] = await Promise.all([
      WeatherService.getWeatherForLocation(latitude, longitude),
      getWaterTemperatureForSpot(latitude, longitude, waterBodyType)
    ]);

    const solunar = WeatherService.getSolunarImpact(latitude, longitude, timezone);

    // Calculate overall rating
    let overallRating = 5; // Base rating
    const factors: string[] = [];

    // Temperature impact (40% weight)
    const tempRating = waterTempData.advice.activity === 'high' ? 3 :
                       waterTempData.advice.activity === 'moderate' ? 1.5 : 0;
    overallRating += tempRating * 0.4;
    factors.push(`Water temp: ${waterTempData.advice.activity} activity`);

    // Solunar impact (30% weight)
    overallRating += solunar.impact * 3;
    factors.push(`Solunar: ${solunar.description}`);

    // Weather impact (20% weight)
    const weatherRating = weather.windSpeed < 10 ? 1 :
                         weather.windSpeed < 20 ? 0.5 : -0.5;
    overallRating += weatherRating;
    factors.push(`Weather: ${weatherRating > 0 ? 'favorable' : 'challenging'}`);

    // Pressure impact (10% weight)
    const pressureRating = weather.pressure > 30.0 ? 0.5 :
                          weather.pressure < 29.8 ? -0.5 : 0;
    overallRating += pressureRating;
    factors.push(`Pressure: ${pressureRating > 0 ? 'rising' : pressureRating < 0 ? 'falling' : 'steady'}`);

    return {
      weather,
      waterTemp: waterTempData,
      solunar,
      overallRating: Math.max(0, Math.min(10, overallRating)),
      factors
    };
  }
}

export const getWaterTemperatureForSpot = async (
  latitude: number,
  longitude: number,
  waterBodyType: 'lake' | 'river' | 'pond' | 'creek' | 'reservoir'
): Promise<{
  current: number;
  advice: ReturnType<typeof WeatherService.getTemperatureAdvice>;
  seasonal: ReturnType<typeof WeatherService.getSeasonalTempNorms>;
}> => {
  const current = await WeatherService.getWaterTemperature(latitude, longitude, waterBodyType);
  const advice = WeatherService.getTemperatureAdvice(current);
  const seasonal = WeatherService.getSeasonalTempNorms(new Date().getMonth() + 1);
  
  return { current, advice, seasonal };
};
