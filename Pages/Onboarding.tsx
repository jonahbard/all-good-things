import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Onboarding = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to onboarding!</Text>
      <Text style={styles.subtitle}>Let's get started with the onboarding process.</Text>
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

export default Onboarding;
