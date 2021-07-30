import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from '../screens/login/index';
import EmployeeList from '../screens/dashboard/index';
import RegistrationScreen from '../screens/Registration/index';
import SplashScreen from '../screens/SpalshScreen';
import browser from '../screens/Browser';
import Routes from './routesName';
import Chat from '../screens/chat';
import Profile from '../screens/profile';
import Feather from 'react-native-vector-icons/Feather';

Feather.loadFont();

const AuthStack = createStackNavigator();
const DashboardStack = createStackNavigator();
const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name={Routes.Splash} component={SplashScreen} />
    <AuthStack.Screen name={Routes.Login} component={Login} />
    <AuthStack.Screen
      name={Routes.Registration}
      component={RegistrationScreen}
    />
  </AuthStack.Navigator>
);

export const DashboardStackScreen = () => (
  <DashboardStack.Navigator headerMode="none">
    <DashboardStack.Screen name={Routes.Dashboard} component={EmployeeList} />
    {/* <DashboardStack.Screen name={Routes.Browser} component={browser} /> */}
  </DashboardStack.Navigator>
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
      component={DashboardStackScreen}
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
    <AppStack.Screen name={Routes.AuthStack} component={AuthStackScreen} />
    <AppStack.Screen
      name={Routes.DashboardStack}
      component={TabStackScreen}
      options={{gestureEnabled: false}}
    />
    <DashboardStack.Screen name={Routes.Browser} component={browser} />
  </AppStack.Navigator>
);
