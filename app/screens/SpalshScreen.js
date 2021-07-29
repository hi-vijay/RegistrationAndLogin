import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  ImageBackground,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../res/images';

const USER_KEY = 'user_registration_key';

const SplashScreen = ({navigation}) => {
  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const gotoDashBoard = () => {
    //navigation.navigate('DashboardStack');
    navigation.navigate('Login');
  };

  console.log('welcome');
  useEffect(() => {
    console.log('effects');
    async function getAuthToken() {
      console.log('calling');
      try {
        const user = await AsyncStorage.getItem(USER_KEY);
        if (user !== null && user !== undefined) {
          const value = JSON.parse(user);
          if (value.authToken !== undefined) {
            console.log('f');
            setAuthToken(value.authToken);
          }
        }
        console.log('tuer');
        gotoDashBoard();
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
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.rootContainer}>
        <View style={styles.splashImageWrapper}>
          <Image style={styles.splashImage} source={images[0]} />
        </View>
        <ActivityIndicator color="black" />
        <View style={styles.titleWrapper}>
          <Text style={styles.bottomTitle}>SpaceX</Text>
          <Image
            style={{width: 24, height: 24, marginStart: 12}}
            source={images[7]}
          />
        </View>
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
