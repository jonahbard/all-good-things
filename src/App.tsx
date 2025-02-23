import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';

import '../global.css';

export default function App() {
  return (
    <>
      <ScreenContent title="Home" path="App.tsx" />
      <StatusBar style="auto" />
      {/* <View className="flex flex-row font-bold">
        <Text>Open up App.tsx to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
      </View> */}
    </>
  );
}
