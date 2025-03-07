import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

interface FollowedItemProps {
  followedList: { id: string; name: string; image: any }[];
}

const FollowedItem: React.FC<FollowedItemProps> = ({ followedList }) => {
  const handleUnfollow = (id: string) => {
    console.log(`Unfollowed: ${id}`);
  };

  return (
    <SwipeListView
      data={followedList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="flex-row items-center border-b border-gray-200 bg-white p-4">
          <Image source={item.image} className="mr-3 h-8 w-8" resizeMode="contain" />
          <Text className="text-lg font-medium">{item.name}</Text>
        </View>
      )}
      renderHiddenItem={({ item }) => (
        <View className="absolute right-0 h-full w-[100px] items-center justify-center">
          <TouchableOpacity
            className="rounded-md bg-red-500 px-4 py-2"
            onPress={() => handleUnfollow(item.id)}>
            <Text className="font-bold text-white">Unfollow</Text>
          </TouchableOpacity>
        </View>
      )}
      rightOpenValue={-100} // Swipe left to show "Unfollow"
    />
  );
};

export default FollowedItem;
