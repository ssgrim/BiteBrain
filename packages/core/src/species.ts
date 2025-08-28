import { FishSpecies, SpeciesProfile } from './types';

export const SPECIES_PROFILES: Record<FishSpecies, SpeciesProfile> = {
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

export function getSpeciesProfile(species: FishSpecies): SpeciesProfile {
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
    if (season === 'spring' && profile.seasonalBehavior.spring.some(behavior =>
      behavior.includes('spawn') || behavior.includes('aggression'))) {
      suitableSpecies.push(species);
    } else if (season === 'summer' && profile.seasonalBehavior.summer.some(behavior =>
      behavior.includes('deep') || behavior.includes('structure'))) {
      suitableSpecies.push(species);
    } else if (season === 'fall' && profile.seasonalBehavior.fall.some(behavior =>
      behavior.includes('feeding') || behavior.includes('migration'))) {
      suitableSpecies.push(species);
    } else if (season === 'winter' && profile.seasonalBehavior.winter.some(behavior =>
      behavior.includes('deep') || behavior.includes('minimal'))) {
      suitableSpecies.push(species);
    } else {
      // Default suitability
      suitableSpecies.push(species);
    }
  }

  return suitableSpecies;
}
