import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import NavBar from 'components/Navigator';
import OnboardingStack from 'components/OnboardingStack';
import React, { useEffect, useState } from 'react';
import './global.css';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';

import { registerForPushNotifications, setupNotificationListeners } from './lib/notifications';
import { userStore } from './store/userStore';

export default function App() {
  const [initialOpen, setInitialOpen] = useState<boolean | null>(null);
  const Stack = createStackNavigator();

  // const resetAsyncStorage = async () => {
  //   await AsyncStorage.clear();
  //   console.log('AsyncStorage reset!');
  // };

  // AsyncStorage: {"userID":"67ca18d70f194467e4f39c15","categories":["Science","Animals"],"sources":["Science"],"bookmarks":[]}

  useEffect(() => {
    //  resetAsyncStorage();
    const checkNewUserStatus = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user-storage');
        const userData = storedUser ? JSON.parse(storedUser) : null; // can just chekc if
        console.log('is id found', userData?.userSlice?.userID);
        if (userData?.userID && userData?.userID !== '') {
          setInitialOpen(false); // Skip onboarding
          return;
        }
        setInitialOpen(true); // we need go through on boarding
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      }
    };
    checkNewUserStatus();
  }, []);

  useEffect(() => {
    registerForPushNotifications();
    setupNotificationListeners();
  }, []);

  if (initialOpen === null) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingStack} />
        <Stack.Screen name="Tabs" component={NavBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
