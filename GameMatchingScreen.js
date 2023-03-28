import React, { Component, useState ,useEffect} from 'react';
import { ScrollView, View, Text, Button,StyleSheet,TextInput,Dimensions } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const {width:SCREEN_WIDTH} = Dimensions.get('window');

export default function GameMatchingScreen ({navigation}) {
    
    const getUserData = async() =>{
        const response = await fetch (`http://3.37.211.126:8080/common/test.do?id=aabc&pw=bbccc%27).then(response`);
        const json = await response.json();       
        console.log(json)
      };
    useEffect(() => {
        getUserData();
    },[]);
    return (
        <View style={styles.container} >
            <View style={styles.topContainer}>

            </View>
            <View style={styles.bottomContainer}>
                    <View style={styles.titleBorder}> 
                        <Text >GameMatching</Text>
                    </View>
                    <ScrollView pagingEnabled horizontal contentContainerStyle={styles.contentBorder}>
                        <View style={styles.itemBox}>
                            <Text>1</Text>
                        </View>
                        <View style={styles.itemBox}>
                            <Text>2</Text>
                        </View>
                        <View style={styles.itemBox}>
                            <Text>3</Text>
                        </View>
                    </ScrollView>                  
            </View>
              
        </View>
        
      
      
    );
  

}

const styles = StyleSheet.create({
    container:{
      flex:1,
    },
    topContainer:{
        borderStyle:"solid",
        borderColor:"black",
        borderWidth:2,
        flex:5,
        alignItems:"center",
    },
    bottomContainer:{
        borderStyle:"solid",
        borderColor:"red",
        borderWidth:2,
        flex:3,
        alignItems:"center",
    },
    contentContainer:{
      flex:1,
      borderColor: "black",  
    },
    titleBorder:{
        borderStyle:"solid",
        borderColor:"black",
        borderWidth:2,
        width: "100%",
        alignItems:"center",
        height:"10%",
    },
    contentBorder:{        
        borderStyle:"solid",
        borderColor:"black",
        borderWidth:2,
        width: "100%",
        height:"40%"
    },
    itemBox:{
        borderStyle:"solid",
        borderColor:"black",
        borderWidth:2,
        width:SCREEN_WIDTH,
    },
  });