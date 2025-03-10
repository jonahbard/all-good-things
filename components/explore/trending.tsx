import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Trending: React.FC = () => {
    // Just need to fetch item by popuarity here then feed it into article details 
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Trending</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Trending;
