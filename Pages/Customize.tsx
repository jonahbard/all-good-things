import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';

import { categoriesList, sourcesList } from '../data';

import CustomizeModal from '~/components/ customization/CustomizeModal';
import FollowedItem from '~/components/ customization/FollowedItem';
import { userStore } from '~/store/userStore';

const Customize = () => {
  const [userID, setUserID] = useState<string | null>(null);
  const { categories, sources } = userStore((state) => state.userSlice);
  const [refetchTrigger, setRefetchTrigger] = useState<number>(0);
  const [parsedCategories, setParsedCategories] = useState<
    { id: string; name: string; image: any }[]
  >([]);
  const [parsedSources, setParsedSources] = useState<{ id: string; name: string; image: any }[]>(
    []
  );

  useEffect(() => {
    setParsedCategories(
      categoriesList
        .filter((category) => categories.includes(category.name))
        .map((category) => ({ ...category, id: category.id.toString() }))
    );
    setParsedSources(
      sourcesList
        .filter((source) => sources.includes(source.name))
        .map((source) => ({ ...source, id: source.id.toString() }))
    );
  }, [categories, sources]);

  return (
    <SafeAreaView className="px-1">
      <Text className="mb-2 ml-3 mt-10 font-ibm-bold text-4xl">customize</Text>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="relative flex-1 bg-white p-4 pt-[100px]">
          {/* Followed Topics */}
          <Text className="mb-2 font-ibm-bold text-gray-500">followed topics</Text>
          <View className="mb-[30px] font-ibm">
            <FollowedItem
              followedList={parsedCategories}
              userID={userID}
              type="topic"
              setRefetchTrigger={() => setRefetchTrigger((prev) => prev + 1)}
            />
          </View>
          <CustomizeModal
            optionList={categoriesList.filter(
              (category) =>
                !parsedCategories.some(
                  (parsedCategory) => parsedCategory.id === category.id.toString()
                )
            )}
            id="categories-sheet"
            setRefetchTrigger={() => setRefetchTrigger((prev) => prev + 1)}
          />
          {/* Followed Channels */}
          <Text className="mb-2 font-ibm-bold text-gray-500">followed sources</Text>
          <View className="mb-[30px] font-ibm">
            <FollowedItem
              followedList={parsedSources}
              userID={userID}
              type="channel"
              setRefetchTrigger={() => setRefetchTrigger((prev) => prev + 1)}
            />
          </View>
          <CustomizeModal
            optionList={sourcesList.filter(
              (source) =>
                !parsedSources.some((parsedSources) => parsedSources.id === source.id.toString())
            )}
            id="sources-sheet"
            setRefetchTrigger={() => setRefetchTrigger((prev) => prev + 1)}
          />
        </View>
        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Customize;
