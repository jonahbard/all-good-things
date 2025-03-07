import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Sharing from 'expo-sharing';
import { SymbolView } from 'expo-symbols';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import bookmarkEvents, { BOOKMARK_CHANGED } from '../lib/bookmark-events';
import { addBookmark, removeBookmark, isBookmarked } from '../lib/bookmark-functionality';
import { Article, RootStackParamList } from '../types';


// Define the type for the navigation prop
// type ArticlePreviewNavigationProp = NativeStackNavigationProp<
//   { Home: undefined; ArticleDetail: { article: Article } },
//   'Home' | 'ArticleDetail'
// >;
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

  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="mx-2 my-1 flex flex-row rounded-md bg-white p-3">
        <View className="flex-1">
          <Text className="font-bold">{article.title}</Text>
          <Text>{article.description}</Text>
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
            <SymbolView name="square.and.arrow.up" className="m-1" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBookmarkToggle}>
            {bookmarked ? (
              <SymbolView name="bookmark.fill" className="m-1" type="hierarchical" />
            ) : (
              <SymbolView name="bookmark" className="m-1" type="hierarchical" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
