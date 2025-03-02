// filepath: /Users/jonahbard/Developer/all-good-things/components/ArticleDetail.tsx
import { useRoute, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, Image, SafeAreaView, Linking, Button } from 'react-native';
import { titleCase } from 'title-case';

import { Article } from '../types';

export default function ArticleDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { article } = route.params as { article: Article };

  return (
    <SafeAreaView className="my-1 flex flex-col rounded-md bg-white">
      <View className="self-start px-3">
        <Button title="⏴ feed" onPress={() => navigation.goBack()} />
      </View>
      {article.img && (
        <Image
          className="self-center"
          source={{ uri: article.img }}
          style={{ width: '100%', aspectRatio: 1.5 }}
          resizeMode="contain"
        />
      )}
      <View className="mx-2 my-1 flex flex-col p-3">
        <Text className="pb-3 text-xl font-bold">{article.title}</Text>
        <Text className="pb-3">{article.description}</Text>
        {/* <Text>{article.tags.join(', ')}</Text> */}
        <Text className="font-bold">{titleCase(article.source)}</Text>
        <Text
          style={{ color: 'blue' }}
          onPress={() => {
            if (article.link) {
              Linking.openURL(article.link);
            }
          }}>
          {article.link}
        </Text>
        {/* <Text>{article.publishedDate.toDateString()}</Text> */}
      </View>
    </SafeAreaView>
  );
}
