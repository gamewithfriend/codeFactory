import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, FlatList, Text, StyleSheet} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import WebSocketClient from './utils/WebSocketClient.js';

// 최상위 변수 선언
const MOCK_MESSAGES = [
    {
      _id: 1,
      text: 'Hello, World!',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Simple Chatter',
        avatar: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png',
      },
    },
  ];

export default function TextChat({navigator}) {

    const [name, setName] = useState('');
    const [isEnter, setIsEnter] = useState(false);
    const [messages, setMessages] = useState(MOCK_MESSAGES);

    useEffect(() =>{

        return () => WebSocketClient.close();
    }, []);

    useEffect(() => {
        WebSocketClient.onReceiveMessage = (newMessage) => {
            setMessages(GiftedChat.append(messages, newMessage));
        }
    }, [messages]);

    const onSend = (newMessages) => {
        WebSocketClient.send(newMessages[0]);
    };

    if (!isEnter) {
        return (
        <View style={styles.container}>
            <TextInput
            style={styles.textInput}
            textAlign="center"
            value={name}
            placeholder="Name"
            onChangeText={text => setName(text)}
            />
            <Button title="Enter" onPress={() => setIsEnter(true)} />
        </View>
        );
    } else {
      const user = { 
        _id: name, 
        name, 
        avatar: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png'
      };

      return (
        <View style={{ flex: 1 }}>
          <GiftedChat
            messages={messages}
            onSend={newMessages => onSend(newMessages)}
            user={user}
            renderUsernameOnMessage
          />
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      width: '50%'
    }
  });