import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TextInputLayout from '../components/TextInputLayout';
import AppButton from '../components/AppButton';

const RegistrationScreen = () => {
  const [mName, setName] = useState('');
  const [mEmai, setEmail] = useState('');
  const [mPhone, setPhone] = useState('');
  const [mPassword, setPassword] = useState('');
  const [mGender, setGender] = useState('');

  const handleEmail = email => {
    setEmail(email);
  };

  const handleName = name => {
    setName(name);
  };
  //Registration button clicked
  const handleRegistration = () => {
    console.log('helloWorld');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <TextInputLayout
          onChangeText={val => handleName(val)}
          placeholder={'Name'}
          imageURI={require('../assets/ic_user.png')}
          maxLength={42}
          margin={{marginTop: 12}}
          style={styles.inputField}
        />
        <TextInputLayout
          onChangeText={val => handleEmail(val)}
          placeholder={'Phone'}
          imageURI={require('../assets/ic_phone.png')}
          maxLength={32}
          style={styles.inputField}
          margin={{marginTop: 12}}
        />
        <TextInputLayout
          onChangeText={val => handleEmail(val)}
          placeholder={'Email'}
          maxLength={32}
          imageURI={require('../assets/ic_email.png')}
          style={styles.inputField}
          margin={{marginTop: 12}}
        />
        <TextInputLayout
          onChangeText={val => handleEmail(val)}
          secureEntry={true}
          placeholder={'Password'}
          imageURI={require('../assets/ic_password.png')}
          style={styles.inputField}
          maxLength={32}
          margin={{marginTop: 12}}
        />
      </View>
      <AppButton
        style={styles.loginButton}
        loginText={'Registration'}
        onLoginClicked={handleRegistration}
        isEnable={false}
        progress={false}
        margin={{marginTop: 12}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ebf2f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: 'white',
    width: '88%',
    elevation: 12,
    paddingVertical: 32,
    paddingHorizontal: 24,
    marginBottom: 98,
  },
  inputField: {
    paddingEnd: 10,
    paddingStart: 28,
    borderBottomWidth: 2,
  },
  loginButton: {
    position: 'absolute',
    width: '88%',
    bottom: 42,
  },
});

export default RegistrationScreen;
