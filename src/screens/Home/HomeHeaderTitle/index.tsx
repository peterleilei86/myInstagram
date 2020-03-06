import React from 'react';
import { View, Image } from 'react-native';

function HomeHeaderTitle() {
  return (
    <View>
      <Image
        source={require('./img/titleLogo.png')}
        style={{ width: 100, height: 30 }}
      />
    </View>
  );
}

export default HomeHeaderTitle;
