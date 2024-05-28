import AsyncStorage from "@react-native-async-storage/async-storage"

export const setToken = async (token) => {
    try {
        await AsyncStorage.setItem('AuthToken', token);
    } catch (error) {
        console.log(error)
        return error
    }
}