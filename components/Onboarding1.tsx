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

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared');
    } catch (error) {
      console.error('Failed to clear AsyncStorage:', error);
    }
  };
  // To check onboarding process, click clear async storage 
  // const clearAsyncStorage = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //     console.log('AsyncStorage cleared');
  //   } catch (error) {
  //     console.error('Failed to clear AsyncStorage:', error);
  //   }
  // };
  

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(async () => {
            // clearAsyncStorage()
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
      <Text className="text-center font-ibm-bold text-5xl leading-[45px] text-black">
        all good things
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
