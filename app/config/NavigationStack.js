import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import SplashScreen from '../screens/SpalshScreen';
import browser from '../screens/Browser';
import Routes from './routesName';
import Chat from '../screens/chat';
import Profile from '../screens/profile';
import ChatContainer from '../screens/ChatContainer';
import Feather from 'react-native-vector-icons/Feather';

Feather.loadFont();

const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen
      name={Routes.Login}
      component={LoginScreen}
      options={{gestureEnabled: false}}
    />
    <AuthStack.Screen
      name={Routes.Registration}
      component={RegistrationScreen}
      options={{gestureEnabled: false}}
    />
  </AuthStack.Navigator>
);

export const TabStackScreen = () => (
  <Tab.Navigator
    tabBarOptions={{
      labelStyle: {
        fontSize: 13,
      },
    }}
    headerMode="none">
    <Tab.Screen
      name={Routes.Dashboard}
      component={DashboardScreen}
      options={{
        tabBarIcon: props => (
          <Feather name={'home'} size={props.size} color={props.color} />
        ),
      }}
    />
    <Tab.Screen
      name={Routes.Chat}
      component={Chat}
      options={{
        //props.focused
        tabBarIcon: props => (
          <Feather
            name={'message-circle'}
            size={props.size}
            color={props.color}
          />
        ),
      }}
    />
    <Tab.Screen
      name={Routes.Profile}
      component={Profile}
      options={{
        tabBarIcon: props => (
          <Feather name={'user'} size={props.size} color={props.color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export const AppStackScreen = () => (
  <AppStack.Navigator headerMode="none">
    <AuthStack.Screen name={Routes.Splash} component={SplashScreen} />
    <AppStack.Screen
      name={Routes.AuthStack}
      component={AuthStackScreen}
      options={{gestureEnabled: false}}
    />
    <AppStack.Screen
      name={Routes.DashboardStack}
      component={TabStackScreen}
      options={{gestureEnabled: false}}
    />
    <AppStack.Screen name={Routes.Browser} component={browser} />
    <AppStack.Screen name={Routes.ChatContainer} component={ChatContainer} />
  </AppStack.Navigator>
);
