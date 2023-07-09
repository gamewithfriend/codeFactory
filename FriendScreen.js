import React, { Component, useEffect, useState } from 'react';
import { View, Text, Button,StyleSheet,TextInput,Dimensions,ActivityIndicator,Image, TouchableOpacity } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import * as Session from './utils/session.js';
import axios from 'axios';


const {width:SCREEN_WIDTH} = Dimensions.get('window');

export default function FriendScreen ({navigation}) {
    const [getMyNick, setMyNick] = useState("");
    const [getFriendNum, setFriendNum] = useState(1);
    const [getStateFriendList, setStateFriendList] = useState([]);
    const [selectedImage, setSelectedImage] = useState({
        uri: '',
        name : ''
    });
    const [userInfo, setUserInfo] = useState([]);

    const getFriendList = async() =>{
      let userInfo= await Session.sessionGet("sessionInfo");
      const sessionId = userInfo.uIntgId;
      setUserInfo(userInfo)
      setMyNick(sessionId);
      // const response = await fetch (`http://192.168.0.187:8080/friend/findFriendList.do?myNick=${getMyNick}`)
      const response = await fetch (`http://3.37.211.126:8080/friend/findFriendList.do?myNick=${getMyNick}`)
      const json = await response.json();
      // console.log(json.friendList)
      // console.log(json.friendNum)
      setStateFriendList(json.friendList)
      setFriendNum(json.friendNum)
    };

    const openImagePickerAsync = async () => {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('카메라 롤에 접근 권한이 필요합니다.');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync();
      console.log(pickerResult);
      if (!pickerResult.cancelled) {
        setSelectedImage((prevState) => {
          return {...prevState, name : pickerResult.name, uri : pickerResult.uri }
        });
      }
    };
    
    const uploadImageAsync = async () => {
      const apiUrl = 'http://192.168.0.187:8080/mypage/changeMyImage.do';
      const formData = new FormData();
      
      formData.append('image', {
        uri: selectedImage.uri,
        name: 'temp',
        type: 'image/*'
      });
      formData.append('data', new Blob([getMyNick]), 'test' );

      console.log(selectedImage);
      console.log(getMyNick);
      
      const response = await fetch (apiUrl, {
        method : "POST",
        body : formData,
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      const json = await response.json();
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
                <TouchableOpacity onPress={openImagePickerAsync}>
                    {selectedImage.uri ? (
                      <><Image source={{ uri: selectedImage.uri }} style={styles.profileImg} resizeMode='contain' onPress={openImagePickerAsync} /><Button title="이미지 업로드" onPress={uploadImageAsync}></Button></>
                    ) : ( 
                      <Image resizeMode='contain' style={styles.profileImg} source={require("./assets/images/emptyProfile.jpg")}/>                
                    )}
                </TouchableOpacity>
              </View>
              <View style={styles.profileMesaageView}>
                <Text style={styles.statusMessageFont}>{userInfo.uNickname}</Text>       
                <Text style={styles.statusMessageFont}>테스트</Text>
              </View>
            </View>
            <View style={styles.lineDesign} />
            <View style={styles.friendView}>
              <View style={styles.friendCountView}>
                <View  >
                  <Text style={styles.statusMessageFont} >친구수:</Text>
                </View>
                <View  >
                  <Text style={styles.statusMessageFont} >{getFriendNum}</Text>
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