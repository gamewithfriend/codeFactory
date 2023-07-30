import React, { Component, useState, useEffect, useRef } from 'react';
import { KeyboardAvoidingView, View, Button, Platform, Image, StyleSheet, Dimensions, Text,TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import * as Session from './utils/session.js'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

// 화면을 반응형으로 만들기 위한 노력....
const {width:SCREEN_WIDTH} = Dimensions.get('window');
const {height:SCREEN_HEIGHT} = Dimensions.get('window');

const realUrl = "3.37.211.126";
const testUrl = "192.168.105.27";

export default function SetNickNameScreen ({navigation}) {
    // 닉네임 설정을 위한 useState 선언
    const [nickName, setNickName] = useState("");
    const [selectedImage, setSelectedImage] = useState({
        uri: '',
        ext : ''
    });
    const [userInfo, setUserInfo] = useState([]);

    // 닉네임 TextInput useRef
    const nickNameInput = useRef(null);

    // 닉네임 TextInput 변경 감지 event
    const onChangeText = (e) => {
        setNickName(e.nativeEvent.text);
    }
    
    const getMyInfo = async() =>{
        let userInfo= await Session.sessionGet("sessionInfo");
        setNickName(userInfo.uNickname);
        const sessionId = userInfo.uIntgId;
        const response = await fetch (`http://hduo88.com/mypage/selectUserInfo.do?uIntgId=${sessionId}`)
        const json = await response.json();
        if(json != ''){
            setUserInfo(json.user[0]);
        }
    };

    const saveUserNickName = async () => {
        let isValid = validCheck();
        console.log(isValid==true);
        if (isValid) {
            // 세션정보에 닉네임값을 담아 전달할 데이터 구성
            let userInfo = await Session.sessionGet("sessionInfo");
            
            setUserInfo(userInfo);
            userInfo.uNickname = nickName;
            
            // 서버통신 실행
            await fetch("http://" + realUrl + ":8080/login/saveUserNickName.do", {
                                    method : "POST",
                                    headers : {
                                        'Content-Type': 'application/json; charset=utf-8',
                                    },
                                    body : JSON.stringify(userInfo)
                                  }).then(response => response.json()
                                   ).then(async (result) => {
                                        // 최초로그인 및 로그인 확인이 끝났으면 session 값을 set 및 get 해준다
                                        if (result.isSaved = "Y") {
                                            let tmpSessionInfo = JSON.stringify(result.sessionInfo);
                                            
                                            await Session.sessionSave("sessionInfo", tmpSessionInfo);
                                            // 테스트용
                                            // let newUserInfo = await sessionGet("userInfo");
                                            // console.log(newUserInfo);

                                            Alert.alert("정상적으로 변경되었습니다!");
                                            
                                            navigation.navigate('MainScreen');
                                        }
                                   }).catch( error => {
                                        console.error(error);
                                   }) ;
        } else {
            Alert.alert("닉네임을 저장할 수 없습니다. 유효한 닉네임을 입력하였는지 확인하세요.");
            nickNameInput.current.focus();
        }
    }

    // 저장 시 입력 값의 유효여부를 판단하기 위한 validation 함수
    // return은 유효 여부의 true/false를 반환
    const validCheck = () => {
        // return 값에 대한 초기 선언
        let isValid = false;

        let nickNameByteLength = getStringByteLength(nickName);

        // 특수문자 정규식
        const specialChracterRegex = /[!@#$%^&*(),.?":{}|<>]/;
        // 특수문자 포함 체크로직
        if (nickName.length == 0 || nickName.includes(" ")) {
            console.log("공백이 있습니다요!");

            return false;
        }
        if (specialChracterRegex.test(nickName)) {
            Alert.alert("닉네임에 특수문자는 사용할 수 없습니다.");
            nickNameInput.current.focus();
            
            return false;
        }
        // 닉네임 입력 크기 체크로직
        if (nickNameByteLength > 30) {
            Alert.alert("닉네임은 영문 30자, 숫자 30자, 한글 10자까지 입력 가능합니다.");
            nickNameInput.current.focus();

            return false;
        }
        isValid = true;

        return isValid;
    }

    // 입력값의 bytes 계산 함수
    const getStringByteLength = (stringValue) => {
        let stringLenth = stringValue.length;
        let stringByteLength = 0;

        stringByteLength = (function(s,b,i,c){
            for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
            return b
        })(stringValue);

        return stringByteLength;
    }

    // session 정보를 확인하는 함수
    const sessionGet = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return value;
            } else {
                session = "";
            }
        } catch (error) {
            Alert.alert(error);
        }
    };
    // session 정보를 set하는 함수
    const sessionSave = async (key, value)=>{
        await AsyncStorage.setItem(
            key,
            value,
        );
    };

    const openImagePickerAsync = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('카메라 롤에 접근 권한이 필요합니다.');
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (!pickerResult.cancelled) {
            const lastDotIndex = pickerResult.assets[0].uri.lastIndexOf('.');
            let fileExtension = "";
            if (lastDotIndex !== -1) {
            fileExtension = pickerResult.assets[0].uri.slice(lastDotIndex + 1);
            } else {
            fileExtension = "파일 업로드 시 확장자 없음";
            }
            setSelectedImage((prevState) => {
            return {...prevState, ext : fileExtension, uri : pickerResult.assets[0].uri }
            });
        }
    };

    const uploadImageAsync = async () => {
        const apiUrl = 'http://hduo88.com/mypage/changeMyImage.do';
        const formData = new FormData();
        
        formData.append('image', {
            uri: selectedImage.uri,
            name: 'temp.'+selectedImage.ext,
            type: 'image/*'
        });

        formData.append('data',JSON.stringify(userInfo.uintgId));
        try{
            
            const response = await axios.post (apiUrl,formData,{
                headers: {"Content-Type" : 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'},
            })

            setSelectedImage((prevState) => {
                return {...prevState, ext : '', uri : '' }
            });
            const json = response.data;
            alert("프로필파일 업로드에 성공했습니다!");
            getMyInfo();
        } catch(error) {
            alert("프로필파일 업로드 실패.."+error);
        }
    };  

    useEffect(() => {
        getMyInfo();
    },[]);

    return (
        <View style={styles.conatiner} >
            <TouchableOpacity style={styles.imageContainer} onPress={openImagePickerAsync}>
                {selectedImage.uri !== '' ? (
                    <Image source={{ uri: selectedImage.uri }} style={styles.image} resizeMode='contain' />
                    ) : (
                    userInfo.profileImgUrl !== '' ? (
                    <Image
                        source={{ uri: `http://hduo88.com/tomcatImg/myPage/${userInfo.profileImgUrl}`}}
                        style={styles.image}
                        resizeMode='contain'
                        onPress={openImagePickerAsync}
                    />
                    ) : (
                    <Image resizeMode='contain' style={styles.image} source={require("./assets/images/emptyProfile.jpg")}/>
                    )
                )}
            </TouchableOpacity>
            { selectedImage.uri !== '' ? (
                <TouchableOpacity style={styles.imgUploadBtnView} title="이미지업로드" onPress={uploadImageAsync}>
                    <Text ref={nickNameInput} style={styles.btnText}>이미지업로드</Text>
                </TouchableOpacity>
                    ) : (
                    <Text></Text>
                    )
            }
            <KeyboardAvoidingView  style={styles.inputContainer} behavior={Platform.OS === 'ios' ? 'padding' : null} keyboardVerticalOffset={-100}>
                <TextInput style={styles.input} placeholder='사용할 닉네임을 입력하세요.' value={nickName} onChange={onChangeText}/>
            </KeyboardAvoidingView>
            <View>
            <TouchableOpacity style={styles.btn} disabled={nickName==""} title="저장" onPress={saveUserNickName}>
                <Text ref={nickNameInput} style={styles.btnText}>저장</Text>
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
    imgUploadBtnView : {
        backgroundColor: 'black',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        top : '15%',
    },
    inputContainer : {
        left : '20%',
        top : '15%',
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
        top:'50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});