import React, { useState, useEffect } from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  SignIn,
  Home,
  Loading,
  Search,
  Add,
  Activity,
  Profile,
} from '../screens';
import { useAuth } from '../contexts/auth';
import HomeHeaderTitle from '../screens/Home/HomeHeaderTitle';
import HomeHeaderRight from '../screens/Home/HomeHeaderRight';
import HomeHeaderLeft from '../screens/Home/HomeHeaderLeft';
import Icon from '../components/Icon';
import {
  AuthStackList,
  AuthenticatedStackList,
  HomeStackList,
  RootAuthStackList,
} from './types';
import { RouteProp } from '@react-navigation/native';
import Story from '../screens/Story';
import { PostProvider } from '../contexts/post';
import { StoriesProvider } from '../contexts/stories';

const AuthStack = createStackNavigator<AuthStackList>();

const AuthRoutes = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerTransparent: true,
      title: '',
    }}
  >
    <AuthStack.Screen name="Auth" component={SignIn} />
  </AuthStack.Navigator>
);

const RootAuthedStack = createStackNavigator<RootAuthStackList>();
const AuthenticatedStack = createBottomTabNavigator<AuthenticatedStackList>();

const HomeStack = createStackNavigator<HomeStackList>();

const HomeRoutes = ({
  route,
}: {
  route: RouteProp<AuthenticatedStackList, 'Home'>;
}) => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      options={{
        headerTitle: () => <HomeHeaderTitle />,
        headerRight: () => <HomeHeaderRight />,
        headerLeft: () => <HomeHeaderLeft />,
      }}
      initialParams={{ token: route.params.token }}
      name="Home"
      component={Home}
    />
  </HomeStack.Navigator>
);

const AuthenticatedRoutes = ({
  route,
}: {
  route: RouteProp<RootAuthStackList, 'Root'>;
}) => (
  <AuthenticatedStack.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        switch (route.name) {
          case 'Home':
            return (
              <Icon
                source={
                  focused
                    ? require('../assets/home-active.png')
                    : require('../assets/home.png')
                }
                style={{ height: 20, width: 22 }}
              />
            );
          case 'Search':
            return (
              <Icon
                source={
                  focused
                    ? require('../assets/search-active.png')
                    : require('../assets/search.png')
                }
                style={{ height: 20, width: 20 }}
              />
            );
          case 'Add':
            return (
              <Icon
                source={
                  focused
                    ? require('../assets/add-active.png')
                    : require('../assets/add.png')
                }
                style={{ height: 23, width: 23 }}
              />
            );
          case 'Activity':
            return (
              <Icon
                source={
                  focused
                    ? require('../assets/activity-active.png')
                    : require('../assets/activity.png')
                }
                style={{ height: 20, width: 22 }}
              />
            );
          case 'Profile':
            return (
              <Icon
                source={
                  focused
                    ? require('../assets/profile-active.png')
                    : require('../assets/profile.png')
                }
                style={{ height: 21.5, width: 19 }}
              />
            );
        }
      },
    })}
    tabBarOptions={{
      showLabel: false,
    }}
  >
    <AuthenticatedStack.Screen
      initialParams={{ token: route.params.token }}
      name="Home"
      component={HomeRoutes}
    />
    <AuthenticatedStack.Screen name="Search" component={Search} />
    <AuthenticatedStack.Screen name="Add" component={Add} />
    <AuthenticatedStack.Screen name="Activity" component={Activity} />
    <AuthenticatedStack.Screen name="Profile" component={Profile} />
  </AuthenticatedStack.Navigator>
);

const RootAuthedStackRoutes = ({ token }: { token: string }) => (
  <RootAuthedStack.Navigator mode="modal" headerMode="none">
    <RootAuthedStack.Screen
      name="Root"
      component={AuthenticatedRoutes}
      initialParams={{ token }}
    />
    <RootAuthedStack.Screen name="Story" component={Story} />
  </RootAuthedStack.Navigator>
);

const RootWithProviders = ({ token }: { token: string }) => (
  <PostProvider>
    <StoriesProvider token={token}>
      <RootAuthedStackRoutes token={token} />
    </StoriesProvider>
  </PostProvider>
);

function Routes() {
  const { token } = useAuth();
  return token ? <RootWithProviders token={token} /> : <AuthRoutes />;
}

export default Routes;
