import { StyleSheet } from "react-native";
import Constants from 'expo-constants'

export const stylesRegister = StyleSheet.create({
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
  containerLogin: {
    marginTop: 1,
    marginBottom: 120,
    padding: 30,
    display: 'flex',
    justifyContent: 'center',
    gap: 20,
  },
  appInputs: {
    borderColor: '#949494',
    borderBottomWidth: 2,
    color: '#ccc',
    padding: 2
  },
  imagesInput: {
    width: 12,
    height: 12,
    resizeMode: 'stretch',
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
  },
  everyInput: {
    gap: 3
  },
  buttonRegister: {
    paddingTop: 30,
    gap: 20
  }
});


