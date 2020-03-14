import React, { useState } from 'react';
import { View, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import Loading from '../../../../components/LoadingIndicator';

interface PostImageProps {
  imgUrl: string;
}

export default ({ imgUrl }: PostImageProps) => {
  const [loading, setLoading] = useState(true);
  let lastTap: any = null;
  const delay = 300;
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
          loadingIndicatorSource={require('../../../../assets/loading.svg')}
          source={{ uri: imgUrl }}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
