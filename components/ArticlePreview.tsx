import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, View, TouchableOpacity } from 'react-native';

import { RootStackParamList, Article } from '../types';
import { addBookmark } from '../lib/bookmark-functionality';

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

  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="mx-2 my-1 flex flex-col rounded-md bg-white p-3">
        <Text className="font-bold">{article.title}</Text>
        <Text>{article.description}</Text>
        <TouchableOpacity onPress={() => addBookmark(article)}>
          <Text className="text-blue-500">Bookmark</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
