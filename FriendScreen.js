import React, { Component, useEffect, useState } from 'react';
import { View, Text, Button,StyleSheet,TextInput,Dimensions,ActivityIndicator,Image } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
const {width:SCREEN_WIDTH} = Dimensions.get('window');

export default function FriendScreen ({navigation}) {
    const [getMyNick, setMyNick] = useState("");
    const [getStateFriendList, setStateFriendList] = useState([]);
    const getFriendList = async() =>{
      let myNick ="TEST15";
      setMyNick(myNick);
      const response = await fetch (`http://3.37.211.126:8080/friend/findFriendList.do?myNick=${myNick}`)
      const json = await response.json();
      console.log(json.friendList)
      setStateFriendList(json.friendList)
    };
    useEffect(() => {
      getFriendList();
    },[]);
    return (
        <View >
            <View >
                   <Text style={styles.titleFont}>친구</Text>
            </View>   
            <View style={styles.profileView}>
              <View style={styles.profileImgView}>
                <Image resizeMode='contain' style={styles.profileImg} 
                source={require("./assets/images/emptyProfile.jpg")}/>                
              </View>
              <View tyle={styles.profileMesaageView}>
                <Text style={styles.statusMessageFont}>{getMyNick}</Text>       
                <Text style={styles.statusMessageFont}>블라블라블라블라</Text>
              </View>
            </View>
            <View style={styles.lineDesign} />
            <View style={styles.friendView}>
              <View style={styles.friendCountView}>
                <View  >
                  <Text style={styles.statusMessageFont} >친구수:</Text>
                </View>
                <View  >
                  <Text style={styles.statusMessageFont} >100</Text>
                </View>   
              </View>
              <View style={styles.friendListView}>
                <ScrollView pagingEnabled ={false}  
                            showsHorizontalScrollIndicator = {false}>
                 {getStateFriendList.length === 0? (
                            <View >
                                <ActivityIndicator color="black" size="large"/>
                            </View>
                            ) : (
                            getStateFriendList.map( (info, index) =>    
                              <View key={index} style={styles.centerBottomContainer}>               
                                <View style={styles.itemBox}>
                                  <View style={styles.itemBoxPhoto}>
                                    <Image resizeMode='contain' style={styles.profileImg}
                                    source={require("./assets/images/emptyProfile.jpg")}/>         
                                  </View>
                                  <View style={styles.itemBoxMessage}>
                                    <View style={styles.itemBoxMessageName}>
                                      <Text>{info.fYouId}</Text>
                                    </View>
                                    <View style={styles.itemBoxMessageStatus}>
                                      <Text>블라블라블라블라블라</Text>
                                    </View>
                                  </View>
                                </View> 
                              </View> 
                            )
                            )
                }                  
                </ScrollView>
              </View>  
            </View>   
        </View>
        
      
      
    );
  

}

const styles = StyleSheet.create({
      titleFont: {
        fontSize:30,
        marginTop:"10%",
        marginLeft:"5%",
      },
      statusMessageFont: {
        fontSize:18,
        marginLeft:"10%",
      },
      profileView: {
        width:"100%",
        height:"12%",
        marginTop:"5%",
        marginLeft:"5%",
        flexDirection:"row",
      },
      profileImgView: {
        width:"20%",
        height:"100%",
      },
      profileMesaageView: {
        width:"75%",
        height:"100%",
        flexDirection:"row",
      },
      profileImg: {
        width:"100%",
        height:"100%",
      },
      profileOtherImg: {
        width:"100%",
        height:"100%",
      },
      lineDesign:{
        height: 1, 
        backgroundColor: "black", 
        marginBottom: "3%",
        marginTop: "3%",
        opacity:0.3,
      },
      friendView: {
        width:"90%",
        height:"70%",
        marginTop:"5%",
        marginLeft:"5%",
      },
      friendCountView: {
        width:"100%",
        height:"5%",
        flexDirection:"row",
      },
      friendListView: {
        width:"100%",
        height:"85%",
        marginTop:"3%",
      },
      centerBottomContainer:{       
        flex:5,
        width:"100%",
      },
      itemBox:{
        width:"100%",
        height:"90%",
        marginTop: "10%",
        flexDirection:"row"
      },
      itemBoxPhoto:{
        width:"20%",
        height:"100%",
      },
      itemBoxMessage:{
        width:"75%",
        height:"100%",
        marginLeft:"5%",
        flexDirection:"row"
      },
      itemBoxMessageName:{
        width:"20%",
        height:"100%",
        marginTop:"10%",
      },
      itemBoxMessageStatus:{
        width:"80%",
        height:"100%",
        marginLeft:"5%",
        marginTop:"10%",
      },
});