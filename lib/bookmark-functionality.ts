import AsyncStorage from '@react-native-async-storage/async-storage';

import { Article } from '../types';

const bookmarks_key = 'bookmarks';

export const getBookmarks = async () => {
  try {
    const bookmarks = await AsyncStorage.getItem(bookmarks_key);
    return bookmarks ? JSON.parse(bookmarks) : [];
  } catch (error) {
    console.error('Error getting bookmarks', error);
    return [];
  }
};

export const addBookmark = async (article: Article) => {
  if (await isBookmarked(article)) {
    return;
  }
  try {
    const bookmarks = await getBookmarks();
    bookmarks.push(article);
    await AsyncStorage.setItem(bookmarks_key, JSON.stringify(bookmarks));
  } catch (error) {
    console.error('Error adding bookmark', error);
  }
};

export const removeBookmark = async (article: Article) => {
  try {
    const bookmarks = await getBookmarks();
    const newBookmarks = bookmarks.filter((b: Article) => b.link !== article.link);
    await AsyncStorage.setItem(bookmarks_key, JSON.stringify(newBookmarks));
    console.log('Bookmark removed');
  } catch (error) {
    console.error('Error removing bookmark', error);
  }
};

export const isBookmarked = async (article: Article) => {
  const bookmarks = await getBookmarks();
  return bookmarks.some((b: Article) => b.link === article.link);
};
