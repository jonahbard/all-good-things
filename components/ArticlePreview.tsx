import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, View, TouchableOpacity } from 'react-native';

import { Article } from '../src/types';

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
      </View>
    </TouchableOpacity>
  );
}
