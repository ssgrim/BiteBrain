export interface SolunarPeriod {
  type: 'major' | 'minor';
  startTime: Date;
  endTime: Date;
  peakTime: Date;
  confidence: number; // 0-1, how strong this period is
  moonPhase: string;
  moonIllumination: number; // 0-1
}

export interface SolunarDay {
  date: Date;
  periods: SolunarPeriod[];
  overallRating: number; // 0-10, overall fishing quality for the day
  bestPeriod?: SolunarPeriod;
  moonrise?: Date;
  moonset?: Date;
  sunrise: Date;
  sunset: Date;
}

export interface SolunarConfig {
  latitude: number;
  longitude: number;
  timezone: string;
}

export class SolunarService {
  private config: SolunarConfig;

  constructor(config: SolunarConfig) {
    this.config = config;
  }

  /**
   * Calculate solunar data for a specific date
   */
  calculateDay(date: Date): SolunarDay {
    const day = new Date(date);
    day.setHours(0, 0, 0, 0);

    // Get moon phase and illumination
    const moonData = this.calculateMoonPhase(day);
    const sunData = this.calculateSunTimes(day);

    // Calculate major and minor periods
    const periods = this.calculateSolunarPeriods(day, moonData, sunData);

    // Calculate overall rating
    const overallRating = this.calculateOverallRating(periods, moonData);

    return {
      date: day,
      periods,
      overallRating,
      bestPeriod: this.findBestPeriod(periods),
      moonrise: moonData.moonrise,
      moonset: moonData.moonset,
      sunrise: sunData.sunrise,
      sunset: sunData.sunset
    };
  }

  /**
   * Calculate solunar periods for multiple days
   */
  calculateWeek(startDate: Date): SolunarDay[] {
    const days: SolunarDay[] = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < 7; i++) {
      days.push(this.calculateDay(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  }

  /**
   * Get current solunar period
   */
  getCurrentPeriod(): SolunarPeriod | null {
    const now = new Date();
    const today = this.calculateDay(now);

    return today.periods.find(period =>
      now >= period.startTime && now <= period.endTime
    ) || null;
  }

  private calculateMoonPhase(date: Date): {
    phase: string;
    illumination: number;
    moonrise?: Date;
    moonset?: Date;
  } {
    // Simplified moon phase calculation
    // In production, you'd use a more accurate astronomical library
    const daysSinceNewMoon = this.daysSinceNewMoon(date);
    const phase = (daysSinceNewMoon % 29.53) / 29.53;

    let phaseName: string;
    let illumination: number;

    if (phase < 0.125) {
      phaseName = 'New Moon';
      illumination = 0;
    } else if (phase < 0.375) {
      phaseName = 'First Quarter';
      illumination = phase * 4;
    } else if (phase < 0.625) {
      phaseName = 'Full Moon';
      illumination = 1;
    } else if (phase < 0.875) {
      phaseName = 'Last Quarter';
      illumination = (1 - phase) * 4;
    } else {
      phaseName = 'New Moon';
      illumination = 0;
    }

    return {
      phase: phaseName,
      illumination,
      moonrise: this.calculateMoonRiseSet(date, 'rise'),
      moonset: this.calculateMoonRiseSet(date, 'set')
    };
  }

  private calculateSunTimes(date: Date): {
    sunrise: Date;
    sunset: Date;
  } {
    // Simplified sunrise/sunset calculation
    // In production, use a proper astronomical library like suncalc
    const { latitude, longitude } = this.config;
    const dayOfYear = this.getDayOfYear(date);

    // Rough calculation - replace with proper astronomical formulas
    const solarNoon = 12 - longitude / 15; // Hours
    const declination = 23.45 * Math.sin(this.degreesToRadians(360 * (284 + dayOfYear) / 365));

    const hourAngle = this.radiansToDegrees(
      Math.acos(
        Math.tan(this.degreesToRadians(latitude)) * Math.tan(this.degreesToRadians(declination))
      )
    ) / 15;

    const sunrise = solarNoon - hourAngle;
    const sunset = solarNoon + hourAngle;

    return {
      sunrise: new Date(date.getFullYear(), date.getMonth(), date.getDate(),
                       Math.floor(sunrise), (sunrise % 1) * 60),
      sunset: new Date(date.getFullYear(), date.getMonth(), date.getDate(),
                      Math.floor(sunset), (sunset % 1) * 60)
    };
  }

  private calculateSolunarPeriods(
    date: Date,
    moonData: any,
    sunData: any
  ): SolunarPeriod[] {
    const periods: SolunarPeriod[] = [];

    // Major periods occur around moonrise/moonset and sunrise/sunset
    const referenceTimes = [
      sunData.sunrise,
      sunData.sunset,
      moonData.moonrise,
      moonData.moonset
    ].filter(time => time !== undefined);

    // Create major periods (2 hours around each reference time)
    referenceTimes.forEach((referenceTime, index) => {
      const startTime = new Date(referenceTime.getTime() - 60 * 60 * 1000); // 1 hour before
      const endTime = new Date(referenceTime.getTime() + 60 * 60 * 1000); // 1 hour after
      const peakTime = referenceTime;

      periods.push({
        type: 'major',
        startTime,
        endTime,
        peakTime,
        confidence: this.calculatePeriodConfidence(moonData.illumination, index),
        moonPhase: moonData.phase,
        moonIllumination: moonData.illumination
      });
    });

    // Create minor periods (between major periods)
    if (periods.length >= 2) {
      for (let i = 0; i < periods.length - 1; i++) {
        const major1 = periods[i];
        const major2 = periods[i + 1];

        // Minor period is halfway between two major periods
        const minorPeak = new Date((major1.peakTime.getTime() + major2.peakTime.getTime()) / 2);
        const minorStart = new Date(minorPeak.getTime() - 45 * 60 * 1000); // 45 minutes before
        const minorEnd = new Date(minorPeak.getTime() + 45 * 60 * 1000); // 45 minutes after

        periods.push({
          type: 'minor',
          startTime: minorStart,
          endTime: minorEnd,
          peakTime: minorPeak,
          confidence: 0.6, // Minor periods are less strong
          moonPhase: moonData.phase,
          moonIllumination: moonData.illumination
        });
      }
    }

    return periods.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  }

  private calculatePeriodConfidence(moonIllumination: number, periodIndex: number): number {
    // Confidence based on moon illumination and period type
    // Full moon periods are strongest, new moon periods are weaker
    const baseConfidence = moonIllumination > 0.5 ? 0.9 : 0.7;

    // Adjust based on period position (some periods are naturally stronger)
    const positionBonus = [0.1, 0.05, 0.08, 0.03][periodIndex] || 0;

    return Math.min(1.0, baseConfidence + positionBonus);
  }

  private calculateOverallRating(periods: SolunarPeriod[], moonData: any): number {
    // Overall rating based on number of strong periods and moon phase
    const strongPeriods = periods.filter(p => p.confidence > 0.8).length;
    const moonBonus = moonData.illumination > 0.25 && moonData.illumination < 0.75 ? 2 : 0;

    return Math.min(10, (strongPeriods * 2) + moonBonus + 3); // Base rating of 3
  }

  private findBestPeriod(periods: SolunarPeriod[]): SolunarPeriod | undefined {
    return periods.reduce((best, current) =>
      !best || current.confidence > best.confidence ? current : best
    );
  }

  // Utility methods
  private daysSinceNewMoon(date: Date): number {
    // Simplified calculation - replace with proper astronomical formula
    const newMoon2024 = new Date(2024, 2, 10); // March 10, 2024 new moon
    return Math.floor((date.getTime() - newMoon2024.getTime()) / (24 * 60 * 60 * 1000));
  }

  private calculateMoonRiseSet(date: Date, type: 'rise' | 'set'): Date | undefined {
    // Simplified calculation - replace with proper astronomical library
    const { latitude, longitude } = this.config;
    const dayOfYear = this.getDayOfYear(date);

    // Rough approximation - in production use a proper library
    const baseHour = type === 'rise' ? 6 : 18;
    const adjustment = longitude / 15; // Time zone adjustment

    return new Date(date.getFullYear(), date.getMonth(), date.getDate(),
                   Math.floor(baseHour + adjustment), 0);
  }

  private getDayOfYear(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / (24 * 60 * 60 * 1000));
  }

  private degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  private radiansToDegrees(radians: number): number {
    return radians * (180 / Math.PI);
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<SolunarConfig>): void {
    this.config = { ...this.config, ...config };
  }
}
