import React, { Component, useState } from 'react';
import { View, Text, Button,StyleSheet,TextInput,Image,Modal,Pressable,Alert } from 'react-native';
import * as Session from './utils/session.js';
// import { RTCPeerConnection, RTCView } from 'react-native-webrtc';

export default function SettingScreen ({navigation}) {

  const [modalVisible, setModalVisible] = useState(false);
  let sessions = "";

  const optionSubmit = () => {
    navigation.navigate('MatchingHistoryScreen');
  };

  const goAccountScreen = () => {
    navigation.navigate('MatchingHistoryScreen');
  };

  const userLogout = () => {
    alert("구현!")
  };

  const userDelete = async() =>{
    sessions = await Session.sessionGet("sessionInfo");
    const sessionId = sessions.uIntgId;
    const response = await fetch (`http://3.37.211.126:8080/login/userDelete.do?myId=${sessionId}`).catch(error => {console.log(error)});
    navigation.navigate('Login');
  };

 
  
    return (
        <View style={styles.container}>
            <View style={styles.content}>
              <View style={styles.rowView} onStartShouldSetResponder={() =>userLogout()} >
                   <Image resizeMode='contain' style={styles.statusImg} 
                    source={require("./assets/images/bell.png")}/>     
                   <Text>로그아웃</Text>
              </View>
              <View style={styles.lineDesign} /> 
              <View style={styles.rowView} onStartShouldSetResponder={() =>setModalVisible(true)} >
                   <Image resizeMode='contain' style={styles.statusImg} 
                    source={require("./assets/images/bell.png")}/>     
                   <Text>아이디 삭제하기</Text>
              </View>
              <View style={styles.lineDesign} /> 
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
                    <View >                    
                        <View >
                          <View>
                            <Text>정말로 아이디를 삭제하시겠습니까?</Text>  
                          </View>
                          <View style={styles.deleteModal}>
                            <View style={styles.modalViewDetail}  onStartShouldSetResponder={() =>userDelete()}>
                              <Text >yes</Text>  
                            </View>
                            <View  style={styles.modalViewDetail} onStartShouldSetResponder={() =>setModalVisible(false)}>
                              <Text >no</Text>  
                            </View>
                          </View>
                      </View >   
                    </View>
                  </View>
                </View>
                </Modal>
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
  content:{
    marginTop:"10%",
  },
  rowView:{
    flexDirection:"row",
  },
  statusImg: {
    width:"10%",
    height:"100%",    
  },
  deleteModal: {
    flexDirection:"row",   
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
  modalViewDetail: {
    marginLeft:"5%",
    marginTop:"5%",
  },
});