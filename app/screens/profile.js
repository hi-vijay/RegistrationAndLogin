import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import Feather from 'react-native-vector-icons/Feather';
//import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import routesName from '../config/routesName';
import {PROFILE_IMAGES} from '../assets/imagePath';
import {SeparatorLine} from '../styledComponent/styled';
import {
  PRIVACY_POLICY,
  HELP,
  IMPRINT,
  ENGLISH,
  Welcome,
  APP_NAME,
  CURRENT_YEAR,
  LOGOUT,
  LOGOUT_MESSAGE,
  LOGIN_STATUS,
} from '../assets/Strings/strings';
import AsyncStorage from '@react-native-async-storage/async-storage';

Feather.loadFont();

const Profile = ({navigation}) => {
  const [userName, setName] = useState('Firebase user');

  firebase.auth().onAuthStateChanged(user => {
    console.log('firebase user, ', user);
    if (user) {
      const firebaseUser = user._user;
      if (firebaseUser) {
        setName(firebaseUser.displayName);
      }
    }
  });

  //const user = firebase.auth().currentUser;
  // user
  //   .updateProfile({
  //     displayName: 'Vijay',
  //   })
  //   .then(() => {
  //     console.log('update successful');
  //   })
  //   .catch(error => {
  //     // An error occurred
  //     // ...
  //     console.log('an error occured ', error);
  //   });

  const updateLocalValue = async () => {
    try {
      await AsyncStorage.setItem(LOGIN_STATUS, 'false');
    } catch (e) {
      console.log(e);
    }
  };

  const logOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        updateLocalValue();
        navigation.navigate(routesName.AuthStack);
      })
      .catch(e => {
        const errorCode = e.code;
        console.log(e);
        console.log(errorCode);
        navigation.navigate(routesName.AuthStack);
      });
  };

  const showLogoutConfirmation = () => {
    console.log('sign out initiated');
    Alert.alert(
      LOGOUT,
      LOGOUT_MESSAGE,
      [
        {
          text: 'Keep me Login',
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: LOGOUT,
          onPress: () => {
            logOut();
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <Text style={styles.titleStyle}>Profile</Text>
      </View>
      <View style={styles.rootContentView}>
        {/* Profile Details wrapper */}
        <View>
          <SeparatorLine />
          <View style={styles.profileDetailsWrapper}>
            <Image source={PROFILE_IMAGES[0]} style={styles.profileImage} />
            <View style={styles.userNameWrapper}>
              <Text style={styles.welcomeTextStyle}>{Welcome}</Text>
              <Text style={styles.userNameTextStyle}>{userName}</Text>
            </View>
            <TouchableOpacity
              onPress={showLogoutConfirmation}
              activeOpacity={0.7}
              style={styles.signOutWrapper}>
              <Feather name={'log-out'} size={28} color={'#2d2e30'} />
            </TouchableOpacity>
          </View>
          <SeparatorLine />
        </View>
        <View>
          {/* Assist card */}
          <View style={styles.helpCardWrapper}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Feather name={'headphones'} size={40} color={'#28ad59'} />
              <Text style={styles.helpTextStyle}>{HELP}</Text>
            </View>
          </View>

          {/* options */}
          <View style={styles.optionWrapper}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{flexDirection: 'row'}}>
              <Text style={styles.optionText}>{PRIVACY_POLICY}</Text>
              <Feather
                style={{marginStart: 8}}
                name={'chevron-right'}
                size={16}
                color={'grey'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{flexDirection: 'row'}}>
              <Text style={styles.optionText}>{IMPRINT}</Text>
              <Feather
                style={{marginStart: 8}}
                name={'chevron-right'}
                size={16}
                color={'grey'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{flexDirection: 'row'}}>
              <Text style={styles.optionText}>{ENGLISH}</Text>
              <Feather
                style={{marginStart: 8}}
                name={'chevron-down'}
                size={16}
                color={'grey'}
              />
            </TouchableOpacity>
          </View>
          <SeparatorLine />
          {/* org */}
          <Text style={styles.companyNameTextWrapper}>
            © {APP_NAME} {CURRENT_YEAR}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  rootContentView: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signOutWrapper: {
    marginEnd: 24,
  },
  titleStyle: {
    fontSize: 22,
    fontWeight: '600',
    marginStart: 18,
    color: '#2d2e30',
    paddingVertical: 16,
  },
  profileDetailsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 28,
  },
  userNameWrapper: {
    marginStart: 16,
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  profileImage: {
    width: 42,
    height: 42,
    marginStart: 16,
    backgroundColor: 'lightgrey',
    borderRadius: 25,
  },
  optionWrapper: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 24,
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 18,
    fontWeight: '500',
    margin: 18,
  },
  userEmail: {
    fontSize: 18,
    fontWeight: '500',
    marginStart: 18,
  },
  helpCardWrapper: {
    backgroundColor: '#E3FAF4',
    marginHorizontal: 14,
    padding: 18,
    borderRadius: 14,
  },
  welcomeTextStyle: {fontSize: 15, color: 'grey', fontWeight: '400'},
  userNameTextStyle: {
    marginTop: 6,
    fontSize: 18,
    color: '#2d2e30',
    fontWeight: '600',
  },
  helpTextStyle: {
    fontWeight: '600',
    fontSize: 20,
    color: '#008f6a',
    marginStart: 18,
  },
  optionText: {color: 'grey', fontSize: 14, fontWeight: '500'},
  companyNameTextWrapper: {
    marginVertical: 24,
    textAlign: 'center',
    color: 'grey',
    fontWeight: '600',
  },
});

export default Profile;
