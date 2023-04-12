import React, { Component, useState } from 'react';
import { View, Text, Button,StyleSheet,TextInput } from 'react-native';

export default function OtionSelectTwo ({ route }) {
    return (
        <View >
            <View >
                   <Text style={styles.topContainerTitle}>{route.params.num}</Text>
            </View>
              
        </View>
        
      
      
    );
  

}

const styles = StyleSheet.create({
  topContainerTitle:{
        fontSize: 20,
    },
});