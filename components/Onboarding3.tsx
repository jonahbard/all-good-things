import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { RootStackParamList } from '../types';

type Onboarding3NavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding2'>;

const Onboarding3: React.FC = () => {
  const navigation = useNavigation<Onboarding3NavigationProp>();

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboardingComplete', 'true');
      navigation.navigate('Tabs'); // cannot use replace home as it is a tab navigator (note to self)
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Onboarding Screen 3</Text>
      <TouchableOpacity onPress={completeOnboarding}>
        <Text>Next</Text>
      </TouchableOpacity>
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
    color: '#333',
  },
});

export default Onboarding3;
