
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View ,Text, ScrollView, Dimensions,Image, ImageBackground, ActivityIndicator} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './MainScreen';
import DetailScreen from './DetailScreen';
import First from './First';
import Login from './LoginScreen';
import ChatScreen from './ChatScreen';
import FriendScreen from './FriendScreen';
import GameMatchingScreen from './GameMatchingScreen';
import AdminScreen from './AdminScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



export default function App() {
  
  return (
    
    <NavigationContainer style>
      <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName="MainScreen">
            <Tab.Screen name="MainScreen" component={MainScreen} />
            <Tab.Screen name="DetailScreen" component={DetailScreen} /> 
            <Tab.Screen name="CHAT" component={ChatScreen} />
            <Tab.Screen name="Friend" component={FriendScreen} />
            <Tab.Screen name="GameMatching" component={GameMatchingScreen} />
            <Tab.Screen name="Admin" component={AdminScreen} />
      </Tab.Navigator> 
      {/* <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="MAIN" component={MainScreen}
          options={{
            title: '메인화면'
        }}/>
        <Stack.Screen name="DETAIL" component={DetailScreen} 
          options={{
            title: '상세화면'
        }}/>
        <Stack.Screen name="First" component={First} 
          options={{
            title: '첫화면'
        }}/>
        <Stack.Screen name="Login" component={Login} 
          options={{
            title: '로그인'
        }}/>
      </Stack.Navigator>          */}
    </NavigationContainer>  
  );
}




