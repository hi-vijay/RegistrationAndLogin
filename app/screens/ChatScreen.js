import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  ActivityIndicator,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import ChatCard from '../components/ChatCard';
import routesName from '../config/routesName';

import database from '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';

const Chat = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(true);
  const [users, setUsers] = useState([]);
  const [uid, setUid] = useState('');

  // Handle user state changes
  function onAuthStateChanged(user) {
    console.log('auth listener ', user);
    if (user === null || user.uid === null) {
      setUid('');
    } else {
      setUid(user.uid);
    }
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [uid]);

  const openChatContainer = data => {
    navigation.navigate(routesName.ChatContainer, {
      name: data.name,
      guestUserId: data.uid,
      email: data.email,
    });
  };

  const updateTheLastSeen = key => {
    database()
      .ref('users/' + key)
      .update({time: new Date().toLocaleString()}, () => {
        console.log('updated');
      })
      .then(() => {
        console.log('user last seen updated');
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const fetchData = () => {
    const usersPath = 'users';
    database()
      .ref(usersPath)
      .once('value')
      .then(users => {
        let userList = [];
        if (users.exists()) {
          users.forEach(user => {
            if (user.exists()) {
              if (user.val().uid === uid) {
                updateTheLastSeen(user.key);
              }
              userList.splice(0, 0, user.val());
            }
          });
          console.log(userList);
          setUsers(userList);
        }
      });
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
    setRefreshing(false);
  }, []);

  const card = userList => {
    if (userList.item.uid === uid) {
      return null;
    }
    return (
      <ChatCard
        chat={userList.item}
        lastItem={true}
        onClick={data => openChatContainer(data)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.headerWrapper}>
        <Text style={styles.titleStyle}>Chat</Text>
      </View>
      {/* <SeparatorLine /> */}
      {refreshing ? (
        <View style={{flex: 1}}>
          <ActivityIndicator size="small" color="dodgerblue" />
        </View>
      ) : (
        <FlatList
          style={{flex: 1}}
          data={users}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => card({item, index})}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#f3f6fb',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  titleStyle: {
    fontSize: 24,
    fontWeight: '600',
    marginStart: 22,
    color: '#2d2e30',
    paddingVertical: 12,
  },
});

export default Chat;
