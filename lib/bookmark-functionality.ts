import AsyncStorage from '@react-native-async-storage/async-storage';

import bookmarkEvents, { BOOKMARK_CHANGED } from './bookmark-events';

import { Article } from '~/store/articleStore';

const BOOKMARKS_KEY = 'bookmarks';

export async function getBookmarks(): Promise<Article[]> {
  try {
    const value = await AsyncStorage.getItem(BOOKMARKS_KEY);
    if (value) {
      return JSON.parse(value);
    }
    return [];
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return [];
  }
}

export async function addBookmark(article: Article): Promise<void> {
  try {
    const bookmarks = await getBookmarks();
    const exists = bookmarks.some((b) => b.link === article.link);
    if (!exists) {
      bookmarks.push(article);
      await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
      // Notify listeners that bookmarks changed
      bookmarkEvents.emit(BOOKMARK_CHANGED);
      console.log('Added bookmark');
    }
  } catch (error) {
    console.error('Error adding bookmark:', error);
  }
}

export async function removeBookmark(article: Article): Promise<void> {
  try {
    let bookmarks = await getBookmarks();
    bookmarks = bookmarks.filter((b) => b.link !== article.link);
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    // Notify listeners that bookmarks changed
    bookmarkEvents.emit(BOOKMARK_CHANGED);
  } catch (error) {
    console.error('Error removing bookmark:', error);
  }
}

export async function isBookmarked(article: Article): Promise<boolean> {
  try {
    const bookmarks = await getBookmarks();
    return bookmarks.some((b) => b.link === article.link);
  } catch (error) {
    console.error('Error checking if bookmarked:', error);
    return false;
  }
}
