import React, {useState} from 'react';
import {StyleSheet, Text, Image, ImageBackground, View} from 'react-native';
import TextInputLayout from '../components/TextInputLayout';
import AppButton from '../components/AppButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../assets/imagePath';
import {
  APP_NAME,
  USER_NOT_FOUND,
  INCORRECT_PASSWORD,
  TOO_MANY_REQ,
  Welcome,
  LOGIN_STATUS,
  CreateAccount,
  Email,
  Password,
  ForgotPassword,
  Login,
} from '../assets/Strings/strings';
import Routes from '../config/routesName';
import {LargeTitle} from '../styledComponent/styled';
import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginButtonStatus, setStatus] = useState(false);
  const [mProgressBar, setProgress] = useState(false);

  //Validate email address
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function handleEmail(emailAddress) {
    console.log('email= ', emailAddress);
    emailAddress = emailAddress.trim();
    setEmail(emailAddress);
    setEmailError(' ');

    //change login button background
    password === '' ||
    password === undefined ||
    emailAddress === '' ||
    emailAddress === undefined
      ? setStatus(false)
      : setStatus(true);
  }
  function handlePassword(newPassword) {
    setPasswordError('');
    setPassword(newPassword);

    //change login button background
    newPassword === '' ||
    newPassword === undefined ||
    email === '' ||
    email === undefined
      ? setStatus(false)
      : setStatus(true);
  }

  const saveUserState = async () => {
    try {
      await AsyncStorage.setItem(LOGIN_STATUS, 'true');
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogin = async () => {
    console.log('selector email', email);

    setProgress(true);
    const result = validateEmail(email);
    if (!result) {
      setEmailError('Invalid Email');
      setProgress(false);
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        saveUserState();
        console.log('User signed in!');
        setPassword('');
        navigation.navigate(Routes.DashboardStack);
        setProgress(false);
      })
      .catch(error => {
        const errorCode = error.code;
        console.log(error);
        if (errorCode === USER_NOT_FOUND) {
          console.log('That email address is already in use!');
        } else if (errorCode === INCORRECT_PASSWORD) {
          console.log('incorrect password');
          setPasswordError('Incorrect password');
        } else if (errorCode === TOO_MANY_REQ) {
          console.log('too many attempt');
          setPasswordError('Too many attempts Please try after sometime');
        }
        setProgress(false);
        console.error(error);
      });
  };

  const log = async () => {
    await analytics().logEvent('basket', {
      id: 3745092,
      item: 'mens grey t-shirt',
      description: ['round neck', 'long sleeved'],
      size: 'L',
    });
  };

  return (
    <View style={styles.rootContainer}>
      {/* Top header */}
      <ImageBackground style={styles.imageBackground} source={images[2]}>
        <View style={styles.topImageTitleWrapper}>
          <View style={styles.imageWrapper}>
            <Image style={styles.appImage} source={images[0]} />
          </View>
          <Text style={styles.appNameStyle}>{APP_NAME}</Text>
        </View>
      </ImageBackground>

      {/* Bottom parent Layout */}
      <View style={styles.bottomLayoutWrapper}>
        <LargeTitle>{Welcome}</LargeTitle>
        {/* Input layout */}
        <View style={{height: 24}} />
        <View>
          <TextInputLayout
            style={styles.inputField}
            onChangeText={val => handleEmail(val)}
            placeholder={Email}
            maxLength={32}
          />
          <Text style={styles.errorText}>{emailError}</Text>
          <View style={{height: 22}} />
          <TextInputLayout
            onChangeText={val => handlePassword(val)}
            placeholder={Password}
            maxLength={28}
            secureEntry={true}
            style={styles.inputField}
          />
          <Text style={styles.errorText}>{passwordError}</Text>
        </View>
        <View style={{height: 24}} />
        <AppButton
          style={styles.loginButton}
          loginText={Login}
          onLoginClicked={handleLogin}
          isEnable={loginButtonStatus}
          progress={mProgressBar}
        />
        <Text style={styles.forgotPasswordStyle}>{ForgotPassword}</Text>
        <AppButton
          style={styles.createAccountButton}
          loginText={CreateAccount}
          onLoginClicked={() => navigation.navigate(Routes.Registration)}
          isEnable={true}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topImageTitleWrapper: {
    marginTop: 60,
    marginStart: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  imageWrapper: {
    backgroundColor: 'white',
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  appImage: {
    width: 45,
    height: 45,
    margin: 6,
  },
  imageBackground: {
    width: '100%',
    flex: 0.4,
  },
  appNameStyle: {
    marginTop: 12,
    fontSize: 24,
    color: 'white',
    fontWeight: '600',
  },
  bottomLayoutWrapper: {
    flex: 2,
    width: '100%',
    top: '30%',
    bottom: 0,
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    position: 'absolute',
    flexDirection: 'column',
    borderTopEndRadius: 28,
    borderTopStartRadius: 28,
    paddingHorizontal: 32,
    backgroundColor: 'white',
  },
  inputField: {
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  errorText: {
    color: '#EB5053',
    fontSize: 13,
    fontWeight: '400',
    paddingHorizontal: 4,
  },
  loginButton: {
    marginHorizontal: 12,
    borderRadius: 28,
    borderWidth: 2,
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: 'grey',
    shadowOpacity: 0.4,
    shadowOffset: {
      height: 0,
      width: 1,
    },
    shadowRadius: 10,
  },
  createAccountButton: {
    marginTop: 36,
    marginHorizontal: 12,
    borderRadius: 28,
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: 'dodgerblue',
    shadowOpacity: 0.4,
    shadowOffset: {
      height: 10,
      width: 4,
    },
    shadowRadius: 18,
  },
  welcomeText: {
    color: 'black',
    fontWeight: '600',
    letterSpacing: 0.4,
    fontSize: 42,
    marginTop: 28,
  },
  forgotPasswordStyle: {
    marginTop: 18,
    fontWeight: '500',
    fontSize: 15,
    color: 'grey',
    letterSpacing: 0.4,
    textAlign: 'center',
  },
});
