import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, SafeAreaView, Dimensions, TouchableHighlight, TouchableOpacity, Alert, ImagePickerIOSStatic } from 'react-native';
import { Audio } from 'expo-av';
import { InterstitialAdManager } from "expo-ads-facebook";
import * as Linking from 'expo-linking';
import styles from '../styles/gameStyles';
import translate from '../utils/translate';
import config from "../../config/config";

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const { width } = Dimensions.get('window');

export default function game({endListener, lang}) {


  useEffect(() => {
    InterstitialAdManager.showAd(config.AD_INTERSTICIAL_01_AD).then((clicked) => {
      console.log('executed');
    }).catch((error) => {console.log(console.log(error))})
  }, [])

  // TODO:
  // Timer (X)
  // Go to menu button (X)
  // Intersitial ads ( )
  // Sound (X)
  // Home stylization (X)
  // MULTI-LANGUAGE ( X )
  // Sound when player clicks ( X )
  // Continue from where you stopped using video ads ( )
 
  // AsyncStorage.clear(); // For test purposes

  // --------------


  interface iStatistics {
    games?: string[],
    averageScore?: string,
    lastScore?: number,
    gamesLength?: number,
    record?: number,
  }

  type iStatisticsOrNull = iStatistics | any;

  const [currentHIghlightedButton, setCurrentHighlightedButton] = useState<number|null>(null);
  const [playerTime, setPlayerTime] = useState<boolean>(false);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState<number>(1);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [gameState, setGameState] = useState<string>("in-game");
  const [sound, setSound] = useState<any>();
  const [sequence, setSequence] = useState<Array<number>>([]);
  const [rateOurAppPreference, setRateOurAppPreference] = useState<boolean>(true);
  const [lostTextH1, setLostTextH1] = useState<string>(translate("LOST_MESSAGE", lang));
  const [lostRecord, setLostRecord] = useState<string>(translate("RECORD", lang));
  const [circles, setCircles] = useState<number[]>([0,0,0,0,0,0,0,0,0,0]);
  const [gameTimer, setGameTimer]  = useState<number>(0);
  const [statistics, setStatistics] = useState<iStatistics|boolean|any>({});


  // -------------- 

  console.log(config.FACEBOOK_APP_ID);

  
  useEffect(() => {
    if (!playerTime) return setGameTimer(0);
    const timerInterval = setInterval(() => {
      if (gameTimer >= 5) return lostGame();
      setGameTimer((gt => gt + 1));
    }, 1000)
    return () => clearInterval(timerInterval);
  }, [gameTimer, playerTime])


  useEffect(() => {
      retrieveDataFromStorage();
      startNewGame();
  }, [])

  useEffect(() => {
    return sound ? () => { sound.sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  // --------------


  
  
  const setGameInStorageAndUpdateStatistics = async (lastScore) => {
    try {
      let newStatistics:iStatistics|any = {};
      let currentStatistics:string|null = await AsyncStorage.getItem('statistics');
      if (currentStatistics) {
        newStatistics = JSON.parse(currentStatistics);
        newStatistics.games!.push(lastScore);
        newStatistics.averageScore = (newStatistics.games!.reduce((totalScore, score ) => totalScore + score) / newStatistics.games!.length).toFixed(1);
        newStatistics.record = lastScore;
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

  async function playAudio(whichAudio: string, whichButton: number|null) {
    let sound;
    switch(whichAudio) {
      case 'highlight': 
        switch(whichButton) {
          case 0:
            sound = await Audio.Sound.createAsync(
              require(`../assets/sounds/buttons-sounds/0.wav`), {volume: 1}
            );
            break;
          case 1:
            sound = await Audio.Sound.createAsync(
              require(`../assets/sounds/buttons-sounds/1.wav`), {volume: 1}
            );
            break;
          case 2:
            sound = await Audio.Sound.createAsync(
              require(`../assets/sounds/buttons-sounds/2.wav`), {volume: 1}
            );
            break;
          case 3:
            sound = await Audio.Sound.createAsync(
              require(`../assets/sounds/buttons-sounds/3.wav`), {volume: 1}
            );
            break;
          case 4:
            sound = await Audio.Sound.createAsync(
              require(`../assets/sounds/buttons-sounds/4.wav`), {volume: 1}
            );
            break;
          case 5:
            sound = await Audio.Sound.createAsync(
              require(`../assets/sounds/buttons-sounds/5.wav`), {volume: 1}
            );
            break;
          case 6:
            sound = await Audio.Sound.createAsync(
              require(`../assets/sounds/buttons-sounds/6.wav`), {volume: 1}
            );
            break;
          case 7:
            sound = await Audio.Sound.createAsync(
              require(`../assets/sounds/buttons-sounds/7.wav`), {volume: 1}
            );
            break;
          case 8:
            sound = await Audio.Sound.createAsync(
              require(`../assets/sounds/buttons-sounds/8.wav`), {volume: 1}
            );
            break;
        }
        break;
      case 'playButton':
        sound = await Audio.Sound.createAsync(
          require(`../assets/sounds/playButton.mp3`), {volume: 1}
        )
        break;
      case 'lost':
        sound = await Audio.Sound.createAsync(
          require(`../assets/sounds/lost.mp3`), {volume: 1}
        )
        break;
    }
    setSound(sound);
    await sound.sound.playAsync();
    return;
  }

  
  // --------------


  async function highlightSequence(newCurrentSequenceIndex) {
    for (let i = 0; i < newCurrentSequenceIndex; i += 1) {
      await timer(100);
      playAudio('highlight', sequence[i]);
      setCurrentHighlightedButton(sequence[i]);
      await timer(500);
      setCurrentHighlightedButton(null);
    }
    setGameTimer(0);
    setPlayerTime(true);
  }

  async function lostGame() {
    playAudio('lost', null);
    setGameInStorageAndUpdateStatistics(currentSequenceIndex);
    setPlayerTime(false);
    setGameState("lost");
    if (currentSequenceIndex > statistics.record) {
      
      setLostRecord(translate("PREVIOUS_RECORD", lang))
      setLostTextH1(translate("NEW_RECORD", lang))
      if (rateOurAppPreference === true) {
        Alert.alert(translate("RATE_OUR_APP", lang), translate("RATE_MESSAGE", lang), [
          {
            text: "Ok",
            onPress: async () => {
              await setDataInStorage("ok");
              Linking.openURL("https://play.google.com/store/apps/details?id=com.tiagosansao.memorytraininggame");
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
    const localSequence:Array<number> = [];
    for(let i = 0; i < 100; i += 1) {
      localSequence.push(Math.floor(Math.random() * 9)); // generate sequence
    }
    setPlayerTime(false);
    setSequence(localSequence);
    setCurrentSequenceIndex(1);
    setGameState("in-game");
    setPlayerSequence([]);
    setLostTextH1(translate("LOST_MESSAGE", lang));
    setLostRecord(translate("RECORD", lang));
    setCircles([0,0,0,0,0,0,0,0,0,0]);
    setGameTimer(0);
    setCurrentHighlightedButton(localSequence[0]);
    playAudio('highlight', localSequence[0]);
    setTimeout(() => {
      setCurrentHighlightedButton(null);
      setPlayerTime(true);
    }, 500);
  }
  
  function pressListener(btnIndex) {
    if (playerTime !== true) return;
    playAudio("highlight", btnIndex);
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
    let buttonsArr:Array<JSX.Element> = [];
    let buttonsWithRowsArr:Array<any> = [];

    for (let i = 0; i < RowQuantity; i += 1) {
      buttonsWithRowsArr.push([]);
    }

    for (let i = 0; i < buttonsQuantity; i += 1) {
      buttonsArr.push(<TouchableHighlight underlayColor="#cf6b00" disabled={!playerTime} key={`btn${i}`} onPress={() => {pressListener(i)}} style={[{backgroundColor: i === currentHIghlightedButton ? '#1deef2' : '#be0dd9' }, styles.button]} ><Text></Text></TouchableHighlight>)
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

  function analyticsString(averageScore, currentScore) {
    let percentage, text, color;
    if (currentScore > averageScore) {
      percentage = currentScore / averageScore;
      text = "ABOVE_AVERAGE";
      color = "#21c44d";
    } else {
      percentage = averageScore / currentScore; 
      text = "BELOW_AVERAGE";
      color = "#e82727";
    }
    const element = <Text style={styles.lostTextH2}>{<Text style={{color: color}}>{(percentage * 100).toFixed(0)}%</Text>} {translate(text, lang)}</Text>
    return element;
  }

  // --------------

  return (
    <SafeAreaView style={styles.container}>
      { gameState === "lost" && 
        <View style={styles.lostScreen}>
          <Text style={styles.lostTextH1}>{lostTextH1}{"\n"}{currentSequenceIndex} {translate("POINTS", lang)}!</Text>
          <View style={styles.endScreenButtonsView}>
            <TouchableOpacity onPress={() => {startNewGame();}} style={styles.endScreenButton}><Text style={styles.endScreenButtonTxt}>{translate("TRY_AGAIN", lang)}</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {endListener();}} style={styles.endScreenButton}><Text style={styles.endScreenButtonTxt}>{translate("HOME", lang)}</Text></TouchableOpacity>
          </View>
          <View style={styles.dataDisplay}>
          {analyticsString(statistics.averageScore, currentSequenceIndex)}
          </View>
        </View>
      }
      <View style={styles.heading}>
        <Text style={styles.title}>{translate("NAME", lang)}</Text>
        <Text style={styles.caption}>{translate("CAPTION", lang)}</Text>
      </View>
      <View style={[styles.statusLine, {backgroundColor: playerTime ? '#21c44d' : '#e82727'}]}>{getCircles()}</View>
      <View style={styles.btnContainer}>{buttons().map(((rowArr, index) => {
        return <View key={index} style={styles.row}>{rowArr}</View>
      }))}</View>
      <View style={[styles.timerLine, {backgroundColor: playerTime ? '#21c44d' : '#e82727'}]}>
        <View style={[styles.slider, {width: ((width * 0.80) - 20) * ((gameTimer / 10) * 2 ),}]}></View>
      </View>
      <View style={styles.statistics}>
        <Text style={styles.statisticH1}>{translate("STATISTICS", lang)}</Text>
        <Text style={styles.statisticData}>{translate("LAST_SCORE", lang)} {statistics.lastScore ? statistics.lastScore : 'no data'}</Text>
        <Text style={styles.statisticData}>{translate("AVERAGE_SCORE", lang)} {statistics.averageScore ? statistics.averageScore + ` (${statistics.gamesLength} games)` : 'no data'} </Text>
        <Text style={styles.statisticData}>{translate("RECORD", lang)} {statistics.record ? statistics.record : 'no data'}</Text>
      </View>
    </SafeAreaView>
  )

};

