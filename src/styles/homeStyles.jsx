import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: '#1d55f0',
    alignItems: 'center',
  },
  heading: {

  },
  playButton: {
    backgroundColor: 'white',
    width: width*0.60,
    height: 40,
    justifyContent: 'center',
    paddingTop: 5,
    borderRadius: 0,
    backgroundColor: '#0ce80f',
  },
  playButtonTxt: {
    textAlign: 'center',
    color: 'black',
    fontFamily: 'press-start',
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
});
