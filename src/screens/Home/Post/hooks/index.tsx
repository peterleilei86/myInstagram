import React, { useState, useEffect, useRef } from 'react';
import { fetchPosts, generateStories } from '../../../../hacks';
import { IPost, IStory } from '../../../../hacks/typs';

export const usePost = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageRef = useRef<number>(0);

  useEffect(() => {
    const getPosts = async () => {
      const { posts, status } = await fetchPosts(10);
      if (status === 'success') {
        setPosts(prev => [...prev, ...posts]);
      }
    };
    if (currentPage >= pageRef.current) {
      getPosts();
      pageRef.current = currentPage;
    }
  }, [currentPage]);

  return { posts, setPosts, setCurrentPage };
};

export const useStories = () => {
  const initialStories = generateStories();
  const [stories, setStories] = useState<IStory[]>(initialStories);
  return { stories, setStories };
};
