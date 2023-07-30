import React, { Component, useState ,useEffect} from 'react';
import { View, Text, Button,StyleSheet,TextInput,Dimensions,ActivityIndicator,Image } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import * as Session from './utils/session.js';
const {width:SCREEN_WIDTH} = Dimensions.get('window');



export default function GameMatchingScreen ({route,navigation}) {
    const [userInfos, setUserInfo] = useState([]);
    const [changeOptionValueTwo, optionValueTwo] = useState([]);
    let sessions = "";
    let resultUser = [];
    const addFriend = (userNick)=>{
      let yourNick = userNick;
      sessions= Session.sessionGet("sessionInfo");
      let myNick =sessions.uIntgId;
      const responseAddFriend = fetch (`http://hduo88.com/friend/friendAdd.do?myNick=${myNick}&yourNick=${yourNick}`);
    };
    const getUserData = async() =>{
        sessions= await Session.sessionGet("sessionInfo");       
        let myId =sessions.uIntgId;      
        console.log("GameMatchingScreenTest@@@@@@@@@@@@@@@@@@@@@@@@@@2")
        console.log(route.params)
        
        await fetch (`http://hduo88.com/gameMatching/selectGameMatchingUserTop3.do?myId=${myId}`,{
          method : 'POST',//형식
          body : JSON.stringify(route.params), //자바스크립트 객체 -> JSON객체
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authentication: 'mysecreat' 
          },
        }).then((response) => response.json())
        .then((result) => {
            console.log(result.userInfo)
            resultUser = result.userInfo;
            setUserInfo(resultUser);
        });
       
    };
    
    useEffect(() => {
        getUserData();
    },[]);
    return (
        <View style={styles.container} >
            <View style={styles.topContainer}>
                <View style={styles.titleBorder}>
                    <Text style={styles.TopwhiteTitle}>선택한 조건</Text>
                </View>
                <View style={styles.optionBar}>
                    <Text style={styles.optionStyle}>조건1</Text>
                    <Text style={styles.optionStyle}>조건2</Text>
                </View>
                <View style={styles.optionBar}>
                    
                </View>
            </View>
            <View style={styles.bottomContainer}>
                    <View style={styles.titleBorder}> 
                        <Text style={styles.whiteTitle}>매칭된 유저</Text>
                    </View>
                    <ScrollView pagingEnabled 
                                horizontal 
                                showsHorizontalScrollIndicator = {false}
                                contentContainerStyle={styles.contentBorder}>
                    {userInfos.length === 0? (
                        <View style={styles.day}>
                            <ActivityIndicator color="black" size="large"/>
                        </View>
                        ) : (
                            userInfos.map((id, index) =>  
                        <View key={index} style={styles.contentBottom}>
                            <View style={styles.itemBox}>
                                <View onStartShouldSetResponder={() =>addFriend(id.glNick)} style={styles.frendBox}>
                                  <Text style={styles.frendName}>
                                     닉네임:{id.appNick}
                                  </Text>
                                  <Image resizeMode='contain' style={styles.frendAdd} source={require('./assets/images/plus.jpg')}/>
                                </View>
                                <Text style={styles.matchingUserInfo}>
                                 소환사명: {id.glSummoner} 
                                </Text>
                                <Text style={styles.matchingUserInfo}>
                                  {id.glRank}
                                </Text>
                                <Text style={styles.matchingUserInfo}>
                                    {id.glTime}
                                </Text>
                                <Text style={styles.matchingUserInfo}>
                                    {id.glChampion}
                                </Text>
                                <Text style={styles.matchingUserInfo}>
                                    {id.glPosition}
                                </Text>
                                <Text style={styles.matchingUserInfo}>
                                  매칭점수:  {id.matchingScore} 점 
                                </Text>
                            </View>  
                        </View>
                        )
                    )}
                    </ScrollView>                  
            </View>
              
        </View>
        
      
      
    );
  

}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:"white",
    },
    topContainer:{       
        flex:5,
        alignItems:"center",
        borderColor:"black",
        borderStyle:"solid",
    },
    optionBar:{
        width:"100%",
        height:"45%",
        borderColor:"red",
        borderStyle:"solid",
    },
    optionStyle:{
        marginLeft:10,
        marginTop:30,
        fontSize:20,
    },
    bottomContainer:{
        flex:8,
        alignItems:"center",
    },
    contentContainer:{
      flex:1,
      borderColor: "black",  
    },
    titleBorder:{
        width: "100%",
        alignItems:"center",
        height:"10%",
    },
    contentBorder:{        
        height:"100%"
    },
    contentBottom:{
        width:SCREEN_WIDTH,
        alignItems:"center",
        justifyContent:"center",
    },
    itemBox:{
        width:"50%",
        height:"90%",
        alignItems:"center",
        borderRadius:30,
    },
    whiteTitle:{
        fontSize:20,
        color:"black"
    },
    TopwhiteTitle:{
        fontSize:20,
        color:"black",
        marginTop:15,
    },
    matchingUserInfo:{
        color:"black",
        marginTop:'10%',
    },
    frendAdd:{
      width:'10%',
      height:"60%",
      opacity:1
    },
    frendBox:{
      flexDirection:"row"
    },
    frendName:{
      color:"black",
    },
  });