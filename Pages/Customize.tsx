import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Customize = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Customize Page!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default Customize;
