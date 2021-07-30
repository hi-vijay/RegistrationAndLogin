import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Chat = () => {
  return (
    <View style={styles.rootContainer}>
      <Text>Chat screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Chat;
