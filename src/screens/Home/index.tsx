import React from 'react';
import { View } from 'react-native';
import Stories from './Stories';
import Post from './Post';

function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Stories />
      <Post />
    </View>
  );
}

export default HomeScreen;
