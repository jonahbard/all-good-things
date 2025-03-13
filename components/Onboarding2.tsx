import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { userStore } from 'store/userStore';
import { categoriesList as categories } from '~/data';
import { RootStackParamList } from '../types'; // Adjust the import path as necessary

type Onboarding2NavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding2'>;

interface Category {
  id: number;
  name: string;
  image: any;
}

const Onboarding2: React.FC = () => {
  const navigation = useNavigation<Onboarding2NavigationProp>();
  const selectedCategories = userStore((state) => state.userSlice.categories);
  // const setCategories = userStore((state) => state.userSlice.setCategories);
  const setCategories = userStore((state) => state.userSlice.setCategories);


  const handleSelect = (categoryName: string) => {
    if (setCategories) {
      setCategories(categoryName);
    } else {
      console.error('setCategories is undefined!');
    }
  };

  const displayCategories = (category: Category): JSX.Element => {
    const isSelected = selectedCategories.includes(category.name);
    return (
      <TouchableOpacity
        key={category.id}
        className="items-center p-2"
        onPress={() => handleSelect(category.name)}>
        <Image
          source={category.image}
          className={`${isSelected ? 'border-4 border-yellow-300' : ''} h-[100px] w-[100px]`}
        />
        <Text>{category.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="absolute left-[100px] top-[-75px] h-[250px] w-full">
        <Svg width="100%" height="500" viewBox="0 0 390 316" fill="none">
          <Path
            fill="#C1E1E0"
            d="M415.5 75.9879C415.5 155.378 405.254 303.475 331.49 315.683C326.041 316.585 321.516 311.865 321.33 306.345C313.467 73.7627 35.6204 36.8132 13.7657 -9.55885C13.156 -10.8525 12.4059 -12.1639 11.4799 -13.2537C-51.8612 -87.7984 183.292 -74.0122 265.5 -74.0122C348.343 -74.0122 415.5 -6.85481 415.5 75.9879Z"
          />
        </Svg>
      </View>

      <View className="items-left flex-1 px-6">
        <Text className="mt-10 text-center font-[SourceSerif4] text-[24px] font-medium leading-[45px] tracking-[-0.48px] text-black">
          What makes you happy?
        </Text>

        <View className="absolute bottom-[100px] left-[0px] h-[250px] w-full">
          <Svg width="100%" height="500" viewBox="0 0 390 316" fill="none">
            <Path
              fill="#FC9A7A"
              d="M188.5 285C388.5 389.5 148.843 379 66 379C-16.8427 379 -84 311.843 -84 229C-84 146.157 -25 -139 26 84.5001C66 183.5 82 211.5 188.5 285Z"
            />
          </Svg>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="mt-[0] flex-col justify-center space-x-4 px-4">
            {/* Two row display */}
            <View className="flex-row">
              {categories.filter((_, index) => index % 3 === 0).map(displayCategories)}
            </View>
            <View className="flex-row">
              {categories.filter((_, index) => index % 3 === 1).map(displayCategories)}
            </View>
            <View className="flex-row">
              {categories.filter((_, index) => index % 3 === 2).map(displayCategories)}
            </View>
          </View>
        </ScrollView>

        <View className="flex-1 items-center justify-center">
          <TouchableOpacity
            onPress={() => navigation.navigate('Onboarding3')}
            className="w-[250px] items-center rounded-2xl bg-yellow-300 px-8 py-3">
            <Text className="text-lg font-bold text-black">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding2;
