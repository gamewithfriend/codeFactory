import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native';
import * as Session from './utils/session.js';

//이소망 추가
import MainFrame from './MainFrame';
import { glStyles } from './globalStyles';
import colors from './assets/colors/colors';
import { Ionicons } from '@expo/vector-icons';

export default function SettingScreen({ navigation }) {
  const optionSubmit = (e) => {
    navigation.navigate('MatchingHistoryScreen');
  };

  const goAccountScreen = () => {
    navigation.navigate('AccountScreen');
  };

  const logout = async () => {
    await Session.sessionClear("sessionInfo");

    navigation.navigate('HomeTab', {screen: 'Login'});
  };

  const mvLicenseScreen = async () => {
    // 라이센스 스크린으로 이동
    Alert.alert("License Screen Event!");
    // navigation.navigate('HomeTab', {screen: 'Login'});
  };

  return (
    <MainFrame>
      <View style={glStyles.pdHrzn15}>
        <Text style={glStyles.pageTit}>세팅</Text>
      </View>
      <View style={glStyles.basicList}>
        <View style={[glStyles.flexRowStrt, glStyles.addPartLine]} onStartShouldSetResponder={() => logout()}>
          <Ionicons name="settings-outline" size={24} style={[glStyles.cardIcon, glStyles.pdHrzn15]} />
          <Text style={glStyles.basicInfoTit}>Logout</Text>
        </View>
        <View style={[glStyles.flexRowStrt, glStyles.addPartLine]} onStartShouldSetResponder={() => mvLicenseScreen()}>
          <Ionicons name="settings-outline" size={24} style={[glStyles.cardIcon, glStyles.pdHrzn15]} />
          <Text style={glStyles.basicInfoTit}>License</Text>
        </View>
        {/* <View style={[glStyles.flexRowStrt, glStyles.addPartLine]} onPress={optionSubmit}>
          <Ionicons name="settings-outline" size={24} style={[glStyles.cardIcon, glStyles.pdHrzn15]} />
          <Text style={glStyles.basicInfoTit}>Settings</Text>
        </View>
        <View style={[glStyles.flexRowStrt, glStyles.addPartLine]} onPress={optionSubmit}>
          <Ionicons name="settings-outline" size={24} style={[glStyles.cardIcon, glStyles.pdHrzn15]} />
          <Text style={glStyles.basicInfoTit}>Settings</Text>
        </View>
        <View style={[glStyles.flexRowStrt, glStyles.addPartLine]} onPress={optionSubmit}>
          <Ionicons name="settings-outline" size={24} style={[glStyles.cardIcon, glStyles.pdHrzn15]} />
          <Text style={glStyles.basicInfoTit}>Settings</Text>
        </View> */}
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