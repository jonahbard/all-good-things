import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from 'react-native';

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
  const [scrollEnabled, setScrollEnabled] = useState(true);

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

  interface FollowedItemProps {
    header: string;
    items: { id: string; name: string; image: any }[];
    type: string;
    allList: { id: number; name: string; image: any }[];
    parsedList: { id: string; name: string; image: any }[];
  }

  const renderFollowedItem = ({ header, items, allList, parsedList, type }: FollowedItemProps) => {
    return (
      <View>
        <Text className="font-ibm-bold" style={{ fontSize: 18, color: '#737373' }}>
          {header}
        </Text>
        <FollowedItem
          followedList={items}
          userID={userID}
          type={type}
          scrollStatus={scrollEnabled}
          setScrollEnabled={setScrollEnabled}
          setRefetchTrigger={() => setRefetchTrigger((prev) => prev + 1)}
        />
        <CustomizeModal
          optionList={allList.filter(
            (listItem) => !parsedList.some((parsedItem) => parsedItem.id === listItem.id.toString())
          )}
          id={type === 'topic' ? 'categories-sheet' : 'sources-sheet'}
          setRefetchTrigger={() => setRefetchTrigger((prev) => prev + 1)}
        />
      </View>
    );
  };

  // update the list such that we don't end up adding duplicate articles
  return (
    <SafeAreaView>
      <Text className="mb-2 ml-3 mt-10 font-ibm-bold text-4xl">customize</Text>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={scrollEnabled}>
        <View style={styles.container}>
          {renderFollowedItem({
            header: 'My Topics',
            items: parsedCategories,
            allList: categoriesList,
            parsedList: parsedCategories,
            type: 'topic',
          })}

          {renderFollowedItem({
            header: 'My Sources',
            items: parsedSources,
            allList: sourcesList,
            parsedList: parsedSources,
            type: 'channel',
          })}
        </View>
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
});
export default Customize;
