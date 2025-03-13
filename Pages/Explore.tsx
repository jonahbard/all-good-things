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
  ActivityIndicator,
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
  const clearSearchedArticles = exploreStore((state) => state.exploreSlice.clearSearchedArticles);
  const navigation = useNavigation<ExploreNavigationProp>();
  const searchArticles = exploreStore((state) => state.exploreSlice.searchArticles);
  const isSearchLoading = exploreStore((state) => state.exploreSlice.loadingSearchedArticles);

  useEffect(() => {
    // clearSearchedArticles();
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
    if (text.trim() === '') {
      clearSearchedArticles();
    }
    setSearchString(text);
    debouncedSearch(text);
  };

  const clearSearch = () => {
    setSearchString('');
    clearSearchedArticles();
  };

  return (
    <SafeAreaView>
      <Text className="mb-2 ml-3 mt-10 font-ibm-bold text-4xl">explore</Text>
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

      {searchString.trim() !== '' && isSearchLoading ? (
        <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <View className="items-center rounded-xl bg-gray-100 p-6 shadow-md">
            <ActivityIndicator size="large" color="#8B4513" />
          </View>
        </View>
      ) : searchString.trim() !== '' && searchResults.length > 0 ? (
        <ScrollView style={{ marginTop: 10 }}>
          {searchResults.map((article, index) => (
            <ArticlePreview
              key={index}
              navigateToArticle={() => navigation.navigate('ArticleDetail', { article })}
              article={article}
              descriptionLines={2}
            />
          ))}
        </ScrollView>
      ) : searchString.trim() !== '' ? (
        <View style={{ height: '95%', justifyContent: 'center', alignItems: 'center' }}>
          <Text className="text-center font-ibm text-lg text-gray-500">
            No results found for "{searchString}"
          </Text>
        </View>
      ) : (
        <ScrollView>
          <View>
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
          <View style={{ height: 150 }} />
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
    marginTop: 15,
    marginLeft: 10,
    color: '#737373',
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
    marginHorizontal: 10,
    marginBottom: 10,
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
});

export default Explore;
