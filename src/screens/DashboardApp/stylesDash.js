import { StyleSheet } from "react-native";
import { ColorsButton } from "../../static/ColorsButton";

const stylesDash = StyleSheet.create({
  container: {
    backgroundColor: "#120b6d",
    width: "100%",
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
    padding: 20,
    width: "100%",
    backgroundColor: "#4742af",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
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
    width: "100%",
    height: 40,
    borderRadius: 15,
    padding: 8,
    backgroundColor: "#6b5c7456",
  },
  imgModes: {
    width: 20,
    height: 20,
  },
  littleButton: {
    fontFamily: "Poppins",
    fontSize: 12,
    color: ColorsButton.colorEnergy.color,
    borderWidth: 0.5,
    borderColor: ColorsButton.colorEnergy.color,
    paddingTop: 4,
    paddingBottom: 2,
    paddingHorizontal: 8,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "row",
    gap: 4,
  },
  littleButtonPurple: {
    fontFamily: "Poppins",
    fontSize: 12,
    color: "#cb7df2",
    borderWidth: 0.5,
    borderColor: "#cb7df2",
    paddingTop: 4,
    paddingBottom: 2,
    paddingHorizontal: 8,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "row",
    gap: 4,
  },
  littleButtonBlue: {
    fontFamily: "Poppins",
    fontSize: 12,
    color: "#447aee",
    borderWidth: 0.5,
    borderColor: "#447aee",
    paddingTop: 4,
    paddingBottom: 2,
    paddingHorizontal: 8,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    flexDirection: "row",
    gap: 4,
  }
});

export default stylesDash;
