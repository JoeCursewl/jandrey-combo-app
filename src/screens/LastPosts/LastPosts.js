import { StyleSheet } from "react-native"

export const stylesPosts = StyleSheet.create({
    containerMain: {
        paddingHorizontal: 25,
        paddingTop: 0,
        height: '60%',
        paddingBottom: 20
    },
    textPost: {
        color: '#fdfdfd',
    },
    titlePost: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 22
    },
    sizeImage: {
        width: 22,
        height: 22
    },
    containerPost: {
        borderWidth: 1,
        borderColor: '#393939',
        borderRadius: 8,
        marginBottom: 15
    },
    namePost: {
        borderBottomColor: '#393939',
        borderBottomWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 10,
    },
    descriptionPost: {
        padding: 10
    }, 
    noPosts: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%',
    }
})