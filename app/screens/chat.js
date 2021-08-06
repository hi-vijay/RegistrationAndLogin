import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import ChatCard from '../components/ChatCard';
import routesName from '../config/routesName';
import images from '../assets/imagePath';

const dummyData = [
  {
    id: 1,
    name: 'Android',
    userId: 'VOdY2ljapCWqV38w6xNw5rAYGzA3',
    lastMessage: 'Hi there',
    time: '12:12',
    userImage: images[0],
  },
  {
    id: 2,
    name: 'iOS',
    userId: 'mBWqoFdssTOn5TFAKug9eVuKZHr1',
    lastMessage: 'Hi there',
    time: '12:12',
    userImage: images[0],
  },
];

const Chat = ({navigation}) => {
  const openChatContainer = data => {
    navigation.navigate(routesName.ChatContainer, {
      name: data.name,
      guestUserId: data.userId,
    });
    console.log('flatList', data);
  };

  const card = data => {
    console.log(data);
    if (Platform.OS === 'ios') {
      if (data.item.name !== 'iOS') {
        return null;
      }
    } else {
      if (data.item.name !== 'Android') {
        return null;
      }
    }
    return (
      <ChatCard
        chat={data.item}
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
      <FlatList
        style={{flex: 1}}
        data={dummyData}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => card({item, index})}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
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
