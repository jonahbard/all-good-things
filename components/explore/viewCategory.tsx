import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

import { RootStackParamList } from '../../types';

import ArticlePreview from '../ArticlePreview';

import { Article } from '~/store/articleStore';
import { exploreStore } from '~/store/exploreStore';
type ViewCategoryProps = {
  [x: string]: any;
  //   navigateToViewCategory: () => void;
};

type ViewCategoryRouteProp = RouteProp<RootStackParamList, 'ViewCategory'>;
const ViewCategory: React.FC<ViewCategoryProps> = () => {
  const route = useRoute<ViewCategoryRouteProp>();
  const { categoryName } = route.params;
  const [articles, setArticles] = useState<Article[]>([]);
  const fetchArticleByCategory = exploreStore((state) => state.exploreSlice.fetchArticleByCategory);
  const navigation = useNavigation<ViewCategoryProps>();
  useEffect(() => {
    const fetchArticles = async () => {
      await fetchArticleByCategory(categoryName);
      setArticles(exploreStore.getState().exploreSlice.categorizedArticles);
    };
    fetchArticles();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Text className="font-ibm-bold" style={styles.text}>{categoryName}</Text>
        {articles
          ? articles.map((article, index) => (
              <ArticlePreview
                key={index}
                navigateToArticle={() => navigation.navigate('ArticleDetail', { article })}
                article={article}
              />
            ))
          : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
  },
});

export default ViewCategory;
