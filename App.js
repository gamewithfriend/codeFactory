
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View ,Text, ScrollView, Dimensions,Image, ImageBackground, ActivityIndicator} from 'react-native';

const weatherApiKey = '77d7448b07d017540cef875699684fb0';

const {width:SCREEN_WIDTH} = Dimensions.get('window');

console.log(SCREEN_WIDTH);

export default function App() {
  const [city,setCity] = useState("Loading...")
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async() =>{
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }     
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const locationPermit = await Location.setGoogleApiKey('AIzaSyBrzd2OFAW2D3qwRhtj66O5WexdeW_DCTY');
    const location = await Location.reverseGeocodeAsync(
      {latitude, longitude},
      {useGoogleMaps:false}
      );
      setCity(location[0].city)
     const response = await fetch (`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${weatherApiKey}&units=metric`)
     const json = await response.json();
    setDays(json.daily);
    console.log(json.daily)
  };
  useEffect(() => {
    getWeather();
  },[]);
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/images/backSeoulNight.jpg')} style={styles.backImg}></ImageBackground> 
        <View style={styles.city}>
          <Text style={styles.cityName}>{city}</Text>
        </View>
        <ScrollView pagingEnabled horizontal contentContainerStyle={styles.weather}>
          {days.length === 0? (
            <View style={styles.day}>
              <ActivityIndicator color="black" size="large"/>
            </View>
            ) : (
              days.map((day, index) =>  
              <View key={index} style={styles.day}>
                <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
                <Text style={styles.description}>{day.weather[0].main}</Text>
                <Text style={styles.tinyText}>{day.weather[0].description}</Text>
              </View>
              )
          )}         
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  backImg:{
    flex:1,
    width:400,
    height:700,
    opacity:0.7
  },
  city:{
    flex: 1,
    justifyContent:"center",
    alignItems: "center",
  },
  cityName:{
    fontSize: 48,
    fontWeight: "500",
  },
  weather:{},
  day:{
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp:{
    marginTop: 10,
    fontSize: 140,
  },
  description:{
    marginTop: 0,
    fontSize: 60,
  },
  tinyText:{
    marginTop: 0,
    fontSize: 20,
  },
});


