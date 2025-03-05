import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; // Adjust the import path as necessary

type Onboarding2NavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding2'>;

const Onboarding2: React.FC = () => {
  const navigation = useNavigation<Onboarding2NavigationProp>();
  const categories = [];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="absolute left-[100px] top-[-75px] h-[250px] w-full">
        <Svg width="100%" height="500" viewBox="0 0 390 316" fill="none">
          <Path
            fill="#C1E1E0"
            d="M389 76.0001C389 155.39 378.753 303.487 304.99 315.695C299.541 316.597 295.017 311.854 294.828 306.335C286.798 71.4236 0.5 68.1809 0.5 -13.5C0.5 -96.3427 156.157 -74 239 -74C321.843 -74 389 -6.84264 389 76.0001Z"
          />
        </Svg>
      </View>

      <View className="flex-1 items-center px-6">
        <Text className="mt-10 text-center font-[SourceSerif4] text-[24px] font-medium leading-[45px] tracking-[-0.48px] text-black">
          What makes you happy?
        </Text>

        <View className="flex-1 justify-center">
          <Text className="text-center text-xl font-bold text-black">
            Welcome to Onboarding Screen 2
          </Text>
        </View>

        <View className="absolute bottom-[100px] left-[0px] h-[250px] w-full">
          <Svg width="100%" height="500" viewBox="0 0 390 316" fill="none">
            <Path
              fill="#FC9A7A"
              d="M188.5 285C388.5 389.5 148.843 379 66 379C-16.8427 379 -84 311.843 -84 229C-84 146.157 -25 -139 26 84.5001C66 183.5 82 211.5 188.5 285Z"
            />
          </Svg>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Onboarding3')}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding2;
