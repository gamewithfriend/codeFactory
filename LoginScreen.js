import React, { Component, useState, useEffect } from 'react';
import { View, Text, Button,StyleSheet,TextInput, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';


WebBrowser.maybeCompleteAuthSession();
const expoClientId = '1078327323794-hqr8b6qj7lkcdtkr9snucrb5aca6lkmq.apps.googleusercontent.com';
const iosClientId = '1078327323794-t3nm7kvjmvdg2gkac69ldninie81gkvr.apps.googleusercontent.com';
const androidClientId = '1078327323794-t3nm7kvjmvdg2gkac69ldninie81gkvr.apps.googleusercontent.com';

export default function MainScreen ({navigation}) {
    const [token, setToken] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: expoClientId,
        iosClientId: iosClientId,
        androidClientId: androidClientId,
        webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
      });
    
      useEffect(() => {
        if (response?.type === 'success') {
            setToken(response.authentication.accessToken);
            getUserInfo();
          }
      }, [response, token]);

    const getUserInfo = async () => {
    try {
        const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
            headers: { Authorization: `Bearer ${token}` },
        }
        );

        const user = await response.json();
        
        setUserInfo(user);
        
        console.log(userInfo);
        if (userInfo != null) {
            setLoaded(true);
        }
        console.log(loaded);

    } catch (error) {
        Alert.alert("Error!");
    }
    };

    const [id, setid] = useState("");
    const [passWord, setpassWord] = useState("");
    const onChangeid = (payload)=>setid(payload);
    const onChangepassWord = (payload)=>setpassWord(payload);
    const sendApi = ()=>{
        alert(id);
        alert(passWord);
        navigation.navigate("DETAIL");
    };

    return (
        <View style={styles.container}>
            <View style>
                <TextInput
                onSubmitEditing={sendApi} 
                onChangeText={onChangeid}
                value={id} 
                placeholder={"id"} 
                style={styles.input}/>             
            </View>
            <View>
                <TextInput 
                onSubmitEditing={sendApi}
                onChangeText={onChangepassWord}
                value={passWord}  
                placeholder={"passWord"} 
                style={styles.input}/>               
            </View>
            <View>
                <Text style={{fontSize:30}}>Main Screen</Text>
                <Button onPress={sendApi} title='Go Detail Screen'/>
            </View>
            <Button
            disabled={!request}
            title="Google Login"
            onPress={() => {
                promptAsync();
                }}
            />
            {loaded ? <Text>Google ID : {userInfo.name}</Text> : <Text>No sync!!</Text>}
            
        </View>
    );
  

}

const styles = StyleSheet.create({
    input: {
        backgroundColor:"white",
        paddingVertical:15,
        paddingHorizontal:20,
        borderRadius:30,
        marginTop:20,
        fontSize:15
    },

  });

