export interface IUser {
  displayName: string;
  avatarImg: string;
  email: string;
  password: string;
  posts: IPost[];
}

export interface IComment {
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
  username: string;
  avatarImage: string;
  isNew: boolean;
}
