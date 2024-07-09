import { StyleSheet } from "react-native";
import Constants from 'expo-constants'
import { ColorsButton } from "../../static/ColorsButton";

export const stylesLogin = StyleSheet.create({
  colorWhite: {
    color: "#0D1C4B",
    fontSize: 16,
  },
  fontMain: {
    color: '#0D1C4B',
    fontSize: 18,
  },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  appInputs: {
    color: '#0D1C4B',
    padding: 10,
    borderColor: '#182C6A',
    borderWidth: 0.5,
    backgroundColor: ColorsButton.colorBackground.color,
    borderRadius: 20
  },
  appButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#182C6A",
    borderRadius: 12,
    padding: 10,
  },
  containerLogin: {
    padding: 30,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: 850,
    gap: 50,
  },
  imagesInput: {
    width: 15,
    height: 15,
    resizeMode: 'stretch',
  },
  titleLg: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 5,
  },
  imageStyle: {
    width: 50,
    height: 40,
  },
  logoApp: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 55
  },
  adminLogin: {
    alignItems: 'center',
    justifyContent: 'center'    
  },
  adminLink: {
    padding: 12,
    borderRadius: 12,
  }
});


