import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import ActionSheet, { SheetManager, SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Document reference: https://www.npmjs.com/package/react-native-actions-sheet

interface ListStructure {
  id: number;
  name: string;
  image: any;
}

interface CustomizeModalProps {
  optionList: ListStructure[];
}

const CustomizeModal: React.FC<CustomizeModalProps> = ({ optionList }) => {
  // Need add filter out items that are currently existing on user list
  const renderItem = ({ item }: { item: ListStructure }) => (
    <TouchableOpacity style={styles.option}>
      <Image source={item.image} style={styles.optionImage} />
      <Text style={styles.optionText}>{item.name}</Text>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SheetProvider context="global">
          {/* Button to open the action sheet */}
          <TouchableOpacity
            onPress={() => SheetManager.show('customize-sheet')}
            style={styles.openButton}>
            <Text style={styles.openButtonText}>Open Customize</Text>
          </TouchableOpacity>

          {/* The ActionSheet */}
          <ActionSheet
            id="customize-sheet"
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

const styles = StyleSheet.create({
  openButton: {
    padding: 10,
    backgroundColor: '#FECC5F',
    borderRadius: 10,
    alignSelf: 'center',
  },
  openButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  sheetContainer: {
    padding: 20,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  addButton: {
    padding: 5,
    backgroundColor: '#FECC5F',
    borderRadius: 5,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CustomizeModal;
