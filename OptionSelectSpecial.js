import React, { Component, useEffect, useState } from 'react';
import { View, Text, Button,StyleSheet,TextInput,Dimensions,ActivityIndicator,Image  } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
const {width:SCREEN_WIDTH} = Dimensions.get('window');

export default function OptionSelectFour ({ route,navigation }) {
    const optionTrigger = false;
    const [ok, setOptionName] = useState(0);
    const [changeOptionValue, optionValue] = useState("true");
    const [changeOptionValueTwo, optionValueTwo] = useState([]);
    const [getUserReCommendList, setUserReCommendList] = useState([]);
    let tempOptionValueBox = [];                         
    const setSelectGameOtionTwo = async()=>{
      
      // console.log(route.params.gameType.cdDtlDesc)  소환사의협곡
      // console.log(route.params.gameTypePlus)  한명
      // console.log(route.params.gameTypePlusTwo) 일반
      let tempGameType = route.params.gameType.cdDtlDesc;
      let tempGameTypePlusTwo = route.params.gameTypePlusTwo;
      const response = await fetch (`http://hduo88.com/gameMatching/selectMatchingOption.do?gameType=${tempGameType}&gameTypePlusTwo=${tempGameTypePlusTwo}`)
        const jsonOptionList = await response.json();
        for(var i=0; i<jsonOptionList.selectOptionList.length; i++){ 
          let tempUrl = `http://hduo88.com/tomcatImg/option/${jsonOptionList.selectOptionList[i].url}`;
          jsonOptionList.selectOptionList[i].url = tempUrl;
        }
      optionValueTwo(jsonOptionList.selectOptionList);
    };

    const setUserList = ()=>{
      let tempUserNum = 0;
      switch (route.params.gameTypePlus) {
        case "한명":
          tempUserNum = 1;
          break;
        case "두명":
          tempUserNum = 2;  
          break;
        case "세명":
          tempUserNum = 3; 
          break;
        case "네명":
          tempUserNum = 4;
          break;
      }
      let userNumArr = [];
      userNumArr.length = tempUserNum;
      setUserReCommendList(userNumArr); 
    };

    const optionChange = (index)=>{
      setOptionName(Math.floor(index/100))
    };

     const optionSubmit = () => {
      let indexNumber = Math.floor((ok+1)/4);
      let tempOptionValueFour = changeOptionValueTwo[indexNumber].cdDtlName;
      if(tempOptionValueFour == "선택하지않음"){
        alert("게임 매칭 시작");
        navigation.navigate('GameMatching',{  0: route.params.optionOne
                                                    ,1: route.params.optionOneDetail
                                                    ,2:route.params.optionTwo
                                                    ,3:route.params.optionTwoDetail
                                                    ,4:route.params.optionThree
                                                    ,5:route.params.optionThreeDetail
                                                    // ,6:tempOptionValueFour                                                    
                                                    // ,optionValueBox: route.params.optionValueBox
                                                  },{navigation});
      }else{
        console.log("조건1")
        console.log(route.params.optionOne)
        console.log("조건1-1")
        console.log(route.params.optionOneDetail)
        console.log("조건2")
        console.log(route.params.optionTwo)
        console.log("조건2-2")
        console.log(route.params.optionTwoDetail)
        console.log("조건3")
        console.log(route.params.optionThree)
        console.log("조건3-3")
        console.log(route.params.optionThreeDetail)
        console.log("조건4")
        console.log(tempOptionValueFour)
        console.log("----------OptionSelectFour.js---------Finsh----------------------")
        console.log(route.params.optionValueBox)
        navigation.navigate('OptionSelectFourDetail',{  optionOne: route.params.optionOne
                                                      ,optionOneDetail: route.params.optionOneDetail
                                                      ,optionTwo:route.params.optionTwo
                                                      ,optionTwoDetail:route.params.optionTwoDetail
                                                      ,optionThree:route.params.optionThree
                                                      ,optionThreeDetail:route.params.optionThreeDetail
                                                      ,optionFour:tempOptionValueFour
                                                      ,optionFourArr:changeOptionValueTwo[indexNumber]
                                                      ,optionValueBox: route.params.optionValueBox
                                                    },{navigation});
      }
      
    };

     useEffect(() => {
      setSelectGameOtionTwo();
      setUserList();
    },[]);                        
    return (
        <View style={styles.container} >
                <View style={styles.topContainer} >
                    <Text style={styles.topContainerTitle}>매칭 옵션 선택</Text> 
                </View>
                
                <View style={styles.bottomOptionContainer} >
                  <View style={styles.bottomOptionContainerTitleBox} >
                    <Text style={styles.topContainerTitle}>추천 유저 포지션 결정</Text>
                  </View>
                  <View >
                  {getUserReCommendList.length === 0? (
                            <View >
                                <ActivityIndicator color="black" size="large"/>
                            </View>
                            ) : (
                              getUserReCommendList.map( (info, index) =>    
                                <View key={index}   >
                                    <View style={glStyles.cardItems2}>
                                      <Text>Test{index}</Text>
                                    </View>
                                </View>
                              )
                            )
                  }
                  </View>                 
                </View>
                <View style={styles.centerContainer} >
                    <View style={styles.centerTopContainer}>
                        <Text style={styles.centerContainerTitle}>조건4</Text>
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
                                        <Text style={styles.itemBoxTitle} >{info.cdDtlName}</Text>
                                        <Image style={styles.backImg} source={{
                                                uri: `${info.url}`,
                                              }}/>       
                                    </View>  
                                </View>
                            )
                            )
                        }         
                    </ScrollView>
                    </View>
                </View> 
                <View style={styles.bottomContainer} >
                  <Button color={"black"} onPress={optionSubmit} title='선택하기'></Button>
                </View>                    
            </View>  
        
      
      
    );
  

}

const styles = StyleSheet.create({
   container:{
    flex:1,
  },
  lineDesign:{
    height: 1, 
    backgroundColor: "black", 
    marginBottom: "3%",
    marginTop: "3%",
    opacity:0.3,
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
    borderColor:"black",
    borderStyle:"solid",
  },
  bottomOptionContainerTextBox:{
    flex:11,
    borderColor:"black",
    borderStyle:"solid",
    paddingLeft:"7%",
    paddingRight:"7%",
  },
  bottomOptionContainerTextInnerBox:{
    borderColor:"black",
    borderStyle:"solid",
    flexDirection:"row",
  },
  bottomOptionContainerTitleBox:{
    flex:5,
    borderColor:"black",
    alignItems:"center",
    borderStyle:"solid",
    marginTop:"3%",
  },
  bottomOptionTextTitle:{
    fontSize: 20,
    textAlign: 'center',
  },
  indexText:{
    alignItems:"center",
    marginLeft: "5%",
  },
  leftText:{
    marginLeft: "15%",
    width:"30%"
  },
  centerText:{
  },
  bottomOptionText:{
    fontSize: 14,
    textAlign: 'center',
  },
  bottomOptionInnerText:{
    fontSize: 14,
  },
   bottomOptionInnerCenterText:{
    fontSize: 14,
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
  centerText:{
  },
});