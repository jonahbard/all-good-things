import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ScrollView, View, Text, SafeAreaView } from 'react-native';

import { RootStackParamList } from '../types';
import ArticlePreview from './ArticlePreview';

import { Article } from '~/store/articleStore';
import { userStore } from '~/store/userStore';

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
  // Assuming article.date is either a string or undefined/null

  const now = new Date();

  // Sorting written by Deepseek because don't want to deal with the dates on spring break
  // just sorting by time didn't work and feb stuff appearing on top for some reason
  // if a item don't have date, its at bottom...
  const isSameMonth = (date1: Date, date2: Date) => {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
  };

  const sortedArticles = articles.slice().sort((a, b) => {
    const dateA = a.pubDate ? new Date(a.pubDate) : null;
    const dateB = b.pubDate ? new Date(b.pubDate) : null;

    if (!dateA) return 1;
    if (!dateB) return -1;

    const isACurrentMonth = isSameMonth(dateA, now);
    const isBCurrentMonth = isSameMonth(dateB, now);

    if (isACurrentMonth && !isBCurrentMonth) return -1;
    if (!isACurrentMonth && isBCurrentMonth) return 1;

    const isAAfterCurrent = dateA > now && !isSameMonth(dateA, now);
    const isBAfterCurrent = dateB > now && !isSameMonth(dateB, now);

    if (isAAfterCurrent && !isBAfterCurrent) return 1;
    if (!isAAfterCurrent && isBAfterCurrent) return -1;

    return dateB.getTime() - dateA.getTime();
  });

  return (
    <SafeAreaView>
      <Text className="mb-2 ml-3 mt-10 font-ibm-bold text-4xl">all good things</Text>
      <ScrollView>
        {sortedArticles.length > 0 ? (
          sortedArticles.map((article, index) => (
            <ArticlePreview
              key={index}
              navigateToArticle={() => navigation.navigate('ArticleDetail', { article })}
              article={article}
            />
          ))
        ) : (
          <Text className="mt-40 justify-center self-center font-ibm">fetching good news...</Text>
        )}
        <View style={{ height: 160 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
