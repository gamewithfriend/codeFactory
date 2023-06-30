import React, { Component, useEffect, useState } from 'react';
import { View, Text, Button,StyleSheet,TextInput,Dimensions,ActivityIndicator,Image  } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
const {width:SCREEN_WIDTH} = Dimensions.get('window');

export default function OptionSelectTwo ({ route,navigation }) {
    const optionTrigger = false;
    const [ok, setOptionName] = useState(0);
    const [changeOptionValue, optionValue] = useState("true");
    const [changeOptionValueTwo, optionValueTwo] = useState([]);
    const [getOptionList, setOptionList] = useState([]);
                            
    const setSelectGameOtionTwo = (tempOptionList)=>{
      for(let i =0; i<tempOptionList.length; i++ ){
        if(tempOptionList[i].cdDtlName == route.params.optionOne ){
          tempOptionList.splice(i, 1);
        }
      }
      optionValueTwo(tempOptionList);
    };

    ////serverGetOptionList----옵션리스트 서버에서 가져오기 함수///////
    const serverGetOptionList = async() =>{
      const gameType= route.params.gameType.cdDtlName;  
      const response = await fetch (`http://3.37.211.126:8080/gameMatching/selectMatchingOption.do?gameType=${gameType}`)
      const jsonOptionList = await response.json();
      for(var i=0; i<jsonOptionList.selectOptionList.length; i++){ 
        let tempUrl = `http://3.37.211.126:8080/tomcatImg/option/${jsonOptionList.selectOptionList[i].url}`;
        jsonOptionList.selectOptionList[i].url = tempUrl;
      }
      setOptionList(jsonOptionList.selectOptionList);
      let tempOptionList = jsonOptionList.selectOptionList;
      setSelectGameOtionTwo(tempOptionList);
   };

    
    const optionChange = (index)=>{
      setOptionName(Math.floor(index/100))
    };
    const backOption = (index)=>{
      switch(index) {
        case 1: 
          navigation.navigate('OptionSelect',route.params,{navigation});
        case 2: 
          navigation.navigate('OptionSelectDetail',route.params,{navigation});
      }
      
    }; 

     const optionSubmit = () => {
      let indexNumber = Math.floor((ok+1)/4);
      let tempOptionValueTwo = changeOptionValueTwo[indexNumber].cdDtlName;
      if(tempOptionValueTwo == "선택하지 않음"){
        alert("게임 매칭 시작");
        navigation.navigate('GameMatching',{  0: route.params.optionOne
                                                    ,1: route.params.optionOneDetail
                                                    ,2:tempOptionValueTwo
                                                    ,optionValueBox: changeOptionValueTwo
                                                  },{navigation});
      }else{
        console.log("조건1")
        console.log(route.params.optionOne)
        console.log("조건1-1")
        console.log(route.params.optionOneDetail)
        console.log("조건2")
        console.log(tempOptionValueTwo)
        console.log("----------OptionSelectTwo.js-------------Finsh------------------")
        console.log(changeOptionValueTwo[indexNumber])
        navigation.navigate('OptionSelectTwoDetail',{  optionOne: route.params.optionOne
                                                      ,optionOneDetail: route.params.optionOneDetail
                                                      ,optionTwo:tempOptionValueTwo
                                                      ,optionTwoArr:changeOptionValueTwo[indexNumber]
                                                      ,optionValueBox: changeOptionValueTwo
                                                    },{navigation});
      }
      
    };

     useEffect(() => {
      serverGetOptionList();   
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
                <View style={styles.bottomOptionContainer} >
                  <View style={styles.bottomOptionContainerTitleBox} >
                    <Text style={styles.topContainerTitle}>지금까지 선택한 옵션</Text>
                  </View>
                  <View style={styles.bottomOptionContainerTextBox} >
                   {route.params.optionOne === undefined? (
                      <View>
                      </View>
                      ):(
                        <View>
                          <View style={styles.bottomOptionContainerTextInnerBox} >
                            <View style={styles.indexText}>
                              <Text style={styles.bottomOptionInnerText}>1</Text>
                            </View>
                            <View onStartShouldSetResponder={() =>backOption(1)} style={styles.leftText}>
                              <Text style={styles.bottomOptionInnerCenterText}>{route.params.optionOne}:</Text>
                            </View>
                            <View onStartShouldSetResponder={() =>backOption(2)} style={styles.centerText}>
                              <Text style={styles.bottomOptionInnerCenterText}>{route.params.optionOneDetail}</Text>
                            </View> 
                          </View>
                          <View style={styles.lineDesign} />           
                        </View>           
                      )
                   }
                     {route.params.optionTwo === undefined? (
                        <View>
                        </View>
                        ):(
                          <View> 
                            <View style={styles.bottomOptionContainerTextInnerBox} >
                              <View style={styles.indexText}>
                                <Text style={styles.bottomOptionInnerText}>2</Text>
                              </View>
                              <View  style={styles.leftText}>
                                <Text style={styles.bottomOptionInnerCenterText}>{route.params.optionTwo}:</Text>
                              </View>
                              <View style={styles.centerText}>
                                <Text style={styles.bottomOptionInnerCenterText}>{route.params.optionTwoDetail}</Text>
                              </View>
                            </View>
                            <View style={styles.lineDesign} /> 
                          </View>
                        )
                     }
                    {route.params.optionThree === undefined? (
                        <View>
                        </View>
                      ):(
                        <View>
                          <View style={styles.bottomOptionContainerTextInnerBox} >
                            <View style={styles.indexText}>
                              <Text style={styles.bottomOptionInnerText}>3</Text>
                            </View>
                            <View style={styles.leftText}>
                              <Text style={styles.bottomOptionInnerCenterText}>{route.params.optionThree}:</Text>
                            </View>
                            <View style={styles.centerText}>
                              <Text style={styles.bottomOptionInnerCenterText}>{route.params.optionThreeDetail}</Text>
                            </View>                          
                          </View>
                          <View style={styles.lineDesign} />    
                        </View>
                      )
                    }
                     {route.params.optionFour === undefined? (
                        <View>
                        </View>
                        ):(
                            <View>
                              <View style={styles.bottomOptionContainerTextInnerBox} >
                                <View style={styles.indexText}>
                                  <Text style={styles.bottomOptionInnerText}>4</Text>
                                </View>
                                <View style={styles.leftText}>
                                  <Text style={styles.bottomOptionInnerCenterText}>{route.params.optionFour}:</Text>
                                </View>
                                <View style={styles.centerText}>
                                  <Text style={styles.bottomOptionInnerCenterText}>{route.params.optionFourDetail}</Text>
                                </View>
                              </View>
                              <View style={styles.lineDesign} />    
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
    flex:8,
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
    flex:1,
    alignItems:"center",
    borderColor:"black",
    borderStyle:"solid",
  },
  bottomOptionContainer:{
    flex:3,
    borderColor:"black",
    borderStyle:"solid",
  },
  bottomOptionContainerTextBox:{
    flex:6,
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
    flex:6,
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
  testWhiteText:{
      color:"red",
  },
  backImg:{
        width:'100%',
        height:'100%',
  },
  itemBox:{
        width:"50%",
        height:"50%",
        alignItems:"center",
  },
  centerBottomContainer:{       
        flex:8,
        alignItems:"center",
        width:"100%",

  },
  itemBoxTitle:{
    marginBottom : '5%',
  },
});