import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Circle from './Circle';

function Stories() {
  return (
    <View
      style={{
        height: 105,
        width: '100%',
        backgroundColor: '#fafafa',
        borderBottomColor: '#dbdbdb',
        borderBottomWidth: 1,
      }}
    >
      <ScrollView horizontal style={{ paddingLeft: 10.5 }}>
        <Circle
          imgUrl="https://source.unsplash.com/random/60x60"
          story={{ has: false, new: false }}
          isOwn={true}
        />
        {Array(9)
          .fill(null)
          .map((_, i) => (
            <Circle
              imgUrl="https://source.unsplash.com/random/60x60"
              story={{ has: true, new: i % 3 === 0 }}
              key={i}
            />
          ))}
      </ScrollView>
    </View>
  );
}

export default Stories;
