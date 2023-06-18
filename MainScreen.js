import React, { Component, useState,useEffect } from 'react';
import { View, Text, Button,StyleSheet,TextInput,Image,Dimensions,ActivityIndicator,Modal,Pressable,Alert } from 'react-native';
import GameMatchingScreen from './GameMatchingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import * as Session from './utils/session.js';
import { useIsFocused } from '@react-navigation/native';


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

    sessionSave = async ()=>{
        let sessions = await Session.sessionGet("sessionInfo");
        console.log("sessionSaving")
        let myId= sessions.uIntgId;
        //let myId= "TEST15";         
        setSessionId(myId);
    };

    ////targetLike----좋아요 기능함수///////
    const targetLike = async(targetId) =>{
      const response = await fetch (`http://3.37.211.126:8080/main/likeTarget.do?myNick=${getSessionId}&yourNick=${targetId}`).catch(error => {console.log(error)});
      serverGetUserLikeTop5List();
      serverGetFindMyAlramList();
    };

    ////serverGetOptionList----옵션리스트 서버에서 가져오기 함수///////
    const serverGetOptionList = async() =>{
      const response = await fetch (`http://3.37.211.126:8080/main/selectMatchingOptionList.do`)
      const jsonOptionList = await response.json();
      console.log(jsonOptionList)
      console.log(jsonOptionList.selectMatchingOptionList)
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
      const sessionId =getSessionId;
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
      const response = await fetch (`http://3.37.211.126:8080/main/findTargetLike.do?myId=${getSessionId}&targetId=${youId}`)
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
      const response = await fetch (`http://3.37.211.126:8080/friend/selectUserFriend.do?myId=${getSessionId}&youId=${youId}`)
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
      const sessionId = getSessionId;
      const response = await fetch (`http://3.37.211.126:8080/alram/findMyAlramList.do?myId=${sessionId}`)
      const jsonAlramList = await response.json();
      let alramCount =jsonAlramList.findMyAlramList.length;
      let alramRecentOneMsg = jsonAlramList.findMyAlramList[0].sendNickName + " "+ jsonAlramList.findMyAlramList[0].cdDtlDesc;
      setAlramRecentOneMsg(alramRecentOneMsg);
      setAlramCount(alramCount);
    };

    ////optionChange----옵션 리스트 인덱스 함수/////// 
    const optionChange = (index)=>{
      setOptionName(Math.floor(index/100))
      let indexNumber = Math.floor(((Math.floor(index/100))+1)/4);
      setSelectedOption(getOptionList[indexNumber]);
      console.log(getOptionList[indexNumber])   
      console.log(getOptionList[indexNumber].cdDtlId)
      console.log(getOptionList[indexNumber].cdDtlName)
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
      const responseAddFriend = fetch (`http://3.37.211.126:8080/friend/friendAdd.do?myNick=${getSessionId}&yourNick=${targetId}`);
    };

    ////targetLikeTrigger----좋아요 버튼 트리거 함수/////// 
    const targetLikeTrigger = (targetId)=>{
      targetLike(targetId);   
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

    useEffect(() => {
        sessionSave();
        serverGetUserLikeTop5List();
        serverGetFindMyAlramList();
        serverGetOptionList();
      },[isFocused]);
    return (
        <View style={styles.mainContainer}>
            <View style={styles.mainSatusView}>
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
                  <View>
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
                                      <Text style={styles.itemBoxTitle} >{info.cdDtlName}</Text>
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

