import React from 'react';
import { View, ScrollView } from 'react-native';
import Circle from './Circle';
import { IStory, IUser } from '../../../hacks/typs';

function Stories({
  users,
  me,
  setUsers,
}: {
  users: Partial<IUser>[];
  me: Partial<IUser>;
  setUsers: React.Dispatch<React.SetStateAction<Partial<IUser>[]>>;
}) {
  const updateStory = (userId: string, storyKey: string) => {
    const user = users.find(u => u.id === userId);
    const newStories = user!.stories!.map(s =>
      s.key === storyKey ? { ...s, seen: true } : s,
    );
    const newUsers = users.map(u =>
      u.id === userId ? { ...u, stories: newStories } : u,
    );
    setUsers(newUsers);
  };

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
      <ScrollView horizontal style={{ paddingLeft: 10.5 }}>
        <Circle
          userId={me.id!}
          imgUrl={me.avatarImg!}
          username={me.displayName!}
          stories={me.stories!}
          isOwn={true}
          onPress={updateStory}
        />
        {users.map((u, i) => {
          return (
            <Circle
              userId={u.id!}
              imgUrl={u.avatarImg}
              username={u.displayName!}
              stories={u.stories!}
              key={i}
              onPress={updateStory}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default Stories;
