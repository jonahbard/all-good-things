import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';

import { RootStackParamList } from '../types';

type Onboarding3NavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding2'>;
interface Source {
  id: number;
  name: string;
  image: any;
}
const Onboarding3: React.FC = () => {
  const navigation = useNavigation<Onboarding3NavigationProp>();
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const sources = [
    { id: 1, name: 'Science', image: require('../assets/categories/science.png') },
    { id: 2, name: 'Nature', image: require('../assets/categories/nature.png') },
    { id: 3, name: 'Space', image: require('../assets/categories/space.png') },
    { id: 4, name: 'Animals', image: require('../assets/categories/animal.png') },
    { id: 5, name: 'Kindness', image: require('../assets/categories/default.png') },
    { id: 6, name: 'Art', image: require('../assets/categories/default.png') },
    { id: 7, name: 'Health', image: require('../assets/categories/default.png') },
    { id: 8, name: 'Environment', image: require('../assets/categories/default.png') },
    { id: 9, name: 'Archaeology', image: require('../assets/categories/default.png') },
    { id: 10, name: 'Dinosaurs', image: require('../assets/categories/default.png') },
    { id: 11, name: 'History', image: require('../assets/categories/default.png') },
    { id: 12, name: 'Discovery', image: require('../assets/categories/default.png') },
    { id: 13, name: 'Heartwarming', image: require('../assets/categories/default.png') },
    { id: 14, name: 'Inspiring', image: require('../assets/categories/default.png') },
    { id: 15, name: 'Friendship', image: require('../assets/categories/default.png') },
    { id: 16, name: 'Community', image: require('../assets/categories/default.png') },
    { id: 17, name: 'Charity', image: require('../assets/categories/default.png') },
    { id: 18, name: 'Sustainability', image: require('../assets/categories/default.png') },
    { id: 19, name: 'Social Progress', image: require('../assets/categories/default.png') },
    { id: 20, name: 'Sports', image: require('../assets/categories/default.png') },
    { id: 21, name: 'Technology', image: require('../assets/categories/default.png') },
    { id: 22, name: 'Education', image: require('../assets/categories/default.png') },
    { id: 23, name: 'Fashion', image: require('../assets/categories/default.png') },
    { id: 24, name: 'Music', image: require('../assets/categories/default.png') },
  ];

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboardingComplete', 'true');
      navigation.navigate('Tabs'); // cannot use replace home as it is a tab navigator (note to self)
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };
  const handleSelect = (categoryName: string) => {
    if (selectedSources.includes(categoryName)) {
      // handles deselct
      const newList = selectedSources.filter((name) => name !== categoryName);
      setSelectedSources(newList);
    } else {
      // select the category
      setSelectedSources([...selectedSources, categoryName]);
    }
  };

  const displayCategories = (source: Source): JSX.Element => {
    const isSelected = selectedSources.includes(source.name);
    return (
      <TouchableOpacity
        key={source.id}
        className="items-center p-2"
        onPress={() => handleSelect(source.name)}>
        <Image
          source={source.image}
          style={[
            { height: 100, width: 100 },
            isSelected && { borderWidth: 4, borderColor: 'yellow' },
          ]}
        />
        <Text>{source.name}</Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text className="z-50 mt-10 text-center font-[SourceSerif4] text-[24px] font-medium leading-[45px] tracking-[-0.48px] text-black">
        Which news sources you follow?
      </Text>
      <View className="absolute left-[-5px] top-[-75px] h-[250px] w-full">
        <Svg width="100%" height="500" viewBox="0 0 390 316" fill="none">
          <Path
            fill="#FECC5F"
            d="M-75.9998 83.743C-75.9998 166.586 -66.4998 337 4.50018 337C4.50018 86.2567 299.344 28.5 320 -8.50044C365.5 -90 156.843 -66.257 74.0002 -66.257C-8.8425 -66.257 -75.9998 0.900314 -75.9998 83.743Z"
          />
        </Svg>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="mt-[0] flex-col justify-center space-x-4 px-4">
          <View className="flex-row">
            {sources.filter((_, index) => index % 3 === 0).map(displayCategories)}
          </View>
          <View className="flex-row">
            {sources.filter((_, index) => index % 3 === 1).map(displayCategories)}
          </View>
          <View className="flex-row">
            {sources.filter((_, index) => index % 3 === 2).map(displayCategories)}
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-[200px] right-[-40px] h-[250px] w-full">
        <Svg width="100%" height="500" viewBox="0 0 390 316" fill="none">
          <Path
            fill="#66858A"
            d="M362 261.5C371 184 371 152.5 349.5 0C317 236.5 103 270 9.99977 351.757C-49.0001 396 184 351.757 248.5 412.257C349.5 351.757 362 344.343 362 261.5Z"
          />
        </Svg>
      </View>
      <View className="flex-1 items-center justify-center">
        <TouchableOpacity
          onPress={completeOnboarding}
          className="w-[250px] items-center rounded-2xl bg-yellow-300 px-8 py-3">
          <Text className="text-lg font-bold text-black">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    color: '#333',
  },
});

export default Onboarding3;
