import React from 'react';
import { View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function HomeHeaderRight() {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={{ marginRight: 10 }}>
        <Image
          source={require('./img/fly.png')}
          style={{ width: 22.5, height: 19.5 }}
        />
      </View>
    </TouchableOpacity>
  );
}

export default HomeHeaderRight;
