import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from '../styles/homeStyles';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function homepage({playListener}) {
  
  const [statistics, setStatistics] = useState();
  const [sounds, setSounds] = useState({});

  const getStatistics = async () => {
    try {
      const loadedStatistics = await AsyncStorage.getItem('statistics');
      if (!loadedStatistics) return setStatistics(false);
      setStatistics(JSON.parse(loadedStatistics));
    } catch(e) {
      console.log(e);
    }
  }

  async function playAudio(whichAudio) {
    console.log('oi');
    sounds[whichAudio].sound.playFromPositionAsync(0);
  }

  

  useEffect(() => {
    

    (async function() {
      const [play] = await Promise.all([
        Audio.Sound.createAsync(
          require(`../assets/sounds/highlight.mp3`)
        ),
      ])
      const soundsObj = {
        play: play,
      }
      getStatistics();
      setSounds(soundsObj);
    })()

  }, []);

  
  if (!statistics) return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>Memory Training</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => {playListener(); playAudio('play')}} style={styles.playButton} >
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
      <View style={styles.buttons}>
        <TouchableOpacity onPress={playListener} style={styles.playButton} >
          <Text style={styles.playButtonTxt}>PLAY</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.statistics}>
        <Text style={styles.statisticH1}>Statistics</Text>
        <Text style={styles.statisticData}>Last Score: {statistics.lastScore}</Text>
        <Text style={styles.statisticData}>Average Score: {statistics.averageScore} ({statistics.gamesLength} games)</Text>
        <Text style={styles.statisticData}>Record: {statistics.record}</Text>
      </View>
    </SafeAreaView>
  )
}

