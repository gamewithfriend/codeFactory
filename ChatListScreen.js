import React, { Component, useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, StatusBar, SafeAreaView, Dimensions,Modal,Pressable,Alert } from 'react-native';
import * as Session from './utils/session';

const realUrl = "3.37.211.126";
const testUrl = "192.168.105.27";
const testUrl2 = "192.168.219.142";

export default function ChatListScreen ({navigation}) {
    const [chatList, setChatList] = useState([]);
    const itemHeightRatio = 0.1;    // 아이템 높이를 화면 높이의 %로 설정
    const [modalVisible, setModalVisible] = useState(false);

    // 세션정보를 담기위한 변수 선언
    let session = "";
    
    const initChatList = async() => {
        try {
            // 세션정보를 먼저 받아온다
            let sessionValue = await Session.sessionGet("sessionInfo");
            session = sessionValue;
            
            if (session != null && session != undefined) {
                // 세션정보를 기반으로 채팅방 목록을 호출
                getChatList(realUrl, session);
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    // 사용자의 chatList를 불러온다.
    const getChatList = async (url, data) => {
        await fetch("http://" + url + ":8080/chat/getChatList.do", {
            method : "POST",
            headers : {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body : JSON.stringify(data)
        }).then(response => response.json()
        ).then(async (result) => {
            // 컴포넌트의 값을 세팅
            
            if (result.chatList != null && result.chatList != undefined) {
                updateChatList(result);
            }
            console.log(result);
        }).catch( error => {
            console.error(error);
        }) ;
    };

    // 데이터가 변할 때마다 chatList 업데이트
    const updateChatList = (data) => {
        const updatedChatList = data.chatList.map(item => ({
        id: item.chaSeq,
        name: item.chaTitl
        }));
        setChatList(updatedChatList);
    };

    const getItemLayout = (_, index) => ({
        length: Dimensions.get("window").height * itemHeightRatio,
        offset: (Dimensions.get("window").height * itemHeightRatio) * index,
        index,
    });

    // buttonClickEvent
    const handleAdd = () => {
        console.log("임시");
    };

    // buttonClickEvent
    const addFriendChat = () => {
        setModalVisible(true);
    };
    
    
    useEffect(()=> {
        initChatList();
    }, []);
    
    return (
        <SafeAreaView stlye={styles.container}>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

            <View style={styles.header}>
                <TouchableOpacity onPress={addFriendChat}>
                    <Image
                        source={require('./assets/images/addFriendChat.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAdd}>
                    <Image
                        source={require('./assets/images/addFriend.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAdd}>
                    <Image
                        source={require('./assets/images/addFriend.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                {chatList.length === 0 ? (
                    <Text>참여중인 채팅방이 없습니다.</Text>
                ) : (
                <FlatList
                    data={chatList}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                    <View style={[styles.chatItem, { height: Dimensions.get('window').height * itemHeightRatio }]}>
                        <Text>{item.name}</Text>
                    </View>
                    )}
                    getItemLayout={getItemLayout}
                />
                )}
            </View>
            <View style={styles.centeredView}>
              <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <Pressable style={{
              flex:1,
              backgroundColor:'transparent',
              }}
              onPress={()=>setModalVisible(false)}
              />
              <View style={styles.centeredView} >
                <View style={styles.modalView}>
                    <Text>dddddd</Text>
                </View>
              </View>
              </Modal>
            </View>
      </SafeAreaView>
      
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
      },
      header: {
        flexDirection : 'row',
        justifyContent : 'flex-end',
        // backgroundColor: 'red',
      },
      body: {
        // backgroundColor: 'blue',
      },
      chatItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
      },
      image: {
        width: 30, height: 30
      },
      centeredView: {
        flex: 1,
        marginTop: "5%",
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        padding: "5%",
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position:'absolute',
        top:-270,
        bottom:500,
        left:120,
        right:40,
      },
});