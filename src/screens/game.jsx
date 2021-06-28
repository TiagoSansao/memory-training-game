import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import styles from '../styles/gameStyles';
import {  Text, View, SafeAreaView, Dimensions, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';
import { RECORDING_OPTION_IOS_BIT_RATE_STRATEGY_VARIABLE_CONSTRAINED } from 'expo-av/build/Audio';

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const { width } = Dimensions.get('window');


export default function game({endListener}) {


  // TODO:
  // Timer
  // Go to menu button
  // Ads (the video ones)
  // Sound (song and buttons)
  // Home stylization
  //

  //AsyncStorage.clear(); // For test purposes

  // --------------

  const [currentHIghlightedButton, setCurrentHighlightedButton] = useState(null);
  const [playerTime, setPlayerTime] = useState(false);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(1);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [gameState, setGameState] = useState("in-game");
  const [sound, setSound] = useState(); 
  const [sequence, setSequence] = useState([]);
  const [rateOurAppPreference, setRateOurAppPreference] = useState(true);
  const [record, setRecord] = useState(0);
  const [lostTextH1, setLostTextH1] = useState("YOU GOT");
  const [circles, setCircles] = useState([0,0,0,0,0,0,0,0,0,0]);
  const [gameTimer, setGameTimer]  = useState(0);


  // --------------
  
  useEffect(() => {
    if (!playerTime) return setGameTimer(0);
    const timerInterval = setInterval(() => {
      if (gameTimer >= 5) return lostGame();
      console.log(gameTimer);
      setGameTimer((gt => gt + 1));
    }, 1000)
    return () => clearInterval(timerInterval);
  }, [gameTimer, playerTime])


  useEffect(() => {
    retrieveDataFromStorage();
    startNewGame();
  }, [])

  // useEffect(() => {
  //   if (playerTime) {
  //     setInterval(() => {
  //       setGameTimer(gameTimer + 0.10);
  //       console.log(gameTimer);
  //     }, 1000);
  //   }
  // }, [playerTime])

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);



  // --------------

  const retrieveDataFromStorage = async () => {
    try {
      const rateOurAppAnswer = await AsyncStorage.getItem('rateOurAppAnswer');
      const storedRecord = await AsyncStorage.getItem('record'); 

      if (storedRecord !== null) setRecord(storedRecord);

      if (rateOurAppAnswer === "never") setRateOurAppPreference(false);
      else setRateOurAppPreference(true);
    } catch (e) {
      console.log(e);
    }
  }

  const setDataInStorage = async (answer, record) => {
    try {
      if (answer) {
        if (answer !== "never" && answer !== "ok") return;
        await AsyncStorage.setItem('rateOurAppAnswer', 'never')
        setRateOurAppPreference(false);
      }
      else if (record) {
        await AsyncStorage.setItem('record', record.toString());
        setRecord(record);
      }
    } catch (e) {
      console.log(e);
    }
  }

  // --------------

  /*async function playAudio() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/playButton.mp3')
    )
    setSound(sound);
    console.log('playing')
    await sound.playAsync();
  }*/
  
  // --------------

  async function highlightSequence(newCurrentSequenceIndex) {
    for (let i = 0; i < newCurrentSequenceIndex; i += 1) {
      await timer(100);
      setCurrentHighlightedButton(sequence[i]);
      await timer(500);
      setCurrentHighlightedButton(null);
    }
    setGameTimer(0);
    setPlayerTime(true);
  }

  function lostGame() {
    setGameState("lost");
    setPlayerTime(false);
    if (currentSequenceIndex > record) {
      setDataInStorage(null, currentSequenceIndex);
      setLostTextH1("NEW RECORD")
      if (rateOurAppPreference === true) {
        Alert.alert("Rate our app", "Could you rate our APP on Google Play Store? We'd be glad to know your opinion!", [
          {
            text: "Ok",
            onPress: async () => {
              await setDataInStorage("ok");
              Linking.openURL("https://play.google.com/store/apps/details?id=com.tiagosansao.convertcase");
            }
          },
          {
            text: "Later",
            onPress: () => {setDataInStorage("later")}
          },
          {
            text: "Never ask again",
            onPress: () => {setDataInStorage("never")}
          }
        ])
      }
    }
  }


  function startNewGame() {
    const localSequence = [];
    for(let i = 0; i < 100; i += 1) {
      localSequence.push(Math.floor(Math.random() * 10)); // generate seqyebce
    }
    setSequence(localSequence);
    setCurrentSequenceIndex(1);
    setGameState("in-game");
    setPlayerTime(true);
    setCurrentHighlightedButton(localSequence[0]);
    //playAudio();
    setLostTextH1("YOU GOT");
    setPlayerSequence([]);
    setCircles([0,0,0,0,0,0,0,0,0,0]);
    setGameTimer(0);
    setTimeout(() => {
      setCurrentHighlightedButton(null)}, 500);
  }
  
  function pressListener(btnIndex) {
    if (playerTime !== true) return;
    const newPlayerSequence = [...playerSequence, btnIndex];
    setPlayerSequence(newPlayerSequence);
    newPlayerSequence.forEach( async (playerValue, index) => {
      if (playerValue !== sequence[index]) return lostGame();
      if (index + 1  === currentSequenceIndex) { 
        setPlayerTime(false);
        let newCurrentSequenceIndex = currentSequenceIndex + 1;
        setCurrentSequenceIndex(newCurrentSequenceIndex);
        setPlayerSequence([]);

        let localCircles = circles.slice();
        let whichCircle = (newCurrentSequenceIndex - 2) % 10;
        localCircles[whichCircle] += 1;
        setCircles(localCircles);

        await timer(1000);
        highlightSequence(newCurrentSequenceIndex);
        
      }
    })
  }

  function buttons() {
    let buttonsQuantity = 9;
    let RowQuantity = 3;
    let buttonsArr = [];
    let buttonsWithRowsArr = [];

    for (let i = 0; i < RowQuantity; i += 1) {
      buttonsWithRowsArr.push([]);
    }

    for (let i = 0; i < buttonsQuantity; i += 1) {
      buttonsArr.push(<TouchableHighlight underlayColor="#e82c39" disabled={!playerTime} key={`btn${i}`} onPress={() => {pressListener(i)}} style={[{backgroundColor: i === currentHIghlightedButton ? '#1deef2' : '#be0dd9' }, styles.button]} ><Text></Text></TouchableHighlight>)
    }
    
    buttonsWithRowsArr.forEach((row) => {
      for (let i = 0; i < RowQuantity; i += 1) {
        row.push(buttonsArr.shift());
      }
    });
    
    return buttonsWithRowsArr;
  }

  function getCircleColor(number) {
    let color;
    switch(number) {
      case 0: 
        color = 'white';
        break;
      case 1:
        color = '#dbfc03';
        break;
      case 2:
        color = '#fcc203';
        break;
      case 3:
        color = '#fc8403';
        break;
      case 4:
        color = '#fc4103';
        break;
    }
    return color;
  }

  function getCircles() {
    const circlesEl = circles.map(((circle, i) => {
      return <View key={i} style={[{backgroundColor: getCircleColor(circle)}, styles.statusGeometric]}></View>
    }))
    return circlesEl;
  }

  // --------------

  if (gameState === "lost") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.lostScreen}>
          <Text style={styles.lostTextH1}>{lostTextH1}{"\n"}{currentSequenceIndex} POINTS!</Text>
          <View style={styles.endScreenButtonsView}>
            <TouchableOpacity onPress={startNewGame} style={styles.endScreenButton}><Text style={styles.endScreenButtonTxt}>TRY AGAIN</Text></TouchableOpacity>
            <TouchableOpacity onPress={endListener} style={styles.endScreenButton}><Text style={styles.endScreenButtonTxt}>HOME</Text></TouchableOpacity>
          </View>
          <View style={styles.dataDisplay}>
            <Text style={styles.lostTextH2}>Record: {record}</Text>
            <Text style={styles.lostTextH2}>Rank: #{record}</Text>
            <Text style={styles.lostTextH2}>Rank: #{record}</Text>
          </View>
        </View>
        <View style={styles.heading}><Text style={styles.title}>MEMORY TRAINING</Text></View>
        <View style={styles.btnContainer}>{buttons().map(((rowArr, index) => {
          return <View key={index} style={styles.row}>{rowArr}</View>
        }))}</View>
      </SafeAreaView>
      )
  }

  return (
  <SafeAreaView style={styles.container}>
    <View style={styles.heading}><Text style={styles.title}>MEMORY TRAINING</Text></View>
    <View style={[styles.statusLine, {backgroundColor: playerTime ? '#21c44d' : '#e82727'}]}>{getCircles()}</View>
    <View style={styles.btnContainer}>{buttons().map(((rowArr, index) => {
      return <View key={index} style={styles.row}>{rowArr}</View>
    }))}</View>
    <View style={[styles.timerLine, {backgroundColor: playerTime ? '#21c44d' : '#e82727'}]}>
      <View style={[styles.slider, {width: ((width * 0.80) - 20) * ((gameTimer / 10) * 2 ),}]}></View>
    </View>
  </SafeAreaView>
  )
};

