import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { categoriesList } from '~/data';

const Categories = () => {
  return (
    <View style={styles.container}>
      {categoriesList.map((category, index) => (
        <View key={index} style={styles.categoryContainer}>
          <Image source={category.image} className="mr-3 h-8 w-8" resizeMode="contain" />
          <Text>{category.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  categoryContainer: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    padding: 16,
  },
});

export default Categories;
