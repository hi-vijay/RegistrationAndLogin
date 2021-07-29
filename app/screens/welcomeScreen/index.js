import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../SpalshScreen';
import AuthReducer from '../../reducers/AuthReducer';
import {createStore} from 'redux';
import {useState} from 'react';
import {
  DashboardStackScreen,
  AuthStackScreen,
} from '../../config/NavigationStack';
import {Provider, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

//const store = createStore(AuthReducer);
const USER_KEY = 'user_registration_key';

import styles from './styles';

const LoginScreen = 'Login';
const RegistrationScreen = 'Registration';

const Welcome = props => {
  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setLoading] = useState(false);
  console.log('welcome');
  // useEffect(() => {
  //   console.log('effect');
  //   async function getAuthToken() {
  //     console.log('calling');
  //     try {
  //       const user = await AsyncStorage.getItem(USER_KEY);
  //       if (user !== null && user !== undefined) {
  //         const value = JSON.parse(user);
  //         if (value.authToken !== undefined && value.authToken !== '') {
  //           setAuthToken(value.authToken);
  //         }
  //       }
  //       setLoading(false);
  //     } catch (e) {
  //       console.log('catch');
  //       console.log(e);
  //       setLoading(false);
  //     }
  //   }

  //   getAuthToken();
  // }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return authToken === null ? <AuthStackScreen /> : <DashboardStackScreen />;
};

export default Welcome;
