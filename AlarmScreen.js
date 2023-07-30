import React, { Component, useState, useEffect } from 'react';
import { View, Text, Button,StyleSheet,TextInput,Image , Dimensions ,Modal,Pressable,Alert} from 'react-native';
import * as Session from './utils/session.js';
import {ScrollView} from 'react-native-gesture-handler';

const {height:SCREEN_HEIGHT} = Dimensions.get('window');

export default function AlarmScreen ({navigation}) {
  const [getAlramList, setAlramList] = useState([]);
  const [getSessionId, setSessionId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [getAlramTemplete, setAlramTemplete] = useState("");
  const [getSendId, setSendId] = useState("");
  const [getSendNickName, setSendNickName] = useState("");
  const [getCdDtlDesc, setCdDtlDesc] = useState("");
  const [getFriendCheck, setFriendCheck] = useState("");
  let param1 = "";
  let param2 = "";
  const serverGetFindMyAlramList = async() =>{
    const session = await Session.sessionGet("sessionInfo");
    const sessionId = session.uIntgId;
    const response = await fetch (`http://hduo88.com/alram/findMyAlramList.do?myId=${sessionId}`)
    const jsonAlramList = await response.json();
    console.log("alramList$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    console.log(jsonAlramList.findMyAlramList)
    setAlramList(jsonAlramList.findMyAlramList);
  };
  const alarmDelet = async(seq) =>{
    const alSeq = seq;
    const response = await fetch (`http://hduo88.com/alram/alramDelete.do?alSeq=${alSeq}`)
    const jsonAlramList = await response.json();
    serverGetFindMyAlramList();
  };

  const alarmDeletTrigger = (seq)=>{
    alarmDelet(seq);
  };

  const alramModalTrigger = (alSeq,cdDtlId,alSendId,cdDtlDesc,sendNickName,alReadYn)=>{
    
    if(cdDtlId == "10801"){
      setModalVisible(true);
      setSendId(alSendId);
      setSendNickName(sendNickName);
      setCdDtlDesc(cdDtlDesc);
      checkFriend(alSendId);
      if(alReadYn == "N"){
        updateReadYn(alSeq);
      }
    }else{
      if(alReadYn == "N"){
        updateReadYn(alSeq);
      }
    }

  }

  const addFriendAcceptTrigger = () =>{
    addFriendAccept();
    setModalVisible(false);
  };

  const checkFriend = async(alSendId) =>{
    const session = await Session.sessionGet("sessionInfo");
    const sessionId = session.uIntgId;
    const response = await fetch (`http://hduo88.com/friend/friendCheck.do?myId=${sessionId}&targetId=${alSendId}`)
    const friendState = await response.json();
    console.log(friendState.vo.fStateCd)
    setFriendCheck(friendState.vo.fStateCd);
  };

  const updateReadYn = async(seq) =>{
    const alSeq = seq;
    const response = await fetch (`http://hduo88.com/alram/alramRead.do?alSeq=${alSeq}`)
    serverGetFindMyAlramList();
  };

  const addFriendAccept = async() =>{
    const session = await Session.sessionGet("sessionInfo");
    const sessionId = session.uIntgId;
    const response = await fetch (`http://hduo88.com/friend/addFriendAccept.do?myId=${sessionId}&targetId=${getSendId}`)
    alert("sssss")
  };

  

  useEffect(() => {     
    serverGetFindMyAlramList();
  },[]);
    return (
        <View style={styles.container}>
          <View style={styles.containerPercent}>
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
                    <View >
                      {getFriendCheck === "10501"? (
                                                    <View >
                                                      <View>
                                                        <Text>{getSendNickName}님이 친구신청을 보내셨습니다</Text>  
                                                      </View>
                                                      
                                                    
                                                    </View >                                                 
                                                  ) : (
                                                    <View >
                                                    <View>
                                                      <Text>{getSendNickName}님이 친구신청을 보내셨습니다 수락하시겠습니까?</Text>  
                                                    </View>
                                                    <View  onStartShouldSetResponder={() =>addFriendAcceptTrigger()}>
                                                      <Text >yes</Text>  
                                                    </View>
                                                    
                                                  
                                                  </View >      
                                                        )
                        
                      }
                    </View>
                  </View>
                </View>
                </Modal>
            </View>
           <ScrollView        pagingEnabled
                              showsHorizontalScrollIndicator = {false}>
              {getAlramList.length === 0? (
                                            <View >
                                              <Text>알람이 없습니다.</Text>
                                            </View>
                              ) : (
                                    getAlramList.map( (info, index) =>    
                                                      <View key={index} style={styles.content}>
                                                        <View  style={styles.rowView}>
                                                          <View style={styles.alramViewLeft} >
                                                            <Image resizeMode='contain' style={styles.statusImg} 
                                                              source={require("./assets/images/bell.png")}/>
                                                          </View>
                                                          <View style={info.alReadYn =="Y" ? styles.alramViewCenter : styles.alramViewCenterN} onStartShouldSetResponder={() =>alramModalTrigger(info.alSeq,info.cdDtlId,info.alSendId,info.cdDtlDesc,info.sendNickName,info.alReadYn)}>
                                                            <Text >{index +1}.</Text>
                                                            <Text style={styles.alramMsg}>{info.sendNickName}{info.cdDtlDesc}</Text>
                                                          </View>
                                                          <View style={styles.alramViewRight}  onStartShouldSetResponder={() =>alarmDeletTrigger(info.alSeq)}>
                                                            <Image resizeMode='contain' style={styles.statusImg} 
                                                              source={require("./assets/images/delete.png")}/>
                                                          </View>                                      
                                                        </View>
                                                        <View style={styles.lineDesign} />
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
  lineDesign:{
    height: 1, 
    backgroundColor: "black", 
    marginBottom: "3%",
    marginTop: "3%",
    opacity:0.3,
  },
  container:{
    flex:1,
  },
  containerPercent:{
    height:"80%",
    width:"90%",
    marginTop:"10%",
    marginBottom:"10%",
    marginLeft:"5%",
    marginRight:"5%",
  },
  content:{
    flex:1,
    marginTop:"5%",
    height:"5%",
  },
  rowView:{
    flexDirection:"row",
    height:"100%"
  },
  statusImg: {
    width:"100%",
    height:"100%",    
  },
  alramMsg: {
    marginLeft:"3%",    
  },
  alramViewLeft: {
    height:"100%",
    width:"10%"    
  },
  alramViewCenter: {
    height:"100%",
    width:"80%",
    flexDirection:"row", 
    opacity:"0.3",   
  },
  alramViewCenterN: {
    height:"100%",
    width:"80%",
    flexDirection:"row", 
  },
  alramViewRight: {
    height:"100%",
    width:"10%",    
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
    top:-500,
    bottom:350,
    left:50,
    right:40,
  },
});