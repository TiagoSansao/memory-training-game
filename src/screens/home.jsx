import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from '../styles/homeStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function homepage({playListener}) {
  
  const [statistics, setStatistics] = useState();

  const getStatistics = async () => {
    try {
      const loadedStatistics = await AsyncStorage.getItem('statistics');
      if (!loadedStatistics) return setStatistics(false);
      setStatistics(JSON.parse(loadedStatistics));
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getStatistics()
  }, []);

  
  if (!statistics) return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>Memory Training</Text>
      </View>
      <View>
        <TouchableOpacity onPress={playListener} style={styles.playButton} >
          <Text style={styles.playButtonTxt}>PLAY</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>Memory Training</Text>
      </View>
      <View>
        <TouchableOpacity onPress={playListener} style={styles.playButton} >
          <Text style={styles.playButtonTxt}>PLAY</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Statistics</Text>
        <Text>Last Score: {statistics.lastScore}</Text>
        <Text>Average Score: {statistics.averageScore} ({statistics.gamesLength} games)</Text>
        <Text>Record: {statistics.lastScore}</Text>
      </View>
    </SafeAreaView>
  )
}

