import React, { Component, useState ,useEffect} from 'react';
import { ScrollView, View, Text, Button,StyleSheet,TextInput,Dimensions,ActivityIndicator } from 'react-native';
import axios from "axios";
const {width:SCREEN_WIDTH} = Dimensions.get('window');

export default function GameMatchingScreen ({route,navigation}) {
    
    const [userInfos, setUserInfo] = useState([]);
    const [changeOptionValueTwo, optionValueTwo] = useState([]);
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
        const response = await fetch (`http://3.37.211.126:8080/common/test.do?id=aabc&pw=bbccc%27).then(response`);
        const json = await response.json();       
        console.log(json.userInfo)
        setUserInfo(json.userInfo)
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
                                    {id.id}
                                </Text>
                                <Text style={styles.matchingUserInfo}>
                                    {id.name}
                                </Text>
                                <Text style={styles.matchingUserInfo}>
                                    {id.pw}
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
        flex:3,
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
        height:"80%",
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