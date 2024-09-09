import { StyleSheet } from "react-native";
import { ColorsButton } from "../../static/ColorsButton";

export const stylesDetailTrainer = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fefffc",
    flex: 1,
    height: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 10,
  },
  container: {
    backgroundColor: "#120b6d",
    width: "100%",
  },
  topContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileTrainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    gap: 15,
  },
  nameTrainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  packageTrainer: {
    flexDirection: "row",
    gap: 5,
    backgroundColor: ColorsButton.colorBackground.color,
    paddingTop: 2,
    borderRadius: 15,
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
  },
  infoTrainers: {
    flexDirection: "row", 
    gap: 5, 
    backgroundColor: "#dfb9ff", 
    paddingTop: 2, 
    borderRadius: 15,
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
},
scheduleTrainers: {
    flexDirection: "row", 
    gap: 5, 
    backgroundColor: "#ffd8e1", 
    paddingTop: 2, 
    borderRadius: 15,
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    alignItems: "center",
    alignContent: "center",
}
});
