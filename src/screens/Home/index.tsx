import React from 'react';
import { View, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { AuthenticatedStackList } from 'src/routes/types';
import Stories from './Stories';
import Post from './Post';
import { usePost, useStories } from './hooks';
import { getMe } from '../../hacks';

function HomeScreen({
  route,
}: {
  route: RouteProp<AuthenticatedStackList, 'Home'>;
}) {
  const {
    state: { posts, refreshing },
    onLoad,
  } = usePost();
  const { users, setUsers, refreshusers } = useStories();

  const { email } = JSON.parse(route.params.token);
  const me = getMe(email);

  const fetchMorePosts = () => onLoad();

  const handleRefresh = () => {
    refreshusers();
    onLoad(false, true);
  };

  const handleRenderItem = ({ item, index }: any) => {
    return <Post key={index} post={item} />;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={posts}
        renderItem={handleRenderItem}
        ListHeaderComponent={() => {
          return <Stories setUsers={setUsers} me={me} users={users} />;
        }}
        refreshing={refreshing}
        onEndReached={fetchMorePosts}
        onEndReachedThreshold={0.8}
        onRefresh={handleRefresh}
      />
    </View>
  );
}

export default HomeScreen;
