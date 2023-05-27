import React, { Component, useState,useEffect } from 'react';
import { View, Text, Button,StyleSheet,TextInput,Image,Dimensions,ActivityIndicator } from 'react-native';
import GameMatchingScreen from './GameMatchingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';

const {width:SCREEN_WIDTH} = Dimensions.get('window');

export default function MainScreen ({navigation}) {
    
    const [id, setid] = useState("");
    const [passWord, setpassWord] = useState("");
    const [getUserLikeTop5List, setUserLikeTop5List] = useState([]);
    const [ok, setOptionName] = useState(1);
    const onChangeid = (payload)=>setid(payload);
    const onChangepassWord = (payload)=>setpassWord(payload);
     let reChampionList = [];
    const sendApi = ()=>{
        alert(id);
        alert(passWord);
        navigation.navigate("DETAIL");
    };
    const serverGetUserLikeTop5List = async(keyWord) =>{
      const response = await fetch (`http://3.37.211.126:8080/main/fameTop5.do`)
      const jsonUserList = await response.json();
      console.log(jsonUserList.selectLikeTop5List)
      setUserLikeTop5List(jsonUserList.selectLikeTop5List);
    };
    sessionSave = async ()=>{
        let myNick= 'TEST15';
        await AsyncStorage.setItem(
            'myNick',
            myNick,
          );
    };
    const optionChange = (index)=>{
      setOptionName(Math.floor(index/100))     
    };
    useEffect(() => {
        sessionSave();
        serverGetUserLikeTop5List();
      },[]);
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
                                <View   key={index} style={styles.contentBottom}>
                                    <Text style={styles.itemBoxTitle} >추천 매너 유저 TOP{index+1}</Text>
                                    <View style={styles.itemBox}>
                                        <Text style={styles.itemBoxTitle} >닉네임: {info.unickname}</Text>
                                        <Text style={styles.itemBoxTitle} >좋아요 수 :{info.ulike}</Text>
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

  });

