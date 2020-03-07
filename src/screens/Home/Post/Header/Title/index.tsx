import React from 'react';
import Circle from '../../../Stories/Circle';
import { View, Text } from 'react-native';

interface TitleProps {
  name: string;
  imgUrl: string;
  location?: string;
}

function Title({ name, location, imgUrl }: TitleProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Circle
        imgUrl={imgUrl}
        height={35}
        width={35}
        story={{ has: true, new: true }}
        styleProp={{ marginRight: 0 }}
        isStory={false}
      />
      <View style={{ marginLeft: 5, justifyContent: 'center' }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#262626' }}>
          {name}
        </Text>
        {location && (
          <Text style={{ fontSize: 10, color: '#262626' }}>{location}</Text>
        )}
      </View>
    </View>
  );
}

export default Title;
