import { View, Text, ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";

export default function LoadingMessage({ message }) {
    return (
        <View style={stylesLoading.loading}>
            <Text style={stylesLoading.text}>{message}</Text>
            <ActivityIndicator size={"large"} color={"purple"} />
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