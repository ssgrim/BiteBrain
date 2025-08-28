export interface FishingSpot {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  type: 'lake' | 'river' | 'pond' | 'creek' | 'reservoir';
  species: string[];
  rating: number; // 1-5 stars
  description?: string;
  depth?: string;
  structure?: string[];
  lastVisited?: Date;
  isPublic: boolean;
}

export interface WeatherConditions {
  temperature: number;
  windSpeed: number;
  windDirection: string;
  pressure: number;
  humidity: number;
  cloudCover: number;
  precipitation: number;
  waterTemp?: number;
}

export interface FishingRecommendation {
  spotId: string;
  confidence: number;
  reasons: string[];
  suggestedLures: string[];
  suggestedTechniques: string[];
  bestTimes: string[];
  weatherFactors: string[];
}

// Species-specific types
export type FishSpecies = 'largemouth-bass' | 'smallmouth-bass' | 'trout' | 'walleye' | 'catfish' | 'panfish';

export interface SpeciesProfile {
  name: string;
  scientificName: string;
  optimalTempRange: { min: number; max: number };
  spawnTempRange: { min: number; max: number };
  preferredStructure: string[];
  feedingTimes: ('dawn' | 'midday' | 'dusk' | 'night')[];
  seasonalBehavior: {
    spring: string[];
    summer: string[];
    fall: string[];
    winter: string[];
  };
  lurePreferences: {
    primary: string[];
    secondary: string[];
    seasonal: Record<string, string[]>;
  };
}

export interface SpeciesRecommendation {
  species: FishSpecies;
  pattern: string;
  lures: string[];
  confidence: number;
  reasons: string[];
  bestTimeOfDay: string;
  waterDepth: string;
  technique: string;
}
