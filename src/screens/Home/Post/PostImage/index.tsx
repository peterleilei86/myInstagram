import React from 'react';
import { View, Image, TouchableWithoutFeedback, Alert } from 'react-native';

interface PostImageProps {
  delay?: number;
}

export default ({ delay = 300 }: PostImageProps) => {
  let lastTap: any = null;
  const onDoubleTap = () => {
    //TODO: toggle like
    Alert.alert('hi', 'you double tapped!');
  };

  const handleDouleTap = () => {
    const now = Date.now();
    if (lastTap && now - lastTap < delay) {
      onDoubleTap();
    } else {
      lastTap = now;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleDouleTap}>
      <View style={{ width: '100%', height: 375 }}>
        <Image
          source={{ uri: 'https://source.unsplash.com/random/375X375' }}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
