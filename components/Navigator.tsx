import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Customize from 'Pages/Customize';
import Explore from 'Pages/Explore';
import React from 'react';

import ArticleDetail from './ArticleDetail';
import Onboarding from '../Pages/Onboarding';
import ScreenContent from '../Pages/ScreenContent';

import Bookmarks from '~/Pages/Bookmarks';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeMain"
      screenOptions={{
        headerShown: false,
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

function ExploreStack() {
  return (
    <Stack.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Explore" component={Explore} />
    </Stack.Navigator>
  );
}

function BookmarkStack() {
  return (
    <Stack.Navigator
      initialRouteName="Bookmarks"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Bookmarks" component={Bookmarks} />
    </Stack.Navigator>
  );
}

function CustomizeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Customize"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Customize" component={Customize} />
    </Stack.Navigator>
  );
}

export default function NavBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Explore" component={ExploreStack} />
        <Tab.Screen name="Bookmark" component={BookmarkStack} />
        <Tab.Screen name="Customize" component={CustomizeStack} />
        {/* <Tab.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ tabBarLabel: 'Onboarding' }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
