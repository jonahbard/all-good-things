import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavBar from 'components/Navigator';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import ArticleDetail from '../components/ArticleDetail';
import ArticlePreview from '../components/ArticlePreview';
import HomeFeed from '../components/HomeFeed';
import { Article } from '../types';

// const Stack = createNativeStackNavigator();

export default function ScreenContent({ navigation }: any) {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('https://project-api-all-good-things.onrender.com/api/articles')
      .then((response) => response.json())
      .then((data) => setArticles(data.slice(0, 10)));
    // console.log('articles:', articles);
  }, []);
  return (
    <View>
      <HomeFeed navigation={navigation} articles={articles} />
    </View>
  );
}
