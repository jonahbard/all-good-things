import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { View, Button, SafeAreaView, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { titleCase } from 'title-case';

import { RootStackParamList, Article } from '../types';

import { articleStore } from '~/store/articleStore';

type ArticleDetailNavigationProp = StackNavigationProp<RootStackParamList, 'ArticleDetail'>;
// Webview
export default function ArticleDetail() {
  const route = useRoute();
  const navigation = useNavigation<ArticleDetailNavigationProp>();
  const { article } = route.params as { article: Article };
  const { articleView, fetchParsedArticle } = articleStore((state) => state.articleSlice);
  console.log(article.link);
  // Crediting chatGPT for removing the Ads
  const injectScript = `
  function enableReaderMode() {
      document.body.innerHTML = document.getElementsByTagName('article')[0]?.innerHTML || document.body.innerHTML;
      document.body.style.fontSize = '18px';
      document.body.style.lineHeight = '1.6';
      document.body.style.backgroundColor = '#f4f4f4';
  }
  enableReaderMode();
`;
  useEffect(() => {
    fetchParsedArticle(article.link);
  }, []);
  console.log(articleView);

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
            <Ionicons name="chevron-back" color="#000000" size={24} />,
          </View>
        </TouchableOpacity>
        <Text style={{ marginLeft: 10, fontWeight: 'bold', color: '#FFFF' }}>
          {titleCase(article.source)}
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{ backgroundColor: '#C1E1E0', padding: 2, borderRadius: 20 }}>
            <Ionicons name="ellipsis-horizontal" color="#000000" size={24} />,
          </View>
        </TouchableOpacity>
      </View>
      <WebView
        source={{ uri: article.link }}
        style={{ flex: 1 }}
        injectedJavaScript={injectScript}
        javaScriptEnabled
        startInLoadingState
      />
    </SafeAreaView>
  );
}
