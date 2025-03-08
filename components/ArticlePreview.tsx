import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Sharing from 'expo-sharing';
import { SymbolView } from 'expo-symbols';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { titleCase } from 'title-case';

import bookmarkEvents, { BOOKMARK_CHANGED } from '../lib/bookmark-events';
import { addBookmark, removeBookmark, isBookmarked } from '../lib/bookmark-functionality';
import { Article, RootStackParamList } from '../types';

type ArticlePreviewNavigationProp = StackNavigationProp<RootStackParamList, 'ArticleDetail'>;
export default function ArticlePreview({
  // navigateToArticle,
  article,
}: {
  // navigation: ArticlePreviewNavigationProp;
  article: Article;
}) {
  const navigation = useNavigation<ArticlePreviewNavigationProp>();
  const handlePress = () => {
    navigation.navigate('ArticleDetail', { article });
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

  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="mx-2 my-1 flex flex-row rounded-md bg-white p-3">
        <View className="flex-1">
          <Text className="font-ibm-bold">{article.title}</Text>
          <Text className="font-ibm text-gray-600">
            {titleCase(article.source)} {article.pubDate ? `• ${formatDate(article.pubDate)}` : ''}
          </Text>
          <Text className="font-ibm">{article.description}</Text>
        </View>
        <View className="mx-3 flex flex-col justify-center">
          <TouchableOpacity
            onPress={async () => {
              if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(article.link, {
                  dialogTitle: article.title,
                  UTI: 'public.url',
                });
              }
            }}
            className="mb-10">
            <SymbolView name="square.and.arrow.up" className="m-1" tintColor="brown" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBookmarkToggle}>
            {bookmarked ? (
              <SymbolView
                name="bookmark.fill"
                className="m-1"
                type="hierarchical"
                tintColor="brown"
              />
            ) : (
              <SymbolView name="bookmark" className="m-1" type="hierarchical" tintColor="brown" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
