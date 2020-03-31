import React from 'react';
import Circle from '../../../Stories/Circle';
import { View, Text } from 'react-native';
import { IUser } from 'src/hacks/typs';

interface TitleProps {
  user: Partial<IUser>;
  location?: string;
}

function Title({ user, location }: TitleProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Circle
        userId={user.id!}
        imgUrl={user.avatarImg}
        height={35}
        width={35}
        stories={user.stories!}
        styleProp={{ marginRight: 0 }}
        isStory={false}
      />
      <View style={{ marginLeft: 5, justifyContent: 'center' }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#262626' }}>
          {user.displayName}
        </Text>
        {location && (
          <Text style={{ fontSize: 10, color: '#262626' }}>{location}</Text>
        )}
      </View>
    </View>
  );
}

export default Title;
