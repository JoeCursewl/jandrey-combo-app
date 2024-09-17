import { StyleSheet } from "react-native";
import { Link } from "react-router-native";

export const styleMenu = StyleSheet.create({
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
    img: {
        width: 30,
        height: 30,
    },
    contMenu: {
        paddingHorizontal: 25,
        paddingTop: 8,
        width: "100%",
    }, 
    link: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 100,
        width: "100%",
        backgroundColor: "#e5e4e5",
    },
    apartados: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    }
})