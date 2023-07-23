import React, { Component, useState,useEffect } from 'react';
import { View, Text, Button,StyleSheet,TextInput,Image,Dimensions,ActivityIndicator,Modal,Pressable,Alert } from 'react-native';
import GameMatchingScreen from './GameMatchingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import * as Session from './utils/session.js';
import { useIsFocused } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import *  as Device from 'expo-device';
import * as Network from 'expo-network';


WebBrowser.maybeCompleteAuthSession();
const expoClientId = '1078327323794-hqr8b6qj7lkcdtkr9snucrb5aca6lkmq.apps.googleusercontent.com';
const iosClientId = '1078327323794-t3nm7kvjmvdg2gkac69ldninie81gkvr.apps.googleusercontent.com';
const androidClientId = '1078327323794-scnfkq9p0i8rfqtb5rpc08vu60101q6g.apps.googleusercontent.com';



const realUrl = "3.37.211.126";
const testUrl = "192.168.105.27";
const {width:SCREEN_WIDTH} = Dimensions.get('window');

export default function MainScreen ({navigation}) {
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
    const onChangeid = (payload)=>setid(payload);
    const onChangepassWord = (payload)=>setpassWord(payload);
    let reChampionList = [];
    let youserLikeCheck ="";
    let sessions = "";



    ////targetLike----좋아요 기능함수///////
    const targetLike = async(targetId) =>{
      targetLikeDetail(targetId);
      
    };

    const targetLikeDetail = async(targetId) =>{
      sessions = await Session.sessionGet("sessionInfo");
      const sessionId = sessions.uIntgId;
      const response = await fetch (`http://3.37.211.126:8080/main/likeTarget.do?myNick=${sessionId}&yourNick=${targetId}`).catch(error => {console.log(error)});
      serverGetUserLikeTop5List();
    };

    ////serverGetOptionList----옵션리스트 서버에서 가져오기 함수///////
    const serverGetOptionList = async() =>{
      const response = await fetch (`http://3.37.211.126:8080/main/selectMatchingOptionList.do`)
      const jsonOptionList = await response.json();
      for(var i=0; i<jsonOptionList.selectMatchingOptionList.length; i++){ 
        let tempUrl = `http://3.37.211.126:8080/tomcatImg/option/${jsonOptionList.selectMatchingOptionList[i].url}`;
        jsonOptionList.selectMatchingOptionList[i].url = tempUrl;
      }
      setOptionList(jsonOptionList.selectMatchingOptionList);
    };

    ////serverGetUserLikeTop5List----좋아요 TOP5리스트 서버에서 가져오기 함수///////  
    const serverGetUserLikeTop5List = async() =>{
      const response = await fetch (`http://3.37.211.126:8080/main/fameTop5.do`)
      const jsonUserList = await response.json();
      sessions = await Session.sessionGet("sessionInfo");
      const sessionId = sessions.uIntgId;
      for(let i=0; i<jsonUserList.selectLikeTop5List.length; i++){
        //////좋아요 확인////////
        let youId = jsonUserList.selectLikeTop5List[i].ylYouId;
        const response = await fetch (`http://3.37.211.126:8080/main/findTargetLike.do?myId=${sessionId}&targetId=${youId}`)
        const jsonMsg = await response.json();
        const youserLikeTemp = jsonMsg.msg;
        if(youserLikeTemp == "N"){
          jsonUserList.selectLikeTop5List[i].url =require('./assets/images/emptyHeart.png');
          jsonUserList.selectLikeTop5List[i].test = "N";
        }else{
          jsonUserList.selectLikeTop5List[i].url =require('./assets/images/fullHeart.png');
          jsonUserList.selectLikeTop5List[i].test = "Y";
        }
        //////친구 확인////////
        const responseTwo = await fetch (`http://3.37.211.126:8080/friend/selectUserFriend.do?myId=${sessionId}&youId=${youId}`)
        const jsonUserFriendState = await responseTwo.json();

        if(jsonUserFriendState.selectUserFriendState == null){
          jsonUserList.selectLikeTop5List[i].friendUrl =require('./assets/images/plus.png');
        }else{
          if(jsonUserFriendState.selectUserFriendState.fStateCd == "10501"){
            jsonUserList.selectLikeTop5List[i].friendUrl =require('./assets/images/minus.png');
          }else if(jsonUserFriendState.selectUserFriendState.fStateCd == "10502"){
            jsonUserList.selectLikeTop5List[i].friendUrl =require('./assets/images/send.png');
          }else{
            jsonUserList.selectLikeTop5List[i].friendUrl =require('./assets/images/plus.png');
          }
        }
        
      }
      setUserLikeTop5List(jsonUserList.selectLikeTop5List);
      
    };

    ////serverGetTargetUserLikeYn----로그인 유저 상대 유저 좋아요 상태값 서버에서 가져오기 함수/////// 
    const serverGetTargetUserLikeYn = async(youId,indexNumber) =>{
      sessions = await Session.sessionGet("sessionInfo");
      const sessionId = sessions.uIntgId;
      const response = await fetch (`http://3.37.211.126:8080/main/findTargetLike.do?myId=${sessionId}&targetId=${youId}`)
      const jsonMsg = await response.json();
      setLikeYn(jsonMsg.msg);
      youserLikeCheck = jsonMsg.msg;
      if(youserLikeCheck == "N"){
        getUserLikeTop5List[indexNumber].url =require('./assets/images/emptyHeart.png');
      }else{
        getUserLikeTop5List[indexNumber].url =require('./assets/images/fullHeart.png');
      }
      setUserLikeTop5List(getUserLikeTop5List) 

    };

    ////serverGetTargetUserFriendState----로그인 유저 상대 유저 친구 상태값 서버에서 가져오기 함수/////// 
    const serverGetTargetUserFriendState = async(youId,indexNumber) =>{
      sessions = await Session.sessionGet("sessionInfo");
      const sessionId = sessions.uIntgId;
      const response = await fetch (`http://3.37.211.126:8080/friend/selectUserFriend.do?myId=${sessionId}&youId=${youId}`)
      const jsonUserFriendState = await response.json();
      if(jsonUserFriendState.selectUserFriendState == null){
        getUserLikeTop5List[indexNumber].friendUrl =require('./assets/images/plus.png');
      }else{
        if(jsonUserFriendState.selectUserFriendState.fStateCd == "10501"){
          getUserLikeTop5List[indexNumber].friendUrl =require('./assets/images/minus.png');
        }else if(jsonUserFriendState.selectUserFriendState.fStateCd == "10502"){
          getUserLikeTop5List[indexNumber].friendUrl =require('./assets/images/send.png');
        }else{
          getUserLikeTop5List[indexNumber].friendUrl =require('./assets/images/plus.png');
        }
      }
      setUserLikeTop5List(getUserLikeTop5List)

    };

    ////serverGetFindMyAlramList----로그인 유저 알람리스트 서버에서 가져오기 함수/////// 
    const serverGetFindMyAlramList = async() =>{
      sessions= await Session.sessionGet("sessionInfo");
      const sessionId = sessions.uIntgId;
      const response = await fetch (`http://3.37.211.126:8080/alram/findMyAlramList.do?myId=${sessionId}`)
      const jsonAlramList = await response.json();
      let alramCount =0;
      let alramRecentOneMsg  ="";
      if(jsonAlramList.length > 0){
        alramRecentOneMsg = jsonAlramList.findMyAlramList[0].sendNickName + " "+ jsonAlramList.findMyAlramList[0].cdDtlDesc;
      }else{
        alramRecentOneMsg = "알람이 없습니다";
      }
      setAlramRecentOneMsg(alramRecentOneMsg);
      alramCount = jsonAlramList.findMyAlramListUnReadCount;
      setAlramCount(alramCount);
    };

    ////optionChange----옵션 리스트 인덱스 함수/////// 
    const optionChange = (index)=>{
      setOptionName(Math.floor(index/100))
      let indexNumber = Math.floor(((Math.floor(index/100))+1)/4);
      setSelectedOption(getOptionList[indexNumber]);
    };

    ////friendChange----좋아요 TOP5 리스트 인덱스 함수/////// 
    const friendChange = (index)=>{
      setOptionName(Math.floor(index/100))
      let indexNumber = Math.floor(((Math.floor(index/100))+1)/4);
      let youId =getUserLikeTop5List[indexNumber].ylYouId;
      serverGetTargetUserLikeYn(youId,indexNumber);
      serverGetTargetUserFriendState(youId,indexNumber); 
    };

    ////addFriendTrigger----친구신청 함수/////// 
    const addFriendTrigger = (targetId)=>{
      addFriendDetail(targetId);
    };

    const addFriendDetail = async(targetId) => {
      sessions=  await Session.sessionGet("sessionInfo");
      const sessionIdForAdd = sessions.uIntgId;
      const responseAddFriend = await  fetch (`http://3.37.211.126:8080/friend/friendAdd.do?myNick=${sessionIdForAdd}&yourNick=${targetId}`);
      serverGetUserLikeTop5List();
    };


    ////targetLikeTrigger----좋아요 버튼 트리거 함수/////// 
    const targetLikeTrigger = (targetId)=>{
        targetLike(targetId);
        serverGetUserLikeTop5List();
    };

    ////alramListTrigger---- 알람 리스트 함수/////// 
    const alramListTrigger = ()=>{
      navigation.navigate('AlarmScreen',{navigation});
      setModalVisible(false);
    };

    const testFuntcion = ()=>{
      console.log("ssssssssssssssssssssssssssssssssssssssssssssssssss")
    };

    const optionSubmit = () => {
      if(getSelectedOption.length ==0){
        navigation.navigate('OptionSelect',{gameType:getOptionList[0]
                                            ,gameTypePlus:""
                                            ,gameTypePlusIndex:0
                                            },{navigation});
      }else{
        navigation.navigate('OptionSelect',{gameType:getSelectedOption
                                            ,gameTypePlus:""
                                            ,gameTypePlusIndex:0
                                            },{navigation});
      }
      

    };

    const goMatchingHistory = () => {
        navigation.navigate('MatchingHistoryScreen',{navigation});
     
      

    };

    const checkRiotId = async() => {
      const responseAddFriend = fetch (`http://3.37.211.126:8080/friend/friendAdd.do?myNick=${sessionId}&yourNick=${targetId}`);
    };

    const checkFrend = async(targetId) => {
      sessions=  await Session.sessionGet("sessionInfo");
      const sessionIdForcheckFrend = sessions.uIntgId;
      const responseTwo = await fetch (`http://3.37.211.126:8080/friend/selectUserFriend.do?myId=${sessionIdForcheckFrend}&youId=${targetId}`)
      const jsonUserFriendState = await responseTwo.json();
    };

    let token;
    let userInfo = {};

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: expoClientId,
        iosClientId : iosClientId,
        androidClientId: androidClientId
    });

    // sessionGet 메서드의 비동기적 처리를해결하기 위한 조치
    const loginCheck = async () => {
      let session = await Session.sessionGet("sessionInfo");
      // await sessionClear();

      console.log(session);

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
      console.log(user);
      if (user != null && user != undefined && user.verified_email ==true) {
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
                                  method : "POST",
                                  headers : {
                                      'Content-Type': 'application/json; charset=utf-8',
                                  },
                                  body : JSON.stringify(data)
                                }).then(response => response.json()
                                 ).then(async (result) => {
                                      // 최초로그인 및 로그인 확인이 끝났으면 session 값을 set 및 get 해준다
                                      if (result.sessionInfo.uIntgId != null && result.sessionInfo.uIntgId != undefined && result.sessionInfo.uIntgId != "") {
                                          let tmpSessionData = JSON.stringify(result.sessionInfo);
  
                                          await Session.sessionSave("sessionInfo", tmpSessionData);
                                          let session = await Session.sessionGet("sessionInfo");

                                          checkNickName(session);
                                      }
                                 }).catch( error => {
                                      console.error(error);
                                 }) ;
  };

  // session 정보의 nickName 설정여부를 체크하고 화면을 리턴
  const checkNickName = (sessionInfo) => {
      // 닉네임 설정이 되어있으면 메인 화면으로 이동
      console.log("sesisonInfo : ",sessionInfo);
      if (sessionInfo.uNickname != null) {
          console.log("There's is NickName!!");
          // navigation.navigate('MainScreen');
      
      // 닉네임 설정이 되어 있지 않으면 닉네임 설정화면으로 이동
      } else {    
          console.log("There's no NickName!!");
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
    },[isFocused, response]);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.mainSatusView}>
              <View style={styles.mainSatusItemViewLeft} onStartShouldSetResponder={() =>goMatchingHistory()} >                
                <Image resizeMode='contain' style={styles.statusImg} 
                source={require("./assets/images/goHistory.png")}/>     
              </View>
              <View style={styles.mainSatusItemView} onStartShouldSetResponder={() =>setModalVisible(true)} >                
                <Image resizeMode='contain' style={styles.statusImg} 
                source={require("./assets/images/bell.png")}/>
                <Text style={styles.mainSatusCountFont}>{getAlramCount}</Text>      
              </View>
              <View style={styles.mainSatusItemView}>
                <Image resizeMode='contain' style={styles.statusImg} 
                source={require("./assets/images/chat.png")}/>     
              </View>     
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
                  <View onStartShouldSetResponder={() =>alramListTrigger()}>
                  {getAlramRecentOneMsg === ""? (
                                                        <Text style={styles.modalText}>알람이 없습니다.</Text>
                                                      ) : (
                                                          <Text style={styles.modalText}>{getAlramRecentOneMsg}</Text>
                                                      )}
                  </View>
                </View>
              </View>
              </Modal>
            </View>
            <View style={styles.mainCenter}>
              <View style={styles.mainCenterSelectView}>
                <ScrollView pagingEnabled 
                                  horizontal
                                  onMomentumScrollEnd={(event) => {optionChange(event.nativeEvent.contentOffset.x)}}
                                  showsHorizontalScrollIndicator = {false}>
                          {getOptionList.length === 0? (
                              <View >
                              </View>
                              ) : (
                                getOptionList.map( (info, index) =>    
                                  <View key={index} style={styles.contentBottom}>
                                      <View>
                                        <Text style={styles.itemBoxTitle} >{info.cdDtlName}</Text>
                                      </View>
                                      <View style={styles.itemBox}>
                                              <Image resizeMode='contain' style={styles.frendAdd} 
                                              source={{
                                                uri: `${info.url}`,
                                              }}
                                              />
                                      </View>  
                                  </View>
                              )
                              )
                          }         
                </ScrollView>
              </View> 
              <View style={styles.mainButtonView}>
                <Button color={"black"} title='선택하기' onPress={optionSubmit}  style={styles.clickButton}>
                </Button> 
              </View>    
            </View>
            <View style={styles.mainBottom}>
              <ScrollView pagingEnabled 
                                horizontal
                                onMomentumScrollEnd={(event) => {friendChange(event.nativeEvent.contentOffset.x)}}
                                showsHorizontalScrollIndicator = {false}>
                        {getUserLikeTop5List.length === 0? (
                            <View >
                            </View>
                            ) : (
                            getUserLikeTop5List.map( (info, index) =>    
                                <View key={index} style={styles.contentBottom}>
                                    <Text style={styles.itemBoxTitle} >추천 매너 유저 TOP{index+1}</Text>
                                    <View style={styles.itemBox}>
                                        <View style={styles.userHeader}>
                                          <View >
                                            <Text >닉네임: {info.uNickname}</Text>
                                          </View>
                                          <View style={styles.userItemView} onStartShouldSetResponder={() =>addFriendTrigger(info.ylYouId)}>
                                            <Image resizeMode='contain' style={styles.frendAdd} 
                                            source={info.friendUrl}/>      
                                          </View>
                                          <View style={styles.userItemView}>
                                            <Image resizeMode='contain' style={styles.frendAdd} 
                                            source={require('./assets/images/chat.png')}/>
                                          </View>
                                          <View style={styles.userItemView} onStartShouldSetResponder={() =>targetLikeTrigger(info.ylYouId)}>
                                            <Image resizeMode='contain' style={styles.frendAdd} 
                                            source={info.url}/>                                          
                                          </View>
                                        </View>
                                        <Text style={styles.itemBoxTitle} >좋아요 수 :{info.cnt}</Text>
                                        <Text style={styles.itemBoxTitle} >랭크 :{info.glRank}</Text>
                                        <Text style={styles.itemBoxTitle} >포지션 :{info.glPosition}</Text>
                                        <Text style={styles.itemBoxTitle} >자주쓰는 챔피언 :{info.glChampion}</Text>
                                        <Text style={styles.itemBoxTitle} >자주하는 시간 :{info.glTime}</Text>
                                    </View>  
                                </View>
                            )
                            )
                        }         
              </ScrollView>
            </View>             
        </View>
        
      
      
    );
  

}

const styles = StyleSheet.create({
    input: {
        backgroundColor:"white",
        paddingVertical:15,
        paddingHorizontal:20,
        borderRadius:30,
        marginTop:20,
        fontSize:15
    },
    mainSatusView: {
      width:"100%",
      height:"4%",
      flexDirection:"row",
      marginTop:"15%",
      justifyContent:"flex-end",
    },
    mainSatusItemView: {
      width:"10%",
      height:"100%",
      marginRight:"3%",
      flexDirection:"row",
    },
    mainSatusItemViewLeft: {
      width:"10%",
      height:"100%",
      marginRight:"63%",
      flexDirection:"row",

    },
    mainSatusCountFont: {
      position:'absolute',
      right:"10%",
      top:"-20%",
      // right:"40%",
      // top:"20%",
      color:"red",

    },
    mainButtonView: {
      width:"40%",
      height:"20%",
    },
    mainCenterSelectView: {
      width:"100%",
      height:"80%",
    },
    testClick: {
        borderColor:"black",
        borderStyle:"solid",
        flex:1,
    },
    mainContainer: {
        flex:1,
    },
    mainCenter: {
        alignItems:"center",
        justifyContent:"center",
        width:"100%",
        height:"40%",
    },
    mainBottom: {
        alignItems:"center",
        justifyContent:"center",
        width:"100%",
    },
    clickButton:{
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"black",
        borderRadius:"40",
    },
    whiteTitle:{
        fontSize:20,
        color:"white"
    },
    statusImg: {
        width:"100%",
        height:"100%",
        
    },
    contentBottom:{
        width:SCREEN_WIDTH,
        alignItems:"center",
        justifyContent:"center",
    },
    itemBox:{
        width:"70%",
        height:"70%",
        alignItems:"center",
    },
    itemBoxTitle:{
      marginBottom : '5%',
    },
    frendBox:{
      flexDirection:"row"
    },
    frendAdd:{
      width:'100%',
      height:"100%",
      opacity:1,
    },
    userHeader:{
      flexDirection:"row",
      height:"10%",
    },
    userItemView:{
      height:"70%",
      width:"10%",
      marginLeft:"3%",
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
      textAlign:'center',
      position:"absolute",
      paddingTop:"2%",
    },

  });

