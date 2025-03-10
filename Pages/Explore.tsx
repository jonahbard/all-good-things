import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView } from 'react-native';

import { RootStackParamList } from '../types';

import ArticlePreview from '~/components//ArticlePreview';
import Categories from '~/components/explore/categoriesList';
import { articleStore, Article } from '~/store/articleStore';
type ArticlePreviewProps = {
  article: Article;
  navigateToArticle: () => void;
};

type ExploreNavigationProp = BottomTabNavigationProp<RootStackParamList, 'Explore'>;
const Explore = () => {
  const [searchString, setSearchString] = useState('');
  const topArticles = articleStore((state) => state.articleSlice.allArticles);
  const navigation = useNavigation<ExploreNavigationProp>();

  return (
    <SafeAreaView>
      <ScrollView>
        <TextInput style={styles.input} value={searchString} onChangeText={setSearchString} />
        <View style={styles.trendContainer}>
          <Text style={styles.headers}>Trending</Text>
          {topArticles
            ? topArticles
                .slice(0, 3)
                .map((article, index) => (
                  <ArticlePreview
                    key={index}
                    navigateToArticle={() => navigation.navigate('ArticleDetail', { article })}
                    article={article}
                  />
                ))
            : null}
        </View>
        <View>
          <Text style={styles.headers}>Cateogries</Text>
          <Categories />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  headers: {
    fontSize: 20,
    fontWeight: 600,
    textAlign: 'left',
    alignItems: 'flex-start',
    margin: 15,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    height: 40,
    margin: 15,
    borderWidth: 1,
    borderColor: '#66858A',
    borderRadius: 10,
    padding: 10,
  },
  trendContainer: {
    marginHorizontal: 10,
  },
});

export default Explore;
