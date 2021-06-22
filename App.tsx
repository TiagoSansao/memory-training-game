import React, { useState } from 'react';
import Game from './pages/game';
import Homepage from './pages/homepage';

export default function App() {

  const [screen, setScreen] = useState("homepage");
  const [record, setRecord] = useState(0);
  
  function endListener() {
    setScreen("homepage");
  }

  function playListener() {
    setScreen("game");
  }

  if (screen === "homepage") return <Homepage playListener={playListener}/>
  return <Game />
  
}
