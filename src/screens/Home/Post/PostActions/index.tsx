import React from 'react';
import { View } from 'react-native';
import Like from './Like';
import Comment from './Comment';
import Save from './Save';
import Share from './Share';

export default () => {
  return (
    <View
      style={{
        height: 43.5,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          width: 100,
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Like />
        <Comment />
        <Share />
      </View>
      <Save />
    </View>
  );
};
