import { IStory } from '../hacks/typs';

export type AuthStackList = {
  Auth: undefined;
};

export type AuthenticatedStackList = {
  Home: { token: string };
  Search: undefined;
  Add: undefined;
  Activity: undefined;
  Profile: undefined;
};

export type RootAuthStackList = {
  Root: { token: string };
  Story: { userId: string; stories: IStory[]; updateStory: any; postId: any };
};

export type HomeStackList = {
  Home: { token: string };
};
