import React, { Component, useState, useEffect } from 'react';
import { KeyboardAvoidingView, View, Platform, Image, StyleSheet, Dimensions, Text,TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import *  as Device from 'expo-device';
import * as Network from 'expo-network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';

// 화면을 반응형으로 만들기 위한 노력....
const {width:SCREEN_WIDTH} = Dimensions.get('window');
const {height:SCREEN_HEIGHT} = Dimensions.get('window');

export default function SetNickNameScreen ({navigation}) {
    const [nickName, setNickName] = useState("");
    const onChangeText = (e) => {
        setNickName(e.nativeEvent.text);
            
        console.log(nickName);
    }
    const validCheck = () => {
        console.log("밸리데이션 체크");
        let valid = false;

        // fetch로 수정 후 화면 돌리는 거까지 구현 필요
    }
    return (
        <View style={styles.conatiner} >
            <View style={styles.imageContainer}>
                <Image resizeMode='contain' source={require("./assets/images/emptyProfile.jpg")} defaultSource={require("./assets/images/emptyProfile.jpg")}
                       style={styles.image} />
            </View>
            <KeyboardAvoidingView  style={styles.inputContainer} behavior={Platform.OS === 'ios' ? 'padding' : null} keyboardVerticalOffset={-100}>
                <TextInput style={styles.input} placeholder='사용할 닉네임을 입력하세요.' value={nickName} onChange={onChangeText}/>
            </KeyboardAvoidingView>
            <View>
            <TouchableOpacity style={styles.btn} disabled={nickName==""} title="저장" onPress={validCheck}>
                <Text style={styles.btnText}>저장</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    conatiner : {
    },
    imageContainer : {
        left : '25%',
        top : '20%',
    },
    image : {
        width : SCREEN_WIDTH * 0.5,
        height : SCREEN_HEIGHT * 0.4,
    },
    inputContainer : {
        left : '20%',
        top : '10%',
    },
    input : {
        width: '60%',
        height: '22%',
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 8,
        fontSize : 20,
        flex : 0,   // 크기고정
    },
    btnArea : {

    },
    btn : {
        backgroundColor: '#3498db',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});