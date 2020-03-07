import React from 'react';
import { TouchableWithoutFeedback, Image } from 'react-native';

export default () => {
  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <Image
        source={require('./img/Comment.png')}
        style={{ width: 21, height: 21 }}
      />
    </TouchableWithoutFeedback>
  );
};
