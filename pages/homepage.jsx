import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Platform, TouchableOpacity } from 'react-native';

export default function homepage({playListener}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text>Memory Training</Text>
      </View>
      <View>
        <TouchableOpacity onPress={playListener} style={styles.playButton} >
          <Text>PLAY</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {

  },
  playButton: {

  },
});
