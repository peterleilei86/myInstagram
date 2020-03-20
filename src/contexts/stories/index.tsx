import React, { createContext, useState, useMemo, useContext } from 'react';
import { getUsersWithStories, getMe } from '../../hacks';
import { IUser } from '../../hacks/typs';

const StoriesContext = createContext<{
  users: any[];
  setUsers: any;
  updateStory: any;
  refreshusers: any;
}>({
  users: [],
  setUsers: () => {},
  updateStory: () => {},
  refreshusers: () => {},
});

const StoriesProvider = ({
  token,
  children,
}: {
  token: string;
  children: any;
}) => {
  const me = useMemo(() => getMe(token), [token]);
  const initialUsers = [...getUsersWithStories(), me];
  const [users, setUsers] = useState<Partial<IUser>[]>(initialUsers);
  const refreshusers = () => setUsers(getUsersWithStories());

  const updateStory = (userId: string, storyKey: string) => {
    setUsers(users =>
      users.map(u =>
        u.id === userId
          ? {
              ...u,
              stories: u.stories!.map(s =>
                s.key === storyKey ? { ...s, seen: true } : s,
              ),
            }
          : u,
      ),
    );
  };

  return (
    <StoriesContext.Provider
      value={{ users, updateStory, setUsers, refreshusers }}
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
