import { FishSpecies } from './types';
import { SPECIES_PROFILES } from './species';

// Re-export types for convenience
export type { FishSpecies, SpeciesProfile, SpeciesRecommendation } from './types';

export type Conditions = {
  season: 'spring' | 'summer' | 'fall' | 'winter' | 'pre-spawn' | 'spawn' | 'post-spawn';
  waterTempF?: number;
  windMph?: number;
  wind?: 'calm' | 'light' | 'moderate' | 'strong';
  sky?: 'sunny' | 'cloudy' | 'mixed';
  temp?: number;
  clarity?: 'clear' | 'stained' | 'muddy';
  targetSpecies?: FishSpecies[];
};

export type Recommendation = {
  pattern: string;
  lures: string[];
  confidence: number;
  species?: FishSpecies;
  reasons?: string[];
  bestTimeOfDay?: string;
  waterDepth?: string;
  technique?: string;
};

export function recommend(c: Conditions): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const targetSpecies = c.targetSpecies || ['largemouth-bass', 'smallmouth-bass', 'trout'];

  // Get water temperature for species matching
  const waterTemp = c.waterTempF || c.temp || 70;

  for (const species of targetSpecies) {
    const speciesRecs = generateSpeciesRecommendations(species, c, waterTemp);
    recommendations.push(...speciesRecs);
  }

  // Sort by confidence and return top recommendations
  return recommendations
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 6); // Return top 6 recommendations
}

function generateSpeciesRecommendations(
  species: FishSpecies,
  conditions: Conditions,
  waterTemp: number
): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const profile = SPECIES_PROFILES[species];

  if (!profile) return recommendations;

  // Check if water temperature is suitable
  const tempDiff = Math.abs(waterTemp - ((profile.optimalTempRange.min + profile.optimalTempRange.max) / 2));
  const tempModifier = Math.max(0, 1 - (tempDiff / 20)); // Reduce confidence if temp is off

  // Map spawn seasons to basic seasons
  const seasonKey = conditions.season === 'pre-spawn' || conditions.season === 'spawn' || conditions.season === 'post-spawn'
    ? 'spring'
    : conditions.season;

  // Seasonal behavior matching
  const seasonalBehavior = profile.seasonalBehavior[seasonKey] || [];
  const seasonalLures = profile.lurePreferences.seasonal[seasonKey] || profile.lurePreferences.primary;

  // Wind condition impact
  let windModifier = 1;
  if (conditions.wind === 'strong') {
    windModifier = 0.7; // Strong wind reduces fishing success
  } else if (conditions.wind === 'calm') {
    windModifier = 1.1; // Calm conditions can be better
  }

  // Sky condition impact
  let skyModifier = 1;
  if (conditions.sky === 'sunny') {
    skyModifier = 0.9; // Bright sun can reduce activity
  } else if (conditions.sky === 'cloudy') {
    skyModifier = 1.1; // Overcast often better for fishing
  }

  // Generate species-specific recommendations
  if (species === 'largemouth-bass') {
    recommendations.push(...generateBassRecommendations(conditions, profile, seasonalLures, tempModifier, windModifier, skyModifier));
  } else if (species === 'smallmouth-bass') {
    recommendations.push(...generateSmallmouthRecommendations(conditions, profile, seasonalLures, tempModifier, windModifier, skyModifier));
  } else if (species === 'trout') {
    recommendations.push(...generateTroutRecommendations(conditions, profile, seasonalLures, tempModifier, windModifier, skyModifier));
  } else if (species === 'walleye') {
    recommendations.push(...generateWalleyeRecommendations(conditions, profile, seasonalLures, tempModifier, windModifier, skyModifier));
  } else if (species === 'catfish') {
    recommendations.push(...generateCatfishRecommendations(conditions, profile, seasonalLures, tempModifier, windModifier, skyModifier));
  } else if (species === 'panfish') {
    recommendations.push(...generatePanfishRecommendations(conditions, profile, seasonalLures, tempModifier, windModifier, skyModifier));
  }

  return recommendations;
}

function generateBassRecommendations(
  conditions: Conditions,
  profile: any,
  seasonalLures: string[],
  tempModifier: number,
  windModifier: number,
  skyModifier: number
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  if (conditions.season === 'spring') {
    if (conditions.wind === 'light' || conditions.wind === 'moderate') {
      recommendations.push({
        species: 'largemouth-bass',
        pattern: 'Wind-blown secondary points',
        lures: seasonalLures.slice(0, 3),
        confidence: Math.round((0.85 * tempModifier * windModifier * skyModifier) * 100) / 100,
        reasons: [
          'Wind creates current that concentrates baitfish',
          'Secondary points provide ambush positions',
          'Pre-spawn bass are aggressive and territorial'
        ],
        bestTimeOfDay: 'Midday to late afternoon',
        waterDepth: '3-8 feet',
        technique: 'Cast parallel to the point, retrieve with occasional pauses'
      });
    } else {
      recommendations.push({
        species: 'largemouth-bass',
        pattern: 'Shallow water finesse',
        lures: [
          'Wacky Stick Worm - 5", natural greens',
          'Texas rig creature - 1/8 oz, green pumpkin',
          'Small swimbait - bluegill colors'
        ],
        confidence: Math.round((0.75 * tempModifier * windModifier * skyModifier) * 100) / 100,
        reasons: [
          'Calm conditions require subtle presentations',
          'Finesse techniques work when bass are pressured',
          'Natural colors match hatchery forage'
        ],
        bestTimeOfDay: 'Dawn and dusk',
        waterDepth: '2-5 feet',
        technique: 'Slow, methodical retrieve with long pauses'
      });
    }
  } else if (conditions.season === 'summer' && (conditions.temp || 0) > 75) {
    recommendations.push({
      species: 'largemouth-bass',
      pattern: 'Deep structure fishing',
      lures: seasonalLures.slice(0, 3),
      confidence: Math.round((0.90 * tempModifier * windModifier * skyModifier) * 100) / 100,
      reasons: [
        'Hot weather pushes bass to deeper, cooler water',
        'Structure provides ambush points in deep water',
        'Summer bass are lethargic and hold tight to cover'
      ],
      bestTimeOfDay: 'Early morning or late evening',
      waterDepth: '15-25 feet',
      technique: 'Vertical jigging or slow trolling along structure'
    });
  }

  return recommendations;
}

function generateSmallmouthRecommendations(
  conditions: Conditions,
  profile: any,
  seasonalLures: string[],
  tempModifier: number,
  windModifier: number,
  skyModifier: number
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  if (conditions.season === 'spring') {
    recommendations.push({
      species: 'smallmouth-bass',
      pattern: 'River current breaks',
      lures: seasonalLures.slice(0, 3),
      confidence: Math.round((0.80 * tempModifier * windModifier * skyModifier) * 100) / 100,
      reasons: [
        'Smallmouth prefer current breaks for feeding',
        'Spring runoff creates ideal current conditions',
        'Aggressive spring feeding period'
      ],
      bestTimeOfDay: 'Midday when current is strongest',
      waterDepth: '4-8 feet',
      technique: 'Cast upstream, retrieve across current breaks'
    });
  }

  return recommendations;
}

function generateTroutRecommendations(
  conditions: Conditions,
  profile: any,
  seasonalLures: string[],
  tempModifier: number,
  windModifier: number,
  skyModifier: number
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  if (conditions.season === 'spring') {
    recommendations.push({
      species: 'trout',
      pattern: 'Nymphing riffles',
      lures: seasonalLures.slice(0, 3),
      confidence: Math.round((0.85 * tempModifier * windModifier * skyModifier) * 100) / 100,
      reasons: [
        'Spring runoff increases insect activity',
        'Trout hold in riffles during high water',
        'Natural nymph patterns match hatch'
      ],
      bestTimeOfDay: 'Mid-morning to afternoon',
      waterDepth: '2-4 feet',
      technique: 'Dead drift nymphs through riffles'
    });
  }

  return recommendations;
}

function generateWalleyeRecommendations(
  conditions: Conditions,
  profile: any,
  seasonalLures: string[],
  tempModifier: number,
  windModifier: number,
  skyModifier: number
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  if (conditions.season === 'summer') {
    recommendations.push({
      species: 'walleye',
      pattern: 'Night trolling structure',
      lures: seasonalLures.slice(0, 3),
      confidence: Math.round((0.88 * tempModifier * windModifier * skyModifier) * 100) / 100,
      reasons: [
        'Walleye are primarily nocturnal feeders',
        'Structure provides ambush points at night',
        'Summer heat drives them to deeper water'
      ],
      bestTimeOfDay: 'Dusk to dawn',
      waterDepth: '15-30 feet',
      technique: 'Slow troll along drop-offs and structure'
    });
  }

  return recommendations;
}

function generateCatfishRecommendations(
  conditions: Conditions,
    profile: any,
    seasonalLures: string[],
    tempModifier: number,
    windModifier: number,
    skyModifier: number
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];

    if (conditions.season === 'summer') {
      recommendations.push({
        species: 'catfish',
        pattern: 'Night current breaks',
        lures: seasonalLures.slice(0, 3),
        confidence: Math.round((0.82 * tempModifier * windModifier * skyModifier) * 100) / 100,
        reasons: [
          'Catfish feed primarily at night',
          'Current breaks concentrate baitfish',
          'Warm summer nights increase activity'
        ],
        bestTimeOfDay: 'After dark',
        waterDepth: '8-20 feet',
        technique: 'Bottom rig with bait, positioned in current'
      });
    }

    return recommendations;
  }

function generatePanfishRecommendations(
  conditions: Conditions,
  profile: any,
  seasonalLures: string[],
  tempModifier: number,
  windModifier: number,
  skyModifier: number
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  if (conditions.season === 'spring') {
    recommendations.push({
      species: 'panfish',
      pattern: 'Spawn bed fishing',
      lures: seasonalLures.slice(0, 3),
      confidence: Math.round((0.90 * tempModifier * windModifier * skyModifier) * 100) / 100,
      reasons: [
        'Spring spawn creates aggressive feeding',
        'Bed fishing targets territorial males',
        'Shallow water makes fish accessible'
      ],
      bestTimeOfDay: 'Midday when sun warms shallow water',
      waterDepth: '1-3 feet',
      technique: 'Small jigs hopped over visible beds'
    });
  }

  return recommendations;
}
