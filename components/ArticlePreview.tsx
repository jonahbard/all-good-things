import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Sharing from 'expo-sharing';
import { SymbolView } from 'expo-symbols';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { titleCase } from 'title-case';

import bookmarkEvents, { BOOKMARK_CHANGED } from '../lib/bookmark-events';
import { addBookmark, removeBookmark, isBookmarked } from '../lib/bookmark-functionality';
import { RootStackParamList } from '../types';

import { Article, articleStore } from '~/store/articleStore';
import { API_URL } from '~/utils/apiUtils';
type ArticlePreviewProps = {
  article: Article;
  navigateToArticle: () => void;
  descriptionLines?: number;
};
type ArticlePreviewNavigationProp = StackNavigationProp<RootStackParamList, 'ArticleDetail'>;
const ArticlePreview: React.FC<ArticlePreviewProps> = ({
  navigateToArticle,
  article,
  descriptionLines,
}) => {
  const navigation = useNavigation<ArticlePreviewNavigationProp>();
  const updateShare = articleStore((state) => state.articleSlice.updateShare);
  const handlePress = () => {
    // navigation.navigate('ArticleDetail', { article });
    navigateToArticle();
  };

  const [bookmarked, setBookmarked] = useState(false);

  const checkBookmarkStatus = async () => {
    const isBookmarkedStatus = await isBookmarked(article);
    setBookmarked(isBookmarkedStatus);
  };

  useEffect(() => {
    // Check initial bookmark status
    checkBookmarkStatus();

    // Set up event listener for bookmark changes
    const handleBookmarkChange = () => {
      checkBookmarkStatus();
    };

    bookmarkEvents.on(BOOKMARK_CHANGED, handleBookmarkChange);

    // Clean up event listener
    return () => {
      bookmarkEvents.off(BOOKMARK_CHANGED, handleBookmarkChange);
    };
  }, [article]);

  const handleBookmarkToggle = async () => {
    console.log('Bookmark toggle');
    if (bookmarked) {
      await removeBookmark(article);
    } else {
      await addBookmark(article);
    }
    // No need to manually update state here as the event listener will handle it
  };

  const formatDate = (date: any): string => {
    if (!date) return '';
    if (date instanceof Date) return date.toLocaleDateString();
    try {
      return new Date(date).toLocaleDateString();
    } catch (e) {
      return '';
    }
  };
  const handlePressShare = async () => {
    if (!article.id) {
      console.log('No article ID');
      return;
    }
    try {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(article.link, {
          dialogTitle: article.title,
          UTI: 'public.url',
        });
        await updateShare(article.id);
      }
    } catch (error) {
      console.log('Failed to share article', error);
    } finally {
      console.log('updated share');
    }
  };
  return (
    <TouchableOpacity onPress={navigateToArticle}>
      <View className="mx-2 my-1 flex flex-row rounded-md bg-white p-3">
        <View className="flex-1">
          <Text className="font-ibm-bold">{article.title}</Text>
          <Text className="mt-1 font-ibm text-gray-600">
            {titleCase(article.source)}{' '}
            {article.pubDate && formatDate(article.pubDate) !== 'Invalid Date'
              ? `• ${formatDate(article.pubDate)}`
              : ''}
          </Text>
          <Text
            className="mt-1 font-ibm"
            numberOfLines={descriptionLines || undefined}
            ellipsizeMode="tail">
            {article.description}
          </Text>
          {article.categories && article.categories.length > 0 && (
            <View className="mt-2 flex flex-row flex-wrap">
              {article.categories.slice(0, 3).map((category, index) => (
                <View key={index} className="mb-1 mr-2 rounded-full bg-gray-100 px-3 py-2">
                  <Text className="font-ibm text-xs text-gray-700" numberOfLines={1}>
                    {category}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
        <View className="mx-3 flex flex-col justify-center">
          <TouchableOpacity onPress={handlePressShare} className="mb-10">
            <SymbolView name="square.and.arrow.up" className="m-1" tintColor="#f5a612" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBookmarkToggle}>
            {bookmarked ? (
              <SymbolView
                name="bookmark.fill"
                className="m-1"
                type="hierarchical"
                tintColor="#f5a612"
              />
            ) : (
              <SymbolView name="bookmark" className="m-1" type="hierarchical" tintColor="#f5a612" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArticlePreview;
