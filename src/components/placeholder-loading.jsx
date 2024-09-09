import { View } from "react-native";
import { ColorsButton } from "../static/ColorsButton";
import { TextWithColor } from "./brdText";
import { Text } from "react-native";

export default function PlaceholderLoading({ size }) {
    return (
        <View>
            <TextWithColor style={{ color: "transparent", backgroundColor: ColorsButton.colorPlaceholderInfo.color, borderRadius: 100, fontSize: 9}}>
                {size}
            </TextWithColor>
        </View>
    )
}