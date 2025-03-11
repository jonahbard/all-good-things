import AsyncStorage from '@react-native-async-storage/async-storage';

import { Article } from '~/store/articleStore';

const cache_key = 'article_cache';

export const getArticles = async () => {
  try {
    const articles = await AsyncStorage.getItem(cache_key);
    return articles ? JSON.parse(articles) : [];
  } catch (error) {
    console.error('Error getting articles', error);
    return [];
  }
};

export const addArticles = async (articles: Article[]) => {
  try {
    await AsyncStorage.setItem(cache_key, JSON.stringify(articles));
  } catch (error) {
    console.error('Error adding articles', error);
  }
};

export const clearArticles = async () => {
  try {
    await AsyncStorage.removeItem(cache_key);
  } catch (error) {
    console.error('Error clearing articles', error);
  }
};

export const resetCache = async (articles: Article[]) => {
  try {
    await clearArticles();
    await addArticles(articles);
  } catch (error) {
    console.error('Error resetting cache', error);
  }
};
