import React, { useState } from 'react';
import Game from './src/screens/game';
import Homepage from './src/screens/home';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const fetchFonts = () => {
  return Font.loadAsync({
    'press-start': require('./src/assets/fonts/PressStart2P-Regular.ttf')
  })
}

export default function App() {

  const [screen, setScreen] = useState("homepage");
  const [dataLoaded, setDataLoaded] = useState(false);

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
