import React, { Component, useState } from 'react';
import { View, Text, Button,StyleSheet,TextInput } from 'react-native';

export default function FriendScreen ({navigation}) {
    return (
        <View >
            <View >
                   <Text style={styles.titleFont}>친구</Text>
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

});