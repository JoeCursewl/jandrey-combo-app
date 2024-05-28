import { useNavigate } from "react-router-native";

function useNavigator (to) {
    const navigator = useNavigate()
    if (!to) throw new Error("BRD | PATH is missing // to: string")
    if (to) return navigator(to)
}

export default useNavigator