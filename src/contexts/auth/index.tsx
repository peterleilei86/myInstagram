import React, {
  createContext,
  useEffect,
  useMemo,
  useContext,
  useState,
} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { sleep } from '../../hacks';

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
        console.log(e);
      } finally {
        setToken(userToken);
        setIsloading(false);
        SplashScreen.hide();
      }
    };

    bootstrapAsync();
  }, []);

  const authValues = useMemo(
    () => ({
      signIn: async (data: any) => {
        try {
          setIsloading(true);
          await sleep();
          setToken(JSON.stringify(data));
          AsyncStorage.setItem('__USERTOKEN__', JSON.stringify(data));
        } catch (error) {
          setToken('');
          AsyncStorage.clear();
        } finally {
          setIsloading(false);
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
          setToken(JSON.stringify(data));
          AsyncStorage.setItem('__USERTOKEN__', JSON.stringify(data));
        } catch (error) {
          setToken('');
          AsyncStorage.clear();
        } finally {
          setIsloading(false);
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
