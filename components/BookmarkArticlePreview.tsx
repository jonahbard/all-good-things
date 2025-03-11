import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Sharing from 'expo-sharing';
import { SymbolView } from 'expo-symbols';
import { Text, View, TouchableOpacity } from 'react-native';
import { titleCase } from 'title-case';

import { removeBookmark } from '../lib/bookmark-functionality';

import { Article } from '~/store/articleStore';

// Define the type for the navigation prop
type ArticlePreviewNavigationProp = NativeStackNavigationProp<
  { Home: undefined; ArticleDetail: { article: Article } },
  'Home' | 'ArticleDetail'
>;

export default function BookmarkArticlePreview({
  navigation,
  article,
  onRemove,
}: {
  navigation: ArticlePreviewNavigationProp;
  article: Article;
  onRemove: () => void;
}) {
  const handlePress = () => {
    navigation.navigate('ArticleDetail', { article });
  };

  const handleRemoveBookmark = async () => {
    await removeBookmark(article);
    onRemove(); // Call the refresh function after removing
    // The event emitted in removeBookmark will notify ArticlePreview components
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
      <View className="mx-2 my-1 flex flex-row items-center rounded-md bg-white p-3">
        <View className="flex-1">
          <Text className="font-ibm-bold">{article.title}</Text>
          <Text className=" font-ibm text-gray-600">
            <Text className="italic">{titleCase(article.source)}</Text>
            {article.pubDate ? ` • ${formatDate(article.pubDate)}` : ''}
          </Text>
          <Text className="font-ibm">{article.description}</Text>
        </View>
        <View className="mx-3 flex flex-col">
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
            <SymbolView name="square.and.arrow.up" style={{ margin: 3 }} tintColor="#f5a612" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRemoveBookmark} style={{ marginLeft: 'auto' }}>
            <SymbolView name="bookmark.fill" style={{ margin: 3 }} tintColor="#f5a612" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
