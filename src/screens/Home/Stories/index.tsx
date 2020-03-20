import React from 'react';
import { View, ScrollView } from 'react-native';
import Circle from './Circle';
import { IUser } from '../../../hacks/typs';

function Stories({
  users,
  me,
  setUsers,
}: {
  users: Partial<IUser>[];
  me: Partial<IUser>;
  setUsers: React.Dispatch<React.SetStateAction<Partial<IUser>[]>>;
}) {
  return (
    <View
      style={{
        height: 105,
        width: '100%',
        backgroundColor: '#fafafa',
        borderBottomColor: '#dbdbdb',
        borderBottomWidth: 1,
      }}
    >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ paddingLeft: 10.5 }}
      >
        <Circle
          userId={me.id!}
          imgUrl={me.avatarImg!}
          username={me.displayName!}
          stories={me.stories!}
          isOwn={true}
        />
        {users.map((u, i) => {
          return (
            <Circle
              userId={u.id!}
              imgUrl={u.avatarImg}
              username={u.displayName!}
              stories={u.stories!}
              key={i}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default Stories;
