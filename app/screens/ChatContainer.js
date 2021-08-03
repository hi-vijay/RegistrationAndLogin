import React, {useState, useCallback, useEffect} from 'react';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import {View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const Container = ({navigation, route}) => {
  const {name} = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 3,
        text: 'Hello World',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

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
        }}
      />
    );
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View
          style={{
            backgroundColor: 'dodgerblue',
            width: 35,
            height: 35,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginEnd: 6,
          }}>
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
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
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
