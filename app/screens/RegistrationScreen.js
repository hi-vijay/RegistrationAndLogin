/* eslint-disable react-native/no-inline-styles */
import React, {useReducer, useState} from 'react';
import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import database from '@react-native-firebase/database';
import TextInputLayout from '../components/TextInputLayout';
import firebase from '@react-native-firebase/app';
import AppButton from '../components/AppButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../assets/imagePath';
import {LargeTitle, ErrorText} from '../styledComponent/styled';
import Routes from '../config/routesName';
import auth from '@react-native-firebase/auth';
import {
  LOGIN_STATUS,
  APP_NAME,
  CreateAccount,
  Name,
  Email,
  Password,
  AlreadyHvAct,
  SignIn,
  Submit,
  ErrorInvalidEmailAddress,
  ErrorLowerCaseLetterIsMissing,
  ErrorNameRequired,
  ErrorNumberIsMissing,
  ErrorPasswordRequired,
  ErrorShortName,
  ErrorShortPassword,
  ErrorUpperCaseIsMissing,
} from '../assets/Strings/strings';

const RegistrationScreen = ({navigation}) => {
  const [mName, setName] = useState('');
  const [mErrorName, setNameError] = useState('');

  const [mEmail, setEmail] = useState('');
  const [mErrorEmail, setEmailError] = useState('');

  const [mPassword, setPassword] = useState('');
  const [mErrorPassword, setPasswordError] = useState('');

  const handleEmail = email => {
    setEmail(email);
    setEmailError('');
  };

  const handleName = name => {
    setName(name.trim());
    setNameError('');
  };

  const handlePassword = password => {
    setPassword(password);
    setPasswordError('');
  };

  const saveLoginState = async () => {
    try {
      await AsyncStorage.setItem(LOGIN_STATUS, 'true');
    } catch (e) {
      console.log(e);
    }
  };

  const getUid = async () => {
    const user = await firebase.auth().currentUser;
    return user.uid;
  };

  const updateProfile = async () => {
    const user = await firebase.auth().currentUser;
    await user
      .updateProfile({
        displayName: mName,
      })
      .then(() => {
        console.log('update successful');
      })
      .catch(error => {
        console.log('an error occured ', error);
      });
  };

  const addUser = async () => {
    const path = 'users';
    const uid = await getUid();
    const user = {
      id: uid,
      lastMessage: '',
      time: '12:12',
      avatar: 'https://placeimg.com/140/140/any',
      name: mName,
      uid: uid,
      email: mEmail,
    };
    database()
      .ref(path)
      .push()
      .set(user)
      .then(() => console.log('Data set.'));
  };

  const saveDataAndOpenDashboard = async () => {
    await updateProfile();
    await saveLoginState();
    await addUser();
    setEmail('');
    navigation.navigate(Routes.DashboardStack, {
      screen: Routes.Dashboard,
    });
  };

  //Registration button clicked
  const handleRegistration = () => {
    if (validate()) {
      //storeValue();
      auth()
        .createUserWithEmailAndPassword(mEmail, mPassword)
        .then(() => {
          console.log('User account created & signed in!');
          saveDataAndOpenDashboard();
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            setEmailError('The email is already in use');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('The email address is invalid!');
            setEmailError('Invalid email address');
          }

          console.error(error);
        });
      console.log('Valid data');
    }
  };

  const validate = () => {
    let result = true;
    if (mName.length < 3) {
      setNameError(ErrorShortName);
      result = false;
    }

    if (mName === '') {
      setNameError(ErrorNameRequired);
      result = false;
    }

    //check for email regex
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(mEmail).toLowerCase())) {
      result = false;
      setEmailError(ErrorInvalidEmailAddress);
    }

    var passwordRegex = {
      capital: /[A-Z]/,
      digit: /[0-9]/,
      small: /[a-z]/,
      full: /^[@#][A-Za-z0-9]{7,13}$/,
    };

    if (mPassword === '') {
      setPasswordError(ErrorPasswordRequired);
      return false;
    }
    if (mPassword.length < 8) {
      setPasswordError(ErrorShortPassword);
      return false;
    }

    if (!passwordRegex.capital.test(mPassword)) {
      setPasswordError(ErrorUpperCaseIsMissing);
      return false;
    }

    if (!passwordRegex.digit.test(mPassword)) {
      setPasswordError(ErrorNumberIsMissing);
      return false;
    }

    if (!passwordRegex.small.test(mPassword)) {
      setPasswordError(ErrorLowerCaseLetterIsMissing);
      return false;
    }

    return result;
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
        <LargeTitle>{CreateAccount}</LargeTitle>

        {/* Input layout */}
        <View style={styles.inputBackground}>
          <TextInputLayout
            style={styles.inputField}
            onChangeText={val => handleName(val)}
            placeholder={Name}
            maxLength={32}
          />
          <ErrorText>{mErrorName}</ErrorText>
          <View style={{height: 22}} />
          <TextInputLayout
            onChangeText={val => handleEmail(val)}
            placeholder={Email}
            maxLength={28}
            style={styles.inputField}
          />
          <ErrorText>{mErrorEmail}</ErrorText>
          <View style={{height: 22}} />
          <TextInputLayout
            onChangeText={val => handlePassword(val)}
            placeholder={Password}
            maxLength={28}
            secureEntry={true}
            style={styles.inputField}
          />
          <ErrorText>{mErrorPassword}</ErrorText>
        </View>
        <AppButton
          style={styles.loginButton}
          loginText={Submit}
          onLoginClicked={handleRegistration}
          isEnable={true}
          progress={false}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate(Routes.Login)}
          style={styles.signInButtonStyle}>
          <Text style={{color: 'grey'}}>{AlreadyHvAct}</Text>
          <Text style={{color: 'tomato', marginStart: 8}}>{SignIn}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  appNameStyle: {
    marginTop: 12,
    fontSize: 24,
    color: 'white',
    fontWeight: '600',
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
  },
  loginButton: {
    marginTop: 44,
    marginHorizontal: 12,
    borderRadius: 28,
    borderWidth: 2,
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: 'dodgerblue',
    shadowOpacity: 0.4,
    shadowOffset: {
      height: 0,
      width: 2,
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
    fontSize: 42,
    marginTop: 28,
  },
  signInButtonStyle: {
    justifyContent: 'center',
    marginTop: 18,
    fontWeight: '500',
    fontSize: 15,
    color: 'grey',
    letterSpacing: 0.4,
    flexDirection: 'row',
    textAlign: 'center',
  },
  bottomLayoutWrapper: {
    bottom: 0,
    top: '30%',
    position: 'absolute',
    width: '100%',
    flexDirection: 'column',
    borderTopEndRadius: 28,
    borderTopStartRadius: 28,
    paddingHorizontal: 32,
    backgroundColor: 'white',
  },
  inputContainer: {
    backgroundColor: 'white',
    width: '88%',
    elevation: 12,
    paddingVertical: 32,
    paddingHorizontal: 24,
    marginBottom: 98,
  },
});

export default RegistrationScreen;
