import React, { Component, useEffect, useState } from 'react';
import { View, Text, Button,StyleSheet,TextInput,Dimensions,ActivityIndicator,Image, TouchableOpacity,Modal } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import * as Session from './utils/session.js';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

const realUrl = "3.37.211.126";
const testUrl = "192.168.219.142";
const {width:SCREEN_WIDTH} = Dimensions.get('window');

export default function FriendScreen ({navigation}) {
    let getMyNick;

    // 채팅 대화 상대를 담기위한 변수 선언
    let receivers = [];
    
    const [getFriendNum, setFriendNum] = useState(1);
    const [getStateFriendList, setStateFriendList] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const isFocused = useIsFocused();
    const [modalVisible, setModalVisible] = useState(false);
    const [getFriendInfo, setFriendInfo] = useState([]);

    const getFriendList = async() =>{
      let userInfo= await Session.sessionGet("sessionInfo");
      setUserInfo(userInfo);
      getMyNick = userInfo.uIntgId;
      const response = await fetch (`http://3.37.211.126:8080/friend/findFriendList.do?myNick=${getMyNick}`)
      // const response = await fetch (`http://192.168.0.187:8080/friend/findFriendList.do?myNick=${getMyNick}`)
      const json = await response.json();
      setStateFriendList(json.friendList)
      console.log(json.friendList)
      setFriendNum(json.friendNum);
    };
    
    const getMyInfo = async() =>{
      let userInfo= await Session.sessionGet("sessionInfo");
      const sessionId = userInfo.uIntgId;
      const response = await fetch (`http://3.37.211.126:8080/mypage/selectUserInfo.do?uIntgId=${sessionId}`)
      const json = await response.json();
      if(json != ''){
        setUserInfo(json.user[0]);
      }
    };
    
    const editMyProfile = async () => {
      navigation.navigate('SetNickNameScreen');
    };
    
    const viewProfileModal = async (searchId) => {
      setModalVisible(true);
      let userInfo = await Session.sessionGet("sessionInfo");
      const response = await fetch (`http://3.37.211.126:8080/friend/findFriendList.do?myNick=${userInfo.uIntgId}&keyWord=${searchId}`)
      const json = await response.json();
      console.log(json)
      if(json != ''){
        console.log(getFriendInfo);
        setFriendInfo(json.friendList[0]);
      }
    };

    const closeProfileModal = () => {
      setModalVisible(false);
    };

    const openChat = async (sessionInfo) => {
      sessionInfo.sender = userInfo.uintgId;
      if (sessionInfo.fYouId != null) {
        receivers.push(sessionInfo.fYouId);
      }
      sessionInfo.receivers = receivers;
      
      await fetch("http://" + testUrl + ":8080/chat/openChatRoom.do", {
                                    method : "POST",
                                    headers : {
                                        'Content-Type': 'application/json; charset=utf-8',
                                    },
                                    body : JSON.stringify(sessionInfo)
                                  }).then(response => response.json()
                                   ).then((result) => {
                                        navigation.navigate('TextChat', {chatRoomId : result.resultMap.chatRoomId});
                                   }).catch( error => {
                                        console.error(error);
                                   }) ;
    };

    useEffect(() => {
      getFriendList();
      getMyInfo();
    },[isFocused]);
    
    return (
        <View >
            <View>
                   <Text style={styles.titleFont}>친구</Text>
            </View>
            <TouchableOpacity style={styles.profileView} onPress={editMyProfile}>
                <View style={styles.profileImgView}>
                  {
                    // selectedImage.uri !== '' ? (
                    // <Image source={{ uri: selectedImage.uri }} style={styles.profileImg} resizeMode='contain' />
                    // ) : (
                      userInfo.profileImgUrl !== '' ? (
                      <Image
                        source={{ uri: `http://3.37.211.126:8080/tomcatImg/myPage/${userInfo.profileImgUrl}`}}
                        style={styles.profileImg}
                        resizeMode='contain'
                      />
                    ) : (
                      <Image resizeMode='contain' style={styles.profileImg} source={require("./assets/images/emptyProfile.jpg")}/>
                    )
                    // )
                  }
                </View>
                <View style={styles.profileMesaageView}>
                  <Text style={styles.statusMessageFont}>{userInfo.unickname}</Text>       
                </View>
            </TouchableOpacity>
            <View style={styles.lineDesign} />
            <View style={styles.friendView}>
              <View style={styles.friendCountView}>
                <View  >
                  <Text style={styles.statusMessageFont} >친구수:</Text>
                </View>
                <View  >
                  <Text style={styles.statusMessageFont} >{getFriendNum}</Text>
                </View>   
              </View>
              <View style={styles.friendListView}>
                <ScrollView pagingEnabled ={false}  
                            showsHorizontalScrollIndicator = {false}>
                {getStateFriendList.length === 0? (
                    <View>
                    </View>
                  ):(
                    <View style={styles.friendHeader}>
                      <View style={styles.itemBox}>
                          <View style={styles.itemBoxPhoto}>

                          </View>
                          <View style={styles.itemBoxMessage}>
                              <View style={styles.itemBoxMessageHeaderName}>
                                <Text>닉네임</Text>
                              </View>
                              <View style={styles.itemBoxMessageHeaderStatus}>
                                <Text>소환사명</Text>
                              </View>
                          </View>
                      </View>
                    </View>
                  )
                }
                 {getStateFriendList.length === 0? (
                            <View>
                                <ActivityIndicator color="black" size="large"/>
                            </View>
                            ) : (
                              getStateFriendList.map( (info, index) =>    
                                <View key={index} style={styles.centerBottomContainer} data={info.fYouId} onStartShouldSetResponder={()=>openChat(info)}>               
                                  <TouchableOpacity style={styles.itemBox} onPress={viewProfileModal.bind(this,info.fYouId)}>
                                    <View style={styles.itemBoxPhoto}>
                                    {
                                      info.profileImgUrl !== null ? (
                                        <Image
                                          source={{ uri: `http://3.37.211.126:8080/tomcatImg/myPage/${info.profileImgUrl}`}}
                                          style={styles.profileImg}
                                          resizeMode='contain'
                                      />
                                      ) : (
                                        <Image resizeMode='contain' style={styles.profileImg}
                                        source={require("./assets/images/emptyProfile.jpg")}/>         
                                      )
                                    }
                                    </View>
                                    <View style={styles.itemBoxMessage}>
                                      <View style={styles.itemBoxMessageName}>
                                        <Text>{info.uNickname}</Text>
                                      </View>
                                      <View style={styles.itemBoxMessageStatus}>
                                        <Text>{info.glSummoner}</Text>
                                      </View>
                                    </View>
                                  </TouchableOpacity> 
                                </View> 
                                
                              )
                            )
                }                  
                </ScrollView>
              </View>  
            </View>
            <Modal visible={modalVisible} animationType="slide" onRequestClose={closeProfileModal}>
              <View style={styles.modalContainer}>
                <View style={styles.modalTopHeader}>
                  <Text style={styles.modalTitle}>{getFriendInfo.uNickname}</Text>
                </View>
                <View style={styles.modalImgView} >
                  {
                    getFriendInfo.profileImgUrl !== null ? (
                      <Image
                        source={{ uri: `http://3.37.211.126:8080/tomcatImg/myPage/${getFriendInfo.profileImgUrl}`}}
                        style={styles.modalImg}
                        resizeMode='contain'
                    />
                    ) : (
                      <Image resizeMode='contain' style={styles.modalImg}
                      source={require("./assets/images/emptyProfile.jpg")}/>         
                    )
                  }
                </View>
                <View style={styles.modalProfileLine}>
                  <Text style={styles.description}> 소환사명 : </Text>
                  <Text style={styles.content}> {getFriendInfo.glSummoner} </Text>
                </View>
                <View style={styles.modalProfileLine}>
                  <Text style={styles.description}> 랭크 : </Text>
                  <Text style={styles.content}> {getFriendInfo.glRank} </Text>
                </View>
                <View style={styles.modalProfileLine}>
                  <Text style={styles.description}> 주챔피언 : </Text>
                  <Text style={styles.content}> {getFriendInfo.glChampion} </Text>
                </View>
                <Button title="Close" onPress={closeProfileModal} />
              </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
      titleFont: {
        fontSize:30,
        marginTop:"10%",
        marginLeft:"5%",
      },
      statusMessageFont: {
        fontSize:18,
        marginLeft:"10%",
      },
      profileView: {
        width:"50%",
        height:"10%",
        marginTop:"5%",
        marginLeft:"5%",
        flexDirection:"row",
      },
      profileImgView: {
        width:"50%",
        height:"100%",
      },
      profileMesaageView: {
        width:"50%",
        height:"100%",
        flexDirection:"row",
      },
      modalContainer : {
        // marginTop : "",
      },
      modalTopHeader: {
        height:"10%",
        justifyContent: 'center', // 요소를 수평 축에서 오른쪽으로 정렬
        alignItems: 'center', // 요소를 수직 축에서 아래로 정렬
      },
      modalTitle: {
        fontSize: 30,
      },
      modalImgView : {
        height : "40%",
      },
      modalImg : {
        height : "100%",
        width : "100%",
      },
      modalProfileLine : {
        height : "10%",
        flexDirection:"row",
        justifyContent: 'space-between', // 요소들을 좌우로 분배
      },
      description : {
        width : "30%",
        // marginLeft: 'auto', // 수평 좌측으로 정렬
        // justifyContent: 'flex-end',
      },
      content : {
        marginRight: 'auto', // 수평 우측으로 정렬
      },
      imgUploadBtnView: {
        height:"7%",
      },
      imgUploadBtn: {
        width:"100%",
        height:"100%",
        justifyContent: 'center', // 요소를 수평 축에서 오른쪽으로 정렬
        color : "black",
        alignItems: 'center', // 요소를 수직 축에서 아래로 정렬
      },
      modalTop: {
        height:"70%",
        backgroundColor: "green", 
      },
      profileImg: {
        width:"100%",
        height:"100%",
      },
      profileOtherImg: {
        width:"100%",
        height:"100%",
      },
      modalBottomHeader: {
        height:"5%",
        // flexDirection:"row",
      },
      lineDesign:{
        height: 1, 
        backgroundColor: "black", 
        marginBottom: "3%",
        marginTop: "3%",
        opacity:0.3,
      },
      friendView: {
        width:"90%",
        height:"70%",
        marginTop:"5%",
        marginLeft:"5%",
      },
      friendCountView: {
        width:"100%",
        height:"5%",
        flexDirection:"row",
      },
      friendListView: {
        width:"100%",
        height:"85%",
        marginTop:"3%",
      },
      centerBottomContainer:{       
        flex:5,
        width:"100%",
        height:"10%",
      },
      friendHeader:{       
        flex:5,
        width:"100%",
        height:"10%",
      },
      itemBox:{
        width:"100%",
        flexDirection:"row",
      },
      itemBoxPhoto:{
        width:"20%",
        height:"100%",
      },
      itemBoxMessage:{
        width:"75%",
        height:"100%",
        marginLeft:"5%",
        flexDirection:"row"
      },
      itemBoxMessageHeaderName:{
        width:"20%",
        height:"100%",
        fontSize : 18,
      },
      itemBoxMessageHeaderStatus:{
        width:"80%",
        height:"100%",
        marginLeft:"5%",
        fontSize : 18,
      },
      itemBoxMessageName:{
        width:"20%",
        height:"100%",
        marginTop:"10%",
      },
      itemBoxMessageStatus:{
        width:"80%",
        height:"100%",
        marginLeft:"5%",
        marginTop:"10%",
      },
      whiteSpace:{
        height : "3%",
      },
      ghkrdls:{
        backgroundColor : "red",
      }
});