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

  // update the list such that we don't end up adding duplicate articles
  return (
    <SafeAreaView>
      <Text className="mb-2 ml-3 mt-10 font-ibm-bold text-4xl">customize</Text>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          {/* Followed Topics */}
          <Text className="font-ibm-bold" style={{ fontSize: 18, color: '#737373' }}>
            My Topics
          </Text>
          <View>
            <FollowedItem
              followedList={parsedCategories}
              userID={userID}
              type="topic"
              setRefetchTrigger={() => setRefetchTrigger((prev) => prev + 1)}
              scrollStatus={scrollEnabled}
              setScrollEnabled={setScrollEnabled}
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
          <Text
            className="font-ibm-bold"
            style={{ fontSize: 18, marginBottom: 3, color: '#737373' }}>
            My Sources
          </Text>
          <View>
            <FollowedItem
              followedList={parsedSources}
              userID={userID}
              type="channel"
              setRefetchTrigger={() => setRefetchTrigger((prev) => prev + 1)}
              scrollStatus={scrollEnabled}
              setScrollEnabled={setScrollEnabled}
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
        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
