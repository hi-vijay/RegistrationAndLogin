import React, {useState, useCallback, useEffect} from 'react';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import {View, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const Container = ({route}) => {
  const {name, guestUserId} = route.params;
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const path = `/users/${currentUserId}/message`;
    console.log('path=> ', path);

    const onValueChange = database()
      .ref(path)
      .on('value', snapshot => {
        let peopleArray = [];
        snapshot.forEach(snap => {
          if (snap.exists()) {
            console.log('exist', snap.val());
            peopleArray.splice(0, 0, snap.val());
          }
        });
        setMessages(peopleArray);
        console.log('conversation length ', peopleArray.length);
      });

    // Stop listening for updates when no longer required
    return () =>
      database()
        .ref(`/users/${currentUserId}/message`)
        .off('value', onValueChange);
  }, [currentUserId]);

  useEffect(() => {
    const user = auth().currentUser;
    setCurrentUserId(user.uid);
  }, [currentUserId]);

  const sendMessage = message => {
    const path = `/users/${currentUserId}/message`;
    const guestUserPath = `/users/${guestUserId}/message`;

    database()
      .ref(path)
      .push()
      .set(...message)
      .then(() => console.log('Data set.'));

    database()
      .ref(guestUserPath)
      .push()
      .set(...message)
      .then(() => console.log('guest user Data set.'));
    return [];
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            paddingVertical: 4,
            borderRadius: 8,
            borderBottomEndRadius: 0,
          },
          left: {
            backgroundColor: '#f2fdff',
            paddingVertical: 4,
            borderRadius: 8,
            borderBottomStartRadius: 0,
          },
        }}
      />
    );
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View style={styles.sendButtonWrapper}>
          <Feather name={'send'} size={22} color={'lightgrey'} />
        </View>
      </Send>
    );
  };

  const scrollToBottomComponent = () => {
    return <Feather name={'chevrons-down'} size={22} color={'grey'} />;
  };

  return (
    <GiftedChat
      inverted
      messages={messages}
      onSend={messages => sendMessage(messages)}
      user={{
        _id: currentUserId,
        name: name,
        avatar: 'https://placeimg.com/140/140/any',
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};
export default Container;

const styles = StyleSheet.create({
  sendButtonWrapper: {
    backgroundColor: 'dodgerblue',
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: 6,
  },
});
// setMessages([
//   {
//     _id: 1,
//     text: 'Hello developer',
//     createdAt: new Date(),
//     user: {
//       _id: 2,
//       name: 'React Native',
//       avatar: 'https://placeimg.com/140/140/any',
//     },
//   },
//   {
//     _id: 3,
//     text: 'Hello World',
//     createdAt: new Date(),
//     user: {
//       _id: 'hi',
//       name: 'React Native',
//       avatar: 'https://placeimg.com/140/140/any',
//     },
//   },
// ]);
