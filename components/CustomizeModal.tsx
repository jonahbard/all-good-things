import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import ActionSheet, { SheetManager, SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface ListStructure {
  id: number;
  name: string;
  image: any;
}

interface CustomizeModalProps {
  optionList: ListStructure[];
}

const CustomizeModal: React.FC<CustomizeModalProps> = ({ optionList }) => {
  // Render each item in the list
  const renderItem = ({ item }: { item: ListStructure }) => (
    <TouchableOpacity className="flex-row items-center border-b border-gray-300 p-3">
      <Image source={item.image} className="mr-3 h-10 w-10" />
      <Text className="flex-1 text-lg">{item.name}</Text>
      <TouchableOpacity className="rounded-md bg-yellow-400 px-2 py-1">
        <Text className="text-lg font-bold text-black">+</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView className="">
        <SheetProvider context="global">
          {/* Open Action Sheet Button */}
          <TouchableOpacity
            onPress={() => SheetManager.show('customize-sheet')}
            className="self-center rounded-lg bg-yellow-400 px-4 py-3">
            <Text className="text-lg font-bold text-black">Open Customize</Text>
          </TouchableOpacity>

          {/* ActionSheet Modal */}
          <ActionSheet
            id="customize-sheet"
            gestureEnabled
            closeOnTouchBackdrop
            onClose={() => console.log('Sheet closed')}>
            <View className="max-h-[500px] rounded-[10px] p-5">
              <Text className="mb-3 text-xl font-bold">Suggested</Text>
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

export default CustomizeModal;
