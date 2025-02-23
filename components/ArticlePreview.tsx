import { Text, View } from 'react-native';

export default function ArticlePreview({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <View className="m-2 flex flex-col rounded-sm bg-gray-100 p-2">
      <Text className="font-bold">{title}</Text>
      <Text>{description}</Text>
    </View>
  );
}
