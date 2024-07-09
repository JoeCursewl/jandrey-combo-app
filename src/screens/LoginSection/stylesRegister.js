import { StyleSheet } from "react-native";
import Constants from 'expo-constants'
import { ColorsButton } from "../../static/ColorsButton";

export const stylesRegister = StyleSheet.create({
  colorWhite: {
    color: ColorsButton.colorLetter.color,
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
    padding: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    height: 950,
    width: '100%'
  },
  appInputs: {
    color: '#0D1C4B',
    padding: 10,
    borderColor: '#182C6A',
    borderWidth: 0.5,
    backgroundColor: ColorsButton.colorBackground.color,
    borderRadius: 20
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
    padding: 12,
    borderRadius: 12,
  },
  everyInput: {
    gap: 12,
    width: '100%'
  },
  buttonRegister: {
    paddingTop: 30,
    gap: 20,
    width: '100%'
  }
});


