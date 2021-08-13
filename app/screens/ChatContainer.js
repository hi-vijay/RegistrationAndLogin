import React, {useState, useEffect} from 'react';
import {GiftedChat, Send} from 'react-native-gifted-chat';
import {View, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import BtnRound from '../components/BtnRoundButton';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {
  RenderBubble,
  RenderInputToolbar,
  RenderLoading,
} from '../components/ChatComponents';

const Container = ({route}) => {
  const {name, email} = route.params;
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Get the current user's ID
  const getEmail = async () => {
    const user = await auth().currentUser;
    setCurrentUserId(user.uid);
    setUserEmail(user.email);
  };

  const filterEmail = email => {
    if (!email) {
      console.log('empty value');
      return '';
    }
    email = email.toLowerCase();
    return email.replace(/\.|@/g, '_');
  };

  // Listener for any new message
  useEffect(() => {
    getEmail();
    const user1 = filterEmail(userEmail);
    const user2 = filterEmail(email);
    const messageContainerPath =
      user1 > user2 ? user1 + '-' + user2 : user2 + '-' + user1;
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
  }, [userEmail]);

  const sendMessage = message => {
    console.log('message ', message);
    const user1 = filterEmail(userEmail);
    const user2 = filterEmail(email);
    const messageContainerPath =
      user1 > user2 ? user1 + '-' + user2 : user2 + '-' + user1;
    const path = `message/${messageContainerPath}`;

    let temp = message[0];
    temp.createdAt = Date.now();
    const newMessage = [temp];

    database()
      .ref(path)
      .push()
      .set(...newMessage)
      .then(() => console.log('Data set.'));
    //return [];
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
    launchImageLibrary(options, response => {
      console.log('picked');
      if (response.didCancel) {
        console.log('cancel res ', response);
        return;
      } else if (response.error) {
        console.log('response error ', response.error);
      } else {
        console.log('response ', response);
        const {assets} = response;
        if (assets !== null) {
          uploadImageFile(assets[0].uri);
        }
      }
    });
  };

  const uploadImageFile = async imageUri => {
    const loadingMessage = {
      _id: Date.now(),
      text: 'uploading...',
      user: {
        _id: currentUserId,
        name: name,
        avatar: 'https://placeimg.com/140/140/any',
      },
      createdAt: Date.now(),
      pending: true,
    };
    const msz = [loadingMessage, ...messages];
    setMessages(msz);
    console.log('uploadImageFile ', imageUri);
    const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    try {
      await storage().ref(fileName).putFile(imageUri);
      const url = await storage().ref(fileName).getDownloadURL();
      console.log(url);
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
    }
  };

  const RenderSend = props => {
    return (
      <View style={styles.parentContainer}>
        <BtnRound
          icon="camera"
          iconColor={'white'}
          size={40}
          color={'#0976DA'}
          onPress={() => choosePicture()}
        />
        <Send {...props} containerStyle={{margin: 3}}>
          <View style={styles.sendButtonWrapper}>
            <Feather name={'send'} size={18} color={'white'} />
          </View>
        </Send>
      </View>
    );
  };

  return (
    <GiftedChat
      listViewProps={{
        style: {
          backgroundColor: '#f3f6fb',
          marginBottom: 16,
        },
      }}
      inverted
      messages={messages}
      onSend={messages => sendMessage(messages)}
      user={{
        _id: currentUserId,
        name: name,
        avatar: 'https://placeimg.com/140/140/any',
      }}
      renderBubble={RenderBubble}
      alwaysShowSend
      renderSend={RenderSend}
      placeholder={'Type here...'}
      renderLoading={RenderLoading}
      renderInputToolbar={RenderInputToolbar}
    />
  );
};
export default Container;

const styles = StyleSheet.create({
  parentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendButtonWrapper: {
    backgroundColor: '#0976DA',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginEnd: 6,
    marginBottom: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
