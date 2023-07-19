import React, { Component, useState } from 'react';
import { View, Text, Button,StyleSheet,TextInput,Image } from 'react-native';
// import { RTCPeerConnection, RTCView } from 'react-native-webrtc';

export default function SettingScreen ({navigation}) {
  const optionSubmit = () => {
    navigation.navigate('MatchingHistoryScreen');
  };

  const goAccountScreen = () => {
    navigation.navigate('AccountScreen');
  };
  
    return (
        <View style={styles.container}>
            <View style={styles.content}>
              <View style={styles.rowView} onPress={optionSubmit}>
                   <Image resizeMode='contain' style={styles.statusImg} 
                    source={require("./assets/images/bell.png")}/>     
                   <Text>Setting</Text>
                   {/* <Button color={"black"} style={styles.choiceButton} onPress={optionSubmit} title='선택하기'></Button> */}
              </View>
              <View style={styles.lineDesign} />
              <View style={styles.rowView} onStartShouldSetResponder={() =>goAccountScreen()} >
                   <Image resizeMode='contain' style={styles.statusImg} 
                    source={require("./assets/images/bell.png")}/>     
                   <Text>account</Text>
              </View>
              <View style={styles.lineDesign} /> 
              <View style={styles.rowView}>
                   <Image resizeMode='contain' style={styles.statusImg} 
                    source={require("./assets/images/bell.png")}/>     
                   <Text>Setting</Text>
              </View>
              <View style={styles.lineDesign} /> 
              <View style={styles.rowView}>
                   <Image resizeMode='contain' style={styles.statusImg} 
                    source={require("./assets/images/bell.png")}/>     
                   <Text>Setting</Text>
              </View>
              <View style={styles.lineDesign} /> 
              <View style={styles.rowView}>
                   <Image resizeMode='contain' style={styles.statusImg} 
                    source={require("./assets/images/bell.png")}/>     
                   <Text>Setting</Text>
              </View>
              <View style={styles.lineDesign} />   
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
});