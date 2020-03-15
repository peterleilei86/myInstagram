import React, { useState, useEffect, useRef, useReducer } from 'react';
import { fetchPosts, generateStories } from '../../../../hacks';
import { IPost, IStory } from '../../../../hacks/typs';

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
export const usePost = () => {
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

  return { state, onLoad };
};

export const useStories = () => {
  const initialStories = generateStories();
  const [stories, setStories] = useState<IStory[]>(initialStories);
  const refreshStories = () => setStories(generateStories());
  return { stories, refreshStories };
};
