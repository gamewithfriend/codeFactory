import React, { Component, useState } from 'react';
import { View, Text, Button,StyleSheet,TextInput } from 'react-native';

export default function FriendScreen ({navigation}) {
    return (
        <View >
            <View >
                   <Text style={styles.titleFont}>친구</Text>
            </View>
            <View >
              <View style={styles.profileImgView}>
                <Image resizeMode='cover' style={styles.backImg} source={info.optionUrl}/>                
              </View>
            </View>
              
        </View>
        
      
      
    );
  

}

const styles = StyleSheet.create({
      titleFont: {
        fontSize:30,
        marginTop:"10%",
        marginLeft:"5%",
      },
      profileImgView: {
        backgroundColor:"black",
        width:"100%",
      },

});