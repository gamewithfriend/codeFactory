import React, { Component, useState } from 'react';
import { View, Text, Button,StyleSheet,TextInput,Image } from 'react-native';
import GameMatchingScreen from './GameMatchingScreen';
export default function MainScreen ({navigation}) {
    
    const [id, setid] = useState("");
    const [passWord, setpassWord] = useState("");
    const onChangeid = (payload)=>setid(payload);
    const onChangepassWord = (payload)=>setpassWord(payload);
    const sendApi = ()=>{
        alert(id);
        alert(passWord);
        navigation.navigate("DETAIL");
    };
    return (
        <View style={styles.mainContainer}>
            <View style={styles.mainSatusView}>
              <View style={styles.mainSatusItemView}>
                <Image resizeMode='contain' style={styles.statusImg} 
                source={require("./assets/images/bell.png")}/>     
              </View>
              <View style={styles.mainSatusItemView}>
                <Image resizeMode='contain' style={styles.statusImg} 
                source={require("./assets/images/chat.png")}/>     
              </View>     
            </View>
            <View style={styles.testClickCenter}>
                
            </View>
            <View style={styles.testClickCenter}>
              <Button color={"black"} title='매칭' onPress={()=> navigation.navigate('OptionSelect')}   style={styles.clickButton}>
                    
              </Button>
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
    },
    testClick: {
        borderColor:"black",
        borderStyle:"solid",
        flex:1,
    },
    mainContainer: {
        flex:1,
    },
    testClickCenter: {
        borderColor:"black",
        borderStyle:"solid",
        flex:1,
        alignItems:"center",
        justifyContent:"center",
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

  });

