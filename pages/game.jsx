import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Platform, Pressable, Dimensions } from 'react-native';

const {height, width} = Dimensions.get("window");
const sequence = [];

for(let i = 0; i < 100; i += 1) {
  sequence.push(Math.floor(Math.random() * 10));
}


export default function game() {

  const [currentHIghlightedButton, setCurrentHighlightedButton] = useState(null);
  const [playerTime, setPlayerTime] = useState(false);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(1);
  const [playerSequence, setPlayerSequence] = useState([]);

  useEffect(() => {
    setCurrentHighlightedButton(sequence[0]);
    setTimeout(() => {
      setCurrentHighlightedButton(null)}, 500);
    setPlayerTime(true);
    setPlayerSequence([]);
  }, [])

  function highlightSequence(newCurrentSequenceIndex) {
    setPlayerTime(false);
    for (let i = 0; i < newCurrentSequenceIndex; i += 1) {
      console.log('aqui')
      setCurrentHighlightedButton(sequence[i]);
      setTimeout(() => {
        setCurrentHighlightedButton(null);
      }, 500)
      
    }
  }

  
  function pressListener(btnIndex) {
    if (playerTime !== true) return;
    const newPlayerSequence = [...playerSequence, btnIndex];
    setPlayerSequence(newPlayerSequence);
    newPlayerSequence.forEach((playerValue, index) => {
      if (playerValue !== sequence[index]) return console.log('errou') // ADD RESET HERE
      if (index + 1  === currentSequenceIndex) { 
        console.log('chego')
        let newCurrentSequenceIndex = currentSequenceIndex + 1;
        setCurrentSequenceIndex(newCurrentSequenceIndex);
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
      buttonsArr.push(<Pressable key={`btn${i}`} onPress={(event) => {pressListener(i)}} style={[{backgroundColor: i === currentHIghlightedButton ? '#e76f51' : '#e9c46a' }, styles.button]} />)
    }
    
    buttonsWithRowsArr.forEach((row, index) => {
      for (let i = 0; i < RowQuantity; i += 1) {
        row.push(buttonsArr.shift())
      }
    });
    
    return buttonsWithRowsArr;
  }

  if (playerTime === false) {

  }

  return (
  <SafeAreaView style={styles.container}>
    <Text>Pijas</Text>
    <View style={styles.btnContainer}>{buttons().map(((rowArr, index) => {
      return <View key={index} style={styles.row}>{rowArr}</View>
    }))}</View>
  </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: '#fff',
    flexDirection: 'column',
    backgroundColor: '#2a9d8f',
    width: width,
    height: height,
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
})