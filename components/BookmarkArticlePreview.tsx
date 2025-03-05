import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, View, TouchableOpacity } from 'react-native';

import { removeBookmark } from '../lib/bookmark-functionality';
import { Article } from '../types';

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
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="mx-2 my-1 flex flex-col rounded-md bg-white p-3">
        <Text className="font-bold">{article.title}</Text>
        <Text>{article.description}</Text>
        <TouchableOpacity onPress={() => handleRemoveBookmark()}>
          <Text className="text-blue-500">Remove Bookmark</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
