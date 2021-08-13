import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {Bubble, InputToolbar} from 'react-native-gifted-chat';

export const RenderBubble = props => {
  const imageMessage = props.currentMessage.image !== undefined ? true : false;
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          paddingVertical: imageMessage ? 2 : 8,
          paddingHorizontal: imageMessage ? 2 : 8,
          borderTopLeftRadius: imageMessage ? 10 : 20,
          borderTopRightRadius: imageMessage ? 10 : 20,
          borderBottomStartRadius: imageMessage ? 10 : 20,
          borderBottomRightRadius: 0,
          backgroundColor: imageMessage ? '#EFEFEF' : '#1a243a',
        },
        left: {
          backgroundColor: imageMessage ? '#EFEFEF' : '#fff',
          paddingVertical: imageMessage ? 2 : 8,
          paddingHorizontal: imageMessage ? 2 : 8,
          borderRadius: imageMessage ? 10 : 20,
          borderTopLeftRadius: imageMessage ? 10 : 20,
          borderTopRightRadius: imageMessage ? 10 : 20,
          borderBottomRightRadius: imageMessage ? 10 : 20,
          borderBottomStartRadius: 0,
          shadowColor: imageMessage ? '#f3f6fb' : '#979797',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.45,
          shadowRadius: 2,
          elevation: 5,
        },
      }}
      // textStyle={{
      //   right: {
      //     color: '#fff',
      //   },
      //   left: {
      //     color: '#444444',
      //   },
      // }}
      timeTextStyle={{
        right: {color: '#898c8f'},
        left: {color: '#898c8f'},
      }}
    />
  );
};

export const RenderLoading = () => {
  return (
    <View style={{flex: 1}}>
      <ActivityIndicator size="large" color="dodgerblue" />
    </View>
  );
};

export const RenderInputToolbar = props => {
  return (
    <InputToolbar
      {...props}
      containerStyle={styles.inputToolbarContainerStyle}
    />
  );
};
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
  inputToolbarContainerStyle: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    margin: 10,
    marginBottom: 8,
    paddingStart: 8,
    paddingVertical: 2,
    shadowColor: '#979797',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  loadingContainer: {
    flex: 1,
  },
});
