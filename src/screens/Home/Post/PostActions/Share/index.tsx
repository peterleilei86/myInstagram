import React from 'react';
import { TouchableWithoutFeedback, Image } from 'react-native';

export default () => {
  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <Image
        source={require('./img/share.png')}
        style={{ width: 22.5, height: 19.5 }}
      />
    </TouchableWithoutFeedback>
  );
};
