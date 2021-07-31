import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Text, Image, View, SafeAreaView, TouchableHighlight } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import styles from '../styles/homeStyles';
import translate from '../utils/translate';
import config from '../../config/config';

interface iStatistics {
  games?: string[],
  averageScore?: string,
  lastScore?: number,
  gamesLength?: number,
  record?: number,
}

export default function homepage({playListener, lang, soundController, setSongState, songState, switchLanguage}) {
  
  const [statistics, setStatistics] = useState<iStatistics|boolean|any>({});
  
  const flags = {
    pt_BR: require('../assets/images/flags/pt_BR.png'),
    en_US: require('../assets/images/flags/en_US.png')
  }

  useEffect(() => {
      getStatistics();
      // InterstitialAdManager.showAd(config.AD_INTERSTICIAL_01_AD)
      // .then((didClick) => {})
      // .catch((error) => {console.log(error)});
  }, []);
  

  const getStatistics = async () => {
    try {
      const loadedStatistics = await AsyncStorage.getItem('statistics');
      if (!loadedStatistics) return setStatistics(false);
      setStatistics(JSON.parse(loadedStatistics));
    } catch(e) {
      console.log(e);
    }
  }

  async function controlSong(): Promise<void> {
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
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>{translate("NAME", lang)}</Text>
        <Text style={styles.caption}>{translate("CAPTION", lang)}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableHighlight underlayColor="#cf6b00" onPress={playListener} style={styles.playButton} >
          <Text style={styles.playButtonTxt}>{translate("PLAY", lang)}</Text>
        </TouchableHighlight>
        <View style={styles.miniButtons}>
          <TouchableHighlight underlayColor="#cf6b00" style={[styles.songIcon, {backgroundColor: songState === 'true' ? '#940019': '#005e00'}]} onPress={controlSong}>
            <Entypo name={'note'} color='white' size={45}></Entypo>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="#cf6b00" style={styles.starSquare} onPress={switchLanguage}>
            <Image style={{width: 50, height: 50}} source={flags[lang]}></Image>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="#cf6b00" style={styles.starSquare} onPress={() => {
            Linking.openURL("https://play.google.com/store/apps/details?id=com.tiagosansao.memorytraininggame")
          }}>
            <Entypo name={'star'} color='white' size={50}></Entypo>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="#cf6b00" style={styles.starSquare} onPress={() => {
            Alert.alert(translate("HOW_TO_PLAY", lang), translate("HOW_TO_PLAY_MESSAGE", lang))
          }}>
            <Text style={{fontSize: 60, color: 'white'}}>?</Text>
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.statistics}>
        <Text style={styles.statisticH1}>{translate("STATISTICS", lang)}</Text>
        <Text style={styles.statisticData}>{translate("LAST_SCORE", lang)} {statistics.lastScore ? statistics.lastScore : 'no data'}</Text>
        <Text style={styles.statisticData}>{translate("AVERAGE_SCORE", lang)} {statistics.averageScore ? statistics.averageScore + ` (${statistics.gamesLength} games)` : 'no data'} </Text>
        <Text style={styles.statisticData}>{translate("RECORD", lang)} {statistics.record ? statistics.record : 'no data'}</Text>
      </View>
    </SafeAreaView>
  )
}

