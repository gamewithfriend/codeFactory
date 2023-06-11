import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Alert,TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import *  as Device from 'expo-device';
import * as Network from 'expo-network';
import * as Session from './utils/session.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();
const expoClientId = '1078327323794-hqr8b6qj7lkcdtkr9snucrb5aca6lkmq.apps.googleusercontent.com';
const iosClientId = '1078327323794-t3nm7kvjmvdg2gkac69ldninie81gkvr.apps.googleusercontent.com';
const androidClientId = '1078327323794-scnfkq9p0i8rfqtb5rpc08vu60101q6g.apps.googleusercontent.com';

const realUrl = "3.37.211.126";
const testUrl = "192.168.105.27";

export default function LoginScreen ({navigation}) {
    let token;
    let userInfo = {};

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: expoClientId,
        iosClientId : iosClientId,
        androidClientId: androidClientId
    });
    
    useEffect(() => {
        loginCheck();
    }, [response]);

    // sessionGet 메서드의 비동기적 처리를해결하기 위한 조치
    const loginCheck = async () => {
        let session = await Session.sessionGet("sessionInfo");
        // await sessionClear();

        console.log(session);

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
        } else {    // 세션값 확인되면 로그인 정보 최신화 후 닉네임 체크 로직 
            checkLoginUserInfo(realUrl, session);
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
        console.log(user);
        if (user != null && user != undefined && user.verified_email ==true) {
            userInfo.uIntgId = user.id;
        }
        
        let ipAddress = await Network.getIpAddressAsync();
        let modelName = Device.modelName;
        
        userInfo.uLastLoginIp = ipAddress;
        userInfo.uLastTerminalKind = modelName;
        
        if (userInfo != null) {
            checkLoginUserInfo(realUrl, userInfo);
        }

    } catch (error) {
        console.log(error);
        Alert.alert("Error!");
    }
    };
    
    const checkLoginUserInfo = async (url, data) => {
        await fetch("http://" + url + ":8080/login/loginCheck.do", {
                                    method : "POST",
                                    headers : {
                                        'Content-Type': 'application/json; charset=utf-8',
                                    },
                                    body : JSON.stringify(data)
                                  }).then(response => response.json()
                                   ).then(async (result) => {
                                        // 최초로그인 및 로그인 확인이 끝났으면 session 값을 set 및 get 해준다
                                        if (result.sessionInfo.uIntgId != null && result.sessionInfo.uIntgId != undefined && result.sessionInfo.uIntgId != "") {
                                            let tmpSessionData = JSON.stringify(result.sessionInfo);
    
                                            await Session.sessionSave("sessionInfo", tmpSessionData);
                                            let session = await Session.sessionGet("sessionInfo");

                                            checkNickName(session);
                                        }
                                   }).catch( error => {
                                        console.error(error);
                                   }) ;
    };

    // session 정보의 nickName 설정여부를 체크하고 화면을 리턴
    const checkNickName = (sessionInfo) => {
        // 닉네임 설정이 되어있으면 메인 화면으로 이동
        console.log("sesisonInfo : ",sessionInfo);
        if (sessionInfo.uNickname != null) {
            console.log("There's is NickName!!");
            navigation.navigate('MainScreen');
        
        // 닉네임 설정이 되어 있지 않으면 닉네임 설정화면으로 이동
        } else {    
            console.log("There's no NickName!!");
            navigation.navigate('SetNickNameScreen');
        }
    };

    // 테스트를 위한 임시
    const sessionClear = async () => {
        await AsyncStorage.clear();
    };


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