import React, { useState } from 'react';
import Game from './src/screens/game';
import Homepage from './src/screens/home';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Audio } from 'expo-av';
import { useEffect } from 'react';

const fetchFonts = () => {
  return Font.loadAsync({
    'press-start': require('./src/assets/fonts/PressStart2P-Regular.ttf')
  })
}

export default function App() {

  const [screen, setScreen] = useState<string>("homepage");
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [sound, setSound] = useState<any>();

  useEffect(() => {
    loadSong();
  }, [])

  async function loadSong() {
    const { sound } = await Audio.Sound.createAsync(
      require('./src/assets/sounds/song.wav'), {volume: 0.5, isLooping: true}
    )
    setSound(sound);
    sound.playAsync();
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
  


  if (screen === "homepage") return <Homepage playListener={playListener}/>
  return <Game endListener={endListener}/>
  
}
