import React, { Component, useState, useEffect } from 'react';
import { View, Text, Button,StyleSheet,TextInput,Image , Dimensions } from 'react-native';
import * as Session from './utils/session.js';
import {ScrollView} from 'react-native-gesture-handler';

const {height:SCREEN_HEIGHT} = Dimensions.get('window');

export default function AlarmScreen ({navigation}) {
  const [getAlramList, setAlramList] = useState([]);
  const [getSessionId, setSessionId] = useState("");


  const serverGetFindMyAlramList = async() =>{
    const session = await Session.sessionGet("sessionInfo");
    const sessionId = session.uIntgId;
    const response = await fetch (`http://3.37.211.126:8080/alram/findMyAlramList.do?myId=${sessionId}`)
    const jsonAlramList = await response.json();
    setAlramList(jsonAlramList.findMyAlramList);
    console.log(jsonAlramList.findMyAlramList)
    
  };
  const alarmDelet = async(seq) =>{
    const alSeq = seq;
    const response = await fetch (`http://3.37.211.126:8080/alram/alramDelete.do?alSeq=${alSeq}`)
    const jsonAlramList = await response.json();
    serverGetFindMyAlramList();
  };

  const alarmDeletTrigger = (seq)=>{
    console.log(seq)
    alarmDelet(seq);
  };

  useEffect(() => {     
    serverGetFindMyAlramList();
  },[]);
    return (
        <View style={styles.container}>
          <View style={styles.containerPercent}>
           <ScrollView        pagingEnabled
                              showsHorizontalScrollIndicator = {false}>
              {getAlramList.length === 0? (
                                            <View >
                                            </View>
                              ) : (
                                    getAlramList.map( (info, index) =>    
                                                      <View key={index} style={styles.content}>
                                                        <View  style={styles.rowView}>
                                                          <View style={styles.alramViewLeft} >
                                                            <Image resizeMode='contain' style={styles.statusImg} 
                                                              source={require("./assets/images/bell.png")}/>
                                                          </View>
                                                          <View style={styles.alramViewCenter}>
                                                            <Text>{index +1}.</Text>
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
    height:SCREEN_HEIGHT,
  },
  content:{
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
  },
  alramViewRight: {
    height:"100%",
    width:"10%",    
  },
});