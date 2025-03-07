import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PlusButtonProps {
  onPress: () => void;
  text: string;
}

const PlusButton: React.FC<PlusButtonProps> = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Text style={styles.plus}>+</Text>
      </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: -30, // brute forcing alignment here
    paddingLeft: 10,
    paddingBottom: 20,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  plus: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    flexShrink: 1,
  },
});

export default PlusButton;
