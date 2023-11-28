import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { GiftedChat, MessageText } from 'react-native-gifted-chat';
import WebSocketClient from './utils/WebSocketClient.js';
import * as Session from './utils/session.js';
import { getDirectoryUri, createFile, readFile, deleteFile } from './utils/expoFileSystem.js';
import { NavigationContainer, useNavigation, useIsFocused } from '@react-navigation/native';
import colors from './assets/colors/colors';

// 최상위 변수 선언
const realUrl = "3.37.211.126";
const testUrl = "192.168.219.142";
// 세션정보를 받기위한 변수 선언
let session = "";
// 웹소켓 정보를 위한 변수 선언
let client;
// 메세지 발송 유저 유지를 위한 변수 선언
let user;

export default function TextChat({ route, navigator }) {
  const chatRoomId = route.params.chatRoomId;
  const isFocused = useIsFocused();



  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // 현재 로그인 한 사람의 세션 정보 받기
    getSession();

    // 로컬스토리지에 bgDarkGray된 채팅방 가져오기, 읽지 않은 채팅 목록도 확인하자
    getChatMessage(chatRoomId + '.txt');

    // 채팅방 입장시 웹소켓 open
    client = new WebSocketClient("ws://" + realUrl + ":8080/chat/" + chatRoomId);

    return () => client.close();
  }, [chatRoomId]);

  useEffect(() => {
    client.onReceiveMessage = (newMessage) => {
      setMessages(GiftedChat.append(messages, newMessage));
      // 파일 insert 해주는 건 여기다가 넣으면 되겠지
      let chatList = GiftedChat.prepend(messages, []);
      chatList.unshift(newMessage);

      // 자 이제 파일로 만들어서 넣어
      createFile(chatRoomId + '.txt', JSON.stringify(chatList));
    };
  }, [messages]);

  useEffect(() => {
    console.log(isFocused);
    if (!isFocused) {
      client.close();
    }
  }, [isFocused]);

  const onSend = (newMessages) => {
    client.send(newMessages[0]);
  };

  const handleReport = (user) => {
    // 신고 버튼을 눌렀을 때 수행할 작업을 여기에 작성합니다.
    console.log(user);
    console.log('Report button pressed!');
  };

  const handleAdd = () => {
    // 추가 버튼을 눌렀을 때 수행할 작업을 여기에 작성합니다.

    console.log("Add button pressed!");
  };

  // 세션을 받아오는 함수
  const getSession = async () => {
    session = await Session.sessionGet("sessionInfo");
    user = {
      _id: session.uIntgId,
      user: {
        _id: session.uIntgId,
        name: session.uNickname,
        avatar: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png'
      },
    };
    // 최초 유저 정보를 저장 -> 화면엔 노출 X
    setMessages([user]);
  };

  // 파일로 저장된 채팅방 내용을 가져오는 함수
  const getChatMessage = async (fileName) => {
    let fileContent = await readFile(fileName);

    if (fileContent != null && fileContent != undefined && fileContent != "") {
      setMessages(JSON.parse(fileContent));
    }

    // DB에 저장된 tmp 메세지 가져오기
    let data = { "chatRoomId": chatRoomId, "receiver": session.uIntgId };
    // 읽지 않은 채팅 메세지가 있는지 확인 후 등록
    const response = await fetch("http://" + realUrl + ":8080/chat/selectUnreadMsg.do", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data)
    });
    const jsonData = await response.json();
    if (fileContent != null && fileContent != "" && jsonData != null && jsonData != "") {
      const jsonArray = JSON.stringify(jsonData.resultList);
      const concatArray = [...JSON.parse(jsonArray), ...JSON.parse(fileContent)];

      createFile(chatRoomId + '.txt', JSON.stringify(concatArray));

      setMessages(concatArray);
    } else {
      setMessages(JSON.parse(fileContent));
    }
  };

  const renderImages = (user) => {
    return (
      // User 사진
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => handleReport(user)}>
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

  const renderMessageText = (props) => {
    if (props.currentMessage.user._id !== user._id) {
      return (
        // 말풍선
        <View style={{ flexDirection: 'row' }}>
          <View >
            <MessageText {...props} />
          </View>
          <View >
            {renderImages(props.currentMessage.user.user)}
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
    // 배경
    <View style={{ flex: 1, backgroundColor:colors.darkGrdnt}}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={user}
        renderUsernameOnMessage={true}
        renderMessageText={renderMessageText}
        // renderBubble={renderBubble}
        messageIdGenerator={() => {
          // messageIdGenerator를 사용하여 유니크한 키 생성
          return Math.random().toString(36).substring(7);
        }}
      />
    </View>
  );
}
// }

const styles = StyleSheet.create({
  imageContainer: {
    flex: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
  },

});