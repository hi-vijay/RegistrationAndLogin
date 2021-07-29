import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './screens/SpalshScreen';
import AuthReducer from './reducers/AuthReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore} from 'redux';
import {useState} from 'react';
import {
  DashboardStackScreen,
  AuthStackScreen,
  AppStackScreen,
} from './config/NavigationStack';
import {Provider, useSelector} from 'react-redux';

const store = createStore(AuthReducer);
const USER_KEY = 'user_registration_key';

const App = () => {
  const [authToken, setAuthToken] = useState('');
  const [isLoading, setLoading] = useState(true);
  console.log('app');
  useEffect(() => {
    console.log('effect');
    async function getAuthToken() {
      console.log('callingAPP');
      try {
        const user = await AsyncStorage.getItem(USER_KEY);
        if (user !== null && user !== undefined) {
          const value = JSON.parse(user);
          if (value.authToken !== undefined && value.authToken !== '') {
            setAuthToken(value.authToken);
          }
        }
        setLoading(false);
      } catch (e) {
        console.log('catch');
        console.log(e);
        setLoading(false);
      }
    }

    getAuthToken();
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStackScreen />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default App;
