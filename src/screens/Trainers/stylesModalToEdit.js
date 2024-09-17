import { StyleSheet } from "react-native"

export const stylesModalToEdit = StyleSheet.create({
    containerModal: {
        backgroundColor: "rgba(0,0,0,0.5)",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        gap: 10
    },
    containerButtons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    containerInfo: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 1
    },
    editButton: {
        backgroundColor: "#f1dffc",
        paddingTop: 4,
        paddingBottom: 2,
        paddingHorizontal: 12,
        borderRadius: 10,
    },
    deleteButton: {
        backgroundColor: "#ffc4c4",
        paddingTop: 4,
        paddingBottom: 2,
        paddingHorizontal: 12,
        borderRadius: 10,
    }
})