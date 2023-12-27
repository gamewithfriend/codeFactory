import React, { Component, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image, Dimensions, ActivityIndicator, Modal, Pressable, Alert } from 'react-native';
import GameMatchingScreen from './GameMatchingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import * as Session from './utils/session.js';
import { useIsFocused } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import *  as Device from 'expo-device';
import * as Network from 'expo-network';

//이소망 추가
import MainFrame from './MainFrame';
import { glStyles } from './globalStyles';
import colors from './assets/colors/colors';
import { FontAwesome5, Entypo, Ionicons } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();
const expoClientId = '1078327323794-hqr8b6qj7lkcdtkr9snucrb5aca6lkmq.apps.googleusercontent.com';
const iosClientId = '1078327323794-t3nm7kvjmvdg2gkac69ldninie81gkvr.apps.googleusercontent.com';
const androidClientId = '1078327323794-scnfkq9p0i8rfqtb5rpc08vu60101q6g.apps.googleusercontent.com';

const realUrl = "3.37.211.126";
const testUrl = "192.168.105.27";
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function MainScreen({ route,navigation }) {
  const isFocused = useIsFocused();
  const [id, setid] = useState("");
  const [passWord, setpassWord] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [getSessionId, setSessionId] = useState("");
  const [getLikeYn, setLikeYn] = useState("");
  const [getAlramRecentOneMsg, setAlramRecentOneMsg] = useState("");
  const [getAlramCount, setAlramCount] = useState(0);
  const [getOptionList, setOptionList] = useState([]);
  const [getUserLikeTop5List, setUserLikeTop5List] = useState([]);
  const [getSelectedOption, setSelectedOption] = useState([]);
  const [ok, setOptionName] = useState(1);
  const [getUserLike, setUserLike] = useState("");
  const onChangeid = (payload) => setid(payload);
  const onChangepassWord = (payload) => setpassWord(payload);

  let youserLikeCheck = "";
  let sessions = "";

  ////targetLike----좋아요 기능함수///////
  const targetLike = async (targetId) => {
    sessions = await Session.sessionGet("sessionInfo");
    const sessionIdForLike = sessions.uIntgId;
    const response = await fetch(`http://3.37.211.126:8080/main/likeTarget.do?myNick=${sessionIdForLike}&yourNick=${targetId}`).catch(error => { console.log(error) });
    serverGetFindMyAlramList();
  };

  ////serverGetOptionList----옵션리스트 서버에서 가져오기 함수///////
  const serverGetOptionList = async () => {
    let setOption = "";
    if(route.params == undefined){
      setOption = "109";
    }else{
      setOption = route.params.lolOption;  
    }
    const response = await fetch(`http://192.168.0.2:80/hexa/main/selectMatchingOptionList.do?option=${setOption}`)
    const jsonOptionList = await response.json();
    for (var i = 0; i < jsonOptionList.data.length; i++) {
      let tempUrl = `http://3.37.211.126:8080/tomcatImg/option/${jsonOptionList.data[i].url}`;
      jsonOptionList.data[i].url = tempUrl;
    }
    setOptionList(jsonOptionList.data);
  };

  ////serverGetUserLikeTop5List----좋아요 TOP5리스트 서버에서 가져오기 함수///////  
  const serverGetUserLikeTop5List = async () => {
    let reUserLikeTop5List = [];
    const response = await fetch(`http://3.37.211.126:8080/main/fameTop5.do`)
    const jsonUserList = await response.json();
    sessions = await Session.sessionGet("sessionInfo");
    const sessionId = sessions.uIntgId;
    for (let i = 0; i < jsonUserList.selectLikeTop5List.length; i++) {
      //////좋아요 확인////////
      let youId = jsonUserList.selectLikeTop5List[i].ylYouId;
      const response = await fetch(`http://3.37.211.126:8080/main/findTargetLike.do?myId=${sessionId}&targetId=${youId}`)
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
      const responseTwo = await fetch(`http://3.37.211.126:8080/friend/selectUserFriend.do?myId=${sessionId}&youId=${youId}`)
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
      jsonUserList.selectLikeTop5List[i].glMostUrl = `http://3.37.211.126:8080/tomcatImg/champ/${tempMostPickUrl}`
      if ((i + 1) % 2 == 0) {
        let tempBox = [];
        tempBox.push(jsonUserList.selectLikeTop5List[i]);
        tempBox.push(jsonUserList.selectLikeTop5List[i - 1]);
        reUserLikeTop5List.push(tempBox);
      }
    }
    setUserLikeTop5List(reUserLikeTop5List);

  };

  ////serverGetTargetUserLikeYn----로그인 유저 상대 유저 좋아요 상태값 서버에서 가져오기 함수/////// 
  const serverGetTargetUserLikeYn = async (youId, indexNumber) => {
    const response = await fetch(`http://3.37.211.126:8080/main/findTargetLike.do?myId=${getSessionId}&targetId=${youId}`)
    const jsonMsg = await MaterialCommunityIconsresponse.json();
    setLikeYn(jsonMsg.msg);
    youserLikeCheck = jsonMsg.msg;
    if (youserLikeCheck == "N") {
      getUserLikeTop5List[indexNumber].url = "heart-outline";
    } else {
      getUserLikeTop5List[indexNumber].url = "heart";
    }
    setUserLikeTop5List(getUserLikeTop5List)

  };

  ////serverGetTargetUserFriendState----로그인 유저 상대 유저 친구 상태값 서버에서 가져오기 함수/////// 
  const serverGetTargetUserFriendState = async (youId, indexNumber) => {
    const response = await fetch(`http://3.37.211.126:8080/friend/selectUserFriend.do?myId=${getSessionId}&youId=${youId}`)
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

  ////serverGetFindMyAlramList----로그인 유저 알람리스트 서버에서 가져오기 함수/////// 
  const serverGetFindMyAlramList = async () => {
    sessions = await Session.sessionGet("sessionInfo");
    const sessionId = sessions.uIntgId;
    const response = await fetch(`http://3.37.211.126:8080/alram/findMyAlramList.do?myId=${sessionId}`)
    const jsonAlramList = await response.json();
    let alramCount = 0;
    setAlramCount(alramCount);
  };

  ////optionChange----옵션 리스트 인덱스 함수/////// 
  const optionChange = (index) => {
    setOptionName(Math.floor(index / 100))
    let indexNumber = Math.floor(((Math.floor(index / 100)) + 1) / 4);
    setSelectedOption(getOptionList[indexNumber]);
  };

  ////friendChange----좋아요 TOP5 리스트 인덱스 함수/////// 
  const friendChange = (index) => {
    setOptionName(Math.floor(index / 100))
    let indexNumber = Math.floor(((Math.floor(index / 100)) + 1) / 4);
    let youId = getUserLikeTop5List[indexNumber].ylYouId;
    serverGetTargetUserLikeYn(youId, indexNumber);
    serverGetTargetUserFriendState(youId, indexNumber);
  };

  ////addFriendTrigger----친구신청 함수/////// 
  const addFriendTrigger = (targetId, friendState) => {
    if (friendState == "10502") {
      alert("현재 친구신청 메세지가 보내진상태입니다.")
    } else {
      addFriendDetail(targetId, friendState);
    }

  };
  const addFriendDetail = async (targetId, friendState) => {

    sessions = await Session.sessionGet("sessionInfo");
    const sessionIdForAdd = sessions.uIntgId;
    if (sessionIdForAdd == targetId) {
      alert("자신에게는 친구신청을 보낼수없습니다.")
      return;
    }
    const responseAddFriend = await fetch(`http://hduo88.com/friend/friendAdd.do?myNick=${sessionIdForAdd}&yourNick=${targetId}`);
    serverGetUserLikeTop5List();
  };

  ////targetLikeTrigger----좋아요 버튼 트리거 함수/////// 
  const targetLikeTrigger = (targetId) => {
    targetLike(targetId);
    serverGetUserLikeTop5List();
  };

  ////alramListTrigger---- 알람 리스트 함수/////// 
  const alramListTrigger = () => {
    navigation.navigate('AlarmScreenCopy', { navigation });
  };

  const goMatchingHistory = () => {
    navigation.navigate('MatchingHistoryScreenCopy', { navigation });
  };

  const optionSubmit = () => {
    if (getSelectedOption.length == 0) { // 옵션 선택 슬라이드를 움직이지 않았을 경우
      navigation.navigate('MainScreenCopy', {lolOption:"101"
                                                                                          },{ navigation });
    } else {
      navigation.navigate('MainScreenCopy', {lolOption:"101"
                                                                                          },{ navigation });
    }
  };

  let token;
  let userInfo = {};

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: expoClientId,
    iosClientId: iosClientId,
    androidClientId: androidClientId
  });

  // sessionGet 메서드의 비동기적 처리를해결하기 위한 조치
  const loginCheck = async () => {
    let session = await Session.sessionGet("sessionInfo");
    // await sessionClear();

    // 세션값이 확인이 되지 않으면 구글로그인 연동 -> 구글 로그인 안에서 session setting 컨트롤
    if (session == null || session == undefined || session == "") {
      try {
        promptAsync();
        if (response?.type === 'success') {
          token = response.authentication.accessToken;
          getUserInfo();
        }
      } catch (error) {
        console.error(error);
      }
    } else {    // 세션값 확인되면 로그인 정보 최신화 후 닉네임 체크 로직 
      checkLoginUserInfo(realUrl, session);
    }
  }

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      const user = await response.json();
      if (user != null && user != undefined && user.verified_email == true) {
        userInfo.uIntgId = user.id;
      }

      let ipAddress = await Network.getIpAddressAsync();
      let modelName = Device.modelName;

      userInfo.uLastLoginIp = ipAddress;
      userInfo.uLastTerminalKind = modelName;

      if (userInfo != null) {
        checkLoginUserInfo(realUrl, userInfo);
      }

    } catch (error) {
      console.log(error);
      Alert.alert("Error!");
    }
  };

  const checkLoginUserInfo = async (url, data) => {
    await fetch("http://" + url + ":8080/login/loginCheck.do", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data)
    }).then(response => response.json()
    ).then(async (result) => {
      // 최초로그인 및 로그인 확인이 끝났으면 session 값을 set 및 get 해준다
      if (result.sessionInfo.uIntgId != null && result.sessionInfo.uIntgId != undefined && result.sessionInfo.uIntgId != "") {
        let tmpSessionData = JSON.stringify(result.sessionInfo);

        await Session.sessionSave("sessionInfo", tmpSessionData);
        let session = await Session.sessionGet("sessionInfo");

        checkNickName(session);
      }
    }).catch(error => {
      console.error(error);
    });
  };

  // session 정보의 nickName 설정여부를 체크하고 화면을 리턴
  const checkNickName = (sessionInfo) => {
    // 닉네임 설정이 되어있으면 메인 화면으로 이동
    if (sessionInfo.uNickname != null) {
      // navigation.navigate('MainScreen');

      // 닉네임 설정이 되어 있지 않으면 닉네임 설정화면으로 이동
    } else {
      navigation.navigate('SetNickNameScreen');
    }
  };

  // ✅ 알림 전송
  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '알림 제목 테스트',
        body: '알림 내용 테스트',
      },
      trigger: null, // 즉시 보내려면 'trigger'에 'null'을 설정
    });
  };

  useEffect(() => {
    loginCheck();
    serverGetUserLikeTop5List();
    serverGetFindMyAlramList();
    serverGetOptionList();
    //sendNotification();
  }, [isFocused, response]);
  
  return (
    <MainFrame>
      <View style={styles.mainContainer} >
        <View style={styles.mainSatusView}>
          <View style={styles.mainSatusItemView} onStartShouldSetResponder={() => alramListTrigger()} >
            <FontAwesome5 name="bell" size={22} style={glStyles.cardIcon} />
            <Text style={styles.mainSatusCountFont}>{getAlramCount}</Text>
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <View style={glStyles.titleBoxIcon}>
            <Text style={glStyles.titleText}>게임모드 옵션 설정</Text>
            <View style={glStyles.justMarginLeft} onStartShouldSetResponder={() => goMatchingHistory()}>
              <Ionicons name="time-outline" size={22} style={glStyles.cardIcon} />
            </View>
          </View>
          <View style={glStyles.titleBoxIcon}>
          {getOptionList.length === 0 ? (
              <View >
              </View>
            ) : (
              getOptionList.map((info, index) =>
                <View key={index} style={glStyles.pdHrzn15}>
                  <Text style={glStyles.pageTit}>
                    {info.cdDtlName}
                  </Text>
                </View>
              )
            )
          }
          </View>
          <ScrollView style={glStyles.slideList}
            pagingEnabled
            horizontal
            onMomentumScrollEnd={(event) => { optionChange(event.nativeEvent.contentOffset.x) }}
            showsHorizontalScrollIndicator={false}>
            {getOptionList.length === 0 ? (
              <View >
              </View>
            ) : (
              getOptionList.map((info, index) =>
                <View key={index} style={glStyles.slideItems}>
                  <View style={glStyles.slideImgBox2}>
                    <View style={glStyles.cardItems}  >
                      <Image resizeMode='contain' style={glStyles.slideImg}
                        source={{
                          uri: `${info.url}`,
                        }}
                      />
                    </View>
                  </View>
                </View>
              )
            )
            }
          </ScrollView>
          <View>
            <Button color={colors.lightBlue} title='선택' onPress={optionSubmit} style={[glStyles.btnMd, glStyles.btnBlue]}>
            </Button>
          </View>
        </View>
      </View>
    </MainFrame >


  );


}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 15
  },
  mainSatusView: {
    width: "100%",
    height: "4%",
    flexDirection: "row",
    marginBottom: "4%",
    justifyContent: "flex-end",
  },
  mainSatusItemView: {
    width: "10%",
    height: "100%",
    flexDirection: "row",
  },
  mainSatusCountFont: {
    position: 'absolute',
    right: "30%",
    top: "-15%",
    color: "#FfBB05",

  },
  mainButtonView: {
    width: "40%",
    height: "20%",
  },
  mainCenterSelectView: {
    width: "100%",
    height: "80%",
  },
  testClick: {
    borderColor: "black",
    borderStyle: "solid",
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    marginTop: "10%"
  },
  mainCenter: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "40%",
  },
  mainBottom: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  clickButton: {
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderRadius: "40",
  },
  whiteTitle: {
    fontSize: 20,
    color: "white"
  },
  statusImg: {
    width: "100%",
    height: "100%",

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
  basicText: {
    color: colors.fontWh,
    marginBottom: '5%',
  },
  frendBox: {
    flexDirection: "row"
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
  centeredView: {
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
    position: 'absolute',
    top: -640,
    bottom: 540,
    left: 180,
    right: 0,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    position: "absolute",
    paddingTop: "2%",
  },

});

