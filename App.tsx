import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import NavBar from 'components/Navigator';
import OnboardingStack from 'components/OnboardingStack';
import React, { useEffect, useState } from 'react';
import './global.css';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
  const [initialOpen, setInitialOpen] = useState<boolean | null>(null);
  const Stack = createStackNavigator();

  useEffect(() => {
    const checkNewUserStatus = async () => {
      const status = await AsyncStorage.getItem('onboardingComplete');
      setInitialOpen(status !== 'false');
    };
    checkNewUserStatus();
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
