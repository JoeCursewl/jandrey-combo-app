import { View, Image } from "react-native";
import { TextWithColor } from "../../../components/brdText";
export default function NoComments() {
    return (
        <View style={{ height: 510, width: "100%", backgroundColor: "transparent", justifyContent: "center", alignItems: "center" }}>
            <View style={{ gap: 10, justifyContent: "center", alignItems: "center" }}>
                <Image source={require("../../../../assets/svgs-login/no-comments-img.png")} style={{ width: 100, height: 100 }} />
                <TextWithColor style={{ width: 200, textAlign: "center" }}>No hay comentarios. Sé el primero en comentar.</TextWithColor>
            </View>
        </View>
    );
}