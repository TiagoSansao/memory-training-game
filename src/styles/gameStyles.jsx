import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';

const {height, width} = Dimensions.get("window");

export default StyleSheet.create({
  heading: {
    height: 100,
  },
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: '#fff',
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
  lostTextH2: {
    fontFamily: 'press-start',
    color: 'white',
    textAlign: 'left',
    fontSize: 15,
    marginLeft: 20,
    
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
  dataDisplay: {
    marginTop: 30,
  },
  statusLine: {
    
    borderColor: '#250396',
    borderTopWidth: 10,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 30,
    width: width*0.80,
  },
  statusGeometric: {
    display: 'none',
    width: 20,
    height: 20,
    backgroundColor: 'red',
  }, 
})