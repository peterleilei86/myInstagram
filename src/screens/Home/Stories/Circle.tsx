import React from 'react';
import {
  View,
  Image,
  StyleProp,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';

interface Profile {
  imgUrl?: string;
  username: string;
  story: { has: boolean; new: boolean };
  height?: number;
  width?: number;
  isOwn?: boolean;
  isStory?: boolean;
  styleProp?: StyleProp<any>;
}

function Circle({
  imgUrl,
  username,
  story,
  height,
  isOwn = false,
  width,
  isStory = true,
  styleProp,
}: Profile) {
  return (
    <TouchableWithoutFeedback onPress={() => {}}>
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
            story.has && {
              padding: 2,
              borderWidth: 1.5,
              borderColor: story.new ? 'red' : '#dbdbdb',
            },
          ]}
        >
          {!story.has && isOwn && (
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
