import { StyleSheet } from "react-native";

const stylesDash = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    height: "100%",
  },
  imageDash: {
    width: 100,
    height: 100,
  },
  textWhite: {
    color: "#fdfdfd",
    fontSize: 14,
  },
  textWhiteButton: {
    color: "#fdf8ffe0",
    fontSize: 15,
  },
  dashContainer: {
    paddingHorizontal: 25,
    paddingTop: 8,
    paddingBottom: 20,
  },
  modesDash: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 20,
  },
  fontBig: {
    fontSize: 18,
    color: "#fdfdfd",
  },
  fontSpecial: {
    color: "#cb7df2",
    fontSize: 18,
  },
  dashSvgs: {
    width: 18,
    height: 18,
  },
  welcomeMsg: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  buttonModes: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row-reverse",
    gap: 10,
    width: 155,
    height: 40,
    borderRadius: 15,
    padding: 8,
    backgroundColor: "#6b5c7456",
  },
  imgModes: {
    width: 20,
    height: 20,
  },
});

export default stylesDash;
