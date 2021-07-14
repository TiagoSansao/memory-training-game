import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: '#1d55f0',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  heading: {
  },
  buttons: {
  },
  playButton: {
    width: width*0.80,
    height: 65,
    borderRadius: 10,
    justifyContent: 'center',
    paddingTop: 5,
    backgroundColor: '#0ce80f',
    borderColor: '#00245e',
    borderWidth: 5,
  },
  playButtonTxt: {
    textAlign: 'center',
    color: 'black',
    fontFamily: 'press-start',
    fontSize: 20,
    
  },
  title: {
    textTransform: 'uppercase',
    fontFamily: 'press-start',
    fontSize: 35,
    textAlign: 'center',
    marginTop: 20,
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 10,
  },
  statistics: {
    marginTop: 50,
    backgroundColor: '#619eff',
    padding: 10,
    borderRadius: 15,
    width: width * 0.80,
    borderColor: '#00245e',
    borderWidth: 5,
  },
  statisticH1: {
    color: 'yellow',
    textShadowRadius: 10,
    textShadowColor: 'black',
    fontSize: 25,
    textAlign: 'center',
  },
  statisticData: {
    color: 'black',
    fontSize: 15,
    textAlign: 'left',
  },
  songIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderColor: '#00245e',
    borderWidth: 5,
    borderRadius: 10,
  },
  miniButtons: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  starSquare: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 10,
    borderColor: '#00245e',
    borderWidth: 5,
    backgroundColor: '#003fa6',
  },
});
