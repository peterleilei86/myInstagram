import React from 'react';
import { View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function HomeHeaderLeft() {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={{ marginLeft: 15 }}>
        <Image
          source={require('./img/camera.png')}
          style={{ width: 24, height: 21 }}
        />
      </View>
    </TouchableOpacity>
  );
}

export default HomeHeaderLeft;
