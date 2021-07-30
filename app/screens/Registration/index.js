/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import TextInputLayout from '../../components/TextInputLayout';
import AppButton from '../../components/AppButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../../res/images';
import {LargeTitle, ErrorText} from '../../styledComponent/styled';
import * as strings from '../../res/strings';
import Routes from '../../config/routesName';

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

  const storeValue = async () => {
    const user = {
      userName: mName,
      userEmail: mEmail,
      userPassword: mPassword,
    };
    try {
      await AsyncStorage.setItem(
        strings.USER_REGISTRATION_KEY,
        JSON.stringify(user),
      );
      navigation.navigate(Routes.Login);
    } catch (e) {
      console.log(e);
    }
  };

  //Registration button clicked
  const handleRegistration = () => {
    if (validate()) {
      storeValue();
      console.log('Valid data');
    }
  };

  const validate = () => {
    let result = true;
    if (mName.length < 3) {
      setNameError(strings.ErrorShortName);
      result = false;
    }

    if (mName === '') {
      setNameError(strings.ErrorNameRequired);
      result = false;
    }

    //check for email regex
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(mEmail).toLowerCase())) {
      result = false;
      setEmailError(strings.ErrorInvalidEmailAddress);
    }

    var passwordRegex = {
      capital: /[A-Z]/,
      digit: /[0-9]/,
      small: /[a-z]/,
      full: /^[@#][A-Za-z0-9]{7,13}$/,
    };

    if (mPassword === '') {
      setPasswordError(strings.ErrorPasswordRequired);
      return false;
    }
    if (mPassword.length < 8) {
      setPasswordError(strings.ErrorShortPassword);
      return false;
    }

    if (!passwordRegex.capital.test(mPassword)) {
      setPasswordError(strings.ErrorUpperCaseIsMissing);
      return false;
    }

    if (!passwordRegex.digit.test(mPassword)) {
      setPasswordError(strings.ErrorNumberIsMissing);
      return false;
    }

    if (!passwordRegex.small.test(mPassword)) {
      setPasswordError(strings.ErrorLowerCaseLetterIsMissing);
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
          <Text style={styles.appNameStyle}>{strings.APP_NAME}</Text>
        </View>
      </ImageBackground>

      {/* Bottom parent Layout */}
      <View style={styles.bottomLayoutWrapper}>
        <LargeTitle>{strings.CreateAccount}</LargeTitle>
        {/* <Text style={styles.welcomeText}>{strings.CreateAccount}</Text> */}

        {/* Input layout */}
        <View style={styles.inputBackground}>
          <TextInputLayout
            style={styles.inputField}
            onChangeText={val => handleName(val)}
            placeholder={strings.Name}
            maxLength={32}
          />
          <ErrorText>{mErrorName}</ErrorText>
          <View style={{height: 22}} />
          <TextInputLayout
            onChangeText={val => handleEmail(val)}
            placeholder={strings.Email}
            maxLength={28}
            style={styles.inputField}
          />
          <ErrorText>{mErrorEmail}</ErrorText>
          <View style={{height: 22}} />
          <TextInputLayout
            onChangeText={val => handlePassword(val)}
            placeholder={strings.Password}
            maxLength={28}
            secureEntry={true}
            style={styles.inputField}
          />
          <ErrorText>{mErrorPassword}</ErrorText>
        </View>
        <AppButton
          style={styles.loginButton}
          loginText={strings.Submit}
          onLoginClicked={handleRegistration}
          isEnable={true}
          progress={false}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate(Routes.Login)}
          style={styles.signInButtonStyle}>
          <Text style={{color: 'grey'}}>{strings.AlreadyHvAct}</Text>
          <Text style={{color: 'tomato', marginStart: 8}}>
            {strings.SignIn}
          </Text>
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
    flex: 0.8,
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
    flex: 2,
    flexDirection: 'column',
    borderTopEndRadius: 28,
    borderTopStartRadius: 28,
    marginTop: -24,
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
