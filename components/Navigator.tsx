import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Customize from 'Pages/Customize';
import Explore from 'Pages/Explore';
import React from 'react';

import ArticleDetail from './ArticleDetail';
import Onboarding1 from './Onboarding1';
import Onboarding2 from './Onboarding2';
import ScreenContent from '../Pages/ScreenContent';
import ViewCategory from './explore/viewCategory';

import Bookmarks from '~/Pages/Bookmarks';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={ScreenContent} />
      <Stack.Screen
        name="ArticleDetail"
        component={ArticleDetail}
        options={{ title: 'Article Detail' }}
      />
    </Stack.Navigator>
  );
}

function ExploreStack() {
  return (
    <Stack.Navigator
      initialRouteName="ExploreScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ExploreScreen" component={Explore} />
      <Stack.Screen
        name="ArticleDetail"
        component={ArticleDetail}
        options={{ title: 'Article Detail', headerShown: false }}
      />
      <Stack.Screen
        name="ViewCategory"
        component={ViewCategory}
        options={{ title: 'View Cateogory', headerShown: false }}
      />
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
      <Stack.Screen
        name="ArticleDetail"
        component={ArticleDetail}
        options={{ title: 'Article Detail', headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function CustomizeStack() {
  return (
    <Stack.Navigator
      initialRouteName="CustomizeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CustomizeScreen" component={Customize} />
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
        name="Bookmarks"
        component={BookmarkStack}
        options={{
          tabBarLabel: 'Bookmarks',
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
