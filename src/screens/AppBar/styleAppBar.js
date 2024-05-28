import { StyleSheet } from "react-native"

export const styleAppBar = StyleSheet.create({
    appBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomColor: '#493651',
        borderBottomWidth: 1,
    },
    textWhite: {
        color: 'white',
    },
    imgDate: {
        width: 12,
        height: 12
    },
    appBarDate: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
    },
    textDate: {
        fontSize: 10,
        color: '#D58BF3'
    }
    
})