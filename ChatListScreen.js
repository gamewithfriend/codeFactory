import React, { Component, useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, StatusBar, SafeAreaView, Dimensions,Modal,Pressable,Alert,Button,TextInput } from 'react-native';
import * as Session from './utils/session';


const realUrl = "3.37.211.126";
const testUrl = "192.168.105.27";
const testUrl2 = "192.168.219.142";

export default function ChatListScreen ({navigation}) {
    const [chatList, setChatList] = useState([]);
    const itemHeightRatio = 0.1;    // 아이템 높이를 화면 높이의 %로 설정
    const [modalVisible, setModalVisible] = useState(false);
    const [getFriendNum, setFriendNum] = useState(0);
    const [getStateFriendList, setStateFriendList] = useState([]);
    const [text, onChangeText] = React.useState('Useless Text');

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

    const addFriendForChat = () => {
        alert("여기다가 붙이면됨");
    };

    const onChange = (text)=>{
        onChangeText(text);
        getFriendList(text);   
      };

    const getFriendList = async(text) =>{
        let keyWord = "";
        if(text != undefined){
            keyWord = text;
        }
        let userInfo= await Session.sessionGet("sessionInfo");
        console.log("userInfo : ", userInfo);
        // const sessionId = userInfo.uIntgId;
        // setUserInfo(userInfo);
        // setMyNick(sessionId);
        getMyNick = userInfo.uIntgId;
        const response = await fetch (`http://3.37.211.126:8080/friend/findFriendList.do?myNick=${getMyNick}&keyWord=${keyWord}`)
        const json = await response.json();
        
        setStateFriendList(json.friendList)
        console.log(json.friendList)
        setFriendNum(json.friendNum);
      };
    
    
    useEffect(()=> {
        initChatList();
        getFriendList();
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
                    <TextInput
                        style={styles.input}
                        onChangeText={text => onChange(text)}
                        value={text}
                    />
                    {getStateFriendList.length === 0 ? (
                        <Text>친구가 없습니다.</Text>
                    ) : (
                    <FlatList
                        data={getStateFriendList}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                        <View style={[styles.chatItem, { height: Dimensions.get('window').height * itemHeightRatio }]}>
                            <View style={styles.itemBoxView}>
                                <View style={styles.itemBoxPhoto}>
                                <Image resizeMode='contain' style={styles.profileImg}
                                        source={require("./assets/images/emptyProfile.jpg")}/>
                                </View>
                                <View style={styles.listName}>
                                    <Text>{item.fYouId}</Text>
                                </View>
                            </View>
                            
                            
                        </View>
                        )}
                        getItemLayout={getItemLayout}
                    />
                    )}
                    <View style={styles.modalBottomContainer} >
                      <Button color={"black"} onPress={addFriendForChat} title='선택하기'></Button>
                    </View>
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
      flexDirection:"row",
      image: {
        width: 30, height: 30
      },
      centeredView: {
        flex: 1,
        marginTop: "5%",
      },
      itemBoxView: {
        flexDirection:"row"
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
        bottom:100,
        left:20,
        right:20,
      },
    profileImg: {
        width:"100%",
        height:"100%",
    },
    itemBoxPhoto:{
        width:"20%",
        height:"100%",
    },
    modalBottomContainer:{
        alignItems:"flex-end",
        marginRight:"5%",
    },
    listName:{
        marginLeft:"3%",
    },
    input:{
        marginBottom:"4%",
    },
});