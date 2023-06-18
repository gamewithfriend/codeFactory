import React, { Component, useEffect, useState } from 'react';
import { View, Text, Button,StyleSheet,TextInput,Dimensions,ActivityIndicator,Image, ImageBackground ,TouchableOpacity ,Modal,Pressable,Alert  } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width:SCREEN_WIDTH} = Dimensions.get('window');
const {height:SCREEN_HEIGHT} = Dimensions.get('window');


export default function OtionSelectDetail ({ route,navigation }) {
    
    const [ok, setOptionName] = useState(1);
    const [championList, setChampionList] = useState([]);
    const [getoptionList, setOptionList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [getChampionSelect, setChampionSelect] = useState("");
    const [text, onChangeText] = React.useState('Useless Text');
    let reChampionList = [];
    let positionList = [   
                                {optionName:"TOP",
                                optionUrl: require("./assets/images/position/TOP-CHALLENGER.png")}
                                ,
                                {optionName:"JUNGGLE",
                                optionUrl: require("./assets/images/position/JG-CHALLENGER.png")}
                                ,
                                {optionName:"MIDDLE",
                                optionUrl: require("./assets/images/position/MID-CHALLENGER.png")}
                                ,
                                 {optionName:"CARRY",
                                optionUrl: require("./assets/images/position/ADC-CHALLENGER.png")}
                                ,
                                {optionName:"SUPPORT",
                                optionUrl: require("./assets/images/position/SUP-CHALLENGER.png")}       
                        ];
    let timeList = [   
                                {optionName:"평일",
                                optionUrl: require("./assets/images/position/TOP-CHALLENGER.png")}
                                ,
                                {optionName:"주말",
                                optionUrl: require("./assets/images/position/JG-CHALLENGER.png")}
                                ,
                                {optionName:"평일주말",
                                optionUrl: require("./assets/images/position/MID-CHALLENGER.png")}            
                        ]; 
    // 챔피언 선택함수                                                                
    const selectChampion = (index)=>{
      setChampionSelect(index)
    };
    sessionGet = async () => {
      try {
        const value = await AsyncStorage.getItem('myNick');
        if (value !== null) {
          // We have data!!
          console.log(value);
        }
      } catch (error) {
        // Error retrieving data
      }
    };
    ////serverGetOptionList----옵션리스트 서버에서 가져오기 함수///////
    const serverGetOptionList = async() =>{
        const matchingOptionCode= route.params.optionOneArr.cdDtlName;   
        const response = await fetch (`http://3.37.211.126:8080/gameMatching/selectMatchingGameOption.do?matchingOptionCode=${matchingOptionCode}`)
        const jsonOptionList = await response.json();
        for(var i=0; i<jsonOptionList.selectOptionList.length; i++){ 
          let tempUrl = `http://3.37.211.126:8080/tomcatImg/option/${jsonOptionList.selectOptionList[i].url}`;
          jsonOptionList.selectOptionList[i].url = tempUrl;
        }
        setOptionList(jsonOptionList.selectOptionList);
        
    };
    const getSearchChampionList = async(keyWord) =>{
      const response = await fetch (`http://3.37.211.126:8080/gameMatching/selectSearchChampion.do?keyWord=${keyWord}`)
      const json = await response.json();
      for (let i =0; i<json.gameVO.length; i++) {
        let tempChName = json.gameVO[i].chName;
        let tempUrl = `http://3.37.211.126:8080/tomcatImg/champ/${json.gameVO[i].url}`;
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
      setChampionList(reChampionList)
    };
    const onChange = (text)=>{
      onChangeText(text);
      getSearchChampionList(text);   
    };
    const backOption = (index)=>{
      switch(index) {
        case 1: 
          navigation.navigate('OptionSelect',route.params,{navigation});  
      }
      
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
      let tempOptionOneDetail =getChampionSelect; 
      if(route.params.optionOne == "rank"){
        tempOptionOneDetail = getoptionList[indexNumber].cdDtlName;
      }else if(route.params.optionOne == "position"){
        tempList = positionList;
        tempOptionOneDetail = tempList[indexNumber].optionName;
      }else if(route.params.optionOne == "time"){
        tempList = timeList;
        tempOptionOneDetail = tempList[indexNumber].optionName;
      }
      console.log("조건1")
      console.log(route.params.optionOne)
      console.log("조건1-1")
      console.log(tempOptionOneDetail)
      console.log("----------OptionSelectDetail.js-----Finsh--------------------------")
      navigation.navigate('OptionSelectTwo',{optionOne: route.params.optionOne,
                                              optionOneDetail: tempOptionOneDetail
                                              },{navigation});
    };
    const getChampionList = async() =>{
    const response = await fetch (`http://3.37.211.126:8080/gameMatching/selectChampion.do).then(response`);
      let json = await response.json(); 
      for (let i =0; i<json.gameVO.length; i++) {
        let tempChName = json.gameVO[i].chName;
        let tempUrl = `http://3.37.211.126:8080/tomcatImg/champ/${json.gameVO[i].url}`;
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
      setChampionList(reChampionList)
    };

    useEffect(() => {
      getChampionList();
      sessionGet();
      serverGetOptionList();
    },[]);
    if(route.params.optionOne ==="rank"){
      return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                   <Text style={styles.topContainerTitle}>{route.params.optionOne}</Text>
            </View>
            <View style={styles.centerContainer} >
              <View style={styles.centerTopContainerRank}>
                <View style={styles.centerTopContainerRankUnder} onStartShouldSetResponder={() =>setModalVisible(true)}>
                  <Image resizeMode='contain' style={styles.itemBoxImgRank} 
                  source={require("./assets/images/rank_resize/emblem-gold_res.png")}/>
                </View>
                <View style={styles.centerTopContainerRankUnder} onStartShouldSetResponder={() =>setModalVisible(true)}>
                  <Image resizeMode='contain' style={styles.itemBoxImgRank} 
                  source={require("./assets/images/rank_resize/emblem-gold_res.png")}/>
                </View>            
              </View>
            </View>
              <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <Pressable style={{
              flex:1,
              backgroundColor:'transparent',
              }}
              onPress={()=>setModalVisible(false)}
              />
              <View style={styles.centeredView} >
                <View style={styles.modalView}>
                  <View style={styles.modalSelectView}>
                    <ScrollView pagingEnabled
                                horizontal 
                                  showsHorizontalScrollIndicator = {false}>      
                        {getoptionList.length === 0? (
                            <View >
                                <ActivityIndicator color="black" size="large"/>
                            </View>
                            ) : (
                              getoptionList.map( (info, index) =>    
                                <View key={index} style={styles.contentBottomRank}>
                                    <View style={styles.itemBoxImgRank}>
                                        <Text style={styles.itemBoxTitle} >{info.cdDtlName}</Text>
                                        <Image resizeMode='cotain' style={styles.backImg} s source={{
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
              </View>
              </Modal>
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
                            <View  style={styles.indexText}>
                              <Text style={styles.bottomOptionInnerText}>1</Text>
                            </View>
                            <View onStartShouldSetResponder={() =>backOption(1)} style={styles.leftText}>
                              <Text style={styles.bottomOptionInnerCenterText}>{route.params.optionOne}:</Text>
                            </View>
                            <View  style={styles.centerText}>
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
                              <View style={styles.leftText}>
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
    }else if(route.params.optionOne ==="champion"){
      return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                   <Text style={styles.topContainerTitle}>{route.params.optionOne}</Text>
            </View>
            <View style={styles.topContainer}>
                  <TextInput
                    style={styles.input}
                    onChangeText={text => onChange(text)}
                    value={text}
                  />
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
                                                  
                            <View onStartShouldSetResponder={() =>selectChampion(champion[0].chNameK)} style={styles.champItemBox}>
                              <Image
                                style={styles.champImg}
                                source={{
                                  uri: `${champion[0].optionUrl}`,
                                }}
                              />
                              <Text>{champion[0].chNameK}</Text>
                            </View> 
                            <View onStartShouldSetResponder={() => selectChampion(champion[1].chNameK)} style={styles.champItemBox}>
                               <Image
                                style={styles.champImg}
                                source={{
                                  uri: `${champion[1].optionUrl}`,
                                }}
                              />
                              <Text>{champion[1].chNameK}</Text>
                            </View>
                            <View onStartShouldSetResponder={() => selectChampion(champion[2].chNameK)} style={styles.champItemBox}>
                               <Image
                                style={styles.champImg}
                                source={{
                                  uri: `${champion[2].optionUrl}`,
                                }}
                              />
                              <Text>{champion[2].chNameK}</Text>
                            </View> 
                            <View onStartShouldSetResponder={() => selectChampion(champion[3].chNameK)} style={styles.champItemBox}>
                               <Image
                                style={styles.champImg}
                                source={{
                                  uri: `${champion[3].optionUrl}`,
                                }}
                              />
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
                            <View  style={styles.centerText}>
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
                              <View style={styles.leftText}>
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
    }else if(route.params.optionOne ==="position"){
      return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                   <Text style={styles.topContainerTitle}>{route.params.optionOne}</Text>
            </View>
            <View style={styles.centerContainer} >
              <View style={styles.centerTopContainer}>
                 <ScrollView pagingEnabled 
                            horizontal
                            onMomentumScrollEnd={(event) => {optionChange(event.nativeEvent.contentOffset.x)}} 
                            showsHorizontalScrollIndicator = {false}>
                    {getoptionList.length === 0? (
                        <View >
                            <ActivityIndicator color="black" size="large"/>
                        </View>
                        ) : (
                          getoptionList.map( (info, index) =>    
                            <View onTouchMove={text => optionChange(index)}  key={index} style={styles.contentBottom}>
                                <View style={styles.itemBoxImg}>
                                    <Text style={styles.itemBoxTitle} >{info.cdDtlName}</Text>
                                    <Image resizeMode='cotain' style={styles.backImg} s source={{
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
                            <View  style={styles.centerText}>
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
                              <View style={styles.leftText}>
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
    }else if(route.params.optionOne ==="time"){
      return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                   <Text style={styles.topContainerTitle}>{route.params.optionOne}</Text>
            </View>
            <View style={styles.centerContainer} >
              <View style={styles.centerTopContainer}>
                <ScrollView pagingEnabled 
                            horizontal
                            onMomentumScrollEnd={(event) => {optionChange(event.nativeEvent.contentOffset.x)}} 
                            showsHorizontalScrollIndicator = {false}>
                    {getoptionList.length === 0? (
                        <View >
                            <ActivityIndicator color="black" size="large"/>
                        </View>
                        ) : (
                          getoptionList.map( (info, index) =>    
                            <View onTouchMove={text => optionChange(index)}  key={index} style={styles.contentBottom}>
                                <View style={styles.itemBoxImg}>
                                    <Text style={styles.itemBoxTitle} >{info.cdDtlName}</Text>
                                    <Image resizeMode='cotain' style={styles.backImg} s source={{
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
                            <View  style={styles.centerText}>
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
                              <View style={styles.leftText}>
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
}
const styles = StyleSheet.create({
  topContainerTitleTest:{
    fontSize: 50,
    color:"red",
  },
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
    flex:2,
    alignItems:"center",
    borderColor:"black",
    borderStyle:"solid",
    marginTop:"3%",  
  },
  centerContainer:{       
    flex:7,
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
  centerTopContainerRank:{       
    flex:1,
    borderColor:"black",
    borderStyle:"solid",
    flexDirection:"row",
    width:"100%",
  },
  centerTopContainerRankUnder:{       
    height:"100%",
    width:"50%",
  },
  centerBottomContainer:{       
    height:"7%",
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
  contentBottomRank:{
    width:SCREEN_WIDTH,
    height:"100%",
  },
  itemBox:{
    width:"20%",
    height:"60%",
    margin: "3%",
  },
  champItemBox:{
    width:"20%",
    height:"90%",
    marginTop: "3%",
    marginRight:"2%",
    marginLeft:"2%",
  },
  itemBoxImg:{
    width:"50%",
    height:"60%",
    margin: "3%",
  },
  itemBoxImgRank:{
    width:"70%",
    height:"70%",
    margin: "3%",
  },
  champImg:{
    width:"100%",
    height:"90%",
  },
  testWhiteText:{
      color:"red",
  },
  backImg:{
    flex:1,
    width:'100%',
    height:"100%",
    opacity:1
  },
  modalRankImg:{
    flex:1,
    width:'50%',
    height:"50%",
    opacity:1
  },
  itemBoxTitle:{
    marginBottom : '5%',
    textAlign: 'center',
  },
  centerText:{
  },
  input:{
  },
  modalView: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position:'absolute',
    top:-200,
    bottom:100,
    left:0,
    right:0,
  },
  centeredView: {
    flex: 1,
    marginTop: "5%",
  },
  modalSelectView: {
    width:"100%",
    marginTop:"10%",
    marginLeft:"12%",
  },
});