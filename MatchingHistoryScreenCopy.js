import React, { Component, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image, Dimensions, ScrollView, Alert, Modal, Pressable, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import Checkbox from 'expo-checkbox';
import BouncyCheckbox from "react-native-bouncy-checkbox";

//이소망 추가
import MainFrame from './MainFrame';
import { glStyles } from './globalStyles';
import colors from './assets/colors/colors';
import { FontAwesome5, Entypo, Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function MatchingHistoryScreen({ navigation }) {

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
        if (reportOptions.indexOf(reportOption) == -1) {
            reportOptions.push(reportOption);
        } else {
            reportOptions.splice(reportOptions.indexOf(reportOption), 1);
        }
    }

    const getHistoryList = async (type, date) => {
        const myID = '112664865495468363793';

        let selectType = "";
        let baseDate = "";

        (type == null || type == '' || type == undefined) ? selectType = "latest" : selectType = type;
        (date == null || date == '' || date == undefined) ? baseDate = "" : baseDate = date;

        //const response = await fetch (`http://192.168.45.20:8080/matching/historyList.do?myID=${myID}&selectType=${selectType}&baseDate=${baseDate}`);
        const response = await fetch(`http://hduo88.com/matching/historyList.do?myID=${myID}&selectType=${selectType}&baseDate=${baseDate}`);
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
        const responseAddFriend = fetch(`http://hduo88.com/friend/friendAdd.do?myNick=${myID}&yourNick=${targetId}`);
    };

    // 신고 버튼 클릭시
    const submitReport = async () => {
        if (reportOptions.length > 0) {
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

                if (json.result) {
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
    }, []);

    return (
        <MainFrame>
            <View style={[glStyles.btnIcon, glStyles.flexRowEnd]}>
                {/* 닫기 이벤트 추가 부탁 */}
                <Ionicons name="close" size={20} style={glStyles.cardIcon} />
            </View>
            <View style={glStyles.titleBox}>
                <Text style={glStyles.titleText}>매칭 이력</Text>
            </View>
            <View style={glStyles.flexContainer}>
                <View style={[glStyles.flexRowEvenCntr, glStyles.mgbt20]}>
                    {(getPreviousDate === "" || getPreviousDate === "isNull") ? (
                        <View style={styles.previousButtonView}></View>
                    ) : (
                        <View style={styles.previousButtonView} onStartShouldSetResponder={() => prevoiusButtonClick()}>
                            <Text><Ionicons name="chevron-back-outline" size={22} style={glStyles.cardIcon} /></Text>
                        </View>
                    )
                    }

                    <View><Text style={glStyles.titleText}>{getStateDisplayDate}</Text></View>

                    {(getLaterDate === "" || getLaterDate === "isNull") ? (
                        <View style={styles.laterButtonView}></View>
                    ) : (
                        <View style={styles.laterButtonView} onStartShouldSetResponder={() => laterButtonClick()}>
                            <Text><Ionicons name="chevron-forward-outline" size={22} style={glStyles.cardIcon} /></Text>
                        </View>
                    )
                    }
                </View>

                <View style={[glStyles.flexContainer]}>
                    <ScrollView pagingEnabled={false} showsHorizontalScrollIndicator={false}>
                        {getStateHistoryList.length === 0 ? (
                            <View style={[glStyles.flexContainer, glStyles.flexCenter]}>
                                <Text style={glStyles.basicText}>데이터가 존재하지 않습니다.</Text>
                            </View>
                        ) : (
                            getStateHistoryList.map((info, index) =>
                                <View key={info.mMatchingID} style={[glStyles.basicItem, glStyles.pd15, glStyles.addPartLine]}>
                                    <View style={[glStyles.flexCenter, glStyles.pdR10]}>
                                        <Image resizeMode='cover' style={glStyles.basicItemImg}
                                            source={require("./assets/images/emptyProfile.jpg")} />
                                        <Text style={[glStyles.mgTop5, glStyles.basicText]}><Ionicons name="thumbs-up-outline" size={15} style={glStyles.cardIcon} /> 127 </Text>
                                    </View>
                                    <View style={[glStyles.flexGrow1, glStyles.flexRowBtwnCntr]}>
                                        <View>
                                            <Text style={glStyles.basicText}>{info.mUserNickname}</Text>
                                            <Text style={[glStyles.basicText, styles.matchingPointTextDetail]}>매칭점수: {info.mMatchingScore}</Text>
                                            <Text style={glStyles.basicText}>시간대: {info.mUserTime}</Text>
                                            <Text style={glStyles.basicText}>타입: {info.mGameType}</Text>
                                            <Text style={glStyles.basicText}>주챔: {info.mUserChmpion}</Text>
                                        </View>
                                        <View style={[glStyles.flexCenter]}>
                                            <View>
                                                <Text style={[glStyles.basicText, glStyles.txtAlignCntr]}>{info.mUserRank}</Text>
                                                <Image resizeMode='center' style={glStyles.basicItemImg}
                                                    source={require("./assets/images/rank/emblem-gold.png")} />
                                            </View>
                                            <View style={[glStyles.btnBox, glStyles.flexRowEvenCntr]}>
                                                <View style={glStyles.pdR10} onStartShouldSetResponder={() => addFriendTrigger(info.mUserID)}>
                                                    <Text><Ionicons name="rocket-outline" size={25} style={glStyles.cardIcon} /></Text>
                                                </View>
                                                <View onStartShouldSetResponder={() => reportButtonClick(info.mUserNickname, info.mUserID)}>
                                                    <Text><Ionicons name="sad" size={25} style={glStyles.cardIcon} /></Text>
                                                </View>
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


            {/*신고 모달 화면 */}
            <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible); }}>
                <Pressable style={{ flex: 1, backgroundColor: 'transparent' }} onPress={() => setModalVisible(false)} />
                <View style={[glStyles.modalView, glStyles.bgBlack, glStyles.pd15]}>

                    <View style={[glStyles.pdVrtcl15]}>
                        <Text style={[glStyles.pageTit, glStyles.txtAlignCntr]}>신고하기</Text>
                    </View>
                    <View style={glStyles.flexCenter}>
                        <Image resizeMode='stretch' style={[glStyles.basicItemImgLg, glStyles.mgbt10]}
                            source={require("./assets/images/emptyProfile.jpg")} />
                        <Text style={glStyles.titleText}>{reportNicname}</Text>
                    </View>
                    <View style={glStyles.mgbt10}>
                        <Text style={[glStyles.basicText, glStyles.pdVrtcl10]}>신고 사유를 선택해주세요. (복수 선택 가능)</Text>
                        <BouncyCheckbox
                            style={glStyles.mgBt5}
                            size={18}
                            fillColor="#3498db"
                            unfillColor="#FFFFFF"
                            text="고의 트롤 행위"
                            iconStyle={{ borderColor: "red" }}
                            textStyle={{ textDecorationLine: "none" }}
                        />
                        <BouncyCheckbox
                            style={glStyles.mgBt5}
                            size={18}
                            fillColor="#3498db"
                            unfillColor="#FFFFFF"
                            text="게임 내 공격적인 언어 사용"
                            iconStyle={{ borderColor: "red" }}
                            textStyle={{ textDecorationLine: "none" }}
                        />
                        <BouncyCheckbox
                            style={glStyles.mgBt5}
                            size={18}
                            fillColor="#3498db"
                            unfillColor="#FFFFFF"
                            text="탈주 행위 또는 자리비움"
                            iconStyle={{ borderColor: "red" }}
                            textStyle={{ textDecorationLine: "none" }}
                        />
                        <BouncyCheckbox
                            style={glStyles.mgBt5}
                            size={18}
                            fillColor="#3498db"
                            unfillColor="#FFFFFF"
                            text="티어에 맞지 않는 플레이 (대리 의심)"
                            iconStyle={{ borderColor: "red" }}
                            textStyle={{ textDecorationLine: "none" }}
                        />
                        <BouncyCheckbox
                            style={glStyles.mgBt5}
                            size={18}
                            fillColor="#3498db"
                            unfillColor="#FFFFFF"
                            text="불법 프로그램 사용"
                            iconStyle={{ borderColor: "red" }}
                            textStyle={{ textDecorationLine: "none" }}
                        />
                        <BouncyCheckbox
                            style={glStyles.mgBt5}
                            size={18}
                            fillColor="#3498db"
                            unfillColor="#FFFFFF"
                            text="기타"
                            iconStyle={{ borderColor: "red" }}
                            textStyle={{ textDecorationLine: "none" }}
                        />
                    </View>
                    <View style={glStyles.mgVrtcl15}>
                        <Text style={[glStyles.basicText, glStyles.mgbt10]}>신고 내용을 작성해주세요.</Text>
                        <KeyboardAvoidingView
                            behavior={'padding'}
                            keyboardVerticalOffset={100}
                            style={[{ backgroundColor: colors.fontWh }]}>
                            <TextInput
                                style={[glStyles.basicText, { color: colors.black }]}
                                onChangeText={onChangeReportDetails}
                                value={reportDetails}
                                placeholder="신고 내용을 자세히 적어주시면 해당 유저를 제재하는데 많은 도움이 됩니다."
                                keyboardType="default"
                                multiline={true}
                            />
                        </KeyboardAvoidingView>
                    </View>
                    <View style={[glStyles.btnBox, glStyles.flexCenter]}>
                        <View style={[glStyles.xsmBtn, glStyles.btnBlue, glStyles.mgR20]} onStartShouldSetResponder={() => reportModalCancelClick()}>
                            <Text style={glStyles.btnText}>닫기</Text>
                        </View>
                        <View style={[glStyles.xsmBtn, glStyles.btnBlue]} onStartShouldSetResponder={() => submitReport()}>
                            <Text style={glStyles.btnText}>신고</Text>
                        </View>
                    </View>

                </View>
            </Modal>



        </MainFrame>
    );
}

const styles = StyleSheet.create({
    previousButtonView: {
        width: "15%",
        alignItems: "center",
        justifyContent: "center",
        //borderWidth: 1,
    },
    laterButtonView: {
        width: "15%",
        alignItems: "center",
        justifyContent: "center",
        //borderWidth: 1,
    },
});