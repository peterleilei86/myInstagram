import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  SignIn,
  Home,
  Settings,
  AuthLoading,
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

const AuthStack = createStackNavigator();

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

const AuthenticatedStack = createBottomTabNavigator();

const HomeStack = createStackNavigator();

const HomeRoutes = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      options={{
        headerTitle: () => <HomeHeaderTitle />,
        headerRight: () => <HomeHeaderRight />,
        headerLeft: () => <HomeHeaderLeft />,
      }}
      name="Home"
      component={Home}
    />
  </HomeStack.Navigator>
);

const AuthenticatedRoutes = () => (
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
    <AuthenticatedStack.Screen name="Home" component={HomeRoutes} />
    <AuthenticatedStack.Screen name="Search" component={Search} />
    <AuthenticatedStack.Screen name="Add" component={Add} />
    <AuthenticatedStack.Screen name="Activity" component={Activity} />
    <AuthenticatedStack.Screen name="Profile" component={Profile} />
  </AuthenticatedStack.Navigator>
);

function Routes() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <AuthLoading />;
  }
  return token ? <AuthenticatedRoutes /> : <AuthRoutes />;
}

export default Routes;
