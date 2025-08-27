import { recommend } from '../index';

describe('recommend function', () => {
  it('should return recommendations for spring conditions', () => {
    const conditions = {
      season: 'spring' as const,
      wind: 'light' as const,
      temp: 68,
      clarity: 'clear' as const,
    };

    const recommendations = recommend(conditions);

    expect(recommendations).toBeDefined();
    expect(Array.isArray(recommendations)).toBe(true);
    expect(recommendations.length).toBeGreaterThan(0);
    expect(recommendations[0]).toHaveProperty('pattern');
    expect(recommendations[0]).toHaveProperty('lures');
    expect(recommendations[0]).toHaveProperty('confidence');
  });

  it('should return different recommendations for summer conditions', () => {
    const conditions = {
      season: 'summer' as const,
      wind: 'calm' as const,
      temp: 85,
      clarity: 'clear' as const,
    };

    const recommendations = recommend(conditions);

    expect(recommendations).toBeDefined();
    expect(recommendations.length).toBeGreaterThan(0);
    
    // Should include deep structure fishing for hot summer days
    const patterns = recommendations.map(r => r.pattern);
    expect(patterns.some(p => p.includes('Deep'))).toBe(true);
  });

  it('should return fallback recommendations for unknown conditions', () => {
    const conditions = {
      season: 'winter' as const,
      wind: 'calm' as const,
      temp: 35,
      clarity: 'muddy' as const,
    };

    const recommendations = recommend(conditions);

    expect(recommendations).toBeDefined();
    expect(recommendations.length).toBeGreaterThan(0);
    // Should fall back to dock shade finesse
    expect(recommendations[0].pattern).toContain('Dock shade finesse');
  });

  it('should limit recommendations to maximum of 3', () => {
    const conditions = {
      season: 'spring' as const,
      wind: 'moderate' as const,
      temp: 65,
      clarity: 'clear' as const,
    };

    const recommendations = recommend(conditions);

    expect(recommendations.length).toBeLessThanOrEqual(3);
  });

  it('should include confidence scores', () => {
    const conditions = {
      season: 'spring' as const,
      wind: 'light' as const,
      temp: 68,
      clarity: 'clear' as const,
    };

    const recommendations = recommend(conditions);

    recommendations.forEach(rec => {
      expect(rec.confidence).toBeDefined();
      expect(typeof rec.confidence).toBe('number');
      expect(rec.confidence).toBeGreaterThan(0);
      expect(rec.confidence).toBeLessThanOrEqual(1);
    });
  });
});
