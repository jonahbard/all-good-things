import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import React from 'react';
import { ScrollView, View, Text, SafeAreaView } from 'react-native';

import { RootStackParamList } from '../types';
import ArticlePreview from './ArticlePreview';

import { Article } from '~/store/articleStore';

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
      <Text className="mb-2 ml-3 mt-10 font-ibm-bold text-4xl">all good things</Text>
      <ScrollView>
        {articles ? (
          articles.map((article, index) => (
            <ArticlePreview
              key={index}
              navigateToArticle={() => navigation.navigate('ArticleDetail', { article })}
              article={article}
            />
          ))
        ) : (
          <Text>Loading...</Text>
        )}
        <View style={{ height: 160 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
