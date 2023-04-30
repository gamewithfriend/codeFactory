import React, { Component, useEffect, useState } from 'react';
import { View, Text, Button,StyleSheet,TextInput,Dimensions,ActivityIndicator,Image  } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
const {width:SCREEN_WIDTH} = Dimensions.get('window');

export default function OptionSelectTwo ({ route,navigation }) {
    const optionTrigger = false;
    const [ok, setOptionName] = useState(0);
    const [changeOptionValue, optionValue] = useState("true");
    let selectGameOtion = [   
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
                                {optionName:"time",
                                optionUrl: require("./assets/images/chmapion/Zilean_0.jpg"),
                                optionIndex : 3}
                                , 
                                {optionName:"선택하지 않음",
                                optionUrl: require("./assets/images/not_option.png"),
                                optionIndex : 4}
                            ]; 
    const [changeOptionValueTwo, optionValueTwo] = useState([]);
                            
    const setSelectGameOtionTwo = ()=>{
      console.log("조건1")
      console.log(route.params.optionOne)
      console.log("조건1-Detail")
      console.log(route.params.optionOneDetail)
      for(let i =0; i<selectGameOtion.length; i++ ){
        if(selectGameOtion[i].optionName == route.params.optionOne ){
          selectGameOtion.splice(i, 1);
          console.log(selectGameOtion)
        }
      }
      optionValueTwo(selectGameOtion);
    };
    
    const optionChange = (index)=>{
      setOptionName(Math.floor(index/100))
      console.log(ok) 
    };

     const optionSubmit = () => {
      
       console.log(ok)
       console.log(changeOptionValueTwo)
       let indexNumber = (ok+1)/4;
       let tempOptionValueTwo = changeOptionValueTwo[indexNumber].optionName;
       console.log(tempOptionValueTwo)
       if(tempOptionValueTwo == "선택하지 않음"){
         alert("게임 매칭 시작");
       }
      navigation.navigate('OptionSelectTwoDetail',{  optionOne: route.params.optionOne
                                                    ,optionOneDetail: route.params.optionOneDetail
                                                    ,optionTwo:tempOptionValueTwo
                                                  },{navigation});
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
                                onMomentumScrollEnd={(event) => {optionChange(event.nativeEvent.contentOffset.x)}} 
                                showsHorizontalScrollIndicator = {false}>
                        {changeOptionValueTwo.length === 0? (
                            <View >
                                <ActivityIndicator color="black" size="large"/>
                            </View>
                            ) : (
                            changeOptionValueTwo.map( (info, index) =>    
                                <View key={index} style={styles.contentBottom}>
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
                  <Button onPress={optionSubmit} title='선택하기'></Button>
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