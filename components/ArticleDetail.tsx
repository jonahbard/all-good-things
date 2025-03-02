// filepath: /Users/jonahbard/Developer/all-good-things/components/ArticleDetail.tsx
import { useRoute, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, Image, SafeAreaView, Linking, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import { titleCase } from 'title-case';

import { Article } from '../src/types';

export default function ArticleDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { article } = route.params as { article: Article };

  return (
    <SafeAreaView className="flex-1">
      <View className="self-start px-3">
        <Button title="⏴ feed" onPress={() => navigation.goBack()} />
      </View>
      <WebView
        source={{ uri: article.link }}
        style={{ flex: 1 }}
        startInLoadingState
      />
    </SafeAreaView>
  );
}
