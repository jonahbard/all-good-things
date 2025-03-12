import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
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
        <Text style={styles.sectionTitle}>{header}</Text>
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
  // Citing chat here for boiler template but it was too complex and stylstically looks horrible, so just scraped out what i needed from there
  return (
    <SafeAreaView style={{ flex: 1, marginTop: -50, backgroundColor: '#ffffff' }}>
      <FlatList
        data={[]}
        keyExtractor={() => 'customize'}
        renderItem={null}
        scrollEnabled={scrollEnabled}
        ListHeaderComponent={
          <View style={styles.container}>
            <Text style={styles.header}>Personalize for you</Text>
            {renderFollowedItem({
              header: 'Followed topics',
              items: parsedCategories,
              allList: categoriesList,
              parsedList: parsedCategories,
              type: 'topic',
            })}
            {renderFollowedItem({
              header: 'Followed channels',
              items: parsedSources,
              allList: sourcesList,
              parsedList: parsedSources,
              type: 'channel',
            })}
          </View>
        }
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 100,
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
});
export default Customize;
