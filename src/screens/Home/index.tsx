import React from 'react';
import { View } from 'react-native';
import Stories from './Stories';
import Post from './Post';
import { ScrollView } from 'react-native-gesture-handler';

/**
 * TODO: 1.Fetch posts data
 * TODO: 2.wrap Post component in FLATLIST
 */

function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <Stories />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
