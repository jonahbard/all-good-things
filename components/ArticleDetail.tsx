import { useActionSheet } from '@expo/react-native-action-sheet';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Sharing from 'expo-sharing';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { titleCase } from 'title-case';

import { RootStackParamList } from '../types';
import ReaderViewComponent from './ReaderView';

import { addBookmark, isBookmarked, removeBookmark } from '~/lib/bookmark-functionality';
import { Article, articleStore, ReaderView } from '~/store/articleStore';

type ActionProps = {
  showActionSheetWithOptions: (options: any, callback: (buttonIndex: number) => void) => void;
};
type ArticleDetailNavigationProp = StackNavigationProp<RootStackParamList, 'ArticleDetail'>;
// Webview
export default function ArticleDetail() {
  const route = useRoute();
  const navigation = useNavigation<ArticleDetailNavigationProp>();
  const { article } = route.params as { article: Article };
  const { showActionSheetWithOptions } = useActionSheet();
  const [isReaderView, setIsReaderView] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOptions = () => {
    showActionSheetWithOptions(
      {
        options: isReaderView
          ? ['Cancel', 'Bookmark', 'Share', 'Show Browser View', 'Open In Browser']
          : ['Cancel', 'Bookmark', 'Share', 'Show Reader View', 'Open In Browser'],
        cancelButtonIndex: 0,
      },
      async (index?: number) => {
        if (index === undefined) return;

        switch (index) {
          case 1: // Bookmark
            try {
              const bookmarked = await isBookmarked(article);
              if (bookmarked) {
                await removeBookmark(article);
                console.log('Removed bookmark');
              } else {
                await addBookmark(article);
                console.log('Added bookmark');
              }
            } catch (error) {
              console.error('Error with bookmark:', error);
            }
            break;

          case 2: // Share
            try {
              if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(article.link, {
                  dialogTitle: article.title,
                  UTI: 'public.url',
                });
              }
            } catch (error) {
              console.error('Error sharing article:', error);
            }
            break;

          case 3: // Show Browser View
            setIsReaderView(!isReaderView);
            break;

          case 4: // Open In Browser
            try {
              await Linking.openURL(article.link);
            } catch (error) {
              console.error('Error opening link:', error);
            }
            break;

          default:
            break;
        }
      }
    );
  };

  // Reader View

  const [readerDetails, setReaderDetails] = useState<ReaderView | null>(null);
  const { fetchParsedArticle } = articleStore.getState().articleSlice;
  useEffect(() => {
    const fetch = async () => {
      await fetchParsedArticle(article.link);
    };
    fetch();
  }, []);
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await fetchParsedArticle(article.link);
      const details = articleStore.getState().articleSlice.readerView;
      setReaderDetails(details);
      setIsReaderView(true);
      setLoading(false);
    };
    fetch();
  }, [article.link]);

  return (
    <SafeAreaView className="flex-1 bg-[#66858a]" edges={['top']}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
          backgroundColor: '#66858a',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{ backgroundColor: '#C1E1E0', padding: 2, borderRadius: 20 }}>
            <Ionicons className="-ml-0.5 mr-0.5" name="chevron-back" color="#000000" size={24} />
          </View>
        </TouchableOpacity>
        <Text style={{ marginLeft: 10, fontWeight: 'bold', color: '#FFFF' }}>
          {titleCase(article.source)} {isReaderView ? ' (Reader View)' : ''}
        </Text>
        <TouchableOpacity onPress={handleOptions}>
          <View style={{ backgroundColor: '#C1E1E0', padding: 2, borderRadius: 20 }}>
            <Ionicons name="ellipsis-horizontal" color="#000000" size={24} />
          </View>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="flex-1 bg-white">
          <Text className="m-10">Reader View Loading....</Text>
        </View>
      ) : (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
          {isReaderView && readerDetails ? (
            <ReaderViewComponent
              url={article.link}
              title={article.title}
              pubDate={article.pubDate}
              source={article.source}
              readerDetails={readerDetails}
            />
          ) : (
            <WebView
              source={{ uri: article.link }}
              style={{ flex: 1 }}
              javaScriptEnabled
              startInLoadingState
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
