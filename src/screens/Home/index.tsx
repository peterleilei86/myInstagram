import React from 'react';
import { View, FlatList } from 'react-native';
import Stories from './Stories';
import Post from './Post';
import { usePost, useStories } from './Post/hooks';
import { getUser } from '../../hacks';
import { RouteProp } from '@react-navigation/native';

/**
 * DONE: 1.Fetch posts data
 * DONE: 2.wrap Post component in FLATLIST
 */

function HomeScreen({ route }: any) {
  const { posts, setCurrentPage } = usePost();
  const { stories, setStories } = useStories();
  const { email } = JSON.parse(route.params.token);
  const user = getUser(email);

  const fetchMorePosts = () => setCurrentPage(p => p + 1);

  const handleRenderItem = ({ item, index }: any) => {
    return <Post key={index} post={item} />;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={posts}
        renderItem={handleRenderItem}
        ListHeaderComponent={() => {
          return <Stories user={user} stories={stories} />;
        }}
        onEndReached={fetchMorePosts}
        onEndReachedThreshold={0.3}
      />
    </View>
  );
}

export default HomeScreen;
