import React, { Component, useState,useEffect } from 'react';
import {View, Text, Button,StyleSheet,TextInput,Dimensions,ActivityIndicator,Image, ImageBackground  } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';

const {width:SCREEN_WIDTH} = Dimensions.get('window');



export default function OptionSelect ({route,navigation}) {
    const optionTrigger = false;
    const [ok, setOptionName] = useState(0);
    const [changeOptionValue, optionValue] = useState("true");
    const [getOptionList, setOptionList] = useState([]);
    const [getOptionListTwo, setOptionListTwo] = useState([]);
    const [getNumberList, setNumberList] = useState([]);
    const isFocused = useIsFocused();
    
    let numberList = [   
        {optionName:"한명",
        optionUrl: require("./assets/images/one.png")}
        ,
        {optionName:"두명",
        optionUrl: require("./assets/images/two.png")}
        ,
        {optionName:"세명",
        optionUrl: require("./assets/images/three.png")}
        ,
        {optionName:"네명",
        optionUrl: require("./assets/images/four.png")}                    
    ];
    
    ////setRecommendUserList----격전 인원수 조정함수 함수///////
    const setRecommendUserList = async() =>{ 
       let gameTypePlusIndex = 0;
       let  ueserNum= gameTypePlusIndex+1;
       console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$44")
       console.log(ueserNum)

        
    };

    const optionChange = (index)=>{
      setOptionName(Math.floor(index/100)) 
    };

    ////serverGetOptionList----옵션리스트 서버에서 가져오기 함수///////
    const serverGetOptionList = async() =>{
        const gameType= route.params.gameType.cdDtlName 
        console.log(gameType)
        let gameTypePlusTwo = "";
        if(route.params.gameTypePlusTwo != "" ){
            gameTypePlusTwo = route.params.gameTypePlusTwo;
            console.log("gameTypePlusTwo@@@@@@@@@@@@@@@@@@@@@@@@@@@2") 
            console.log(gameTypePlusTwo)  
        }

        const response = await fetch (`http://192.168.1.4/hexa/gameMatching/selectMatchingOption.do?gameType=${gameType}&gameTypePlusTwo=${gameTypePlusTwo}`)
        const jsonOptionList = await response.json();
        for(var i=0; i<jsonOptionList.selectOptionList.length; i++){ 
          let tempUrl = `http://3.37.211.126:8080/tomcatImg/option/${jsonOptionList.selectOptionList[i].url}`;
          jsonOptionList.selectOptionList[i].url = tempUrl;
        }
        setOptionList(jsonOptionList.selectOptionList);
        
    };

    ////serverGetOptionList----옵션리스트 서버에서 가져오기 함수///////
    const serverGetOptionListForRank = async(gameTypePlusTwoTemp) =>{
        const gameType= route.params.gameType.cdDtlName 
        console.log(gameType)
        let gameTypePlusTwo = gameTypePlusTwoTemp;


        const response = await fetch (`http://3.37.211.126:8080/gameMatching/selectMatchingOption.do?gameType=${gameType}&gameTypePlusTwo=${gameTypePlusTwo}`)
        const jsonOptionList = await response.json();
        for(var i=0; i<jsonOptionList.selectOptionList.length; i++){ 
          let tempUrl = `http://3.37.211.126:8080/tomcatImg/option/${jsonOptionList.selectOptionList[i].url}`;
          jsonOptionList.selectOptionList[i].url = tempUrl;
        }
        setOptionListTwo(jsonOptionList.selectOptionList);
        
    };

    const optionSubmit = () => {
      let indexNumber = Math.floor((ok+1)/4);
      let userNumber = getNumberList[indexNumber].optionName;
      if(route.params.gameTypePlus == "" && route.params.gameType == "격전"){
        navigation.navigate('OptionSelect',{gameType: route.params.gameType
                                            ,gameTypePlus:userNumber
                                            ,gameTypePlusIndex:indexNumber
                                            },{navigation});
      }else if(route.params.gameTypePlus == "" && route.params.gameType.cdDtlName == "소환사의협곡" ){
        let optionOne = getOptionList[indexNumber].cdDtlName;
            console.log(optionOne)
            serverGetOptionListForRank(optionOne);
            navigation.navigate('OptionSelect',{gameType: route.params.gameType
                ,gameTypePlus:userNumber
                ,gameTypePlusIndex:indexNumber
                ,gameTypePlusTwo:optionOne
                },{navigation});    
      }else{
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.log(route.params.gameTypePlus)
        console.log(route.params.gameType.cdDtlName)
       
        let optionOne = getOptionList[indexNumber].cdDtlName;
        if(route.params.gameType.cdDtlName == "소환사의협곡"){
            optionOne = getOptionListTwo[indexNumber].cdDtlName;
        }
        navigation.navigate('OptionSelectDetail',{gameType: route.params.gameType
                                                    ,gameTypePlus:userNumber
                                                    ,gameTypePlus:indexNumber
                                                    ,optionOne: optionOne
                                                    ,optionOneArr:getOptionList[indexNumber]
                                                    ,getOptionList:getOptionList
                                                },{navigation});
      }
      
    };

    
    useEffect(() => {        
        serverGetOptionList();
        setNumberList(numberList);
        setRecommendUserList();
      },[isFocused]);
      if(route.params.gameType.cdDtlName ==="격전" && route.params.gameTypePlus !="" ){
        return (      
        <View style={styles.container} >
        <View style={styles.topContainer} >
            <Text style={styles.topContainerTitle}>매칭 옵션 선택</Text> 
        </View>
        <View style={styles.centerContainer} >
            <View style={styles.centerTopContainer}>
                <Text style={styles.centerContainerTitle}>격전</Text>
            </View>
            <View style={styles.centerBottomContainer}>
                   
            </View>
                </View> 
                <View style={styles.bottomContainer} >
                  <Button color={"black"} style={styles.choiceButton} onPress={optionSubmit} title='선택하기'></Button>
                </View>       
            </View>
            );                  
    }else if(route.params.gameTypePlusTwo =="랭크" ){
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
                    {getOptionListTwo.length === 0? (
                        <View >
                            <ActivityIndicator color="black" size="large"/>
                        </View>
                        ) : (
                            getOptionListTwo.map( (info, index) =>    
                            <View   key={index} style={styles.contentBottom}>
                                <View style={styles.itemBox}>
                                    <Text style={styles.itemBoxTitle} >{info.cdDtlName}</Text>
                                    <Image resizeMode='contain' style={styles.backImg} s source={{
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
              <Button color={"black"} style={styles.choiceButton} onPress={optionSubmit} title='선택하기'></Button>
            </View>       
        </View> 
            );                  
    }else if(route.params.gameType.cdDtlName ==="격전" || (route.params.gameType.cdDtlName ==="소환사의협곡" && route.params.gameTypePlusTwo ==="자유랭크" ) ){
        return (      
        <View style={styles.container} >
        <View style={styles.topContainer} >
            <Text style={styles.topContainerTitle}>매칭 옵션 선택</Text> 
        </View>
        <View style={styles.centerContainer} >
            <View style={styles.centerTopContainer}>
                <Text style={styles.centerContainerTitle}>매칭인원</Text>
            </View>
            <View style={styles.centerBottomContainer}>
                    <ScrollView pagingEnabled 
                                        horizontal
                                        onMomentumScrollEnd={(event) => {optionChange(event.nativeEvent.contentOffset.x)}}
                                        showsHorizontalScrollIndicator = {false}>
                                {numberList.length === 0? (
                                    <View >
                                        <ActivityIndicator color="black" size="large"/>
                                    </View>
                                    ) : (
                                        numberList.map( (info, index) =>    
                                        <View   key={index} style={styles.contentBottom}>
                                            <View style={styles.itemBox}>
                                                <Text style={styles.itemBoxTitle} >{info.cdDtlName}</Text>
                                                <Image resizeMode='contain' style={styles.backImg} s source={info.optionUrl}/>       
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
    }else{
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
                        {getOptionList.length === 0? (
                            <View >
                                <ActivityIndicator color="black" size="large"/>
                            </View>
                            ) : (
                                getOptionList.map( (info, index) =>    
                                <View   key={index} style={styles.contentBottom}>
                                    <View style={styles.itemBox}>
                                        <Text style={styles.itemBoxTitle} >{info.cdDtlName}</Text>
                                        <Image resizeMode='contain' style={styles.backImg} s source={{
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
                  <Button color={"black"} style={styles.choiceButton} onPress={optionSubmit} title='선택하기'></Button>
                </View>       
            </View>              
        
      
      
            );
        }
    
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
        height:"80%",
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