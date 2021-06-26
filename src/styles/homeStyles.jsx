import { StyleSheet, StatusBar, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {

  },
  playButton: {

  },
  title: {
    fontFamily: 'press-start'
  },
});
