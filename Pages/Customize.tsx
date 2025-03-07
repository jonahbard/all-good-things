import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { categoriesList, sourcesList } from './data';

import CustomizeModal from '~/components/CustomizeModal';
import FollowedItem from '~/components/FollowedItem';
import { userStore } from '~/store/userStore';
const Customize = () => {
  const [userID, setUserID] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const {
    categories,
    bookmarks,
    sources,
    fetchUserCateogries,
    fetchUserSources,
    updateUserSetting,
  } = userStore((state) => state.userSlice);
  const [parsedCategories, setParsedCategories] = useState<
    { id: string; name: string; image: any }[]
  >([]);
  const [parsedSources, setParsedSources] = useState<{ id: string; name: string; image: any }[]>(
    []
  );
  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user-storage');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserID(parsedUser?.userID || 'Not Found'); // ✅ Get userID directly
        }
      } catch (error) {
        console.error('Error fetching userID from AsyncStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserID();
  }, []);

  useEffect(() => {
    if (userID) {
      fetchUserCateogries(userID);
      fetchUserSources(userID);
    }
    // console.log(sources);
  }, []);

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
    <View style={styles.container}>
      <Text style={styles.header}>Personalize for you</Text>

      {/* Followed Channels */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Followed Channels</Text>
        <FollowedItem followedList={parsedSources} />
        <CustomizeModal optionList={sourcesList} />
      </View>

      {/* Followed Topics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Followed Topics</Text>
        <FollowedItem followedList={parsedCategories} />
        <CustomizeModal optionList={categoriesList} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 100,
    backgroundColor: '#fff',
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
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
});
export default Customize;
