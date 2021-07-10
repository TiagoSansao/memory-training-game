import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import { Audio } from 'expo-av';
import styles from '../styles/gameStyles';
import {  Text, View, SafeAreaView, Dimensions, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const { width } = Dimensions.get('window');



export default function game({endListener}) {


  // TODO:
  // Timer (X)
  // Go to menu button (NOT GONNA DO)
  // Ads (the video ones)
  // Sound (song and buttons)
  // Home stylization (MAYBE DONE)
  //

  // AsyncStorage.clear(); // For test purposes

  // --------------

  // interface iSound {
  //   'highlight': Sound,
  //   'lost': Sound,
  // }

  const [currentHIghlightedButton, setCurrentHighlightedButton] = useState(null);
  const [playerTime, setPlayerTime] = useState(false);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(1);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [gameState, setGameState] = useState("in-game");
  const [sounds, setSounds] = useState/*<iSound>*/(false);
  const [sequence, setSequence] = useState([]);
  const [rateOurAppPreference, setRateOurAppPreference] = useState(true);
  const [lostTextH1, setLostTextH1] = useState("YOU GOT");
  const [lostRecord, setLostRecord] = useState("Record:");
  const [circles, setCircles] = useState([0,0,0,0,0,0,0,0,0,0]);
  const [gameTimer, setGameTimer]  = useState(0);
  const [statistics, setStatistics] = useState({});


  // --------------
  
  useEffect(() => {
    if (!playerTime) return setGameTimer(0);
    const timerInterval = setInterval(() => {
      if (gameTimer >= 5) return lostGame();
      setGameTimer((gt => gt + 1));
    }, 1000)
    return () => clearInterval(timerInterval);
  }, [gameTimer, playerTime])


  useEffect(() => {
    (async function() {
      const [highlight, lost] = await Promise.all([
        Audio.Sound.createAsync(
          require(`../assets/sounds/highlight.mp3`)
        ),
        Audio.Sound.createAsync(
          require(`../assets/sounds/lost.mp3`)
        )
      ])
      console.log('got here 2')
      const soundsObj = {
        highlight: highlight,
        lost: lost,
      }
      retrieveDataFromStorage();
      setSounds(soundsObj);
    })()
  }, [])

  useEffect(() => {
    if (sounds === false) return;
    
    startNewGame();
  }, [sounds])


  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         sound.unloadAsync(); }
  //     : undefined;
  // }, [sound]);



  // --------------

  const setGameInStorageAndUpdateStatistics = async (lastScore) => {
    try {
      let newStatistics = {};
      let currentStatistics = await AsyncStorage.getItem('statistics');
      if (currentStatistics) {
        console.log('já');
        newStatistics = JSON.parse(currentStatistics);
        newStatistics.games.push(lastScore);
        newStatistics.averageScore = (newStatistics.games.reduce((totalScore, score ) => totalScore + score) / newStatistics.games.length).toFixed(1);
        newStatistics.lastScore = lastScore;
        newStatistics.gamesLength = newStatistics.games.length;
        newStatistics.record = lastScore > newStatistics.record ? lastScore : newStatistics.record;
        setStatistics(newStatistics);
        await AsyncStorage.setItem('statistics', JSON.stringify(newStatistics));
      } else {
        newStatistics.record = lastScore;
        newStatistics.gamesLength = 1;
        newStatistics.games = [lastScore];
        newStatistics.averageScore = lastScore;
        newStatistics.lastScore = lastScore;
        setStatistics(newStatistics);
        await AsyncStorage.setItem('statistics', JSON.stringify(newStatistics));
      }
    } catch (e) {
      console.log(e);
    }
  }


  const retrieveDataFromStorage = async () => {
    try {
      const rateOurAppAnswer = await AsyncStorage.getItem('rateOurAppAnswer');
      const loadedStatistics = await AsyncStorage.getItem('statistics');
      
      if (rateOurAppAnswer === "never") setRateOurAppPreference(false);
      else setRateOurAppPreference(true);

      if (!loadedStatistics) return setStatistics(false);
      setStatistics(JSON.parse(loadedStatistics));
    } catch (e) {
      console.log(e);
    }
  }

  const setDataInStorage = async (answer) => {
    try {
      if (answer !== "never" && answer !== "ok") return;
      await AsyncStorage.setItem('rateOurAppAnswer', 'never')
      setRateOurAppPreference(false);
    } catch (e) {
      console.log(e);
    }
  }

  // --------------

  async function playAudio(whichAudio) {
    console.log(sounds);
    await sounds[whichAudio].sound.playFromPositionAsync(0);
  }
  
  // --------------


  async function highlightSequence(newCurrentSequenceIndex) {
    for (let i = 0; i < newCurrentSequenceIndex; i += 1) {
      await timer(100);
      playAudio('highlight');
      setCurrentHighlightedButton(sequence[i]);
      await timer(500);
      setCurrentHighlightedButton(null);
    }
    setGameTimer(0);
    setPlayerTime(true);
  }

  async function lostGame() {
    playAudio('lost');
    setGameInStorageAndUpdateStatistics(currentSequenceIndex);
    setPlayerTime(false);
    setGameState("lost");
    if (currentSequenceIndex > statistics.record) {
      
      setLostRecord("Previous Record:")
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
    setPlayerSequence([]);
    setLostTextH1("YOU GOT");
    setLostRecord("Record:");
    setCircles([0,0,0,0,0,0,0,0,0,0]);
    setGameTimer(0);
    setCurrentHighlightedButton(localSequence[0]);
    playAudio('highlight');
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
            <Text style={styles.lostTextH2}>{lostRecord} {statistics.record}</Text>
            <Text style={styles.lostTextH2}>Rank: #{statistics.record}</Text>
          </View>
        </View>
        <View style={styles.heading}><Text style={styles.title}>MEMORY TRAINING</Text></View>
        <View style={[styles.statusLine, {backgroundColor: playerTime ? '#21c44d' : '#e82727'}]}>{getCircles()}</View>
        <View style={styles.btnContainer}>{buttons().map(((rowArr, index) => {
          return <View key={index} style={styles.row}>{rowArr}</View>
        }))}</View>
        <View style={[styles.timerLine, {backgroundColor: playerTime ? '#21c44d' : '#e82727'}]}>
          <View style={[styles.slider, {width: ((width * 0.80) - 20) * ((gameTimer / 10) * 2 ),}]}></View>
        </View>
        <View style={styles.statistics}>
          <Text style={styles.statisticH1}>Statistics</Text>
          <Text style={styles.statisticData}>Last Score: {statistics.lastScore ? statistics.lastScore : 'no data'}</Text>
          <Text style={styles.statisticData}>Average Score: {statistics.averageScore ? statistics.averageScore + ` (${statistics.gamesLength} games)` : 'no data'} </Text>
          <Text style={styles.statisticData}>Record: {statistics.record ? statistics.record : 'no data'}</Text>
        </View>
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
    <View style={styles.statistics}>
      <Text style={styles.statisticH1}>Statistics</Text>
      <Text style={styles.statisticData}>Last Score: {statistics.lastScore ? statistics.lastScore : 'no data'}</Text>
      <Text style={styles.statisticData}>Average Score: {statistics.averageScore ? statistics.averageScore + ` (${statistics.gamesLength} games)` : 'no data'} </Text>
      <Text style={styles.statisticData}>Record: {statistics.record ? statistics.record : 'no data'}</Text>
    </View>
  </SafeAreaView>
  )
};

