import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { categoriesList } from '~/data';
import { RootStackParamList } from '~/types';

type ExploreNavigationProp = BottomTabNavigationProp<RootStackParamList, 'Explore'>;

const Categories = () => {
  const navigation = useNavigation<ExploreNavigationProp>();
  return (
    <View style={styles.container}>
      {categoriesList.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={styles.categoryContainer}
          onPress={() => navigation.navigate('ViewCategory', { categoryName: category.name })}>
          <Image source={category.image} className="mr-3 h-20 w-20 rounded" resizeMode="contain" />
          <Text className="font-ibm text-lg">{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    textAlign: 'center',
    margin: 10,
  },
  categoryContainer: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    padding: 3,
  },
});

export default Categories;
