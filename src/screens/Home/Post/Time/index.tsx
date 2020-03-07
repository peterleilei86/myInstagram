import React from 'react';
import { View, Text } from 'react-native';

export default ({ time }: { time: string }) => {
  return (
    <View style={{ marginVertical: 5 }}>
      <Text style={{ fontSize: 10, color: '#999899' }}>
        {time.toUpperCase()}
      </Text>
    </View>
  );
};
