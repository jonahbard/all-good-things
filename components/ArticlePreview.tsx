import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Sharing from 'expo-sharing';
import { Text, View, TouchableOpacity, Share } from 'react-native';

import { addBookmark } from '../lib/bookmark-functionality';
import { Article } from '../types';

// Define the type for the navigation prop
type ArticlePreviewNavigationProp = NativeStackNavigationProp<
  { Home: undefined; ArticleDetail: { article: Article } },
  'Home' | 'ArticleDetail'
>;

export default function ArticlePreview({
  navigation,
  article,
}: {
  navigation: ArticlePreviewNavigationProp;
  article: Article;
}) {
  const handlePress = () => {
    navigation.navigate('ArticleDetail', { article });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="mx-2 my-1 flex flex-col rounded-md bg-white p-3">
        <Text className="font-bold">{article.title}</Text>
        <Text>{article.description}</Text>
        <TouchableOpacity
          onPress={async () => {
            if (await Sharing.isAvailableAsync()) {
              await Sharing.shareAsync(article.link, {
                dialogTitle: article.title,
                UTI: 'public.url',
              });
            }
          }}>
          <Text className="text-blue-500">Share (pure native)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            try {
              const shareText = 'Check out this good news! ' + article.link;
              await Share.share({
                message: shareText,
                // For iOS, just use the message as the url to ensure text gets shared
                url: shareText,
                title: article.title,
              });
            } catch (error) {
              console.error('Error sharing article:', error);
            }
          }}>
          <Text className="text-blue-500">Share</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => addBookmark(article)}>
          <Text className="text-blue-500">Bookmark</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
