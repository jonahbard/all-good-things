import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import ActionSheet, { SheetManager, SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import PlusButton from './PlusButton';

import { userStore } from '~/store/userStore';
interface ListStructure {
  id: number;
  name: string;
  image: any;
}

interface CustomizeModalProps {
  id: string;
  optionList: ListStructure[];
  setRefetchTrigger: () => void;
}

const CustomizeModal: React.FC<CustomizeModalProps> = ({ optionList, id, setRefetchTrigger }) => {
  const [userID, setUserID] = useState<string | null>(null);
  const { categories, bookmarks, sources, updateUserSetting } = userStore(
    (state) => state.userSlice
  );
  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user-storage');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserID(parsedUser?.userID || 'Not Found');
        }
      } catch (error) {
        console.error('Error fetching userID from AsyncStorage:', error);
      }
    };
    fetchUserID();
  }, []);
  const handleAddPreference = (itemName: string) => {
    if (!userID) return;
    const updatedCategories = [...categories];
    const updatedSources = [...sources];
    if (id === 'categories-sheet') {
      if (!updatedCategories.includes(itemName)) {
        updatedCategories.push(itemName);
      }
    } else if (id === 'sources-sheet') {
      if (!updatedSources.includes(itemName)) {
        updatedSources.push(itemName);
      }
    }
    const newPreferences = { categories: updatedCategories, sources: updatedSources, bookmarks };
    updateUserSetting(newPreferences, userID);
    setRefetchTrigger();
  };

  // Render each item in the list
  const renderItem = ({ item }: { item: ListStructure }) => (
    <TouchableOpacity style={styles.option}>
      <Image source={item.image} style={styles.optionImage} />
      <Text style={styles.optionText}>{item.name}</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => handleAddPreference(item.name)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.flexContainer}>
        <SheetProvider context="global">
          {/* The plus button to open the sheet, id = reference to which modal*/}
          <PlusButton
            onPress={() => SheetManager.show(id)}
            text={id === 'sources-sheet' ? 'Follow more channels' : 'Follow more topics'}
          />
          {/* the sliding pop up  */}
          <ActionSheet
            id={id}
            gestureEnabled
            closeOnTouchBackdrop
            onClose={() => console.log('Sheet closed')}>
            <View style={styles.sheetContainer}>
              <Text style={styles.sheetTitle}>Suggested</Text>
              <FlatList
                data={optionList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
              />
            </View>
          </ActionSheet>
        </SheetProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

// had issue with styling, citing GPT here for helping me fix it + otherwise using figma dev tools
const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    position: 'relative',
  },
  openButton: {
    alignSelf: 'center',
    backgroundColor: '#FACC15',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  openButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  sheetContainer: {
    maxHeight: 500,
    padding: 20,
    borderRadius: 10,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
  },
  optionImage: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#FACC15',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  plusButton: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  plusButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    flexWrap: 'wrap',
  },
});

export default CustomizeModal;
