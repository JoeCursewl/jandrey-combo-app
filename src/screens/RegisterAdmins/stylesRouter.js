import { StyleSheet } from "react-native";

export const stylesRouter = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    height: "100%",
    backgroundColor: "#121212",
  },
  containerLinks: {
    height: 100,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fdfdfd",
  },
  containerButtons: {
    borderWidth: 1,
    borderColor: "#6b5c7456",
    borderRadius: 18,
    marginTop: 22,
    padding: 12,
    rowGap: 10,
  },
  containerInfoLink: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  imageButton: {
    width: 20,
    height: 20,
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
});
