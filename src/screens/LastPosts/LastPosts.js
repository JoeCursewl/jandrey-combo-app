import { StyleSheet } from "react-native"
import { ColorsButton } from "../../static/ColorsButton"

export const stylesPosts = StyleSheet.create({
    fontPost: {
        color: ColorsButton.colorEnergy.color,
        fontFamily: 'Poppins',
        width: 100
    },
    containerPost: {
        backgroundColor: ColorsButton.colorBackground.color,
        gap: 10,
    },
    descriptionPost: {
        fontFamily: 'Poppins',
        width: "100%",
        maxHeight: 55,
        color: ColorsButton.colorTextApp.color,
    },
    imgPost: {
        width: 20,
        height: 20
    },
    morePost: {
        textAlign: "center",
        color: ColorsButton.colorEnergy.color,
        fontFamily: 'Poppins',
        fontSize: 12
    },
    titlePosts: {
        fontFamily: 'Poppins',
        fontSize: 14,
        color: ColorsButton.colorTextApp.color
    },
    imgLastPosts: {
        width: 22,
        height: 22
    }
})