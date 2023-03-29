import React, { Component, useState ,useEffect} from 'react';
import { ScrollView, View, Text, Button,StyleSheet,TextInput,Dimensions,ActivityIndicator } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const {width:SCREEN_WIDTH} = Dimensions.get('window');

export default function GameMatchingScreen ({navigation}) {
    
    const [userInfos, setUserInfo] = useState([]);

    const getUserData = async() =>{
        const response = await fetch (`http://3.37.211.126:8080/common/test.do?id=aabc&pw=bbccc%27).then(response`);
        const json = await response.json();       
        console.log(json.userInfo)
        setUserInfo(json.userInfo)
      };
    useEffect(() => {
        getUserData();
    },[]);
    return (
        <View style={styles.container} >
            <View style={styles.topContainer}>

            </View>
            <View style={styles.bottomContainer}>
                    <View style={styles.titleBorder}> 
                        <Text style={styles.whiteTitle}>매칭된 유저</Text>
                    </View>
                    <ScrollView pagingEnabled 
                                horizontal 
                                showsHorizontalScrollIndicator = {false}
                                contentContainerStyle={styles.contentBorder}>
                    {userInfos.length === 0? (
                        <View style={styles.day}>
                            <ActivityIndicator color="black" size="large"/>
                        </View>
                        ) : (
                        userInfos.map((id, index) =>  
                        <View key={index} style={styles.contentBottom}>
                            <View style={styles.itemBox}>
                                <Text style={styles.matchingUserInfo}>
                                    {id.id}
                                </Text>
                                <Text style={styles.matchingUserInfo}>
                                    {id.name}
                                </Text>
                                <Text style={styles.matchingUserInfo}>
                                    {id.pw}
                                </Text>
                            </View>  
                        </View>
                        )
                    )}
                    </ScrollView>                  
            </View>
              
        </View>
        
      
      
    );
  

}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:"white",
    },
    topContainer:{       
        flex:5,
        alignItems:"center",
    },
    bottomContainer:{
        flex:3,
        alignItems:"center",
    },
    contentContainer:{
      flex:1,
      borderColor: "black",  
    },
    titleBorder:{
        width: "100%",
        alignItems:"center",
        height:"10%",
    },
    contentBorder:{        
        height:"100%"
    },
    contentBottom:{
        width:SCREEN_WIDTH,
        alignItems:"center",
        justifyContent:"center",
    },
    itemBox:{
        backgroundColor:"black",
        width:"50%",
        height:"80%",
        alignItems:"center",
        borderRadius:30,
    },
    whiteTitle:{
        fontSize:20,
        color:"black"
    },
    matchingUserInfo:{
        color:"white",
        margin:"10%"
    },
  });