import React, { Component, useState } from 'react';
import { View, Text, Button,StyleSheet,TextInput } from 'react-native';
import GameMatchingScreen from './GameMatchingScreen';
export default function MainScreen ({navigation}) {
    
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
        <View style={styles.mainContainer}>
            <View style={styles.testClick}>
                   
            </View>
            <View style={styles.testClickCenter}>
                <Button color={"black"} title='매칭' onPress={()=> navigation.navigate('GameMatching')}   style={styles.clickButton}>
                    
                </Button>
            </View>
            <View style={styles.testClick}>

            </View>
              
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
    testClick: {
        borderColor:"black",
        borderStyle:"solid",
        borderWidth:"2",
        flex:1,
    },
    mainContainer: {
        flex:1,
    },
    testClickCenter: {
        borderColor:"black",
        borderStyle:"solid",
        borderWidth:"2",
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    clickButton:{
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"black",
        borderRadius:"40",       
    },
    whiteTitle:{
        fontSize:20,
        color:"white"
    },

  });

