import Onboarding1 from 'components/Onboarding1';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const OnboardingScreen = () => {
  return (
    <View style={styles.container}>
      <Onboarding1 />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default OnboardingScreen;
