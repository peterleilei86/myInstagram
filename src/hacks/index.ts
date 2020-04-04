import React from 'react';
import * as faker from 'faker';
import { IComment, IPost, IUser, IStory } from './typs';
import Unsplash from 'unsplash-js';
import { CLIENT_ID } from 'react-native-dotenv';
import { Dimensions } from 'react-native';

const unsplash = new Unsplash({ accessKey: CLIENT_ID });

// const getUrl = (option: string) =>
//   `https://api.unsplash.com/photos/?client_id=${CLIENT_ID}/?${option}`;

export const sleep = (wait = 1000) =>
  new Promise(resolve => setTimeout(resolve, wait));

export const getMe = async (token: string): Promise<Partial<IUser>> => {
  const username = faker.internet.userName();
  const { email } = JSON.parse(token);
  const stories = await makeStories(username);

  const data = await unsplash.photos.listPhotos();
  const images = await data.json();
  return {
    id: faker.random.uuid(),
    email,
    displayName: username,
    avatarImg: faker.image.avatar(),
    stories,
    posts: await makePosts(images),
  };
};

export const getUsersWithStories = async (): Promise<any> => {
  const usersPromises = Array.from(
    { length: faker.random.number(10) },
    async () => {
      const username = faker.internet.userName();
      const stories = await makeStories(username);
      return {
        id: faker.random.uuid(),
        displayName: username,
        email: faker.internet.email(),
        avatarImg: faker.image.avatar(),
        stories,
      };
    },
  );

  return Promise.all(usersPromises);
};

export const fetchPosts = async (
  limit = 10,
): Promise<{ posts: IPost[]; status: string }> => {
  try {
    const data = await unsplash.photos.listPhotos();
    const images = await data.json();
    const posts = await makePosts(images);
    return { posts, status: 'success' };
  } catch (error) {
    return { posts: [], status: error };
  }
};

async function makePosts(imgs: string[]): Promise<any> {
  const numOfComments = Math.floor(Math.random() * 3);

  const postsPromises = imgs.map(async (img: any) => {
    const displayName = faker.name.findName();
    const postId = faker.random.uuid();
    return {
      id: postId,
      user: {
        id: faker.random.uuid(),
        displayName,
        avatarImg: faker.image.avatar(),
        stories: await makeStories(displayName),
      },
      img: img.urls.regular,
      caption: faker.lorem.sentences(3),
      likes: faker.random.number(50),
      comments: generateComments(postId, numOfComments),
      timestamp: faker.date.recent(),
    };
  });

  return await Promise.all(postsPromises);
}

function generateComments(postId: string, num: number = 5): IComment[] {
  return Array.from({ length: num }, _ => ({
    postId,
    username: faker.name.findName(),
    comment: faker.lorem.sentences(faker.random.number(5)),
  }));
}

async function makeStories(username: string): Promise<IStory[]> {
  try {
    const data = await unsplash.photos.listPhotos(1, 5);
    const images = await data.json();
    return images.map((img: any) => ({
      key: img.id,
      story: img.urls.raw + `&w=${Dimensions.get('window').width}`,
      username,
      seen: false,
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}
