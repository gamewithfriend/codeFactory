import React, { Component, useState, useEffect } from 'react';
import { View, Text, Button,StyleSheet,TextInput, Alert,TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import *  as Device from 'expo-device';
import * as Network from 'expo-network';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SetNickNameScreen ({navigation}) {




    return (
        <View>
            {/* <TouchableOpacity style={styles.button} disabled={!request} title="Google Login" onPress={() => {promptAsync();}}>
                <Text style={styles.buttonText}>Google 로그인</Text>
            </TouchableOpacity>
            <Text style={styles.text}>GameWithFriend 어플리케이션은 Google 로그인만을 지원합니다.</Text> */}

            <Text>TEST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</Text>
        </View>
    );
}