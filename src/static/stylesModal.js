import { StyleSheet } from "react-native"

export const styleModal = StyleSheet.create({
    containerModal: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    contentModal: {
        backgroundColor: "rgba(74, 60, 82, 0.5)",
        width: '90%',
        borderWidth: 1,
        borderColor: "#605169",
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 15,
        gap: 20
    },
    containerInfo: {
        flexDirection: "row",
        gap: 6
    }
})