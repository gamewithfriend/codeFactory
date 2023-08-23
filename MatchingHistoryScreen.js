import React, { Component, useState, useEffect } from 'react';
import { View, Text, Button,StyleSheet,TextInput,Image, Dimensions, ScrollView, Alert, Modal, Pressable, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import Checkbox from 'expo-checkbox';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const {width:SCREEN_WIDTH} = Dimensions.get('window');
const {height:SCREEN_HEIGHT} = Dimensions.get('window');

export default function MatchingHistoryScreen ({navigation}) {

    const [getStateHistoryList, setStateHistoryList] = useState([]);
    const [getStateDisplayDate, setStateDisplayDate] = useState("");
    const [getPreviousDate, setPreviousDate] = useState("");
    const [getLaterDate, setLaterDate] = useState("");

    const [modalVisible, setModalVisible] = useState(false);

    const [reportDetails, onChangeReportDetails] = useState('');

    const [isSelected, setSelection] = useState(false);

    const [reportNicname, setReportNicname] = useState('');
    const [reportUserID, setReportUserID] = useState('');

    // 이전 버튼 클릭시
    const prevoiusButtonClick = () => {
        getHistoryList("previous", getStateDisplayDate);   
    };

    // 이후 버튼 클릭시
    const laterButtonClick = () => {
        getHistoryList("later", getStateDisplayDate);   
    };

    //let reportUserID = "";
    // 신고 버튼 클릭시
    const reportButtonClick = (userNickname, userID) => {
        setReportUserID(userID);
        setReportNicname(userNickname);
        setModalVisible(true);
    }

    // 신고 모달 닫기 버튼 클릭시
    const reportModalCancelClick = () => {
        //onChangeReportDetails("");
        setModalVisible(false);
    }

    // 신고 모달 옵션 체크시
    let reportOptions = new Array();
    const reportOptionCheck = (reportOption) => { 
        if(reportOptions.indexOf(reportOption) == -1) {
            reportOptions.push(reportOption);
        } else {
            reportOptions.splice(reportOptions.indexOf(reportOption), 1);
        }
    }

    const getHistoryList = async(type, date) => {
        const myID = '112664865495468363793';

        let selectType = "";
        let baseDate = "";

        (type == null || type == '' || type == undefined) ? selectType = "latest" : selectType = type;
        (date == null || date == '' || date == undefined) ? baseDate = "" : baseDate = date;

        //const response = await fetch (`http://192.168.45.20:8080/matching/historyList.do?myID=${myID}&selectType=${selectType}&baseDate=${baseDate}`);
        const response = await fetch (`http://hduo88.com/matching/historyList.do?myID=${myID}&selectType=${selectType}&baseDate=${baseDate}`);
        const json = await response.json();
        setStateHistoryList(json.historyList);
        setStateDisplayDate(json.displayDate);
        setPreviousDate(json.previousDate);
        setLaterDate(json.LaterDate);
    };

    // 친구 추가 버튼 클릭시
    const addFriendTrigger = (targetId) => {
        const myID = '112664865495468363793';
        //const responseAddFriend = fetch (`http://192.168.45.20:8080/friend/friendAdd.do?myNick=${myID}&yourNick=${targetId}`);
        const responseAddFriend = fetch (`http://hduo88.com/friend/friendAdd.do?myNick=${myID}&yourNick=${targetId}`);
    };

    // 신고 버튼 클릭시
    const submitReport = async () => {
        if(reportOptions.length > 0) {
            const myID = '112664865495468363793';
                
            try {
                //const responseSubmitReport = await fetch('http://192.168.45.20:8080/report/submitReport.do',
                const responseSubmitReport = await fetch('http://hduo88.com/report/submitReport.do', 
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        myID: myID,
                        reportUserID: reportUserID,
                        reportOptions: reportOptions.toString(),
                        reportDetails: reportDetails
                    })
                });
                
                const json = await responseSubmitReport.json();

                if(json.result) {
                    Alert.alert("신고가 완료되었습니다.");
                } else {
                    Alert.alert("신고 실패.");
                }
            } catch (error) {
                console.error(error);
            }
          
            // Alert.alert(
            //     "해당 유저를 신고하시겠습니까?",
            //     [
            //         {
            //             text: "아니요", 
            //             style: "cancel"
            //         },
            //         {
            //             text: "네",
            //             onPress: () => {
            //                 Alert.alert("신고가 완료되었습니다.");
            //             }
            //         }
            //     ],
            //     { cancelable: false }
            //     "신고가 완료되었습니다."
            // );
            setModalVisible(false);
        } else {
            Alert.alert("신고 사유를 1개 이상 선택해주세요.");
        }
    }
    
    useEffect(() => {
        getHistoryList();
    },[]);

    return (
        <View>
            <View style={styles.titleView}>
                   <Text>Matching History</Text>
            </View>


            


            <View style={styles.contentsView}>
                {/*신고 모달 화면 */}
                <View style={styles.centeredView}>
                    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible);}}>
                        <Pressable style={{flex:1, backgroundColor:'transparent'}} onPress={()=>setModalVisible(false)} />
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.reportTitleArea}>
                                    <View style={styles.reportTitle_profileImg}>
                                        <Image resizeMode='stretch' style={styles.profileImg} 
                                               source={require("./assets/images/emptyProfile.jpg")}/>
                                    </View>
                                    
                                    <View style={styles.reportTitle_info}>
                                        <Text style={styles.reportTitle_text}>{reportNicname} 유저 신고하기</Text>
                                    </View>
                                </View>
                                <View style={styles.reportCheckboxArea}>
                                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>신고 사유를 선택해주세요. (복수 선택 가능)</Text>
                                    <BouncyCheckbox
                                        style={styles.reportCheckbox}
                                        size={25}
                                        fillColor="red"
                                        unfillColor="#FFFFFF"
                                        text="고의 트롤 행위"
                                        iconStyle={{ borderColor: "red" }}
                                        textStyle={{ textDecorationLine: "none" }}
                                      
                                    />
                                    <BouncyCheckbox
                                        style={styles.reportCheckbox}
                                        size={25}
                                        fillColor="red"
                                        unfillColor="#FFFFFF"
                                        text="게임 내 공격적인 언어 사용"
                                        iconStyle={{ borderColor: "red" }}
                                        textStyle={{ textDecorationLine: "none" }}
                                        
                                    />
                                    <BouncyCheckbox
                                        style={styles.reportCheckbox}
                                        size={25}
                                        fillColor="red"
                                        unfillColor="#FFFFFF"
                                        text="탈주 행위 또는 자리비움"
                                        iconStyle={{ borderColor: "red" }}
                                        textStyle={{ textDecorationLine: "none" }}
                                        
                                    />
                                    <BouncyCheckbox
                                        style={styles.reportCheckbox}
                                        size={25}
                                        fillColor="red"
                                        unfillColor="#FFFFFF"
                                        text="티어에 맞지 않는 플레이 (대리 의심)"
                                        iconStyle={{ borderColor: "red" }}
                                        textStyle={{ textDecorationLine: "none" }}
                                        
                                    />
                                    <BouncyCheckbox
                                        style={styles.reportCheckbox}
                                        size={25}
                                        fillColor="red"
                                        unfillColor="#FFFFFF"
                                        text="불법 프로그램 사용"
                                        iconStyle={{ borderColor: "red" }}
                                        textStyle={{ textDecorationLine: "none" }}
                                        
                                    />
                                    <BouncyCheckbox
                                        style={styles.reportCheckbox}
                                        size={25}
                                        fillColor="red"
                                        unfillColor="#FFFFFF"
                                        text="기타"
                                        iconStyle={{ borderColor: "red" }}
                                        textStyle={{ textDecorationLine: "none" }}
                                        
                                    />
                                </View>
                                <View style={styles.reportTextInputArea}>
                                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>신고 내용을 작성해주세요.</Text>
                                    <SafeAreaView>
                                        <KeyboardAvoidingView
                                            // behavior={Platform.select({ios: 'padding', android: 'padding'})}
                                            behavior={'padding'}
                                            style={styles.avoid}>
                                            <TextInput
                                                style={styles.input}
                                                onChangeText={onChangeReportDetails}
                                                value={reportDetails}
                                                placeholder="신고 내용을 자세히 적어주시면 해당 유저를 제재하는데 많은 도움이 됩니다."
                                                keyboardType="default"
                                                multiline ={true}
                                            />
                                        </KeyboardAvoidingView>
                                    </SafeAreaView>
                                </View>
                                {/* <View style={styles.lineDesign}></View> */}
                                
                                <View style={styles.reportButtonArea}>
                                    <View style={styles.reportSubmitButton} onStartShouldSetResponder={() => submitReport()}>
                                        <Text style={{fontSize: 20, color: "#FFFFFF"}}>신고</Text>
                                    </View>
                                    <View style={styles.reportCancelButton} onStartShouldSetResponder={() => reportModalCancelClick()}>
                                        <Text style={{fontSize: 20, color: "#FFFFFF"}}>닫기</Text>
                                    </View>
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
                                                <View style={styles.reportArea} onStartShouldSetResponder={() => reportButtonClick(info.mUserNickname, info.mUserID)}>
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
    marginBottom: "1%",
    marginTop: "1%",
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
                                //borderWidth: 1
                                //marginTop: "5%",
                              },
                            modalView: {
                                margin: 0,
                                backgroundColor: 'white',
                                padding: "1%",
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
                                //borderWidth: 1
                            },
                                reportTitleArea: {
                                    flexDirection: "row",
                                    height:"13%",
                                    marginTop: "2%",
                                    padding: "1%",
                                    //borderWidth: 1
                                },
                                    reportTitle_profileImg: {
                                        width: "20%"
                                    },
                                    reportTitle_info: {
                                        width: "80%",
                                        marginLeft: "5%",
                                        justifyContent: "center"
                                    },
                                    reportTitle_text: {
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                    },
                                reportCheckboxArea: {
                                    height:"50%",
                                    padding: "3%",
                                    marginTop: "3%",
                                    //borderWidth: 1
                                },
                                reportTextInputArea: {
                                    flex: 1,
                                    flexShrink:1,
                                    height:"20%",
                                    padding: "3%",
                                    //borderWidth: 1
                                },
                                reportButtonArea: {
                                    height:"10%",
                                    flexDirection: "row",
                                    alignItems:"center",
                                    justifyContent: "center",
                                    //borderWidth: 1
                                },
                                    reportSubmitButton: {
                                        //borderWidth: 1,
                                        height: "70%",
                                        width: "20%",
                                        alignItems:"center",
                                        justifyContent: "center",
                                        borderRadius : 8,
                                        backgroundColor: "#F44336"
                                    },
                                    reportCancelButton: {
                                        //borderWidth: 1,
                                        marginLeft: "10%",
                                        height: "70%",
                                        width: "20%",
                                        alignItems:"center",
                                        justifyContent: "center",
                                        borderRadius : 7,
                                        backgroundColor: "#7F7F7F"
                                    },
                              reportCheckbox: {
                                height: "10%",
                                marginTop: "3%", 
                              },
                              input: {
                                height: 80,
                                marginTop: "3%", 
                                borderWidth: 1,
                                padding: 10,
                              },
                              avoid: {
                                flex: 1,
                                backgroundColor: "#ffffff"
                              },
});