import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import images from '../assets/imagePath';
import Routes from '../config/routesName';
import {APP_NAME, LOGIN_STATUS} from '../assets/Strings/strings';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  const [loginLoadingState, setLoginState] = useState({
    isLoading: true,
    loginStatus: false,
  });

  const checkIfLogin = () =>
    new Promise(async (resolve, reject) => {
      try {
        const login = await AsyncStorage.getItem(LOGIN_STATUS);
        resolve(login === null ? false : login === 'true');
        return;
      } catch (e) {
        reject(false);
      }
    });

  useEffect(() => {
    checkIfLogin()
      .then(value => {
        setLoginState({
          loginStatus: value,
          isLoading: false,
        });
      })
      .catch(error => {
        console.log('error ', error);
        setLoginState({
          loginStatus: false,
          isLoading: false,
        });
      });
    return () => null;
  }, []);

  const changeScreen = () => {
    if (!loginLoadingState.isLoading) {
      if (loginLoadingState.loginStatus) {
        navigation.navigate(Routes.DashboardStack);
      } else {
        navigation.navigate(Routes.AuthStack);
      }
    }
  };

  //ForwardRef(BaseNavigationContainer) bug resolved
  setTimeout(() => {
    changeScreen();
  }, 1000);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.rootContainer}>
        <View style={styles.splashImageWrapper}>
          <Image style={styles.splashImage} source={images[0]} />
        </View>
        <ActivityIndicator color="black" />
        <TouchableOpacity style={styles.titleWrapper}>
          <Text style={styles.bottomTitle}>{APP_NAME}</Text>
          <Image
            style={{width: 24, height: 24, marginStart: 12}}
            source={images[7]}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#f7faff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    width: 180,
    height: 180,
    backgroundColor: '#6d7a8f',
    marginBottom: 40,
  },
  splashImage: {
    width: 140,
    height: 140,
    marginBottom: 40,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  bottomTitle: {
    color: 'grey',
    fontSize: 28,
    fontWeight: '600',
  },
});

export default SplashScreen;
/*  function onAuthStateChanged(firebaseuser) {
    console.log('user ', firebaseuser);
    setUser(firebaseuser);
    if (isLoading) {
      setLoading(false);
    }
  } */
