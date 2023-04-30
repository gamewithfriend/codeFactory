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
      for(let i =0; i<selectGameOtion.length; i++ ){
        if(selectGameOtion[i].optionName == route.params.optionOne ){
          selectGameOtion.splice(i, 1);
        }
      }
      optionValueTwo(selectGameOtion);
    };
    
    const optionChange = (index)=>{
      setOptionName(Math.floor(index/100))
    };

     const optionSubmit = () => {

      let indexNumber = Math.floor((ok+1)/4);
      let tempOptionValueTwo = changeOptionValueTwo[indexNumber].optionName;
      if(tempOptionValueTwo == "선택하지 않음"){
        alert("게임 매칭 시작");
      }
      console.log("조건1")
      console.log(route.params.optionOne)
      console.log("조건1-1")
      console.log(route.params.optionOneDetail)
      console.log("조건2")
      console.log(tempOptionValueTwo)
      console.log("----------OptionSelectTwo.js-------------Finsh------------------")
      navigation.navigate('OptionSelectTwoDetail',{  optionOne: route.params.optionOne
                                                    ,optionOneDetail: route.params.optionOneDetail
                                                    ,optionTwo:tempOptionValueTwo
                                                    ,optionValueBox: changeOptionValueTwo
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
                <View style={styles.bottomOptionContainer} >
              <Text style={styles.topContainerTitle}>지금까지 선택한 옵션</Text>
              <View style={styles.bottomOptionBoxContainer}>
                  {route.params.optionOne === undefined? (
                    <View style={styles.bottomOptionBox} >
                    </View>
                    ):(
                    <View style={styles.bottomOptionBox} >
                      <Text style={styles.bottomOptionTextTitle}>옵션1</Text>
                      <View style={styles.bottomOptionBoxText} >
                        <Text style={styles.bottomOptionText}>{route.params.optionOne}</Text>
                        <Text style={styles.bottomOptionText}>{route.params.optionOneDetail}</Text>
                      </View> 
                    </View>
                    )
                  }
                  {route.params.optionTwo === undefined? (
                    <View style={styles.bottomOptionBox} >
                    </View>
                    ):(
                    <View style={styles.bottomOptionBox} >
                      <Text style={styles.bottomOptionTextTitle}>옵션2</Text>
                      <View style={styles.bottomOptionBoxText} >
                        <Text style={styles.bottomOptionText}>{route.params.optionTwo}</Text>
                        <Text style={styles.bottomOptionText}>{route.params.optionTwoDetail}</Text>
                      </View> 
                    </View>
                    )
                  } 
              </View>
              <View style={styles.bottomOptionBoxContainer}>
                  {route.params.optionThree === undefined? (
                    <View style={styles.bottomOptionBox} >
                    </View>
                    ):(
                    <View style={styles.bottomOptionBox} >
                      <Text style={styles.bottomOptionTextTitle}>옵션3</Text>
                      <View style={styles.bottomOptionBoxText} >
                        <Text style={styles.bottomOptionText}>{route.params.optionThree}</Text>
                        <Text style={styles.bottomOptionText}>{route.params.optionThreeDetail}</Text>
                      </View> 
                    </View>
                    )
                  } 
                  {route.params.optionFour === undefined? (
                    <View style={styles.bottomOptionBox} >
                    </View>
                    ):(
                    <View style={styles.bottomOptionBox} >
                      <Text style={styles.bottomOptionTextTitle}>옵션4</Text>
                      <View style={styles.bottomOptionBoxText} >
                        <Text style={styles.bottomOptionText}>{route.params.optionFour}</Text>
                        <Text style={styles.bottomOptionText}>{route.params.optionFourDetail}</Text>
                      </View> 
                    </View>
                    )
                  } 
              </View>                   
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
    width:"100%",
    flexDirection:"row"
  },
    bottomContainer:{
    flex:1,
    alignItems:"center",
    borderColor:"black",
    borderStyle:"solid",
  },
  bottomOptionContainer:{
    flex:5,
    alignItems:"center",
    borderColor:"black",
    borderStyle:"solid",
  },
  bottomOptionTextTitle:{
    fontSize: 20,
    textAlign: 'center',
  },
  bottomOptionText:{
    fontSize: 14,
    textAlign: 'center',
  },
  bottomOptionBoxContainer:{
    flex:1,
    alignItems:"center",
    borderColor:"black",
    borderStyle:"solid",
    flexDirection:"row",
    marginTop:"2%"
  },
  bottomOptionBox:{
    flex:1,
    width:"50%",
    lignItems:"center",
    borderColor:"black",
    borderStyle:"solid",
  },
  bottomOptionBoxText:{
    flex:1,
    borderColor:"black",
    borderStyle:"solid",
    marginTop: "5%",
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
      height:"100%",
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
      height:"100%",
      opacity:0.7
  },
  itemBoxTitle:{
    marginBottom : '5%',
  },
});