import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';

import BookmarkArticlePreview from '~/components/BookmarkArticlePreview';
import { getBookmarks } from '~/lib/bookmark-functionality';
import { Article } from '~/store/articleStore';

type BookmarksNavigationProp = NativeStackNavigationProp<
  { Home: undefined; ArticleDetail: { article: Article } },
  'Home' | 'ArticleDetail'
>;

export default function Bookmarks({ navigation }: { navigation: BookmarksNavigationProp }) {
  const [bookmarks, setBookmarks] = useState<Article[]>([]);

  const fetchBookmarks = async () => {
    const bookmarks = await getBookmarks();
    setBookmarks(bookmarks);
  };

  useFocusEffect(
    useCallback(() => {
      fetchBookmarks();
    }, [])
  );

  return (
    <SafeAreaView>
      <Text className="mb-2 ml-3 mt-10 font-ibm-bold text-4xl">bookmarks</Text>
      {bookmarks.length > 0 ? (
        <ScrollView>
          {bookmarks
            .slice(0)
            .reverse()
            .map((article, index) => (
              <BookmarkArticlePreview
                key={index}
                navigation={navigation}
                article={article}
                onRemove={fetchBookmarks}
              />
            ))}
          <View style={{ height: 80 }} />
        </ScrollView>
      ) : (
        <Text style={{ margin: 12, width: '100%' }}>No bookmarks yet!</Text>
      )}
    </SafeAreaView>
  );
}
