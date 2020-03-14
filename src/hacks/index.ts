import * as faker from 'faker';
import { IComment, IPost, IUser, IStory } from './typs';

export const sleep = (wait = 1000) =>
  new Promise(resolve => setTimeout(resolve, wait));

export const getUser = (username: string): Partial<IUser> => ({
  displayName: username,
  avatarImg: 'https://source.unsplash.com/WLUHO9A_xik/80x45',
});

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
  return imgs.map(img => ({
    id: faker.random.uuid(),
    user: {
      displayName: faker.name.findName(),
      avatarImg: faker.image.avatar(),
    },
    img,
    caption: faker.lorem.sentences(3),
    likes: faker.random.number(50),
    comments: generateComments(numOfComments),
    timestamp: faker.date.recent(),
  }));
}

function generateComments(num: number = 5): IComment[] {
  return Array.from({ length: num }, _ => ({
    username: faker.name.findName(),
    comment: faker.lorem.sentences(faker.random.number(5)),
  }));
}

export function generateStories(num: number = 10): IStory[] {
  return Array.from({ length: num }, _ => ({
    username: faker.name.findName(),
    avatarImage: faker.image.avatar(),
    isNew: faker.random.boolean(),
  }));
}
