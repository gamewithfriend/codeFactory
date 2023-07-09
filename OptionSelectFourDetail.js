import React, { Component, useEffect, useState } from 'react';
import { View, Text, Button,StyleSheet,TextInput,Dimensions,ActivityIndicator,Image, ImageBackground ,TouchableOpacity,Modal,Pressable,Alert   } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const {width:SCREEN_WIDTH} = Dimensions.get('window');


export default function OptionSelectFourDetail ({ route,navigation }) {
    
    const [ok, setOptionName] = useState(1);
    const [championList, setChampionList] = useState([]);
    const [getoptionList, setOptionList] = useState([]);
    const [getChampionSelect, setChampionSelect] = useState("");
    const [text, onChangeText] = React.useState('Useless Text');    
    const [modalVisible, setModalVisible] = useState(false);
    const [getModalIndex, setModalIndex] = useState(0);
    const [getModalChangeIndex, setModalChangeIndex] = useState(0);
    const [getSelectedModalImgOne, setSelectedModalImgOne] = useState("http://3.37.211.126:8080/tomcatImg/option/a5bffe51b4e4466f8f8287edfc67d8a4");
    const [getSelectedModalImgTwo, setSelectedModalImgTwo] = useState("http://3.37.211.126:8080/tomcatImg/option/a5bffe51b4e4466f8f8287edfc67d8a4");
    const [getSelectedModalRankNameOne, setSelectedModalRankNameOne] = useState("");
    const [getSelectedModalRankNameTwo, setSelectedModalRankNameTwo] = useState("");
    const [getRankUnderOptionListOne, setRankUnderOptionListOne] = useState([]);
    const [getRankUnderOptionListTwo, setRankUnderOptionListTwo] = useState([]);
    const [getUnderRankIndexOne, setUnderRankIndexOne] = useState("");
    const [getUnderRankIndexTwo, setUnderRankIndexTwo] = useState("");
    let reChampionList = [];
    ////serverGetOptionList----옵션리스트 서버에서 가져오기 함수///////
    const serverGetOptionList = async() =>{
      const matchingOptionCode= route.params.optionFourArr.cdDtlName;   
      const response = await fetch (`http://3.37.211.126:8080/gameMatching/selectMatchingGameOption.do?matchingOptionCode=${matchingOptionCode}`)
      const jsonOptionList = await response.json();
      for(var i=0; i<jsonOptionList.selectOptionList.length; i++){ 
        let tempUrl = `http://3.37.211.126:8080/tomcatImg/option/${jsonOptionList.selectOptionList[i].url}`;
        jsonOptionList.selectOptionList[i].url = tempUrl;
      }
      setOptionList(jsonOptionList.selectOptionList);
    };                      
    // 챔피언 선택함수                                                                
    const selectChampion = (index)=>{
      setChampionSelect(index)
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
    // 나머지 옵션 select index 감지 함수
    const optionChange = (index)=>{

      setOptionName(Math.floor(index/100))     
    };
    const modalRankChange = (index)=>{
      let changeIndex =Math.floor(index/100);
      let indexNumber =0;
      if(changeIndex != 0){
        indexNumber = Math.ceil((changeIndex+1)/4);
      }
      setModalChangeIndex(indexNumber);      
    };
    // 선택하기 감지 함수
    const optionSubmit = ()=>{
       // route.params.optionOne 는 option1
      let tempList = [];
      let indexNumber = Math.floor((ok+1)/4);
      // tempList[indexNumber].optionName 은 option2
      let tempOptionFourDetail = getChampionSelect; 
      if(route.params.optionFour == "rank"){
        let rankOneNameCheck = true;
        switch (getSelectedModalRankNameOne) {
          case "UNRANK":
            rankOneNameCheck = false;
            break;
          case "MASTER":
            rankOneNameCheck = false;
            break;
          case "GRANDMASTER":
            rankOneNameCheck = false;
            break;
          case "CHALLENGER":
            rankOneNameCheck = false;
            break;
        }
        if(rankOneNameCheck !=false && getUnderRankIndexOne ==""){
          alert("시작 랭크에 세부랭크를 설정해주세요!")
          return;
        }
        let rankTwoNameCheck = true;
        switch (getSelectedModalRankNameTwo) {
          case "UNRANK":
            rankTwoNameCheck = false;
            break;
          case "MASTER":
            rankTwoNameCheck = false;
            break;
          case "GRANDMASTER":
            rankTwoNameCheck = false;
            break;
          case "CHALLENGER":
            rankTwoNameCheck = false;
            break;
        }
        if(rankTwoNameCheck !=false && getUnderRankIndexTwo ==""){
          alert("끝 랭크에 세부랭크를 설정해주세요!")
          return;
        }
        const choiceRank = getSelectedModalRankNameOne+getUnderRankIndexOne+"~"+getSelectedModalRankNameTwo+getUnderRankIndexTwo;
        tempOptionFourDetail = choiceRank;
      }else if(route.params.optionFour == "position"){
        tempOptionFourDetail = getoptionList[indexNumber].cdDtlName;
      }else if(route.params.optionFour == "time"){
        tempOptionFourDetail = getoptionList[indexNumber].cdDtlName;
      }
      console.log("조건1")
      console.log(route.params.optionOne)
      console.log("조건1-1")
      console.log(route.params.optionOneDetail)
      console.log("조건2")
      console.log(route.params.optionTwo)
      console.log("조건2-1")
      console.log(route.params.optionTwoDetail)
      console.log("조건3")
      console.log(route.params.optionThree)
      console.log("조건3-1")
      console.log(route.params.optionThreeDetail)
      console.log("조건4")
      console.log(route.params.optionFour)
      console.log("조건4-1")
      console.log(tempOptionFourDetail)
      console.log("----------OptionSelectFourDetail.js--------Finsh-----------------------")
      console.log(route.params.optionValueBox)
      alert("게임매칭 시작!")
      navigation.navigate('GameMatching',{  0: route.params.optionOne
                                                    ,1: route.params.optionOneDetail
                                                    ,2:route.params.optionTwo
                                                    ,3:route.params.optionTwoDetail
                                                    ,4:route.params.optionThree
                                                    ,5:route.params.optionThreeDetail
                                                    ,6:route.params.optionFour
                                                    ,7:tempOptionFourDetail
                                                    ,optionValueBox: route.params.optionValueBox
                                                  },{navigation});
    };
    const serverGetRankUnderOptionList = async(forRankUnderOptionListCode) =>{
      const matchingOptionCode=forRankUnderOptionListCode;   
      const response = await fetch (`http://3.37.211.126:8080/gameMatching/selectBasicOption.do?matchingOptionCode=${matchingOptionCode}`)
      const jsonOptionList = await response.json();
      for(var i=0; i<jsonOptionList.selectOptionList.length; i++){ 
        let tempUrl = `http://3.37.211.126:8080/tomcatImg/option/${jsonOptionList.selectOptionList[i].url}`;
        jsonOptionList.selectOptionList[i].url = tempUrl;
      }
      if(getModalIndex ==0){
        setRankUnderOptionListOne(jsonOptionList.selectOptionList);
      }else{
        setRankUnderOptionListTwo(jsonOptionList.selectOptionList);
      }      
    };
    const serverGetRankUnderOptionListForSelectFirst = async(forRankUnderOptionListCode,underRankIndexOne) =>{
      const matchingOptionCode=forRankUnderOptionListCode; 
      const response = await fetch (`http://3.37.211.126:8080/gameMatching/selectBasicOption.do?matchingOptionCode=${matchingOptionCode}`)
      const jsonOptionList = await response.json();
      for(var i=0; i<jsonOptionList.selectOptionList.length; i++){ 
        let tempUrl = `http://3.37.211.126:8080/tomcatImg/option/${jsonOptionList.selectOptionList[i].url}`;
        jsonOptionList.selectOptionList[i].url = tempUrl;
      }
      const tempTwoArrLength =  jsonOptionList.selectOptionList.length;
      if(jsonOptionList.selectOptionList.slice(underRankIndexOne,tempTwoArrLength).length == 0){
        if(getoptionList[0].cdDtlName == getSelectedModalRankNameOne){
          setOptionList(getoptionList.slice(1,getoptionList.length));
          setSelectedModalImgTwo(getoptionList[1].url);
          setSelectedModalRankNameTwo(getoptionList[1].cdDtlName);
          setRankUnderOptionListTwo(jsonOptionList.selectOptionList);
        }else{
          setSelectedModalImgTwo(getoptionList[0].url);
          setSelectedModalRankNameTwo(getoptionList[0].cdDtlName);
          const matchingOptionCode=getoptionList[0].cdDtlId;   
          const response = await fetch (`http://3.37.211.126:8080/gameMatching/selectBasicOption.do?matchingOptionCode=${matchingOptionCode}`)
          const jsonOptionList = await response.json();
          for(var i=0; i<jsonOptionList.selectOptionList.length; i++){ 
            let tempUrl = `http://3.37.211.126:8080/tomcatImg/option/${jsonOptionList.selectOptionList[i].url}`;
            jsonOptionList.selectOptionList[i].url = tempUrl;
          }
          setRankUnderOptionListTwo(jsonOptionList.selectOptionList);
        }  
        
      }else{
        setSelectedModalImgTwo(getSelectedModalImgOne);
        setSelectedModalRankNameTwo(getSelectedModalRankNameOne);
        setRankUnderOptionListTwo(jsonOptionList.selectOptionList.slice(underRankIndexOne,tempTwoArrLength));
      }
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
      // console.log(reChampionList)
      setChampionList(reChampionList)
    };
    const rankIndex = (modalSet,index)=>{
      let rankOneNameCheck = true;
      if(index !=0){
        switch (getSelectedModalRankNameOne) {
          case "UNRANK":
            rankOneNameCheck = false;
            break;
          case "MASTER":
            rankOneNameCheck = false;
            break;
          case "GRANDMASTER":
            rankOneNameCheck = false;
            break;
          case "CHALLENGER":
            rankOneNameCheck = false;
            break;
        }
        if(rankOneNameCheck !=false && getUnderRankIndexOne ==""){
          alert("시작 랭크에 세부랭크를 설정해주세요!")
          return;
        }
      }
      
      setModalVisible(modalSet);
      setModalIndex(index);
      setModalChangeIndex(0);
      if(index == 0){
        serverGetOptionList();
        setSelectedModalImgOne("");
        setSelectedModalImgTwo("");
        setSelectedModalRankNameOne("");
        setSelectedModalRankNameTwo("");
        setRankUnderOptionListOne([]);
        setRankUnderOptionListTwo([]);
        setUnderRankIndexOne("");
        setUnderRankIndexTwo("");
      }
    };
    const rankUnderIndex = (index,modalIndex)=>{
      if(modalIndex ==0){
        setUnderRankIndexOne(index);
        serverGetRankUnderOptionListForSelectFirst(getoptionList[getModalChangeIndex].cdDtlId,index)

      }else{
        switch (getRankUnderOptionListTwo.length) {
          case 1:
            index = index +3
            break;
          case 2:
            index = index +2
            break;
          case 3:
            index = index +1
            break;
          case 4:
            index = index
            break;
        }
        setUnderRankIndexTwo(index);
      }
      
    };
    
    const rankSubmit = ()=>{
      if(getModalIndex ==0){
        setSelectedModalImgOne(getoptionList[getModalChangeIndex].url);
        setSelectedModalRankNameOne(getoptionList[getModalChangeIndex].cdDtlName);
      }else{
        setSelectedModalImgTwo(getoptionList[getModalChangeIndex].url);
        setSelectedModalRankNameTwo(getoptionList[getModalChangeIndex].cdDtlName);
      }
      const forRankUnderOptionListCode = getoptionList[getModalChangeIndex].cdDtlId;
         
      serverGetRankUnderOptionList(forRankUnderOptionListCode);
      setModalVisible(false);
      if(getModalIndex !=0){
        serverGetOptionList();
        setUnderRankIndexTwo("");
      }else{
        setUnderRankIndexOne("");
        setOptionListTriger();
      }
      
    };
    const setOptionListTriger = ()=>{  
      setOptionList(getoptionList.slice(getModalChangeIndex,getoptionList.length));
    };
    useEffect(() => {
      getChampionList();
      serverGetOptionList();
    },[]);
    if(route.params.optionFour ==="rank"){
      return (
        <View style={styles.container}>
            <View style={styles.topContainerRank}>
                   <Text style={styles.topContainerTitle}>{route.params.optionFour}</Text>
            </View>
            <View style={styles.centerContainerRank} >
              <View style={styles.centerTopContainerRank}>
                <View style={styles.centerTopContainerRankUnder} onStartShouldSetResponder={() =>rankIndex(true,0)}>
                  <Image resizeMode='cover' style={styles.itemBoxImgRank} 
                  source={{
                    uri: `${getSelectedModalImgOne}`,
                  }}/>       
                </View>
                <View style={styles.centerTopContainerRankUnder} onStartShouldSetResponder={() =>rankIndex(true,1)}>
                  <Image resizeMode='cover' style={styles.itemBoxImgRank} 
                  source={{
                    uri: `${getSelectedModalImgTwo}`,
                  }}/>       
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
                                onMomentumScrollEnd={(event) => {modalRankChange(event.nativeEvent.contentOffset.x)}} 
                                  showsHorizontalScrollIndicator = {false}>      
                        {getoptionList.length === 0? (
                            <View >
                                <ActivityIndicator color="black" size="large"/>
                            </View>
                            ) : (
                              getoptionList.map( (info, index) =>    
                                <View key={index} style={styles.contentBottomRank}>
                                    <View style={styles.itemBoxImgRank} >
                                        <Text style={styles.itemBoxTitle} >{info.cdDtlName}</Text>
                                        <Image resizeMode='contain' style={styles.backImg} source={{
                                                    uri: `${info.url}`,
                                                  }}/>       
                                    </View>  
                                </View>
                            )
                            )
                        }         
                    </ScrollView>
                    <View style={styles.modalBottomContainer} >
                      <Button color={"black"} onPress={rankSubmit} title='선택하기'></Button>
                    </View>
                  </View>
                </View>
              </View>
              </Modal>
              <View style={styles.sectionView}>
                      <View style={styles.sectionViewTop}>
                        <View style={styles.sectionViewButtonBox}>
                        {getRankUnderOptionListOne.length === 0? (
                          <View  style={styles.sectionViewButtonImgBox}>
                          </View>
                          )  : (
                            getRankUnderOptionListOne.map( (info, index) =>    
                              <View key={index} style={styles.sectionViewButtonImgBox} onStartShouldSetResponder={() =>rankUnderIndex(index+1,0)} >
                                <Image resizeMode='contain' style={styles.champImg} source={{
                                                    uri: `${info.url}`,
                                                  }}/>
                                <Text></Text>                      
                              </View>
                            )
                            )
                        }      
                        </View>
                        <View style={styles.sectionViewButtonBox}>
                        {getRankUnderOptionListTwo.length === 0? (
                          <View style={styles.sectionViewButtonImgBox}>
                          </View>
                          )  : (
                            getRankUnderOptionListTwo.map( (info, index) =>    
                              <View key={index} style={styles.sectionViewButtonImgBox} onStartShouldSetResponder={() =>rankUnderIndex(index+1,1)} >
                                 <Image resizeMode='contain' style={styles.champImg} source={{
                                                    uri: `${info.url}`,
                                                  }}/>    
                              </View>
                            )
                            )
                        }      
                        </View> 
                      </View>
                      <View style={styles.sectionViewCenter}>
                        <View style={styles.sectionViewBoxFix}><Text>시작 랭크</Text></View>
                        <View style={styles.sectionViewBoxFix}><Text>~</Text></View>
                        <View style={styles.sectionViewBoxFix}><Text>끝 랭크</Text></View>  
                      </View>
                      <View style={styles.sectionViewBottom}>
                        <View style={styles.sectionViewBox}><Text>{getSelectedModalRankNameOne} {getUnderRankIndexOne}</Text></View>
                        <View style={styles.sectionViewBox}><Text>{getSelectedModalRankNameTwo} {getUnderRankIndexTwo}</Text></View> 
                      </View>  
              </View>
            <View style={styles.bottomContainerRank} >
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
    }else if(route.params.optionFour ==="champion"){
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
    }else if(route.params.optionTwo ==="position"){
      return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                   <Text style={styles.topContainerTitle}>{route.params.optionTwo}</Text>
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
                            <View style={styles.leftText}>
                              <Text style={styles.bottomOptionInnerCenterText}>{route.params.optionOne}:</Text>
                            </View>
                            <View style={styles.centerText}>
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
                    {getoptionList.length === 0? (
                        <View >
                            <ActivityIndicator color="black" size="large"/>
                        </View>
                        ) : (
                          getoptionList.map( (info, index) =>    
                            <View onTouchMove={text => optionChange(index)}  key={index} style={styles.contentBottom}>
                                <View style={styles.itemBox}>
                                    <Text style={styles.itemBoxTitle} >{info.cdDtlName}</Text>
                                    <Image resizeMode='contain' style={styles.backImg} source={{
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
                            <View style={styles.leftText}>
                              <Text style={styles.bottomOptionInnerCenterText}>{route.params.optionOne}:</Text>
                            </View>
                            <View style={styles.centerText}>
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
                    {getoptionList.length === 0? (
                        <View >
                            <ActivityIndicator color="black" size="large"/>
                        </View>
                        ) : (
                          getoptionList.map( (info, index) =>    
                            <View onTouchMove={text => optionChange(index)}  key={index} style={styles.contentBottom}>
                                <View style={styles.itemBox}>
                                    <Text style={styles.itemBoxTitle} >{info.cdDtlName}</Text>
                                    <Image resizeMode='contain' style={styles.backImg} source={{
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
                            <View style={styles.leftText}>
                              <Text style={styles.bottomOptionInnerCenterText}>{route.params.optionOne}:</Text>
                            </View>
                            <View style={styles.centerText}>
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
  topContainerTitle:{
    marginTop: "8%",
    fontSize: 20,
  },
  centerContainerTitle:{
      marginTop: "5%",    
      fontSize: 20,
  },
  topContainerTitleTest:{
    fontSize: 50,
    color:"red",
  },
  topContainer:{       
    flex:1,
    alignItems:"center",
    borderColor:"black",
    borderStyle:"solid",
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
  centerText:{
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
  bottomOptionText:{
    fontSize: 14,
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
  bottomOptionBoxContainer:{
    flex:1,
    alignItems:"center",
    borderColor:"black",
    borderStyle:"solid",
    flexDirection:"row",
    marginTop:"2%"
  },
  bottomOptionInnerText:{
    fontSize: 14,
  },
   bottomOptionInnerCenterText:{
    fontSize: 14,
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
  contentBottom:{
      width:SCREEN_WIDTH,
      alignItems:"center",
      justifyContent:"center",
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
  backImg:{
    width:'100%',
    height:'100%',
  },
  champImg:{
    width:"100%",
    height:"90%",
  },
  contentBottom:{
    width:SCREEN_WIDTH,
    alignItems:"center",
    justifyContent:"center",
    height:"100%",
  },
  centerTopContainerRankUnder:{       
    height:"100%",
    width:"50%",
    alignItems:"center",
  },
  topContainerRank:{       
    flex:2,
    alignItems:"center",
    borderColor:"black",
    borderStyle:"solid",
    marginTop:"3%",  
  },
  centerContainerRank:{       
    flex:3,
    alignItems:"center",
    borderColor:"black",
    borderStyle:"solid",  
  },
  centerTopContainerRank:{       
    flex:1,
    borderColor:"black",
    borderStyle:"solid",
    flexDirection:"row",
    width:"100%",
  },
  modalBottomContainer:{
    flex:1,
    alignItems:"center",
    borderColor:"black",
    borderStyle:"solid",
    marginRight:"23%",
  },
  sectionView:{
    flex:2,
    width:"100%",
  },
  sectionViewTop:{
    height:"40%",
    width:"100%",
    flexDirection:"row",
  },
  sectionViewCenter:{
    marginTop:"5%",
    width:"100%",
    flexDirection:"row"
  },
  sectionViewBottom:{
    marginTop:"5%",
    width:"100%",
    flexDirection:"row"
  },
  sectionViewBox:{
    width:"50%",
    alignItems:"center",
  },
  sectionViewBoxFix:{
    width:"33%",
    alignItems:"center",
  },
  sectionViewButtonBox:{
    width:"50%",
    flexDirection:"row"
  },
  sectionViewButtonImgBox:{
    width:"25%",
    flexDirection:"row"
  },
  centeredView: {
    flex: 1,
    marginTop: "5%",
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
  modalSelectView: {
    width:"100%",
    marginTop:"10%",
    marginLeft:"12%",
  },
  contentBottomRank:{
    width:SCREEN_WIDTH,
    height:"100%",
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
  itemBoxTitle:{
    marginBottom : '5%',
    textAlign: 'center',
  },
  bottomContainerRank:{
    flex:1,
    marginTop:"10%",
    alignItems:"center",
    borderColor:"black",
    borderStyle:"solid",
  },
});