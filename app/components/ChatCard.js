import React from 'react';
import {Text, Image, TouchableOpacity, View, StyleSheet} from 'react-native';

const ChatBox = props => {
  console.log('chatbox ', props);
  const {id, name, time, lastMessage, userImage} = props.chat;
  const {lastItem = true} = props;
  const openChat = data => {
    props.onClick(data);
  };
  return (
    <TouchableOpacity
      onPress={() => openChat(name)}
      activeOpacity={0.8}
      style={styles.rootContainer}>
      <Image source={userImage} style={styles.userImageStyle} />
      {/* Details */}
      <View style={styles.detailsWrapper}>
        <View style={styles.userNameWrapper}>
          <Text style={styles.userNameStyle}>{name}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.lastMessageStyle}>
          {lastMessage}
        </Text>
        {!lastItem && <View style={styles.separatorLine} />}
      </View>
    </TouchableOpacity>
  );
};
export default ChatBox;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  userImageStyle: {
    width: 44,
    height: 44,
    borderRadius: 24,
    marginStart: 16,
    backgroundColor: 'lightgrey',
  },
  detailsWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  userNameWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userNameStyle: {
    marginStart: 12,
    flex: 0.85,
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  lastMessageStyle: {
    marginHorizontal: 12,
    marginTop: 4,
    flex: 0.8,
    fontSize: 16,
    fontWeight: '500',
    color: 'grey',
  },
  time: {
    marginEnd: 12,
    flex: 0.15,
    color: 'grey',
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#e3e6e8',
    marginTop: 12,
    marginStart: 16,
  },
});
