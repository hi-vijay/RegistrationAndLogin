import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';

const Profile = () => {
  const [title, setTitle] = useState('Profile');
  const [userName, setName] = useState('name');
  const [userEmail, setEmail] = useState('email');

  const state = useSelector(data => {
    console.log('profile = ', data);
    return data;
  });

  useEffect(() => {
    setName(state.userName);
    setEmail(state.mail);
  }, []);

  return (
    <SafeAreaView style={styles.rootContainer}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <Text style={styles.titleStyle}>{title}</Text>
      </View>

      {/* Content */}
      <View>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  titleStyle: {
    fontSize: 22,
    fontWeight: '600',
    marginStart: 18,
    color: 'black',
    paddingVertical: 16,
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
});

export default Profile;
