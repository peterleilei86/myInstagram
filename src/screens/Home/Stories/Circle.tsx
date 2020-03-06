import React from 'react';
import { View, Text, Image } from 'react-native';

interface Profile {
  imgUrl: string;
  story: { has: boolean; new: boolean };
  height: number;
  width: number;
  inset: number;
}

function Circle({ imgUrl, story, height, width, inset }: Profile) {
  return (
    <View
      style={
        story.has && story.new
          ? {
              width: width + inset,
              height: height + inset,
              borderRadius: 50,
              borderColor: 'red',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 21,
            }
          : null
      }
    >
      <View
        style={[
          {
            borderRadius: 50,
            width: width - inset,
            height: height - inset,
            justifyContent: 'center',
            alignItems: 'center',
          },
          !story.has && { marginRight: 21, width, height },
          story.has &&
            !story.new && {
              marginRight: 21,
              width: width + inset,
              height: height + inset,
              borderColor: '#dbdbdb',
            },
        ]}
      >
        <Image
          source={{ uri: imgUrl }}
          style={{
            width: story.has ? 56 : 60,
            height: story.has ? 56 : 60,
            borderRadius: 50,
          }}
        />
      </View>
    </View>
  );
}

export default Circle;
