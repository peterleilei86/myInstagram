import React from 'react';
import { View, Text, Image } from 'react-native';

function Fb() {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Image
        source={require('./img/fb.png')}
        style={{ width: 15, height: 15 }}
      />
      <Text style={{ color: '#fff', fontSize: 12, marginLeft: 5 }}>
        Continue with Facebook
      </Text>
    </View>
  );
}

export default Fb;
