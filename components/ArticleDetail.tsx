import { useActionSheet } from '@expo/react-native-action-sheet';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { View, Button, SafeAreaView, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { titleCase } from 'title-case';

import { RootStackParamList } from '../types';
import ReaderViewComponent from './ReaderView';

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
        options: ['Reader View', 'Follow Topic', 'Cancel'],
        cancelButtonIndex: 2,
      },
      (index?: number) => {
        console.log('Clicked button at index:', index);
      }
    );
  };

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
      setLoading(false);
    };
    fetch();
  }, [article.link]);

  // console.log(articleView);



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#66858A' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
          backgroundColor: '#66858A',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{ backgroundColor: '#C1E1E0', padding: 2, borderRadius: 20 }}>
            <Ionicons name="chevron-back" color="#000000" size={24} />
          </View>
        </TouchableOpacity>
        <Text style={{ marginLeft: 10, fontWeight: 'bold', color: '#FFFF' }}>
          {titleCase(article.source)}
        </Text>
        <TouchableOpacity onPress={handleOptions}>
          <View style={{ backgroundColor: '#C1E1E0', padding: 2, borderRadius: 20 }}>
            <Ionicons name="ellipsis-horizontal" color="#000000" size={24} />
          </View>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ flex: 1, height: 200, backgroundColor: '#FFFFFF' }}>
          <Text>Loading....</Text>
        </View>
      ) : (
        <View style={{ flex: 1, height: 200, backgroundColor: '#FFFFFF' }}>
          {readerDetails ? (
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
