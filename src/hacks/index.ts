import React from 'react';
import * as faker from 'faker';
import { IComment, IPost, IUser, IStory } from './typs';

export const sleep = (wait = 1000) =>
  new Promise(resolve => setTimeout(resolve, wait));

export const getMe = (token: string): Partial<IUser> => {
  const username = faker.internet.userName();
  const { email } = JSON.parse(token);
  return {
    id: faker.random.uuid(),
    email,
    displayName: username,
    avatarImg: faker.image.avatar(),
    stories: generateStories(username, faker.random.number(4)),
    posts: makePosts(
      Array.from({ length: faker.random.number(5) }, _ => faker.random.image()),
    ),
  };
};

export const getUsersWithStories = (): Partial<IUser>[] => {
  return Array.from({ length: faker.random.number(10) }, _ => {
    const username = faker.internet.userName();
    return {
      id: faker.random.uuid(),
      displayName: username,
      email: faker.internet.email(),
      avatarImg: faker.image.avatar(),
      stories: generateStories(username, faker.random.number(4)),
    };
  });
};

const IMAGESURL = 'https://dog.ceo/api/breeds/image/random';
export const fetchPosts = async (
  limit = 10,
): Promise<{ posts: IPost[]; status: string }> => {
  try {
    const data = await fetch(`${IMAGESURL}/${limit}`);
    const { message, status } = await data.json();
    const posts = makePosts(message);
    return { posts, status };
  } catch (error) {
    return { posts: [], status: error };
  }
};

function makePosts(imgs: string[]): IPost[] {
  const numOfComments = Math.floor(Math.random() * 3);
  return imgs.map(img => {
    const displayName = faker.name.findName();
    const postId = faker.random.uuid();
    return {
      id: postId,
      user: {
        id: faker.random.uuid(),
        displayName,
        avatarImg: faker.image.avatar(),
        stories: generateStories(displayName, faker.random.number(4)),
      },
      img,
      caption: faker.lorem.sentences(3),
      likes: faker.random.number(50),
      comments: generateComments(postId, numOfComments),
      timestamp: faker.date.recent(),
    };
  });
}

function generateComments(postId: string, num: number = 5): IComment[] {
  return Array.from({ length: num }, _ => ({
    username: faker.name.findName(),
    comment: faker.lorem.sentences(faker.random.number(5)),
  }));
}

export function generateStories(username: string, num: number = 10): IStory[] {
  return Array.from({ length: num }, _ => ({
    key: faker.random.uuid(),
    story: faker.image.image(),
    username,
    seen: false,
  }));
}
