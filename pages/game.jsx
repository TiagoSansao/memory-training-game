import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Platform, TouchableOpacity } from 'react-native';

export default function game() {
  return (
  <SafeAreaView style={styles.container}>
    <Text>Pijas</Text>
  </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})