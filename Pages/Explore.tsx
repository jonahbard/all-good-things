import { Ionicons } from '@expo/vector-icons';
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
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#333" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            value={searchString}
            onChangeText={setSearchString}
            placeholder="search for good news"
          />
        </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 12,
    backgroundColor: '#F8FAFC',
    marginHorizontal: 15,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 5,
  },
  trendContainer: {
    marginHorizontal: 10,
  },
});

export default Explore;
