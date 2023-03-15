import React, { Component, useState } from 'react';
import { View, Text, Button,StyleSheet,TextInput,Dimensions,Image, ImageBackground } from 'react-native';

// const {width:SCREEN_WIDTH} = Dimensions.get('window');

export default function First ({navigation}) {
    setTimeout(() => {
        navigation.navigate("MAIN");
      }, 2000);
    return (
        <View style={styles.container}>
          <ImageBackground resizeMode="stretch" source={require('./assets/images/main.jpg')} style={styles.backImg}></ImageBackground>
        </View>
      
      
    );
    
}
const styles = StyleSheet.create({
    backImg:{
        flex:1,
        width:'100%',
        height:610,
        opacity:0.7
      },
});