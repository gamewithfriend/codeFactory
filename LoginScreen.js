import React, { Component, useState, useEffect } from 'react';
import { View, Text, Button,StyleSheet,TextInput, Alert,TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import *  as Device from 'expo-device';
import * as Network from 'expo-network';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();
const expoClientId = '1078327323794-hqr8b6qj7lkcdtkr9snucrb5aca6lkmq.apps.googleusercontent.com';
const iosClientId = '1078327323794-t3nm7kvjmvdg2gkac69ldninie81gkvr.apps.googleusercontent.com';
const androidClientId = '1078327323794-scnfkq9p0i8rfqtb5rpc08vu60101q6g.apps.googleusercontent.com';

export default function MainScreen ({navigation}) {
    let token;
    let userInfo = {};
    let session = "";

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: expoClientId,
        iosClientId : iosClientId,
        androidClientId: androidClientId
    });
    
    useEffect(() => {
        loginCheck();
    }, []);

    // sessionGet 메서드의 비동기적 처리를해결하기 위한 조치
    const loginCheck = async () => {
        await sessionGet("userInfo");
        // await sessionClear();
        // session = "";
        console.log(session)
        console.log(session == "");
        // 세션값이 확인이 되지 않으면 구글로그인 연동 -> 구글 로그인 안에서 session setting 컨트롤
        if (session == null || session == undefined || session == "") {
            try {
                promptAsync();

                if (response?.type === 'success') { 
                    token = response.authentication.accessToken;
                    getUserInfo();
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
    
    const getUserInfo = async () => {
    try {
        const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
            headers: { Authorization: `Bearer ${token}` }
        }
        );
        const user = await response.json();
        
        if (user != null && user != undefined && user.verified_email ==true) {
            userInfo.uIntgId = user.id;
            userInfo.uName = user.name;
        }
        
        let ipAddress = await Network.getIpAddressAsync();
        let modelName = Device.modelName;
        
        userInfo.uLastLoginIp = ipAddress;
        userInfo.uLastTerminalKind = modelName;

        if (userInfo != null) {
            await fetch("http://3.37.211.126:8080/login/loginCheck.do", {
                                    method : "POST",
                                    headers : {
                                        'Content-Type': 'application/json; charset=utf-8',
                                    },
                                    body : JSON.stringify(userInfo)
                                  }).then(response => response.json()
                                   ).then(async (result) => {
                                        // 최초로그인 및 로그인 확인이 끝났으면 session 값을 set 및 get 해준다
                                        console.log("성공여부 chec1");
                                        let tmpSessionData = JSON.stringify(result.userInfo);
                                        await sessionSave(tmpSessionData);
                                        await sessionGet("userInfo");
                                        console.log("여기까지 성공적으로 도달");
                                   }).catch( error => {
                                        console.error(error);
                                   }) ;
        }

    } catch (error) {
        console.log(error);
        Alert.alert("Error!");
    }
    };
    // session 정보를 확인하는 로직
    const sessionGet = async (key) => {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value !== null) {
            session = value;
          } else {
            session = "";
          }
        } catch (error) {
            Alert.alert(error);
        }
    };
    // session 정보를 set하는 로직
    const sessionSave = async (tmpSessionData)=>{
        await AsyncStorage.setItem(
            'userInfo',
            tmpSessionData,
        );
    };
    // 테스트를 위한 임시
    const sessionClear = async () => {
        await AsyncStorage.clear();
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} disabled={!request} title="Google Login" onPress={() => {promptAsync();}}>
                <Text style={styles.buttonText}>Google 로그인</Text>
            </TouchableOpacity>
            <Text style={styles.text}>GameWithFriend 어플리케이션은 Google 로그인만을 지원합니다.</Text>
        </View>
    );
  

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#3498db',
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    text : {
        fontSize : 12,
        marginTop: 20
    }
  });