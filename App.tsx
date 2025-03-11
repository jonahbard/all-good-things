import { connectActionSheet, ActionSheetProvider } from '@expo/react-native-action-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavBar from 'components/Navigator';
import OnboardingStack from 'components/OnboardingStack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { LogBox, Text } from 'react-native';
import './global.css';

import { categoriesList, sourcesList } from './data';
import { registerForPushNotifications, setupNotificationListeners } from './lib/notifications';
import { userStore } from './store/userStore';
LogBox.ignoreLogs(['VirtualizedLists should never be nested']); // ignore scroll view error for now

// Keep the splash screen visible while fonts are loading
SplashScreen.preventAutoHideAsync();

function App() {
  const [refetchTrigger, setRefetchTrigger] = useState<number>(0);
  const categories = userStore((state) => state.userSlice.categories);
  // const bookmarks = userStore((state) => state.userSlice.bookmarks);
  const sources = userStore((state) => state.userSlice.sources);
  const fetchUserCateogries = userStore((state) => state.userSlice.fetchUserCateogries);
  const fetchUserSources = userStore((state) => state.userSlice.fetchUserSources);
  const userID = userStore((state) => state.userSlice.userID);
  const setUserID = userStore((state) => state.userSlice.setUserID);
  // const updateUserSetting = userStore((state) => state.userSlice.updateUserSetting);
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

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user-storage');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserID(parsedUser?.userID || 'Not Found');
        }
      } catch (error) {
        console.error('Error fetching userID from AsyncStorage:', error);
      }
    };
    fetchUserID();
  }, []);

  useEffect(() => {
    const fetchUserPref = async () => {
      if (!userID || userID ==='') return;
      try {
        console.log('Fetching categories with userID:', userID);
        await fetchUserCateogries(userID);
        await fetchUserSources(userID);
      } catch (error) {
        console.log('Error fetching preference', error);
      }
    };
    fetchUserPref();
  }, [userID]);

  if (!fontsLoaded) {
    return null;
  }

  const Stack = createStackNavigator();

  return (
    <ActionSheetProvider>
      <NavigationContainer onReady={onLayoutRootView}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboarding" component={OnboardingStack} />
          <Stack.Screen name="Tabs" component={NavBar} />
        </Stack.Navigator>
      </NavigationContainer>
    </ActionSheetProvider>
  );
}

export default App;
