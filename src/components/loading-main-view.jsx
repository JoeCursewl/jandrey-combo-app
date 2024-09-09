import { PLACEHOLDER_PROFILE } from "../config/config.breadriuss"
import { ColorsButton } from "../static/ColorsButton"
import { TextWithColor } from "./brdText"
import { View, Image } from "react-native"

export const LoadingMainView = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

            <View style={{ gap: 10, justifyContent: "center", alignItems: "center", backgroundColor: ColorsButton.colorBackgroundGray.color, paddingHorizontal: 30, paddingTop: 25, paddingBottom: 14, borderRadius: 30, width: "80%" }}>
                <Image source={{ uri: PLACEHOLDER_PROFILE}} style={{ width: 90, height: 90, borderRadius: 100 }}/>
                <TextWithColor color={ColorsButton.colorTextApp.color} style={{ width: 150, textAlign: "center" }}>Cargando fuentes... {" "}
                   Por favor espere.
                </TextWithColor>
            </View>

        </View>
    )
}