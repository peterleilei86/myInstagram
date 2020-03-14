import React from 'react';
import { View, ScrollView } from 'react-native';
import Circle from './Circle';
import { IStory, IUser } from '../../../hacks/typs';

function Stories({
  stories,
  user,
}: {
  stories: IStory[];
  user: Partial<IUser>;
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
      <ScrollView horizontal style={{ paddingLeft: 10.5 }}>
        <Circle
          imgUrl={user.avatarImg!}
          username={user.displayName!}
          story={{ has: false, new: false }}
          isOwn={true}
        />
        {stories.map((s, i) => {
          return (
            <Circle
              imgUrl={s.avatarImage}
              username={s.username!}
              story={{ has: true, new: s.isNew }}
              key={i}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default Stories;
