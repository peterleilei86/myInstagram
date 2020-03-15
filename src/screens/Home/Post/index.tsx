import React from 'react';
import { View } from 'react-native';
import Header from './Header';
import PostImage from './PostImage';
import PostActions from './PostActions';
import Comment from './Comment';
import Time from './Time';
import { IPost } from '../../../hacks/typs';

function Post({
  post: { user, img, caption, comments, timestamp },
}: {
  post: IPost;
}) {
  return (
    <View>
      <Header user={user} />
      <PostImage imgUrl={img} />
      <View style={{ paddingHorizontal: 15.5 }}>
        <PostActions />
        <Comment
          username={user.displayName!}
          comment={'#hashtag #letsgo ' + caption}
        />
        {comments.map((comment, i) => (
          <Comment
            key={i}
            username={comment.username}
            comment={comment.comment}
          />
        ))}
        <Time time={timestamp.toLocaleDateString()} />
      </View>
    </View>
  );
}

export default Post;
