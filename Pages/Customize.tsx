import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CustomizeModal from '~/components/CustomizeModal';
import { userStore } from '~/store/userStore';

const categories = [
  { id: 1, name: 'Science', image: require('../assets/categories/science.png') },
  { id: 2, name: 'Nature', image: require('../assets/categories/nature.png') },
  { id: 3, name: 'Space', image: require('../assets/categories/space.png') },
  { id: 4, name: 'Animals', image: require('../assets/categories/animal.png') },
  { id: 5, name: 'Kindness', image: require('../assets/categories/default.png') },
  { id: 6, name: 'Art', image: require('../assets/categories/default.png') },
  { id: 7, name: 'Health', image: require('../assets/categories/default.png') },
  { id: 8, name: 'Environment', image: require('../assets/categories/default.png') },
  { id: 9, name: 'Archaeology', image: require('../assets/categories/default.png') },
  { id: 10, name: 'Dinosaurs', image: require('../assets/categories/default.png') },
  { id: 11, name: 'History', image: require('../assets/categories/default.png') },
  { id: 12, name: 'Discovery', image: require('../assets/categories/default.png') },
  { id: 13, name: 'Heartwarming', image: require('../assets/categories/default.png') },
  { id: 14, name: 'Inspiring', image: require('../assets/categories/default.png') },
  { id: 15, name: 'Friendship', image: require('../assets/categories/default.png') },
  { id: 16, name: 'Community', image: require('../assets/categories/default.png') },
  { id: 17, name: 'Charity', image: require('../assets/categories/default.png') },
  { id: 18, name: 'Sustainability', image: require('../assets/categories/default.png') },
  { id: 19, name: 'Social Progress', image: require('../assets/categories/default.png') },
  { id: 20, name: 'Sports', image: require('../assets/categories/default.png') },
  { id: 21, name: 'Technology', image: require('../assets/categories/default.png') },
  { id: 22, name: 'Education', image: require('../assets/categories/default.png') },
  { id: 23, name: 'Fashion', image: require('../assets/categories/default.png') },
  { id: 24, name: 'Music', image: require('../assets/categories/default.png') },
  { id: 25, name: 'Love', image: require('../assets/categories/default.png') },
];
const Customize = () => {
  const [userID, setUserID] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <View style={styles.container}>
      <Text>UserID: {userID || 'Not Found'}</Text>
      <Text>News Sources</Text>
      <CustomizeModal optionList={categories} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default Customize;
