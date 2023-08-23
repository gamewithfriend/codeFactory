import React, { Component, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image, Dimensions, ActivityIndicator, Modal, Pressable, Alert, SafeAreaView } from 'react-native';
import { glStyles } from './globalStyles';
import { LinearGradient } from 'expo-linear-gradient';
import colors from './assets/colors/colors';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads'

export default function MainFrame({ children }) {
  return (
    <LinearGradient
      style={glStyles.flexContainer}
      colors={[colors.darkGrdnt, colors.lightGrdnt]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.1, y: 0.95 }}
    >
      <SafeAreaView style={glStyles.flexContainer}>
        {children}
      </SafeAreaView>
      <View style={glStyles.adver}>
        {/* <BannerAd
                  unitId={TestIds.BANNER}
                  size={BannerAdSize.INLINE_ADAPTIVE_BANNER}
                  requestOptions={{
                      requestNonPersonalizedAdsOnl: true,
                  }}
        /> */}
      </View>
    </LinearGradient>
  );
}
