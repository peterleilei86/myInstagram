import React from 'react';
import {
  View,
  Image,
  StyleProp,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import { IStory } from 'src/hacks/typs';
import { useNavigation } from '@react-navigation/native';

interface Profile {
  userId: string;
  imgUrl?: string;
  username?: string;
  stories: IStory[];
  height?: number;
  width?: number;
  isOwn?: boolean;
  isStory?: boolean;
  styleProp?: StyleProp<any>;
}

function Circle({
  userId,
  imgUrl,
  username,
  stories,
  height,
  isOwn = false,
  width,
  isStory = true,
  styleProp,
}: Profile) {
  const allSeen = stories && stories.length && stories.every(s => s.seen);
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (isOwn && stories.length === 0) {
          // open camera
        } else {
          navigation.navigate('Story', { userId, stories });
        }
      }}
    >
      <View
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 21,
          },
          styleProp,
        ]}
      >
        <View
          style={[
            {
              width,
              height,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
              position: 'relative',
            },
            stories &&
              stories.length !== 0 && {
                padding: 2,
                borderWidth: 1.5,
                borderColor: !allSeen ? 'red' : '#dbdbdb',
              },
          ]}
        >
          {stories && stories.length === 0 && isOwn && (
            <View
              style={{
                borderRadius: 50,
                backgroundColor: '#3897f0',
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 15,
                height: 15,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 2,
              }}
            >
              <Image
                source={require('./img/add.png')}
                style={{
                  width: 8,
                  height: 8,
                }}
              />
            </View>
          )}
          <Image
            source={{ uri: imgUrl }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 50,
            }}
          />
        </View>
        {isStory && (
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              width: 60,
              fontSize: 10,
              color: isOwn ? '#a5a5a5' : '#262626',
              marginTop: 2.5,
            }}
          >
            {username}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

Circle.defaultProps = {
  width: 64,
  height: 64,
};

export default Circle;
