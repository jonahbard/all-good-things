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

import { userStore } from '~/store/userStore';

type Onboarding3NavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding2'>;
interface Source {
  id: number;
  name: string;
  image: any;
}
const Onboarding3: React.FC = () => {
  const navigation = useNavigation<Onboarding3NavigationProp>();
  const selectedSources = userStore((state) => state.userSlice.sources);
  const setSelectedSources = userStore((state) => state.userSlice.setSources);
  const createNewUser = userStore((state) => state.userSlice.createNewUser);
  const sources = [
    { id: 1, name: 'Good News Network',image: require('../assets/categories/default.png') },
    { id: 2, name: 'Positive News', image: require('../assets/categories/default.png') },
    { id: 3, name: 'Reasons to be Cheerful', image: require('../assets/categories/default.png') },
    { id: 4, name: 'Yes Magazine', image: require('../assets/categories/default.png') },
    { id: 5, name: 'NYTimes Science', image: require('../assets/categories/default.png') },
    { id: 6, name: 'WSJ Lifestyle', image: require('../assets/categories/default.png') },
    { id: 7, name: 'NYTimes Tech', image: require('../assets/categories/default.png') },
    { id: 8, name: 'NYTimes Personal Tech', image: require('../assets/categories/default.png') },
    { id: 9, name: 'NYTimes Space', image: require('../assets/categories/default.png') },
    { id: 10, name: 'NYTimes Weddings', image: require('../assets/categories/default.png') },
    { id: 11, name: 'NYTimes Arts/Design', image: require('../assets/categories/default.png') },
    { id: 12, name: 'Scientific American', image: require('../assets/categories/default.png') },
    { id: 13, name: 'Archaeology Mag', image: require('../assets/categories/default.png') },
    { id: 14, name: 'NPR Music', image: require('../assets/categories/default.png') },
    { id: 15, name: 'NASA', image: require('../assets/categories/default.png') },
    { id: 16, name: 'Optimist Daily', image: require('../assets/categories/animal.png') },
    { id: 17, name: 'GoodGoodGood', image: require('../assets/categories/default.png') },
  ];

  const completeOnboarding = async () => {
    try {
      const userData = {
        categories: userStore.getState().userSlice.categories,
        sources: userStore.getState().userSlice.sources,
        bookmarks: userStore.getState().userSlice.bookmarks,
      };
      createNewUser(userData);
      await AsyncStorage.setItem('user-storage', JSON.stringify(userData));
      navigation.navigate('Tabs'); // cannot use replace home as it is a tab navigator (note to self)
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  const handleSelect = (sourceName: string) => {
    setSelectedSources(sourceName);
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
