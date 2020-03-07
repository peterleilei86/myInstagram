import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Dot = () => (
  <View
    style={{ backgroundColor: 'black', width: 3, height: 3, borderRadius: 50 }}
  />
);

export default () => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View
        style={{
          flexDirection: 'row',
          width: 15,
          justifyContent: 'space-around',
        }}
      >
        <Dot />
        <Dot />
        <Dot />
      </View>
    </TouchableOpacity>
  );
};
