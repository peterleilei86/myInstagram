import React from 'react';
import { Image } from 'react-native';

function Logo() {
  return (
    <Image
      source={require('./img/logo.png')}
      style={{ width: 100, height: 30 }}
    />
  );
}

export default Logo;
