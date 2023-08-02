import React, { Component, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image, Dimensions, ActivityIndicator, Modal, Pressable, Alert, SafeAreaView } from 'react-native';
import { glStyles } from './globalStyles';
import { LinearGradient } from 'expo-linear-gradient';
import colors from './assets/colors/colors';

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
        <Text style={glStyles.adverText}>광고</Text>
      </View>
    </LinearGradient>
  );
}
