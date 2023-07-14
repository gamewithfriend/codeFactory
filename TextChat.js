import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { GiftedChat, MessageText } from 'react-native-gifted-chat';
import WebSocketClient from './utils/WebSocketClient.js';
import * as Session from './utils/session.js';

// 최상위 변수 선언
const realUrl = "3.37.211.126";
const testUrl = "192.168.219.142";

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

export default function TextChat({route,navigator}) {
    // 세션정보를 받기위한 변수 선언
    let session = "";
    let user = {};
    const client = new WebSocketClient("ws://" + testUrl + ":8080/chat/" + chatRoomId);
    
    // 채팅방 아이디
    const chatRoomId = route.params.chatRoomId;
    
    // 채팅방 입장시 웹소켓 open
    
    const [name, setName] = useState('');
    const [isEnter, setIsEnter] = useState(false);
    const [messages, setMessages] = useState(null);

    useEffect(() =>{
      // 현재 로그인 한 사람의 세션 정보 받기
      getSession();
      // 웹소켓 open
      
      console.log("오픈을 두번하진 않겠지");
      // setChatter(route.params.chatRoomId);
      // return () => WebSocketClient.close();
      return () => client.close();
    }, []);

    useEffect(() => {
        // WebSocketClient.onReceiveMessage = (newMessage) => {
        //     setMessages(GiftedChat.append(messages, newMessage));
        // }
        client.onReceiveMessage = (newMessage) => {
            console.log("댐따",newMessage);
            setMessages(GiftedChat.append(messages, newMessage));
        }
        // console.log(messages);
    }, [messages]);

    const onSend = (newMessages) => {
        // WebSocketClient.send(newMessages[0]);
        client.send(newMessages[0]);
    };

    const handleReport = () => {
      // 신고 버튼을 눌렀을 때 수행할 작업을 여기에 작성합니다.
    
      console.log('Report button pressed!');
    };

    const handleAdd = () => {
      // 추가 버튼을 눌렀을 때 수행할 작업을 여기에 작성합니다.

      console.log("Add button pressed!");
    };

    // 세션을 받아오는 함수
    const getSession = async () => {
      session = await Session.sessionGet("sessionInfo");
      console.log("session: ", session);
      user = { 
        _id : session.uIntgId, 
        createdAt: new Date(),
        user: {
          _id: session.uIntgId, 
          name: session.uNickName, 
          avatar: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png'
        },
      };
      console.log(user);
    };
    
    // 채팅참여자들을 세팅하는 함수
    const setChatter = async (chatRoomId) => {
      let tmpData = {"chatRoomId" : chatRoomId};

      const response = await fetch("http://" + testUrl + ":8080/chat/selectChatter.do", {
                                    method : "POST",
                                    headers : {
                                        'Content-Type': 'application/json; charset=utf-8',
                                    },
                                    body : JSON.stringify(tmpData)
                                  });
      const rtnData = await response.json();
      const resultList = rtnData.resultList;
      
      console.log("resultList", resultList);
    }

  //   if (!isEnter) {


  //     return (
  //     <View style={styles.container}>
  //         <TextInput
  //         style={styles.textInput}
  //         textAlign="center"
  //         value={name}
  //         placeholder="Name"
  //         onChangeText={text => setName(text)}
  //         />
  //         <Button title="Enter" onPress={() => setIsEnter(true)} />
  //     </View>
  //     );
  // } else {
    // const user = { 
    //   _id : session.uIntgId, 
    //   createdAt: new Date(),
    //   user: {
    //     _id: session.uIntgId, 
    //     name: session.uNickName, 
    //     avatar: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png'
    //   },
    // };

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
      // if (props.currentMessage.user._id !== user._id) {
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
      // } else {
      //   return (
      //     <View style={{ flexDirection: 'row' }}>
      //       <View >
      //         <MessageText {...props} />
      //       </View>
      //     </View>
      //   );
      // }
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
// }

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