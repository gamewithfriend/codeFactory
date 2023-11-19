import React, { Component, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Dimensions, ActivityIndicator, ImageBackground, Image, TouchableOpacity, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Session from './utils/session.js';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

//이소망 추가
import MainFrame from './MainFrame';
import { glStyles } from './globalStyles';
import colors from './assets/colors/colors';

const realUrl = "3.37.211.126";
const testUrl = "192.168.219.142";
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function FriendScreen({ navigation }) {
  let getMyNick;

  // 채팅 대화 상대를 담기위한 변수 선언
  let receivers = [];

  const [getFriendNum, setFriendNum] = useState(1);
  const [getStateFriendList, setStateFriendList] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [getFriendInfo, setFriendInfo] = useState([]);

  const getFriendList = async () => {
    let userInfo = await Session.sessionGet("sessionInfo");
    setUserInfo(userInfo);
    getMyNick = userInfo.uIntgId;
    const response = await fetch(`http://hduo88.com/friend/findFriendList.do?myNick=${getMyNick}`)
    // const response = await fetch (`http://192.168.0.187:8080/friend/findFriendList.do?myNick=${getMyNick}`)
    const json = await response.json();
    setStateFriendList(json.friendList)
    console.log(json.friendList)
    setFriendNum(json.friendNum);
  };

  const getMyInfo = async () => {
    let userInfo = await Session.sessionGet("sessionInfo");
    const sessionId = userInfo.uIntgId;
    const response = await fetch(`http://hduo88.com/mypage/selectUserInfo.do?uIntgId=${sessionId}`)
    const json = await response.json();
    if (json != '') {
      setUserInfo(json.user[0]);
    }
  };

  const editMyProfile = async () => {
    navigation.navigate('SetNickNameScreen');
  };

  const viewProfileModal = async (searchId) => {
    setModalVisible(true);
    let userInfo = await Session.sessionGet("sessionInfo");
    const response = await fetch(`http://hduo88.com/friend/findFriendList.do?myNick=${userInfo.uIntgId}&keyWord=${searchId}`)
    const json = await response.json();
    console.log(json)
    if (json != '') {
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
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(sessionInfo)
    }).then(response => response.json()
    ).then((result) => {
      navigation.navigate('TextChat', { chatRoomId: result.resultMap.chatRoomId });
    }).catch(error => {
      console.error(error);
    });
  };

  useEffect(() => {
    getFriendList();
    getMyInfo();
  }, [isFocused]);

  return (
    <MainFrame>
      <View style={glStyles.pdHrzn15}>
        <Text style={glStyles.pageTit}>친구</Text>
      </View>
      <TouchableOpacity style={[styles.profileView, glStyles.pdHrzn15]} onPress={editMyProfile}>
        <View style={styles.profileImgView}>
          {
            // selectedImage.uri !== '' ? (
            // <Image source={{ uri: selectedImage.uri }} style={styles.profileImg} resizeMode='contain' />
            // ) : (
            userInfo.profileImgUrl !== '' ? (
              <Image
                source={{ uri: `http://hduo88.com/tomcatImg/myPage/${userInfo.profileImgUrl}` }}
                style={styles.profileImg}
                resizeMode='contain'
              />
            ) : (
              <Image resizeMode='contain' style={styles.profileImg} source={require("./assets/images/emptyProfile.jpg")} />
            )
            // )
          }
        </View>
        <View style={styles.profileMesaageView}>
          <Text style={glStyles.titleText}>{userInfo.unickname}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.lineDesign} />
      <View>
        <View style={[glStyles.flexRowEnd, glStyles.pdHrzn20]}>
          <Text style={glStyles.basicText} >친구수: </Text>
          <Text style={glStyles.basicText} >{getFriendNum}</Text>
        </View>
        <View style={glStyles.basicList}>
          <ScrollView pagingEnabled={false}
            showsHorizontalScrollIndicator={false}>
            {getStateFriendList.length === 0 ? (
              <View>
                <ActivityIndicator color="black" size="large" />
              </View>
            ) : (
              getStateFriendList.map((info, index) =>
                <View key={index} style={glStyles.basicItem} data={info.fYouId} onStartShouldSetResponder={() => openChat(info)}>
                  <TouchableOpacity style={[glStyles.flexContainer, glStyles.flexRowStrtCntr]} onPress={viewProfileModal.bind(this, info.fYouId)}>
                    <View>
                      {
                        info.profileImgUrl !== null ? (
                          <ImageBackground
                            source={{ uri: `http://hduo88.com/tomcatImg/myPage/${info.profileImgUrl}` }}
                            style={glStyles.basicItemImg}
                            resizeMode="cover"
                            imageStyle={{ borderRadius: 17 }}
                          />
                        ) : (
                          <ImageBackground
                            source={require("./assets/images/emptyProfile.jpg")}
                            style={glStyles.basicItemImg}
                            resizeMode="cover"
                            imageStyle={{ borderRadius: 17 }}
                          />
                        )
                      }
                    </View>
                    <View style={glStyles.pdHrzn15}>
                      <Text style={glStyles.titleText}>{info.appNick}({info.glSummoner}소환사명)</Text>
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
        <View style={[glStyles.bgBlack, glStyles.flexContainer, glStyles.pdHrzn15]}>
          <View style={[glStyles.flexCenter, glStyles.pdVrtcl20]}>
            <Text style={glStyles.pageTit}>{getFriendInfo.uNickname}uNickname</Text>
          </View>
          <View style={[glStyles.mgbt20, glStyles.modalImgView]} >
            {
              getFriendInfo.profileImgUrl !== null ? (
                <Image
                  source={{ uri: `http://hduo88.com/tomcatImg/myPage/${getFriendInfo.profileImgUrl}` }}
                  style={glStyles.modalImg}
                  resizeMode='contain'
                />
              ) : (
                <Image resizeMode='contain' style={glStyles.modalImg}
                  source={require("./assets/images/emptyProfile.jpg")} />
              )
            }
          </View>
          <View style={glStyles.pdVrtcl15}>
            <View style={glStyles.titleBox}>
              <Text style={glStyles.titleText}> 소환사명 : </Text>
              <Text style={glStyles.basicText}> {getFriendInfo.glSummoner} 소환사명</Text>
            </View>
            <View style={glStyles.titleBox}>
              <Text style={glStyles.titleText}> 랭크 : </Text>
              <Text style={glStyles.basicText}> {getFriendInfo.glRank} 랭크</Text>
            </View>
            <View style={glStyles.titleBox}>
              <Text style={glStyles.titleText}> 주챔피언 : </Text>
              <Text style={glStyles.basicText}> {getFriendInfo.glChampion} 주챔피언</Text>
            </View>
          </View>
          {/* closeProfileModal 이벤트 작동 부탁 */}
          <View style={glStyles.btnBox}>
            <View style={[glStyles.mdBtn, glStyles.btnBlue]} onPress={closeProfileModal}>
              <Text style={glStyles.btnText}>닫기</Text>
            </View>
          </View>
        </View>
      </Modal>
    </MainFrame >
  );
}

const styles = StyleSheet.create({
  profileView: {
    width: "50%",
    height: "10%",
    marginTop: "5%",
    marginLeft: "5%",
    flexDirection: "row",
  },
  profileImgView: {
    width: "50%",
    height: "100%",
  },
  profileMesaageView: {
    width: "50%",
    height: "100%",
    flexDirection: "row",
  },
  profileImg: {
    width: "100%",
    height: "100%",
  },
  lineDesign: {
    height: 1,
    backgroundColor: colors.fontWh,
    marginBottom: "3%",
    marginTop: "3%",
    opacity: 0.3,
  },
});