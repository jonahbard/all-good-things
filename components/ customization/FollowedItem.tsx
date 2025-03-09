import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

import { userStore } from '~/store/userStore';
interface FollowedItemProps {
  followedList: { id: string; name: string; image: any }[];
  userID: string | null;
  type: string;
  setRefetchTrigger: () => void;
}

const FollowedItem: React.FC<FollowedItemProps> = ({ followedList, type, setRefetchTrigger }) => {
  const userID = userStore((state) => state.userSlice.userID);
  const updateUserSetting = userStore((state) => state.userSlice.updateUserSetting);

  const [localList, setLocalList] = useState(followedList);
  useEffect(() => {
    setLocalList(followedList);
  }, [followedList]);

  const handleUnfollow = async (itemName: string) => {
    console.log('unfollowed item name', type);
    if (!userID) return;
    setLocalList((prevList) => prevList.filter((item) => item.name !== itemName));
    if (type === 'topic') {
      userStore.getState().userSlice.setCategories(itemName);
    } else if (type === 'channel') {
      userStore.getState().userSlice.setSources(itemName);
    }
    const { categories, sources, bookmarks } = userStore.getState().userSlice;
    try {
      await updateUserSetting({ categories, sources, bookmarks }, userID);
    } catch (error) {
      console.error('Failed to update user settings', error);
    }
  };

  return (
    <SwipeListView
      data={localList}
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
