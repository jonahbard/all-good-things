import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, Text, SafeAreaView } from 'react-native';

import { RootStackParamList, Article } from '../types';
import ArticlePreview from './ArticlePreview';

// Define the type for the navigation prop
// type HomeFeedNavigationProp = NativeStackNavigationProp<
//   { Home: undefined; ArticleDetail: { article: Article } },
//   'Home' | 'ArticleDetail'
// >;

type HomeFeedNavigationProp = BottomTabNavigationProp<RootStackParamList, 'Home'>;
export default function HomeFeed({
  navigation,
  articles,
}: {
  navigation: HomeFeedNavigationProp;
  articles: Article[];
}) {
  return (
    <SafeAreaView>
      <Text className="mb-2 ml-3 mt-10 text-4xl font-bold">all good things</Text>
      <ScrollView>
        {articles ? (
          articles.map((article, index) => (
            <ArticlePreview
              key={index}
              // navigateToArticle={(article) => navigation.navigate('ArticleDetail', { article })}
              article={article}
            />
          ))
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
