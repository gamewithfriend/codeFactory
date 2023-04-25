import React, { Component, useEffect, useState } from 'react';
import { ScrollView, View, Text, Button,StyleSheet,TextInput,Dimensions,ActivityIndicator,Image, ImageBackground ,TouchableOpacity  } from 'react-native';


const {width:SCREEN_WIDTH} = Dimensions.get('window');


export default function OtionSelectTwo ({ route,navigation }) {
    
    const [ok, setOptionName] = useState(1);
    const [championList, setChampionList] = useState([]);
    const [getChampionSelect, setChampionSelect] = useState("");
    let reChampionList = [];
    const rankList = [   
                                {rankName:"unRank",
                                optionUrl: require("./assets/images/emblem-challenger.png")}
                                ,
                                {rankName:"brozne",
                                optionUrl: require("./assets/images/chmapion/Irelia_0.jpg")}
                                ,
                                {rankName:"silver",
                                optionUrl: require("./assets/images/chmapion/Irelia_0.jpg")}
                                ,
                                {rankName:"gold",
                                optionUrl: require("./assets/images/chmapion/Irelia_0.jpg")}
                                ,
                                {rankName:"platinum",
                                optionUrl: require("./assets/images/chmapion/Irelia_0.jpg")}
                                ,
                                {rankName:"diamond",
                                optionUrl: require("./assets/images/chmapion/Irelia_0.jpg")}
                                ,
                                {rankName:"master",
                                optionUrl: require("./assets/images/chmapion/Irelia_0.jpg")}
                                ,
                                {rankName:"challenger",
                                optionUrl: require("./assets/images/chmapion/Irelia_0.jpg")}
                                ,
                                {rankName:"ranker",
                                optionUrl: require("./assets/images/chmapion/Irelia_0.jpg")}
                            ]; 
    const selectChampion = (index)=>{
      setChampionSelect(index)

    };
    const optionChange = (index)=>{
      setOptionName(index)
      
      
        
    };
     const optionSubmit = ()=>{
       console.log(getChampionSelect)
      console.log("test2")
      console.log(route.params.optionOne)  

      navigation.navigate('OtionSelectThree',{optionOne: route.params.optionOne,
                                              optionTwo: getChampionSelect
                                              });
    
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

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                   <Text style={styles.topContainerTitle}>{route.params.optionOne}</Text>
            </View>
            <View style={styles.centerContainer} >
              <View style={styles.centerTopContainer}>
              
              {route.params.optionOne ==="rank" ? (
                <ScrollView pagingEnabled 
                                horizontal 
                                showsHorizontalScrollIndicator = {false}>
                        {rankList.length === 0? (
                            <View >
                                <ActivityIndicator color="black" size="large"/>
                            </View>
                            ) : (
                            rankList.map( (info, index) =>    
                                <View onTouchMove={text => optionChange(index)}  key={index} style={styles.contentBottom}>
                                    <View style={styles.itemBox}>
                                        <Text style={styles.itemBoxTitle} >{info.rankName}</Text>
                                        <Image style={styles.backImg} source={info.optionUrl}/>       
                                    </View>  
                                </View>
                            )
                            )
                        }         
                    </ScrollView>
                ) : (   
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
                  )              
              }
              </View>
            </View>
            <View style={styles.bottomContainer} >
              <Button onPress={optionSubmit} title='선택하기'></Button>
            </View>   
        </View>
        
      
      
    );
  

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
    flex:3,
    alignItems:"center",
    borderColor:"black",
    borderStyle:"solid",
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
    },
});