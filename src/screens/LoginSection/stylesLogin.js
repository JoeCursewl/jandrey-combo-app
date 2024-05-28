import { StyleSheet } from "react-native";
import Constants from 'expo-constants'

export const stylesLogin = StyleSheet.create({
  colorWhite: {
    color: "white",
    fontSize: 16,
  },
  fontMain: {
    color: '#fdfdfd',
    fontSize: 18,
  },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  appInputs: {
    color: '#fdfdfd',
    padding: 10,
    borderBottomColor: '#632879',
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
  },
  containerLogin: {
    marginTop: 80,
    marginBottom: 290,
    padding: 30,
    display: 'flex',
    justifyContent: 'center',
    gap: 50,
  },
  imagesInput: {
    width: 12,
    height: 12,
    resizeMode: 'stretch',
  },
  titleLg: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
  },
  imageStyle: {
    width: 50,
    height: 40,
  },
  logoApp: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40
  },
  adminLogin: {
    alignItems: 'center',
    justifyContent: 'center'    
  },
  adminLink: {
    borderColor: '#632879',
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
  }
});


