import { Text } from "react-native"
import stylesDash from "../screens/DashboardApp/stylesDash"
export default function BrdText({ children, color }) {
    return (
        <Text style={{ fontSize: 16, color: color }}>
            {children}
        </Text>
    )
}

export const SpecialText = ({ children }) => {
    return (
        <Text style={stylesDash.fontSpecial}>
            {children}
        </Text>
    )
}

export const TextWithColor = ({ children, color, fontSize, textAlign }) => {
    return (
        <Text style={{ color: color, fontSize: fontSize, textAlign: textAlign }}>
            {children}
        </Text>
    )
}


