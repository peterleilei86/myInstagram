import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Circle from './Circle';

function Stories() {
  return (
    <View
      style={{
        height: 128,
        width: '100%',
        backgroundColor: '#fafafa',
        borderBottomColor: '#dbdbdb',
        borderBottomWidth: 1,
      }}
    >
      <View
        style={{
          width: '100%',
          height: 28.5,
          paddingHorizontal: 7.5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <Text>Stories</Text>
        <Text>Watch all</Text>
      </View>
      <ScrollView horizontal style={{ paddingLeft: 10.5, marginTop: 14.5 }}>
        {Array(9)
          .fill(null)
          .map((_, i) => (
            <Circle
              imgUrl="https://source.unsplash.com/random/60x60"
              height={60}
              width={60}
              story={{ has: i % 2 === 0, new: i % 3 === 0 }}
              inset={4}
              key={i}
            />
          ))}
      </ScrollView>
    </View>
  );
}

export default Stories;
