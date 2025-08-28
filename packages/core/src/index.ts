import { FishSpecies } from './types';

// Inline SPECIES_PROFILES to avoid module resolution issues
export const SPECIES_PROFILES: Record<FishSpecies, any> = {
  'largemouth-bass': {
    name: 'Largemouth Bass',
    scientificName: 'Micropterus salmoides',
    optimalTempRange: { min: 65, max: 85 },
    spawnTempRange: { min: 60, max: 75 },
    preferredStructure: ['docks', 'points', 'drop-offs', 'brush piles', 'rocks'],
    feedingTimes: ['dawn', 'dusk', 'midday'],
    seasonalBehavior: {
      spring: ['Pre-spawn aggression', 'Moving to spawning areas', 'Defending territories'],
      summer: ['Deep structure fishing', 'Night feeding activity', 'Reaction strikes'],
      fall: ['Post-spawn recovery', 'Feeding frenzy before winter', 'Shallow water ambush'],
      winter: ['Deep water lethargy', 'Slow metabolism', 'Minimal feeding']
    },
    lurePreferences: {
      primary: [
        'Chatterbait 3/8 oz - white/chartreuse',
        'Texas rig creature bait - green pumpkin',
        'Flat-side crankbait - firetiger'
      ],
      secondary: [
        'Ned rig 1/10 oz - green pumpkin',
        'Swim jig 1/4 oz - black/blue',
        'Wacky stick worm - 7" natural colors'
      ],
      seasonal: {
        spring: [
          'Chatterbait 3/8 oz - white/chartreuse + paddletail',
          'Ned rig 1/10 oz - green pumpkin, shake + dead-stick',
          'Flat-side crank - red/orange, deflect off rock'
        ],
        summer: [
          'Dropshot 1/4 oz - 3" minnow, nose-hooked',
          'Deep diving crankbait - crawfish colors',
          'Carolina rig - 1/2 oz, creature bait'
        ],
        fall: [
          'Squarebill crankbait - chartreuse/black',
          'Soft plastic jerkbait - pumpkinseed',
          'Spinnerbait - white/chartreuse'
        ],
        winter: [
          'Dropshot 1/4 oz - finesse worms',
          'Ned rig 1/10 oz - subtle colors',
          'Small swimbait - slow presentation'
        ]
      }
    }
  },
  'smallmouth-bass': {
    name: 'Smallmouth Bass',
    scientificName: 'Micropterus dolomieu',
    optimalTempRange: { min: 60, max: 75 },
    spawnTempRange: { min: 55, max: 65 },
    preferredStructure: ['rocks', 'current breaks', 'drop-offs', 'riffles', 'points'],
    feedingTimes: ['dawn', 'midday', 'dusk'],
    seasonalBehavior: {
      spring: ['River current feeding', 'Rock structure ambush', 'Pre-spawn activity'],
      summer: ['Deep water refuge', 'Night surface activity', 'Current break feeding'],
      fall: ['Shallow rock hunting', 'Post-spawn aggression', 'Feeding migration'],
      winter: ['Deep pool holding', 'Minimal movement', 'Current seam feeding']
    },
    lurePreferences: {
      primary: [
        'Tube bait 3" - pumpkin/green',
        'Small crankbait - firetiger',
        'Drop shot rig - finesse plastics'
      ],
      secondary: [
        'Inline spinner - brass colors',
        'Soft jerkbait - shad patterns',
        'Ned rig - subtle presentations'
      ],
      seasonal: {
        spring: [
          'Tube bait 3" - pumpkin/green, drag on rocks',
          'Small crankbait - firetiger, deflect off current',
          'Drop shot rig - 3" minnow, nose-hooked'
        ],
        summer: [
          'Tube bait 3" - deeper water presentations',
          'Small swimbait - shad colors, slow retrieve',
          'Ned rig - finesse approach in current'
        ],
        fall: [
          'Topwater plug - walking dog pattern',
          'Small crankbait - aggressive retrieve',
          'Soft plastic jerkbait - erratic action'
        ],
        winter: [
          'Finesse jig head - 1/16 oz, small plastics',
          'Small tube bait - subtle colors',
          'Drop shot - minimal movement'
        ]
      }
    }
  },
  'trout': {
    name: 'Rainbow Trout',
    scientificName: 'Oncorhynchus mykiss',
    optimalTempRange: { min: 50, max: 65 },
    spawnTempRange: { min: 45, max: 55 },
    preferredStructure: ['riffles', 'runs', 'pools', 'undercut banks', 'log jams'],
    feedingTimes: ['dawn', 'midday', 'dusk'],
    seasonalBehavior: {
      spring: ['Spawn-run migration', 'Increased aggression', 'Shallow water feeding'],
      summer: ['Deep pool refuge', 'Early morning feeding', 'Insect hatches'],
      fall: ['Pre-winter feeding', 'Streamer patterns', 'Increased activity'],
      winter: ['Deep water lethargy', 'Minimal feeding', 'Pool holding']
    },
    lurePreferences: {
      primary: [
        'San Juan Worm - red/pink',
        'Pheasant Tail Nymph - size 14-18',
        'Prince Nymph - natural colors'
      ],
      secondary: [
        'Streamer fly - woolly bugger',
        'Small spinner - brass blade',
        'Egg pattern - orange/pink'
      ],
      seasonal: {
        spring: [
          'San Juan Worm - red/pink, drag on bottom',
          'Pheasant Tail Nymph - size 16, natural drift',
          'Egg pattern - orange, spawn imitation'
        ],
        summer: [
          'Pale Morning Dun - size 16, dry fly',
          'Prince Nymph - size 14, subsurface',
          'Woolly Bugger - black/olive, streamer retrieve'
        ],
        fall: [
          'Streamer fly - large, aggressive retrieve',
          'San Juan Worm - larger sizes',
          'Small crankbait - shad colors'
        ],
        winter: [
          'San Juan Worm - smaller sizes, slow presentation',
          'Egg pattern - subtle colors',
          'Small jig - minimal movement'
        ]
      }
    }
  },
  'walleye': {
    name: 'Walleye',
    scientificName: 'Sander vitreus',
    optimalTempRange: { min: 55, max: 70 },
    spawnTempRange: { min: 40, max: 50 },
    preferredStructure: ['drop-offs', 'points', 'rock piles', 'current breaks', 'ledges'],
    feedingTimes: ['dusk', 'night', 'dawn'],
    seasonalBehavior: {
      spring: ['Post-spawn recovery', 'Shallow feeding', 'Current break positioning'],
      summer: ['Deep water structure', 'Night feeding activity', 'Wind-blown points'],
      fall: ['Shallow water migration', 'Pre-winter feeding', 'Structure hugging'],
      winter: ['Deep basin holding', 'Minimal movement', 'Current seam feeding']
    },
    lurePreferences: {
      primary: [
        'Jig head 1/4 oz - minnow/plastic tail',
        'Bottom bouncer rig - spinner/minnow',
        'Slip sinker rig - nightcrawler'
      ],
      secondary: [
        'Crankbait - firetiger pattern',
        'Soft plastic jerkbait - shad colors',
        'Blade bait - silver/gold'
      ],
      seasonal: {
        spring: [
          'Jig head 1/4 oz - minnow tail, hop on bottom',
          'Crankbait - firetiger, deflect off structure',
          'Soft plastic jerkbait - erratic action'
        ],
        summer: [
          'Bottom bouncer - spinner and minnow, slow troll',
          'Jig head - finesse plastics, vertical jigging',
          'Crankbait - deeper diving models'
        ],
        fall: [
          'Blade bait - silver, ripping retrieve',
          'Jig head - larger plastics, aggressive hop',
          'Crankbait - wounded minnow action'
        ],
        winter: [
          'Jig head 1/8 oz - small plastics, subtle movement',
          'Bottom bouncer - slow presentation',
          'Vertical jigging - minimal action'
        ]
      }
    }
  },
  'catfish': {
    name: 'Channel Catfish',
    scientificName: 'Ictalurus punctatus',
    optimalTempRange: { min: 70, max: 85 },
    spawnTempRange: { min: 75, max: 85 },
    preferredStructure: ['deep holes', 'current breaks', 'log jams', 'rock piles', 'dams'],
    feedingTimes: ['dusk', 'night', 'dawn'],
    seasonalBehavior: {
      spring: ['Post-winter feeding', 'Shallow water activity', 'Pre-spawn feeding'],
      summer: ['Deep water refuge', 'Night feeding activity', 'Current break positioning'],
      fall: ['Heavy feeding phase', 'Shallow water migration', 'Structure hugging'],
      winter: ['Deep hole holding', 'Minimal feeding', 'Current seam positioning']
    },
    lurePreferences: {
      primary: [
        'Cut bait rig - shad/chicken liver',
        'Nightcrawler rig - slip sinker setup',
        'Stink bait - commercial preparations'
      ],
      secondary: [
        'Minnow rig - live bait presentation',
        'Soft plastic - large creature baits',
        'Spinner - brass blade, slow retrieve'
      ],
      seasonal: {
        spring: [
          'Cut bait rig - fresh shad, bottom presentation',
          'Nightcrawler - slip sinker, drift with current',
          'Minnow rig - live presentation'
        ],
        summer: [
          'Stink bait - commercial, strong scent trail',
          'Cut bait - chicken liver, strong presentation',
          'Nightcrawler - larger size, deep water'
        ],
        fall: [
          'Cut bait - shad fillets, aggressive presentation',
          'Minnow rig - larger minnows',
          'Soft plastic - large creature baits'
        ],
        winter: [
          'Stink bait - strong scent, minimal movement',
          'Cut bait - smaller pieces, patient presentation',
          'Nightcrawler - smaller size, subtle movement'
        ]
      }
    }
  },
  'panfish': {
    name: 'Bluegill/Crappie',
    scientificName: 'Lepomis macrochirus',
    optimalTempRange: { min: 65, max: 80 },
    spawnTempRange: { min: 65, max: 75 },
    preferredStructure: ['brush piles', 'docks', 'lily pads', 'drop-offs', 'shallow flats'],
    feedingTimes: ['midday', 'dawn', 'dusk'],
    seasonalBehavior: {
      spring: ['Spawn bed building', 'Aggressive feeding', 'Shallow water activity'],
      summer: ['Deep water refuge', 'Brush pile feeding', 'Midday activity'],
      fall: ['Post-spawn recovery', 'Heavy feeding', 'Shallow water migration'],
      winter: ['Deep water holding', 'Minimal feeding', 'Structure hugging']
    },
    lurePreferences: {
      primary: [
        'Tube jig 1/16 oz - chartreuse/white',
        'Small spinner - brass blade',
        'Worm 3" - red/pink, wacky rig'
      ],
      secondary: [
        'Cricket/minnow - live bait',
        'Small crankbait - shad colors',
        'Soft plastic - small creature baits'
      ],
      seasonal: {
        spring: [
          'Tube jig 1/16 oz - chartreuse, hop on beds',
          'Small spinner - brass, retrieve over nests',
          'Worm 3" - red, wacky rig presentation'
        ],
        summer: [
          'Tube jig - deeper water, vertical presentation',
          'Small crankbait - shad, slow retrieve',
          'Soft plastic - finesse presentation'
        ],
        fall: [
          'Small spinner - aggressive retrieve',
          'Crankbait - firetiger pattern',
          'Tube jig - larger sizes, fast fall'
        ],
        winter: [
          'Tube jig 1/32 oz - subtle colors, slow hop',
          'Small spinner - minimal flash',
          'Worm - small sizes, subtle presentation'
        ]
      }
    }
  }
};

export function getSpeciesProfile(species: FishSpecies): any {
  return SPECIES_PROFILES[species];
}

export function getAllSpecies(): FishSpecies[] {
  return Object.keys(SPECIES_PROFILES) as FishSpecies[];
}

export function getSpeciesForConditions(conditions: any): FishSpecies[] {
  const { season, temp = 70, waterTemp = 70 } = conditions;
  const suitableSpecies: FishSpecies[] = [];

  for (const [speciesKey, profile] of Object.entries(SPECIES_PROFILES)) {
    const species = speciesKey as FishSpecies;

    // Check if water temperature is suitable
    if (waterTemp < profile.optimalTempRange.min - 10 || waterTemp > profile.optimalTempRange.max + 10) {
      continue; // Skip if temperature is way off
    }

    // Species-specific seasonal preferences
    if (season === 'spring' && profile.seasonalBehavior.spring.some((behavior: string) =>
      behavior.includes('spawn') || behavior.includes('aggression'))) {
      suitableSpecies.push(species);
    } else if (season === 'summer' && profile.seasonalBehavior.summer.some((behavior: string) =>
      behavior.includes('deep') || behavior.includes('structure'))) {
      suitableSpecies.push(species);
    } else if (season === 'fall' && profile.seasonalBehavior.fall.some((behavior: string) =>
      behavior.includes('feeding') || behavior.includes('migration'))) {
      suitableSpecies.push(species);
    } else if (season === 'winter' && profile.seasonalBehavior.winter.some((behavior: string) =>
      behavior.includes('deep') || behavior.includes('minimal'))) {
      suitableSpecies.push(species);
    } else {
      // Default suitability
      suitableSpecies.push(species);
    }
  }

  return suitableSpecies;
}

// Re-export types for convenience
export type { FishSpecies, SpeciesProfile, SpeciesRecommendation, FishingSpot, WeatherConditions } from './types';
export type { OfflineRegion, OfflineTile } from './offline-maps';
export type { SolunarPeriod, SolunarDay, SolunarConfig } from './solunar';
export { OfflineMapService, offlineMapService } from './offline-maps';
export { SolunarService } from './solunar';
export { WeatherService, getWaterTemperatureForSpot } from './weather';
export { getFishingSpotsInRadius } from './spots';

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
