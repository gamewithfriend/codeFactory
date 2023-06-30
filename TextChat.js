import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { GiftedChat, MessageText } from 'react-native-gifted-chat';
import WebSocketClient from './utils/WebSocketClient.js';

// 최상위 변수 선언
const MOCK_MESSAGES = [
    {
      _id: 'test11',
      text: 'Hello, World!',
      createdAt: new Date(),
      user: {
        _id: 'test11',
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

    const handleReport = () => {
      // 신고 버튼을 눌렀을 때 수행할 작업을 여기에 작성합니다.
    
      console.log('Report button pressed!');
    }

    const handleAdd = () => {
      // 추가 버튼을 눌렀을 때 수행할 작업을 여기에 작성합니다.

      console.log("Add button pressed!");
    }

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
      _id : name, 
      createdAt: new Date(),
      user: {
        _id: name, 
        name: name, 
        avatar: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png'
      },
    };

    const renderImages = () => {
      return (
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={handleReport}>
          <Image
            source={require('./assets/images/report-icon.png')}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAdd}>
          <Image
            source={require('./assets/images/addFriend.png')}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
        </TouchableOpacity> 
       </View>
      );
    };

    // const renderBubble = (props) => {
    //   return (
    //     <View style={styles.bubbleContainer}>
    //       <Bubble {...props} />
    //     </View>           
    //   );
    // };

    const renderMessageText = (props) => {
      if (props.currentMessage.user._id !== user._id) {
        return (
          // <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row' }}>
              <View >
                <MessageText {...props} />
              </View>
              <View >
                {renderImages()}
              </View>
            </View>
          // </View>
        );
      } else {
        return (
          <View style={{ flexDirection: 'row' }}>
            <View >
              <MessageText {...props} />
            </View>
          </View>
        );
      }
    };



      

      return (
        <View style={{ flex: 1 }}>
          <GiftedChat
            messages={messages}
            onSend={newMessages => onSend(newMessages)}
            user={user}
            renderUsernameOnMessage={true}
            renderMessageText={renderMessageText}
            // renderBubble={renderBubble}
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
    bubbleContainer: {
      flex: 1,
      flexDirection: 'row',
      
    },
    textInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      width: '50%'
    },
    imageContainer: {
      flex : 0.8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    
  });