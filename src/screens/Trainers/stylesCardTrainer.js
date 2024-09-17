import { StyleSheet } from "react-native"
import { ColorsButton } from "../../static/ColorsButton"

export const stylesCardTrainer = StyleSheet.create({
    fontPost: {
        color: ColorsButton.colorEnergy.color,
        //fontFamily: 'Poppins',
        width: 100
    },
    containerPost: {
        backgroundColor: ColorsButton.colorBackground.color,
        gap: 10,
    },
    descriptionPost: {
        //fontFamily: 'Poppins',
        width: "100%",
        color: ColorsButton.colorTextApp.color,
    },
    imgPost: {
        width: 20,
        height: 20
    },
    morePost: {
        textAlign: "center",
        color: ColorsButton.colorEnergy.color,
        //fontFamily: 'Poppins',
        fontSize: 12,
        width: 200
    },
    titlePosts: {
        //fontFamily: 'Poppins',
        fontSize: 14,
        color: ColorsButton.colorTextApp.color
    },
    imgLastPosts: {
        width: 22,
        height: 22
    },
    // Desde está parte empiezan los estilos para el componente LastTrainers
    // Cada componente tiene sus propios estilos
    packages10: {
        flexDirection: "row", 
        gap: 5, 
        backgroundColor: ColorsButton.colorBackground.color, 
        paddingTop: 2, 
        borderRadius: 15,
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
    },
    infoTrainers: {
        flexDirection: "row", 
        gap: 5, 
        backgroundColor: "#dfb9ff", 
        paddingTop: 2, 
        borderRadius: 15,
        width: "71%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
    },
    scheduleTrainers: {
        flexDirection: "row", 
        gap: 5, 
        backgroundColor: "#ffd8e1", 
        paddingTop: 2, 
        borderRadius: 15,
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
    },
    containerDateTrainers: {
        flexDirection: "row", 
        gap: 5,
        paddingBottom: 2,
        paddingTop: 4, 
        borderRadius: 10,
        justifyContent: "flex-start",
        alignItems: "center",
        alignContent: "center",
        textAlign: "center"
    },
})