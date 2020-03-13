import React from 'react';
import {
  View,
  Image,
  ImageSourcePropType,
  StyleProp,
  ImageStyle,
} from 'react-native';

export default ({
  source,
  style,
}: {
  source: ImageSourcePropType;
  style: StyleProp<ImageStyle>;
}) => {
  return (
    <View>
      <Image source={source} style={style} />
    </View>
  );
};
