import React from 'react';
import { View } from 'react-native';
import * as faker from 'faker';
import Title from './Title';
import PostOptions from './PostOptions';

export default () => {
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
      <Title
        imgUrl={'https://source.unsplash.com/random/60X60'}
        name={faker.name.firstName()}
      />
      <PostOptions />
    </View>
  );
};
