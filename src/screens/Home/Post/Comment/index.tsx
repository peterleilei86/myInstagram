import React from 'react';
import { View, Text } from 'react-native';

interface CommentProps {
  username: string;
  message: string;
}

export default ({ username, message }: CommentProps) => {
  return (
    <View style={{ flexDirection: 'row', width: '100%' }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
        {username}{' '}
        {message.split(' ').map((phrase, i) => {
          if (phrase.startsWith('#')) {
            return (
              <Text
                key={`${i}__${phrase}`}
                style={{ fontWeight: 'normal', color: '#013569' }}
              >
                {phrase}{' '}
              </Text>
            );
          }
          return (
            <Text key={`${i}__${phrase}`} style={{ fontWeight: 'normal' }}>
              {phrase}{' '}
            </Text>
          );
        })}
      </Text>
    </View>
  );
};
