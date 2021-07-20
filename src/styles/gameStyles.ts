import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';

const {height, width} = Dimensions.get("window");

export default StyleSheet.create({
  heading: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flexDirection: 'column',
    backgroundColor: '#1d55f0',
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
    backgroundColor: '#250396',
    padding: 5,
  },
  row: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  lostScreen: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 35,
    paddingBottom: 35,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    top: 100,
    zIndex: 10,
    width: width*0.80,
    height: width*0.80 + 70,
    opacity: 0.9,
    backgroundColor: 'black',
  },
  lostTextH1: {
    fontFamily: 'press-start',
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    lineHeight: 35,
  },
  lostTextH2: {
    fontFamily: 'press-start',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
    
  },
  title: {
    textTransform: 'uppercase',
    fontFamily: 'press-start',
    fontSize: 35,
    textAlign: 'center',
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 10,
    textDecorationLine: "underline",
  },
  caption: {
    textTransform: 'uppercase',
    fontFamily: 'press-start',
    fontSize: 15,
    textAlign: 'center',
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
  dataDisplay: {
    marginTop: 30,
  },
  statusLine: {
    justifyContent: 'space-evenly',
    borderColor: '#250396',
    borderTopWidth: 10,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    alignItems: 'center',
    alignSelf: 'center',
    height: 30,
    width: width*0.80,
    flexDirection: 'row',
  },
  statusGeometric: {
    width: 15,
    height: 15,
    borderRadius: 50,
  }, 
  timerLine: {
    justifyContent: 'flex-end',
    borderColor: '#250396',
    borderBottomWidth: 10,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    alignItems: 'center',
    alignSelf: 'center',
    height: 30,
    width: width*0.80,
    flexDirection: 'row',
  },  
  slider: {
    backgroundColor: 'yellow',
    height: '100%',
    
  },
  statistics: {
    marginTop: 50,
    backgroundColor: '#619eff',
    padding: 10,
    width: width * 0.80,
    borderRadius: 15,
    alignSelf: 'center',
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
});