import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import NavBar from 'components/Navigator';
<<<<<<< HEAD
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect } from 'react';

=======
import OnboardingStack from 'components/OnboardingStack';
import React, { useEffect, useState } from 'react';
>>>>>>> 3ddc08affc009b6fa19dd5d1bbe30cf1e0a7bd8c
import './global.css';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';

import { registerForPushNotifications, setupNotificationListeners } from './lib/notifications';
import { userStore } from './store/userStore';

// Keep the splash screen visible while fonts are loading
SplashScreen.preventAutoHideAsync();

export default function App() {
<<<<<<< HEAD
  const [fontsLoaded] = useFonts({
    'IBMPlexSerif-Regular': require('./assets/fonts/IBM_Plex_Serif/IBMPlexSerif-Regular.ttf'),
    'IBMPlexSerif-Bold': require('./assets/fonts/IBM_Plex_Serif/IBMPlexSerif-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <NavBar />
=======
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
>>>>>>> 3ddc08affc009b6fa19dd5d1bbe30cf1e0a7bd8c
    </NavigationContainer>
  );
}
