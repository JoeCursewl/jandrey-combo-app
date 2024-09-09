import { StyleSheet } from "react-native";
import { ColorsButton } from "../../static/ColorsButton";

export const styleCardPost = StyleSheet.create({
    cardPost: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#6b5c7456",
        gap: 10,
        minHeight: 200
    },
    imgPost: {
        width: 22,
        height: 22,
    }, 
    cardPostTitle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 5,
    },
    cardPostTitle2: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 5,
    },
    imgInteraction: {
        width: 22,
        height: 22
    },
    containerInteractions: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 5
    },
    cardLabels: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "flex-start",
        gap: 5,
        backgroundColor: "#e2404031",
        padding: 5,
        borderRadius: 10,
        width: "80%"
    },
    imgLabels: {
        width: 15,
        height: 15
    },
    datePost: {
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        backgroundColor: "#90908f31",
        padding: 5,
        borderRadius: 10,
        width: 125
    },
    imgDate: {
        width: 12,
        height: 12
    },
    textComment: { 
        color: "#7a7a7a", 
        fontSize: 10, 
        width: 155, 
        backgroundColor: "#ddd", 
        paddingVertical: 5,
        paddingHorizontal: 10, 
        justifyContent: "center", 
        alignItems: "center", 
        alignContent: "center",
        borderRadius: 15
    },
    containerComment: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 4
    }
})