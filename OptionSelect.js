import React, { Component, useState } from 'react';
import {View, Text, Button,StyleSheet,TextInput,Dimensions,ActivityIndicator,Image, ImageBackground  } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const {width:SCREEN_WIDTH} = Dimensions.get('window');



export default function OptionSelect ({navigation}) {
    const optionTrigger = false;
    const [ok, setOptionName] = useState(0);
    const [changeOptionValue, optionValue] = useState("true");
    const selectGameOtion = [   
                                {optionName:"rank",
                                optionUrl: require("./assets/images/emblem-challenger.png"),
                                optionIndex : 0}
                                ,
                                {optionName:"champion",
                                optionUrl: require("./assets/images/chmapion/Irelia_0.jpg"),
                                optionIndex : 1}
                                ,
                                 {optionName:"position",
                                optionUrl: require("./assets/images/position/ADC-CHALLENGER.png"),
                                optionIndex : 2}
                                , 
                                {optionName:"자주하는시간",
                                optionUrl: require("./assets/images/chmapion/Zilean_0.jpg"),
                                optionIndex : 3}
                            ];
    
    const optionChange = (index)=>{
      setOptionName(Math.floor(index/100)) 
    };

    const optionSubmit = () => {
      
      let temp = "";
      if(ok == 0){   
         temp = "rank";   
      }else if(ok==3){
         temp = "champion";
      }else if(ok==7){
         temp = "position";
      }else if(ok==11){
         temp = "time";
      }
      
      navigation.navigate('OptionSelectDetail',{optionOne: temp},{navigation});
    };

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
                    <ScrollView pagingEnabled 
                                horizontal
                                onMomentumScrollEnd={(event) => {optionChange(event.nativeEvent.contentOffset.x)}}
                                showsHorizontalScrollIndicator = {false}>
                        {selectGameOtion.length === 0? (
                            <View >
                                <ActivityIndicator color="black" size="large"/>
                            </View>
                            ) : (
                            selectGameOtion.map( (info, index) =>    
                                <View   key={index} style={styles.contentBottom}>
                                    <View style={styles.itemBox}>
                                        <Text style={styles.itemBoxTitle} >{info.optionName}</Text>
                                        <Image resizeMode='cover' style={styles.backImg} source={info.optionUrl}/>       
                                    </View>  
                                </View>
                            )
                            )
                        }         
                    </ScrollView>
                    </View>
                </View> 
                <View style={styles.bottomContainer} >
                  <Button color={"black"} style={styles.choiceButton} onPress={optionSubmit} title='선택하기'></Button>
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
    bottomContainer:{
        flex:3,
        alignItems:"center",
        borderColor:"black",
        borderStyle:"solid",
    },
    topContainerTitle:{
        marginTop: "8%",
        fontSize: 20,
    },
    centerContainerTitle:{
        marginTop: "5%",    
        fontSize: 20,
    },
    contentBottom:{
        width:SCREEN_WIDTH,
        alignItems:"center",
        justifyContent:"center",
    },
    testWhiteText:{
        color:"red",
    },
    backImg:{
        flex:2,
        width:'90%',
        height:'100%',
    },
     itemBox:{
        width:"70%",
        height:"70%",
        alignItems:"center",
    },
    centerBottomContainer:{       
        flex:6,
        alignItems:"center",
        borderColor:"red",
        borderStyle:"solid",
        width:"100%",
    },
    itemBoxTitle:{
      marginBottom : '5%',
    },
    choiceButton:{
      opacity: 0.3,
      color:"black",
    },
});