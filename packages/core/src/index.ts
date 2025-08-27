export type Conditions = {
  season: 'spring' | 'summer' | 'fall' | 'winter' | 'pre-spawn' | 'spawn' | 'post-spawn';
  waterTempF?: number;
  windMph?: number;
  wind?: 'calm' | 'light' | 'moderate' | 'strong';
  sky?: 'sunny' | 'cloudy' | 'mixed';
  temp?: number;
  clarity?: 'clear' | 'stained' | 'muddy';
};

export type Recommendation = {
  pattern: string;
  lures: string[];
  confidence: number;
};

export function recommend(c: Conditions): Recommendation[] {
  // Enhanced scoring engine for different conditions
  const recommendations: Recommendation[] = [];
  
  if (c.season === 'spring' || c.season === 'pre-spawn') {
    if (c.wind === 'light' || c.wind === 'moderate') {
      recommendations.push({
        pattern: 'Wind-blown secondary points',
        lures: [
          'Chatterbait 3/8 oz - white/chartreuse + paddletail',
          'Flat-side crank - red/orange, deflect off rock',
          'Ned 1/10 oz - green pumpkin, shake + dead-stick'
        ],
        confidence: 0.85
      });
    } else {
      recommendations.push({
        pattern: 'Shallow water finesse',
        lures: [
          'Wacky Stick Worm - 5", natural greens',
          'Texas rig creature - 1/8 oz, green pumpkin',
          'Small swimbait - bluegill colors'
        ],
        confidence: 0.75
      });
    }
  }
  
  if (c.season === 'summer' && (c.temp || 0) > 75) {
    recommendations.push({
      pattern: 'Deep structure fishing',
      lures: [
        'Dropshot 1/4 oz - 3" minnow, nose-hooked',
        'Deep diving crankbait - crawfish colors',
        'Carolina rig - 1/2 oz, creature bait'
      ],
      confidence: 0.90
    });
  }
  
  // Fallback pattern
  if (recommendations.length === 0) {
    recommendations.push({
      pattern: 'Dock shade finesse',
      lures: [
        'Wacky Stick Worm - 5", natural greens',
        'Dropshot 1/4 oz - 3" minnow, nose-hooked',
        'Swim jig 1/4 oz - bluegill colors, slow roll'
      ],
      confidence: 0.65
    });
  }
  
  return recommendations.slice(0, 3); // Return top 3 recommendations
}
