import React, { useState } from 'react';
import Game from './src/screens/game';
import Homepage from './src/screens/home';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Audio } from 'expo-av';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchFonts = () => {
  return Font.loadAsync({
    'press-start': require('./src/assets/fonts/PressStart2P-Regular.ttf')
  })
}

export default function App() {

  const [screen, setScreen] = useState<string>("homepage");
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [sound, setSound] = useState<any>();
  const [songState, setSongState] = useState<string>("true");
  

  useEffect(() => {
    loadSong();
  }, [])

  async function loadSong() {
    let shouldPlayBool
    shouldPlayBool = await AsyncStorage.getItem("music");
    console.log(typeof shouldPlayBool);
    if (shouldPlayBool === null || shouldPlayBool === undefined) shouldPlayBool = "true";
    
    const { sound } = await Audio.Sound.createAsync(
      require('./src/assets/sounds/song.wav'), { volume: 0.5, isLooping: true }
    )
    setSound(sound);
    setSongState(shouldPlayBool);
    if (shouldPlayBool === 'true') return sound.playAsync();
  }


  if (!dataLoaded) {
    return (
      <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} onError={console.warn} />
    )
  }

  
  function endListener() {
    setScreen("homepage");
  }

  function playListener() {
    setScreen("game");
  }
  


  if (screen === "homepage") return <Homepage songState={songState} setSongState={setSongState} soundController={sound} playListener={playListener}/>
  return <Game endListener={endListener}/>
  
}
