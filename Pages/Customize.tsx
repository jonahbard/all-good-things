import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

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

  // update the list such that we don't end up adding duplicate articles
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text style={styles.header}>Personalize for you</Text>
        {/* Followed Topics */}
        <Text style={styles.sectionTitle}>Followed Topic</Text>
        <View style={styles.section}>
          <FollowedItem
            followedList={parsedCategories}
            userID={userID}
            type="topic"
            setRefetchTrigger={() => setRefetchTrigger((prev) => prev + 1)}
          />
        </View>
        <CustomizeModal
          optionList={categoriesList}
          id="categories-sheet"
          setRefetchTrigger={() => setRefetchTrigger((prev) => prev + 1)}
        />
        {/* Followed Channels */}
        <Text style={styles.sectionTitle}>Followed Sources</Text>
        <View style={styles.section}>
          <FollowedItem
            followedList={parsedSources}
            userID={userID}
            type="channel"
            setRefetchTrigger={() => setRefetchTrigger((prev) => prev + 1)}
          />
        </View>
        <CustomizeModal
          optionList={sourcesList}
          id="sources-sheet"
          setRefetchTrigger={() => setRefetchTrigger((prev) => prev + 1)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
