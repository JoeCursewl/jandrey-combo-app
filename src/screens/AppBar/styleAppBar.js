import { StyleSheet } from "react-native"

export const styleAppBar = StyleSheet.create({
    appBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#120b6d',
    },
    textWhite: {
        color: 'white',
    },
    textDark: {
        color: '#eff3f6',
    },
    imgDate: {
        width: 18,
        height: 18
    },
    appBarDate: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
    },
    textDate: {
        fontSize: 12,
        color: '#eff3f6'
    }
    
})