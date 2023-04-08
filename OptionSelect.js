import React, { Component, useState } from 'react';
import { View, Text, Button,StyleSheet,TextInput } from 'react-native';

export default function optionSelect ({navigation}) {
    return (      
            <View style={styles.container} >
                <View style={styles.topContainer} >
                    <Text style={styles.topContainerTitle}>매칭 옵션 선택</Text> 
                </View>
                <View style={styles.centerContainer} >
                    <View style={styles.centerTopContainer}>
                        <Text style={styles.centerContainerTitle}>조건1</Text>
                    </View>
                    <View style={styles.centerBottomContainer}>

                    </View>
                </View> 
                <View style={styles.bottomContainer} >
                </View>       
            </View>              
        
      
      
    );
  

}

const styles = StyleSheet.create({
    container:{
      flex:1,
    },
    topContainer:{       
        flex:1,
        alignItems:"center",
        borderColor:"black",
        borderStyle:"solid",
        borderWidth:"2",
    },
    centerContainer:{       
        flex:6,
        alignItems:"center",
        borderColor:"black",
        borderStyle:"solid",
        borderWidth:"2", 
    },
    centerTopContainer:{       
        flex:1,
        alignItems:"center",
        borderColor:"black",
        borderStyle:"solid",
        borderWidth:"2",
        width:"100%",
    },
    centerBottomContainer:{       
        flex:5,
        alignItems:"center",
        borderColor:"red",
        borderStyle:"solid",
        borderWidth:"2",
        width:"100%",
    },
    bottomContainer:{
        flex:3,
        alignItems:"center",
        borderColor:"black",
        borderStyle:"solid",
        borderWidth:"2",
    },
    topContainerTitle:{
        marginTop: "8%",
        fontSize: 20,
    },
    centerContainerTitle:{
        marginTop: "5%",    
        fontSize: 20,
    },
});