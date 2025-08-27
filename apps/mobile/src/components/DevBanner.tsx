import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

interface DevBannerProps {
  version?: string;
}

export const DevBanner: React.FC<DevBannerProps> = ({ 
  version = '0.1.0-dev' 
}) => {
  // Only show in development mode
  if (__DEV__ !== true) {
    return null;
  }

  return (
    <View style={styles.banner}>
      <Text style={styles.mainText}>
        🚧 Development Mode - BiteBrain v{version} - Work in Progress
      </Text>
      <Text style={styles.subText}>
        This is a development build. Features may be incomplete.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#B8E986', // zombie-lime
    paddingVertical: 8,
    paddingHorizontal: 16,
    paddingTop: Constants.statusBarHeight + 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2EC4B6', // sea-teal
  },
  mainText: {
    color: '#0B132B', // primary-navy
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  subText: {
    color: '#0B132B', // primary-navy
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.75,
    marginTop: 2,
  },
});
