import React, { useState, useEffect } from 'react';
import { Text, Image, View, SafeAreaView, TouchableHighlight } from 'react-native';
import { Audio } from 'expo-av';
import { Entypo } from '@expo/vector-icons';
import styles from '../styles/homeStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import soundIcon from '../assets/images/music.png';


export default function homepage({playListener, soundController, setSongState, songState}) {
  
  const [statistics, setStatistics] = useState();
  const [sound, setSound] = useState();
  
  useEffect(() => {
      getStatistics();
  }, []);
  
  useEffect(() => {
    return sound ? () => { sound.sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  const getStatistics = async () => {
    try {
      const loadedStatistics = await AsyncStorage.getItem('statistics');
      if (!loadedStatistics) return setStatistics(false);
      setStatistics(JSON.parse(loadedStatistics));
    } catch(e) {
      console.log(e);
    }
  }

  async function controlSong() {
    if (songState === 'true') {
      await soundController.pauseAsync();
      await AsyncStorage.setItem('music', 'false');
      setSongState('false');
      return;
    }
    await soundController.playAsync();
    await AsyncStorage.setItem('music', 'true');
    setSongState('true');
    return;   
  }

  
  async function playAudio(whichAudio) {
    let sound;
    switch(whichAudio) {
      case 'playButton':
        sound = await Audio.Sound.createAsync(
          require(`../assets/sounds/playButton.mp3`), {volume: 1}
        )
        break;
    }
    setSound(sound);
    await sound.sound.playAsync();
  }
  


  
  if (!statistics) return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>Memory Training</Text>
      </View>
      <View>
        <TouchableHighlight onPress={() => {playListener(); playAudio('playButton')}} style={styles.playButton} >
          <Text style={styles.playButtonTxt}>PLAY</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.statistics}>
        <Text style={styles.statisticH1}>Statistics</Text>
        <Text style={styles.statisticData}>Last Score: no data</Text>
        <Text style={styles.statisticData}>Average Score: no data </Text>
        <Text style={styles.statisticData}>Record: no data</Text>
      </View>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>Memory Training</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableHighlight onPress={playListener} style={styles.playButton} >
          <Text style={styles.playButtonTxt}>PLAY</Text>
        </TouchableHighlight>
        <View style={styles.miniButtons}>
          <TouchableHighlight style={[styles.songIcon, {backgroundColor: songState === 'true' ? '#940019': '#005e00'}]} onPress={controlSong}>
            <Entypo name={'note'} color='white' size={45}></Entypo>
          </TouchableHighlight>
          <TouchableHighlight style={styles.starSquare} onPress={() => {
            Linking.openURL("https://play.google.com/store/apps/details?id=com.tiagosansao.convertcase")
          }}>
            <Entypo name={'star'} color='white' size={50}></Entypo>
          </TouchableHighlight>
          <TouchableHighlight style={styles.starSquare} onPress={() => {}}>
            <Text style={{fontSize: 60, color: 'white'}}>?</Text>
          </TouchableHighlight>
        </View>
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

