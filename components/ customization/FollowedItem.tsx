import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { titleCase } from 'title-case';

import { userStore } from '~/store/userStore';
interface FollowedItemProps {
  followedList: { id: string; name: string; image: any }[];
  userID: string | null;
  type: string;
  setRefetchTrigger: () => void;
  scrollStatus: boolean;
  setScrollEnabled: (ScrollEnabled: boolean) => void;
}

const FollowedItem: React.FC<FollowedItemProps> = ({
  followedList,
  type,
  setRefetchTrigger,
  scrollStatus,
  setScrollEnabled,
}) => {
  const userID = userStore((state) => state.userSlice.userID);
  const updateUserSetting = userStore((state) => state.userSlice.updateUserSetting);

  const [localList, setLocalList] = useState(followedList);
  useEffect(() => {
    setLocalList(followedList);
  }, [followedList]);

  const handleUnfollow = async (itemName: string) => {
    console.log('unfollowed item name', type);
    if (!userID) return;
    setLocalList((prevList) => prevList.filter((item) => item.name !== itemName)); // instant update locally fitst
    // update status
    if (type === 'topic') {
      userStore.getState().userSlice.setCategories(itemName);
    } else if (type === 'channel') {
      userStore.getState().userSlice.setSources(itemName);
    }
    const { categories, sources, bookmarks } = userStore.getState().userSlice; // get directly most recent info
    try {
      await updateUserSetting({ categories, sources, bookmarks }, userID); // wait for fetching
    } catch (error) {
      console.error('Failed to update user settings', error);
    }
  };
  const handleSwipe = () => {
    setScrollEnabled(false);
  };

  const handleUnswipe = () => {
    setScrollEnabled(true);
  };
  // Tried to update it such that when you swipe the screen won't move
  return (
    <SwipeListView
      data={localList}
      scrollEnabled={scrollStatus}
      onRowOpen={handleSwipe}
      onRowClose={handleUnswipe}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="flex-row items-center border-b border-gray-200 bg-white py-4 px-1">
          <Image source={item.image} className="mr-3 h-8 w-8" resizeMode="contain" />
          <Text className="font-ibm text-lg">{titleCase(item.name)}</Text>
        </View>
      )}
      renderHiddenItem={({ item }) => (
        <View className="absolute right-0 h-full w-[100px] items-center justify-center">
          <TouchableOpacity
            className="rounded-md bg-red-500 px-4 py-2"
            onPress={() => handleUnfollow(item.name)}>
            <Text className="font-ibm-bold text-white">Unfollow</Text>
          </TouchableOpacity>
        </View>
      )}
      rightOpenValue={-100} // Swipe left to show "Unfollow"
    />
  );
};

export default FollowedItem;
