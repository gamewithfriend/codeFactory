
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View ,Text, ScrollView, Dimensions,Image, ImageBackground, ActivityIndicator} from 'react-native';

import MainScreen from './MainScreen';
import DetailScreen from './DetailScreen';
import First from './First';

const Stack = createStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="First">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}




