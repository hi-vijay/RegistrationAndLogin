import React, {useState, useEffect} from 'react';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import {View, Text, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import BtnRound from '../components/BtnRoundButton';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const Container = ({route}) => {
  const {name, guestUserId} = route.params;
  const [messages, setMessages] = useState([]);
  const [imageUri, setImageUri] = useState([]);
  const [isUploading, setUploading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Listener for any new message
  useEffect(() => {
    const messageContainerPath =
      currentUserId > guestUserId
        ? currentUserId + '-' + guestUserId
        : guestUserId + '-' + currentUserId;
    const path = `message/${messageContainerPath}`;

    const onValueChange = database()
      .ref(path)
      .on('value', snapshot => {
        let peopleArray = [];
        snapshot.forEach(snap => {
          if (snap.exists()) {
            peopleArray.splice(0, 0, snap.val());
          }
        });
        setMessages(peopleArray);
      });

    // Stop listening for updates when no longer required
    return () => database().ref(path).off('value', onValueChange);
  }, [currentUserId, guestUserId]);

  // Get the current user's ID
  useEffect(() => {
    const user = auth().currentUser;
    setCurrentUserId(user.uid);
  }, [currentUserId]);

  const sendMessage = message => {
    console.log('message ', message);
    const messageContainerPath =
      currentUserId > guestUserId
        ? currentUserId + '-' + guestUserId
        : guestUserId + '-' + currentUserId;
    const path = `message/${messageContainerPath}`;
    database()
      .ref(path)
      .push()
      .set(...message)
      .then(() => console.log('Data set.'));
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

  const choosePicture = () => {
    console.log('Pick image');
    let options = {
      title: 'You can choose one image',
      maxWidth: 720,
      maxHeight: 1080,
      storageOptions: {
        skipBackup: true,
      },
    };
    launchImageLibrary(options, args => {
      console.log('picked');
      const {didCancel} = args;
      if (!didCancel) {
        console.log(args);
        const {assets} = args;
        if (assets !== null) {
          setImageUri(assets[0].uri);
          uploadImageFile();
        }
      }
    });
  };

  const uploadImageFile = async () => {
    const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    try {
      setUploading(true);
      await storage().ref(fileName).putFile(imageUri);
      const url = await storage().ref(fileName).getDownloadURL();
      console.log(url);
      setUploading(false);
      const message = [
        {
          _id: Date.now(),
          user: {
            _id: currentUserId,
            name: name,
            avatar: 'https://placeimg.com/140/140/any',
          },
          createdAt: Date.now(),
          image: url,
        },
      ];
      sendMessage(message);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const renderSend = props => {
    return (
      <View style={styles.parentContainer}>
        <BtnRound
          icon="camera"
          iconColor={'white'}
          size={40}
          onPress={() => choosePicture()}
        />
        <Send {...props}>
          <View style={styles.sendButtonWrapper}>
            <Feather name={'send'} size={18} color={'white'} />
          </View>
        </Send>
      </View>
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
  parentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  sendButtonWrapper: {
    backgroundColor: 'dodgerblue',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
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
