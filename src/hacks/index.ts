import React from 'react';
import * as faker from 'faker';
import { IComment, IPost, IUser, IStory } from './typs';

export const sleep = (wait = 1000) =>
  new Promise(resolve => setTimeout(resolve, wait));

export const getMe = async (token: string): Promise<Partial<IUser>> => {
  const username = faker.internet.userName();
  const { email } = JSON.parse(token);
  const stories = await makeStories(username);
  return {
    id: faker.random.uuid(),
    email,
    displayName: username,
    avatarImg: faker.image.avatar(),
    stories,
    posts: await makePosts(
      Array.from({ length: faker.random.number(5) }, _ => faker.random.image()),
    ),
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

const IMAGESURL = 'https://dog.ceo/api/breeds/image/random';
export const fetchPosts = async (
  limit = 10,
): Promise<{ posts: IPost[]; status: string }> => {
  try {
    const data = await fetch(`${IMAGESURL}/${limit}`);
    const { message, status } = await data.json();
    const posts = await makePosts(message);
    return { posts, status };
  } catch (error) {
    return { posts: [], status: error };
  }
};

async function makePosts(imgs: string[]): Promise<any> {
  const numOfComments = Math.floor(Math.random() * 3);

  const postsPromises = imgs.map(async img => {
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
      img,
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
    const limit = faker.random.number(5) + 1;
    const data = await fetch(`${IMAGESURL}/${limit}`);
    const { message, status } = await data.json();
    if (status === 'success') {
      return message.map((img: string) => ({
        key: faker.random.uuid(),
        story: img,
        username,
        seen: false,
      }));
    } else {
      console.log(status);
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}
