import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, View, Text, SafeAreaView } from 'react-native';

import ArticlePreview from './ArticlePreview';
import { Article } from '../types';

// Define the type for the navigation prop
type HomeFeedNavigationProp = NativeStackNavigationProp<
  { Home: undefined; ArticleDetail: { article: Article } },
  'Home' | 'ArticleDetail'
>;

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
            <ArticlePreview key={index} navigation={navigation} article={article} />
          ))
        ) : (
          <Text>Loading...</Text>
        )}
        <View style={{ height: 160 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
