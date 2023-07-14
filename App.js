
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,StackNavigationProp } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View ,Text, ScrollView, Dimensions,Image, ImageBackground, ActivityIndicator,TextInput,Button} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './MainScreen';
import DetailScreen from './DetailScreen';
import First from './First';
import Login from './LoginScreen';
import FriendScreen from './FriendScreen';
import GameMatching from './GameMatchingScreen';
import SettingScreen from './SettingScreen';
import OptionSelect from './OptionSelect';
import OptionSelectDetail from './OptionSelectDetail';
import OptionSelectTwo from './OptionSelectTwo';
import OptionSelectTwoDetail from './OptionSelectTwoDetail';
import OptionSelectThree from './OptionSelectThree';
import OptionSelectThreeDetail from './OptionSelectThreeDetail';
import OptionSelectFour from './OptionSelectFour';
import OptionSelectFourDetail from './OptionSelectFourDetail';
import SetNickNameScreen from './SetNickNameScreen';
import TextChat from './TextChat';
import MatchingHistoryScreen from './MatchingHistoryScreen';
import AlarmScreen from './AlarmScreen';
import ChatListScreen from './ChatListScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTab(){
  return (
       <Tab.Navigator screenOptions={{headerShown: false, gestureEnabled: true}}>
        <Tab.Screen name='MainScreen' component={MainScreen}/>
        {/* <Tab.Screen name='Home' component={First} options={{tabBarStyle: {display: 'none'}}} /> */}
        {/* <Tab.Screen name='DetailScreen' component={DetailScreen}/> */}
        <Tab.Screen name='GameMatchingScreen' component={OptionSelect} options={{tabBarStyle: {display: 'none'}}}/>
        <Tab.Screen name='ChatListScreen' component={ChatListScreen}/>
        <Tab.Screen name='FriendScreen' component={FriendScreen}/>       
        <Tab.Screen name='TextChat' component={TextChat}/>
        <Tab.Screen name='Setting' component={SettingScreen}/>
        <Tab.Screen name='Login' component={Login}/>     
      </Tab.Navigator>
  
  );
}

export default function App() { 
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('알림 권한이 거부되었습니다!');
      }
    })();
},[]); 
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: true}}>            
        <Stack.Screen name="HomeTab" component={HomeTab} options={{
          headerShown:false  
        }}/>
        <Stack.Screen name="OptionSelect" component={OptionSelect} options={{
          headerShown:true  
        }}/>
        <Stack.Screen name="OptionSelectDetail" component={OptionSelectDetail} options={{
          headerShown:true  
        }}/>
        <Stack.Screen name="OptionSelectTwo" component={OptionSelectTwo} options={{
          headerShown:true  
        }}/>
        <Stack.Screen name="OptionSelectTwoDetail" component={OptionSelectTwoDetail} options={{
          headerShown:true  
        }}/>
        <Stack.Screen name="OptionSelectThree" component={OptionSelectThree} options={{
          headerShown:true  
        }}/>
        <Stack.Screen name="OptionSelectThreeDetail" component={OptionSelectThreeDetail} options={{
          headerShown:true  
        }}/>
         <Stack.Screen name="OptionSelectFour" component={OptionSelectFour} options={{
          headerShown:false  
        }}/>
        <Stack.Screen name="OptionSelectFourDetail" component={OptionSelectFourDetail} options={{
          headerShown:false  
        }}/>
        <Stack.Screen name="GameMatching" component={GameMatching} options={{
          headerShown:false  
        }}/>
        <Stack.Screen name="SetNickNameScreen" component={SetNickNameScreen} options={{
          headerShown:false  
        }}/>
        <Stack.Screen name="TextChat" component={TextChat} options={{
          headerShown:false  
        }}/>
        <Stack.Screen name="MatchingHistoryScreen" component={MatchingHistoryScreen} options={{
          headerShown:false  
        }}/>
        <Stack.Screen name="AlarmScreen" component={AlarmScreen} options={{
          headerShown:false  
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
         
  );
}




