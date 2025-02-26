import { Text, View } from 'react-native';

import { Article } from '../src/types';

export default function ArticlePreview({ article }: { article: Article }) {
  return (
    <View className="mx-2 my-1 flex flex-col rounded-md bg-gray-100 p-3">
      <Text className="font-bold">{article.title}</Text>
      <Text>{article.description}</Text>
    </View>
  );
}
