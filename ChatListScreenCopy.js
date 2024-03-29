import React, { Component, useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground, Image, StatusBar, SafeAreaView, Dimensions, Modal, Pressable, Alert, Button, TextInput } from 'react-native';
import * as Session from './utils/session';
import { useIsFocused } from '@react-navigation/native';
import Fetcher from './utils/Fetcher';

//이소망 추가
import MainFrame from './MainFrame';
import { glStyles } from './globalStyles';
import colors from './assets/colors/colors';
import { Ionicons } from '@expo/vector-icons';

const realUrl = "3.37.211.126";
const testUrl = "192.168.219.195";

// 세션정보를 담기위한 변수 선언
let session = "";


export default function ChatListScreen({ navigation }) {
    const [chatList, setChatList] = useState([]);
    const itemHeightRatio = 0.1;    // 아이템 높이를 화면 높이의 %로 설정
    const [modalVisible, setModalVisible] = useState(false);
    const [getFriendNum, setFriendNum] = useState(0);
    // 채팅 대화 상대를 담기위한 상태
    const [receivers, setReceivers] = useState([]);
    // 친구목록 선택
    const [clickState, setClickState] = useState({});
    const [getStateFriendList, setStateFriendList] = useState([]);
    const [text, onChangeText] = React.useState(null);

    
    // let receivers = [];

    let isFocused = useIsFocused();

    const initChatList = async () => {
        try {
            // 세션정보를 먼저 받아온다
            let sessionValue = await Session.sessionGet("sessionInfo");
            session = sessionValue;

            if (session != null && session != undefined) {
                // 세션정보를 기반으로 채팅방 목록을 호출
                getChatList(session);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // 사용자의 chatList를 불러온다.
    const getChatList = async (data) => {
        const fectcher = new Fetcher("https://hduo88.com/chat/getChatList.do", "get", JSON.stringify(data));
        // const fectcher = new Fetcher(`http://${url}:8080/chat/getChatList.do`, "get", JSON.stringify(data));
        const result = await fectcher.jsonFetch();

        if (result.data != null && result.data != undefined) {
            updateChatList(result.data);
        }
    };

    // 데이터가 변할 때마다 chatList 업데이트
    const updateChatList = (data) => {
        const updatedChatList = data.map(item => ({
            id: item.chaSeq,
            name: item.chaTitl
        }));
        setChatList(updatedChatList);
    };

    const getItemLayout = (_, index) => ({
        length: Dimensions.get("window").height * itemHeightRatio,
        offset: (Dimensions.get("window").height * itemHeightRatio) * index,
        index,
    });

    // 친구를 검색하여 채팅방을 여는 모달을 오픈
    const addFriendChat = () => {
        setModalVisible(true);
    };

    // 친구를 검색하여 채팅방을 여는 모달을 종료
    const addFriendChatClose = () => {
        setModalVisible(false);
    }

    const addFriendForChat = () => {
        // 선택된 사용자가 없으면 alert
        if (receivers.length == 0) {
            Alert.alert("선택된 친구가 없습니다.");
        } else {
            openChat();
        }
    };
    // 친구목록을 클릭할 때 배열에 추가하는 메서드
    const addReciever = (fYouId) => {
        if (fYouId != null && fYouId != "" && fYouId != undefined) {
            let tmpArr;
            if (receivers.includes(fYouId)) {
                // 이미 선택된 경우, 해당 항목을 배열에서 제거
                tmpArr = receivers.filter(id => id !== fYouId);
            } else {
                // 선택되지 않은 경우, 해당 항목을 배열에 추가
                tmpArr = [...receivers, fYouId];
            }
            // 배열 상태값 변경
            setReceivers(tmpArr);
            // 해당 버튼의 상태를 조절
            setClickState((prevState) => ({...prevState,  [fYouId]: !prevState[fYouId]}));
        }
    }

    const onChange = (text) => {
        onChangeText(text);
        getFriendList(text);
    };

    const getFriendList = async (text) => {
        let keyWord = "";
        if (text != undefined) {
            keyWord = text;
        }
        let userInfo = await Session.sessionGet("sessionInfo");
        getMyNick = userInfo.uIntgId;
        const response = await fetch(`https://hduo88.com/friend/findFriendList.do?myNick=${getMyNick}&keyWord=${keyWord}`)
        const json = await response.json();
        
        setStateFriendList(json.friendList)
        setFriendNum(json.friendNum);
    };

    // 채팅방을 만드는 메서드
    const openChat = async () => {
        setModalVisible(false);

        let param = {};
        param.sender = session.uIntgId;
        if (receivers != null && receivers != undefined && receivers.length > 0) {
            param.receivers = receivers;
        }

        // const fectcher = new Fetcher(`http://${testUrl}:8080/chat/openChatRoom.do`, "post", JSON.stringify(param));
        const fectcher = new Fetcher("https://hduo88.com/chat/openChatRoom.do", "post", JSON.stringify(param));
        const result = await fectcher.jsonFetch();
        
        if (result.data != null && result.data != "" && result.data != undefined) {
            // 선택 값 초기화
            setReceivers([]);
            setClickState({});
            // 채팅방으로 이동
            moveToChatRoom(result.data);
        } else {
            Alert.alert("오류가 발생했습니다.");
            return false;
        }
    };

    // 채팅방으로 이동하는 메서드
    const moveToChatRoom = (chatRoomId) => {
        navigation.navigate('TextChatCopy', { chatRoomId: chatRoomId });
    };

    useEffect(() => {
        initChatList();
        getFriendList();
    }, [isFocused]);

    return (
        <MainFrame>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

            <View style={[glStyles.flexRowBtwn, glStyles.pdHrzn15]}>
                <Text style={glStyles.pageTit}>채팅</Text>
                <View style={glStyles.flexRow}>
                    <TouchableOpacity onPress={addFriendChat}>
                        <Ionicons name="person-add" size={20} style={glStyles.cardIcon} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={glStyles.flexContainer}>
                {chatList.length === 0 ? (
                    <View style={[glStyles.flexContainer, glStyles.flexCenter]}>
                        <Text style={glStyles.basicText}>참여중인 채팅방이 없습니다.</Text>
                    </View>
                ) : (
                    <FlatList style={glStyles.basicList}
                        data={chatList}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={glStyles.basicItem} onStartShouldSetResponder={() => moveToChatRoom(item.id)}>
                                <ImageBackground
                                    source={require('./assets/images/chatImg.jpg')}
                                    style={glStyles.basicItemImg}
                                    resizeMode="cover"
                                    imageStyle={{ borderRadius: 52 }}
                                />
                                <View style={glStyles.basicItemInfo}>
                                    <Text style={glStyles.basicInfoTit}>{item.name}</Text>
                                    <Text style={glStyles.basicInfoDttm}>2023.08.02</Text>
                                    <Text style={glStyles.basicInfoCntn}>마지막 대화 내용</Text>
                                </View>
                            </View>
                        )}
                        getItemLayout={getItemLayout}
                    />
                )}
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={[glStyles.modalView, glStyles.bgDarkGray, glStyles.pd15]}>
                    <View style={[glStyles.btnIcon, glStyles.flexRowEnd]}>
                        <TouchableOpacity onPress={addFriendChatClose} >
                            <Ionicons name="close" size={20} style={glStyles.cardIcon} />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={glStyles.basicText}
                        onChangeText={text => onChange(text)}
                        placeholder='친구 검색'
                        placeholderTextColor='#eee'
                        value={text}
                    />
                    {getStateFriendList.length === 0 ? (
                        <Text>친구가 없습니다.</Text>
                    ) : (
                        <FlatList
                            data={getStateFriendList}
                            keyExtractor={item => item.fYouId}
                            renderItem={({ item }) => (
                                <View style={[glStyles.basicItem, glStyles.addPartLine, { height: Dimensions.get('window').height * itemHeightRatio }]}>
                                    <View style={[glStyles.flexContainer, glStyles.flexRowStrtCntr, {borderColor : clickState[item.fYouId]?'#eee':undefined, borderWidth:1}]} onStartShouldSetResponder={() => addReciever(item.fYouId)}>
                                        {item.profileImgUrl !== null ?
                                        (<View style={glStyles.basicItemImgSm}>
                                            <Image resizeMode='contain' style={styles.profileImg}
                                                source={{ uri: `http://hduo88.com/tomcatImg/myPage/${item.profileImgUrl}` }} />
                                        </View>)
                                        :
                                        (<View style={glStyles.basicItemImgSm}>
                                            <Image resizeMode='contain' style={styles.profileImg}
                                                source={require("./assets/images/emptyProfile.jpg")} />
                                        </View>)
                                        }
                                        <View>
                                            <Text style={glStyles.basicText} >{item.appNick}</Text>
                                        </View>
                                    </View>
                                </View>
                            )}
                            getItemLayout={getItemLayout}
                        />
                    )}
                    <View style={glStyles.btnBox}>
                        <View style={[glStyles.btnSm, glStyles.btnBlue]} onStartShouldSetResponder={() => addFriendForChat()}>
                            <Text style={glStyles.btnText}>선택하기</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </MainFrame >
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'red',
    },
    body: {
        // backgroundColor: 'blue',
    },
    chatItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',

    },
    flexDirection: "row",
    image: {
        width: 30, height: 30
    },
    itemBoxView: {
        flexDirection: "row"
    },
    modalView: {
        margin: 20,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position: 'absolute',
        top: 0,
        bottom: 100,
        left: 20,
        right: 20,
    },
    profileImg: {
        width: "100%",
        height: "100%",
    },
    itemBoxPhoto: {
        width: "20%",
        height: "100%",
    },
    listName: {
        marginLeft: "3%",
    },
    input: {
        marginBottom: "4%",
    },
});