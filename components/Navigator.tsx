import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Bookmark from 'Pages/Bookmark';
import Customize from 'Pages/Customize';
import Explore from 'Pages/Explore';
import React from 'react';

import ArticleDetail from './ArticleDetail';
import Onboarding1 from './Onboarding1';
import Onboarding2 from './Onboarding2';
import Onboarding from '../Pages/Onboarding';
import ScreenContent from '../Pages/ScreenContent';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={ScreenContent} />
      <Stack.Screen
        name="ArticleDetail"
        component={ArticleDetail}
        options={{
          title: 'Article Detail',
          // headerShown: false,
          headerStyle: {
            backgroundColor: '#6C8D9F', // Set the same color as your header
          },
        }}
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
      <Stack.Screen name="Bookmarks" component={Bookmark} />
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

function OnboardingStack() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding1"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Onboarding1" component={Onboarding1} />
      <Stack.Screen name="Onboarding2" component={Onboarding2} />
    </Stack.Navigator>
  );
}

export default function NavBar() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
          tabBarActiveTintColor: '#E5A07D',
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreStack}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} />,
          tabBarActiveTintColor: '#E5A07D',
        }}
      />
      <Tab.Screen
        name="Bookmark"
        component={BookmarkStack}
        options={{
          tabBarLabel: 'Bookmark',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="bookmark" color={color} size={size} />
          ),
          tabBarActiveTintColor: '#E5A07D',
        }}
      />
      <Tab.Screen
        name="Customize"
        component={CustomizeStack}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="options" size={size} color={color} />
          ),
          tabBarActiveTintColor: '#E5A07D',
        }}
      />
      {/* <Tab.Screen
        name="Onboarding"
        component={Onboarding}
        options={{ tabBarLabel: 'Onboarding' }}
      /> */}
    </Tab.Navigator>
  );
}
