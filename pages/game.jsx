import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Platform, Pressable, Dimensions, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';


const {height, width} = Dimensions.get("window");
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

export default function game({endListener}) {

  //AsyncStorage.clear();

  const [currentHIghlightedButton, setCurrentHighlightedButton] = useState(null);
  const [playerTime, setPlayerTime] = useState(false);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(1);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [gameState, setGameState] = useState("in-game");
  const [sound, setSound] = useState(); 
  const [sequence, setSequence] = useState([]);
  const [rateOurAppPreference, setRateOurAppPreference] = useState(true);

  useEffect(() => {
    retrieveDataFromStorage();
    startNewGame();
  }, [])

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  const retrieveDataFromStorage = async () => {
    try {
      const rateOurAppAnswer = await AsyncStorage.getItem('rateOurAppAnswer');
      if (rateOurAppAnswer === null) return;
      if (rateOurAppAnswer === "never") setRateOurAppPreference(false);
      else setRateOurAppPreference(true);
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

  /*async function playAudio() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/playButton.mp3')
    )
    setSound(sound);
    console.log('playing')
    await sound.playAsync();
  }*/
  

  async function highlightSequence(newCurrentSequenceIndex) {
    for (let i = 0; i < newCurrentSequenceIndex; i += 1) {
      await timer(100);
      setCurrentHighlightedButton(sequence[i]);
      await timer(500);
      setCurrentHighlightedButton(null);
    }
    setPlayerTime(true);
  }

  function lostGame() {
    setGameState("lost");
    setPlayerTime(false);
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
    setPlayerSequence([]);
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
        console.log('Next level')
        let newCurrentSequenceIndex = currentSequenceIndex + 1;
        setCurrentSequenceIndex(newCurrentSequenceIndex);
        setPlayerSequence([]);
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
      buttonsArr.push(<TouchableHighlight underlayColor="#4361ee" disabled={!playerTime} key={`btn${i}`} onPress={() => {pressListener(i)}} style={[{backgroundColor: i === currentHIghlightedButton ? '#e76f51' : '#e9c46a' }, styles.button]} ><Text></Text></TouchableHighlight>)
    }
    
    buttonsWithRowsArr.forEach((row) => {
      for (let i = 0; i < RowQuantity; i += 1) {
        row.push(buttonsArr.shift())
      }
    });
    
    return buttonsWithRowsArr;
  }

  if (gameState === "lost") {
    if (rateOurAppPreference === true) {
      Alert.alert("Rate our app", "Could you rate our APP on Google Play Store? We'd be glad to know your opinion!", [
        {
          text: "Ok",
          onPress: () => {setDataInStorage("ok")}
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
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.lostScreen}>
          <Text style={styles.lostTextH1}>YOU GOT{"\n"}{currentSequenceIndex} POINTS!</Text>
          <View style={styles.endScreenButtonsView}>
            <TouchableOpacity onPress={startNewGame} style={styles.endScreenButton}><Text style={styles.endScreenButtonTxt}>TRY AGAIN</Text></TouchableOpacity>
            <TouchableOpacity onPress={endListener} style={styles.endScreenButton}><Text style={styles.endScreenButtonTxt}>HOME</Text></TouchableOpacity>
          </View>
          <Text>Your record: {currentSequenceIndex}</Text>
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
    <View style={styles.btnContainer}>{buttons().map(((rowArr, index) => {
      return <View key={index} style={styles.row}>{rowArr}</View>
    }))}</View>
  </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  heading: {
    height: 100,
  },
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: '#fff',
    flexDirection: 'column',
    backgroundColor: '#2a9d8f',
    width: width,
    height: height,
    position: 'relative',
  },
  button: {
    flex: 1,
    margin: 5,
  },
  btnContainer: {
    display: 'flex',
    width: width * 0.80,
    height: width *0.80,
    justifyContent: 'space-around',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignSelf: 'center',
    backgroundColor: '#264653',
    padding: 5,
  },
  row: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  lostScreen: {
    position: 'absolute',
    alignSelf: 'center',
    top: 100,
    zIndex: 10,
    width: width*0.80,
    height: width*0.80,
    opacity: 0.9,
    backgroundColor: 'black',
  },
  lostTextH1: {
    fontFamily: 'press-start',
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    marginTop: 30,
  },
  title: {
    fontFamily: 'press-start',
    fontSize: 35,
    textAlign: 'center',
    marginTop: 20,
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 10,
  },
  endScreenButtonsView: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  endScreenButton: {
    backgroundColor: 'white',
    width: 120,
    height: 40,
    justifyContent: 'center',
    paddingTop: 5,
    borderRadius: 0,
  },
  endScreenButtonTxt: {
    textAlign: 'center',
    fontFamily: 'press-start',
  },
})