import React, {
  ReactChildren,
  createContext,
  useReducer,
  useEffect,
  useContext,
} from 'react';
import { IPost } from '../../hacks/typs';
import { fetchPosts } from '../../hacks';

const PostContext = createContext<{
  state: { posts: IPost[]; refreshing: boolean; error: string };
  onLoad: any;
}>({ state: { posts: [], refreshing: false, error: '' }, onLoad: () => {} });

const initialState: { posts: IPost[]; refreshing: boolean; error: string } = {
  posts: [],
  refreshing: false,
  error: '',
};

const postReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'onLoad':
      return {
        ...state,
        posts:
          action.payload.initial || action.payload.refreshing
            ? action.payload.posts
            : [...state.posts, ...action.payload.posts],
      };
    case 'onRefreshing':
      return { ...state, refreshing: action.payload };
    case 'onError':
      return { ...state, error: action.payload.message };
    default:
      return state;
  }
};

const POSTSLIMIT = 10;
const PostProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  const onLoad = async (
    initial: boolean = false,
    refreshing: boolean = false,
  ) => {
    try {
      if (refreshing) dispatch({ type: 'onRefreshing', payload: true });
      const { posts, status } = await fetchPosts(POSTSLIMIT);

      if (status === 'success') {
        dispatch({ type: 'onLoad', payload: { initial, refreshing, posts } });
      }
    } catch (error) {
      dispatch({ type: 'onError', payload: { message: 'On Load Error' } });
    } finally {
      if (refreshing) dispatch({ type: 'onRefreshing', payload: false });
    }
  };

  useEffect(() => {
    onLoad(true);
  }, []);

  return (
    <PostContext.Provider value={{ state, onLoad }}>
      {children}
    </PostContext.Provider>
  );
};

const usePost = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw Error('Context must be wrapped in a Provider!');
  }
  return context;
};

export { PostProvider, usePost };
