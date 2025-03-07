import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

import { userStore } from '~/store/userStore';
interface FollowedItemProps {
  followedList: { id: string; name: string; image: any }[];
  userID: string | null;
  type: string;
  setRefetchTrigger: () => void;
}

const FollowedItem: React.FC<FollowedItemProps> = ({
  followedList,
  userID,
  type,
  setRefetchTrigger,
}) => {
  const { categories, bookmarks, sources, updateUserSetting } = userStore(
    (state) => state.userSlice
  );
  const handleUnfollow = (itemName: string) => {
    console.log('unfollowed item name', itemName);
    console.log('unfollowed item name', type);
    if (!userID) return;
    let updatedCategories = [...categories];
    let updatedSources = [...sources];
    if (type === 'topic') {
      if (updatedCategories.includes(itemName)) {
        updatedCategories = updatedCategories.filter((curr) => curr !== itemName);
        console.log('Updated categories', updatedCategories);
      }
    } else if (type === 'channel') {
      if (updatedSources.includes(itemName)) {
        updatedSources = updatedSources.filter((curr) => curr !== itemName);
      }
    }
    const newPreferences = { categories: updatedCategories, sources: updatedSources, bookmarks };
    updateUserSetting(newPreferences, userID);
    setRefetchTrigger();
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
            onPress={() => handleUnfollow(item.name)}>
            <Text className="font-bold text-white">Unfollow</Text>
          </TouchableOpacity>
        </View>
      )}
      rightOpenValue={-100} // Swipe left to show "Unfollow"
    />
  );
};

export default FollowedItem;
