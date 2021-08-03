import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthReducer from './reducers/AuthReducer';
import {createStore} from 'redux';
import {AppStackScreen} from './config/NavigationStack';
import {Provider} from 'react-redux';

const store = createStore(AuthReducer);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStackScreen />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
