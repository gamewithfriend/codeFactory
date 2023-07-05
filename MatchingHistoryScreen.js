import React, { Component, useState, useEffect } from 'react';
import { View, Text, Button,StyleSheet,TextInput,Image, Dimensions, ScrollView, TouchableOpacity, Modal, Pressable, SafeAreaView } from 'react-native';
import Checkbox from 'expo-checkbox';

const {width:SCREEN_WIDTH} = Dimensions.get('window');
const {height:SCREEN_HEIGHT} = Dimensions.get('window');

export default function MatchingHistoryScreen ({navigation}) {

    const [getStateHistoryList, setStateHistoryList] = useState([]);
    const [getStateDisplayDate, setStateDisplayDate] = useState("");
    const [getPreviousDate, setPreviousDate] = useState("");
    const [getLaterDate, setLaterDate] = useState("");

    const [modalVisible, setModalVisible] = useState(false);

    const [text, onChangeText] = useState('');
    const [number, onChangeNumber] = useState('');

    const [isSelected, setSelection] = useState(false);

    const prevoiusButtonClick = () => {
        getHistoryList("previous", getStateDisplayDate);   
    };

    const laterButtonClick = () => {
        getHistoryList("later", getStateDisplayDate);   
    };

    const reportButtonClick = () => {
        setModalVisible(true);
    }

    const getHistoryList = async(type, date) => {
        const myID = '112664865495468363793';

        let selectType = "";
        let baseDate = "";

        (type === null && type === '' && type === undefined) ? selectType = "latest" : selectType = type;
        (date === null && date === '' && date === undefined) ? baseDate = "" : baseDate = date;

        const response = await fetch (`http://192.168.45.20:8080/matching/historyList.do?myID=${myID}&selectType=${selectType}&baseDate=${baseDate}`);
        //const response = await fetch (`http://3.37.211.126:8080/matching/historyList.do?myID=${myID}&selectType=${selectType}&baseDate=${baseDate}`);
        const json = await response.json();
        setStateHistoryList(json.historyList);
        setStateDisplayDate(json.displayDate);
        setPreviousDate(json.previousDate);
        setLaterDate(json.LaterDate);
    };

    const addFriendTrigger = (targetId) => {
        const myID = 'jonghwi';
        const responseAddFriend = fetch (`http://192.168.45.20:8080/friend/friendAdd.do?myNick=${myID}&yourNick=${targetId}`);
        //const responseAddFriend = fetch (`http://3.37.211.126:8080/friend/friendAdd.do?myNick=${myID}&yourNick=${targetId}`);
    };
    
    useEffect(() => {
        getHistoryList();
    },[]);

    return (
        <View>
            <View style={styles.titleView}>
                   <Text>Matching History</Text>
            </View>
            <View style={styles.contentsView}>
                
                <View style={styles.centeredView}>
                    <Modal animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>
                        <Pressable style={{flex:1, backgroundColor:'transparent'}} onPress={()=>setModalVisible(false)} />
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                
                                <Checkbox
                                    value={isSelected}
                                    onValueChange={setSelection}
                                    style={styles.checkbox}
                                    />
                                <Text style={styles.label}>Do you like React Native?</Text>


                                <SafeAreaView>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={onChangeText}
                                        value={text}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={onChangeNumber}
                                        value={number}
                                        placeholder="text."
                                        keyboardType="default"
                                    />
                                </SafeAreaView>

                                <View onStartShouldSetResponder={() => setModalVisible(false)}>
                                    <Text>닫기</Text>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>


                <View style={styles.dailyMatching}> 
                    <View style={styles.dayView}>
                        {(getPreviousDate === "" || getPreviousDate === "isNull") ? (
                            <View style={styles.previousButtonView}></View>
                            ) : (
                            <View style={styles.previousButtonView} onStartShouldSetResponder={() => prevoiusButtonClick()}>
                                <Text>이전</Text>
                            </View>
                            )
                        }
                        
                        <View style={styles.displayDate}><Text>{getStateDisplayDate}</Text></View>

                        {(getLaterDate === "" || getLaterDate === "isNull") ? (
                            <View style={styles.laterButtonView}></View>
                            ) : (
                            <View style={styles.laterButtonView} onStartShouldSetResponder={() => laterButtonClick()}>
                                <Text>이후</Text>
                            </View>
                            )
                        }
                        
                        
                    </View>
                    <View style={styles.dailyProfile}>
                        <ScrollView pagingEnabled ={false} showsHorizontalScrollIndicator = {false}>
                            {getStateHistoryList.length === 0? (
                                <View >
                                    <Text>데이터가 존재하지 않습니다.</Text>
                                </View>
                                ) : (
                                    getStateHistoryList.map( (info, index) =>
                                        <View key={info.mMatchingID} style={styles.profileView}>
                                            <View style={styles.profileImgView}>
                                                <Image resizeMode='stretch' style={styles.profileImg} 
                                                source={require("./assets/images/emptyProfile.jpg")}/>
                                            </View>
                                            <View style={styles.profileInfoView}>
                                                <View style={styles.infoArea}>
                                                    <View style={styles.tierArea}>
                                                        <View style={styles.tierImgView}>
                                                            <Image resizeMode='center' style={styles.tierImg} 
                                                            source={require("./assets/images/rank/emblem-gold.png")}/>
                                                        </View>
                                                        <View style={styles.tierName}>
                                                            <Text>{info.mUserRank}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.userArea}>
                                                        <View style={styles.userName}>
                                                            <Text>{info.mUserNickname}</Text>
                                                        </View>
                                                        <View style={styles.userLike}>
                                                            <View style={styles.likeCount}>
                                                                <Text>7</Text>
                                                            </View>
                                                            <View style={styles.likeImgView}>
                                                                <Image resizeMode='stretch' style={styles.likeImg} 
                                                                source={require("./assets/images/fullHeart.png")}/>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View style={styles.mostArea}>
                                                        <View style={styles.mostChampions}>
                                                            <Text>{info.mUserChmpion}</Text>
                                                        </View>
                                                        <View style={styles.oftenTime}>
                                                            <Text>{info.mUserTime}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={styles.matchingArea}>
                                                    <View style={styles.playType}>
                                                        <Text>{info.mGameType}</Text>
                                                    </View>
                                                    <View style={styles.matchingPointText}>
                                                        <Text style={styles.matchingPointTextDetail}>매칭점수</Text>
                                                    </View>
                                                    <View style={styles.matchingPoint}>
                                                        <Text>{info.mMatchingScore}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.profileButtonView}>
                                                <View style={styles.addFriendArea} onStartShouldSetResponder={() => addFriendTrigger(info.mUserID)}>
                                                    <Text>친구추가</Text>
                                                </View>
                                                <View style={styles.reportArea} onStartShouldSetResponder={() => reportButtonClick()}>
                                                    <Text>신고</Text>
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
        </View>
    );
}

const styles = StyleSheet.create({
  lineDesign:{
    height: 1, 
    backgroundColor: "black", 
    marginBottom: "3%",
    marginTop: "3%",
    opacity:0.3,
  },
  container:{
    //flex:1,
  },
        titleView:{
            marginTop:"15%",
            height:"3%",
            alignItems:"center",
            justifyContent: "center",
        },
        contentsView: {
            //flexGorw:1,
            height:"83%",
            marginTop:"1%",
        },
            // Daily
            dailyMatching: {
                //height: SCREEN_HEIGHT * 1,
                height: "98%",
                margin:"1%",
            },     
                dayView: {
                    height:"5%",
                    //borderWidth: 1,
                    flexDirection:"row"
                },
                    previousButtonView: {
                        width:"15%",
                        alignItems:"center",
                        justifyContent: "center",
                        //borderWidth: 1,
                    },
                    displayDate: {
                        width:"70%",
                        alignItems:"center",
                        justifyContent: "center",
                        //borderWidth: 1,
                    },
                    laterButtonView: {
                        width:"15%",
                        alignItems:"center",
                        justifyContent: "center",
                        //borderWidth: 1,
                    },
                dailyProfile: {
                    height:"95%",
                    flex:1,
                },
                    // 프로필
                    profileView: {
                        height: SCREEN_HEIGHT * 0.098,
                        flexDirection:"row",
                        marginTop:"1%",
                        backgroundColor: 'rgb(236, 230, 255)',
                        borderWidth: 1,
                        borderRadius : 6,
                        //flex:1,
                    },
                        profileImgView: {
                            width:"20%",
                            //margin: "0.5%", 
                        },
                            profileImg: {
                                width:"100%",
                                height:"100%",
                                borderRadius : 50,
                            },
                        profileInfoView: {
                            width:"60%",
                            flexDirection: "row",
                            margin: "0.5%",
                            //borderWidth: 1
                        },
                            infoArea: {
                                width:"80%",
                                //borderWidth: 1
                            },
                                tierArea: {
                                    height:"25%",
                                    flexDirection: "row",
                                    //borderWidth: 1
                                },
                                    tierImgView: {
                                        width:"15%",
                                        //borderWidth: 1
                                    },
                                        tierImg: {
                                            width:"100%",
                                            height:"100%"
                                        },
                                    tierName: {
                                        width:"85%",
                                        justifyContent: "center",
                                        fontFamily: "Apple SD Gothic Neo",
                                        //borderWidth: 1
                                    },
                                userArea: {
                                    height:"50%",
                                    flexDirection: "row",
                                    //borderWidth: 1
                                },
                                    userName: {
                                        width:"80%",
                                        justifyContent: "center",
                                        //borderWidth: 1
                                    },
                                    userLike: {
                                        width:"20%",
                                        //borderWidth: 1
                                    },
                                        likeCount: {
                                            height:"35%",
                                            alignItems:"center",
                                            //borderWidth: 1
                                        },
                                        likeImgView: {
                                            height:"65%",
                                            //borderWidth: 1
                                        },
                                            likeImg: {
                                                width:"100%",
                                                height:"100%"
                                            },
                                mostArea: {
                                    height:"25%",
                                    flexDirection: "row",
                                    //borderWidth: 1
                                },
                                    mostChampions: {
                                        width:"80%",
                                        alignItems:"center",
                                        justifyContent: "center",
                                        fontSize: 30,
                                        //borderWidth: 1
                                    },
                                    oftenTime: {
                                        width:"20%",
                                        alignItems:"center",
                                        justifyContent: "center",
                                        //borderWidth: 1
                                    },
                            
                            matchingArea: {
                                width:"20%",
                                //borderWidth: 1
                            },
                                playType: {
                                    height:"35%",
                                    alignItems:"center",
                                    justifyContent: "center",
                                    //borderWidth: 1
                                },
                                matchingPointText: {
                                    height:"30%",
                                    alignItems:"center",
                                    justifyContent: "flex-end",
                                    //borderWidth: 1
                                },
                                    matchingPointTextDetail: {
                                        fontSize: 10,
                                    },

                                matchingPoint: {
                                    height:"35%",
                                    alignItems:"center",
                                    justifyContent: "center",
                                    //borderWidth: 1
                                },

                        profileButtonView: {
                            width:"17%",
                            //backgroundColor: "green",
                        },
                            addFriendArea: {
                                height:"50%",
                                alignItems:"center",
                                justifyContent: "center"
                            },
                            reportArea: {
                                height:"50%",
                                alignItems:"center",
                                justifyContent: "center"
                            },
                            centeredView: {
                                flex: 1,
                                //marginTop: "5%",
                              },
                            modalView: {
                                margin: 5,
                                backgroundColor: 'white',
                                padding: "5%",
                                shadowColor: '#000',
                                shadowOffset: {
                                  width: 0,
                                  height: 0,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5,
                                position:'absolute',
                                top:-290,
                                bottom:70,
                                left:0,
                                right:0,
                              },
                              input: {
                                height: 40,
                                margin: 12,
                                borderWidth: 1,
                                padding: 10,
                              },
});