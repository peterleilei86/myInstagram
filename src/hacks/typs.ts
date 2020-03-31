export interface IUser {
  id: string;
  displayName: string;
  avatarImg: string;
  email: string;
  password: string;
  posts: IPost[];
  stories: IStory[];
  followers: IUser[];
}

export interface IComment {
  postId: string;
  username: string;
  comment: string;
}

export interface IPost {
  id: string;
  user: Partial<IUser>;
  img: string;
  caption: string;
  likes: number;
  comments: IComment[];
  timestamp: Date;
}

export interface IStory {
  key: string;
  story: string;
  username: string;
  seen: boolean;
}
