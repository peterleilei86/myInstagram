import React from 'react';
import { View } from 'react-native';
import Circle from '../../Stories/Circle';

function Title() {
  return (
    <View style={{ height: 56, width: '100%' }}>
      <Circle
        imgUrl={'https://source.unsplash.com/random/60x60'}
        height={33}
        width={33}
        inset={1}
        story={{ has: true, new: true }}
      />
    </View>
  );
}

export default Title;
