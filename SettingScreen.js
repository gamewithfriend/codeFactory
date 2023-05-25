import React, { Component, useState } from 'react';
import { View, Text, Button,StyleSheet,TextInput,Image } from 'react-native';

export default function SettingScreen ({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
              <View style={styles.rowView}>
                   <Image resizeMode='contain' style={styles.statusImg} 
                    source={require("./assets/images/bell.png")}/>     
                   <Text>LogOut</Text>
              </View>
              <View style={styles.lineDesign} />
              <View style={styles.rowView}>
                   <Image resizeMode='contain' style={styles.statusImg} 
                    source={require("./assets/images/bell.png")}/>     
                   <Text>LogOut</Text>
              </View>
              <View style={styles.lineDesign} /> 
              <View style={styles.rowView}>
                   <Image resizeMode='contain' style={styles.statusImg} 
                    source={require("./assets/images/bell.png")}/>     
                   <Text>LogOut</Text>
              </View>
              <View style={styles.lineDesign} /> 
              <View style={styles.rowView}>
                   <Image resizeMode='contain' style={styles.statusImg} 
                    source={require("./assets/images/bell.png")}/>     
                   <Text>LogOut</Text>
              </View>
              <View style={styles.lineDesign} /> 
              <View style={styles.rowView}>
                   <Image resizeMode='contain' style={styles.statusImg} 
                    source={require("./assets/images/bell.png")}/>     
                   <Text>LogOut</Text>
              </View>
              <View style={styles.lineDesign} />   
            </View>
           
        </View>
        
      
      
    );
  

}
const styles = StyleSheet.create({
  lineDesign:{
    height: 1, 
    backgroundColor: "black", 
    marginBottom: "3%",
    marginTop: "3%",
    opacity:0.3,
  },
  container:{
    flex:1,
  },
  content:{
    marginTop:"10%",
  },
  rowView:{
    flexDirection:"row",
  },
  statusImg: {
    width:"10%",
    height:"100%",    
  },
});