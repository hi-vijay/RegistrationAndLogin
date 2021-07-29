import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/login/index';
import EmployeeList from '../screens/dashboard/index';
import RegistrationScreen from '../screens/Registration/index';
import SplashScreen from '../screens/SpalshScreen';
import browser from '../screens/Browser';
import Routes from './routesName';

const AuthStack = createStackNavigator();
const DashboardStack = createStackNavigator();
const AppStack = createStackNavigator();

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
    <DashboardStack.Screen name={Routes.Browser} component={browser} />
  </DashboardStack.Navigator>
);

export const AppStackScreen = () => (
  <AppStack.Navigator headerMode="none">
    <AppStack.Screen name={Routes.AuthStack} component={AuthStackScreen} />
    <AppStack.Screen
      name={Routes.DashboardStack}
      component={DashboardStackScreen}
      options={{gestureEnabled: false}}
    />
  </AppStack.Navigator>
);
