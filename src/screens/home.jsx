import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from '../styles/homeStyles';

export default function homepage({playListener}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>Memory Training</Text>
      </View>
      <View>
        <TouchableOpacity onPress={playListener} style={styles.playButton} >
          <Text>PLAY</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

