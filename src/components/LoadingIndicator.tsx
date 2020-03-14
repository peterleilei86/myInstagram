import React from 'react';
import { View, ActivityIndicator, ActivityIndicatorProps } from 'react-native';

function Loading({ color, size }: ActivityIndicatorProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

export default Loading;
