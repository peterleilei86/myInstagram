import React from 'react';
import { View } from 'react-native';
import * as faker from 'faker';
import Header from './Header';
import PostImage from './PostImage';
import PostActions from './PostActions';
import Comment from './Comment';
import Time from './Time';

function Post() {
  return (
    <View>
      <Header />
      <PostImage />
      <View style={{ paddingHorizontal: 15.5 }}>
        <PostActions />
        <Comment
          username={faker.name.firstName()}
          message={'#hashtag #letsgo' + faker.lorem.sentence(10)}
        />
        <Time time={'3 Hours Ago'} />
        {Array(3)
          .fill(null)
          .map((_, i) => (
            <Comment
              key={i}
              username={faker.name.firstName()}
              message={faker.lorem.sentences(2)}
            />
          ))}
      </View>
    </View>
  );
}

export default Post;
