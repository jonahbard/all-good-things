import React, {useEffect, useState}from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet } from 'react-native';

import { userStore } from '~/store/userStore';
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
