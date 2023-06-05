import React, { Component, useState,useEffect } from 'react';
import { View, Text, Button,StyleSheet,TextInput,Image,Dimensions,ActivityIndicator,Modal,Pressable,Alert } from 'react-native';
import GameMatchingScreen from './GameMatchingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';

const {width:SCREEN_WIDTH} = Dimensions.get('window');

export default function MainScreen ({navigation}) {
    
    const [id, setid] = useState("");
    const [passWord, setpassWord] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [getSessionId, setSessionId] = useState("");
    const [getLikeYn, setLikeYn] = useState("");
    const [getAlramRecentOneMsg, setAlramRecentOneMsg] = useState("");
    const [getAlramCount, setAlramCount] = useState(0);
    const [getUserLikeTop5List, setUserLikeTop5List] = useState([]);
    const [ok, setOptionName] = useState(1);
    const [getUserLike, setUserLike] = useState("");
    const onChangeid = (payload)=>setid(payload);
    const onChangepassWord = (payload)=>setpassWord(payload);
     let reChampionList = [];
     let youserLikeCheck ="";
    sessionSave = async ()=>{
        console.log("sessionSaving")
        let myNick= 'TEST15';
        await AsyncStorage.setItem(
            'myNick',
            myNick,
        );
        setSessionId(myNick);
    };
    const targetLike = async(targetId) =>{
      const response = await fetch (`http://3.37.211.126:8080/main/likeTarget.do?myNick=${getSessionId}&yourNick=${targetId}`).catch(error => {console.log(error)});
      serverGetUserLikeTop5List();
      serverGetFindMyAlramList();
    };
    const serverGetUserLikeTop5List = async() =>{
      const response = await fetch (`http://3.37.211.126:8080/main/fameTop5.do`)
      const jsonUserList = await response.json();
      const sessionId = await AsyncStorage.getItem('myNick');
      for(let i=0; i<jsonUserList.selectLikeTop5List.length; i++){
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
      }
      setUserLikeTop5List(jsonUserList.selectLikeTop5List);
      console.log(jsonUserList.selectLikeTop5List)
    };
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
    const serverGetFindMyAlramList = async() =>{
      const sessionId = await AsyncStorage.getItem('myNick');
      const response = await fetch (`http://3.37.211.126:8080/alram/findMyAlramList.do?myId=${sessionId}`)
      const jsonAlramList = await response.json();
      console.log(jsonAlramList.findMyAlramList)
      console.log(jsonAlramList.findMyAlramList.length)
      let alramCount =jsonAlramList.findMyAlramList.length;
      console.log(jsonAlramList.findMyAlramList[0].alSendId)
      console.log(jsonAlramList.findMyAlramList[0].cdDtlDesc)
      let alramRecentOneMsg = jsonAlramList.findMyAlramList[0].alSendId + " "+ jsonAlramList.findMyAlramList[0].cdDtlDesc;
      setAlramRecentOneMsg(alramRecentOneMsg);
      setAlramCount(alramCount);
      
    };
    const optionChange = (index)=>{
      setOptionName(Math.floor(index/100))
      let indexNumber = Math.floor(((Math.floor(index/100))+1)/4);
      let youId =getUserLikeTop5List[indexNumber].ylYouId;
      serverGetTargetUserLikeYn(youId,indexNumber); 
    };
    const addFriendTrigger = (targetId)=>{
      const responseAddFriend = fetch (`http://3.37.211.126:8080/friend/friendAdd.do?myNick=${getSessionId}&yourNick=${targetId}`);
      console.log(responseAddFriend)
    };
    const targetLikeTrigger = (targetId)=>{
      targetLike(targetId);   
    };
    useEffect(() => {
        sessionSave();
        serverGetUserLikeTop5List();
        serverGetFindMyAlramList();
      },[]);
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
                    <Text style={styles.modalText}>{getAlramRecentOneMsg}</Text>
                  </View>
                </View>
              </View>
              </Modal>
            </View>
            <View style={styles.mainCenter}>
              <View style={styles.mainButtonView}>
                <Button color={"black"} title='매칭' onPress={()=> navigation.navigate('OptionSelect')}   style={styles.clickButton}>
                </Button> 
              </View>   
            </View>
            <View style={styles.mainBottom}>
              <ScrollView pagingEnabled 
                                horizontal
                                onMomentumScrollEnd={(event) => {optionChange(event.nativeEvent.contentOffset.x)}}
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
                                            source={require('./assets/images/addFriend.png')}/>
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
      height:"100%",
      marginTop:"20%",
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

