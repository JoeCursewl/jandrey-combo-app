import { View, Text, ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";
import { ColorsButton } from "../static/ColorsButton";

export default function LoadingMessage({ message }) {
    return (
        <View style={stylesLoading.loading}>
            <Text style={stylesLoading.text}>{message}</Text>
            <ActivityIndicator size={"large"} color={ColorsButton.colorTextApp.color} />
        </View>
    )
}


const stylesLoading = StyleSheet.create({
    loading: {
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        gap: 10
    },
    text: {
        fontSize: 12,
        color: '#fdfdfd'
    }
})