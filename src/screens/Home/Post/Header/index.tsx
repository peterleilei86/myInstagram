import React from 'react';
import { View } from 'react-native';
import Title from './Title';
import PostOptions from './PostOptions';
import { IUser } from '../../../../hacks/typs';

export default ({ user, postId }: { user: Partial<IUser>; postId: string }) => {
  return (
    <View
      style={{
        height: 56,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 10,
        paddingHorizontal: 10.5,
        paddingBottom: 11,
        justifyContent: 'space-between',
      }}
    >
      <Title user={user} postId={postId} />
      <PostOptions />
    </View>
  );
};
