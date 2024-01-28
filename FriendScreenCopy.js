import React, { Component, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Dimensions, ActivityIndicator, ImageBackground, Image, TouchableOpacity, Modal } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Session from './utils/session.js';
import { useIsFocused } from '@react-navigation/native';
import Fetcher from './utils/Fetcher';

//이소망 추가
import MainFrame from './MainFrame';
import { glStyles } from './globalStyles';
import colors from './assets/colors/colors';
import { FontAwesome5, Entypo, Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function FriendScreen({ navigation }) {
  let getMyNick;
  let sessions;

  // 채팅 대화 상대를 담기위한 변수 선언
  let receivers = [];

  const [getFriendNum, setFriendNum] = useState(1);
  const [getStateFriendList, setStateFriendList] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [getFriendInfo, setFriendInfo] = useState([]);
  // 좋아요 상위5명 조회
  const [getUserLikeTop5List, setUserLikeTop5List] = useState([]);

  const getFriendList = async () => {
    let userInfo = await Session.sessionGet("sessionInfo");
    setUserInfo(userInfo);
    getMyNick = userInfo.uIntgId;

    const response = await fetch(`https://hduo88.com/friend/findFriendList.do?myNick=${getMyNick}`)
    // const response = await fetch (`http://192.168.0.187:8080/friend/findFriendList.do?myNick=${getMyNick}`)
    const json = await response.json();
    
    setStateFriendList(json.friendList)
    setFriendNum(json.friendNum);
  };

  const getMyInfo = async () => {
    let userInfo = await Session.sessionGet("sessionInfo");
    const sessionId = userInfo.uIntgId;
    
    const response = await fetch(`https://hduo88.com/mypage/selectUserInfo.do?uIntgId=${sessionId}`)
    const json = await response.json();

    if (json.data != '') {
      setUserInfo(json.data);
    }
  };

  const editMyProfile = async () => {
    navigation.navigate('SetNickNameScreenCopy');
  };

  const viewProfileModal = async (searchId) => {
    setModalVisible(true);
    let userInfo = await Session.sessionGet("sessionInfo");
    // 서버통신
    const fetcher = new Fetcher("https://hduo88.com/friend/findFriendList.do", "get", JSON.stringify({"myNick" : userInfo.uIntgId, "keyWord" : searchId}));
    // const fetcher = new Fetcher("http://192.168.219.195:8080/friend/findFriendList.do", "get", JSON.stringify({"myNick" : userInfo.uIntgId, "keyWord" : searchId}));
    const response = await fetcher.jsonFetch();
    
    if (response.friendList[0] != '') {
      setFriendInfo(response.friendList[0]);
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

    await fetch("https://hduo88.com/chat/openChatRoom.do", {
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

  ////targetLike----좋아요 기능함수///////
  const targetLike = async (targetId) => {
    sessions = await Session.sessionGet("sessionInfo");
    const sessionIdForLike = sessions.uIntgId;
    const response = await fetch(`https://hduo88.com/main/likeTarget.do?myNick=${sessionIdForLike}&yourNick=${targetId}`).catch(error => { console.log(error) });
  };

  ////serverGetOptionList----옵션리스트 서버에서 가져오기 함수///////
  const serverGetOptionList = async () => {
    const response = await fetch(`https://hduo88.com/main/selectMatchingOptionList.do`)
    const jsonOptionList = await response.json();
    for (var i = 0; i < jsonOptionList.selectMatchingOptionList.length; i++) {
      let tempUrl = `https://hduo88.com/tomcatImg/option/${jsonOptionList.selectMatchingOptionList[i].url}`;
      jsonOptionList.selectMatchingOptionList[i].url = tempUrl;
    }
    setOptionList(jsonOptionList.selectMatchingOptionList);
  };

  ////serverGetUserLikeTop5List----좋아요 TOP5리스트 서버에서 가져오기 함수///////  
  const serverGetUserLikeTop5List = async () => {
    let reUserLikeTop5List = [];
    const response = await fetch(`https://hduo88.com/main/fameTop5.do`)
    const jsonUserList = await response.json();
    sessions = await Session.sessionGet("sessionInfo");
    const sessionId = sessions.uIntgId;

    for (let i = 0; i < jsonUserList.selectLikeTop5List.length; i++) {
      //////좋아요 확인////////
      let youId = jsonUserList.selectLikeTop5List[i].ylYouId;
      const response = await fetch(`https://hduo88.com/main/findTargetLike.do?myId=${sessionId}&targetId=${youId}`)
      const jsonMsg = await response.json();
      const youserLikeTemp = jsonMsg.msg;
      if (youserLikeTemp == "N") {
        jsonUserList.selectLikeTop5List[i].url = "heart-outline";
        jsonUserList.selectLikeTop5List[i].test = "N";
      } else {
        jsonUserList.selectLikeTop5List[i].url = "heart";
        jsonUserList.selectLikeTop5List[i].test = "Y";
      }
      //////친구 확인////////
      const responseTwo = await fetch(`https://hduo88.com/friend/selectUserFriend.do?myId=${sessionId}&youId=${youId}`)
      const jsonUserFriendState = await responseTwo.json();

      if (jsonUserFriendState.selectUserFriendState == null) {
        jsonUserList.selectLikeTop5List[i].friendUrl = "add";
        jsonUserList.selectLikeTop5List[i].friendState = "";
      } else {
        if (jsonUserFriendState.selectUserFriendState.fStateCd == "10501") {
          jsonUserList.selectLikeTop5List[i].friendUrl = "remove-outline";
          jsonUserList.selectLikeTop5List[i].friendState = "10501";
        } else if (jsonUserFriendState.selectUserFriendState.fStateCd == "10502") {
          jsonUserList.selectLikeTop5List[i].friendUrl = "rocket-outline";
          jsonUserList.selectLikeTop5List[i].friendState = "10502";
        } else {
          jsonUserList.selectLikeTop5List[i].friendUrl = "add";
          jsonUserList.selectLikeTop5List[i].friendState = "";
        }
      }
      //모스트 1 캐릭터 배경화면
      let tempMostPickUrl = jsonUserList.selectLikeTop5List[i].glMostUrl;
      jsonUserList.selectLikeTop5List[i].glMostUrl = `https://hduo88.com/tomcatImg/champ/${tempMostPickUrl}`
      let tempBox = [];
      tempBox.push(jsonUserList.selectLikeTop5List[i]);
      tempBox.push(jsonUserList.selectLikeTop5List[i - 1]);
      reUserLikeTop5List.push(tempBox);
      
    }
    setUserLikeTop5List(reUserLikeTop5List);

  };

  ////serverGetTargetUserLikeYn----로그인 유저 상대 유저 좋아요 상태값 서버에서 가져오기 함수/////// 
  const serverGetTargetUserLikeYn = async (youId, indexNumber) => {
    const response = await fetch(`https://hduo88.com/main/findTargetLike.do?myId=${getSessionId}&targetId=${youId}`)
    const jsonMsg = await MaterialCommunityIconsresponse.json();
    setLikeYn(jsonMsg.msg);
    youserLikeCheck = jsonMsg.msg;
    if (youserLikeCheck == "N") {
      getUserLikeTop5List[indexNumber].url = "heart-outline";
    } else {
      getUserLikeTop5List[indexNumber].url = "heart";
    }
    setUserLikeTop5List(getUserLikeTop5List);

  };

  ////serverGetTargetUserFriendState----로그인 유저 상대 유저 친구 상태값 서버에서 가져오기 함수/////// 
  const serverGetTargetUserFriendState = async (youId, indexNumber) => {
    const response = await fetch(`https://hduo88.com/friend/selectUserFriend.do?myId=${getSessionId}&youId=${youId}`)
    const jsonUserFriendState = await response.json();
    if (jsonUserFriendState.selectUserFriendState == null) {
      getUserLikeTop5List[indexNumber].friendUrl = "add";
    } else {
      if (jsonUserFriendState.selectUserFriendState.fStateCd == "10501") {
        getUserLikeTop5List[indexNumber].friendUrl = "add";
      } else if (jsonUserFriendState.selectUserFriendState.fStateCd == "10502") {
        getUserLikeTop5List[indexNumber].friendUrl = "add";
      } else {
        getUserLikeTop5List[indexNumber].friendUrl = "add";
      }
    }
    setUserLikeTop5List(getUserLikeTop5List)

  };
  ////friendChange----좋아요 TOP5 리스트 인덱스 함수/////// 
  const friendChange = (index)=>{
    // setOptionName(Math.floor(index/100))
    let indexNumber = Math.floor(((Math.floor(index/100))+1)/4);
    let youId =getUserLikeTop5List[indexNumber].ylYouId;
    serverGetTargetUserLikeYn(youId,indexNumber);
    serverGetTargetUserFriendState(youId,indexNumber); 
  };

  ////addFriendTrigger----친구신청 함수/////// 
  const addFriendTrigger = (targetId,friendState)=>{
    if(friendState == "10502"){
      alert("현재 친구신청 메세지가 보내진상태입니다.")
    }else{
      addFriendDetail(targetId,friendState);
    }
    
  };

  const addFriendDetail = async(targetId,friendState) => {
    sessions=  await Session.sessionGet("sessionInfo");
    // const sessionIdForAdd = sessions.uIntgId;
    // const responseAddFriend = await  fetch (`http://hduo88.com/friend/friendAdd.do?myNick=${sessionIdForAdd}&yourNick=${targetId}`);
    serverGetUserLikeTop5List();
  };

  ////targetLikeTrigger----좋아요 버튼 트리거 함수/////// 
  const targetLikeTrigger = (targetId)=>{
      targetLike(targetId);
      serverGetUserLikeTop5List();
  };

  useEffect(() => {
    serverGetUserLikeTop5List();
    getFriendList();
    getMyInfo();
  }, [isFocused]);

  return (
    <MainFrame>
      <ScrollView
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}>
        <View style={[glStyles.pdHrzn15]}>
          <Text style={glStyles.pageTit}>친구</Text>
        </View>
        <TouchableOpacity style={[styles.profileView]} onPress={editMyProfile}>
          <View >
            {
              userInfo.profileImgUrl !== null ? (
                <Image
                  source={{ uri: `https://hduo88.com/tomcatImg/myPage/${userInfo.profileImgUrl}` }}
                  style={glStyles.basicItemImg}
                  resizeMode='contain'
                />
              ) : (
                <Image resizeMode='contain' style={glStyles.basicItemImg} source={require("./assets/images/emptyProfile.jpg")} />
              )
            }
          </View>
          <View style={[glStyles.pdHrzn15, glStyles.pdVrtcl15]}>
            <Text style={[glStyles.titleTextBg]}>{userInfo.uNickname}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.lineDesign} />
        <View style={[glStyles.flexRowEnd, glStyles.pdHrzn20]}>
          <Text style={glStyles.basicText} >친구수: </Text>
          <Text style={glStyles.basicText} >{getFriendNum}</Text>
        </View>
        {/* 친구 목록 시작 */}
        <View style={[glStyles.basicList,glStyles.friendList,{paddingTop:0}]}>
          <ScrollView 
            pagingEnabled={false}
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
                            source={{ uri: `https://hduo88.com/tomcatImg/myPage/${info.profileImgUrl}` }}
                            style={glStyles.basicItemImgSm2}
                            resizeMode="cover"
                            imageStyle={{ borderRadius: 52 }}
                          />
                        ) : (
                          <ImageBackground
                            source={require("./assets/images/emptyProfile.jpg")}
                            style={glStyles.basicItemImgSm2}
                            resizeMode="cover"
                            imageStyle={{ borderRadius: 52 }}
                          />
                        )
                      }
                    </View>
                    <View style={glStyles.pdHrzn15}>
                      <Text style={glStyles.basicText}>{info.appNick}({info.glSummoner})</Text>
                    </View>
                  </TouchableOpacity>
                </View>

              )
            )
            }
          </ScrollView>
        </View>
        {/* 좋아요 Top5 시작 */}
        <View style={glStyles.flexContainer}>
          <View style={glStyles.titleBox}>
            <Text style={glStyles.titleText}>친구 추천</Text>
          </View>
          <ScrollView style={glStyles.cardList}
            pagingEnabled
            horizontal
            // onMomentumScrollEnd={(event) => { friendChange(event.nativeEvent.contentOffset.x) }}
            showsHorizontalScrollIndicator={false}>
            <View style={glStyles.flexRowEven}>
              {getUserLikeTop5List.length === 0 ? (
                <View >
                </View>
              ) : (

                getUserLikeTop5List.map((info, index) =>
                  <View key={index}>
                    <View style={glStyles.cardItems}>
                      <Image resizeMode='cover' style={glStyles.slideImg2}
                        source={{
                          uri: `${info[0].glMostUrl}`,
                        }}
                      />
                      <Text style={[glStyles.cardLabel, glStyles.basicText]} >TOP{index + 1}</Text>
                      <View style={glStyles.cardInfo}>
                        <Text style={glStyles.basicTextSm} >닉네임 :{info[0].uNickname}</Text>
                        <Text style={glStyles.basicTextSm} >랭크   :{info[0].glRank}</Text>
                        <Text style={glStyles.basicTextSm} >포지션 :{info[0].glPosition}</Text>
                        <Text style={glStyles.basicTextSm} >챔피언 :{info[0].glChampion}</Text>
                        <Text style={glStyles.basicTextSm} >시간대 :{info[0].glTime}</Text>
                        <View style={glStyles.btnBox3}>
                          <View onStartShouldSetResponder={() => addFriendTrigger(info[0].ylYouId, info[0].friendState)}>
                            <Ionicons name={info[0].friendUrl} size={15} style={glStyles.cardIcon} />
                          </View>
                          <View>
                            <Ionicons name="chatbubble-sharp" size={15} style={glStyles.cardIcon} />
                          </View>
                          <View onStartShouldSetResponder={() => targetLikeTrigger(info[0].ylYouId)}>
                            <Ionicons name={info[0].url} size={15} style={glStyles.cardIcon} />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )
              )
              }
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      {/* 개인정보 수정 모달 시작 */}
      <Modal visible={modalVisible} animationType="slide" onRequestClose={closeProfileModal}>
        <View style={[glStyles.bgDarkGray, glStyles.flexContainer, glStyles.pdHrzn15]}>
          <View style={[glStyles.flexCenter, glStyles.pdVrtcl20]}>
            <Text style={glStyles.pageTit}>{getFriendInfo.appNick}</Text>
          </View>
          <View style={[glStyles.mgbt20, glStyles.modalImgView]} >
            {
              getFriendInfo.profileImgUrl !== null ? (
                <Image
                  source={{ uri: `https://hduo88.com/tomcatImg/myPage/${getFriendInfo.profileImgUrl}` }}
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
              <Text style={glStyles.titleText}> 소환사명 : {getFriendInfo.glSummoner}</Text>
            </View>
            <View style={glStyles.titleBox}>
              <Text style={glStyles.titleText}> 랭크 : {getFriendInfo.glRank}</Text>
            </View>
            <View style={glStyles.titleBox}>
              <Text style={glStyles.titleText}> 주챔피언 : {getFriendInfo.glChampion}</Text>
            </View>
          </View>
          <View style={glStyles.btnBox}>
            <View style={[glStyles.btnSm, glStyles.btnBlue]} onStartShouldSetResponder={() => closeProfileModal()}>
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
    width: "100%",
    height: "10%",
    marginTop: "3%",
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
  contentBottom: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  itemBox: {
    width: "70%",
    height: "70%",
    alignItems: "center",
  },
  itemBoxTitle:{
    marginBottom : '5%',
    textAlign: 'center',
  },
  frendAdd: {
    width: 20,
    height: 20,
    opacity: 1,
  },
  userHeader: {
    flexDirection: "row",
    height: "10%",
  },
  userItemView: {
    height: "70%",
    width: "10%",
    marginLeft: "3%",
  },
  mainBottom: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});