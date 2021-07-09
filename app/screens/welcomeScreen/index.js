import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Text,
} from 'react-native';

import styles from './styles';

const LoginScreen = 'Login';
const RegistrationScreen = 'Registration';

const Welcome = props => {
  const gotoLoginScreen = () => {
    props.navigation.navigate(LoginScreen);
  };

  const gotoRegistrationScreen = () => {
    props.navigation.navigate(RegistrationScreen);
  };

  return (
    <SafeAreaView style={styles.mainConainer}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/images.webp')}
        />
        <Text style={styles.welcomText}>Welcome to our Club</Text>
      </View>
      <Pressable onPress={gotoLoginScreen} style={styles.loginButtonBackground}>
        <Text style={styles.button}>Login</Text>
      </Pressable>
      <Pressable
        onPress={gotoRegistrationScreen}
        style={styles.signUpButtonBackground}>
        <Text style={styles.button}>Sign UP</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Welcome;
