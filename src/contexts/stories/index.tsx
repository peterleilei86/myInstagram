import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { getUsersWithStories, getMe } from '../../hacks';
import { IUser, IStory } from '../../hacks/typs';

const StoriesContext = createContext<{
  users: any[];
  loading: boolean;
  loadStories: any;
  updateStory: any;
}>({
  users: [],
  loading: false,
  loadStories: () => {},
  updateStory: () => {},
});

const initialState: {
  users: Partial<IUser>[];
  loading: boolean;
  error: string;
} = {
  users: [],
  loading: false,
  error: '',
};

const storiesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'onLoad':
      return { ...state, users: action.payload };
    case 'loading':
      return { ...state, loading: action.payload };
    case 'updateStory':
      const newUsers = state.users.map((u: Partial<IUser>) =>
        u.id === action.payload.userId
          ? {
              ...u,
              stories: u.stories!.map(s =>
                s.key === action.payload.storyKey ? { ...s, seen: true } : s,
              ),
            }
          : u,
      );
      return {
        ...state,
        users: newUsers,
      };
    default:
      return state;
  }
};

const StoriesProvider = ({
  token,
  children,
}: {
  token: string;
  children: any;
}) => {
  const [{ users, loading }, dispatch] = useReducer(
    storiesReducer,
    initialState,
  );

  const loadStories = async () => {
    try {
      dispatch({ type: 'loading', payload: true });
      const [users, me] = await Promise.all([
        getUsersWithStories(),
        getMe(token),
      ]);

      const sortUsers = users.slice().sort((u1: any, u2: any) => {
        if (
          u1.stories!.every((s: IStory) => s.seen) &&
          !u2.stories!.every((s: IStory) => s.seen)
        ) {
          return 1;
        }
        if (
          !u1.stories!.every((s: IStory) => s.seen) &&
          u2.stories!.every((s: IStory) => s.seen)
        ) {
          return -1;
        }
        return 0;
      });
      dispatch({ type: 'onLoad', payload: [...sortUsers, me] });
    } catch (error) {
      dispatch({ type: 'onError', payload: error });
    } finally {
      dispatch({ type: 'loading', payload: false });
    }
  };

  const updateStory = (userId: string, storyKey: string) =>
    dispatch({ type: 'updateStory', payload: { userId, storyKey } });

  useEffect(() => {
    loadStories();
  }, []);

  return (
    <StoriesContext.Provider
      value={{ users, loading, updateStory, loadStories }}
    >
      {children}
    </StoriesContext.Provider>
  );
};

const useStories = () => {
  const context = useContext(StoriesContext);
  if (context === undefined) {
    throw Error('Context must be wrapped in a Provider!');
  }
  return context;
};

export { StoriesProvider, useStories };
