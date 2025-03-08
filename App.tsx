import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import NavBar from 'components/Navigator';
import OnboardingStack from 'components/OnboardingStack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';

import './global.css';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';

import { registerForPushNotifications, setupNotificationListeners } from './lib/notifications';
import { userStore } from './store/userStore';

// Keep the splash screen visible while fonts are loading
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'IBMPlexSerif-Regular': require('./assets/fonts/IBM_Plex_Serif/IBMPlexSerif-Regular.ttf'),
    'IBMPlexSerif-Bold': require('./assets/fonts/IBM_Plex_Serif/IBMPlexSerif-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    registerForPushNotifications();
    setupNotificationListeners();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const Stack = createStackNavigator();

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingStack} />
        <Stack.Screen name="Tabs" component={NavBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
