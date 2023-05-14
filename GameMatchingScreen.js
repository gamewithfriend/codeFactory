import React, { Component, useState ,useEffect} from 'react';
import { View, Text, Button,StyleSheet,TextInput,Dimensions,ActivityIndicator } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
const {width:SCREEN_WIDTH} = Dimensions.get('window');



export default function GameMatchingScreen ({route,navigation}) {
    const [userInfos, setUserInfo] = useState([]);
    const [changeOptionValueTwo, optionValueTwo] = useState([]);
    let resultUser = [];
    const getUserData = async() =>{
        console.log(route.params)
        tempOptionValueBox = route.params.optionValueBox;
        for(let i =0; i<route.params.optionValueBox.length; i++ ){
          if(route.params.optionValueBox[i].optionName == route.params.optionFour ){
            tempOptionValueBox.splice(i, 1);
          }
        }
        optionValueTwo(tempOptionValueBox);
        console.log(5-tempOptionValueBox.length)
        await fetch (`http://3.37.211.126:8080/gameMatching/selectGameMatchingUserTop3.do`,{
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
                                <Text style={styles.matchingUserInfo}>
                                    {id.glSummoner}
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
        backgroundColor:"black",
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
        color:"white",
        margin:"10%"
    },
  });