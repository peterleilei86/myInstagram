import React, {
  createContext,
  useEffect,
  useMemo,
  useContext,
  useState,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const sleep = (wait = 1000) =>
  new Promise(resolve => setTimeout(resolve, wait));

const AuthContext = createContext({});

function AuthProvider({ children }: any) {
  const [token, setToken] = useState<string>('');
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken = '';
      setIsloading(true);
      try {
        userToken = (await AsyncStorage.getItem('__USERTOKEN__')) || '';
      } catch (e) {
        setToken('');
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setToken(userToken);
      setIsloading(false);
    };

    bootstrapAsync();
  }, []);

  const authValues = useMemo(
    () => ({
      signIn: async (data: any) => {
        try {
          //TODO:
          // SEND DATA TO SERVER TO GET TOKEN
          // THEN PERSIST DATA IN ASYNCSTORAGE
          setIsloading(true);
          await sleep();
          setToken('dummy-token');
          AsyncStorage.setItem('__USERTOKEN__', JSON.stringify('dummy-token'));
          setIsloading(false);
        } catch (error) {
          // SHOW ERROR WHEN SIGN IN FAILS
          setToken('');
          setIsloading(false);
          AsyncStorage.clear();
        }
      },
      signOut: async () => {
        setIsloading(true);
        await sleep();
        setToken('');
        setIsloading(false);
        AsyncStorage.clear();
      },
      signUp: async (data: any) => {
        try {
          setIsloading(true);
          await sleep();
          setToken('dummy-token');
          setIsloading(false);
          AsyncStorage.setItem('__USERTOKEN__', JSON.stringify('dummy-token'));
        } catch (error) {
          setToken('');
          setIsloading(false);
          AsyncStorage.clear;
        }
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={{ token, isLoading, authValues }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = (): any => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw Error('Context must be wrapped in a Provider!');
  }
  return context;
};

export { AuthProvider, useAuth };
