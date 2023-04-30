
import * as Location from 'expo-location';
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
import ChatScreen from './ChatScreen';
import FriendScreen from './FriendScreen';
import GameMatchingScreen from './GameMatchingScreen';
import AdminScreen from './AdminScreen';
import OptionSelect from './OptionSelect';
import OptionSelectDetail from './OptionSelectDetail';
import OptionSelectTwo from './OptionSelectTwo';
import OptionSelectTwoDetail from './OptionSelectTwoDetail';
import OptionSelectThree from './OptionSelectThree';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTab(){
  return (
       <Tab.Navigator screenOptions={{headerShown: false, gestureEnabled: true}}>
        <Tab.Screen name='MainScreen' component={MainScreen}/>
        <Tab.Screen name='Home' component={First} options={{tabBarStyle: {display: 'none'}}} />
        <Tab.Screen name='DetailScreen' component={DetailScreen}/>
        <Tab.Screen name='Login' component={Login}/>
        <Tab.Screen name='ChatScreen' component={ChatScreen}/>
        <Tab.Screen name='FriendScreen' component={FriendScreen}/>
        <Tab.Screen name='GameMatchingScreen' component={OptionSelect} options={{tabBarStyle: {display: 'none'}}}/>
        <Tab.Screen name='AdminScreen' component={AdminScreen}/>
      </Tab.Navigator>
  
  );
}

export default function App() {  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: true}}>            
        <Stack.Screen name="HomeTab" component={HomeTab} options={{
          headerShown:false  
        }}/>
        <Stack.Screen name="OptionSelect" component={OptionSelect} options={{
          headerShown:false  
        }}/>
        <Stack.Screen name="OptionSelectDetail" component={OptionSelectDetail} options={{
          headerShown:false  
        }}/>
        <Stack.Screen name="OptionSelectTwo" component={OptionSelectTwo} options={{
          headerShown:false  
        }}/>
        <Stack.Screen name="OptionSelectTwoDetail" component={OptionSelectTwoDetail} options={{
          headerShown:false  
        }}/>
        <Stack.Screen name="OptionSelectThree" component={OptionSelectThree} options={{
          headerShown:false  
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
         
  );
}




