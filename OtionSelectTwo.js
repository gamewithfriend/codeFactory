import React, { Component, useState } from 'react';
import { ScrollView, View, Text, Button,StyleSheet,TextInput,Dimensions,ActivityIndicator,Image, ImageBackground  } from 'react-native';





export default function OtionSelectTwo ({ route }) {
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                   <Text style={styles.topContainerTitle}>{route.params.num}</Text>
            </View>
            <View style={styles.centerContainer} >
              <View style={styles.centerTopContainer}>
              {route.params.num ==="rank" ? (
                <Text style={styles.topContainerTitleTest}>Test1</Text>
                ) : (
                <View>
                  <View style={styles.centerBottomContainer}>
                    <View style={styles.itemBox}>
                      <Image style={styles.backImg} source={require('./assets/images/chmapion/Aatrox_0.jpg')}/>
                    </View>
                    <View style={styles.itemBox}>
                      <Image style={styles.backImg} source={require('./assets/images/chmapion/Ahri_0.jpg')}/>
                    </View>
                    <View style={styles.itemBox}>
                      <Image style={styles.backImg} source={require('./assets/images/chmapion/Akali_0.jpg')}/>
                    </View>
                    <View style={styles.itemBox}>
                      <Image style={styles.backImg} source={require('./assets/images/chmapion/Akshan_0.jpg')}/>
                    </View>
                  </View>
                  <View style={styles.centerBottomContainer}>
                    <View style={styles.itemBox}>
                      <Image style={styles.backImg} source={require('./assets/images/chmapion/Alistar_0.jpg')}/>
                    </View>
                    <View style={styles.itemBox}>
                      <Image style={styles.backImg} source={require('./assets/images/chmapion/Amumu_0.jpg')}/>
                    </View>
                    <View style={styles.itemBox}>
                      <Image style={styles.backImg} source={require('./assets/images/chmapion/Anivia_0.jpg')}/>
                    </View>
                    <View style={styles.itemBox}>
                      <Image style={styles.backImg} source={require('./assets/images/chmapion/Annie_0.jpg')}/>
                    </View>
                  </View>
                  <View style={styles.centerBottomContainer}>
                    <View style={styles.itemBox}>
                      <Image style={styles.backImg} source={require('./assets/images/chmapion/Ashe_0.jpg')}/>
                    </View>
                    <View style={styles.itemBox}>
                      <Image style={styles.backImg} source={require('./assets/images/chmapion/AurelionSol_0.jpg')}/>
                    </View>
                    <View style={styles.itemBox}>
                      <Image style={styles.backImg} source={require('./assets/images/chmapion/Azir_0.jpg')}/>
                    </View>
                    <View style={styles.itemBox}>
                      <Image style={styles.backImg} source={require('./assets/images/chmapion/Bard_0.jpg')}/>
                    </View>
                  </View>
                  <View style={styles.centerBottomContainer}>
                    <View style={styles.itemBox}>
                      <Image style={styles.backImg} source={require('./assets/images/chmapion/Belveth_0.jpg')}/>
                    </View>
                    <View style={styles.itemBox}>
                      <Image style={styles.backImg} source={require('./assets/images/chmapion/Blitzcrank_0.jpg')}/>
                    </View>
                    <View style={styles.itemBox}>
                      <Image style={styles.backImg} source={require('./assets/images/chmapion/Brand_0.jpg')}/>
                    </View>
                    <View style={styles.itemBox}>
                      <Image style={styles.backImg} source={require('./assets/images/chmapion/Braum_0.jpg')}/>
                    </View>
                  </View>
                </View>
                  
                )
              
              }
              </View>
            </View>
            <View style={styles.bottomContainer} >
              <Button title='선택하기'></Button>
            </View>   
        </View>
        
      
      
    );
  

}

const styles = StyleSheet.create({
  topContainerTitle:{
    fontSize: 20,
  },
  topContainerTitleTest:{
    fontSize: 50,
    color:"red",
  },
  topContainer:{       
    flex:1,
    alignItems:"center",
    marginTop: "8%",       
  },
  container:{
    flex:1,
  },
  centerContainer:{       
    flex:6,
    alignItems:"center",
    borderColor:"black",
    borderStyle:"solid",
        
  },
  centerTopContainer:{       
    flex:1,
    alignItems:"center",
    borderColor:"black",
    borderStyle:"solid",
    width:"100%",
  },
  centerBottomContainer:{       
    flex:5,
    alignItems:"center",
    width:"100%",
    flexDirection:"row"
  },
  bottomContainer:{
    flex:3,
    alignItems:"center",
    borderColor:"black",
    borderStyle:"solid",
  },
  itemBox:{
    width:"20%",
    height:"60%",
    margin: "3%",
  },
  backImg:{
    width:'100%',
    height:'100%',
  },
});