import React, { Component, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image } from 'react-native';
// import { RTCPeerConnection, RTCView } from 'react-native-webrtc';

//이소망 추가
import MainFrame from './MainFrame';
import { glStyles } from './globalStyles';
import colors from './assets/colors/colors';
import { Ionicons } from '@expo/vector-icons';

export default function SettingScreen({ navigation }) {
  const optionSubmit = () => {
    navigation.navigate('MatchingHistoryScreen');
  };

  const goAccountScreen = () => {
    navigation.navigate('AccountScreen');
  };

  return (
    <MainFrame>
      <View style={glStyles.pdHrzn15}>
        <Text style={glStyles.pageTit}>세팅</Text>
      </View>
      <View style={glStyles.basicList}>
        <View style={[glStyles.flexRowStrt, glStyles.addPartLine]} onPress={optionSubmit}>
          <Ionicons name="settings-outline" size="24" style={[glStyles.cardIcon, glStyles.pdHrzn15]} />
          <Text style={glStyles.basicInfoTit}>Settings</Text>
          {/* <Button color={"black"} style={styles.choiceButton} onPress={optionSubmit} title='선택하기'></Button> */}
        </View>
        <View style={[glStyles.flexRowStrt, glStyles.addPartLine]} onPress={optionSubmit}>
          <Ionicons name="settings-outline" size="24" style={[glStyles.cardIcon, glStyles.pdHrzn15]} />
          <Text style={glStyles.basicInfoTit}>Settings</Text>
        </View>
        <View style={[glStyles.flexRowStrt, glStyles.addPartLine]} onPress={optionSubmit}>
          <Ionicons name="settings-outline" size="24" style={[glStyles.cardIcon, glStyles.pdHrzn15]} />
          <Text style={glStyles.basicInfoTit}>Settings</Text>
        </View>
        <View style={[glStyles.flexRowStrt, glStyles.addPartLine]} onPress={optionSubmit}>
          <Ionicons name="settings-outline" size="24" style={[glStyles.cardIcon, glStyles.pdHrzn15]} />
          <Text style={glStyles.basicInfoTit}>Settings</Text>
        </View>
        <View style={[glStyles.flexRowStrt, glStyles.addPartLine]} onPress={optionSubmit}>
          <Ionicons name="settings-outline" size="24" style={[glStyles.cardIcon, glStyles.pdHrzn15]} />
          <Text style={glStyles.basicInfoTit}>Settings</Text>
        </View>
        <View style={styles.lineDesign} />
      </View>

    </MainFrame>
  );






}
const styles = StyleSheet.create({
  lineDesign: {
    height: 1,
    backgroundColor: "black",
    marginBottom: "3%",
    marginTop: "3%",
    opacity: 0.3,
  },
  container: {
    flex: 1,
  },
  content: {
    marginTop: "10%",
  },
  rowView: {
    flexDirection: "row",
  },
  statusImg: {
    width: "10%",
    height: "100%",
  },
});