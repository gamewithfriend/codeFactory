import React, { Component, useEffect, useState } from 'react';
import { View, Text, Button,StyleSheet,TextInput,Dimensions,ActivityIndicator,Image, ImageBackground ,TouchableOpacity  } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const {width:SCREEN_WIDTH} = Dimensions.get('window');


export default function OptionSelectFourDetail ({ route,navigation }) {
    
    const [ok, setOptionName] = useState(1);
    const [championList, setChampionList] = useState([]);
    const [optionList, setOptionList] = useState([]);
    const [getChampionSelect, setChampionSelect] = useState("");
    let reChampionList = [];
    let rankList = [   
                                {optionName:"unRank",
                                optionUrl: require("./assets/images/emblem-challenger.png")}
                                ,
                                {optionName:"brozne",
                                optionUrl: require("./assets/images/rank/emblem-bronze.png")}
                                ,
                                {optionName:"silver",
                                optionUrl: require("./assets/images/rank/emblem-silver.png")}
                                ,
                                {optionName:"gold",
                                optionUrl: require("./assets/images/rank/emblem-gold.png")}
                                ,
                                {optionName:"platinum",
                                optionUrl: require("./assets/images/rank/emblem-platinum.png")}
                                ,
                                {optionName:"diamond",
                                optionUrl: require("./assets/images/rank/emblem-diamond.png")}
                                ,
                                {optionName:"master",
                                optionUrl: require("./assets/images/rank/emblem-master.png")}
                                ,
                                {optionName:"challenger",
                                optionUrl: require("./assets/images/rank/emblem-grandmaster.png")}
                                ,
                                {optionName:"ranker",
                                optionUrl: require("./assets/images/rank/emblem-challenger.png")}
                            ];
    let positionList = [   
                                {optionName:"탑",
                                optionUrl: require("./assets/images/position/TOP-CHALLENGER.png")}
                                ,
                                {optionName:"정글",
                                optionUrl: require("./assets/images/position/JG-CHALLENGER.png")}
                                ,
                                {optionName:"미드",
                                optionUrl: require("./assets/images/position/MID-CHALLENGER.png")}
                                ,
                                 {optionName:"원딜",
                                optionUrl: require("./assets/images/position/ADC-CHALLENGER.png")}
                                ,
                                {optionName:"서폿",
                                optionUrl: require("./assets/images/position/SUP-CHALLENGER.png")}       
                        ];
    let timeList = [   
                                {optionName:"평일",
                                optionUrl: require("./assets/images/position/TOP-CHALLENGER.png")}
                                ,
                                {optionName:"주말",
                                optionUrl: require("./assets/images/position/JG-CHALLENGER.png")}
                                ,
                                {optionName:"평일 + 주말",
                                optionUrl: require("./assets/images/position/MID-CHALLENGER.png")}            
                        ]; 
    // 챔피언 선택함수                                                                
    const selectChampion = (index)=>{
      setChampionSelect(index)
    };
    // 나머지 옵션 select index 감지 함수
    const optionChange = (index)=>{

      setOptionName(Math.floor(index/100))     
    };
    // 선택하기 감지 함수
    const optionSubmit = ()=>{
       // route.params.optionOne 는 option1
      let tempList = [];
      let indexNumber = Math.floor((ok+1)/4);
      // tempList[indexNumber].optionName 은 option2
      let tempOptionFourDetail = getChampionSelect; 
      if(route.params.optionFour == "rank"){
        tempList = rankList;
        tempOptionFourDetail = tempList[indexNumber].optionName;
      }else if(route.params.optionFour == "position"){
        tempList = positionList;
        tempOptionFourDetail = tempList[indexNumber].optionName;
      }else if(route.params.optionFour == "time"){
        tempList = timeList;
        tempOptionFourDetail = tempList[indexNumber].optionName;
      }
      console.log("조건1")
      console.log(route.params.optionOne)
      console.log("조건1-1")
      console.log(route.params.optionOneDetail)
      console.log("조건2")
      console.log(route.params.optionTwo)
      console.log("조건2-1")
      console.log(route.params.OptionTwoDetail)
      console.log("조건3")
      console.log(route.params.optionThree)
      console.log("조건3-1")
      console.log(route.params.optionThreeDetail)
      console.log("조건4")
      console.log(route.params.optionFour)
      console.log("조건4-1")
      console.log(tempOptionFourDetail)
      console.log("----------OptionSelectFourDetail.js--------Finsh-----------------------")
      alert("게임매칭 시작!")
      const responseGameMatchingUser = fetch (`http://3.37.211.126:8080/gameMatching/selectChampion.do).then(response`);
      let jsonGameMatchingUser = responseGameMatchingUser.json();
      console.log(jsonGameMatchingUser) 
      navigation.navigate('OptionSelectFour',{  optionOne: route.params.optionOne
                                                    ,optionOneDetail: route.params.optionOneDetail
                                                    ,optionTwo:route.params.optionTwo
                                                    ,optionTwoDetail:route.params.TwoDetail
                                                    ,optionThree:route.params.optionThree
                                                    ,optionThreeDetail:tempOptionThreeDetail
                                                    ,optionValueBox: route.params.optionValueBox
                                                  },{navigation});
    };
    const getChampionList = async() =>{
    const response = await fetch (`http://3.37.211.126:8080/gameMatching/selectChampion.do).then(response`);
      let json = await response.json();   
      for (let i =0; i<json.gameVO.length; i++) {
        let tempChName = json.gameVO[i].chName;
        let tempUrl = `./assets/images/chmapion/${tempChName}_0.jpg`;
        json.gameVO[i]= {
          chIndex : json.gameVO[i].chIndex,
          chName : json.gameVO[i].chName,
          chNameK: json.gameVO[i].chNameK,
          optionUrl : tempUrl
        };
        if((i+1)%4 ==0){
          let tempBox = [];
          tempBox.push(json.gameVO[i]);
          tempBox.push(json.gameVO[i-1]);
          tempBox.push(json.gameVO[i-2]);
          tempBox.push(json.gameVO[i-3]);
          reChampionList.push(tempBox);
        }
        if(i == json.gameVO.length-1){
          let tempLength = (i+1)%4;
          let tempBox = [];
          for(let n =0; n<tempLength; n++){
            tempBox.push(json.gameVO[i-n]);  
          }
          if(tempBox.length !=4){
            let tempTwoLength = 4-tempBox.length;
            for(let u=0; u<tempTwoLength; u++){
              let tempObjec = {
                chName : "",
                chIndex : "",
                url : ""
              };
              tempBox.push(tempObjec);
            }
          }
          reChampionList.push(tempBox); 
        }
      }       
      // console.log(reChampionList)
      setChampionList(reChampionList)
    };
    useEffect(() => {
      getChampionList();
    },[]);
    if(route.params.optionFour ==="rank"){
      return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                   <Text style={styles.topContainerTitle}>{route.params.optionFour}</Text>
            </View>
            <View style={styles.centerContainer} >
              <View style={styles.centerTopContainer}>
                <ScrollView pagingEnabled 
                            horizontal
                            onMomentumScrollEnd={(event) => {optionChange(event.nativeEvent.contentOffset.x)}} 
                            showsHorizontalScrollIndicator = {false}>
                    {rankList.length === 0? (
                        <View >
                            <ActivityIndicator color="black" size="large"/>
                        </View>
                        ) : (
                        rankList.map( (info, index) =>    
                            <View key={index} style={styles.contentBottom}>
                                <View style={styles.itemBox}>
                                    <Text style={styles.itemBoxTitle} >{info.optionName}</Text>
                                    <Image  style={styles.backImg} source={info.optionUrl}/>       
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
    }else if(route.params.optionFour ==="champion"){
      return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                   <Text style={styles.topContainerTitle}>{route.params.optionFour}</Text>
            </View>
            <View style={styles.centerContainer} >
              <View style={styles.centerTopContainer}>
                <ScrollView pagingEnabled  
                              showsHorizontalScrollIndicator = {false}>                
                    {championList.length === 0? (
                        <View >
                          <ActivityIndicator color="black" size="large"/>
                        </View>
                      ):(
                        championList.map((champion, index) =>         
                          <View key={index} style={styles.centerBottomContainer}> 
                                                  
                            <View onStartShouldSetResponder={() =>selectChampion(champion[0].chNameK)} style={styles.itemBox}>
                              <Text>{champion[0].chNameK}</Text>
                            </View> 
                            <View onStartShouldSetResponder={() => selectChampion(champion[1].chNameK)} style={styles.itemBox}>
                              <Text>{champion[1].chNameK}</Text>
                            </View>
                            <View onStartShouldSetResponder={() => selectChampion(champion[2].chNameK)} style={styles.itemBox}>
                              <Text>{champion[2].chNameK}</Text>
                            </View> 
                            <View onStartShouldSetResponder={() => selectChampion(champion[3].chNameK)} style={styles.itemBox}>
                              <Text>{champion[3].chNameK}</Text>
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
    }else if(route.params.optionFour ==="position"){
      return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                   <Text style={styles.topContainerTitle}>{route.params.optionFour}</Text>
            </View>
            <View style={styles.centerContainer} >
              <View style={styles.centerTopContainer}>
                 <ScrollView pagingEnabled 
                            horizontal
                            onMomentumScrollEnd={(event) => {optionChange(event.nativeEvent.contentOffset.x)}} 
                            showsHorizontalScrollIndicator = {false}>
                    {positionList.length === 0? (
                        <View >
                            <ActivityIndicator color="black" size="large"/>
                        </View>
                        ) : (
                        positionList.map( (info, index) =>    
                            <View onTouchMove={text => optionChange(index)}  key={index} style={styles.contentBottom}>
                                <View style={styles.itemBox}>
                                    <Text style={styles.itemBoxTitle} >{info.optionName}</Text>
                                    <Image  style={styles.backImg} source={info.optionUrl}/>       
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
    }else if(route.params.optionFour ==="time"){
      return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                   <Text style={styles.topContainerTitle}>{route.params.optionFour}</Text>
            </View>
            <View style={styles.centerContainer} >
              <View style={styles.centerTopContainer}>
                <ScrollView pagingEnabled 
                            horizontal
                            onMomentumScrollEnd={(event) => {optionChange(event.nativeEvent.contentOffset.x)}} 
                            showsHorizontalScrollIndicator = {false}>
                    {timeList.length === 0? (
                        <View >
                            <ActivityIndicator color="black" size="large"/>
                        </View>
                        ) : (
                        timeList.map( (info, index) =>    
                            <View onTouchMove={text => optionChange(index)}  key={index} style={styles.contentBottom}>
                                <View style={styles.itemBox}>
                                    <Text style={styles.itemBoxTitle} >{info.optionName}</Text>
                                    <Image  style={styles.backImg} source={info.optionUrl}/>       
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
  itemBox:{
    width:"20%",
    height:"60%",
    margin: "3%",
  },
  backImg:{
    width:'100%',
    height:'100%',
  },
  contentBottom:{
    width:SCREEN_WIDTH,
    alignItems:"center",
    justifyContent:"center",
    height:"100%",
  },
});