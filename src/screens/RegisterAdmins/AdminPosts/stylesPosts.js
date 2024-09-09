import { StyleSheet } from "react-native";
import { ColorsButton } from "../../../static/ColorsButton";
export const stylePosts = StyleSheet.create({
    container: {
      paddingHorizontal: 12,
      height: "100%",
      backgroundColor: ColorsButton.colorBackgroundApp.color,
    },
    containerButtons: {
      backgroundColor: ColorsButton.colorBackgroundGray.color,
      borderRadius: 18,
      marginTop: 22,
      paddingVertical: 18,
      paddingHorizontal: 15,
      rowGap: 16,
    },
    containerInfoLink: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
    },
    newImage: {
      width: 20,
      height: 20,
    },
    containerButton: {
      flexDirection: "row",
      gap: 5,
      justifyContent: "space-between",
      alignItems: "center",
    },
    allLinks: {
      borderWidth: 1,
      borderRadius: 15,
      padding: 8,
      backgroundColor: "#6b5c7456",
    },
    arrowBack: {
      width: 30,
      height: 30,
    },
    containerArrow: {
      marginVertical: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    containerInfoAdmins: {
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
    },
    input: {
        backgroundColor: "#e3e2e2",
        borderRadius: 10,
        padding: 10,
        color: "#7b7b7b",
    },
    containerInput: {
        rowGap: 5,
    },
    containerContent: {
        rowGap: 8,
    },
    buttonSumbit: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: "#6b5c7456",
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonSumbitDelete: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: "#DF3352",
      borderRadius: 10,
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
  },
    contentInput: {
        backgroundColor: "#e3e2e2",
        borderRadius: 10,
        padding: 10,
        color: "#7b7b7b",
    },
    logoName: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 5,
      paddingBottom: 10,
      width: "100%",
    },
    containerLogo: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 5
    },
    containerInfo: {
      borderWidth: 1,
      borderColor: "#6b5c7456",
      borderRadius: 18,
      marginTop: 22,
      paddingVertical: 18,
      paddingHorizontal: 15,
      rowGap: 16, 
      marginBottom: 25
    }
  });