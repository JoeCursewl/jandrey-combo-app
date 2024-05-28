import { StyleSheet } from "react-native";

export const stylesShowPackages = StyleSheet.create({
    containerPackage: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    packagesAll: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    containerInfoPackage: {
        borderWidth: 1,
        borderColor: "#6b5c7456",
        borderRadius: 10,
        margin: 5,
        flex: 1,
    },
    containerNamePackage: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#6b5c7456",
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    containerPackagesTrainers: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#6b5c7456",
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 10,
    },
    containerDescriptionPackage: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        flex: 1,
        gap: 5,
    },
    containerImgPackage: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 5,
        flex: 1,
    }
});