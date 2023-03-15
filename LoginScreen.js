import React, { Component, useState } from 'react';
import { View, Text, Button,StyleSheet,TextInput } from 'react-native';


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
        <View style={styles.container}>
            <View>
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
    } 
  });

