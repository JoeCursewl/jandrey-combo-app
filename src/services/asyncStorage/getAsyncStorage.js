import AsyncStorage from '@react-native-async-storage/async-storage';
export const getToken = async (key) => {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? value : null;
}