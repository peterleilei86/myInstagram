import React from 'react';
import { TouchableWithoutFeedback, Image } from 'react-native';

export default () => {
  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <Image
        source={require('./img/Like.png')}
        style={{ width: 24, height: 20.5 }}
      />
    </TouchableWithoutFeedback>
  );
};
