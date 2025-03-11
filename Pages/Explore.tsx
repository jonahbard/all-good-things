import { Ionicons } from '@expo/vector-icons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { debounce } from 'lodash';
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { RootStackParamList } from '../types';

import ArticlePreview from '~/components//ArticlePreview';
import Categories from '~/components/explore/categoriesList';
// import { Article } from '~/store/articleStore';
import { exploreStore } from '~/store/exploreStore';

type ExploreNavigationProp = BottomTabNavigationProp<RootStackParamList, 'Explore'>;
const Explore = () => {
  const [searchString, setSearchString] = useState('');
  const topArticles = exploreStore((state) => state.exploreSlice.trendingArticles);
  const searchResults = exploreStore((state) => state.exploreSlice.searchedArticles);
  const fetchTrendingArticles = exploreStore((state) => state.exploreSlice.fetchTrendingArticles);
  const navigation = useNavigation<ExploreNavigationProp>();
  const searchArticles = exploreStore((state) => state.exploreSlice.searchArticles);
  const isSearchLoading = exploreStore((state) => state.exploreSlice.loadingSearchedArticles);

  useEffect(() => {
    fetchTrendingArticles();
  }, []);

  // Create a debounced search function that only triggers after 500ms of inactivity
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.trim().length > 0) {
        searchArticles(query);
      }
    }, 500),
    [searchArticles]
  );

  // Handle text input changes
  const handleSearchChange = (text: string) => {
    setSearchString(text);
    if (text.trim().length === 0) {
      return;
    }
    debouncedSearch(text);
  };

  const clearSearch = () => {
    setSearchString('');
  };

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#333" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          value={searchString}
          onChangeText={handleSearchChange}
          placeholder="search for good news"
        />
        {searchString.length > 0 && (
          <TouchableOpacity onPress={clearSearch}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>
      {searchString.trim() !== '' && !isSearchLoading && searchResults.length === 0 ? (
        <View className="h-screen flex-1 items-center justify-center">
          <Text className="text-center font-ibm text-lg text-gray-500">
            No results found for "{searchString}"
          </Text>
        </View>
      ) : searchResults.length > 0 ? (
        <ScrollView>
          {searchResults.map((article, index) => (
            <ArticlePreview
              key={index}
              navigateToArticle={() => navigation.navigate('ArticleDetail', { article })}
              article={article}
              descriptionLines={2}
            />
          ))}
        </ScrollView>
      ) : isSearchLoading ? (
        <View className="h-screen flex-1 items-center justify-center">
          <Text className="text-center font-ibm text-xl text-gray-500">Searching...</Text>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.trendContainer}>
            <Text className="font-ibm-bold" style={styles.headers}>
              Trending
            </Text>
            {topArticles.map((article, index) => (
              <ArticlePreview
                key={index}
                navigateToArticle={() => navigation.navigate('ArticleDetail', { article })}
                article={article}
                descriptionLines={2}
              />
            ))}
          </View>
          <View>
            <Text className="font-ibm-bold" style={styles.headers}>
              Categories
            </Text>
            <Categories />
          </View>
        </ScrollView>
      )}
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
