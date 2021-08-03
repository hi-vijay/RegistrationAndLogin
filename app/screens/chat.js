import React from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import ChatCard from '../components/ChatCard';
import routesName from '../config/routesName';
import images from '../assets/imagePath';

const dummyData = [
  {
    id: 1,
    name: 'user1',
    lastMessage: 'Hi there',
    time: '12:12',
    userImage: images[0],
  },
  {
    id: 2,
    name: 'user2',
    lastMessage: 'Hi there',
    time: '12:12',
    userImage: images[0],
  },
  {
    id: 3,
    name: 'user3',
    lastMessage: 'Hi there',
    time: '12:12',
    userImage: images[0],
  },
  {
    id: 4,
    name: 'user4',
    lastMessage: 'Hi there',
    time: '12:12',
    userImage: images[0],
  },
];

const Chat = ({navigation}) => {
  const openChatContainer = data => {
    navigation.navigate(routesName.ChatContainer, {
      name: data,
    });
    console.log('flatList', data);
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <FlatList
        style={{flex: 1}}
        data={dummyData}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <ChatCard
            chat={item}
            lastItem={index === dummyData.length - 1}
            onClick={data => openChatContainer(data)}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Chat;
