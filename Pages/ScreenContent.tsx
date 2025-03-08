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
    fetch('https://project-api-all-good-things.onrender.com/api/articles', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('balls');
        return response.json();
      })
      .then((data: Article[]) => {
        const shuffledData = data.sort(() => Math.random() - 0.5);
        setArticles(shuffledData);
      });
    console.log(articles);
  }, []);

  return (
    <View>
      <HomeFeed navigation={navigation} articles={articles} />
    </View>
  );
}
