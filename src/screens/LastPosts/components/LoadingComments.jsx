import { View, SafeAreaView } from "react-native";
import { TextWithColor } from "../../../components/brdText";
export default function LoadingComments() {
    return (
        <SafeAreaView> 
            <View style={{ height: 510, width: "100%", backgroundColor: "#F7F9FD", justifyContent: "center", alignItems: "center" }}>
                <TextWithColor>Loading...</TextWithColor>
            </View>
        </SafeAreaView>
    );
}