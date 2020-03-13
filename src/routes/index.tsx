import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SignIn, Home, Settings, AuthLoading } from '../screens';
import { useAuth } from '../contexts/auth';
import HomeHeaderTitle from '../screens/Home/HomeHeaderTitle';
import HomeHeaderRight from '../screens/Home/HomeHeaderRight';
import HomeHeaderLeft from '../screens/Home/HomeHeaderLeft';

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
  <AuthenticatedStack.Navigator>
    <AuthenticatedStack.Screen name="Home" component={HomeRoutes} />
    <AuthenticatedStack.Screen name="Settings" component={Settings} />
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
