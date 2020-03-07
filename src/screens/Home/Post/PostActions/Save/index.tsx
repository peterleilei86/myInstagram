import React from 'react';
import { TouchableWithoutFeedback, Image } from 'react-native';

export default () => {
  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <Image
        source={require('./img/Save.png')}
        style={{ width: 16.5, height: 21 }}
      />
    </TouchableWithoutFeedback>
  );
};
