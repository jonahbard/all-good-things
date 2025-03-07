import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

import ArticleDetail from './ArticleDetail';
import ArticlePreview from './ArticlePreview';
import HomeFeed from './HomeFeed';
import { Article } from '../types';

const Stack = createNativeStackNavigator();

export default function ScreenContent() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('https://project-api-all-good-things.onrender.com/api/articles')
      .then((response) => response.json())
      .then((data) => setArticles(data));
    console.log('articles:', articles);
  }, []);
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" options={{ title: 'Articles', headerShown: false }}>
        {(props) => <HomeFeed {...props} articles={articles} />}
      </Stack.Screen>
      <Stack.Screen
        name="ArticleDetail"
        component={ArticleDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
