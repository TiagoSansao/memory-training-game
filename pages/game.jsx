import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Platform, Pressable } from 'react-native';

export default function game() {


  function buttons() {
    let buttonsQuantity = 9;
    let buttonsArr = [];
    for (let i = 0; i < buttonsQuantity; i += 1) {
      buttonsArr.push(<Pressable key={`btn${i}`} onPress={() => {}} style={({ pressed }) => [{backgroundColor: pressed ? 'black' : 'blue'}, styles.button]} />)
    }
    return buttonsArr
    
  }

  return (
  <SafeAreaView style={styles.container}>
    <Text>Pijas</Text>
    <View style={styles.btnContainer}>{buttons()}</View>
  </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  button: {
    width: 100,
    height: 100,
  },
  btnContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',

  }
})