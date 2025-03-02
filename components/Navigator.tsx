import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import ArticleDetail from './ArticleDetail';
import Onboarding from '../Pages/Onboarding';
import ScreenContent from '../Pages/ScreenContent';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeMain"
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: '#f8f8f8' },
        headerTintColor: '#333',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen name="HomeMain" component={ScreenContent} />
      <Stack.Screen
        name="ArticleDetail"
        component={ArticleDetail}
        options={{ title: 'Article Detail', headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function NavBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ tabBarLabel: 'Onboarding' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
