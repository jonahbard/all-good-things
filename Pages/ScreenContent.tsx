import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import HomeFeed from '../components/HomeFeed';

import { Article, articleStore } from '~/store/articleStore';
import { userStore } from '~/store/userStore';

export default function ScreenContent({ navigation }: any) {
  const [articles, setArticles] = useState<Article[]>([]);
  const fetchAllArticles = articleStore((state) => state.articleSlice.fetchAllArticles);
  const categories = userStore((state) => state.userSlice.categories);
  const sources = userStore((state) => state.userSlice.sources);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllArticles(categories, sources);
      const updatedArticles = articleStore.getState().articleSlice.allArticles;
      setArticles(updatedArticles);
    };
    fetchData();
  }, [categories, sources]); // update everytime we make customziation for testing purpose that it works

  return (
    <View>
      <HomeFeed navigation={navigation} articles={articles} />
    </View>
  );
}
