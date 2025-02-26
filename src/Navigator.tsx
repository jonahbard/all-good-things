import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import ArticleDetail from '../components/ArticleDetail';
import ArticlePreview from '../components/ArticlePreview';
import ScreenContent from '../components/ScreenContent';

const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <ScreenContent />
    </NavigationContainer>
  );
}
