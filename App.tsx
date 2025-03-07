import { NavigationContainer } from '@react-navigation/native';
import NavBar from 'components/Navigator';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect } from 'react';

import './global.css';

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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <NavBar />
    </NavigationContainer>
  );
}
