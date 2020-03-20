import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Dimensions,
  Animated,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootAuthStackList } from 'src/routes/types';
import { IStory } from 'src/hacks/typs';
import { useStories } from '../../contexts/stories';

export default () => {
  const { params } = useRoute<RouteProp<RootAuthStackList, 'Story'>>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { updateStory } = useStories();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'transparent', position: 'relative' }}
    >
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingHorizontal: 5,
          position: 'relative',
          zIndex: 3,
        }}
      >
        {params.stories.map((s: IStory, i: number) => (
          <Bar
            key={i}
            index={i}
            start={i === currentIndex}
            setCurrentIndex={setCurrentIndex}
            max={params.stories.length}
            userId={params.userId}
            story={s}
            update={updateStory}
          />
        ))}
      </View>
      {params.stories.map((s: IStory, i: number) =>
        i === currentIndex ? <BackgroundImage key={i} uri={s.story} /> : null,
      )}
    </SafeAreaView>
  );
};

function BackgroundImage({ uri }: { uri: string }) {
  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Image
        source={{ uri }}
        style={{
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height,
        }}
      />
    </View>
  );
}

function Bar({
  index,
  start,
  setCurrentIndex,
  max,
  update,
  userId,
  story,
}: {
  index: number;
  start: boolean;
  setCurrentIndex: any;
  max: number;
  update: any;
  userId: string;
  story: IStory;
}) {
  const navigation = useNavigation();
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    if (start) {
      Animated.timing(progress, {
        toValue: 100,
        duration: 3000,
      }).start(() => {
        if (index === max - 1) {
          navigation.goBack();
        } else {
          setCurrentIndex(index + 1);
        }
        update(userId, story.key);
      });
    }
  }, [start]);

  const width = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View
      style={{
        backgroundColor: 'black',
        opacity: 0.6,
        height: 1.5,
        flex: 1,
        borderRadius: 2.5,
        marginRight: 5,
      }}
    >
      <Animated.View
        style={{
          height: 1.5,
          width,
          borderRadius: 2.5,
          backgroundColor: '#fafafa',
        }}
      />
    </View>
  );
}
