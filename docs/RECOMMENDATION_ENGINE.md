# Recommendation Engine v1

Transparent rule-based scoring. Inputs: species, season (by region & month), weather (wind, light, pressure), water temp, clarity, time-of-day, inventory.

## Weights (starter)
- Season/Spawn: 30%
- Water temp band: 15%
- Wind vs structure: 15%
- Light/time: 15%
- Pressure trend: 10%
- Clarity: 10%
- Inventory fit: 5%

## Output
Top 3 **patterns** and 2–3 **lures** each (weight, color, retrieve).

## Example rules (Largemouth)
- Pre-spawn + windy/overcast → chatterbait/spinnerbait, red/orange flat crank.
- Spawn + calm/sunny → wacky stick worm, light texas-rig creature, natural greens.
- Bluebird summer mid-day → drop shot/Ned in shade or deeper structure.

All rules live in `packages/core`. Add tests for each rule path.
