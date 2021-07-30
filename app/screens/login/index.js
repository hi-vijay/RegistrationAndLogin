import React, {useState} from 'react';
import {StyleSheet, Text, Image, ImageBackground, View} from 'react-native';
import TextInputLayout from '../../components/TextInputLayout';
import AppButton from '../../components/AppButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {addUser} from '../../actions/actions';
import images from '../../res/images';
import * as strings from '../../res/strings';
import Routes from '../../config/routesName';
import {LargeTitle} from '../../styledComponent/styled';

const Login = ({navigation}) => {
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

  const dispatch = useDispatch();

  const handleLogin = async () => {
    console.log('selector email', email);
    navigation.navigate(Routes.DashboardStack);
    if (loginButtonStatus) {
      return;
    }
    if (!loginButtonStatus) {
      return false;
    }
    setProgress(true);
    //validate fields
    const result = validateEmail(email);
    if (!result) {
      setEmailError('Invalid Email');
      setProgress(false);
      return;
    }

    try {
      const value = await AsyncStorage.getItem(strings.USER_REGISTRATION_KEY);
      if (value !== null) {
        const user = JSON.parse(value);
        console.log('value', user);
        if (user.userEmail === email.trim() && user.userPassword === password) {
          dispatch(
            addUser({
              userName: user.userName,
              mail: user.userEmail,
              authToken: 'qwertyvijay',
            }),
          );
          navigation.navigate(Routes.DashboardStack);
          console.log('user validated!!!');
        } else {
          setProgress(false);
          setPasswordError(strings.ErrorIncorrectEmail);
        }
      } else {
        setProgress(false);
      }
    } catch (e) {
      setProgress(false);
      console.log(e);
    }
  };

  return (
    <View style={styles.rootContainer}>
      {/* Top header */}
      <ImageBackground style={styles.imageBackground} source={images[2]}>
        <View style={styles.topImageTitleWrapper}>
          <View style={styles.imageWrapper}>
            <Image style={styles.appImage} source={images[0]} />
          </View>
          <Text style={styles.appNameStyle}>{strings.APP_NAME}</Text>
        </View>
      </ImageBackground>

      {/* Bottom parent Layout */}
      <View style={styles.bottomLayoutWrapper}>
        <LargeTitle>{strings.Welcome}</LargeTitle>
        {/* <Text style={styles.welcomeText}>{strings.Welcome}</Text> */}
        {/* Input layout */}
        <View style={styles.inputBackground}>
          <TextInputLayout
            style={styles.inputField}
            onChangeText={val => handleEmail(val)}
            placeholder={strings.Email}
            maxLength={32}
          />
          <Text style={styles.errorText}>{emailError}</Text>
          <View style={{height: 22}} />
          <TextInputLayout
            onChangeText={val => handlePassword(val)}
            placeholder={strings.Password}
            maxLength={28}
            secureEntry={true}
            style={styles.inputField}
          />
          <Text style={styles.errorText}>{passwordError}</Text>
        </View>
        <AppButton
          style={styles.loginButton}
          loginText={strings.Login}
          onLoginClicked={handleLogin}
          isEnable={loginButtonStatus}
          progress={mProgressBar}
        />
        <Text style={styles.forgotPasswordStyle}>{strings.ForgotPassword}</Text>
        <AppButton
          style={styles.createAccountButton}
          loginText={strings.CreateAccount}
          onLoginClicked={() => navigation.navigate(Routes.Registration)}
          isEnable={true}
          progress={mProgressBar}
        />
      </View>
    </View>
  );
};

export default Login;

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
    flex: 0.8,
  },
  appNameStyle: {
    marginTop: 12,
    fontSize: 24,
    color: 'white',
    fontWeight: '600',
  },
  bottomLayoutWrapper: {
    flex: 2,
    flexDirection: 'column',
    borderTopEndRadius: 28,
    borderTopStartRadius: 28,
    marginTop: -24,
    paddingHorizontal: 32,
    backgroundColor: 'white',
  },
  inputBackground: {
    marginTop: 24,
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
    marginTop: 24,
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
