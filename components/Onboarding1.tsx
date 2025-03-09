import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

import { RootStackParamList } from '../types';

type OnboardingNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding1'>;
const Onboarding1: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const navigation = useNavigation<OnboardingNavigationProp>();
  const barWidth = 300;
  const barHeight = 23;

  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(async () => {
            const storedUser = await AsyncStorage.getItem('user-storage');
            const userData = storedUser ? JSON.parse(storedUser) : null; // can just chekc if
            if (userData?.userID && userData?.userID !== '') {
              console.log('is id found', userData?.userID);
              navigation.push('Tabs');
            } else {
              navigation.push('Onboarding2'); // Push ensures it stays within the OnboardingStack
            }
          }, 500);
          return 100;
        } else {
          return prev + 10;
        }
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);
  // const userID = userStore((state) => state.userSlice.userID);
  // console.log('userid', userID);
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={{ width: 214, height: 209 }} />
      <Text className="text-center text-[48px] font-bold leading-[45px] tracking-[-0.96px] text-black">
        GoodNews
      </Text>
      <View className="mt-6 items-center">
        <ProgressBarAnimated
          width={barWidth}
          height={barHeight}
          value={progress}
          backgroundColorOnComplete="#FECC5F"
          backgroundColor="#F4C542"
          borderRadius={10}
          useNativeDriver
        />
      </View>
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
  text: {
    fontSize: 20,
    color: '#333',
  },
});

export default Onboarding1;
