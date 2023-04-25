import React, { Component, useEffect, useState } from 'react';
import { ScrollView, View, Text, Button,StyleSheet,TextInput,Dimensions,ActivityIndicator,Image, ImageBackground ,TouchableOpacity  } 
from 'react-native';

const {width:SCREEN_WIDTH} = Dimensions.get('window');

export default function OtionSelectThree ({ route }) {
    const optionTrigger = false;
    const [ok, setOptionName] = useState(1);
    const [changeOptionValue, optionValue] = useState("true");
    const selectGameOtion = [   
                                {optionName:"rank",
                                optionUrl: require("./assets/images/emblem-challenger.png")}
                                ,
                                {optionName:"champion",
                                optionUrl: require("./assets/images/chmapion/Irelia_0.jpg")}
                            ]; 
    const [changeOptionValueTwo, optionValueTwo] = useState([]);
                            
    const setSelectGameOtionTwo = ()=>{
      console.log("조건1")
      console.log(route.params.optionOne)
      console.log("조건2")
      console.log(route.params.optionTwo)
      optionValueTwo(selectGameOtion);
    };
    
    const optionChange = (index)=>{
      setOptionName(index)
      console.log(ok) 
    };

     useEffect(() => {
      setSelectGameOtionTwo();
    },[]);                        
    return (
        <View style={styles.container} >
                <View style={styles.topContainer} >
                    <Text style={styles.topContainerTitle}>매칭 옵션 선택</Text> 
                </View>
                <View style={styles.centerContainer} >
                    <View style={styles.centerTopContainer}>
                        <Text style={styles.centerContainerTitle}>조건2</Text>
                    </View>
                    <View style={styles.centerBottomContainer}>
                    <ScrollView pagingEnabled 
                                horizontal 
                                showsHorizontalScrollIndicator = {false}>
                        {selectGameOtion.length === 0? (
                            <View >
                                <ActivityIndicator color="black" size="large"/>
                            </View>
                            ) : (
                            selectGameOtion.map( (info, index) =>    
                                <View onTouchMove={text => optionChange(index)}  key={index} style={styles.contentBottom}>
                                    <View style={styles.itemBox}>
                                        <Text style={styles.itemBoxTitle} >{info.optionName}</Text>
                                        <Image style={styles.backImg} source={info.optionUrl}/>       
                                    </View>  
                                </View>
                            )
                            )
                        }         
                    </ScrollView>
                    </View>
                </View> 
                <View style={styles.bottomContainer} >
                  <Button  title='선택하기'></Button>
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
    centerBottomContainer:{       
        flex:5,
        alignItems:"center",
        borderColor:"red",
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
    itemBox:{
        width:"50%",
        height:"80%",
        alignItems:"center",
        borderRadius:30,
    },
    testWhiteText:{
        color:"red",
    },
    backImg:{
        flex:1,
        width:'100%',
        height:610,
        opacity:0.7
    },
    itemBoxTitle:{
      marginBottom : '5%',
    },
});