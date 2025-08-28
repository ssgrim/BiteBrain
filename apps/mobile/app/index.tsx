import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { DevBanner } from '../src/components/DevBanner';

// Mock recommendation type for now
interface Recommendation {
  pattern: string;
  confidence: number;
  lures: string[];
}

export default function PlanScreen() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    // Mock recommendations for now
    const mockRecs: Recommendation[] = [
      {
        pattern: 'Spring Bass Pattern',
        confidence: 0.85,
        lures: ['Spinnerbait', 'Jig', 'Crankbait']
      },
      {
        pattern: 'Shallow Water Pattern',
        confidence: 0.78,
        lures: ['Topwater', 'Soft Plastic']
      }
    ];
    
    setRecommendations(mockRecs);
  }, []);

  return (
    <View style={styles.container}>
      <DevBanner version="0.1.0-dev" />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>🎣 BiteBrain</Text>
          <Text style={styles.subtitle}>AI Fishing Assistant</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Recommendations</Text>
          {recommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationCard}>
              <Text style={styles.patternTitle}>{rec.pattern}</Text>
              <Text style={styles.confidence}>
                Confidence: {Math.round(rec.confidence * 100)}%
              </Text>
              {rec.lures.map((lure: string, i: number) => (
                <Text key={i} style={styles.lure}>• {lure}</Text>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🗺️ Map View</Text>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.placeholderText}>Interactive map coming soon</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  section: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1f2937',
  },
  recommendationCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
    paddingLeft: 12,
    marginBottom: 16,
  },
  patternTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  confidence: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  lure: {
    fontSize: 14,
    color: '#374151',
    marginTop: 4,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#6b7280',
    fontSize: 16,
  },
});
